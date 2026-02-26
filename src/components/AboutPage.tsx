import { BookOpen, Mail, MapPin, Calendar, GraduationCap, CheckCircle } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-3 rounded-lg">
              <BookOpen className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-slate-900">Tentang Penelitian</h1>
              <p className="text-slate-600">Monitoring Kualitas Air di Cileles, Jatinangor</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mb-6">
          <h2 className="text-slate-900 mb-4">Latar Belakang Penelitian</h2>
          <p className="text-slate-600 mb-4">
            Penelitian ini merupakan bagian dari upaya monitoring kualitas air di wilayah Cileles, 
            Jatinangor, Jawa Barat. Monitoring dilakukan pada 16 titik sampling yang tersebar di 
            area tersebut untuk mendapatkan gambaran komprehensif tentang kondisi kualitas air.
          </p>
          <p className="text-slate-600 mb-4">
            Parameter yang diukur meliputi pH (tingkat keasaman), TDS (Total Dissolved Solids), 
            dan EC (Electrical Conductivity). Data ini penting untuk memahami karakteristik air 
            dan memberikan rekomendasi penggunaan yang tepat.
          </p>
        </div>

        {/* Methodology */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mb-6">
          <h2 className="text-slate-900 mb-4">Metodologi</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Lokasi Sampling</h3>
              <p className="text-slate-600">
                16 titik monitoring (TA01 - TA16) yang tersebar di area Cileles, Jatinangor
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Parameter Pengukuran</h3>
              <ul className="text-slate-600 space-y-1">
                <li>• <strong>pH:</strong> Menggunakan pH meter digital</li>
                <li>• <strong>TDS:</strong> Menggunakan TDS meter (satuan: mg/L)</li>
                <li>• <strong>EC:</strong> Menggunakan conductivity meter (satuan: mS/cm)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Standar Acuan</h3>
              <p className="text-slate-600">
                Peraturan Menteri Kesehatan Republik Indonesia tentang Standar Baku Mutu 
                Kesehatan Lingkungan dan Persyaratan Kesehatan Air untuk Keperluan Higiene 
                Sanitasi, Kolam Renang, Solus Per Aqua, dan Pemandian Umum
              </p>
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mb-6">
          <h2 className="text-slate-900 mb-4">Tujuan Penelitian</h2>
          <ul className="text-slate-600 space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Mengidentifikasi kondisi kualitas air di wilayah Cileles, Jatinangor</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Memetakan distribusi kualitas air berdasarkan parameter pH, TDS, dan EC</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Memberikan rekomendasi penggunaan air berdasarkan hasil analisis</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Menyediakan data baseline untuk monitoring jangka panjang</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-xl p-6 lg:p-8 border border-sky-200">
          <h2 className="text-slate-900 mb-4">Informasi Kontak</h2>
          <p className="text-slate-600 mb-6">
            Untuk pertanyaan atau informasi lebih lanjut mengenai penelitian ini, 
            silakan hubungi:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-sky-600" />
              <span className="text-slate-700">Penelitian Kualitas Air</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-sky-600" />
              <span className="text-slate-700">Cileles, Jatinangor, Jawa Barat</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-sky-600" />
              <a href="mailto:info@airbersih.go.id" className="text-sky-600 hover:text-sky-700">
                info@airbersih.go.id
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-sky-600" />
              <span className="text-slate-700">2026</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-medium text-amber-900 mb-2">Catatan Penting</h3>
          <p className="text-sm text-amber-800">
            Data yang ditampilkan pada website ini merupakan hasil pengukuran pada waktu tertentu 
            dan dapat berubah seiring waktu. Untuk keputusan penting terkait kualitas air, 
            disarankan untuk melakukan pengujian tambahan di laboratorium terakreditasi.
          </p>
        </div>
      </div>
    </div>
  );
}