import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { monitoringLocations, getOverallStatus, MonitoringLocation } from '../utils/monitoringData';

interface WaterQualityMapProps {
  onLocationSelect?: (location: MonitoringLocation) => void;
  selectedLocationId?: string;
}

export function WaterQualityMap({ onLocationSelect, selectedLocationId }: WaterQualityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;

    script.onload = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const L = (window as any).L;

      // Calculate center of all points
      const avgLat = monitoringLocations.reduce((sum, loc) => sum + loc.latitude, 0) / monitoringLocations.length;
      const avgLng = monitoringLocations.reduce((sum, loc) => sum + loc.longitude, 0) / monitoringLocations.length;

      // Initialize map
      const map = L.map(mapRef.current).setView([avgLat, avgLng], 14);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Create custom icons for different statuses
      const createIcon = (status: 'safe' | 'warning' | 'danger') => {
        const colors = {
          safe: '#22c55e',
          warning: '#3b82f6',
          danger: '#f59e0b',
        };

        return L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background-color: ${colors[status]};
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                <path d="M7.86 2c.3-.4.9-.4 1.2 0l8 11c.3.4 0 1-.6 1H.4c-.6 0-.9-.6-.6-1l8-11Z"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });
      };

      // Add markers for each location
      monitoringLocations.forEach((location) => {
        const status = getOverallStatus(location);
        const marker = L.marker([location.latitude, location.longitude], {
          icon: createIcon(status),
        }).addTo(map);

        const statusText = {
          safe: 'Normal',
          warning: 'Perlu Perhatian',
          danger: 'Perlu Peningkatan',
        }[status];

        const statusColor = {
          safe: '#22c55e',
          warning: '#3b82f6',
          danger: '#f59e0b',
        }[status];

        marker.bindPopup(`
          <div style="min-width: 200px;">
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 8px; color: #0f172a;">
              ${location.name}
            </div>
            <div style="
              display: inline-block;
              padding: 4px 8px;
              border-radius: 12px;
              background-color: ${statusColor}20;
              color: ${statusColor};
              font-size: 12px;
              font-weight: 500;
              margin-bottom: 8px;
            ">
              ${statusText}
            </div>
            <div style="font-size: 12px; color: #64748b; line-height: 1.6;">
              <div><strong>pH:</strong> ${location.pH}</div>
              <div><strong>EC:</strong> ${location.ec} mS/cm</div>
              <div><strong>TDS:</strong> ${location.tds} mg/L</div>
            </div>
          </div>
        `);

        marker.on('click', () => {
          if (onLocationSelect) {
            onLocationSelect(location);
          }
        });

        markersRef.current.push(marker);
      });

      // Fit bounds to show all markers
      const bounds = L.latLngBounds(
        monitoringLocations.map(loc => [loc.latitude, loc.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    };

    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onLocationSelect]);

  // Update marker styles when selection changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const L = (window as any).L;
    
    markersRef.current.forEach((marker, index) => {
      const location = monitoringLocations[index];
      const isSelected = location.id === selectedLocationId;
      const status = getOverallStatus(location);
      
      const colors = {
        safe: '#22c55e',
        warning: '#3b82f6',
        danger: '#f59e0b',
      };

      const scale = isSelected ? 1.3 : 1;
      const borderWidth = isSelected ? 4 : 3;

      marker.setIcon(L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${colors[status]};
            width: ${30 * scale}px;
            height: ${30 * scale}px;
            border-radius: 50%;
            border: ${borderWidth}px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <svg width="${16 * scale}" height="${16 * scale}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
              <path d="M7.86 2c.3-.4.9-.4 1.2 0l8 11c.3.4 0 1-.6 1H.4c-.6 0-.9-.6-.6-1l8-11Z"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
        `,
        iconSize: [30 * scale, 30 * scale],
        iconAnchor: [15 * scale, 15 * scale],
      }));
    });
  }, [selectedLocationId]);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border border-slate-200"
      />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
        <div className="text-sm font-medium text-slate-900 mb-3">Status Kualitas Air</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-600">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-xs text-slate-600">Perlu Perhatian</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
            <span className="text-xs text-slate-600">Perlu Peningkatan</span>
          </div>
        </div>
      </div>
    </div>
  );
}