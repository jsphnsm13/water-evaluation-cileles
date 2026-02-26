import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertTriangle, Bell, X } from 'lucide-react';

interface Alert {
  id: string;
  sensorId: string;
  location: string;
  message: string;
  severity: 'warning' | 'critical';
  timestamp: string;
  acknowledged: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
}

export function AlertsPanel({ alerts, onAcknowledge, onDismiss }: AlertsPanelProps) {
  const getSeverityColor = (severity: string) => {
    return severity === 'critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800';
  };

  const activeAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-orange-500" />
        <h3 className="font-medium">Peringatan Sistem</h3>
        {activeAlerts.length > 0 && (
          <Badge className="bg-red-100 text-red-800">
            {activeAlerts.length} Aktif
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-red-600">Peringatan Aktif</h4>
            <div className="space-y-2">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{alert.location}</span>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAcknowledge(alert.id)}
                        className="text-xs"
                      >
                        Konfirmasi
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDismiss(alert.id)}
                        className="text-xs"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Acknowledged Alerts */}
        {acknowledgedAlerts.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-gray-600">Sudah Dikonfirmasi</h4>
            <div className="space-y-2">
              {acknowledgedAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-700">{alert.location}</span>
                        <Badge className="bg-gray-100 text-gray-600">
                          DIKONFIRMASI
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Tidak ada peringatan</p>
          </div>
        )}
      </div>
    </Card>
  );
}