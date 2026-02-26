import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'safe' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function StatusIndicator({ status, size = 'md', showLabel = true }: StatusIndicatorProps) {
  const config = {
    safe: {
      icon: CheckCircle,
      label: 'Aman',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      iconColor: 'text-green-500',
    },
    warning: {
      icon: AlertCircle,
      label: 'Perlu Perhatian',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-500',
    },
    danger: {
      icon: XCircle,
      label: 'Perlu Peningkatan',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-700',
      iconColor: 'text-amber-500',
    },
  };

  const { icon: Icon, label, bgColor, textColor, iconColor } = config[status];
  
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';
  const padding = size === 'sm' ? 'px-2 py-1' : size === 'md' ? 'px-3 py-1.5' : 'px-4 py-2';

  return (
    <div className={`inline-flex items-center gap-2 ${bgColor} ${textColor} ${padding} rounded-full`}>
      <Icon className={`${iconSize} ${iconColor}`} />
      {showLabel && <span className={`${textSize} font-medium`}>{label}</span>}
    </div>
  );
}