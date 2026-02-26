import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Play, Pause, Camera, Maximize, Volume2, VolumeX } from 'lucide-react';

interface LiveAquariumFeedProps {
  isLive?: boolean;
  aquariumImage?: string;
}

export function LiveAquariumFeed({ 
  isLive = true, 
  aquariumImage = "https://images.unsplash.com/photo-1631300692372-d96d2d13c20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZpc2glMjBhcXVhcml1bXxlbnwxfHx8fDE3NTc5MjIzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
}: LiveAquariumFeedProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <Card className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-teal-900">Live Aquarium Feed</h3>
            <div className="flex items-center gap-2">
              {isLive && (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <Badge className="bg-red-100 text-red-700 text-xs">LIVE</Badge>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-teal-600 hover:bg-teal-100 rounded-full p-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="text-teal-600 hover:bg-teal-100 rounded-full p-2"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-teal-600 hover:bg-teal-100 rounded-full p-2"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-cyan-200 to-blue-400 aspect-video">
        <ImageWithFallback
          src={aquariumImage}
          alt="Live Aquarium Feed"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Effects */}
        <div className="absolute inset-0">
          {/* Water ripple effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
          
          {/* Floating particles */}
          <div className="absolute top-4 left-4">
            <div className="w-1 h-1 bg-white/60 rounded-full animate-float"></div>
          </div>
          <div className="absolute top-8 right-6">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="absolute bottom-6 left-8">
            <div className="w-0.5 h-0.5 bg-white/70 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Play/Pause overlay when not playing */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="w-8 h-8 text-teal-600 ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Status indicators */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isLive && (
            <Badge className="bg-red-500 text-white text-xs shadow-lg">
              ● LIVE
            </Badge>
          )}
          <Badge className="bg-black/50 text-white text-xs backdrop-blur-sm">
            HD 1080p
          </Badge>
        </div>

        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-4">
              <span>Main Tank - Camera 1</span>
              <span className="text-white/80">24°C • pH 7.2</span>
            </div>
            <div className="text-white/80">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-teal-700">12</div>
          <div className="text-sm text-teal-600">Fish Active</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-teal-700">98%</div>
          <div className="text-sm text-teal-600">Water Quality</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-teal-700">24°C</div>
          <div className="text-sm text-teal-600">Temperature</div>
        </div>
      </div>
    </Card>
  );
}

// Add floating animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
    25% { transform: translateY(-10px) translateX(2px); opacity: 1; }
    50% { transform: translateY(-20px) translateX(-2px); opacity: 0.8; }
    75% { transform: translateY(-15px) translateX(1px); opacity: 1; }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
`;
document.head.appendChild(style);