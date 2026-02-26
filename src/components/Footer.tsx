import { Link } from 'react-router';
import { Mail, MapPin, Phone, Droplets } from 'lucide-react';
import logo from 'figma:asset/1513805fb544aad0115ee80b016f456c28d19c0e.png';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-sky-400 to-teal-500 p-2 rounded-lg">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white">AirBersih</div>
                <div className="text-xs text-slate-400">Cileles, Jatinangor</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Sistem monitoring kualitas air untuk masyarakat Cileles, Jatinangor, Jawa Barat
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-sky-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm hover:text-sky-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-sm hover:text-sky-400 transition-colors">
                  Tentang
                </Link>
              </li>
              <li>
                <Link to="/edukasi" className="text-sm hover:text-sky-400 transition-colors">
                  Edukasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-sky-400" />
                <span className="text-sm">info@airbersih.go.id</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-sky-400" />
                <span className="text-sm">+62 21 1234 5678</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-sky-400" />
                <span className="text-sm">Cileles, Jatinangor, Jawa Barat</span>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="SCG Logo" className="h-8 w-auto" />
            </div>
            <h3 className="font-semibold text-white mb-2">Monitoring Air Cileles</h3>
            <p className="text-sm text-slate-400 mb-4">
              Penelitian monitoring kualitas air di Cileles, Jatinangor, Jawa Barat
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>© 2026 AirBersih - Monitoring Kualitas Air Cileles, Jatinangor. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}