'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useIssues } from '@/lib/context/issue-context';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/issues/status-badge';
import { PriorityBadge } from '@/components/issues/priority-badge';
import { UserAvatar } from '@/components/issues/user-avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { STATUSES, PRIORITIES, STATUS_CONFIG, PRIORITY_CONFIG } from '@/lib/constants';
import { IssueStatus, IssuePriority } from '@/types';
import { Button } from '@/components/ui/button';

export default function IssuesPage() {
  const { state, getUserById } = useIssues();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority | 'all'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredIssues = useMemo(() => {
    return state.issues.filter((issue) => {
      // Search filter
      if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !issue.identifier.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && issue.status !== statusFilter) {
        return false;
      }

      // Priority filter
      if (priorityFilter !== 'all' && issue.priority !== priorityFilter) {
        return false;
      }

      // Assignee filter
      if (assigneeFilter !== 'all') {
        if (assigneeFilter === 'unassigned' && issue.assigneeId) {
          return false;
        }
        if (assigneeFilter !== 'unassigned' && issue.assigneeId !== assigneeFilter) {
          return false;
        }
      }

      return true;
    });
  }, [state.issues, searchQuery, statusFilter, priorityFilter, assigneeFilter]);

  const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all' || assigneeFilter !== 'all';

  const clearFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setAssigneeFilter('all');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search issues by title or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {mounted && (
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as IssueStatus | 'all')}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {STATUS_CONFIG[status].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as IssuePriority | 'all')}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {PRIORITIES.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {PRIORITY_CONFIG[priority].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {state.users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          Showing {filteredIssues.length} of {state.issues.length} issues
        </div>
      </div>

      {/* Issues Table */}
      {filteredIssues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No issues found</h3>
          <p className="text-muted-foreground">
            {searchQuery || hasActiveFilters
              ? 'Try adjusting your search or filters'
              : 'Get started by creating a new issue'}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Labels</TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => {
                const assignee = issue.assigneeId ? getUserById(issue.assigneeId) : null;
                return (
                  <TableRow key={issue.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link href={`/issues/${issue.id}`} className="font-mono text-sm text-muted-foreground hover:text-foreground">
                        {issue.identifier}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/issues/${issue.id}`} className="font-medium hover:underline">
                        {issue.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={issue.status} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={issue.priority} showLabel={false} />
                    </TableCell>
                    <TableCell>
                      {assignee ? (
                        <div className="flex items-center gap-2">
                          <UserAvatar user={assignee} className="w-6 h-6" />
                          <span className="text-sm">{assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {issue.labels.slice(0, 2).map((label) => (
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
                        {issue.labels.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{issue.labels.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {format(new Date(issue.updatedAt), 'MMM d')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
