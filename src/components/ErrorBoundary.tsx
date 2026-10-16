import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ReactNode } from 'react';

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <h1>Une erreur est survenue</h1>
      <p style={{ color: '#d4f22b', fontFamily: 'monospace' }}>{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#d4f22b',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontWeight: 'bold',
          color: '#050505'
        }}
      >
        Réessayer
      </button>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onError={(error, info) => {
        // Log sécurisé : convertit tout en string pour éviter le crash
        console.error(
          'ErrorBoundary caught:',
          error?.message ?? String(error),
          info?.componentStack ?? ''
        );
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}