
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="green-gradient text-white">
          <div className="container mx-auto px-4 py-16 md:py-24 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Podpořte lepší Česko: nové parky, cyklostezky a fontány
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Připojte se k nám a podpořte projekt na zlepšení infrastruktury ve vašem městě.
                Každý podpis se počítá!
              </p>
              <Link to="/petice" className="inline-block bg-white text-green-700 px-10 py-5 rounded-md font-bold shadow-lg hover:shadow-xl transition duration-300 text-2xl hover:scale-105">
                Podepsat petici
              </Link>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-12 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-green-700">O co se jedná?</h2>
              
              <div className="prose prose-lg max-w-none">
                <p>
                  Naše iniciativa "Zelený Hlas Česko" usiluje o výrazné zlepšení městské infrastruktury v šesti největších městech České republiky. 
                  Navrhujeme komplexní projekt, který zahrnuje:
                </p>
                
                <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="green-card p-6 flex flex-col items-center text-center">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg border-4 border-green-200 shadow-md">
                      <img 
                        src="/lovable-uploads/724fbd1b-8ecd-4de7-8516-3c51c51ce79c.png" 
                        alt="Park" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">Nové parky</h3>
                    <p className="text-gray-600">
                      Vytvoření nových zelených ploch pro odpočinek a rekreaci v hustě obydlených oblastech.
                    </p>
                  </div>
                  
                  <div className="green-card p-6 flex flex-col items-center text-center">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg border-4 border-green-200 shadow-md">
                      <img 
                        src="/lovable-uploads/5e9cd890-c9cb-4870-9b2b-c5f4e01342ad.png" 
                        alt="Cyklostezky" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">Cyklostezky</h3>
                    <p className="text-gray-600">
                      Vybudování komplexní sítě bezpečných cyklostezek pro ekologickou dopravu po městě.
                    </p>
                  </div>
                  
                  <div className="green-card p-6 flex flex-col items-center text-center">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg border-4 border-green-200 shadow-md">
                      <img 
                        src="/lovable-uploads/6b6271ea-86bf-40bc-b4af-033e033e794f.png" 
                        alt="Fontány" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">Fontány</h3>
                    <p className="text-gray-600">
                      Instalace nových fontán pro zlepšení mikroklimatu a vytvoření příjemných odpočinkových míst.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 text-green-700">Proč je to důležité?</h3>
                
                <p>
                  Moderní městská infrastruktura je klíčem k vyšší kvalitě života. Nové parky přinášejí zeleň do měst, 
                  cyklostezky nabízejí alternativu k automobilové dopravě a fontány pomáhají ochlazovat městské prostředí během horkých letních dnů.
                </p>
                
                <p>
                  Projekt bude realizován v Praze, Brně, Ostravě, Plzni, Liberci a Olomouci, přičemž v každém z těchto měst budou 
                  občané hlasovat o lokalizaci nových prvků ve svém konkrétním městském obvodu.
                </p>
                
                <div className="mt-10 flex justify-center">
                  <Link to="/petice" className="green-button text-center px-12 py-6 text-2xl font-bold hover:scale-105 transition-all duration-300">
                    Podpořit tento projekt
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <ProgressBar />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
