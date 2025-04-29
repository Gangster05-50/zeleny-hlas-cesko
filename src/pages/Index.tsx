
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
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Podpořte lepší Česko: nové parky, cyklostezky a fontány
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Připojte se k nám a podpořte projekt na zlepšení infrastruktury ve vašem městě.
                Každý podpis se počítá!
              </p>
              <Link to="/petice" className="inline-block bg-white text-green-700 px-6 py-3 rounded-md font-medium shadow-md hover:shadow-lg transition duration-300">
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
                    <div className="w-16 h-16 green-gradient rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">Nové parky</h3>
                    <p className="text-gray-600">
                      Vytvoření nových zelených ploch pro odpočinek a rekreaci v hustě obydlených oblastech.
                    </p>
                  </div>
                  
                  <div className="green-card p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 green-gradient rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">Cyklostezky</h3>
                    <p className="text-gray-600">
                      Vybudování komplexní sítě bezpečných cyklostezek pro ekologickou dopravu po městě.
                    </p>
                  </div>
                  
                  <div className="green-card p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 green-gradient rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
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
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1433086966358-54859d0ed716" 
                    alt="Park s fontánou" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3" 
                    alt="Cyklostezka v zeleni" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
                
                <div className="mt-10">
                  <Link to="/petice" className="green-button">
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
