/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Home,
  Flame,
  HeartPulse,
  Scale,
  ShieldCheck,
  Droplet,
  Users,
  Truck,
  Calculator,
  User,
  Settings,
  PhoneCall,
  Globe
} from 'lucide-react';
import { Language, ScreenId } from '../types';
import { EN_TRANSLATIONS, BN_TRANSLATIONS } from '../data/translations';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenId;
  setScreen: (screen: ScreenId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
}

export default function Sidebar({
  isOpen,
  onClose,
  currentScreen,
  setScreen,
  language,
  setLanguage,
  theme
}: SidebarProps) {
  const t = language === 'en' ? EN_TRANSLATIONS : BN_TRANSLATIONS;

  const menuItems = [
    { id: 'home' as ScreenId, label: t.navHome, icon: Home },
    { id: 'fire-safety' as ScreenId, label: t.navFireSafety, icon: Flame },
    { id: 'medical-care' as ScreenId, label: t.navMedicalCare, icon: HeartPulse },
    { id: 'legal-assistance' as ScreenId, label: t.navLegalAssistance, icon: Scale },
    { id: 'disaster-management' as ScreenId, label: t.navDisasterManagement, icon: ShieldCheck },
    { id: 'blood-donate' as ScreenId, label: t.navBloodDonate, icon: Droplet },
    { id: 'women-child-safety' as ScreenId, label: t.navWomenChildSafety, icon: Users },
    { id: 'ambulance' as ScreenId, label: t.navAmbulanceService, icon: Truck },
    { id: 'expense-tracker' as ScreenId, label: t.navExpenseTracker, icon: Calculator },
    { id: 'contacts' as ScreenId, label: t.navEmergencyContacts, icon: PhoneCall },
    { id: 'settings' as ScreenId, label: t.navSettings, icon: Settings },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black z-50 rounded-3xl"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`absolute top-0 bottom-0 left-0 w-4/5 max-w-[280px] z-50 shadow-2xl rounded-l-3xl flex flex-col justify-between overflow-hidden ${
              theme === 'dark' ? 'bg-[#0b1329] text-white/95' : 'bg-white text-slate-800'
            }`}
          >
            {/* Drawer Header */}
            <div className={`p-5 pb-4 border-b ${theme === 'dark' ? 'border-slate-800 bg-[#0f1b3b]' : 'border-slate-100 bg-[#f8fafc]'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/30">
                    <span className="font-bold text-white tracking-wider text-base">SF</span>
                  </div>
                  <div>
                    <h3 className="font-bold tracking-tight text-sm text-rose-500">{t.appName}</h3>
                    <p className="text-[10px] opacity-60 font-mono">Bilingual v2.0</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-1.5 rounded-lg transition-colors ${
                    theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                  }`}
                  id="btn-sidebar-close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* User Identity Profile Card */}
              <div className={`mt-4 p-2.5 rounded-xl flex items-center gap-3 ${
                theme === 'dark' ? 'bg-[#1a2b53]' : 'bg-[#f1f5f9]'
              }`}>
                <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden border border-rose-500/30">
                  <User size={18} className="text-slate-600" />
                </div>
                <div className="truncate">
                  <p className="text-[11px] font-medium leading-none opacity-50">Authorized User</p>
                  <p className="text-xs font-semibold truncate mt-1">imranofficial992@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Drawer Menu Items */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setScreen(item.id);
                      onClose();
                    }}
                    id={`menu-item-${item.id}`}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-rose-600/90 text-white shadow-md shadow-rose-600/20'
                          : 'bg-rose-50 text-rose-700 shadow-sm'
                        : theme === 'dark'
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <IconComponent
                      size={18}
                      className={isActive ? 'text-white' : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Drawer Bottom Options */}
            <div className={`p-4 border-t flex flex-col gap-3 ${theme === 'dark' ? 'border-slate-850 bg-[#0f1b3b]' : 'border-slate-100 bg-[#f8fafc]'}`}>
              {/* Language Fast Switch */}
              <div className="flex items-center justify-between px-2">
                <span className="text-xs opacity-60 flex items-center gap-1.5 font-medium">
                  <Globe size={13} /> {language === 'en' ? "Language Settings" : "ভাষা সেটিং"}
                </span>
                <div className="flex rounded-md p-0.5 bg-slate-200 dark:bg-slate-800">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-[10px] px-2 py-1 font-semibold rounded ${
                      language === 'en' ? 'bg-rose-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('bn')}
                    className={`text-[10px] px-2 py-1 font-semibold rounded ${
                      language === 'bn' ? 'bg-rose-600 text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    BN
                  </button>
                </div>
              </div>

              <div className="text-center text-[10px] font-mono opacity-40">
                &copy; 2026 Safety First App
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
