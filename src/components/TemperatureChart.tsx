import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card } from './ui/card';

interface TemperatureData {
  time: string;
  temperature: number;
  timestamp: number;
}

interface TemperatureChartProps {
  data: TemperatureData[];
  location: string;
  minThreshold: number;
  maxThreshold: number;
}

export function TemperatureChart({ data, location, minThreshold, maxThreshold }: TemperatureChartProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow">
          <p className="font-medium">{`Waktu: ${label}`}</p>
          <p className="text-blue-600">
            {`Suhu: ${payload[0].value.toFixed(1)}°C`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <h3 className="font-medium mb-4">Grafik Suhu - {location}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip content={customTooltip} />
            
            {/* Threshold lines */}
            <ReferenceLine 
              y={maxThreshold} 
              stroke="#ef4444" 
              strokeDasharray="5 5"
              label="Max"
            />
            <ReferenceLine 
              y={minThreshold} 
              stroke="#ef4444" 
              strokeDasharray="5 5"
              label="Min"
            />
            
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}