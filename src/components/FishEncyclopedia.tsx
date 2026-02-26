import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Filter, Heart, Star, Droplets, Thermometer, Fish, Info } from 'lucide-react';

interface FishSpecies {
  id: string;
  name: string;
  scientificName: string;
  category: 'freshwater' | 'saltwater';
  difficulty: 'easy' | 'medium' | 'hard';
  image: string;
  temperatureRange: [number, number];
  phRange: [number, number];
  size: string;
  lifespan: string;
  diet: string;
  behavior: string;
  popularity: number;
  price: string;
  diseases: string[];
}

const fishDatabase: FishSpecies[] = [
  {
    id: 'betta',
    name: 'Ikan Cupang',
    scientificName: 'Betta splendens',
    category: 'freshwater',
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1728659328144-9b652a7acf3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXR0YSUyMGZpc2glMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc1NzkyMjYwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    temperatureRange: [24, 28],
    phRange: [6.5, 7.5],
    size: '5-7 cm',
    lifespan: '2-3 tahun',
    diet: 'Karnivora',
    behavior: 'Agresif, teritorial',
    popularity: 95,
    price: 'Rp 15.000 - 500.000',
    diseases: ['Fin Rot', 'Ich', 'Velvet']
  },
  {
    id: 'angelfish',
    name: 'Ikan Manfish',
    scientificName: 'Pterophyllum scalare',
    category: 'freshwater',
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1744366071536-7c0c536962a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHRyb3BpY2FsJTIwZmlzaCUyMGFxdWFyaXVtfGVufDF8fHx8MTc1NzkyMjU5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    temperatureRange: [24, 30],
    phRange: [6.0, 7.5],
    size: '15-20 cm',
    lifespan: '10-12 tahun',
    diet: 'Omnivora',
    behavior: 'Damai, berkelompok',
    popularity: 85,
    price: 'Rp 25.000 - 150.000',
    diseases: ['Hexamita', 'Ich', 'Bacterial Infections']
  },
  {
    id: 'goldfish',
    name: 'Ikan Mas Koki',
    scientificName: 'Carassius auratus',
    category: 'freshwater',
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZmlzaHxlbnwxfHx8fDE3NTc5MjI4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    temperatureRange: [18, 24],
    phRange: [6.5, 8.0],
    size: '10-25 cm',
    lifespan: '10-30 tahun',
    diet: 'Omnivora',
    behavior: 'Damai, sosial',
    popularity: 90,
    price: 'Rp 20.000 - 300.000',
    diseases: ['Swim Bladder Disease', 'Ich', 'Fin Rot']
  },
  {
    id: 'neon-tetra',
    name: 'Neon Tetra',
    scientificName: 'Paracheirodon innesi',
    category: 'freshwater',
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwdGV0cmF8ZW58MXx8fHwxNzU3OTIyODY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    temperatureRange: [20, 26],
    phRange: [5.0, 7.0],
    size: '3-4 cm',
    lifespan: '5-8 tahun',
    diet: 'Omnivora',
    behavior: 'Damai, bergerombol',
    popularity: 80,
    price: 'Rp 5.000 - 15.000',
    diseases: ['Neon Tetra Disease', 'Ich', 'Bacterial Infections']
  },
  {
    id: 'clownfish',
    name: 'Ikan Badut',
    scientificName: 'Amphiprion ocellatus',
    category: 'saltwater',
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG93bmZpc2h8ZW58MXx8fHwxNzU3OTIyODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    temperatureRange: [24, 28],
    phRange: [8.0, 8.4],
    size: '8-11 cm',
    lifespan: '6-10 tahun',
    diet: 'Omnivora',
    behavior: 'Teritorial, simbiosis',
    popularity: 75,
    price: 'Rp 50.000 - 200.000',
    diseases: ['Marine Ich', 'Brooklynella', 'Velvet']
  },
  {
    id: 'discus',
    name: 'Ikan Discus',
    scientificName: 'Symphysodon aequifasciatus',
    category: 'freshwater',
    difficulty: 'hard',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNjdXMlMjBmaXNofGVufDF8fHx8MTc1NzkyMjg3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    temperatureRange: [26, 30],
    phRange: [6.0, 7.0],
    size: '15-20 cm',
    lifespan: '10-15 tahun',
    diet: 'Karnivora',
    behavior: 'Damai, berkelompok',
    popularity: 70,
    price: 'Rp 100.000 - 1.000.000',
    diseases: ['Hexamita', 'Discus Plague', 'Bacterial Infections']
  }
];

