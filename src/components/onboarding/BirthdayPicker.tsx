import React, { useState } from 'react';
import { MultiWheelPickerModal } from '../ui/wheel-picker';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Calendar } from 'lucide-react';

export function BirthdayPickerDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState('1');
  const [day, setDay] = useState('1');
  const [year, setYear] = useState('2001');

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

  const wheels = [
    { id: 'month', options: months, value: month },
    { id: 'day', options: days, value: day },
    { id: 'year', options: years, value: year },
  ];

  const handleWheelChange = (wheelId: string, value: string) => {
    if (wheelId === 'month') setMonth(value);
    if (wheelId === 'day') setDay(value);
    if (wheelId === 'year') setYear(value);
  };

  const getFormattedDate = () => {
    const monthName = months.find(m => m.value === month)?.label || 'Jan';
    return `${monthName} ${day}, ${year}`;
  };

  return (
    <div className="p-6">
      <Card className="p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-bg mx-auto mb-4 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">When's your birthday?</h2>
          <p className="text-sm text-muted-foreground">
            This helps us recommend age-appropriate styles
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-4 rounded-lg border-2 border-primary bg-primary/10 hover:bg-primary/15 transition-all mb-4"
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Selected Birthday</p>
            <p className="text-xl font-bold">{getFormattedDate()}</p>
          </div>
        </button>

        <Button
          className="w-full gradient-bg text-white"
          size="lg"
        >
          Continue
        </Button>
      </Card>

      <MultiWheelPickerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        wheels={wheels}
        onChange={handleWheelChange}
        onDone={() => {}}
        title="Select Birthday"
        height={220}
      />
    </div>
  );
}
