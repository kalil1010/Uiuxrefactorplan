import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import App from './app/App.tsx';
import enMessages from '../messages/en.json';
import arMessages from '../messages/ar.json';
import './styles/index.css';

type Locale = 'en' | 'ar';

const messagesMap = { en: enMessages, ar: arMessages } as const;

function Root() {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null;
    return stored === 'ar' ? 'ar' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('locale', locale);
  }, [locale]);

  // Expose for the mobile preview UI to toggle from anywhere
  (window as any).__setAppLocale = setLocale;
  (window as any).__currentLocale = locale;

  return (
    <NextIntlClientProvider locale={locale} messages={messagesMap[locale]}>
      <App />
    </NextIntlClientProvider>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
