import { LazyExoticComponent, lazy } from 'react';

/**
 * Creates a lazy-loaded component with proper error handling for named exports.
 * This solves the "Cannot convert object to primitive value" error that occurs
 * when React.lazy tries to import a module with named exports as if it were a default export.
 */
export function lazyWithRetry<T>(
  factory: () => Promise<{ default: T }>,
  options?: {
    retryAttempts?: number;
    retryDelay?: number;
  }
): LazyExoticComponent<T> {
  const { retryAttempts = 3, retryDelay = 1000 } = options || {};

  const loadWithRetry = async (attempt = 0): Promise<{ default: T }> => {
    try {
      return await factory();
    } catch (error) {
      if (attempt < retryAttempts) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return loadWithRetry(attempt + 1);
      }
      throw error;
    }
  };

  return lazy(() =>
    loadWithRetry().then(module => ({
      default: module.default
    }))
  );
}

/**
 * Simple lazy loader for named exports (when the component file exports a named export)
 * Usage: lazyNamed(() => import('./Component'), 'ComponentName')
 */
export function lazyNamed<T>(
  factory: () => Promise<any>,
  exportName: keyof any
): LazyExoticComponent<T> {
  return lazy(() =>
    factory().then(module => {
      const Component = module[exportName];
      if (!Component) {
        throw new Error(`Named export '${exportName.toString()}' not found in module`);
      }
      return ({
        default: Component
      });
    })
  );
}