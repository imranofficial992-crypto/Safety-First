/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  Phone,
  Bell,
  Home,
  Truck,
  Droplet,
  Calculator,
  Settings,
  MessageCircle,
  Eye,
  EyeOff,
  Sparkles,
  Lock
} from 'lucide-react';
import { Language, ScreenId, AmbulanceProvider, BloodDonor, ExpenseItem, EmergencyRequest } from './types';
import {
  EN_TRANSLATIONS,
  BN_TRANSLATIONS,
  INITIAL_AMBULANCE_PROVIDERS,
  INITIAL_BLOOD_DONORS,
  INITIAL_EXPENSES
} from './data/translations';

// Import subcomponents
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AmbulanceModule from './components/AmbulanceModule';
import BlogModules from './components/BlogModules';
import BloodDonateModule from './components/BloodDonateModule';
import ExpenseTrackerModule from './components/ExpenseTrackerModule';
import ContactsAndSettings from './components/ContactsAndSettings';
import AuthScreen from './components/AuthScreen';

export default function App() {
  // User Authentication State (24-hour expiration check)
  const [currentUser, setCurrentUser] = useState<{ username: string; fullName: string; bloodGroup: string; loginTime: number } | null>(() => {
    try {
      const saved = localStorage.getItem('safety_logged_in_user');
      if (saved) {
        const userObj = JSON.parse(saved);
        if (userObj && typeof userObj === 'object') {
          const loginTime = userObj.loginTime || 0;
          // 24 hours = 86,400,000 milliseconds
          if (Date.now() - loginTime > 86400000) {
            localStorage.removeItem('safety_logged_in_user');
            return null;
          }
          return userObj;
        }
      }
    } catch (e) {
      console.warn("Failed to load user session cleanly:", e);
    }
    return null;
  });

  // 1. Core State Managers
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('safety_lang');
      return (saved === 'bn' || saved === 'en') ? saved : 'en';
    } catch (e) {
      return 'en';
    }
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('safety_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    try {
      const saved = localStorage.getItem('safety_screen');
      return (saved as ScreenId) || 'home';
    } catch (e) {
      return 'home';
    }
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);

  // 2. Data Lists Persistent States
  const [ambulanceProviders, setAmbulanceProviders] = useState<AmbulanceProvider[]>(() => {
    try {
      const saved = localStorage.getItem('safety_ambulances');
      return saved ? JSON.parse(saved) : INITIAL_AMBULANCE_PROVIDERS;
    } catch (e) {
      return INITIAL_AMBULANCE_PROVIDERS;
    }
  });

  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>(() => {
    try {
      const saved = localStorage.getItem('safety_donors');
      return saved ? JSON.parse(saved) : INITIAL_BLOOD_DONORS;
    } catch (e) {
      return INITIAL_BLOOD_DONORS;
    }
  });

  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>(() => {
    try {
      const saved = localStorage.getItem('safety_blood_reqs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    try {
      const saved = localStorage.getItem('safety_expenses');
      return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
    } catch (e) {
      return INITIAL_EXPENSES;
    }
  });

  // 3. Sync State back to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('safety_lang', language);
    } catch (e) {}
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('safety_theme', theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('safety_screen', currentScreen);
    } catch (e) {}
  }, [currentScreen]);

  useEffect(() => {
    try {
      localStorage.setItem('safety_ambulances', JSON.stringify(ambulanceProviders));
    } catch (e) {}
  }, [ambulanceProviders]);

  useEffect(() => {
    try {
      localStorage.setItem('safety_donors', JSON.stringify(bloodDonors));
    } catch (e) {}
  }, [bloodDonors]);

  useEffect(() => {
    try {
      localStorage.setItem('safety_blood_reqs', JSON.stringify(emergencyRequests));
    } catch (e) {}
  }, [emergencyRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('safety_expenses', JSON.stringify(expenses));
    } catch (e) {}
  }, [expenses]);

  // Auth local storage sync and automatic session expiration ticker
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('safety_logged_in_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('safety_logged_in_user');
      }
    } catch (e) {}
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const checkSession = () => {
      const elapsed = Date.now() - currentUser.loginTime;
      if (elapsed > 86400000) {
        setCurrentUser(null);
        try {
          localStorage.removeItem('safety_logged_in_user');
        } catch (e) {}
      }
    };

    // Check immediately on load/effect refresh
    checkSession();

    // Check periodically in background
    const interval = setInterval(checkSession, 15000); // 15 seconds accuracy
    return () => clearInterval(interval);
  }, [currentUser]);

  // Dictionary Reference
  const t = language === 'en' ? EN_TRANSLATIONS : BN_TRANSLATIONS;

  // 4. Custom Mutators passed to children
  const handleAddAmbulance = (newProvider: { name: string; mobile: string; address: string; available: boolean }) => {
    const nextItem: AmbulanceProvider = {
      id: `amb-added-${Date.now()}`,
      ...newProvider
    };
    setAmbulanceProviders((prev) => [nextItem, ...prev]);
  };

  const handleAmbulanceDispatch = (dis: { location: string; contact: string; condition: string }) => {
    // Generate simulated call logs or push to a list if needed. In client SPA config, we trigger confirmation alert.
    console.log("Emergency ambulance dispatched locally:", dis);
  };

  const handleAddDonor = (newDonor: Omit<BloodDonor, 'id'>) => {
    const nextDonor: BloodDonor = {
      id: `donor-added-${Date.now()}`,
      ...newDonor
    };
    setBloodDonors((prev) => [nextDonor, ...prev]);
  };

  const handleAddBloodRequest = (newReq: Omit<EmergencyRequest, 'id' | 'date'>) => {
    const nextReq: EmergencyRequest = {
      id: `req-added-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...newReq
    };
    setEmergencyRequests((prev) => [nextReq, ...prev]);
  };

  const handleAddTransaction = (newTr: Omit<ExpenseItem, 'id'>) => {
    const nextTr: ExpenseItem = {
      id: `ledger-added-${Date.now()}`,
      ...newTr
    };
    setExpenses((prev) => [nextTr, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  // 5. Navigation Bottom Bar Buttons Definition
  const bottomNavs = [
    { id: 'home' as ScreenId, label: language === 'en' ? 'Home' : 'হোম', icon: Home },
    { id: 'ambulance' as ScreenId, label: language === 'en' ? 'Ambulance' : 'অ্যাম্বুলেন্স', icon: Truck },
    { id: 'blood-donate' as ScreenId, label: language === 'en' ? 'Blood' : 'রক্তদান', icon: Droplet },
    { id: 'expense-tracker' as ScreenId, label: language === 'en' ? 'Ledger' : 'হিসাব', icon: Calculator },
    { id: 'settings' as ScreenId, label: language === 'en' ? 'Settings' : 'সেটিংস', icon: Settings },
  ];

  // Screen Title Solver
  const getScreenTitle = (): string => {
    if (!currentUser) {
      return language === 'en' ? 'Portal Security' : 'পোর্টাল অ্যাক্সেস সিকিউরিটি';
    }
    switch (currentScreen) {
      case 'home':
        return t.appName;
      case 'fire-safety':
        return t.navFireSafety;
      case 'medical-care':
        return t.navMedicalCare;
      case 'legal-assistance':
        return t.navLegalAssistance;
      case 'disaster-management':
        return t.navDisasterManagement;
      case 'blood-donate':
        return t.navBloodDonate;
      case 'women-child-safety':
        return t.navWomenChildSafety;
      case 'ambulance':
        return t.navAmbulanceService;
      case 'expense-tracker':
        return t.navExpenseTracker;
      case 'contacts':
        return t.navEmergencyContacts;
      case 'settings':
        return t.navSettings;
      default:
        return t.appName;
    }
  };

  return (
    <div className={`h-full w-full overflow-hidden transition-all duration-300 select-none ${
      theme === 'dark' ? 'bg-[#060a17] text-white' : 'bg-[#f0f4f9] text-slate-800'
    } flex flex-col items-center justify-center md:py-6`}>

      {/* PRIMARY RESPONSIBLE CONTAINER */}
      <div className={`relative flex flex-col w-full max-w-lg md:rounded-3xl md:border md:shadow-2xl overflow-hidden h-full md:h-[840px] transition-all duration-300 ${
        theme === 'dark' ? 'bg-[#0b1329] md:border-slate-850' : 'bg-[#f8fafc] md:border-slate-200'
      }`}>
        
        {/* Application Layout Frame */}
        <div className="relative flex flex-col overflow-hidden h-full w-full">
          
          {/* TOP PRIMARY BAR */}
          <header className={`p-4 border-b flex items-center justify-between z-40 transition-colors ${
            theme === 'dark' ? 'bg-[#0f1b3b] border-slate-850' : 'bg-white border-slate-100 shadow-xs'
          }`}>
            <div className="flex items-center gap-3">
              {currentUser ? (
                <button
                  onClick={() => setSidebarOpen(true)}
                  id="btn-hamburger"
                  className={`p-2 rounded-xl transition-all ${
                    theme === 'dark' ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                  title="Sidebar trigger"
                >
                  <Menu size={18} />
                </button>
              ) : (
                <div className="p-2 bg-rose-500/10 text-rose-500 rounded-xl">
                  <Lock size={15} className="animate-pulse" />
                </div>
              )}
              
              <div className="max-w-[170px]">
                <h1 className="font-display font-black tracking-tight text-sm text-slate-800 dark:text-white truncate">
                  {getScreenTitle()}
                </h1>
                <p className="text-[9px] font-mono opacity-50 tracking-wide font-semibold mt-0.5 uppercase truncate">
                  {language === 'en' ? 'Civic Wellness' : 'নাগরিক সুরক্ষা গাইড'}
                </p>
              </div>
            </div>

            {/* Language Selection Quick Bar */}
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg bg-slate-105 dark:bg-slate-800 p-0.5 border dark:border-slate-800">
                <button
                  onClick={() => setLanguage('en')}
                  className={`text-[9px] font-bold px-2 py-1 rounded transition-colors ${
                    language === 'en' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  id="lang-toggle-en"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('bn')}
                  className={`text-[9px] font-bold px-1.5 py-1 rounded transition-colors ${
                    language === 'bn' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  id="lang-toggle-bn"
                >
                  বাংলা
                </button>
              </div>

              {/* Red Emergency Trigger Button inside top bar */}
              {currentUser && (
                <button
                  onClick={() => {
                    setCurrentScreen('contacts');
                  }}
                  className="w-8.5 h-8.5 bg-gradient-to-br from-red-600 to-rose-600 hover:from-red-700 text-white rounded-xl flex items-center justify-center shadow-lg shadow-rose-600/30 cursor-pointer shrink-0"
                  title="Emergency Hotlines Directory"
                >
                  <Phone size={14} className="animate-bounce" />
                </button>
              )}
            </div>
          </header>

          {/* ACTIVE SCREEN CONTENT WORKSPACE (SCROLLABLE CONTAINER) */}
          <main className="flex-1 overflow-y-auto relative scrollbar-thin overscroll-contain">
            {!currentUser ? (
              <AuthScreen
                language={language}
                theme={theme}
                onLoginSuccess={(user) => setCurrentUser({ ...user, loginTime: Date.now() })}
              />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                  className="pb-28" // generous bottom clearance for the WhatsApp and sticky bottom navigation bars!
                >
                {currentScreen === 'home' && (
                  <Dashboard
                    language={language}
                    setScreen={setCurrentScreen}
                    onRequestAmbulance={() => {
                      setCurrentScreen('ambulance');
                      setShowAmbulanceModal(true);
                    }}
                    theme={theme}
                  />
                )}

                {currentScreen === 'ambulance' && (
                  <AmbulanceModule
                    language={language}
                    providers={ambulanceProviders}
                    onAddProvider={handleAddAmbulance}
                    onRequestDispatch={handleAmbulanceDispatch}
                    showRequestModal={showAmbulanceModal}
                    setShowRequestModal={setShowAmbulanceModal}
                    theme={theme}
                  />
                )}

                {currentScreen === 'blood-donate' && (
                  <BloodDonateModule
                    language={language}
                    donors={bloodDonors}
                    requests={emergencyRequests}
                    onAddDonor={handleAddDonor}
                    onAddRequest={handleAddBloodRequest}
                    theme={theme}
                  />
                )}

                {currentScreen === 'expense-tracker' && (
                  <ExpenseTrackerModule
                    language={language}
                    expenses={expenses}
                    onAddTransaction={handleAddTransaction}
                    onDeleteTransaction={handleDeleteTransaction}
                    theme={theme}
                  />
                )}

                {(currentScreen === 'fire-safety' ||
                  currentScreen === 'medical-care' ||
                  currentScreen === 'legal-assistance' ||
                  currentScreen === 'disaster-management' ||
                  currentScreen === 'women-child-safety' ||
                  currentScreen === 'emergency-prep') && (
                  <BlogModules language={language} screenId={currentScreen} theme={theme} />
                )}

                {(currentScreen === 'contacts' || currentScreen === 'settings') && (
                  <ContactsAndSettings
                    language={language}
                    setLanguage={setLanguage}
                    theme={theme}
                    setTheme={setTheme}
                    screenId={currentScreen}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          )}
          </main>

          {/* WHATSAPP CONTACT STICKY FOOTER ROW BAR */}
          {currentUser && (
            <div className="absolute bottom-[66px] left-0 right-0 z-30 px-3.5 pb-1">
              <a
                href="https://wa.me/8801880492649"
                target="_blank"
                rel="noopener noreferrer referrer"
                className="w-full h-[45px] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-sans font-extrabold text-[11px] rounded-xl flex items-center justify-between px-4 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all border border-emerald-500/25 shrink-0"
                id="sticky-whatsapp-bar"
              >
                <div className="flex items-center gap-2 max-w-[85%]">
                  <MessageCircle size={15} className="animate-pulse-slow shrink-0" />
                  <span className="truncate tracking-wide">{t.whatsappText}</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-mono shrink-0">
                  wa.me
                </span>
              </a>
            </div>
          )}

          {/* APP HARD BOTTOM NAVIGATION TAB BAR */}
          {currentUser && (
            <footer className={`absolute bottom-0 left-0 right-0 z-30 h-[66px] border-t px-3.5 flex items-center justify-between transition-colors ${
              theme === 'dark' ? 'bg-[#0f1b3b] border-slate-850' : 'bg-white border-slate-100 shadow'
            }`}>
              {bottomNavs.map((btn) => {
                const Icon = btn.icon;
                const isActive = currentScreen === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => setCurrentScreen(btn.id)}
                    id={`bottom-tab-${btn.id}`}
                    className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10px] font-bold tracking-tight text-center cursor-pointer transition-all ${
                      isActive
                        ? 'text-rose-600 scale-103'
                        : theme === 'dark'
                        ? 'text-slate-450 hover:text-slate-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
                    <span className="mt-1 font-sans">{btn.label}</span>
                  </button>
                );
              })}
            </footer>
          )}

          {/* SLIDING SIDE DRAWER PANEL OVERLAY */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            currentScreen={currentScreen}
            setScreen={setCurrentScreen}
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            currentUser={currentUser}
            onLogout={() => {
              setCurrentUser(null);
              localStorage.removeItem('safety_logged_in_user');
            }}
          />
        </div>
      </div>
    </div>
  );
}
