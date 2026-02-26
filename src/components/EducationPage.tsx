import { BookOpen, Droplet, CheckCircle, Info, Lightbulb, Heart, Beaker, Home, AlertCircle } from 'lucide-react';

export function EducationPage() {
  const waterParameters = [
    {
      parameter: 'pH (Tingkat Keasaman)',
      safeRange: '6.5 - 8.5',
      description: 'Mengukur apakah air bersifat asam, netral, atau basa',
      whatItMeans: 'pH seperti skala rasa pada makanan. Jika terlalu asam atau terlalu basa, air bisa terasa aneh di lidah',
      analogy: '🍋 Lemon = asam (pH rendah), 🥤 Air Putih = netral (pH 7), 🧼 Sabun = basa (pH tinggi)',
      icon: Droplet,
      color: 'sky',
    },
    {
      parameter: 'TDS (Zat Terlarut dalam Air)',
      safeRange: '< 300 mg/L (untuk air minum)',
      description: 'Jumlah mineral dan zat yang larut dalam air',
      whatItMeans: 'TDS menunjukkan berapa banyak "isi" dalam air, seperti garam, mineral, dan zat lainnya',
      analogy: '🧂 Bayangkan air garam: semakin banyak garam yang larut, semakin tinggi TDS-nya',
      icon: Beaker,
      color: 'teal',
    },
    {
      parameter: 'EC (Daya Hantar Listrik)',
      safeRange: '< 0.8 mS/cm',
      description: 'Mengukur seberapa baik air menghantarkan listrik',
      whatItMeans: 'Semakin banyak mineral dalam air, semakin mudah air menghantarkan listrik (ini normal!)',
      analogy: '⚡ Air murni susah menghantarkan listrik. Air mineral bisa menghantarkan listrik karena mengandung mineral',
      icon: Droplet,
      color: 'cyan',
    },
  ];

  const practicalTips = [
    {
      title: 'Untuk Air Minum',
      icon: Droplet,
      color: 'blue',
      tips: [
        {
          action: 'Rebus air minimal 10 menit',
          why: 'Membunuh kuman dan bakteri yang mungkin ada di air',
        },
        {
          action: 'Gunakan filter air atau penyaring sederhana',
          why: 'Menyaring kotoran dan partikel kecil yang tidak terlihat',
        },
        {
          action: 'Simpan air matang dalam wadah tertutup yang bersih',
          why: 'Mencegah air terkontaminasi ulang dari debu atau serangga',
        },
      ]
    },
    {
      title: 'Untuk Keperluan Rumah Tangga',
      icon: Home,
      color: 'teal',
      tips: [
        {
          action: 'Bersihkan tangki air setiap 6 bulan',
          why: 'Lumut dan kotoran bisa menumpuk di tangki dan mengotori air',
        },
        {
          action: 'Cek pipa air secara berkala',
          why: 'Pipa bocor atau berkarat bisa mengotori air yang mengalir',
        },
        {
          action: 'Perhatikan perubahan warna atau bau air',
          why: 'Tanda awal ada masalah dengan sumber atau sistem air',
        },
      ]
    },
  ];

  const commonQuestions = [
    {
      question: 'Kenapa air di tempat saya terasa asam (pH rendah)?',
      answer: 'Air dengan pH rendah (asam) itu sebenarnya umum di beberapa daerah, terutama yang tanahnya mengandung mineral tertentu. Ini bukan berarti air berbahaya!',
      whatToDo: [
        'Air asam masih bisa dipakai untuk mencuci dan mandi',
        'Untuk minum, rebus dulu minimal 10 menit',
        'Bisa ditambahkan kapur sirih sedikit untuk menetralkan (tanya dulu ke RT/RW cara yang benar)',
        'Atau gunakan filter air berkualitas baik',
      ],
      safe: true,
    },
    {
      question: 'Air saya keruh, apa berbahaya?',
      answer: 'Air keruh biasanya karena ada pasir atau tanah halus yang tersuspensi (melayang di air). Ini bisa terjadi saat musim hujan atau kalau ada gangguan di pipa.',
      whatToDo: [
        'Diamkan air dalam ember selama 30-60 menit, biarkan kotoran mengendap',
        'Ambil air bagian atas yang sudah jernih (jangan sampai ke endapan bawah)',
        'Saring dengan kain bersih atau filter sederhana',
        'Tetap rebus sebelum diminum',
      ],
      safe: true,
    },
    {
      question: 'Air berbau, apakah masih bisa dipakai?',
      answer: 'Bau pada air bisa karena tangki yang kotor atau ada zat organik (seperti daun atau lumut). Ini bisa diatasi dengan pembersihan.',
      whatToDo: [
        'Bersihkan tangki air Anda - ini penyebab paling umum',
        'Alirkan air beberapa menit untuk membuang air yang lama di pipa',
        'Gunakan filter karbon aktif jika memungkinkan',
        'Jika bau sangat kuat dan tidak hilang, hubungi RT/RW',
      ],
      safe: false,
    },
  ];

  const phExplanation = {
    acidic: {
      range: '< 6.5 (Asam)',
      color: 'yellow',
      meaning: 'Air cenderung asam - umum di beberapa wilayah',
      safe: 'Masih aman untuk kebanyakan keperluan rumah tangga dengan pengolahan yang tepat',
      example: 'Seperti rasa air lemon, tapi jauh lebih ringan'
    },
    neutral: {
      range: '6.5 - 8.5 (Normal)',
      color: 'green',
      meaning: 'Air dalam kondisi ideal',
      safe: 'Aman untuk semua keperluan termasuk minum (tetap rebus dulu ya!)',
      example: 'Seperti air mineral kemasan'
    },
    alkaline: {
      range: '> 8.5 (Basa)',
      color: 'blue',
      meaning: 'Air cenderung basa',
      safe: 'Masih aman, tapi sebaiknya diolah sebelum diminum',
      example: 'Seperti air yang tercampur sedikit sabun (tapi masih aman)'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-cyan-100 to-cyan-50 p-3 rounded-lg">
              <BookOpen className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-slate-900">Panduan Kualitas Air</h1>
              <p className="text-slate-600">Informasi mudah dipahami untuk masyarakat</p>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex gap-4">
            <Heart className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Selamat Datang! 👋</h3>
              <p className="text-blue-800 mb-3">
                Halaman ini dibuat khusus untuk membantu Anda memahami kualitas air <strong>tanpa bahasa teknis yang rumit</strong>. 
                Kami pakai bahasa sehari-hari dan contoh yang mudah dipahami.
              </p>
              <p className="text-blue-800">
                <strong>Ingat:</strong> Tidak ada air yang 100% sempurna. Yang penting kita tahu cara mengelola air dengan benar! 💧
              </p>
            </div>
          </div>
        </div>

        {/* What We Measure - Simple Explanation */}
        <div className="mb-8">
          <h2 className="text-slate-900 mb-2">Apa yang Kami Ukur?</h2>
          <p className="text-slate-600 mb-6">
            Kami mengukur 3 hal utama pada air. Berikut penjelasan sederhananya:
          </p>
          
          <div className="space-y-6">
            {waterParameters.map((param, index) => {
              const bgColor = {
                sky: 'bg-sky-50 border-sky-200',
                teal: 'bg-teal-50 border-teal-200',
                cyan: 'bg-cyan-50 border-cyan-200',
              }[param.color];

              const iconBg = {
                sky: 'bg-sky-100',
                teal: 'bg-teal-100',
                cyan: 'bg-cyan-100',
              }[param.color];

              const iconColor = {
                sky: 'text-sky-600',
                teal: 'text-teal-600',
                cyan: 'text-cyan-600',
              }[param.color];

              return (
                <div key={index} className={`${bgColor} border rounded-xl p-6`}>
                  <div className="flex items-start gap-4">
                    <div className={`${iconBg} p-3 rounded-lg flex-shrink-0`}>
                      <param.icon className={`w-8 h-8 ${iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-2">{param.parameter}</h3>
                      <p className="text-slate-700 mb-3"><strong>Apa itu?</strong> {param.description}</p>
                      <p className="text-slate-600 mb-3">{param.whatItMeans}</p>
                      <div className="bg-white rounded-lg p-3 mb-3">
                        <p className="text-sm text-slate-700">
                          <strong>Analogi sederhana:</strong> {param.analogy}
                        </p>
                      </div>
                      <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                        <div className="text-sm text-green-800 font-medium mb-1">✅ Nilai yang baik:</div>
                        <div className="text-lg font-bold text-green-900">{param.safeRange}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* pH Explanation Visual */}
        <div className="mb-8">
          <h2 className="text-slate-900 mb-4">Memahami pH (Level Keasaman) Air</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
              <div className="text-2xl mb-2">🍋</div>
              <h3 className="text-yellow-900 font-bold mb-2">{phExplanation.acidic.range}</h3>
              <p className="text-sm text-yellow-800 mb-2"><strong>{phExplanation.acidic.meaning}</strong></p>
              <p className="text-sm text-yellow-700 mb-2">{phExplanation.acidic.safe}</p>
              <p className="text-xs text-yellow-600 italic">{phExplanation.acidic.example}</p>
            </div>
            
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6 ring-2 ring-green-500 ring-offset-2">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="text-green-900 font-bold mb-2">{phExplanation.neutral.range}</h3>
              <p className="text-sm text-green-800 mb-2"><strong>{phExplanation.neutral.meaning}</strong></p>
              <p className="text-sm text-green-700 mb-2">{phExplanation.neutral.safe}</p>
              <p className="text-xs text-green-600 italic">{phExplanation.neutral.example}</p>
            </div>
            
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
              <div className="text-2xl mb-2">🧼</div>
              <h3 className="text-blue-900 font-bold mb-2">{phExplanation.alkaline.range}</h3>
              <p className="text-sm text-blue-800 mb-2"><strong>{phExplanation.alkaline.meaning}</strong></p>
              <p className="text-sm text-blue-700 mb-2">{phExplanation.alkaline.safe}</p>
              <p className="text-xs text-blue-600 italic">{phExplanation.alkaline.example}</p>
            </div>
          </div>
        </div>

        {/* Practical Tips */}
        <div className="mb-8">
          <h2 className="text-slate-900 mb-6">Tips Praktis Sehari-hari</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicalTips.map((section, index) => {
              const colors = {
                blue: { bg: 'bg-blue-50 border-blue-200', icon: 'bg-blue-100 text-blue-600' },
                teal: { bg: 'bg-teal-50 border-teal-200', icon: 'bg-teal-100 text-teal-600' }
              }[section.color];

              return (
                <div key={index} className={`${colors.bg} border rounded-xl p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${colors.icon} p-3 rounded-lg`}>
                      <section.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-slate-900">{section.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {section.tips.map((tip, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="font-medium text-slate-900">{tip.action}</p>
                        </div>
                        <p className="text-sm text-slate-600 ml-8">
                          <strong>Kenapa?</strong> {tip.why}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Common Questions */}
        <div className="mb-8">
          <h2 className="text-slate-900 mb-6">Pertanyaan yang Sering Ditanyakan</h2>
          <div className="space-y-6">
            {commonQuestions.map((qa, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${qa.safe ? 'bg-blue-100' : 'bg-amber-100'}`}>
                    {qa.safe ? (
                      <Info className="w-5 h-5 text-blue-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-900 mb-3">{qa.question}</h3>
                    <p className="text-slate-700 mb-4">{qa.answer}</p>
                    
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4">
                      <div className="font-medium text-slate-900 mb-2">✨ Yang Bisa Anda Lakukan:</div>
                      <ul className="space-y-2">
                        {qa.whatToDo.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-sky-500 to-teal-500 rounded-xl p-8 text-white">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl mb-3">Masih Ada Pertanyaan?</h3>
              <p className="mb-4 text-sky-50">
                Jangan ragu untuk bertanya! Tim peneliti kami siap membantu menjelaskan dengan bahasa yang mudah dipahami. 
                Tidak ada pertanyaan yang bodoh - setiap pertanyaan membantu kita semua belajar lebih banyak tentang air yang kita gunakan sehari-hari.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/tentang"
                  className="inline-flex items-center justify-center bg-white text-sky-600 px-6 py-3 rounded-lg font-medium hover:bg-sky-50 transition-colors"
                >
                  Tentang Penelitian
                </a>
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  Lihat Data
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
