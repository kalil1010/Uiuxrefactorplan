import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from './card';
import { cn } from './utils';

interface WheelPickerOption {
  value: string;
  label: string;
}

interface WheelPickerProps {
  options: WheelPickerOption[];
  value: string;
  onChange: (value: string) => void;
  height?: number;
  itemHeight?: number;
}

function WheelPicker({ options, value, onChange, height = 220, itemHeight = 44 }: WheelPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const selectedIndex = options.findIndex(opt => opt.value === value);

  useEffect(() => {
    if (containerRef.current && selectedIndex >= 0) {
      const targetScroll = selectedIndex * itemHeight;
      containerRef.current.scrollTop = targetScroll;
      setCurrentOffset(targetScroll);
    }
  }, [selectedIndex, itemHeight]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;
    const newScroll = currentOffset + diff;
    containerRef.current.scrollTop = newScroll;
  };

  const handleTouchEnd = () => {
    if (!containerRef.current) return;
    setIsDragging(false);
    
    const scrollTop = containerRef.current.scrollTop;
    const nearestIndex = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(options.length - 1, nearestIndex));
    
    const targetScroll = clampedIndex * itemHeight;
    containerRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    setCurrentOffset(targetScroll);
    onChange(options[clampedIndex].value);
  };

  const handleScroll = () => {
    if (!containerRef.current || isDragging) return;
    const scrollTop = containerRef.current.scrollTop;
    setCurrentOffset(scrollTop);
  };

  const handleClick = (index: number) => {
    if (!containerRef.current) return;
    const targetScroll = index * itemHeight;
    containerRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    setCurrentOffset(targetScroll);
    onChange(options[index].value);
  };

  const visibleCount = Math.floor(height / itemHeight);
  const paddingCount = Math.floor(visibleCount / 2);

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      {/* Selection highlight - center */}
      <div 
        className="absolute left-0 right-0 pointer-events-none z-10 border-y border-primary/20"
        style={{ 
          top: `${(height - itemHeight) / 2}px`,
          height: `${itemHeight}px`,
          background: 'linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.08), transparent)'
        }}
      />
      
      {/* Top gradient fade */}
      <div 
        className="absolute top-0 left-0 right-0 pointer-events-none z-20"
        style={{ 
          height: `${itemHeight * 2}px`,
          background: 'linear-gradient(to bottom, hsl(var(--background)), transparent)'
        }}
      />
      
      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{ 
          height: `${itemHeight * 2}px`,
          background: 'linear-gradient(to top, hsl(var(--background)), transparent)'
        }}
      />

      {/* Scrollable container */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll scrollbar-hide relative"
        style={{ 
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Top padding */}
        <div style={{ height: `${paddingCount * itemHeight}px` }} />
        
        {/* Options */}
        {options.map((option, index) => {
          const centerIndex = currentOffset / itemHeight;
          const distance = Math.abs(index - centerIndex);
          const opacity = Math.max(0.3, 1 - distance * 0.3);
          const scale = Math.max(0.75, 1 - distance * 0.1);
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              onClick={() => handleClick(index)}
              className={cn(
                "w-full flex items-center justify-center transition-all duration-200 touch-manipulation",
                isSelected && "font-semibold"
              )}
              style={{
                height: `${itemHeight}px`,
                opacity,
                transform: `scale(${scale})`,
                scrollSnapAlign: 'center',
              }}
            >
              <span className={isSelected ? "text-foreground" : "text-muted-foreground"}>
                {option.label}
              </span>
            </button>
          );
        })}
        
        {/* Bottom padding */}
        <div style={{ height: `${paddingCount * itemHeight}px` }} />
      </div>
    </div>
  );
}

interface WheelPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: WheelPickerOption[];
  value: string;
  onChange: (value: string) => void;
  title: string;
  height?: number;
}

export function WheelPickerModal({
  isOpen,
  onClose,
  options,
  value,
  onChange,
  title,
  height = 220
}: WheelPickerModalProps) {
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value, isOpen]);

  if (!isOpen) return null;

  const handleDone = () => {
    onChange(tempValue);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-lg bg-card rounded-t-3xl overflow-hidden shadow-2xl border-t border-border/50"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'mobileSlideUp 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-muted/30">
          <button
            onClick={onClose}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-w-[60px] text-left touch-manipulation"
          >
            Cancel
          </button>
          <h3 className="text-base font-semibold">{title}</h3>
          <button
            onClick={handleDone}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors min-w-[60px] text-right touch-manipulation"
          >
            Done
          </button>
        </div>

        {/* Wheel Picker */}
        <div className="px-4 py-6 bg-background">
          <WheelPicker
            options={options}
            value={tempValue}
            onChange={setTempValue}
            height={height}
            itemHeight={44}
          />
        </div>

        {/* Safe area for iPhone */}
        <div className="h-6 safe-bottom bg-background" />
      </Card>
    </div>
  );
}

interface MultiWheelPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  wheels: {
    id: string;
    options: WheelPickerOption[];
    value: string;
  }[];
  onChange: (wheelId: string, value: string) => void;
  onDone: () => void;
  title: string;
  height?: number;
}

export function MultiWheelPickerModal({
  isOpen,
  onClose,
  wheels,
  onChange,
  onDone,
  title,
  height = 220
}: MultiWheelPickerModalProps) {
  if (!isOpen) return null;

  const handleDone = () => {
    onDone();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-lg bg-card rounded-t-3xl overflow-hidden shadow-2xl border-t border-border/50"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'mobileSlideUp 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-muted/30">
          <button
            onClick={onClose}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-w-[60px] text-left touch-manipulation"
          >
            Cancel
          </button>
          <h3 className="text-base font-semibold">{title}</h3>
          <button
            onClick={handleDone}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors min-w-[60px] text-right touch-manipulation"
          >
            Done
          </button>
        </div>

        {/* Multi Wheel Picker */}
        <div className="px-4 py-6 bg-background">
          <div className="flex gap-4 justify-center">
            {wheels.map((wheel) => (
              <div key={wheel.id} className="flex-1 max-w-[120px]">
                <WheelPicker
                  options={wheel.options}
                  value={wheel.value}
                  onChange={(value) => onChange(wheel.id, value)}
                  height={height}
                  itemHeight={44}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Safe area for iPhone */}
        <div className="h-6 safe-bottom bg-background" />
      </Card>
    </div>
  );
}
