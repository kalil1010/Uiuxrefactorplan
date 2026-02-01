import React from 'react';
import { 
  Home, 
  Compass, 
  ShoppingBag, 
  Sparkles, 
  User, 
  MessageCircle, 
  Settings,
  Package,
  ShoppingCart,
  BarChart3,
  HelpCircle,
  Users,
  Store,
  FileText,
  Flag,
  DollarSign,
  Video,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/components/ui/utils';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

interface RoleSidebarProps {
  role: 'customer' | 'vendor' | 'owner' | 'star';
  activeItem?: string;
  collapsed?: boolean;
  onItemClick?: (href: string) => void;
  onRoleChange?: (role: string) => void;
}

const roleMenus = {
  customer: [
    { icon: Home, label: 'Home Feed', href: '/feed' },
    { icon: Compass, label: 'Explore', href: '/explore' },
    { icon: ShoppingBag, label: 'Closet', href: '/closet' },
    { icon: Sparkles, label: 'AI Stylist', href: '/ai-stylist' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: MessageCircle, label: 'Messages', href: '/messages' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ],
  vendor: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/vendor/dashboard' },
    { icon: Package, label: 'Products', href: '/vendor/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/vendor/orders' },
    { icon: BarChart3, label: 'Analytics', href: '/vendor/analytics' },
    { icon: HelpCircle, label: 'Support', href: '/vendor/support' },
    { icon: Settings, label: 'Settings', href: '/vendor/settings' },
  ],
  owner: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/owner/dashboard' },
    { icon: Users, label: 'Users', href: '/owner/users' },
    { icon: Store, label: 'Vendors', href: '/owner/vendors' },
    { icon: FileText, label: 'Content', href: '/owner/content' },
    { icon: Flag, label: 'Reports', href: '/owner/reports' },
    { icon: Settings, label: 'Settings', href: '/owner/settings' },
  ],
  star: [
    { icon: BarChart3, label: 'Analytics', href: '/star/analytics' },
    { icon: DollarSign, label: 'Earnings', href: '/star/earnings' },
    { icon: Video, label: 'Studio', href: '/star/studio' },
    { icon: Settings, label: 'Settings', href: '/star/settings' },
  ],
};

const roleLabels = {
  customer: 'Customer',
  vendor: 'Vendor',
  owner: 'Owner',
  star: 'Star Studio',
};

export function RoleSidebar({ 
  role, 
  activeItem, 
  collapsed = false, 
  onItemClick,
  onRoleChange 
}: RoleSidebarProps) {
  const items = roleMenus[role];

  return (
    <div className={cn(
      "h-full bg-card border-r border-border flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo/Brand */}
      <div className="h-16 border-b border-border flex items-center px-4">
        {!collapsed && (
          <span className="gradient-text-purple-pink font-bold text-xl">
            ZokaiHub
          </span>
        )}
        {collapsed && (
          <span className="gradient-text-purple-pink font-bold text-2xl">
            Z
          </span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.href;
          
          return (
            <button
              key={item.href}
              onClick={() => onItemClick?.(item.href)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                "hover:bg-accent/10 group relative",
                isActive && "bg-primary text-primary-foreground before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r",
                !isActive && "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary-foreground")} />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  <span className="text-sm">{item.label}</span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Role Switcher */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => {
            const roles = ['customer', 'vendor', 'owner', 'star'];
            const currentIndex = roles.indexOf(role);
            const nextRole = roles[(currentIndex + 1) % roles.length];
            onRoleChange?.(nextRole);
          }}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
            "bg-accent/10 hover:bg-accent/20 transition-all group"
          )}
        >
          <div className="w-8 h-8 rounded-full gradient-bg-purple-pink flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">
              {roleLabels[role][0]}
            </span>
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Switch Role</p>
                <p className="text-xs text-muted-foreground">{roleLabels[role]}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
