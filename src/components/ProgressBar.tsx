
import React from 'react';
import { usePetition } from '../context/PetitionContext';
import { Progress } from "@/components/ui/progress";

const ProgressBar: React.FC = () => {
  const { submissionProgress, signatureCount, totalSignatures } = usePetition();

  return (
    <div className="green-card p-6 sticky top-6">
      <h3 className="text-xl font-semibold mb-4 text-green-700">Stav Petice</h3>
      
      <div className="mb-3">
        <Progress value={submissionProgress} className="h-2" />
      </div>
      
      <div className="flex justify-between text-sm mb-6">
        <span className="text-gray-600">0</span>
        <span className="font-medium text-green-700">{signatureCount} podpisů</span>
        <span className="text-gray-600">{totalSignatures}</span>
      </div>
      
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-2">
        <p className="text-green-700">
          Potřebujeme váš hlas! Pomozte nám dosáhnout našeho cíle {totalSignatures} podpisů.
        </p>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-2 text-gray-700">Zapojená města:</h4>
        <ul className="grid grid-cols-2 gap-2">
          <li className="text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">Praha</li>
          <li className="text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">Brno</li>
          <li className="text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">Ostrava</li>
          <li className="text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">Plzeň</li>
          <li className="text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">Liberec</li>
          <li className="text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">Olomouc</li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressBar;
