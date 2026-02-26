import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Navigation } from 'lucide-react';
import { Fish, Waves, Settings, Bell, User } from 'lucide-react';

interface AquariumHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  alertCount: number;
}

export function AquariumHeader({ activeTab, onTabChange, alertCount }: AquariumHeaderProps) {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Waves },
    { id: 'fish', label: 'Fish Status', icon: Fish },
    { id: 'water', label: 'Water Quality', icon: Navigation },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <header className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Fish className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-300 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-sm">Smart Aquarium</h1>
              <p className="text-cyan-100 text-sm">Intelligent Fish Care System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => onTabChange(item.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
                    ${isActive 
                      ? 'bg-white/90 text-cyan-700 shadow-md' 
                      : 'text-white hover:bg-white/20 backdrop-blur-sm'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative text-white hover:bg-white/20 rounded-full p-2"
            >
              <Bell className="w-5 h-5" />
              {alertCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white p-0 flex items-center justify-center text-xs">
                  {alertCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                onClick={() => onTabChange(item.id)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-all duration-200
                  ${isActive 
                    ? 'bg-white/90 text-cyan-700 shadow-md' 
                    : 'text-white hover:bg-white/20 backdrop-blur-sm'
                  }
                `}
                size="sm"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Water Wave Effect */}
      <div className="relative overflow-hidden">
        <svg
          className="w-full h-4 text-white/10"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </header>
  );
}