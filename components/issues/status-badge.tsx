import { Badge } from '@/components/ui/badge';
import { IssueStatus } from '@/types';
import { STATUS_CONFIG } from '@/lib/constants';

interface StatusBadgeProps {
  status: IssueStatus;
  showIcon?: boolean;
}

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <Badge variant="secondary" className={`${config.color} ${config.bgColor} border-0`}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  );
}
