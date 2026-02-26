import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Droplets, Thermometer, Wind, Zap } from 'lucide-react';

interface WaterParameter {
  id: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  optimal: [number, number];
  icon: React.ComponentType<any>;
  color: string;
}

interface WaterQualityPanelProps {
  parameters: WaterParameter[];
}

export function WaterQualityPanel({ parameters }: WaterQualityPanelProps) {
  const getParameterStatus = (value: number, optimal: [number, number], min: number, max: number) => {
    if (value >= optimal[0] && value <= optimal[1]) {
      return { status: 'optimal', color: 'text-emerald-600', bgColor: 'bg-emerald-100', borderColor: 'border-emerald-200' };
    } else if (value >= min && value <= max) {
      return { status: 'acceptable', color: 'text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-200' };
    } else {
      return { status: 'critical', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-200' };
    }
  };

  const getGaugeWidth = (value: number, min: number, max: number) => {
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
          <Droplets className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-blue-900">Water Quality</h3>
          <p className="text-blue-600 text-sm">Real-time monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parameters.map((param) => {
          const Icon = param.icon;
          const status = getParameterStatus(param.value, param.optimal, param.min, param.max);
          const gaugeWidth = getGaugeWidth(param.value, param.min, param.max);
          
          return (
            <div key={param.id} className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-white/40">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: param.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-blue-900">{param.name}</span>
                </div>
                <Badge className={`${status.bgColor} ${status.color} ${status.borderColor} border`}>
                  {status.status.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${status.color}`}>
                      {param.value.toFixed(1)}
                    </div>
                    <div className="text-sm text-blue-600">{param.unit}</div>
                  </div>
                  <div className="text-right text-xs text-blue-500">
                    <div>Optimal: {param.optimal[0]}-{param.optimal[1]}</div>
                    <div>Range: {param.min}-{param.max}</div>
                  </div>
                </div>

                {/* Gauge */}
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    {/* Optimal range background */}
                    <div 
                      className="absolute top-0 h-3 bg-emerald-200 rounded-full"
                      style={{
                        left: `${((param.optimal[0] - param.min) / (param.max - param.min)) * 100}%`,
                        width: `${((param.optimal[1] - param.optimal[0]) / (param.max - param.min)) * 100}%`
                      }}
                    />
                    {/* Current value indicator */}
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        status.status === 'optimal' ? 'bg-emerald-500' :
                        status.status === 'acceptable' ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${gaugeWidth}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-blue-400 mt-1">
                    <span>{param.min}</span>
                    <span>{param.max}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative Water Drops */}
      <div className="absolute top-2 right-2 opacity-20">
        <Droplets className="w-6 h-6 text-cyan-400" />
      </div>
    </Card>
  );
}