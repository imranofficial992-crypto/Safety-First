/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  Flame,
  HeartPulse,
  Scale,
  ShieldCheck,
  Droplet,
  Users,
  Truck,
  Calculator,
  Bell,
  Navigation,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Language, ScreenId } from '../types';
import { EN_TRANSLATIONS, BN_TRANSLATIONS } from '../data/translations';

interface DashboardProps {
  language: Language;
  setScreen: (screen: ScreenId) => void;
  onRequestAmbulance: () => void;
  theme: 'light' | 'dark';
}

export default function Dashboard({
  language,
  setScreen,
  onRequestAmbulance,
  theme
}: DashboardProps) {
  const t = language === 'en' ? EN_TRANSLATIONS : BN_TRANSLATIONS;
  const [dialingNumber, setDialingNumber] = useState<string | null>(null);

  const categories = [
    {
      id: 'fire-safety' as ScreenId,
      title: t.navFireSafety,
      desc: language === 'en' ? "10 Home Prevention Tips, LPG and Electric drills" : "বাসাবাড়ি ও সিলিন্ডারের আগুন নিরোধক ১০টি উপায়",
      icon: Flame,
      color: "from-orange-500 to-red-600 animate-pulse-slow",
      shadow: "shadow-red-550/20"
    },
    {
      id: 'medical-care' as ScreenId,
      title: t.navMedicalCare,
      desc: language === 'en' ? "CPR guides, First Aid Checklist & Dengue virus tips" : "সিপিআর, ফার্স্ট এইড নির্দেশনা ও ডেঙ্গু জ্বর বিষয়ক সচেতনতা",
      icon: HeartPulse,
      color: "from-teal-500 to-emerald-600",
      shadow: "shadow-emerald-550/20"
    },
    {
      id: 'legal-assistance' as ScreenId,
      title: t.navLegalAssistance,
      desc: language === 'en' ? "Cyber crimes help, step-by-step General Diary guidelines" : "থানায় সহজে জিডি করার নিয়ম, আইনি ও সাইবার ক্রাইম পরামর্শ",
      icon: Scale,
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-550/20"
    },
    {
      id: 'disaster-management' as ScreenId,
      title: t.navDisasterManagement,
      desc: language === 'en' ? "Earthquakes Drop-Cover-Hold rules, Cyclones & Floods survival" : "ভূমিকম্পে আত্মরক্ষা ও সাইক্লোন সেন্টারের প্রয়োজনীয় প্রস্তুতি",
      icon: ShieldCheck,
      color: "from-cyan-500 to-sky-600",
      shadow: "shadow-sky-550/20"
    },
    {
      id: 'women-child-safety' as ScreenId,
      title: t.navWomenChildSafety,
      desc: language === 'en' ? "Helplines 109 & 1098, rapid security helpline support" : "১০৯ এবং ১০৯৮ জরুরি হটলাইন ও আইনি তথ্য গাইড",
      icon: Users,
      color: "from-pink-500 to-fuchsia-600",
      shadow: "shadow-pink-550/20"
    },
    {
      id: 'blood-donate' as ScreenId,
      title: t.navBloodDonate,
      desc: language === 'en' ? "Search 20 local active blood donors & match districts" : "২০ জন রক্তদাতার ডিরেক্টরি এবং জরুরি রক্তের রিকুয়েস্ট",
      icon: Droplet,
      color: "from-rose-600 to-red-700",
      shadow: "shadow-rose-550/20"
    },
    {
      id: 'ambulance' as ScreenId,
      title: t.navAmbulanceService,
      desc: language === 'en' ? "List verified clinics, cardiac mobile vans & drivers" : "নিকটবর্তী স্পেশাল অ্যাম্বুলেন্স চালক ও কার্ডিয়াক কেয়ার সাপোর্ট",
      icon: Truck,
      color: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-550/20"
    },
    {
      id: 'expense-tracker' as ScreenId,
      title: t.navExpenseTracker,
      desc: language === 'en' ? "Mini accounting utility. Monitor Emergency balance and budgets" : "জরুরি খরচ ও আয়ের হিসাব ডায়েরি, ব্যালেন্স ক্যালকুলেটর",
      icon: Calculator,
      color: "from-cyan-600 to-teal-700",
      shadow: "shadow-teal-550/20"
    },
  ];

  const handleCallSimulator = (num: string) => {
    setDialingNumber(num);
    setTimeout(() => {
      setDialingNumber(null);
    }, 3800);
  };

  return (
    <div className="space-y-5 p-4 pb-12">
      {/* Alert Notice Banner Slider */}
      <div className="bg-amber-500/10 border border-amber-500/35 rounded-2xl p-3.5 flex items-start gap-3">
        <div className="p-1 rounded-lg bg-amber-500 text-white mt-0.5 animate-bounce">
          <AlertTriangle size={15} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-amber-500 tracking-tight">
            {language === 'en' ? "WEATHER OBSERVATION BULLETIN" : "ঝড়-বৃষ্টি সতর্কবার্তা পর্যবেক্ষণ"}
          </h4>
          <p className="text-[11px] leading-relaxed opacity-75 mt-0.5">
            {language === 'en' 
              ? "Seasonal cyclones and high temperatures expected. Review our Disaster Management guidelines & Disaster kit tips."
              : "ঋতুভিত্তিক ঝড় এবং তীব্র তাপদাহের সম্ভাবনা রয়েছে। আমাদের দুর্যোগ প্রস্তুতি গাইড ও ওষুধ কিটের চেকলিস্ট দেখুন।"}
          </p>
        </div>
      </div>

      {/* QUICK HOTLINES HEADER BUTTONS */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
          {language === 'en' ? "CRITICAL EMERGENCY DIALS" : "জরুরি হটলাইন কলিং কিট"}
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* 999 Card */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleCallSimulator('999')}
            id="hotline-999"
            className="relative overflow-hidden group flex flex-col justify-between p-4 bg-gradient-to-br from-red-650 to-red-800 text-white rounded-2xl shadow-lg border border-red-500/20 hover:shadow-red-650/30 transition-all text-left"
          >
            <div className="absolute right-[-10px] top-[-5px] opacity-15 rotate-12 transition-transform duration-500 group-hover:scale-115">
              <Phone size={80} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wide text-red-200">
                {t.emergNational}
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-ping-slow">
                <Phone size={11} className="text-white" />
              </div>
            </div>
            <div className="mt-5">
              <span className="font-sans font-display font-extrabold text-3xl block leading-none">999</span>
              <span className="text-[9px] opacity-80 mt-1 block tracking-tight font-mono">{t.tapToCall}</span>
            </div>
          </motion.button>

          {/* 102 Card */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleCallSimulator('102')}
            id="hotline-102"
            className="relative overflow-hidden group flex flex-col justify-between p-4 bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-2xl shadow-lg border border-orange-550/20 hover:shadow-orange-600/30 transition-all text-left"
          >
            <div className="absolute right-[-10px] top-[-5px] opacity-15 rotate-12 transition-transform duration-500 group-hover:scale-115">
              <Flame size={80} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wide text-orange-200">
                {t.emergFire}
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Flame size={12} className="text-white" />
              </div>
            </div>
            <div className="mt-5">
              <span className="font-sans font-display font-extrabold text-3xl block leading-none">102</span>
              <span className="text-[9px] opacity-80 mt-1 block tracking-tight font-mono">{t.tapToCall}</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* AMBULANCE SERVICE CARD */}
      <div className={`p-4 rounded-2xl border transition-all ${
        theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flat-card-body leading-tight">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-amber-500 font-mono tracking-wide">
              <Navigation size={9} className="animate-spin-slow" /> {language === 'en' ? "VANS REGISTERED" : "নিবন্ধিত অ্যাম্বুলেন্স গ্যারেজ"}
            </div>
            <h4 className="text-sm font-bold tracking-tight">
              {t.ambulanceCardTitle}
            </h4>
            <p className="text-[11px] opacity-70 leading-relaxed pr-2">
              {t.ambulanceCardDesc}
            </p>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
            <Truck size={24} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={onRequestAmbulance}
            id="btn-request-ambulance"
            className="w-full py-2 px-3 text-[11px] font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md cursor-pointer transition-colors"
          >
            {t.ambulanceRequestBtn}
          </button>
          <button
            onClick={() => setScreen('ambulance')}
            id="btn-view-ambulance-list"
            className={`w-full py-2 px-3 text-[11px] font-bold rounded-xl transition-colors ${
              theme === 'dark' ? 'bg-slate-800 hover:bg-slate-750 text-slate-300' : 'bg-slate-150 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {language === 'en' ? "Browse Providers" : "ডিরেক্টরি দেখুন"}
          </button>
        </div>
      </div>

      {/* MAIN BENTO SERVICE GRID CATEGORIES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
            {language === 'en' ? "PUBLIC WELFARE DIRECTORIES" : "জনকল্যাণ সেবা ক্যাটাগরি"}
          </h3>
          <span className="text-[10px] opacity-50 px-2 py-0.5 rounded-full font-mono">
            {categories.length} {language === 'en' ? "Active Modules" : "সক্রিয় মডিউল"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, index) => {
            const CatIcon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setScreen(cat.id)}
                id={`category-card-${cat.id}`}
                className={`relative overflow-hidden p-3.5 flex flex-col justify-between h-[126px] text-left rounded-2xl border transition-all ${
                  theme === 'dark' 
                    ? 'bg-[#0f1b3b] hover:bg-[#15234d] border-slate-800' 
                    : 'bg-white hover:bg-slate-50 border-slate-100 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                    <CatIcon size={16} />
                  </div>
                </div>
                <div className="mt-auto space-y-0.5">
                  <h4 className="text-xs font-bold leading-tight tracking-tight text-slate-900 dark:text-white/95">
                    {cat.title}
                  </h4>
                  <p className="text-[9px] line-clamp-2 text-slate-500 dark:text-slate-400 leading-tight">
                    {cat.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* CALLING SIMULATOR MODAL OVERLAY */}
      {dialingNumber && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 rounded-3xl flex flex-col justify-center items-center p-6 text-center text-white">
          <div className="w-24 h-24 rounded-full bg-rose-600 flex items-center justify-center animate-pulse shadow-2xl shadow-rose-600/50 mb-6">
            <Phone size={36} className="text-white animate-bounce-slow" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
            {language === 'en' ? "ESTABLISHING EMERGENCY DIAL..." : "জরুরি লিংক ডায়াল করা হচ্ছে..."}
          </span>
          <h2 className="text-4xl font-extrabold tracking-widest mt-2">{dialingNumber}</h2>
          <p className="text-sm opacity-60 mt-4 leading-relaxed max-w-[200px]">
            {language === 'en' ? "Simulating phone line audio. Make sure your device has carrier coverage." : "কলিং সিমুলার শুরু হয়েছে। আপনার সিম নেটওয়ার্ক পরীক্ষা নিশ্চিত করুন।"}
          </p>

          <button
            onClick={() => setDialingNumber(null)}
            className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs font-bold transition-all"
          >
            {language === 'en' ? "Cancel Call" : "লাইন কেটে দিন"}
          </button>
        </div>
      )}
    </div>
  );
}
