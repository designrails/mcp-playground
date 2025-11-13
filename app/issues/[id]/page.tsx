'use client';

import { RichTextEditor } from '@/components/issues/rich-text-editor';
import { UserAvatar } from '@/components/issues/user-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { PRIORITIES, PRIORITY_CONFIG, STATUS_CONFIG, STATUSES } from '@/lib/constants';
import { useIssues } from '@/lib/context/issue-context';
import { IssuePriority, IssueStatus } from '@/types';
import { format } from 'date-fns';
import { ArrowLeft, Check, Edit2, Send, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function IssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const issueId = params.id as string;

  const { state, getIssueById, getUserById, getCommentsByIssueId, updateIssue, deleteIssue, addComment, deleteComment } = useIssues();
  const issue = getIssueById(issueId);
  const comments = getCommentsByIssueId(issueId);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [commentContent, setCommentContent] = useState('');

  if (!issue) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-2">Issue not found</h2>
        <p className="text-muted-foreground mb-4">The issue you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/issues">Back to Issues</Link>
        </Button>
      </div>
    );
  }

  const reporter = getUserById(issue.reporterId);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this issue?')) {
      deleteIssue(issue.id);
      router.push('/issues');
    }
  };

  const startEditingTitle = () => {
    setEditedTitle(issue.title);
    setIsEditingTitle(true);
  };

  const saveTitle = () => {
    if (editedTitle.trim()) {
      updateIssue(issue.id, { title: editedTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const startEditingDescription = () => {
    setEditedDescription(issue.description);
    setIsEditingDescription(true);
  };

  const saveDescription = () => {
    updateIssue(issue.id, { description: editedDescription });
    setIsEditingDescription(false);
  };

  const handleAddComment = () => {
    if (commentContent.trim()) {
      addComment({
        issueId: issue.id,
        userId: state.currentUser.id,
        content: commentContent.trim(),
      });
      setCommentContent('');
    }
  };

  const toggleLabel = (labelId: string) => {
    const hasLabel = issue.labels.some(l => l.id === labelId);
    const newLabels = hasLabel
      ? issue.labels.filter(l => l.id !== labelId)
      : [...issue.labels, state.labels.find(l => l.id === labelId)!];
    updateIssue(issue.id, { labels: newLabels });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-3 md:p-6 space-y-3 md:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/issues">
              <ArrowLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Back to Issues</span>
            </Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Delete Issue</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-4 md:space-y-6 md:order-1 order-2">
            {/* Issue ID */}
            <div className="text-sm text-muted-foreground font-mono">{issue.identifier}</div>

            {/* Title */}
            <div>
              {isEditingTitle ? (
                <div className="flex gap-2">
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveTitle();
                      if (e.key === 'Escape') setIsEditingTitle(false);
                    }}
                    className="text-2xl md:text-3xl font-bold h-auto py-2"
                    autoFocus
                  />
                  <Button size="sm" onClick={saveTitle}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsEditingTitle(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <h1
                  className="text-2xl md:text-3xl font-bold cursor-pointer hover:text-muted-foreground transition-colors group flex items-start gap-2"
                  onClick={startEditingTitle}
                >
                  {issue.title}
                  <Edit2 className="w-4 md:w-5 h-4 md:h-5 opacity-0 group-hover:opacity-50 mt-1 md:mt-2" />
                </h1>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              {isEditingDescription ? (
                <div className="space-y-2">
                  <RichTextEditor
                    content={editedDescription}
                    onChange={setEditedDescription}
                    placeholder="Add a description..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveDescription}>
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingDescription(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Card
                  className="cursor-pointer hover:border-muted-foreground transition-colors group"
                  onClick={startEditingDescription}
                >
                  <CardContent className="px-3 md:px-4 py-3 md:py-4 relative">
                    <div
                      className="prose prose-sm max-w-none dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: issue.description }}
                    />
                    <Edit2 className="w-4 h-4 opacity-0 group-hover:opacity-50 absolute top-2 right-3" />
                  </CardContent>
                </Card>
              )}
            </div>

            <Separator />

            {/* Comments */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Comments ({comments.length})</h3>

              {/* Add Comment */}
              <div className="flex gap-2">
                <UserAvatar user={state.currentUser} className="w-6 h-6 md:w-8 md:h-8" />
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    rows={3}
                    className="text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        handleAddComment();
                      }
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground hidden md:inline">
                      Cmd+Enter to post
                    </span>
                    <Button size="sm" onClick={handleAddComment} disabled={!commentContent.trim()} className="ml-auto">
                      <Send className="w-3 h-3 mr-2" />
                      Comment
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3 md:space-y-4">
                {comments.map((comment) => {
                  const author = getUserById(comment.userId);
                  if (!author) return null;

                  return (
                    <Card key={comment.id}>
                      <CardHeader className="pb-2 md:pb-3 px-3 md:px-6 py-3 md:py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <UserAvatar user={author} className="w-5 h-5 md:w-6 md:h-6" />
                            <div>
                              <span className="font-medium text-xs md:text-sm">{author.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {format(new Date(comment.createdAt), 'MMM d, yyyy at h:mm a')}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (confirm('Delete this comment?')) {
                                deleteComment(comment.id);
                              }
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="px-3 md:px-6 py-2 md:py-4">
                        <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-3 md:space-y-6 order-1 md:order-2">
            {/* Mobile Compact View */}
            <div className="md:hidden space-y-3">
              {/* Status, Priority, Assignee - Horizontal */}
              <div className="flex flex-wrap gap-2">
                <Select
                  value={issue.status}
                  onValueChange={(value) => updateIssue(issue.id, { status: value as IssueStatus })}
                >
                  <SelectTrigger className="h-8 w-auto text-xs px-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {STATUS_CONFIG[status].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={issue.priority}
                  onValueChange={(value) => updateIssue(issue.id, { priority: value as IssuePriority })}
                >
                  <SelectTrigger className="h-8 w-auto text-xs px-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {PRIORITY_CONFIG[priority].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={issue.assigneeId || 'unassigned'}
                  onValueChange={(value) =>
                    updateIssue(issue.id, { assigneeId: value === 'unassigned' ? undefined : value })
                  }
                >
                  <SelectTrigger className="h-8 w-auto text-xs px-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {state.users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center gap-2">
                          <UserAvatar user={user} className="w-5 h-5" />
                          {user.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Labels - Horizontal */}
              <div className="flex flex-wrap gap-1.5">
                {state.labels.map((label) => {
                  const isSelected = issue.labels.some(l => l.id === label.id);
                  return (
                    <Badge
                      key={label.id}
                      className="cursor-pointer text-xs h-6 px-2"
                      style={{
                        backgroundColor: isSelected ? label.color : 'transparent',
                        color: isSelected ? 'white' : label.color,
                        borderColor: label.color,
                        borderWidth: 1,
                      }}
                      onClick={() => toggleLabel(label.id)}
                    >
                      {label.name}
                      {isSelected && <X className="w-3 h-3 ml-1" />}
                    </Badge>
                  );
                })}
              </div>

              {/* Reporter and Dates - Compact */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {reporter && (
                  <div className="flex items-center gap-1.5">
                    <UserAvatar user={reporter} className="w-4 h-4" />
                    <span>{reporter.name}</span>
                  </div>
                )}
                <span>Created {format(new Date(issue.createdAt), 'MMM d, yyyy')}</span>
                <span>Updated {format(new Date(issue.updatedAt), 'MMM d, yyyy')}</span>
              </div>
            </div>

            {/* Desktop Card View */}
            <Card className="hidden md:block">
              <CardHeader>
                <h3 className="font-semibold">Details</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Select
                    value={issue.status}
                    onValueChange={(value) => updateIssue(issue.id, { status: value as IssueStatus })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {STATUS_CONFIG[status].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Priority</label>
                  <Select
                    value={issue.priority}
                    onValueChange={(value) => updateIssue(issue.id, { priority: value as IssuePriority })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {PRIORITY_CONFIG[priority].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Assignee */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assignee</label>
                  <Select
                    value={issue.assigneeId || 'unassigned'}
                    onValueChange={(value) =>
                      updateIssue(issue.id, { assigneeId: value === 'unassigned' ? undefined : value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {state.users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center gap-2">
                            <UserAvatar user={user} className="w-5 h-5" />
                            {user.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Reporter */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reporter</label>
                  {reporter && (
                    <div className="flex items-center gap-2 mt-2">
                      <UserAvatar user={reporter} className="w-6 h-6" />
                      <span className="text-sm">{reporter.name}</span>
                    </div>
                  )}
                </div>

                {/* Dates */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm mt-1">{format(new Date(issue.createdAt), 'MMM d, yyyy')}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Updated</label>
                  <p className="text-sm mt-1">{format(new Date(issue.updatedAt), 'MMM d, yyyy')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Labels - Desktop */}
            <Card className="hidden md:block">
              <CardHeader>
                <h3 className="font-semibold">Labels</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {state.labels.map((label) => {
                    const isSelected = issue.labels.some(l => l.id === label.id);
                    return (
                      <Badge
                        key={label.id}
                        className="cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? label.color : 'transparent',
                          color: isSelected ? 'white' : label.color,
                          borderColor: label.color,
                          borderWidth: 1,
                        }}
                        onClick={() => toggleLabel(label.id)}
                      >
                        {label.name}
                        {isSelected && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
