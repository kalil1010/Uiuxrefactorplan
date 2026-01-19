/**
 * Suppress known harmless warnings in development
 */

if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Suppress Jotai multiple instances warning (harmless in this environment)
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Detected multiple Jotai instances')
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Detected multiple Jotai instances')
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

export {};
