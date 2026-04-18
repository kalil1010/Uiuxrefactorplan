/**
 * Centralized state management using React Context
 * This prevents conflicts with Jotai instances
 */

import { createContext, useContext } from 'react';

export interface AppState {
  currentPage: 'landing' | 'signin' | 'signup' | 'feeds';
  isAuthenticated: boolean;
  currentLanguage: 'en' | 'ar';
}

export const defaultAppState: AppState = {
  currentPage: 'landing',
  isAuthenticated: false,
  currentLanguage: 'en'
};

export const AppStateContext = createContext<{
  state: AppState;
  setState: (state: Partial<AppState>) => void;
} | null>(null);

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}
