'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useIssues } from '@/lib/context/issue-context';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/issues/user-avatar';
import { PriorityBadge } from '@/components/issues/priority-badge';
import { IssueStatus } from '@/types';
import { STATUS_CONFIG } from '@/lib/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { useState } from 'react';

// Statuses to show on the board (excluding canceled)
const BOARD_STATUSES: IssueStatus[] = ['backlog', 'todo', 'in_progress', 'in_review', 'done'];

export default function BoardPage() {
  const { state, updateIssue, getUserById } = useIssues();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const issuesByStatus = useMemo(() => {
    const grouped: Record<IssueStatus, typeof state.issues> = {
      backlog: [],
      todo: [],
      in_progress: [],
      in_review: [],
      done: [],
      canceled: [],
    };

    state.issues.forEach((issue) => {
      if (BOARD_STATUSES.includes(issue.status)) {
        grouped[issue.status].push(issue);
      }
    });

    return grouped;
  }, [state.issues]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const issueId = active.id as string;
    const newStatus = over.id as IssueStatus;

    if (BOARD_STATUSES.includes(newStatus)) {
      updateIssue(issueId, { status: newStatus });
    }

    setActiveId(null);
  };

  const activeIssue = activeId ? state.issues.find((i) => i.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full p-6">
        <div className="flex gap-4 h-full overflow-x-auto">
          {BOARD_STATUSES.map((status) => {
            const config = STATUS_CONFIG[status];
            const Icon = config.icon;
            const issues = issuesByStatus[status];

            return (
              <BoardColumn
                key={status}
                status={status}
                title={config.label}
                icon={<Icon className="w-4 h-4" />}
                color={config.color}
                issues={issues}
                getUserById={getUserById}
              />
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {activeIssue ? (
          <IssueCard
            issue={activeIssue}
            getUserById={getUserById}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

interface BoardColumnProps {
  status: IssueStatus;
  title: string;
  icon: React.ReactNode;
  color: string;
  issues: any[];
  getUserById: (id: string) => any;
}

function BoardColumn({ status, title, icon, color, issues, getUserById }: BoardColumnProps) {
  const { useDroppable } = require('@dnd-kit/core');
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="flex-shrink-0 w-[320px] flex flex-col">
      <div className="flex items-center gap-2 mb-4 px-2">
        <div className={color}>{icon}</div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <Badge variant="secondary" className="ml-auto">
          {issues.length}
        </Badge>
      </div>

      <ScrollArea ref={setNodeRef} className="flex-1 pr-2">
        <div className="space-y-2 pb-4">
          {issues.length === 0 ? (
            <div className="flex items-center justify-center h-24 border-2 border-dashed border-muted rounded-lg">
              <p className="text-sm text-muted-foreground">No issues</p>
            </div>
          ) : (
            issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                getUserById={getUserById}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface IssueCardProps {
  issue: any;
  getUserById: (id: string) => any;
  isDragging?: boolean;
}

function IssueCard({ issue, getUserById, isDragging = false }: IssueCardProps) {
  const { useDraggable } = require('@dnd-kit/core');
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: issue.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const assignee = issue.assigneeId ? getUserById(issue.assigneeId) : null;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing hover:border-primary transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link
            href={`/issues/${issue.id}`}
            className="font-medium text-sm hover:underline flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            {issue.title}
          </Link>
          <PriorityBadge priority={issue.priority} showLabel={false} />
        </div>
        <div className="text-xs text-muted-foreground font-mono">{issue.identifier}</div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        {issue.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {issue.labels.slice(0, 3).map((label: any) => (
              <Badge
                key={label.id}
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor: `${label.color}20`,
                  color: label.color,
                  borderColor: label.color,
                  borderWidth: 1,
                }}
              >
                {label.name}
              </Badge>
            ))}
            {issue.labels.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{issue.labels.length - 3}
              </Badge>
            )}
          </div>
        )}

        {assignee && (
          <div className="flex items-center gap-2">
            <UserAvatar user={assignee} className="w-5 h-5" />
            <span className="text-xs text-muted-foreground">{assignee.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
