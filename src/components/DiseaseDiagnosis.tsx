import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Stethoscope, Camera, MessageSquare, Search, Upload, CheckCircle, AlertTriangle, Info, ArrowRight, Book, Pill } from 'lucide-react';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  symptoms: string[];
  treatment: string;
  medication: string[];
  prevention: string[];
}

interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  causes: string[];
  treatment: string;
  medication: string[];
  prevention: string[];
  severity: 'mild' | 'moderate' | 'severe';
  image: string;
}

const diseaseDatabase: Disease[] = [
  {
    id: 'ich',
    name: 'Bintik Putih (Ich)',
    symptoms: ['Bintik putih pada tubuh dan sirip', 'Ikan menggosok-gosok tubuh', 'Nafas tersengal-sengal', 'Lesu dan tidak aktif'],
    causes: ['Stres akibat perubahan suhu', 'Kualitas air buruk', 'Ikan baru yang terinfeksi'],
    treatment: 'Naikkan suhu air secara bertahap hingga 30°C, tambahkan garam ikan, gunakan obat anti parasit',
    medication: ['Methylene Blue', 'Malachite Green', 'Copper Sulfate'],
    prevention: ['Karantina ikan baru', 'Jaga kualitas air', 'Hindari stres pada ikan'],
    severity: 'moderate',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG93bmZpc2h8ZW58MXx8fHwxNzU3OTIyODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'fin-rot',
    name: 'Busuk Sirip (Fin Rot)',
    symptoms: ['Sirip robek atau rusak', 'Tepi sirip berwarna hitam/putih', 'Sirip memendek', 'Perilaku lesu'],
    causes: ['Kualitas air buruk', 'Cedera fisik', 'Stres berkepanjangan'],
    treatment: 'Perbaiki kualitas air, gunakan antibiotik, potong bagian sirip yang rusak dengan steril',
    medication: ['Tetracycline', 'Erythromycin', 'Fungus Cure'],
    prevention: ['Jaga kebersihan air', 'Hindari overcrowding', 'Beri makanan bergizi'],
    severity: 'mild',
    image: 'https://images.unsplash.com/photo-1728659328144-9b652a7acf3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXR0YSUyMGZpc2glMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc1NzkyMjYwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'dropsy',
    name: 'Perut Kembung (Dropsy)',
    symptoms: ['Perut membengkak', 'Sisik berdiri', 'Mata menonjol', 'Nafas berat'],
    causes: ['Infeksi bakteri', 'Gangguan organ dalam', 'Kualitas air buruk'],
    treatment: 'Isolasi ikan, gunakan antibiotik kuat, tambahkan garam epsom, perbaiki kualitas air',
    medication: ['Kanamycin', 'Nitrofurazone', 'Epsom Salt'],
    prevention: ['Jaga kualitas air optimal', 'Beri makanan berkualitas', 'Hindari stres'],
    severity: 'severe',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZmlzaHxlbnwxfHx8fDE3NTc5MjI4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function DiseaseDiagnosis() {
  const [activeTab, setActiveTab] = useState<'symptom-checker' | 'ai-camera' | 'disease-directory' | 'medication'>('symptom-checker');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const symptomQuestions = [
    {
      question: "Bagaimana penampilan fisik ikan Anda?",
      options: [
        "Bintik putih pada tubuh/sirip",
        "Sirip robek atau rusak",
        "Perut membengkak",
        "Mata menonjol",
        "Sisik berdiri",
        "Luka atau borok pada tubuh",
        "Perubahan warna"
      ]
    },
    {
      question: "Bagaimana perilaku ikan Anda?",
      options: [
        "Lesu dan tidak aktif",
        "Menggosok-gosok tubuh",
        "Nafas tersengal-sengal",
        "Berenang tidak normal",
        "Tidak mau makan",
        "Bersembunyi terus",
        "Berenang di permukaan"
      ]
    },
    {
      question: "Kondisi akuarium seperti apa?",
      options: [
        "Baru menambah ikan",
        "Jarang ganti air",
        "Suhu air berubah drastis",
        "Air keruh atau berbau",
        "Overcrowding",
        "Filter tidak berfungsi",
        "pH air tidak stabil"
      ]
    }
  ];

  const handleSymptomSelect = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < symptomQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Simulate diagnosis
      const mockResult: DiagnosisResult = {
        disease: "Bintik Putih (Ich)",
        confidence: 85,
        symptoms: selectedSymptoms.slice(0, 3),
        treatment: "Naikkan suhu air secara bertahap hingga 30°C, tambahkan garam ikan, gunakan obat anti parasit",
        medication: ["Methylene Blue", "Malachite Green"],
        prevention: ["Karantina ikan baru", "Jaga kualitas air", "Hindari stres pada ikan"]
      };
      setDiagnosisResult(mockResult);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Simulate AI analysis
        setTimeout(() => {
          const mockResult: DiagnosisResult = {
            disease: "Busuk Sirip (Fin Rot)",
            confidence: 78,
            symptoms: ["Sirip robek atau rusak", "Tepi sirip berwarna hitam"],
            treatment: "Perbaiki kualitas air, gunakan antibiotik, potong bagian sirip yang rusak dengan steril",
            medication: ["Tetracycline", "Erythromycin"],
            prevention: ["Jaga kebersihan air", "Hindari overcrowding"]
          };
          setDiagnosisResult(mockResult);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetDiagnosis = () => {
    setCurrentStep(0);
    setSelectedSymptoms([]);
    setDiagnosisResult(null);
    setUploadedImage(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'severe': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDiseases = diseaseDatabase.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderSymptomChecker = () => {
    if (diagnosisResult) {
      return (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800">Hasil Diagnosis</h3>
                <p className="text-green-600">Confidence: {diagnosisResult.confidence}%</p>
              </div>
            </div>
            
            <div className="bg-white/60 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">{diagnosisResult.disease}</h4>
              <p className="text-gray-700">{diagnosisResult.treatment}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Obat yang Direkomendasikan</h5>
                <div className="space-y-2">
                  {diagnosisResult.medication.map((med, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {med}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Pencegahan</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {diagnosisResult.prevention.map((prev, index) => (
                    <li key={index}>• {prev}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button onClick={resetDiagnosis} variant="outline">
              Diagnosis Ulang
            </Button>
            <Button onClick={() => setActiveTab('medication')}>
              Lihat Obat <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">Pemeriksa Gejala AI</h3>
          <p className="text-gray-600">Jawab beberapa pertanyaan untuk mendapatkan diagnosis awal</p>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Langkah {currentStep + 1} dari {symptomQuestions.length}
              </span>
              <span className="text-sm text-gray-500">
                {selectedSymptoms.length} gejala dipilih
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / symptomQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              {symptomQuestions[currentStep].question}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {symptomQuestions[currentStep].options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedSymptoms.includes(option) ? "default" : "outline"}
                  className="text-left justify-start h-auto p-4"
                  onClick={() => handleSymptomSelect(option)}
                >
                  <CheckCircle className={`w-4 h-4 mr-3 ${
                    selectedSymptoms.includes(option) ? 'text-white' : 'text-gray-400'
                  }`} />
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Sebelumnya
            </Button>
            <Button 
              onClick={handleNextStep}
              disabled={selectedSymptoms.length === 0}
            >
              {currentStep === symptomQuestions.length - 1 ? 'Diagnosis' : 'Selanjutnya'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  const renderAICamera = () => {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">AI Camera Diagnosis</h3>
          <p className="text-gray-600">Upload foto ikan Anda untuk analisis AI</p>
        </div>

        {!uploadedImage ? (
          <Card className="p-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Camera className="w-10 h-10 text-white" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Upload Foto Ikan</h4>
                <p className="text-gray-600">Pastikan foto jelas dan fokus pada area yang bermasalah</p>
              </div>

              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="fish-photo"
                />
                <label htmlFor="fish-photo">
                  <Button asChild className="cursor-pointer">
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Pilih Foto
                    </span>
                  </Button>
                </label>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Format: JPG, PNG (Max 5MB)</p>
                  <p>• Pencahayaan yang baik</p>
                  <p>• Fokus pada area yang sakit</p>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Foto yang diupload</h4>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded fish" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">AI sedang menganalisis...</h4>
                  
                  {diagnosisResult ? (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Analisis Selesai</span>
                        </div>
                        <p className="text-green-700">
                          Terdeteksi: <strong>{diagnosisResult.disease}</strong>
                        </p>
                        <p className="text-sm text-green-600">
                          Confidence: {diagnosisResult.confidence}%
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <h5 className="font-medium">Pengobatan yang Disarankan</h5>
                        <p className="text-gray-700 text-sm">{diagnosisResult.treatment}</p>
                        
                        <div>
                          <h6 className="font-medium text-sm mb-2">Obat yang direkomendasikan:</h6>
                          <div className="flex flex-wrap gap-2">
                            {diagnosisResult.medication.map((med, index) => (
                              <Badge key={index} variant="outline">{med}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="animate-pulse space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <p className="text-sm text-gray-600">Proses analisis memakan waktu 10-30 detik...</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
            
            <div className="flex gap-4">
              <Button onClick={resetDiagnosis} variant="outline">
                Upload Foto Lain
              </Button>
              {diagnosisResult && (
                <Button onClick={() => setActiveTab('medication')}>
                  Lihat Obat <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTabs = () => {
    const tabs = [
      { id: 'symptom-checker', label: 'Pemeriksa Gejala', icon: MessageSquare },
      { id: 'ai-camera', label: 'AI Camera', icon: Camera, badge: 'Beta' },
      { id: 'disease-directory', label: 'Direktori Penyakit', icon: Book },
      { id: 'medication', label: 'Obat & Treatment', icon: Pill }
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.badge && (
                <Badge className="ml-1 bg-orange-400 text-white text-xs px-1 py-0">
                  {tab.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pusat Diagnosa Penyakit</h1>
          <p className="text-gray-600 mt-2">Diagnosis AI dan informasi lengkap penyakit ikan hias</p>
        </div>
        
        {renderTabs()}
      </div>

      {activeTab === 'symptom-checker' && renderSymptomChecker()}
      {activeTab === 'ai-camera' && renderAICamera()}
      
      {activeTab === 'disease-directory' && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Cari penyakit atau gejala..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDiseases.map((disease) => (
              <Card key={disease.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={disease.image}
                    alt={disease.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={getSeverityColor(disease.severity)}>
                      {disease.severity === 'mild' ? 'Ringan' : 
                       disease.severity === 'moderate' ? 'Sedang' : 'Berat'}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">{disease.name}</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Gejala</h4>
                      <div className="flex flex-wrap gap-1">
                        {disease.symptoms.slice(0, 3).map((symptom, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                        {disease.symptoms.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{disease.symptoms.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Pengobatan</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{disease.treatment}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'medication' && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Direktori Obat & Treatment</h3>
            <p className="text-gray-600">Panduan lengkap obat dan cara pengobatan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Methylene Blue',
                uses: 'Anti jamur, anti bakteri',
                dosage: '1 tetes per 4 liter air',
                type: 'Antiseptik',
                price: 'Rp 25,000'
              },
              {
                name: 'Malachite Green',
                uses: 'Anti parasit, anti jamur',
                dosage: '0.1 mg per liter air',
                type: 'Anti Parasit',
                price: 'Rp 30,000'
              },
              {
                name: 'Tetracycline',
                uses: 'Antibiotik broad spectrum',
                dosage: '10-20 mg per liter air',
                type: 'Antibiotik',
                price: 'Rp 45,000'
              },
              {
                name: 'Garam Ikan',
                uses: 'Antiseptik alami, osmosis',
                dosage: '1-3 gram per liter air',
                type: 'Alami',
                price: 'Rp 15,000'
              },
              {
                name: 'Acriflavine',
                uses: 'Anti bakteri, luka eksternal',
                dosage: '5-10 mg per liter air',
                type: 'Antiseptik',
                price: 'Rp 35,000'
              },
              {
                name: 'Copper Sulfate',
                uses: 'Anti parasit kuat',
                dosage: '0.15-0.20 mg per liter',
                type: 'Anti Parasit',
                price: 'Rp 40,000'
              }
            ].map((med, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">{med.name}</h4>
                    <Badge variant="outline">{med.type}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Kegunaan: </span>
                      <span>{med.uses}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Dosis: </span>
                      <span className="font-medium">{med.dosage}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-semibold">{med.price}</span>
                      <Button size="sm" variant="outline">
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}