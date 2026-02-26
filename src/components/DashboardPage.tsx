import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { MapPin, TrendingUp, Download, Info } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';
import { WaterQualityCard } from './WaterQualityCard';
import { WaterQualityMap } from './WaterQualityMap';
import { monitoringLocations, getStatusFromPH, getStatusFromTDS, getStatusFromEC, getOverallStatus, MonitoringLocation } from '../utils/monitoringData';

export function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState<MonitoringLocation>(monitoringLocations[0]);
  const [viewMode, setViewMode] = useState<'comparison' | 'detail'>('comparison');

  const currentQuality = {
    pH: { value: selectedLocation.pH, status: getStatusFromPH(selectedLocation.pH), unit: '' },
    tds: { value: selectedLocation.tds, status: getStatusFromTDS(selectedLocation.tds), unit: 'mg/L' },
    ec: { value: selectedLocation.ec, status: getStatusFromEC(selectedLocation.ec), unit: 'mS/cm' },
  };

  // Comparison data across all locations
  const comparisonData = monitoringLocations.map(loc => ({
    location: loc.id,
    pH: loc.pH,
    tds: loc.tds,
    ec: loc.ec * 1000, // Convert to µS/cm for better visualization
  }));

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-slate-900 mb-2">Dashboard Monitoring Kualitas Air</h1>
          <p className="text-slate-600">
            Data monitoring dari {monitoringLocations.length} titik di Cileles, Jatinangor, Jawa Barat
          </p>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Informasi Data</h3>
              <p className="text-sm text-blue-800 mb-3">
                Data yang ditampilkan merupakan hasil pengukuran langsung di lapangan. 
                Karakteristik pH yang cenderung asam menunjukkan kondisi geologis alami di wilayah ini.
              </p>
              <div className="bg-white rounded-lg p-3">
                <h4 className="font-medium text-blue-900 text-sm mb-2">💡 Interpretasi Data:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Gunakan visualisasi untuk melihat perbandingan antar lokasi</li>
                  <li>• Klik titik pada peta untuk melihat detail pengukuran</li>
                  <li>• Data dapat diunduh untuk analisis lebih lanjut</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-sky-600" />
            <h3 className="text-slate-900">Peta Lokasi Monitoring</h3>
          </div>
          <WaterQualityMap 
            onLocationSelect={setSelectedLocation}
            selectedLocationId={selectedLocation.id}
          />
        </div>

        {/* Location Selector */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-sky-600" />
            <h3 className="text-slate-900">Pilih Lokasi Monitoring</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
            {monitoringLocations.map((location) => {
              const status = getOverallStatus(location);
              return (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedLocation.id === location.id
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-medium text-slate-900 text-sm mb-2">
                    {location.id}
                  </div>
                  <StatusIndicator status={status} size="sm" showLabel={false} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-slate-900 mb-1">{selectedLocation.name}</h3>
              <p className="text-sm text-slate-600">
                Lat: {selectedLocation.latitude.toFixed(6)}, Lng: {selectedLocation.longitude.toFixed(6)}
              </p>
            </div>
            <WaterQualityCard
              label="pH"
              value={currentQuality.pH.value}
              unit={currentQuality.pH.unit}
              status={currentQuality.pH.status}
              description="Tingkat keasaman"
            />
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-600 mb-1">Standar Normal</div>
              <div className="text-sm font-medium text-slate-900">6.5 - 8.5</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-4">
              <StatusIndicator status={getOverallStatus(selectedLocation)} />
            </div>
            <WaterQualityCard
              label="TDS"
              value={currentQuality.tds.value}
              unit={currentQuality.tds.unit}
              status={currentQuality.tds.status}
              description="Total zat terlarut"
            />
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-600 mb-1">Standar Normal</div>
              <div className="text-sm font-medium text-slate-900">{'< 300 mg/L'}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-4 h-8"></div>
            <WaterQualityCard
              label="EC"
              value={currentQuality.ec.value}
              unit={currentQuality.ec.unit}
              status={currentQuality.ec.status}
              description="Konduktivitas listrik"
            />
            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <div className="text-xs text-slate-600 mb-1">Standar Normal</div>
              <div className="text-sm font-medium text-slate-900">{'< 0.8 mS/cm'}</div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              <h3 className="text-slate-900">Perbandingan Antar Lokasi</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('comparison')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'comparison'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua Lokasi
              </button>
              <button
                onClick={() => setViewMode('detail')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'detail'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Detail Lokasi
              </button>
            </div>
          </div>

          {viewMode === 'comparison' ? (
            <div className="space-y-8">
              {/* pH Comparison */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-4">Tingkat pH per Lokasi</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="location"
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      domain={[0, 8]}
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="pH" fill="#0ea5e9" name="pH" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* TDS Comparison */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-4">TDS per Lokasi</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="location"
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="tds" fill="#14b8a6" name="TDS (mg/L)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* EC Comparison */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-4">EC per Lokasi</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="location"
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="ec" fill="#06b6d4" name="EC (µS/cm)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <h4 className="font-medium text-sky-900 mb-2">Data Detail: {selectedLocation.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-slate-600 mb-1">pH</div>
                    <div className="text-2xl font-bold text-sky-600">{selectedLocation.pH}</div>
                    <div className="text-xs text-slate-500 mt-1">Standar: 6.5 - 8.5</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-slate-600 mb-1">TDS</div>
                    <div className="text-2xl font-bold text-teal-600">{selectedLocation.tds} <span className="text-sm">mg/L</span></div>
                    <div className="text-xs text-slate-500 mt-1">Standar: {'< 300 mg/L'}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-slate-600 mb-1">EC</div>
                    <div className="text-2xl font-bold text-cyan-600">{selectedLocation.ec} <span className="text-sm">mS/cm</span></div>
                    <div className="text-xs text-slate-500 mt-1">Standar: {'< 0.8 mS/cm'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h4 className="font-medium text-slate-900 mb-4">Koordinat Lokasi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Latitude:</span>
                    <span className="ml-2 font-mono text-slate-900">{selectedLocation.latitude.toFixed(6)}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Longitude:</span>
                    <span className="ml-2 font-mono text-slate-900">{selectedLocation.longitude.toFixed(6)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Interpretasi Data</h4>
                <p className="text-sm text-blue-800 mb-3">
                  {selectedLocation.pH < 6.5 
                    ? 'Air di lokasi ini memiliki pH yang rendah (asam). Hal ini umum terjadi pada air tanah di wilayah tertentu.'
                    : selectedLocation.pH > 8.5
                    ? 'Air di lokasi ini memiliki pH yang tinggi (basa).'
                    : 'Air di lokasi ini memiliki pH dalam rentang normal.'
                  }
                </p>
                <p className="text-sm text-blue-800">
                  {selectedLocation.tds < 300
                    ? 'Nilai TDS dalam rentang yang baik untuk air minum.'
                    : 'Nilai TDS sedikit tinggi, pertimbangkan penggunaan filter untuk air minum.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Export Data */}
        <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-xl p-6 border border-sky-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-5 h-5 text-sky-600" />
                <h3 className="text-slate-900">Ekspor Data</h3>
              </div>
              <p className="text-sm text-slate-600">
                Download data lengkap untuk analisis lebih lanjut
              </p>
            </div>
            <button 
              onClick={() => {
                const csvContent = [
                  ['Location', 'Latitude', 'Longitude', 'pH', 'TDS (mg/L)', 'EC (mS/cm)'],
                  ...monitoringLocations.map(loc => [
                    loc.id,
                    loc.latitude,
                    loc.longitude,
                    loc.pH,
                    loc.tds,
                    loc.ec
                  ])
                ].map(row => row.join(',')).join('\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'data-kualitas-air-cileles.csv';
                a.click();
              }}
              className="bg-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}