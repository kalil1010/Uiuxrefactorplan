import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  FileText, 
  Shield, 
  CheckCircle2,
  AlertCircle,
  Lock,
  Users,
  Bell,
  Mail,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AgreementDialogProps {
  open: boolean;
  onAccept: () => void;
  onCancel?: () => void;
  userName?: string;
  userEmail?: string;
}

export default function AgreementDialog({ open, onAccept, onCancel, userName = 'User', userEmail = 'user@example.com' }: AgreementDialogProps) {
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    ageConfirmation: false,
    dataProcessing: false,
    marketing: false
  });

  const [hasScrolled, setHasScrolled] = useState(false);

  const allRequiredAccepted = 
    agreements.termsOfService && 
    agreements.privacyPolicy && 
    agreements.ageConfirmation && 
    agreements.dataProcessing;

  const handleAccept = () => {
    if (allRequiredAccepted) {
      onAccept();
    }
  };

  const toggleAgreement = (key: keyof typeof agreements) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {}}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#6556C6]/20 to-[#D20EC1]/20">
                  <FileText className="w-6 h-6 text-[#6556C6]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold gradient-text">Welcome to ZokaiHub!</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Please review and accept our terms to continue
                  </p>
                </div>
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-2 mt-3 p-3 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6556C6] to-[#D20EC1] flex items-center justify-center text-white font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
                <Badge variant="outline" className="text-xs">New Account</Badge>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="overflow-y-auto max-h-[calc(90vh-250px)] px-6 py-4">
              <div className="space-y-6">
                {/* Quick Summary */}
                <div className="glass-effect rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Quick Summary</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        By continuing, you agree to our Terms of Service and Privacy Policy. We'll use your data to provide personalized fashion recommendations, manage your digital closet, and connect you with our community.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Agreement Tabs */}
                <Tabs defaultValue="terms" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="terms">
                      <FileText className="w-4 h-4 mr-2" />
                      Terms of Service
                    </TabsTrigger>
                    <TabsTrigger value="privacy">
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy Policy
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="terms" className="mt-4">
                    <div className="h-64 rounded-lg border p-4 bg-muted/30 overflow-y-auto">
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-bold mb-2">1. Acceptance of Terms</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            By accessing ZokaiHub, you accept and agree to be bound by these terms.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">2. Use of Service</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Use the service lawfully and respect community guidelines.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">3. User Content</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            You retain ownership of your content and grant us license to display it.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="privacy" className="mt-4">
                    <div className="h-64 rounded-lg border p-4 bg-muted/30 overflow-y-auto">
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-bold mb-2">1. Information We Collect</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            We collect account info, closet data, and usage information.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">2. How We Use Your Data</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            Your data enables personalized recommendations and features.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">3. Data Security</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            We use industry-standard encryption to protect your data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Agreements Checkboxes */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Required Agreements
                  </p>

                  {/* Accept All Checkbox */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      allRequiredAccepted 
                        ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10' 
                        : 'border-primary/30 bg-primary/5 hover:border-primary'
                    }`}
                    onClick={() => {
                      const newValue = !allRequiredAccepted;
                      setAgreements(prev => ({
                        ...prev,
                        termsOfService: newValue,
                        privacyPolicy: newValue,
                        ageConfirmation: newValue,
                        dataProcessing: newValue
                      }));
                    }}
                  >
                    <Checkbox
                      id="accept-all"
                      checked={allRequiredAccepted}
                      onCheckedChange={(checked) => {
                        setAgreements(prev => ({
                          ...prev,
                          termsOfService: checked as boolean,
                          privacyPolicy: checked as boolean,
                          ageConfirmation: checked as boolean,
                          dataProcessing: checked as boolean
                        }));
                      }}
                      className="mt-1"
                    />
                    <label htmlFor="accept-all" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-base">Accept All Required Terms</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Quickly accept all required agreements to get started
                      </p>
                    </label>
                  </motion.div>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-background text-muted-foreground">
                        Or accept individually
                      </span>
                    </div>
                  </div>

                  {/* Terms of Service */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      agreements.termsOfService 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleAgreement('termsOfService')}
                  >
                    <Checkbox
                      id="terms"
                      checked={agreements.termsOfService}
                      onCheckedChange={() => toggleAgreement('termsOfService')}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Terms of Service</span>
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        I have read and agree to the Terms of Service
                      </p>
                    </label>
                  </motion.div>

                  {/* Privacy Policy */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      agreements.privacyPolicy 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleAgreement('privacyPolicy')}
                  >
                    <Checkbox
                      id="privacy"
                      checked={agreements.privacyPolicy}
                      onCheckedChange={() => toggleAgreement('privacyPolicy')}
                      className="mt-1"
                    />
                    <label htmlFor="privacy" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Privacy Policy</span>
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        I understand how my data will be used and stored
                      </p>
                    </label>
                  </motion.div>

                  {/* Age Confirmation */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      agreements.ageConfirmation 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleAgreement('ageConfirmation')}
                  >
                    <Checkbox
                      id="age"
                      checked={agreements.ageConfirmation}
                      onCheckedChange={() => toggleAgreement('ageConfirmation')}
                      className="mt-1"
                    />
                    <label htmlFor="age" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Age Verification</span>
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        I confirm that I am at least 13 years old
                      </p>
                    </label>
                  </motion.div>

                  {/* Data Processing */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      agreements.dataProcessing 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleAgreement('dataProcessing')}
                  >
                    <Checkbox
                      id="data"
                      checked={agreements.dataProcessing}
                      onCheckedChange={() => toggleAgreement('dataProcessing')}
                      className="mt-1"
                    />
                    <label htmlFor="data" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Data Processing</span>
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        I consent to processing my data for AI features
                      </p>
                    </label>
                  </motion.div>

                  {/* Optional Marketing */}
                  <div className="pt-3 border-t">
                    <p className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      Optional Preferences
                    </p>

                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        agreements.marketing 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-muted-foreground/30'
                      }`}
                      onClick={() => toggleAgreement('marketing')}
                    >
                      <Checkbox
                        id="marketing"
                        checked={agreements.marketing}
                        onCheckedChange={() => toggleAgreement('marketing')}
                        className="mt-1"
                      />
                      <label htmlFor="marketing" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-sm">Marketing Communications</span>
                          <Badge variant="outline" className="text-xs">Optional</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Send me style tips and recommendations via email
                        </p>
                      </label>
                    </motion.div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="glass-effect rounded-lg p-4 border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Your Data is Protected</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        We use bank-level encryption to secure your data. You can delete your account anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t bg-muted/30">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onCancel}
                >
                  Decline
                </Button>
                <Button
                  className="flex-1 gradient-bg border-0 shadow-lg disabled:opacity-50"
                  onClick={handleAccept}
                  disabled={!allRequiredAccepted}
                >
                  {allRequiredAccepted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Accept & Continue
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Accept Required Terms
                    </>
                  )}
                </Button>
              </div>

              {!allRequiredAccepted && (
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Please accept all required agreements to continue
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}