import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from '../ui/drawer';
import { WheelPicker } from '../ui/wheel-picker';
import { X } from 'lucide-react';

interface WheelPickerOption {
  value: string;
  label: string;
}

interface MobileBirthdayPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (year: number, month: number, day: number) => void;
  initialYear?: number;
  initialMonth?: number;
  initialDay?: number;
}

export function calculateAge(year: number, month: number, day: number): number {
  const today = new Date();
  const birthDate = new Date(year, month, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function MobileBirthdayPicker({
  isOpen,
  onClose,
  onConfirm,
  initialYear = new Date().getFullYear() - 25,
  initialMonth = 0,
  initialDay = 1,
}: MobileBirthdayPickerProps) {
  const t = useTranslations('auth.birthdayPicker');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const [selectedYear, setSelectedYear] = useState(initialYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(initialMonth.toString());
  const [selectedDay, setSelectedDay] = useState(initialDay.toString());

  // Generate year options (1924 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions: WheelPickerOption[] = [];
  for (let year = currentYear; year >= 1924; year--) {
    yearOptions.push({ value: year.toString(), label: year.toString() });
  }

  // Generate month options with localized names
  const monthOptions: WheelPickerOption[] = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    return { value: i.toString(), label: monthName };
  });

  // Generate day options based on selected month and year
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth));
  const dayOptions: WheelPickerOption[] = Array.from({ length: daysInMonth }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  // Adjust day if it exceeds days in selected month
  useEffect(() => {
    const maxDay = getDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth));
    if (parseInt(selectedDay) > maxDay) {
      setSelectedDay(maxDay.toString());
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const age = calculateAge(
    parseInt(selectedYear),
    parseInt(selectedMonth),
    parseInt(selectedDay)
  );
  const isValidAge = age >= 13;

  const handleConfirm = () => {
    if (isValidAge) {
      onConfirm(parseInt(selectedYear), parseInt(selectedMonth), parseInt(selectedDay));
      onClose();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        {/* Header */}
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg">{t('title')}</DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="min-h-11 min-w-11 active:bg-muted"
                aria-label={tCommon('close')}
              >
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Wheel Picker */}
        <div className="px-4 py-6">
          <div className="flex gap-2 justify-center">
            {/* Day */}
            <div role="group" aria-label={t('day')} className="flex-1">
              <WheelPicker
                options={dayOptions}
                value={selectedDay}
                onChange={setSelectedDay}
              />
            </div>
            {/* Month */}
            <div role="group" aria-label={t('month')} className="flex-1">
              <WheelPicker
                options={monthOptions}
                value={selectedMonth}
                onChange={setSelectedMonth}
              />
            </div>
            {/* Year */}
            <div role="group" aria-label={t('year')} className="flex-1">
              <WheelPicker
                options={yearOptions}
                value={selectedYear}
                onChange={setSelectedYear}
              />
            </div>
          </div>

          {/* Age Validation Message */}
          {!isValidAge && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive text-center">{t('ageError')}</p>
            </div>
          )}

          {isValidAge && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                {t('ageDisplay', { age })}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t border-border pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button
            onClick={handleConfirm}
            className="w-full min-h-11 gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80"
            disabled={!isValidAge}
          >
            {tCommon('done')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
