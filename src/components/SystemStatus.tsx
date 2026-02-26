import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Wifi, Database, AlertCircle } from 'lucide-react';

interface SystemStatusProps {
  onlineUsers: number;
  totalSensors: number;
  activeSensors: number;
  systemHealth: 'good' | 'warning' | 'error';
  lastBackup: string;
}

export function SystemStatus({ 
  onlineUsers, 
  totalSensors, 
  activeSensors, 
  systemHealth, 
  lastBackup 
}: SystemStatusProps) {
  const getHealthColor = () => {
    switch (systemHealth) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthIcon = () => {
    switch (systemHealth) {
      case 'good': return <Activity className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getHealthText = () => {
    switch (systemHealth) {
      case 'good': return 'BAIK';
      case 'warning': return 'PERINGATAN';
      case 'error': return 'ERROR';
      default: return 'TIDAK DIKETAHUI';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-medium mb-4">Status Sistem</h3>
      
      <div className="space-y-4">
        {/* System Health */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Kesehatan Sistem</span>
          </div>
          <Badge className={`${getHealthColor()} flex items-center gap-1`}>
            {getHealthIcon()}
            {getHealthText()}
          </Badge>
        </div>

        {/* Sensors Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-500" />
            <span className="text-sm">Sensor Aktif</span>
          </div>
          <div className="text-sm font-medium">
            {activeSensors}/{totalSensors}
          </div>
        </div>

        {/* Online Users */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-sm">Pengguna Online</span>
          </div>
          <div className="text-sm font-medium">{onlineUsers}</div>
        </div>

        {/* Last Backup */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Backup Terakhir</span>
          </div>
          <div className="text-sm text-muted-foreground">{lastBackup}</div>
        </div>

        {/* Connection Quality */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Kualitas Koneksi</span>
            <span className="text-sm font-medium text-green-600">Excellent</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </div>
    </Card>
  );
}