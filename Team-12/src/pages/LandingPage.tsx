import React, { useState } from 'react';
import { 
  Droplet, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown, 
  Zap,
  Leaf,
  AlertCircle
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';
import { WaterHeroDroplet } from '../components/visuals/WaterHeroDroplet';
import { useAuth } from '../context/AuthContext';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, enableDemoMode, startGuestSession } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [guestHouseholdName, setGuestHouseholdName] = useState('');
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          setErrorMessage('Please enter your name');
          setLoading(false);
          return;
        }
        await signUpWithEmail(email, password, displayName);
      } else {
        await signInWithEmail(email, password);
      }
      onEnterApp();
    } catch (err: any) {
      console.warn('Auth notice:', err?.code || err);
      if (err.code === 'auth/operation-not-allowed') {
        setErrorMessage(
          'Email & Password sign-in is disabled in Firebase for this project. Please click "Continue with Google" above or "Explore Demo" / "Quick Guest Start" below.'
        );
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setErrorMessage('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('Password should be at least 6 characters.');
      } else {
        setErrorMessage(err.message || 'Authentication error. You can also explore via Demo Mode below.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      await signInWithGoogle();
      onEnterApp();
    } catch (err: any) {
      console.warn('Google Sign In:', err?.code || err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Sign-in popup was closed. You can try again or use Demo Mode.');
      } else {
        setErrorMessage(err.message || 'Google sign in unavailable in this iframe. Click Explore Demo below.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = () => {
    enableDemoMode();
    onEnterApp();
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startGuestSession(guestHouseholdName || 'My Household');
    onEnterApp();
  };

  return (
    <div className="min-h-screen bg-radial from-sky-50/70 via-cyan-50/30 to-slate-50 flex flex-col justify-between selection:bg-cyan-200 selection:text-sky-900">
      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <BrandLogo size="md" showTagline={true} />

        <div className="flex items-center gap-3">
          <button
            onClick={handleDemoClick}
            className="text-xs sm:text-sm font-bold text-cyan-700 bg-cyan-50/80 hover:bg-cyan-100/80 border border-cyan-200/80 px-4 py-2 rounded-xl transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>Explore Demo</span>
          </button>
        </div>
      </header>

      {/* Main Hero & Auth Container */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Col: Hero Pitch & Water Hero Droplet */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100/70 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Household Water Conservation Analyzer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sky-950 tracking-tight leading-[1.12]">
            Small Changes.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-teal-600">
              A Bigger Tomorrow.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
            Record household water consumption, identify wastage patterns, and receive
            personalized water-saving suggestions tailored to your family habits.
          </p>

          {/* Key Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg pt-2">
            <div className="p-3 rounded-xl bg-white/80 border border-sky-100 shadow-2xs text-left">
              <div className="p-1.5 rounded-lg bg-sky-50 text-cyan-600 w-fit mb-2">
                <Droplet className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-sky-950 block">Usage Insights</span>
              <span className="text-[11px] text-slate-500">Track 135 L/person benchmark</span>
            </div>

            <div className="p-3 rounded-xl bg-white/80 border border-sky-100 shadow-2xs text-left">
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 w-fit mb-2">
                <TrendingDown className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-sky-950 block">Save ~20-30%</span>
              <span className="text-[11px] text-slate-500">Targeted habit adjustments</span>
            </div>

            <div className="p-3 rounded-xl bg-white/80 border border-sky-100 shadow-2xs text-left">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 w-fit mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-sky-950 block">Smart Leak Alerts</span>
              <span className="text-[11px] text-slate-500">Zero wastage intelligence</span>
            </div>
          </div>

          {/* Hero Water Droplet Visual */}
          <div className="w-full flex justify-center lg:justify-start pt-4">
            <WaterHeroDroplet />
          </div>
        </div>

        {/* Right Col: Sign In / Sign Up & Demo Card */}
        <div className="w-full lg:w-[440px] shrink-0">
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-100/90 relative overflow-hidden bg-white/95">
            {/* Top water glow highlight */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-cyan-200/50 blur-2xl pointer-events-none" />

            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-sky-950 tracking-tight">
                {isSignUp ? 'Create your household' : 'Welcome to AquaSense'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isSignUp
                  ? 'Join the community conserving millions of litres.'
                  : 'Sign in to access your household water analyzer.'}
              </p>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative my-5 flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
                or with email
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all bg-slate-50/50"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all bg-slate-50/50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-700 hover:from-cyan-700 hover:to-sky-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-600/20 hover:shadow-lg hover:shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
              >
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 transition-colors"
              >
                {isSignUp
                  ? 'Already have an account? Sign in here'
                  : "Don't have an account? Create one"}
              </button>
            </div>

            {/* Prominent Demo Mode Divider & Button */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
              <button
                type="button"
                onClick={handleDemoClick}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-50 via-cyan-50 to-sky-50 hover:from-teal-100 hover:to-sky-100 border border-teal-200 text-teal-900 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-600 group-hover:rotate-12 transition-transform" />
                <span>Explore Demo with Sample Data (Priya's Household)</span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowGuestModal(!showGuestModal)}
                  className="text-xs font-semibold text-slate-500 hover:text-cyan-700 transition-colors"
                >
                  {showGuestModal ? 'Cancel custom household' : 'Or start fresh without sign-in →'}
                </button>
              </div>

              {showGuestModal && (
                <form onSubmit={handleGuestSubmit} className="pt-2 space-y-2 animate-in fade-in duration-200">
                  <input
                    type="text"
                    value={guestHouseholdName}
                    onChange={(e) => setGuestHouseholdName(e.target.value)}
                    placeholder="e.g. The Sharma Family"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 bg-slate-50"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-all shadow-xs"
                  >
                    Start Empty Household
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-sky-100/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <Droplet className="w-4 h-4 text-cyan-600" />
          <span className="font-semibold text-sky-950">AquaSense</span>
          <span>— Small Changes. A Bigger Tomorrow.</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Household Water Intelligence</span>
          <span>•</span>
          <span>135 L/person Standard</span>
        </div>
      </footer>
    </div>
  );
};
