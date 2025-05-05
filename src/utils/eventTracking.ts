
import { trackFbPixel } from './fbPixel';
import { sendEventToBackend } from '../services/petitionApi';

// Enhanced event tracking function that sends to both FB Pixel and backend
export const trackEvent = async (
  eventName: string, 
  eventData: Record<string, any> = {},
  userId: string = 'anonymous'
): Promise<void> => {
  // First trigger FB Pixel
  trackFbPixel(eventName, eventData);
  
  // Then send to backend API
  await sendEventToBackend(eventName, eventData, userId);
};
