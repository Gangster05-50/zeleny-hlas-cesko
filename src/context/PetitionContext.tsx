
import React, { createContext, useState, useContext } from 'react';

type City = 'Praha' | 'Brno' | 'Ostrava' | 'Plzeň' | 'Liberec' | 'Olomouc';

interface PetitionData {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  profession: string;
  education: string;
  city: City;
  district: string;
  bank?: string;
}

interface PetitionContextType {
  petitionData: PetitionData;
  setPetitionData: React.Dispatch<React.SetStateAction<PetitionData>>;
  submissionProgress: number;
  totalSignatures: number;
  signatureCount: number;
  submitPetition: (data: PetitionData) => Promise<boolean>;
  completeBankVerification: (bank: string) => Promise<boolean>;
}

const defaultPetitionData: PetitionData = {
  firstName: '',
  lastName: '',
  birthDate: '',
  phone: '',
  email: '',
  address: '',
  profession: '',
  education: 'Střední s maturitou',
  city: 'Praha',
  district: '',
};

const PetitionContext = createContext<PetitionContextType | undefined>(undefined);

export const PetitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [petitionData, setPetitionData] = useState<PetitionData>(defaultPetitionData);
  const totalSignatures = 10000;
  const signatureCount = 3000; // 30% of 10,000 as requested
  const submissionProgress = (signatureCount / totalSignatures) * 100;

  // Simulate sending data to the server
  const submitPetition = async (data: PetitionData): Promise<boolean> => {
    console.log('Submitting petition data:', data);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPetitionData(data);
    return true;
  };

  const completeBankVerification = async (bank: string): Promise<boolean> => {
    console.log('Completing bank verification with bank:', bank);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPetitionData(prev => ({ ...prev, bank }));
    return true;
  };

  return (
    <PetitionContext.Provider
      value={{
        petitionData,
        setPetitionData,
        submissionProgress,
        totalSignatures,
        signatureCount,
        submitPetition,
        completeBankVerification,
      }}
    >
      {children}
    </PetitionContext.Provider>
  );
};

export const usePetition = (): PetitionContextType => {
  const context = useContext(PetitionContext);
  if (context === undefined) {
    throw new Error('usePetition must be used within a PetitionProvider');
  }
  return context;
};
