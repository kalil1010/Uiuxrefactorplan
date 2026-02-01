import React from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { cn } from '@/components/ui/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  title?: string;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  showMenu?: boolean;
  className?: string;
}

export function TopBar({
  title,
  onMenuClick,
  onSearchClick,
  onNotificationsClick,
  showMenu = true,
  className,
}: TopBarProps) {
  return (
    <div
      className={cn(
        "h-16 glass border-b border-border/50 flex items-center justify-between px-4 md:px-6",
        className
      )}
    >
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {showMenu && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
        {title && (
          <h1 className="text-xl font-bold gradient-text-purple-pink">
            {title}
          </h1>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onSearchClick}
          className="hover:bg-accent/10"
        >
          <Search className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationsClick}
          className="hover:bg-accent/10 relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* User Avatar */}
        <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
