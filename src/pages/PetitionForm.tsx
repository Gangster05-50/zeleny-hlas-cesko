
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import { usePetition } from '../context/PetitionContext';
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Districts for each city
const cityDistricts: Record<string, string[]> = {
  'Praha': ['Praha 1', 'Praha 2', 'Praha 3', 'Praha 4', 'Praha 5', 'Praha 6', 'Praha 7', 'Praha 8', 'Praha 9', 'Praha 10'],
  'Brno': ['Brno-střed', 'Brno-sever', 'Brno-Královo Pole', 'Brno-Líšeň', 'Brno-Bystrc', 'Brno-Židenice'],
  'Ostrava': ['Moravská Ostrava a Přívoz', 'Slezská Ostrava', 'Ostrava-Jih', 'Poruba', 'Nová Ves', 'Vítkovice'],
  'Plzeň': ['Plzeň 1', 'Plzeň 2-Slovany', 'Plzeň 3', 'Plzeň 4', 'Plzeň 5-Křimice', 'Plzeň 6-Litice'],
  'Liberec': ['Liberec I-Staré Město', 'Liberec II-Nové Město', 'Liberec III-Jeřáb', 'Liberec IV-Perštýn', 'Liberec V-Kristiánov'],
  'Olomouc': ['Olomouc-střed', 'Olomouc-západ', 'Olomouc-východ', 'Olomouc-sever', 'Olomouc-jih', 'Neředín']
};

// Education levels
const educationLevels = [
  'Základní',
  'Střední bez maturity',
  'Střední s maturitou',
  'Vyšší odborné',
  'Bakalářské',
  'Magisterské',
  'Doktorské'
];

// Define valid city types to match the PetitionData type
type City = 'Praha' | 'Brno' | 'Ostrava' | 'Plzeň' | 'Liberec' | 'Olomouc';

const PetitionForm: React.FC = () => {
  const navigate = useNavigate();
  const { submitPetition } = usePetition();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    profession: '',
    education: 'Střední s maturitou',
    city: 'Praha' as City, // Type assertion to match the expected type
    district: 'Praha 1'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Update districts when city changes
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      district: cityDistricts[prev.city][0]
    }));
  }, [formData.city]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value as any
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.phone || !formData.email || !formData.address) {
        throw new Error('Vyplňte prosím všechny povinné údaje');
      }
      
      // Phone number validation (simple Czech format)
      const phoneRegex = /^(\+420)?\s*[0-9]{3}\s*[0-9]{3}\s*[0-9]{3}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error('Zadejte platné telefonní číslo (např. +420 123 456 789)');
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Zadejte platnou e-mailovou adresu');
      }
      
      const success = await submitPetition(formData);
      
      if (success) {
        toast({
          title: "Formulář byl odeslán",
          description: "Přesměrováváme vás na bankovní ověření",
        });
        navigate('/overeni');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Chyba při odesílání",
        description: error instanceof Error ? error.message : "Zkuste to prosím znovu",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-700 mb-2">Podpis petice</h1>
              <p className="text-gray-600">
                Vyplňte prosím následující údaje pro podepsání petice za zlepšení městské infrastruktury.
              </p>
            </div>
            
            <div className="green-card p-8">
              <h2 className="text-xl font-semibold mb-6">Osobní údaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      Jméno *
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Zadejte své jméno"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Příjmení *
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Zadejte své příjmení"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                      Datum narození *
                    </label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Telefonní číslo *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+420 123 456 789"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="vase@email.cz"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Adresa bydliště *
                  </label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Ulice, číslo popisné, PSČ, město"
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                      Profese
                    </label>
                    <Input
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      placeholder="Vaše současná profese"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                      Nejvyšší dosažené vzdělání
                    </label>
                    <select
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {educationLevels.map(level => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Město *
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {Object.keys(cityDistricts).map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                      Městská část *
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {cityDistricts[formData.city].map(district => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="green-button" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Odesílání...' : 'Pokračovat na ověření'}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-6 green-card p-6">
              <h3 className="text-lg font-medium mb-3 text-green-700">Důležité informace</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Všechny informace jsou zpracovány v souladu s GDPR.</li>
                <li>Pro dokončení petice je nutná verifikace pomocí bankovního účtu.</li>
                <li>Jeden občan může petici podepsat pouze jednou.</li>
                <li>Petice je určena pouze pro občany České republiky.</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <ProgressBar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PetitionForm;
