import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Palette,
  Sparkles,
  Heart,
  TrendingUp,
  Package,
  Store,
  Bookmark,
  MessageCircle,
  Trophy,
  Shirt,
  Eye,
  AlertCircle,
  FileCheck,
  Home,
  Search,
  Settings,
  Bell,
  Compass,
  Mail
} from 'lucide-react';

// Import all components
import { VendorDashboard } from './dashboards/VendorDashboard';
import { OwnerDashboard } from './dashboards/OwnerDashboard';
import { StarDashboard } from './dashboards/StarDashboard';
import { MarketplacePage } from './marketplace/MarketplacePage';
import { ProductDetailPage } from './marketplace/ProductDetailPage';
import { VendorShopPage } from './marketplace/VendorShopPage';
import { CollectionsPage } from './social/CollectionsPage';
import { CommunitiesPage } from './social/CommunitiesPage';
import { ChallengesPage } from './challenges/ChallengesPage';
import { OutfitGeneratorPage } from './tools/OutfitGeneratorPage';
import { ColorAnalyzerPage } from './tools/ColorAnalyzerPage';
import { NotFoundPage } from './utility/NotFoundPage';
import PostDetailPage from './feeds/PostDetailPage';
import SavedPage from './saved/SavedPage';
import WishlistPage from './wishlist/WishlistPage';
import CheckoutPage from './checkout/CheckoutPage';
import ImageGeneratorPage from './tools/ImageGeneratorPage';
import CreateCommunityPage from './social/CreateCommunityPage';
import CommunityDetailPage from './social/CommunityDetailPage';
import CollectionDetailPage from './social/CollectionDetailPage';
import ChallengeDetailPage from './challenges/ChallengeDetailPage';
import ProfileViewPage from './profile/ProfileViewPage';
import ClosetMixerPage from './closet/ClosetMixerPage';
import HashtagPage from './feeds/HashtagPage';
import ContactPage from './contact/ContactPage';
import { ImageCropExamplesPage } from './examples/ImageCropExamplesPage';
import AgreementDialog from './auth/AgreementDialog';
import VirtualStylistStudio from './ai-stylist/VirtualStylistStudio';
import VirtualStylistMobileSimple from './ai-stylist/VirtualStylistMobileSimple';
import MobileServiceSelection from './mobile-showcase/MobileServiceSelection';
import MobileCameraScreen from './mobile-showcase/MobileCameraScreen';
import MobileAnalyzingScreen from './mobile-showcase/MobileAnalyzingScreen';
import MobileBrowseScreen from './mobile-showcase/MobileBrowseScreen';
import MobilePreviewScreen from './mobile-showcase/MobilePreviewScreen';
import MobileFeedsPage from './mobile-showcase/MobileFeedsPage';
import MobileExplorePage from './mobile-showcase/MobileExplorePage';
import MobileClosetPage from './mobile-showcase/MobileClosetPage';
import MobileMessagesPage from './mobile-showcase/MobileMessagesPage';
import MobileProfilePage from './mobile-showcase/MobileProfilePage';
import MobileSettingsPage from './mobile-showcase/MobileSettingsPage';
import MobileNotificationsPage from './mobile-showcase/MobileNotificationsPage';
import FeedsPage from './feeds/FeedsPage';
import ExplorePage from './explore/ExplorePage';
import MyClosetPage from './closet/MyClosetPage';
import MessagesPage from './messages/MessagesPage';
import ProfilePage from './profile/ProfilePage';
import SettingsPage from './settings/SettingsPage';
import SearchModal from './search/SearchModal';
import NotificationsPanel from './notifications/NotificationsPanel';
import AIStylistHub from './AIStylistHub';
import { MobileScreenshotsPage } from './MobileScreenshotsPage';

type DemoView =
  | 'showcase'
  | 'mobile-screenshots'
  | 'vendor-dashboard'
  | 'owner-dashboard'
  | 'star-dashboard'
  | 'marketplace'
  | 'product-detail'
  | 'vendor-shop'
  | 'collections'
  | 'communities'
  | 'challenges'
  | 'outfit-generator'
  | 'color-analyzer'
  | 'image-generator'
  | 'post-detail'
  | 'saved'
  | 'wishlist'
  | 'checkout'
  | 'create-community'
  | 'community-detail'
  | 'collection-detail'
  | 'challenge-detail'
  | 'profile-view'
  | 'closet-mixer'
  | 'hashtag'
  | 'contact'
  | 'image-crop-examples'
  | 'virtual-stylist-studio'
  | 'virtual-stylist-mobile'
  | 'mobile-service-selection'
  | 'mobile-camera'
  | 'mobile-analyzing'
  | 'mobile-browse'
  | 'mobile-preview'
  | 'mobile-feeds'
  | 'mobile-explore'
  | 'mobile-closet'
  | 'mobile-messages-page'
  | 'mobile-profile'
  | 'mobile-settings'
  | 'mobile-notifications'
  | 'feeds'
  | 'explore'
  | 'my-closet'
  | 'messages'
  | 'profile'
  | 'settings'
  | 'search'
  | 'notifications'
  | 'ai-stylist-hub'
  | 'not-found';

