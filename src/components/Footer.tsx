
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-700">Zelený Hlas Česko</h3>
            <p className="text-gray-600">
              Občanská iniciativa pro zlepšení městské infrastruktury v České republice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-700">Státní Struktura</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Ministerstvo pro místní rozvoj ČR</li>
              <li>Ministerstvo životního prostředí ČR</li>
              <li>Státní fond životního prostředí ČR</li>
              <li>Asociace krajů České republiky</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-700">Právní informace</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="#" className="hover:text-green-500">Zásady ochrany osobních údajů</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-green-500">Podmínky použití</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-green-500">GDPR</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-green-500">Kontaktujte nás</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>© 2025 Zelený Hlas Česko. Všechna práva vyhrazena.</p>
          <p className="mt-2 text-sm">
            Registrováno na Ministerstvu vnitra ČR pod číslem jednacím: MV-123456-7/VS-2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
