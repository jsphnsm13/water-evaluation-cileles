interface WaterQualityCardProps {
  label: string;
  value: number;
  unit: string;
  status: 'safe' | 'warning' | 'danger';
  description?: string;
}

export function WaterQualityCard({ label, value, unit, status, description }: WaterQualityCardProps) {
  const statusColors = {
    safe: 'bg-green-100 text-green-700',
    warning: 'bg-blue-100 text-blue-700',
    danger: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
      <div>
        <div className="text-sm text-slate-600 mb-1">{label}</div>
        {description && <div className="text-xs text-slate-500">{description}</div>}
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-slate-900">
          {value}
          {unit && <span className="text-sm font-normal text-slate-600 ml-1">{unit}</span>}
        </div>
        <div className={`text-xs font-medium ${statusColors[status]} px-2 py-0.5 rounded-full mt-1 inline-block`}>
          {status === 'safe' ? 'Normal' : status === 'warning' ? 'Perhatian' : 'Peningkatan'}
        </div>
      </div>
    </div>
  );
}