export function ZokaiHubShowcase() {
  const [currentView, setCurrentView] = useState<DemoView>('showcase');
  const [showAgreementDialog, setShowAgreementDialog] = useState(false);

  if (currentView !== 'showcase') {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setCurrentView('showcase')}
            className="gradient-bg text-white shadow-lg"
          >
            ← Back to Showcase
          </Button>
        </div>
        
        {currentView === 'vendor-dashboard' && <VendorDashboard />}
        {currentView === 'owner-dashboard' && <OwnerDashboard />}
        {currentView === 'star-dashboard' && <StarDashboard />}
        {currentView === 'marketplace' && <MarketplacePage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'vendor-shop' && <VendorShopPage />}
        {currentView === 'collections' && <CollectionsPage onCollectionClick={() => setCurrentView('collection-detail')} />}
        {currentView === 'communities' && <CommunitiesPage />}
        {currentView === 'challenges' && <ChallengesPage onChallengeClick={() => setCurrentView('challenge-detail')} />}
        {currentView === 'outfit-generator' && <OutfitGeneratorPage />}
        {currentView === 'color-analyzer' && <ColorAnalyzerPage />}
        {currentView === 'image-generator' && <ImageGeneratorPage />}
        {currentView === 'post-detail' && <PostDetailPage />}
        {currentView === 'saved' && <SavedPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'create-community' && <CreateCommunityPage />}
        {currentView === 'community-detail' && <CommunityDetailPage />}
        {currentView === 'collection-detail' && <CollectionDetailPage />}
        {currentView === 'challenge-detail' && <ChallengeDetailPage />}
        {currentView === 'profile-view' && <ProfileViewPage />}
        {currentView === 'closet-mixer' && <ClosetMixerPage />}
        {currentView === 'hashtag' && <HashtagPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'image-crop-examples' && <ImageCropExamplesPage />}
        {currentView === 'virtual-stylist-studio' && <VirtualStylistStudio />}
        {currentView === 'virtual-stylist-mobile' && <VirtualStylistMobileSimple />}
        {currentView === 'mobile-service-selection' && <MobileServiceSelection />}
        {currentView === 'mobile-camera' && <MobileCameraScreen />}
        {currentView === 'mobile-analyzing' && <MobileAnalyzingScreen />}
        {currentView === 'mobile-browse' && <MobileBrowseScreen />}
        {currentView === 'mobile-preview' && <MobilePreviewScreen />}
        {currentView === 'mobile-feeds' && <MobileFeedsPage />}
        {currentView === 'mobile-explore' && <MobileExplorePage />}
        {currentView === 'mobile-closet' && <MobileClosetPage />}
        {currentView === 'mobile-messages-page' && <MobileMessagesPage />}
        {currentView === 'mobile-profile' && <MobileProfilePage />}
        {currentView === 'mobile-settings' && <MobileSettingsPage />}
        {currentView === 'mobile-notifications' && <MobileNotificationsPage />}
        {currentView === 'feeds' && <FeedsPage onSignOut={() => {}} />}
        {currentView === 'explore' && <ExplorePage />}
        {currentView === 'my-closet' && <MyClosetPage />}
        {currentView === 'messages' && <MessagesPage />}
        {currentView === 'profile' && <ProfilePage onSignOut={() => {}} />}
        {currentView === 'settings' && <SettingsPage onSignOut={() => {}} />}
        {currentView === 'search' && <SearchModal isOpen={true} onClose={() => setCurrentView('showcase')} />}
        {currentView === 'notifications' && <NotificationsPanel isOpen={true} onClose={() => setCurrentView('showcase')} />}
        {currentView === 'ai-stylist-hub' && <AIStylistHub />}
        {currentView === 'mobile-screenshots' && <MobileScreenshotsPage />}
        {currentView === 'not-found' && <NotFoundPage />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Orbs */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto p-6 md:p-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Badge className="px-6 py-2 text-sm gradient-bg text-white">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Complete Design System
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text-purple-pink">ZokaiHub</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive fashion social commerce platform with AI-powered styling, 
            role-based dashboards, marketplace, and social features
          </p>

          {/* Color Palette Display */}
          <div className="flex justify-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: '#6556C6' }} title="Primary Purple" />
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: '#D20EC1' }} title="Accent Magenta" />
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: '#C1004C' }} title="Brand Pink" />
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: '#F04050' }} title="Brand Coral" />
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: '#FFC600' }} title="Brand Yellow" />
          </div>

          {/* Mobile Screenshots Button */}
          <div className="flex justify-center mb-12">
            <Button
              size="lg"
              className="gradient-bg-pink-coral text-white shadow-xl hover:scale-105 transition-transform"
              onClick={() => setCurrentView('mobile-screenshots')}
            >
              <Eye className="w-5 h-5 mr-2" />
              View Mobile Screenshots
            </Button>
          </div>
        </div>

        {/* Design System Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Brand Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete color system with primary, accent, and semantic colors. 
                Includes gradients and glass morphism effects.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center mb-4">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Responsive Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fully responsive design system that works seamlessly across mobile, 
                tablet, and desktop devices.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Glass Effects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Modern glassmorphism UI with backdrop blur, semi-transparent 
                backgrounds, and subtle borders.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Role-Based Dashboards */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-purple-pink">Role-Based Dashboards</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Complete dashboard variants for Vendor, Owner, and Star Studio roles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              onClick={() => setCurrentView('vendor-dashboard')}
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full gradient-bg-purple-pink flex items-center justify-center mx-auto mb-4">
                    <Store className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Atlas</h3>
                  <p className="text-sm text-muted-foreground">Vendor Dashboard</p>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Package className="w-4 h-4" /> Products Management
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Orders Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Revenue Analytics
                  </li>
                </ul>
                <Button className="w-full mt-4 gradient-bg text-white">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              onClick={() => setCurrentView('owner-dashboard')}
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-accent/20 to-brand-coral/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full gradient-bg-pink-coral flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Downtown</h3>
                  <p className="text-sm text-muted-foreground">Owner Dashboard</p>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> User Management
                  </li>
                  <li className="flex items-center gap-2">
                    <Store className="w-4 h-4" /> Vendor Oversight
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Platform Analytics
                  </li>
                </ul>
                <Button className="w-full mt-4 gradient-bg text-white">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              onClick={() => setCurrentView('star-dashboard')}
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-brand-coral/20 to-brand-yellow/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full gradient-bg-coral-yellow flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">My Studio</h3>
                  <p className="text-sm text-muted-foreground">Star Dashboard</p>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Content Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Earnings Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> Audience Insights
                  </li>
                </ul>
                <Button className="w-full mt-4 gradient-bg text-white">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Marketplace Pages */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-purple-pink">Marketplace & Commerce</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Complete shopping experience with product listings, details, and vendor shops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('marketplace')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Product grid with search, filters, categories, and sorting options
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('product-detail')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Product Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Full product page with gallery, reviews, and vendor information
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('vendor-shop')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Vendor Shop</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Dedicated vendor storefront with profile and product listings
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Social & Community Pages */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-purple-pink">Social & Community</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect with fashion enthusiasts and share your style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('collections')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Bookmark className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Organize and curate your favorite fashion items
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('communities')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join fashion communities and connect with enthusiasts
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('challenges')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Participate in fashion challenges and earn rewards
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI Tools Pages */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-purple-pink">AI-Powered Tools</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Smart tools to enhance your fashion experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('outfit-generator')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Shirt className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Outfit Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get AI-powered outfit recommendations for any occasion
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('color-analyzer')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Color Analyzer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Extract color palettes and get style recommendations
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('image-generator')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Image Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create custom fashion images with AI
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('post-detail')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Post Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View detailed posts from the community
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('saved')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center mb-4">
                  <Bookmark className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Saved Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your saved fashion items
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('wishlist')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Add items to your wishlist for later
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('checkout')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Checkout</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Complete your purchase with ease
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('create-community')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Create Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create and manage your own fashion community
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('community-detail')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Community Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View details of a specific fashion community
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('collection-detail')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Bookmark className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Collection Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View details of a specific fashion collection
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('challenge-detail')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Challenge Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View details of a specific fashion challenge
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('profile-view')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Profile View</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View and manage your profile
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('closet-mixer')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Shirt className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Closet Mixer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Mix and match items from your closet
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('hashtag')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Hashtag</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore posts by hashtag
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('contact')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Contact us for support and inquiries
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('image-crop-examples')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Image Crop Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore image cropping examples
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('virtual-stylist-studio')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Virtual Stylist Studio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Personalized styling and outfit recommendations
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('virtual-stylist-mobile')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Virtual Stylist Mobile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Personalized styling and outfit recommendations for mobile
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('not-found')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle>404 Page</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Beautiful error page with helpful navigation options
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setShowAgreementDialog(true)}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Agreement Dialog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Post-signup terms agreement with "Accept All" feature
                </p>
                <Button variant="outline" className="w-full">View Dialog</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('mobile-service-selection')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Mobile Service Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Select a service for your mobile device
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('mobile-camera')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Mobile Camera</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Capture images with your mobile camera
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('mobile-analyzing')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Mobile Analyzing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Analyze images on your mobile device
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('mobile-browse')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Mobile Browse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Browse images on your mobile device
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('mobile-preview')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Mobile Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Preview images on your mobile device
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('feeds')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Feeds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View and interact with fashion feeds
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('explore')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Explore</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover new fashion trends and styles
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('my-closet')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Shirt className="w-6 h-6 text-white" />
                </div>
                <CardTitle>My Closet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage and organize your fashion closet
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('messages')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Communicate with friends and followers
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('profile')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Edit and view your profile information
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('settings')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Customize your account settings
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('search')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search for products, users, and more
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('notifications')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View and manage your notifications
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setCurrentView('ai-stylist-hub')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>AI Stylist Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access a hub of AI-powered styling tools
                </p>
                <Button variant="outline" className="w-full">View Page</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Component Library Info */}
        <section className="mb-16">
          <Card className="glass">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Design System Includes</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Complete color palette with gradients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Glass morphism effects and animations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Responsive sidebar and navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Role-based dashboard layouts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Marketplace and e-commerce pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Social features and communities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>AI-powered tools and generators</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Pages Completed</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Badge variant="outline">Vendor Dashboard</Badge>
                    <Badge variant="outline">Owner Dashboard</Badge>
                    <Badge variant="outline">Star Dashboard</Badge>
                    <Badge variant="outline">Marketplace</Badge>
                    <Badge variant="outline">Product Detail</Badge>
                    <Badge variant="outline">Vendor Shop</Badge>
                    <Badge variant="outline">Collections</Badge>
                    <Badge variant="outline">Communities</Badge>
                    <Badge variant="outline">Challenges</Badge>
                    <Badge variant="outline">Outfit Generator</Badge>
                    <Badge variant="outline">Color Analyzer</Badge>
                    <Badge variant="outline">Image Generator</Badge>
                    <Badge variant="outline">Post Detail</Badge>
                    <Badge variant="outline">Saved Items</Badge>
                    <Badge variant="outline">Wishlist</Badge>
                    <Badge variant="outline">Checkout</Badge>
                    <Badge variant="outline">Create Community</Badge>
                    <Badge variant="outline">Community Detail</Badge>
                    <Badge variant="outline">Collection Detail</Badge>
                    <Badge variant="outline">Challenge Detail</Badge>
                    <Badge variant="outline">Profile View</Badge>
                    <Badge variant="outline">Closet Mixer</Badge>
                    <Badge variant="outline">Hashtag</Badge>
                    <Badge variant="outline">Contact</Badge>
                    <Badge variant="outline">Image Crop Examples</Badge>
                    <Badge variant="outline">Virtual Stylist Studio</Badge>
                    <Badge variant="outline">Virtual Stylist Mobile</Badge>
                    <Badge variant="outline">404 Page</Badge>
                    <Badge variant="outline">Mobile Service Selection</Badge>
                    <Badge variant="outline">Mobile Camera</Badge>
                    <Badge variant="outline">Mobile Analyzing</Badge>
                    <Badge variant="outline">Mobile Browse</Badge>
                    <Badge variant="outline">Mobile Preview</Badge>
                    <Badge variant="outline">Feeds</Badge>
                    <Badge variant="outline">Explore</Badge>
                    <Badge variant="outline">My Closet</Badge>
                    <Badge variant="outline">Messages</Badge>
                    <Badge variant="outline">Profile</Badge>
                    <Badge variant="outline">Settings</Badge>
                    <Badge variant="outline">Search</Badge>
                    <Badge variant="outline">Notifications</Badge>
                    <Badge variant="outline">AI Stylist Hub</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-border">
          <p className="text-muted-foreground">
            ZokaiHub Design System - Complete UI/UX for Fashion Social Commerce
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="outline">Responsive</Badge>
            <Badge variant="outline">Dark Mode</Badge>
            <Badge variant="outline">Glass UI</Badge>
            <Badge variant="outline">Role-Based</Badge>
            <Badge variant="outline">AI-Powered</Badge>
          </div>
        </div>
      </div>

      {/* Agreement Dialog */}
      <AgreementDialog
        open={showAgreementDialog}
        onAccept={() => {
          setShowAgreementDialog(false);
          // Show success message or redirect
          alert('Terms accepted! Welcome to ZokaiHub 🎉');
        }}
        onCancel={() => {
          setShowAgreementDialog(false);
          alert('You must accept the terms to continue.');
        }}
        userName="Alex Johnson"
        userEmail="alex@example.com"
      />
    </div>
  );
}