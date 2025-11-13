import { IssuePriority } from '@/types';
import { PRIORITY_CONFIG } from '@/lib/constants';

interface PriorityBadgeProps {
  priority: IssuePriority;
  showLabel?: boolean;
}

export function PriorityBadge({ priority, showLabel = true }: PriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-1 ${config.color}`}>
      <Icon className="w-4 h-4" />
      {showLabel && <span className="text-sm">{config.label}</span>}
    </div>
  );
}
