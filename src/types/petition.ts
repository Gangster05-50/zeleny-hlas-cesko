
export type City = 'Praha' | 'Brno' | 'Ostrava' | 'Plzeň' | 'Liberec' | 'Olomouc';

export interface PetitionData {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  profession: string;
  workplacePosition?: string; 
  education: string;
  city: City;
  district: string;
  bank?: string;
}

export interface CreateLinkResponse {
  link?: string;
}

export interface PetitionContextType {
  petitionData: PetitionData;
  setPetitionData: React.Dispatch<React.SetStateAction<PetitionData>>;
  submissionProgress: number;
  totalSignatures: number;
  signatureCount: number;
  submitPetition: (data: PetitionData) => Promise<boolean>;
  completeBankVerification: (bank: string) => Promise<boolean>;
  createBankLink: (bankId: string) => Promise<string>;
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
}
