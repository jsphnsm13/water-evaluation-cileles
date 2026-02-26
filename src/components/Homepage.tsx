import { Link } from 'react-router';
import { Droplets, AlertCircle, CheckCircle, TrendingUp, MapPin, FileText, GraduationCap, ArrowRight, BookOpen } from 'lucide-react';
import { WaterQualityCard } from './WaterQualityCard';
import { StatusIndicator } from './StatusIndicator';
import { monitoringLocations, getAverageMetrics, getStatusFromPH, getStatusFromTDS, getStatusFromEC, getOverallStatus } from '../utils/monitoringData';
import logo from 'figma:asset/1513805fb544aad0115ee80b016f456c28d19c0e.png';

export function HomePage() {
  const avgMetrics = getAverageMetrics();
  
  const currentQuality = {
    pH: { value: avgMetrics.pH, status: getStatusFromPH(avgMetrics.pH), unit: '' },
    tds: { value: avgMetrics.tds, status: getStatusFromTDS(avgMetrics.tds), unit: 'mg/L' },
    ec: { value: avgMetrics.ec, status: getStatusFromEC(avgMetrics.ec), unit: 'mS/cm' },
  };

  // Calculate overall status based on all parameters
  const allStatuses = [currentQuality.pH.status, currentQuality.tds.status, currentQuality.ec.status];
  const overallStatus: 'safe' | 'warning' | 'danger' = 
    allStatuses.includes('danger') ? 'danger' :
    allStatuses.includes('warning') ? 'warning' : 'safe';

  const quickStats = [
    { label: 'Lokasi Monitoring', value: monitoringLocations.length.toString(), icon: MapPin },
    { label: 'Area', value: 'Cileles', icon: MapPin },
    { label: 'Status Keamanan', value: overallStatus === 'safe' ? '100%' : overallStatus === 'warning' ? '60%' : '30%', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-500 via-sky-600 to-teal-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA3IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                <img src={logo} alt="SCG Logo" className="h-12 w-auto" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Monitoring Air Cileles
                </h1>
                <div className="text-sky-100 text-base md:text-lg">Jatinangor, Jawa Barat</div>
              </div>
            </div>
            
            <p className="text-lg text-sky-50 mb-8 max-w-lg mx-auto">
              Penelitian monitoring kualitas air untuk memahami karakteristik dan kondisi air di Cileles, Jatinangor, Jawa Barat
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 px-6 py-3 rounded-lg font-medium hover:bg-sky-50 transition-colors"
              >
                Lihat Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/tentang"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Tentang Penelitian
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-sky-100 to-teal-100 p-3 rounded-lg">
                  <stat.icon className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-slate-900">Fitur Unggulan</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Akses data dan informasi lengkap dari penelitian monitoring kualitas air
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/dashboard"
            className="bg-white rounded-xl p-6 border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all group"
          >
            <div className="bg-gradient-to-br from-sky-100 to-sky-50 p-4 rounded-lg w-fit mb-4 group-hover:from-sky-500 group-hover:to-sky-400 transition-colors">
              <TrendingUp className="w-8 h-8 text-sky-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-slate-900 mb-2">Dashboard Monitoring</h3>
            <p className="text-sm text-slate-600">
              Visualisasi data kualitas air real-time dengan grafik dan peta interaktif
            </p>
          </Link>

          <Link
            to="/tentang"
            className="bg-white rounded-xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all group"
          >
            <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-4 rounded-lg w-fit mb-4 group-hover:from-teal-500 group-hover:to-teal-400 transition-colors">
              <BookOpen className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-slate-900 mb-2">Tentang Penelitian</h3>
            <p className="text-sm text-slate-600">
              Informasi tentang metodologi dan tujuan penelitian monitoring ini
            </p>
          </Link>

          <Link
            to="/edukasi"
            className="bg-white rounded-xl p-6 border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all group"
          >
            <div className="bg-gradient-to-br from-sky-100 to-sky-50 p-4 rounded-lg w-fit mb-4 group-hover:from-sky-500 group-hover:to-sky-400 transition-colors">
              <GraduationCap className="w-8 h-8 text-sky-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-slate-900 mb-2">Edukasi Kualitas Air</h3>
            <p className="text-sm text-slate-600">
              Pelajari lebih lanjut tentang parameter kualitas air dan standar kesehatan
            </p>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1658684765085-deba480d7056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwZHJvcGxldHN8ZW58MXx8fHwxNzcwNzk1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Air Bersih"
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="mb-6 text-slate-900">Tentang AirBersih</h2>
              <p className="text-slate-600 mb-4">
                Platform monitoring kualitas air ini merupakan bagian dari penelitian 
                untuk memahami karakteristik kualitas air di wilayah Cileles, Jatinangor, Jawa Barat.
              </p>
              <p className="text-slate-600 mb-6">
                Data dikumpulkan dari {monitoringLocations.length} titik monitoring yang tersebar di area Cileles 
                untuk memberikan gambaran komprehensif tentang kondisi kualitas air.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="text-2xl font-bold text-sky-600 mb-1">{monitoringLocations.length}</div>
                  <div className="text-sm text-slate-600">Lokasi Monitoring</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="text-2xl font-bold text-teal-600 mb-1">Cileles</div>
                  <div className="text-sm text-slate-600">Jatinangor, Jabar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-sky-500 to-teal-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="mb-4">Penelitian Air Bersih Cileles</h2>
          <p className="text-lg text-sky-50 mb-8 max-w-2xl mx-auto">
            Monitoring kualitas air di 16 titik lokasi untuk memahami kondisi air di Cileles, Jatinangor
          </p>
          <Link
            to="/tentang"
            className="inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-lg font-medium hover:bg-sky-50 transition-colors"
          >
            Pelajari Lebih Lanjut
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}