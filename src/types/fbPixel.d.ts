
// Type definitions for Facebook Pixel
interface Window {
  fbq?: (command: string, eventName: string, params?: any) => void;
}
