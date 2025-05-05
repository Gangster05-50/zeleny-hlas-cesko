
/**
 * Facebook Pixel utility functions
 */

// Initialize Facebook Pixel
export const initFbPixel = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    console.log('Facebook Pixel already initialized');
    return;
  }
  
  console.warn('Facebook Pixel not properly initialized. Check the script in index.html');
};

// Track a Facebook Pixel event
export const trackFbPixel = (eventName: string, eventData: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData);
    console.log(`FB Pixel event tracked: ${eventName}`, eventData);
    return true;
  } else {
    console.warn(`FB Pixel not available for event: ${eventName}`);
    return false;
  }
};

// Common events
export const FB_EVENTS = {
  FORM_START: 'FormStart',
  FORM_FIELD_COMPLETE: 'FormFieldComplete',
  LEAD: 'Lead',
  SUBMIT_APPLICATION: 'SubmitApplication',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  VIEW_CONTENT: 'ViewContent'
};
