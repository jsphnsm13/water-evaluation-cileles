import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Thermometer, AlertTriangle, CheckCircle } from 'lucide-react';

interface TemperatureCardProps {
  sensorId: string;
  location: string;
  currentTemp: number;
  status: 'normal' | 'warning' | 'critical';
  minThreshold: number;
  maxThreshold: number;
  lastUpdated: string;
}

export function TemperatureCard({ 
  sensorId, 
  location, 
  currentTemp, 
  status, 
  minThreshold, 
  maxThreshold,
  lastUpdated 
}: TemperatureCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Thermometer className="w-4 h-4" />;
    }
  };

  const getTempColor = () => {
    if (currentTemp < minThreshold || currentTemp > maxThreshold) {
      return 'text-red-600';
    }
    if (currentTemp < minThreshold + 2 || currentTemp > maxThreshold - 2) {
      return 'text-yellow-600';
    }
    return 'text-green-600';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className="font-medium">{location}</h3>
            <p className="text-sm text-muted-foreground">Sensor {sensorId}</p>
          </div>
        </div>
        <Badge className={`${getStatusColor()} flex items-center gap-1`}>
          {getStatusIcon()}
          {status.toUpperCase()}
        </Badge>
      </div>
      
      <div className="text-center mb-4">
        <div className={`text-3xl font-bold ${getTempColor()}`}>
          {currentTemp.toFixed(1)}°C
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Range: {minThreshold}°C - {maxThreshold}°C
        </p>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Last updated:</span>
        <span>{lastUpdated}</span>
      </div>
    </Card>
  );
}