import React from 'react';
import './lib/suppress-warnings';
import { ThemeProvider } from './lib/theme-provider';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Logo, LogoIcon, LogoFull } from './components/Logo';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeToggle } from './components/ThemeToggle';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import FeedsPageWrapper from './components/feeds/FeedsPageWrapper';
import StyleSetup from './components/onboarding/StyleSetup';
import { ZokaiHubShowcase } from './components/ZokaiHubShowcase';
import { 
  Sparkles, 
  Shirt, 
  Cloud, 
  MessageCircle, 
  Image as ImageIcon,
  Users,
  ShoppingBag,
  TrendingUp,
  Star,
  ArrowRight,
  Check,
  Zap,
  Heart,
  Camera
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<'landing' | 'signin' | 'signup' | 'feeds' | 'style-setup' | 'showcase'>('landing');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Handle sign in
  const handleSignIn = () => {
    setIsAuthenticated(true);
    setCurrentPage('feeds');
  };

  // Handle sign up
  const handleSignUp = () => {
    setIsAuthenticated(true);
    setCurrentPage('style-setup'); // Show onboarding first
  };

  // Handle onboarding complete
  const handleOnboardingComplete = () => {
    setCurrentPage('feeds');
  };

  // Handle sign out
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  // Show showcase page
  if (currentPage === 'showcase') {
    return (
      <ThemeProvider>
        <div className="fixed top-4 left-4 z-50 flex gap-2">
          <Button
            onClick={() => setCurrentPage('landing')}
            variant="outline"
            className="glass shadow-lg"
          >
            ← Back to Landing
          </Button>
        </div>
        <ZokaiHubShowcase />
      </ThemeProvider>
    );
  }

  // Show feeds if authenticated
  if (isAuthenticated && currentPage === 'feeds') {
    return (
      <ThemeProvider>
        <FeedsPageWrapper onSignOut={handleSignOut} />
      </ThemeProvider>
    );
  }

  // Show authentication pages
  if (currentPage === 'signin') {
    return (
      <ThemeProvider>
        <SignIn onNavigate={setCurrentPage} onSignIn={handleSignIn} />
      </ThemeProvider>
    );
  }

  if (currentPage === 'signup') {
    return (
      <ThemeProvider>
        <SignUp onNavigate={setCurrentPage} onSignUp={handleSignUp} />
      </ThemeProvider>
    );
  }

  // Show style setup page
  if (currentPage === 'style-setup') {
    return (
      <ThemeProvider>
        <StyleSetup onComplete={handleOnboardingComplete} onNavigate={setCurrentPage} />
      </ThemeProvider>
    );
  }

  // Landing page
  return (
    <ThemeProvider>
    <div className="min-h-screen bg-background">
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button
          size="lg"
          onClick={() => setCurrentPage('showcase')}
          className="gradient-bg text-white shadow-2xl hover:scale-105 transition-transform"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          View Design System
        </Button>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <LogoFull />
            
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Community</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button variant="ghost" className="hidden md:inline-flex" onClick={() => setCurrentPage('signin')}>
                Sign In
              </Button>
              <Button className="gradient-bg-purple-pink border-0 hover:opacity-90 transition-opacity" onClick={() => setCurrentPage('signup')}>
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6556C6] opacity-20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#D20EC1] opacity-20 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Fashion Revolution</span>
            </div>
            
            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Personal
              <span className="block gradient-text">AI Fashion Stylist</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover your perfect style with AI-powered outfit recommendations, digital closet management, and a vibrant fashion community.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="gradient-bg border-0 hover:opacity-90 transition-opacity text-lg px-8 h-14" onClick={() => setCurrentPage('signup')}>
                Start Styling Free
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                Watch Demo
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 border-2 border-background" />
                </div>
                <span>10K+ Fashion Lovers</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">4.9/5 Rating</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image/Preview */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 gradient-bg rounded-3xl flex items-center justify-center">
                    <Shirt className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">App Preview Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powerful Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything You Need for
              <span className="block gradient-text">Perfect Style</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered tools and features to transform your fashion journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="w-12 h-12 rounded-xl gradient-bg-purple-pink flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Stylist Hub</h3>
              <p className="text-muted-foreground mb-3">
                Your all-in-one AI styling assistant with chat, hair stylist, nail artist, virtual try-on, and image generation.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Chat</span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Hair</span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Nails</span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Try-On</span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">AI Images</span>
              </div>
            </Card>
            
            {/* Feature 2 */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="w-12 h-12 rounded-xl gradient-bg-pink-coral flex items-center justify-center mb-4">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Closet</h3>
              <p className="text-muted-foreground">
                Upload and organize your wardrobe with AI-powered color analysis and automatic categorization.
              </p>
            </Card>
            
            {/* Feature 3 */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="w-12 h-12 rounded-xl gradient-bg-coral-yellow flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Weather Outfits</h3>
              <p className="text-muted-foreground">
                Get smart outfit suggestions based on real-time weather conditions and your personal style.
              </p>
            </Card>
            
            {/* Feature 4 */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Style Analytics</h3>
              <p className="text-muted-foreground">
                Track your fashion journey with insights on color preferences, outfit frequency, and style trends.
              </p>
            </Card>
            
            {/* Feature 5 */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fashion Community</h3>
              <p className="text-muted-foreground">
                Connect with fashion enthusiasts, share outfits, and get inspired by trending styles.
              </p>
            </Card>
            
            {/* Feature 6 */}
            <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Marketplace</h3>
              <p className="text-muted-foreground">
                Discover and shop curated fashion items from top brands and independent designers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Get Started in
              <span className="block gradient-text">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your style journey in minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-2xl gradient-bg-purple-pink flex items-center justify-center">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Closet</h3>
              <p className="text-muted-foreground">
                Snap photos of your clothes and our AI will organize them automatically
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-2xl gradient-bg-pink-coral flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get AI Recommendations</h3>
              <p className="text-muted-foreground">
                Receive personalized outfit suggestions based on weather and occasions
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-2xl gradient-bg-coral-yellow flex items-center justify-center">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-white text-sm font-bold flex items-center justify-center">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Connect</h3>
              <p className="text-muted-foreground">
                Show off your style and get inspired by the fashion community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">500K+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Outfits Created</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Items Cataloged</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">4.9/5</div>
              <div className="text-sm sm:text-base text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-6 sm:p-12 gradient-bg border-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Style?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of fashion lovers using AI to discover their perfect style
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={() => setCurrentPage('signup')}>
                Get Started Free
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Book a Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <LogoFull className="mb-4" />
              <p className="text-sm text-muted-foreground">
                Your AI-powered personal fashion stylist
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2026 ZokaiHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </ThemeProvider>
  );
}