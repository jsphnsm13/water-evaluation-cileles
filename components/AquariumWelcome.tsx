import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Fish, Heart, Waves, ArrowRight } from 'lucide-react';

interface AquariumWelcomeProps {
  userName: string;
  onGetStarted: () => void;
}

export function AquariumWelcome({ userName, onGetStarted }: AquariumWelcomeProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 border-none shadow-lg overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-teal-200/30 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Fish className="w-8 h-8 text-white" />
              </div>
              {/* Floating bubbles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-300/60 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-blue-300/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-cyan-900 mb-2">
            Welcome back, {userName}! 🐠
          </h2>
          <p className="text-cyan-700 text-lg mb-1">
            Your aquarium ecosystem is thriving
          </p>
          <p className="text-cyan-600 text-sm">
            Let's check on your underwater friends
          </p>
        </div>

        {/* Aquarium Illustration */}
        <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-b from-cyan-200 to-blue-400 aspect-[16/10] shadow-inner">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1706989398879-9cf889fbdea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcXVhcml1bSUyMGNvcmFsJTIwcmVlZnxlbnwxfHx8fDE3NTc5MjIzNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Beautiful aquarium with tropical fish"
            className="w-full h-full object-cover opacity-90"
          />
          
          {/* Overlay with animated elements */}
          <div className="absolute inset-0">
            {/* Water effect gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 via-transparent to-cyan-200/20"></div>
            
            {/* Floating particles/bubbles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Status indicators */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
                All Fish Healthy
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
              12 Fish • 24°C • pH 7.2
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center bg-white/60 rounded-xl p-3 backdrop-blur-sm">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-lg font-bold text-emerald-700">12</div>
            <div className="text-xs text-emerald-600">Healthy Fish</div>
          </div>
          
          <div className="text-center bg-white/60 rounded-xl p-3 backdrop-blur-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Waves className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-blue-700">98%</div>
            <div className="text-xs text-blue-600">Water Quality</div>
          </div>
          
          <div className="text-center bg-white/60 rounded-xl p-3 backdrop-blur-sm">
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Fish className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-lg font-bold text-cyan-700">Active</div>
            <div className="text-xs text-cyan-600">All Systems</div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={onGetStarted}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200"
        >
          View Full Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Friendly Message */}
        <div className="mt-4 text-center">
          <p className="text-sm text-cyan-600">
            💡 Tip: Your fish are most active in the morning and evening!
          </p>
        </div>
      </div>
    </Card>
  );
}