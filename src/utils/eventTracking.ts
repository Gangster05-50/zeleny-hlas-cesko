
import { trackFbPixel } from './fbPixel';
import { sendEventToBackend } from '../services/petitionApi';

// Core event names
export const EVENTS = {
  FORM_COMPLETED: 'form_completed',
  BANK_SELECTED: 'bank_selected'
};

// Enhanced event tracking function that sends to both FB Pixel and backend
export const trackEvent = async (
  eventName: string, 
  eventData: Record<string, any> = {},
  userId: string = 'anonymous'
): Promise<void> => {
  // First trigger FB Pixel
  trackFbPixel(eventName, eventData);
  
  // Then send to backend API but only for specific events
  if (eventName === EVENTS.FORM_COMPLETED || eventName === EVENTS.BANK_SELECTED) {
    await sendEventToBackend(eventName, eventData, userId);
  }
};
