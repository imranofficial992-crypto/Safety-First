import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, User, Users, Lock, LogIn, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface AuthScreenProps {
  language: Language;
  theme: 'light' | 'dark';
  onLoginSuccess: (user: { username: string; fullName: string; bloodGroup: string }) => void;
}

const authTranslations = {
  en: {
    welcome: "Safety First",
    subtitle: "Civic Emergency & Health Guardian",
    login: "Log In",
    register: "Create Account",
    username: "Choose Username",
    usernamePlaceholder: "Enter custom username (e.g. imran99)",
    fullName: "Your Full Name",
    fullNamePlaceholder: "Enter your full name",
    bloodGroup: "Blood Group",
    password: "Secure Password",
    passwordPlaceholder: "Enter your secret password",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Re-type your password",
    noAccount: "Don't have an account?",
    hasAccount: "Already registered?",
    createAccountBtn: "Sign Up Now",
    loginBtn: "Access Portal",
    validationError: "All fields are mandatory.",
    mismatchError: "Passwords do not match.",
    usernameTaken: "Username is already registered.",
    invalidCredentials: "Incorrect username or password.",
    successRegister: "Registration successful! Proceed to log in.",
    tagline: "Always Ready, Instant Assistance"
  },
  bn: {
    welcome: "সেফটি ফার্স্ট বাংলাদেশ",
    subtitle: "জরুরি সেবা ও নাগরিক রক্তদান পোর্টালে স্বাগতম",
    login: "লগইন করুন",
    register: "নতুন অ্যাকাউন্ট তৈরি",
    username: "ইউজারনেম",
    usernamePlaceholder: "একটি ইউনিক ইউজারনেম (যেমন: imran99)",
    fullName: "আপনার পূর্ণ নাম",
    fullNamePlaceholder: "আপনার সম্পূর্ণ নাম লিখুন",
    bloodGroup: "রক্তের গ্রুপ",
    password: "গোপন পাসওয়ার্ড",
    passwordPlaceholder: "পাসওয়ার্ড প্রবেশ করুন",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    confirmPasswordPlaceholder: "পাসওয়ার্ড পুনরায় লিখুন",
    noAccount: "অ্যাকাউন্ট নেই?",
    hasAccount: "ইতিমধ্যে অ্যাকাউন্ট রয়েছে?",
    createAccountBtn: "সাইন আপ করুন",
    loginBtn: "লগইন করুন",
    validationError: "সবগুলো ঘর পূরণ করা অবশ্যক।",
    mismatchError: "পাসওয়ার্ডটি মেলেনি।",
    usernameTaken: "এই ইউজারনেমটি ইতিমধ্যে ব্যবহৃত হয়েছে।",
    invalidCredentials: "ভুল ইউজারনেম অথবা পাসওয়ার্ড।",
    successRegister: "অ্যাকাউন্ট তৈরি সফল হয়েছে! এখন লগইন করুন।",
    tagline: "সর্বদা সতর্ক, তাৎক্ষণিক সেবার ডিজিটাল গাইড"
  }
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function AuthScreen({ language, theme, onLoginSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const t = authTranslations[language];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Basic fields validation
    if (!username.trim() || !password) {
      setErrorMsg(t.validationError);
      return;
    }

    if (!isLogin && (!fullName.trim() || !confirmPassword)) {
      setErrorMsg(t.validationError);
      return;
    }

    const cleanUsername = username.trim().toLowerCase();

    // Get registered users
    const localUsersRaw = localStorage.getItem('safety_registered_users');
    const registeredUsers = localUsersRaw ? JSON.parse(localUsersRaw) : [];

    if (isLogin) {
      // Login flow
      const user = registeredUsers.find(
        (u: any) => u.username === cleanUsername && u.password === password
      );

      if (user) {
        // Success !
        onLoginSuccess({
          username: user.username,
          fullName: user.fullName || user.username,
          bloodGroup: user.bloodGroup || 'O+',
        });
      } else {
        // Fallback user check to make testing simple and friendly
        if (cleanUsername === 'admin' && password === 'admin') {
          onLoginSuccess({
            username: 'admin',
            fullName: 'Administrator',
            bloodGroup: 'O+',
          });
        } else {
          setErrorMsg(t.invalidCredentials);
        }
      }
    } else {
      // Register flow
      if (password !== confirmPassword) {
        setErrorMsg(t.mismatchError);
        return;
      }

      const userExists = registeredUsers.some((u: any) => u.username === cleanUsername);
      if (userExists || cleanUsername === 'admin') {
        setErrorMsg(t.usernameTaken);
        return;
      }

      // Add new registered user
      const newUser = {
        username: cleanUsername,
        password,
        fullName: fullName.trim(),
        bloodGroup,
      };

      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem('safety_registered_users', JSON.stringify(updatedUsers));

      setSuccessMsg(t.successRegister);
      setIsLogin(true);
      // Clear password field to force fresh clean inputs
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className={`w-full min-h-full flex items-center justify-center p-4 font-sans select-none transition-colors ${
      theme === 'dark' ? 'bg-[#0b1329]' : 'bg-[#f8fafc]'
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${
          theme === 'dark' 
            ? 'bg-[#0f1b3b] border-slate-800 text-white' 
            : 'bg-white border-slate-100 text-slate-800'
        }`}
      >
        {/* LOGO AREA */}
        <div className="flex flex-col items-center text-center space-y-2.5 mb-7">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <ShieldCheck size={32} className="text-white animate-pulse" />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-550 text-white p-1 rounded-lg shadow">
              <Sparkles size={11} className="animate-spin-slow" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-black font-display tracking-tight text-slate-850 dark:text-white">
              {t.welcome}
            </h2>
            <p className="text-[10px] text-rose-500 dark:text-rose-400 font-bold uppercase tracking-wider mt-1">
              • {t.tagline} •
            </p>
            <p className="text-[11px] opacity-70 leading-relaxed mt-1 max-w-[280px] mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* ALERTS AND MESSAGES */}
        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl flex items-center gap-2.5 text-xs font-semibold"
            >
              <AlertTriangle size={15} className="shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2.5 text-xs font-semibold"
            >
              <CheckCircle2 size={15} className="shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AUTH FORM */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          
          {/* REGISTER EXTRA FIELDS */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                {t.fullName}
              </label>
              <div className="relative">
                <Users size={14} className="absolute left-3.5 top-3.5 text-rose-500/80" />
                <input
                  type="text"
                  required
                  value={fullName}
                  placeholder={t.fullNamePlaceholder}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl border outline-none tracking-wide transition-all ${
                    theme === 'dark' 
                      ? 'bg-[#15234d] border-slate-800 text-white focus:border-rose-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
                  }`}
                />
              </div>
            </div>
          )}

          {/* USERNAME */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">
              {t.username}
            </label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-3.5 text-rose-500/80" />
              <input
                type="text"
                required
                value={username}
                placeholder={t.usernamePlaceholder}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl border outline-none tracking-wide transition-all ${
                  theme === 'dark' 
                    ? 'bg-[#15234d] border-slate-800 text-white focus:border-rose-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
                }`}
              />
            </div>
          </div>

          {/* REGISTER BLOOD GROUP */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                {t.bloodGroup}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setBloodGroup(bg)}
                    className={`py-2 text-xs font-black rounded-lg border transition-all ${
                      bloodGroup === bg
                        ? 'bg-red-600 border-red-500 text-white'
                        : theme === 'dark'
                        ? 'bg-[#15234d] border-slate-850 hover:bg-[#1a2d64]'
                        : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">
              {t.password}
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-3.5 text-rose-500/80" />
              <input
                type="password"
                required
                value={password}
                placeholder={t.passwordPlaceholder}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl border outline-none tracking-wide transition-all ${
                  theme === 'dark' 
                    ? 'bg-[#15234d] border-slate-800 text-white focus:border-rose-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
                }`}
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                {t.confirmPassword}
              </label>
              <div className="relative">
                <KeyRound size={14} className="absolute left-3.5 top-3.5 text-rose-500/80" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  placeholder={t.confirmPasswordPlaceholder}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full text-xs pl-10 pr-4 py-3 rounded-xl border outline-none tracking-wide transition-all ${
                    theme === 'dark' 
                      ? 'bg-[#15234d] border-slate-800 text-white focus:border-rose-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
                  }`}
                />
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-black rounded-xl shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <LogIn size={15} />
            {isLogin ? t.loginBtn : t.createAccountBtn}
          </button>
        </form>

        {/* SWITCH FLOW LINK */}
        <div className="text-center mt-6 pt-5 border-t border-slate-500/10">
          <p className="text-[11px] opacity-75">
            {isLogin ? t.noAccount : t.hasAccount}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-rose-500 dark:text-rose-400 font-bold hover:underline cursor-pointer ml-1"
            >
              {isLogin ? t.register : t.login}
            </button>
          </p>
        </div>

        {/* SIMPLE SYSTEM INFO TIPS FOR EASY TESTING */}
         <div className={`mt-5 p-2.5 rounded-xl text-[9px] text-center leading-relaxed ${
           theme === 'dark' ? 'bg-[#15234d]/50 text-slate-400' : 'bg-slate-100 text-slate-500'
         }`}>
           💡 {language === 'en' ? "Testing shortcut: Both Username & Password as " : "সহজে পরীক্ষার জন্য উভয় ঘরেই ইউজার ও পাসওয়ার্ড "}
           <span className="font-mono font-bold text-red-500 bg-red-500/10 px-1 py-0.5 rounded">admin</span>
           {language === 'en' ? " can bypass immediately!" : " ব্যবহার করে প্রবেশ করতে পারবেন!"}
         </div>
      </motion.div>
    </div>
  );
}
