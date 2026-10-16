import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Global console.error sanitizer to prevent "Cannot convert object to primitive value" errors
// This ensures all console.error calls receive primitive values instead of objects
const originalConsoleError = console.error;
console.error = (...args) => {
  try {
    const sanitizedArgs = args.map(arg => {
      if (arg instanceof Object && !(arg instanceof String) && !(arg instanceof Number) && !(arg instanceof Boolean)) {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }
      return arg;
    });
    originalConsoleError.apply(console, sanitizedArgs);
  } catch (e) {
    // If our sanitizer fails, fall back to original console.error to avoid breaking anything
    originalConsoleError.apply(console, args);
  }
};

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
