import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import { usePetition } from '../context/PetitionContext';
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FB_EVENTS } from '../utils/fbPixel';

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

// Function to trigger Facebook Pixel events
const triggerFbPixel = (eventName: string, eventData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData);
    console.log(`FB Pixel event triggered: ${eventName}`, eventData);
  } else {
    console.log(`FB Pixel not available, would trigger: ${eventName}`, eventData);
  }
};

const PetitionForm: React.FC = () => {
  const navigate = useNavigate();
  const { submitPetition, trackEvent } = usePetition();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    workplacePosition: '', // Changed from profession
    education: 'Střední s maturitou',
    city: 'Praha' as City, // Type assertion to match the expected type
    district: 'Praha 1'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Track form progress to trigger pixel events
  useEffect(() => {
    // Trigger FormStart event when component mounts
    trackEvent(FB_EVENTS.FORM_START);
  }, [trackEvent]);
  
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
    
    // Track form field completion for important fields with standardized event name
    if (value && ['firstName', 'lastName', 'email', 'phone'].includes(name)) {
      trackEvent(FB_EVENTS.FORM_FIELD_COMPLETE, { field: name });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Try to submit petition data but don't wait for the response
      submitPetition({
        ...formData,
        profession: formData.workplacePosition, // Map to original field for compatibility
      })
        .then(() => {
          console.log("Form submitted successfully");
        })
        .catch((error) => {
          console.error('Error submitting petition:', error);
          // Even if there's an error, we still proceed to the next step
        });
      
      // Show toast and navigate immediately without waiting for API response
      toast({
        title: "Formulář byl odeslán",
        description: "Přesměrováváme vás na bankovní ověření",
      });
    } catch (error) {
      console.error('Error in submission process:', error);
      // Even in case of any synchronous error, proceed
      toast({
        variant: "destructive",
        title: "Upozornění",
        description: "Data byla uložena lokálně. Pokračujeme k dalšímu kroku.",
      });
    } finally {
      // Always navigate to bank verification regardless of API success
      setIsSubmitting(false);
      navigate('/overeni');
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
                    placeholder="Ulice, číslo popisné, PSČ, město"
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="workplacePosition" className="block text-sm font-medium text-gray-700">
                      Místo práce + pozice
                    </label>
                    <Input
                      id="workplacePosition"
                      name="workplacePosition"
                      value={formData.workplacePosition}
                      onChange={handleChange}
                      placeholder="Organizace + Vaše pozice"
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
