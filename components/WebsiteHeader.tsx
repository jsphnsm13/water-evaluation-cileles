import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Fish, Book, MessageCircle, ShoppingBag, Stethoscope, Home, Menu, Search } from 'lucide-react';

interface WebsiteHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function WebsiteHeader({ activeSection, onSectionChange }: WebsiteHeaderProps) {
  const navigationItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'ensiklopedia', label: 'Ensiklopedia', icon: Book },
    { id: 'panduan', label: 'Panduan', icon: Fish },
    { id: 'diagnosa', label: 'Diagnosa', icon: Stethoscope, badge: 'New' },
    { id: 'forum', label: 'Forum', icon: MessageCircle },
    { id: 'shop', label: 'Shop', icon: ShoppingBag }
  ];

  return (
    <header className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                <Fish className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-md"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white drop-shadow-md" style={{ fontFamily: 'Poppins, sans-serif' }}>temanikan</h1>
              <p className="text-cyan-100 text-sm">Teman Setia Hobi Ikan Hias</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-white/95 text-cyan-800 shadow-lg font-medium' 
                      : 'text-white hover:bg-white/20 backdrop-blur-sm'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {item.badge && (
                    <Badge className="ml-1 bg-orange-400 text-white text-xs px-1.5 py-0.5">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-xl p-2"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/20 rounded-xl p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                onClick={() => onSectionChange(item.id)}
                className={`
                  relative flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200
                  ${isActive 
                    ? 'bg-white/95 text-cyan-800 shadow-md font-medium' 
                    : 'text-white hover:bg-white/20 backdrop-blur-sm'
                  }
                `}
                size="sm"
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {item.badge && (
                  <Badge className="ml-1 bg-orange-400 text-white text-xs px-1 py-0">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Decorative Wave */}
      <div className="relative overflow-hidden">
        <svg
          className="w-full h-6 text-white/10"
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