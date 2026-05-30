/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  PhoneCall,
  Settings,
  HelpCircle,
  Globe,
  Sun,
  Moon,
  Smartphone,
  CheckCircle,
  Info
} from 'lucide-react';
import { Language, ScreenId } from '../types';
import { EN_TRANSLATIONS, BN_TRANSLATIONS } from '../data/translations';
import FireFighterGuide from './FireFighterGuide';

interface ContactsAndSettingsProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  screenId: 'contacts' | 'settings';
}

export default function ContactsAndSettings({
  language,
  setLanguage,
  theme,
  setTheme,
  screenId
}: ContactsAndSettingsProps) {
  const t = language === 'en' ? EN_TRANSLATIONS : BN_TRANSLATIONS;
  const [dialingNumber, setDialingNumber] = useState<string | null>(null);

  const emergencyContacts = [
    { name: language === 'en' ? "National Help Desk" : "জাতীয় হেল্প ডেস্ক সেল", number: "999", type: "CRITICAL" },
    { name: language === 'en' ? "Fire Service Command Center" : "ফায়ার সার্ভিস নিয়ন্ত্রণ কক্ষ", number: "102", type: "CRITICAL" },
    { name: language === 'en' ? "Women and Child Abuse Cell" : "নারী ও শিশু নির্যাতন সেফটি সেল", number: "109", type: "SUPPORT" },
    { name: language === 'en' ? "Child Helpline Department" : "শিশু সহায়তার হটলাইন বিভাগ", number: "1098", type: "SUPPORT" },
    { name: language === 'en' ? "Emergency Disaster Management Desk" : "দুর্যোগ নিয়ন্ত্রণ ও সাড়া কেন্দ্র", number: "10921", type: "DISASTER" },
    { name: language === 'en' ? "National Legal Aid Association" : "জাতীয় আইনগত সহায়তা সেল", number: "16430", type: "LEGAL" },
    { name: language === 'en' ? "Consumer Rights Protection Center" : "ভোক্তা অধিকার সংরক্ষণ পরিদপ্তর", number: "16121", type: "LEGAL" },
    { name: language === 'en' ? "Government Portal Helplines" : "সরকারি তথ্য ও সেবামূলক পোর্টাল", number: "333", type: "GENERAL" },
    { name: language === 'en' ? "Cyber Crime Bureau Helpdesk" : "সাইবার ক্রাইম সহায়তা হেল্পডেস্ক", number: "01769691520", type: "CRITICAL" },
  ];

  const handleCall = (num: string) => {
    setDialingNumber(num);
    try {
      const sanitized = num.replace(/[\s-()]/g, '');
      window.location.href = `tel:${sanitized}`;
    } catch (e) {
      console.warn("Direct native dial failed:", e);
    }
    setTimeout(() => {
      setDialingNumber(null);
    }, 3800);
  };

  if (screenId === 'contacts') {
    return (
      <div className="space-y-5 p-4 pb-12 relative font-sans">
        {/* Call Establisher Screen */}
        {dialingNumber && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 rounded-3xl flex flex-col justify-center items-center p-6 text-center text-white">
            <div className="w-20 h-20 rounded-full bg-rose-600 flex items-center justify-center animate-pulse mb-6">
              <PhoneCall size={28} className="text-white" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#ef4444] uppercase">
              {language === 'en' ? "Connecting Hotline Network..." : "সরকারি হেল্পডেস্কে ডায়াল করা হচ্ছে..."}
            </span>
            <h3 className="text-3xl font-extrabold tracking-wide mt-2">{dialingNumber}</h3>
            <p className="text-xs opacity-60 mt-3 max-w-[200px]">
              {language === 'en' ? "Contact established safely. Simulated carrier channel is starting." : "কলিং সিমুলেটর সফলভাবে যুক্ত করেছে। অনুগ্রহ করে অপেক্ষা করুন।"}
            </p>
            <button
              onClick={() => setDialingNumber(null)}
              className="mt-8 px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs"
            >
              {language === 'en' ? "Close Call" : "লাইন কেটে দিন"}
            </button>
          </div>
        )}

        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-lg overflow-hidden">
          <span className="text-[10px] tracking-widest font-mono uppercase bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
            {language === 'en' ? "GOVERNMENT HOTLINES" : "সরকারি জরুরি যোগাযোগ"}
          </span>
          <h3 className="text-lg font-extrabold mt-2">{t.navEmergencyContacts}</h3>
          <p className="text-xs opacity-90 mt-1">
            {language === 'en'
              ? "Speed dialing indexes for major public welfare desks, consumer protection, and cyber wings."
              : "জাতীয় আইনি সহায়তা, ভোক্তা অধিকার এবং ফায়ার সার্ভিসের গুরুত্বপূর্ণ সরকারি যোগাযোগ সেল।"}
          </p>
        </div>

        {/* Contacts list */}
        <div className="space-y-3">
          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className={`p-4 border rounded-2xl flex justify-between items-center transition-all ${
                theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
              }`}
            >
              <div className="max-w-[70%] space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                    contact.type === 'CRITICAL' 
                      ? 'bg-red-500/10 text-red-500' 
                      : contact.type === 'SUPPORT'
                      ? 'bg-pink-500/10 text-pink-500'
                      : contact.type === 'DISASTER'
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'bg-indigo-500/10 text-indigo-500'
                  }`}>
                    {contact.type}
                  </span>
                </div>
                <h5 className="text-xs font-black tracking-tight leading-tight">{contact.name}</h5>
                <p className="text-[10px] font-mono opacity-60 font-semibold">{contact.number}</p>
              </div>

              <button
                onClick={() => handleCall(contact.number)}
                id={`btn-call-hotline-${contact.number}`}
                className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow shadow-indigo-600/15 cursor-pointer"
              >
                <PhoneCall size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-4 pb-12 font-sans">
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg overflow-hidden border border-slate-700/30">
        <span className="text-[10px] tracking-widest font-mono uppercase bg-white/15 px-2.5 py-0.5 rounded-full">
          PREFERENCES
        </span>
        <h3 className="text-lg font-black mt-2">{t.settingsTitle}</h3>
        <p className="text-xs opacity-85 mt-1 leading-relaxed">
          Configure physical simulators, localized toggle buttons, and interface aesthetics.
        </p>
      </div>

      {/* Language Box */}
      <div className={`p-4 rounded-xl border space-y-3.5 ${
        theme === 'dark' ? 'bg-[#0f1b3b] border-slate-850' : 'bg-white border-slate-100'
      }`}>
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-350 uppercase flex items-center gap-1.5">
          <Globe size={14} /> {language === 'en' ? "Language Preference" : "ভাষা পছন্দ"}
        </h4>
        <p className="text-xs opacity-75 leading-normal">{t.currentLangText}</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLanguage('en')}
            className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
              language === 'en'
                ? 'bg-rose-600 border-rose-600 text-white shadow'
                : 'bg-transparent border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            English System (EN)
          </button>
          <button
            onClick={() => setLanguage('bn')}
            className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
              language === 'bn'
                ? 'bg-rose-600 border-rose-600 text-white shadow'
                : 'bg-transparent border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            বাংলা লেআউট (BN)
          </button>
        </div>
      </div>

      {/* Theme customization */}
      <div className={`p-4 rounded-xl border space-y-3.5 ${
        theme === 'dark' ? 'bg-[#0f1b3b] border-slate-850' : 'bg-white border-slate-100'
      }`}>
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-350 uppercase flex items-center gap-1.5">
          <Sun size={14} /> {t.selectTheme}
        </h4>
        
        <div className="grid grid-cols-2 gap-3 font-medium">
          <button
            onClick={() => setTheme('light')}
            className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs transition-colors ${
              theme === 'light'
                ? 'bg-[#1e293b] text-white border-[#1e293b]'
                : 'bg-transparent border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Sun size={14} className="text-amber-500" />
            <span className="truncate">{t.lightMode}</span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs transition-colors ${
              theme === 'dark'
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-transparent border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Moon size={14} className="text-indigo-400" />
            <span className="truncate">{t.darkMode}</span>
          </button>
        </div>
      </div>

      {/* Legal & Authors credits */}
      <div className="flex items-start gap-2.5 p-3.5 bg-rose-600/10 rounded-xl text-rose-600 text-xs">
        <Info size={16} className="shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">{t.developedForLabel}</p>
          <p className="text-[10px] opacity-75 mt-1 leading-normal">
            Bilingual client-side state machine. All registration entries (new ambulance, financial ledgers, emergency blood requirement alert broadcasts) are synchronized instantly to localStorage.
          </p>
        </div>
      </div>

      {/* Designer Credit */}
      <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
        theme === 'dark' ? 'bg-[#0f1b3b]/60 border-slate-850' : 'bg-slate-50 border-slate-200'
      }`}>
        <p className={`text-xs font-semibold tracking-wide ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          Design by <span className="text-rose-600 font-black">Fire Fighter Imran Hossin Anondo</span>
        </p>
      </div>

      <FireFighterGuide language={language} theme={theme} />
    </div>
  );
}
