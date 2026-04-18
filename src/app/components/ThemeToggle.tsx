import React, { useState } from 'react';
import { useTheme } from '../lib/theme-provider';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor }
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  const Icon = currentTheme.icon;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 sm:h-10 sm:w-10"
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <Card className="absolute right-0 mt-2 w-48 p-2 z-50 shadow-lg">
            {themes.map((themeOption) => {
              const ThemeIcon = themeOption.icon;
              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors ${
                    theme === themeOption.value ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ThemeIcon className="w-4 h-4" />
                    <span>{themeOption.label}</span>
                  </div>
                  {theme === themeOption.value && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              );
            })}
          </Card>
        </>
      )}
    </div>
  );
}

// Compact inline theme toggle for settings
export function ThemeToggleInline() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        return (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === themeOption.value
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Icon className="w-6 h-6 mx-auto mb-2" />
            <h4 className="font-semibold text-sm">{themeOption.label}</h4>
          </button>
        );
      })}
    </div>
  );
}
