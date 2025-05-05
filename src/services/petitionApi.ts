
import axios from 'axios';
import { PetitionData, CreateLinkResponse } from '../types/petition';

// Send data to the API endpoint with timeout to prevent long waiting
export const submitPetitionData = async (data: PetitionData): Promise<boolean> => {
  try {
    await Promise.race([
      axios.post('/api/confirm', data),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), 3000))
    ]);
    return true;
  } catch (error) {
    console.warn('API submission timeout or error, continuing with local data');
    return true;
  }
};

export const sendVerifyBankRequest = async (bank: string): Promise<boolean> => {
  try {
    await Promise.race([
      new Promise(resolve => setTimeout(resolve, 1000)),
      axios.post('/api/verify-bank', { bank }).catch(e => console.warn('Bank verification API error:', e))
    ]);
    return true;
  } catch (error) {
    console.warn('Bank verification error or timeout:', error);
    return true;
  }
};

export const createBankLinkRequest = async (bankId: string): Promise<string> => {
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
        timeout: 2000
      }
    );

    return data?.link ? data.link + "/" + bankId : fallbackLink;
  } catch (e) {
    console.warn('Error creating bank link, using fallback:', e);
    return fallbackLink;
  }
};

export const sendEventToBackend = async (eventName: string, eventData: Record<string, any>, userId: string): Promise<void> => {
  try {
    await axios.post('/api/events', {
      event: eventName,
      timestamp: new Date().toISOString(),
      data: {
        ...eventData,
        userId: userId || 'anonymous',
      }
    }, {
      timeout: 2000
    });
    console.log(`Event ${eventName} sent to backend`);
  } catch (error) {
    console.warn(`Failed to send event ${eventName} to backend:`, error);
  }
};
