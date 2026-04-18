import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { LogoFull } from './Logo';
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic
    console.log('Reset password for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <LogoFull className="justify-center" />
          </div>

          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Check your email</h1>
          <p className="text-muted-foreground mb-8">
            We've sent a password reset link to<br />
            <span className="font-medium text-foreground">{email}</span>
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full h-12"
            >
              Try another email
            </Button>
            <Button
              onClick={() => window.location.href = '#'}
              className="w-full h-12 gradient-bg border-0"
            >
              Back to Sign In
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Didn't receive the email?{' '}
            <button
              onClick={handleSubmit}
              className="text-primary hover:underline font-medium"
            >
              Click to resend
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <LogoFull />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Forgot password?
          </h1>
          <p className="text-muted-foreground">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base gradient-bg border-0 hover:opacity-90 transition-opacity"
          >
            Reset Password
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>

        <Button
          onClick={() => window.location.href = '#'}
          variant="ghost"
          className="w-full mt-4"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Sign In
        </Button>
      </div>
    </div>
  );
}
