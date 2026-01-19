import React, { useState } from 'react';
import { Button } from './ui/button';
import { Globe, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
}

export type Language = 'en' | 'ar';

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' }
  ];

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    setIsOpen(false);
    
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // You can add actual i18n logic here
    console.log('Language changed to:', lang);
  };

  const currentLanguage = languages.find(l => l.code === currentLang);

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
        <span className="sm:hidden">{currentLang.toUpperCase()}</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-popover shadow-lg z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-accent transition-colors ${
                  currentLang === lang.code ? 'bg-accent/50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{lang.nativeName}</span>
                  <span className="text-xs text-muted-foreground">{lang.name}</span>
                </div>
                {currentLang === lang.code && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Compact version for mobile
export function LanguageSwitcherCompact({ className = '' }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  const toggleLanguage = () => {
    const newLang: Language = currentLang === 'en' ? 'ar' : 'en';
    setCurrentLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={`gap-2 ${className}`}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{currentLang === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  );
}
