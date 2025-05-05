
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initFbPixel } from './utils/fbPixel'

// Initialize Facebook Pixel
initFbPixel();

createRoot(document.getElementById("root")!).render(<App />);
