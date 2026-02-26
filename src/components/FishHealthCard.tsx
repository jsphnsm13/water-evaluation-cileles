import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Fish, Heart, Activity, AlertCircle } from 'lucide-react';

interface FishData {
  id: string;
  name: string;
  species: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  activity: number; // 0-100
  lastFed: string;
  color: string;
}

interface FishHealthCardProps {
  fish: FishData[];
}

export function FishHealthCard({ fish }: FishHealthCardProps) {
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'warning': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent': return <Heart className="w-4 h-4 fill-current" />;
      case 'good': return <Activity className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      default: return <Fish className="w-4 h-4" />;
    }
  };

  const getActivityColor = (activity: number) => {
    if (activity >= 80) return 'bg-emerald-500';
    if (activity >= 60) return 'bg-blue-500';
    if (activity >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
          <Fish className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-cyan-900">Fish Health Status</h3>
          <p className="text-cyan-600 text-sm">{fish.length} fish monitored</p>
        </div>
      </div>

      <div className="space-y-4">
        {fish.map((fishItem) => (
          <div key={fishItem.id} className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-white/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: fishItem.color }}
                >
                  <Fish className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-cyan-900">{fishItem.name}</h4>
                  <p className="text-sm text-cyan-600">{fishItem.species}</p>
                </div>
              </div>
              <Badge className={`${getHealthColor(fishItem.health)} flex items-center gap-1`}>
                {getHealthIcon(fishItem.health)}
                {fishItem.health.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-cyan-700">Activity Level</span>
                  <span className="text-sm font-medium text-cyan-900">{fishItem.activity}%</span>
                </div>
                <div className="w-full bg-white/40 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getActivityColor(fishItem.activity)}`}
                    style={{ width: `${fishItem.activity}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-cyan-700">Last Fed</p>
                <p className="text-sm font-medium text-cyan-900">{fishItem.lastFed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bubbles Effect */}
      <div className="absolute top-4 right-4 flex gap-1">
        <div className="w-2 h-2 bg-cyan-300/40 rounded-full animate-bounce"></div>
        <div className="w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-1 h-1 bg-cyan-400/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </Card>
  );
}