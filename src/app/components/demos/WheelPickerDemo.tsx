import React, { useState } from 'react';
import { WheelPickerModal, MultiWheelPickerModal } from '../ui/wheel-picker';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Calendar, Globe, Users, Lock, Ruler, Weight, MapPin } from 'lucide-react';

export function WheelPickerDemo() {
  // Single Wheel Pickers
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [privacy, setPrivacy] = useState('public');

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [country, setCountry] = useState('us');

  // Multi Wheel Pickers
  const [isBirthdayOpen, setIsBirthdayOpen] = useState(false);
  const [month, setMonth] = useState('1');
  const [day, setDay] = useState('1');
  const [year, setYear] = useState('2001');

  const [isHeightOpen, setIsHeightOpen] = useState(false);
  const [feet, setFeet] = useState('5');
  const [inches, setInches] = useState('8');

  const [isWeightOpen, setIsWeightOpen] = useState(false);
  const [weight, setWeight] = useState('150');
  const [weightUnit, setWeightUnit] = useState('lbs');

  // Options
  const privacyOptions = [
    { value: 'public', label: '🌍 Public' },
    { value: 'followers', label: '👥 Followers' },
    { value: 'private', label: '🔒 Private' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية (Arabic)' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'zh', label: '中文' },
  ];

  const countryOptions = [
    { value: 'us', label: '🇺🇸 United States' },
    { value: 'uk', label: '🇬🇧 United Kingdom' },
    { value: 'ca', label: '🇨🇦 Canada' },
    { value: 'au', label: '🇦🇺 Australia' },
    { value: 'de', label: '🇩🇪 Germany' },
    { value: 'fr', label: '🇫🇷 France' },
    { value: 'it', label: '🇮🇹 Italy' },
    { value: 'es', label: '🇪🇸 Spain' },
    { value: 'jp', label: '🇯🇵 Japan' },
    { value: 'kr', label: '🇰🇷 South Korea' },
    { value: 'ae', label: '🇦🇪 UAE' },
    { value: 'sa', label: '🇸🇦 Saudi Arabia' },
  ];

  const months = [
    { value: '1', label: 'Jan' },
    { value: '2', label: 'Feb' },
    { value: '3', label: 'Mar' },
    { value: '4', label: 'Apr' },
    { value: '5', label: 'May' },
    { value: '6', label: 'Jun' },
    { value: '7', label: 'Jul' },
    { value: '8', label: 'Aug' },
    { value: '9', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' },
  ];

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));

  const years = Array.from({ length: 100 }, (_, i) => ({
    value: String(2024 - i),
    label: String(2024 - i),
  }));

  const feetOptions = Array.from({ length: 5 }, (_, i) => ({
    value: String(i + 3),
    label: String(i + 3) + ' ft',
  }));

  const inchesOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i),
    label: String(i) + ' in',
  }));

  const weightOptions = Array.from({ length: 250 }, (_, i) => ({
    value: String(i + 80),
    label: String(i + 80),
  }));

  const weightUnitOptions = [
    { value: 'lbs', label: 'lbs' },
    { value: 'kg', label: 'kg' },
  ];

  // Handlers
  const getPrivacyLabel = () => privacyOptions.find(p => p.value === privacy)?.label || 'Public';
  const getLanguageLabel = () => languageOptions.find(l => l.value === language)?.label || 'English';
  const getCountryLabel = () => countryOptions.find(c => c.value === country)?.label || 'United States';
  const getBirthdayLabel = () => {
    const monthName = months.find(m => m.value === month)?.label || 'Jan';
    return `${monthName} ${day}, ${year}`;
  };
  const getHeightLabel = () => `${feet}' ${inches}"`;
  const getWeightLabel = () => `${weight} ${weightUnit}`;

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">iOS Wheel Picker Demo</h1>
          <p className="text-muted-foreground">
            Tap any option to see the iOS-style wheel picker in action
          </p>
        </div>

        {/* Single Wheel Pickers */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Single Wheel Pickers</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Privacy Picker */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Privacy</h3>
                  <p className="text-xs text-muted-foreground">Who can see your posts</p>
                </div>
              </div>
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="w-full p-3 rounded-lg border-2 border-border bg-muted/50 hover:bg-muted transition-all text-left"
              >
                <p className="text-sm text-muted-foreground mb-1">Selected</p>
                <p className="font-semibold">{getPrivacyLabel()}</p>
              </button>
            </Card>

            {/* Language Picker */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Language</h3>
                  <p className="text-xs text-muted-foreground">App language</p>
                </div>
              </div>
              <button
                onClick={() => setIsLanguageOpen(true)}
                className="w-full p-3 rounded-lg border-2 border-border bg-muted/50 hover:bg-muted transition-all text-left"
              >
                <p className="text-sm text-muted-foreground mb-1">Selected</p>
                <p className="font-semibold">{getLanguageLabel()}</p>
              </button>
            </Card>

            {/* Country Picker */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Country</h3>
                  <p className="text-xs text-muted-foreground">Your location</p>
                </div>
              </div>
              <button
                onClick={() => setIsCountryOpen(true)}
                className="w-full p-3 rounded-lg border-2 border-border bg-muted/50 hover:bg-muted transition-all text-left"
              >
                <p className="text-sm text-muted-foreground mb-1">Selected</p>
                <p className="font-semibold">{getCountryLabel()}</p>
              </button>
            </Card>
          </div>
        </div>

        {/* Multi Wheel Pickers */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Multi Wheel Pickers</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Birthday Picker */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Birthday</h3>
                  <p className="text-xs text-muted-foreground">Your date of birth</p>
                </div>
              </div>
              <button
                onClick={() => setIsBirthdayOpen(true)}
                className="w-full p-3 rounded-lg border-2 border-border bg-muted/50 hover:bg-muted transition-all text-left"
              >
                <p className="text-sm text-muted-foreground mb-1">Selected</p>
                <p className="font-semibold">{getBirthdayLabel()}</p>
              </button>
            </Card>

            {/* Height Picker */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Height</h3>
                  <p className="text-xs text-muted-foreground">Your height</p>
                </div>
              </div>
              <button
                onClick={() => setIsHeightOpen(true)}
                className="w-full p-3 rounded-lg border-2 border-border bg-muted/50 hover:bg-muted transition-all text-left"
              >
                <p className="text-sm text-muted-foreground mb-1">Selected</p>
                <p className="font-semibold">{getHeightLabel()}</p>
              </button>
            </Card>

            {/* Weight Picker */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Weight className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Weight</h3>
                  <p className="text-xs text-muted-foreground">Your weight</p>
                </div>
              </div>
              <button
                onClick={() => setIsWeightOpen(true)}
                className="w-full p-3 rounded-lg border-2 border-border bg-muted/50 hover:bg-muted transition-all text-left"
              >
                <p className="text-sm text-muted-foreground mb-1">Selected</p>
                <p className="font-semibold">{getWeightLabel()}</p>
              </button>
            </Card>
          </div>
        </div>

        {/* Info Card */}
        <Card className="p-6 gradient-bg-purple-pink/10 border-primary/20">
          <h3 className="font-bold text-lg mb-2">✨ Features</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Native iOS wheel scrolling experience</li>
            <li>✓ Smooth touch gestures and momentum</li>
            <li>✓ Highlighted center selection</li>
            <li>✓ Support for single and multi-column pickers</li>
            <li>✓ Customizable colors matching ZokaiHub theme</li>
            <li>✓ Dark/light mode support</li>
            <li>✓ Mobile-first responsive design</li>
          </ul>
        </Card>
      </div>

      {/* Single Wheel Modals */}
      <WheelPickerModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        options={privacyOptions}
        value={privacy}
        onChange={setPrivacy}
        title="Privacy"
      />

      <WheelPickerModal
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
        options={languageOptions}
        value={language}
        onChange={setLanguage}
        title="Language"
        height={220}
      />

      <WheelPickerModal
        isOpen={isCountryOpen}
        onClose={() => setIsCountryOpen(false)}
        options={countryOptions}
        value={country}
        onChange={setCountry}
        title="Country"
        height={220}
      />

      {/* Multi Wheel Modals */}
      <MultiWheelPickerModal
        isOpen={isBirthdayOpen}
        onClose={() => setIsBirthdayOpen(false)}
        wheels={[
          { id: 'month', options: months, value: month },
          { id: 'day', options: days, value: day },
          { id: 'year', options: years, value: year },
        ]}
        onChange={(wheelId, value) => {
          if (wheelId === 'month') setMonth(value);
          if (wheelId === 'day') setDay(value);
          if (wheelId === 'year') setYear(value);
        }}
        onDone={() => {}}
        title="Birthday"
        height={220}
      />

      <MultiWheelPickerModal
        isOpen={isHeightOpen}
        onClose={() => setIsHeightOpen(false)}
        wheels={[
          { id: 'feet', options: feetOptions, value: feet },
          { id: 'inches', options: inchesOptions, value: inches },
        ]}
        onChange={(wheelId, value) => {
          if (wheelId === 'feet') setFeet(value);
          if (wheelId === 'inches') setInches(value);
        }}
        onDone={() => {}}
        title="Height"
        height={200}
      />

      <MultiWheelPickerModal
        isOpen={isWeightOpen}
        onClose={() => setIsWeightOpen(false)}
        wheels={[
          { id: 'weight', options: weightOptions, value: weight },
          { id: 'unit', options: weightUnitOptions, value: weightUnit },
        ]}
        onChange={(wheelId, value) => {
          if (wheelId === 'weight') setWeight(value);
          if (wheelId === 'unit') setWeightUnit(value);
        }}
        onDone={() => {}}
        title="Weight"
        height={200}
      />
    </div>
  );
}