export function FishEncyclopedia() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'freshwater' | 'saltwater'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [selectedFish, setSelectedFish] = useState<FishSpecies | null>(null);

  const filteredFish = fishDatabase.filter(fish => {
    const matchesSearch = fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fish.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || fish.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    return category === 'freshwater' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700';
  };

  if (selectedFish) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedFish(null)}
            className="flex items-center gap-2"
          >
            ← Kembali ke Daftar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src={selectedFish.image}
                  alt={selectedFish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={getCategoryColor(selectedFish.category)}>
                    {selectedFish.category === 'freshwater' ? 'Air Tawar' : 'Air Laut'}
                  </Badge>
                  <Badge className={getDifficultyColor(selectedFish.difficulty)}>
                    {selectedFish.difficulty === 'easy' ? 'Mudah' : 
                     selectedFish.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedFish.name}</h1>
                  <p className="text-gray-600 italic">{selectedFish.scientificName}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{selectedFish.popularity}/100</span>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    {selectedFish.price}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                Informasi Dasar
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Ukuran</p>
                  <p className="font-medium">{selectedFish.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Umur</p>
                  <p className="font-medium">{selectedFish.lifespan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Diet</p>
                  <p className="font-medium">{selectedFish.diet}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sifat</p>
                  <p className="font-medium">{selectedFish.behavior}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-500" />
                Parameter Air
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span>Suhu</span>
                  </div>
                  <span className="font-medium">
                    {selectedFish.temperatureRange[0]}°C - {selectedFish.temperatureRange[1]}°C
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>pH</span>
                  </div>
                  <span className="font-medium">
                    {selectedFish.phRange[0]} - {selectedFish.phRange[1]}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-600">Penyakit Umum</h3>
              <div className="space-y-2">
                {selectedFish.diseases.map((disease, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {disease}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ensiklopedia Ikan Hias</h1>
          <p className="text-gray-600 mt-2">Database lengkap spesies ikan hias dengan informasi perawatan</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari nama ikan atau nama ilmiah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="sm"
            >
              Semua
            </Button>
            <Button
              variant={selectedCategory === 'freshwater' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('freshwater')}
              size="sm"
            >
              Air Tawar
            </Button>
            <Button
              variant={selectedCategory === 'saltwater' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('saltwater')}
              size="sm"
            >
              Air Laut
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedDifficulty('all')}
              size="sm"
            >
              <Filter className="w-4 h-4 mr-1" />
              Semua Level
            </Button>
            <Button
              variant={selectedDifficulty === 'easy' ? 'default' : 'outline'}
              onClick={() => setSelectedDifficulty('easy')}
              size="sm"
            >
              Mudah
            </Button>
            <Button
              variant={selectedDifficulty === 'medium' ? 'default' : 'outline'}
              onClick={() => setSelectedDifficulty('medium')}
              size="sm"
            >
              Sedang
            </Button>
            <Button
              variant={selectedDifficulty === 'hard' ? 'default' : 'outline'}
              onClick={() => setSelectedDifficulty('hard')}
              size="sm"
            >
              Sulit
            </Button>
          </div>
        </div>
      </div>

      {/* Fish Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFish.map((fish) => (
          <Card 
            key={fish.id} 
            className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => setSelectedFish(fish)}
          >
            <div className="aspect-video relative overflow-hidden">
              <ImageWithFallback
                src={fish.image}
                alt={fish.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className={getCategoryColor(fish.category)}>
                  {fish.category === 'freshwater' ? 'Air Tawar' : 'Air Laut'}
                </Badge>
                <Badge className={getDifficultyColor(fish.difficulty)}>
                  {fish.difficulty === 'easy' ? 'Mudah' : 
                   fish.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg group-hover:text-cyan-700 transition-colors">
                  {fish.name}
                </h3>
                <p className="text-sm text-gray-600 italic">{fish.scientificName}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{fish.temperatureRange[0]}-{fish.temperatureRange[1]}°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">pH {fish.phRange[0]}-{fish.phRange[1]}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{fish.popularity}</span>
                </div>
              </div>
              
              <div className="text-sm font-medium text-green-600">
                {fish.price}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredFish.length === 0 && (
        <div className="text-center py-12">
          <Fish className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada ikan ditemukan</h3>
          <p className="text-gray-600">Coba ubah kriteria pencarian Anda</p>
        </div>
      )}
    </div>
  );
}