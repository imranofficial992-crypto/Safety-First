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
  AlertTriangle,
  X,
  Activity,
  Clock,
  Sparkles
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
      shadow: "shadow-red-500/20"
    },
    {
      id: 'medical-care' as ScreenId,
      title: t.navMedicalCare,
      desc: language === 'en' ? "CPR guides, First Aid Checklist & Dengue virus tips" : "সিপিআর, ফার্স্ট এইড নির্দেশনা ও ডেঙ্গু জ্বর বিষয়ক সচেতনতা",
      icon: HeartPulse,
      color: "from-teal-500 to-emerald-600",
      shadow: "shadow-emerald-500/20"
    },
    {
      id: 'legal-assistance' as ScreenId,
      title: t.navLegalAssistance,
      desc: language === 'en' ? "Cyber crimes help, step-by-step General Diary guidelines" : "থানায় সহজে জিডি করার নিয়ম, আইনি ও সাইবার ক্রাইম পরামর্শ",
      icon: Scale,
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-500/20"
    },
    {
      id: 'disaster-management' as ScreenId,
      title: t.navDisasterManagement,
      desc: language === 'en' ? "Earthquakes Drop-Cover-Hold rules, Cyclones & Floods survival" : "ভূমিকম্পে আত্মরক্ষা ও সাইক্লোন সেন্টারের প্রয়োজনীয় প্রস্তুতি",
      icon: ShieldCheck,
      color: "from-cyan-500 to-sky-600",
      shadow: "shadow-sky-500/20"
    },
    {
      id: 'women-child-safety' as ScreenId,
      title: t.navWomenChildSafety,
      desc: language === 'en' ? "Helplines 109 & 1098, rapid security helpline support" : "১০৯ এবং ১০৯৮ জরুরি হটলাইন ও আইনি তথ্য গাইড",
      icon: Users,
      color: "from-pink-500 to-fuchsia-600",
      shadow: "shadow-pink-500/20"
    },
    {
      id: 'blood-donate' as ScreenId,
      title: t.navBloodDonate,
      desc: language === 'en' ? "Search 20 local active blood donors & match districts" : "২০ জন রক্তদাতার ডিরেক্টরি এবং জরুরি রক্তের রিকুয়েস্ট",
      icon: Droplet,
      color: "from-rose-600 to-red-700",
      shadow: "shadow-rose-500/20"
    },
    {
      id: 'ambulance' as ScreenId,
      title: t.navAmbulanceService,
      desc: language === 'en' ? "List verified clinics, cardiac mobile vans & drivers" : "নিকটবর্তী স্পেশাল অ্যাম্বুলেন্স চালক ও কার্ডিয়াক কেয়ার সাপোর্ট",
      icon: Truck,
      color: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-500/20"
    },
    {
      id: 'expense-tracker' as ScreenId,
      title: t.navExpenseTracker,
      desc: language === 'en' ? "Mini accounting utility. Monitor Emergency balance and budgets" : "জরুরি খরচ ও আয়ের হিসাব ডায়েরি, ব্যালেন্স ক্যালকুলেটর",
      icon: Calculator,
      color: "from-cyan-600 to-teal-700",
      shadow: "shadow-teal-500/20"
    },
  ];

  const handleCallSimulator = (num: string) => {
    setDialingNumber(num);
    setTimeout(() => {
      setDialingNumber(null);
    }, 3800);
  };

  const [showCprModal, setShowCprModal] = useState(false);

  return (
    <div className="space-y-5 p-4 pb-12">
      {/* CPR Emergency Info Card */}
      <motion.div 
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => setShowCprModal(true)}
        className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer shadow-lg shadow-red-600/15 hover:shadow-red-600/25 border border-red-500/30 transition-all group"
        id="cpr-banner-card"
      >
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-white/15 text-white relative shadow-inner shrink-0">
            <HeartPulse size={20} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-350"></span>
            </span>
          </div>
          <div className="text-left">
            <span className="text-[9px] font-extrabold tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-md uppercase font-mono">
              {language === 'en' ? "FIRST AID PROTOCOLS" : "জরুরি জীবন রক্ষা গাইড"}
            </span>
            <h4 className="text-sm font-extrabold text-white tracking-tight mt-1 items-center gap-1.5 leading-tight flex flex-row">
              {language === 'en' ? "CPR Emergency Lifesaver Support" : "জরুরী চিকিৎসা সেবা CPR নির্দেশিকা"}
              <Sparkles size={13} className="text-yellow-300 fill-yellow-300 shrink-0" />
            </h4>
            <p className="text-[11px] leading-relaxed text-red-50 mt-1 opacity-95">
              {language === 'en' 
                ? "Learn what CPR is, why it is critical, and the step-by-step chest compression technique to save a life."
                : "সিপিআর কী, কেন এবং কীভাবে সঠিকভাবে দিতে হয়? জীবন বাঁচানোর সহজ ও কার্যকরী ৬টি ধাপ জেনে নিন।"}
            </p>
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-all">
          <Navigation size={12} className="rotate-90" />
        </div>
      </motion.div>

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
            className="relative overflow-hidden group flex flex-col justify-between p-4 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl shadow-lg border border-red-500/20 hover:shadow-red-600/30 transition-all text-left"
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
            className="relative overflow-hidden group flex flex-col justify-between p-4 bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-2xl shadow-lg border border-orange-500/20 hover:shadow-orange-600/30 transition-all text-left"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-3xl flex flex-col justify-center items-center p-6 text-center text-white shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-rose-600 flex items-center justify-center animate-pulse shadow-2xl shadow-rose-600/50 mb-6 font-sans">
              <Phone size={32} className="text-white animate-bounce-slow" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">
              {language === 'en' ? "ESTABLISHING EMERGENCY DIAL..." : "জরুরি লিংক ডায়াল করা হচ্ছে..."}
            </span>
            <h2 className="text-3xl font-extrabold tracking-widest mt-2">{dialingNumber}</h2>
            <p className="text-xs opacity-60 mt-3 leading-relaxed max-w-[200px]">
              {language === 'en' ? "Simulating phone line audio. Make sure your device has carrier coverage." : "কলিং সিমুলার শুরু হয়েছে। আপনার সিম নেটওয়ার্ক পরীক্ষা নিশ্চিত করুন।"}
            </p>

            <button
              onClick={() => setDialingNumber(null)}
              className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs font-bold transition-all cursor-pointer"
            >
              {language === 'en' ? "Cancel Call" : "লাইন কেটে দিন"}
            </button>
          </div>
        </div>
      )}

      {/* CPR EMERGENCY PROTOCOL MODAL */}
      {showCprModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg h-[90vh] md:h-[750px] bg-slate-900 border border-slate-800 rounded-3xl flex flex-col overflow-hidden text-white shadow-2xl relative">
          {/* Header */}
          <div className="p-4 bg-[#0f1b3b] border-b border-rose-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40">
                <HeartPulse size={16} className="text-white animate-pulse" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-black tracking-tight text-white uppercase">
                  {language === 'en' ? "CPR Lifesaver Guide" : "জরুরি চিকিৎসা সেবা CPR"}
                </h3>
                <p className="text-[9px] opacity-60 font-mono">
                  {language === 'en' ? "Cardiopulmonary Resuscitation" : "কার্ডিওপালমোনারি রিসাসিটেশন গাইড"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCprModal(false)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              title="Close Guide"
            >
              <X size={15} />
            </button>
          </div>

          {/* Modal scrollable content body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin pb-24 text-left">
            
            {/* Urgent Alert Banner */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex gap-2.5 text-xs text-red-200">
              <Activity size={15} className="shrink-0 text-red-500 animate-pulse mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold block text-red-400">
                  {language === 'en' ? "CRITICAL OUTCOME:" : "জরুরি জীবন রক্ষা নির্দেশনা:"}
                </span>
                {language === 'en' 
                  ? "Every passing second counts. If someone is unresponsive and has stopped breathing normally, call emergency services (999/102) and start CPR immediately."
                  : "প্রতিটি সেকেন্ড মহামূল্যবান! আক্রান্ত ব্যক্তি সম্পূর্ণ অসাড় হলে এবং স্বাভাবিক শ্বাস না নিলে, দেরি না করে দ্রুত ৯৯৯/১০২ নম্বরে সহায়তার নির্দেশ দিয়ে অবিলম্বে CPR চালু করুন।"}
              </div>
            </div>

            {/* WHAT IS CPR */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                <span>⚡</span> {language === 'en' ? "What is CPR? (সিপিআর কী?)" : "সিপিআর (CPR) কী?"}
              </h4>
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 leading-relaxed text-xs space-y-2">
                <p className="text-slate-200">
                  {language === 'en' 
                    ? "CPR (Cardiopulmonary Resuscitation) is an emergency, hands-on lifesaving procedure performed when a person's heartbeat or breathing has stopped."
                    : "সিপিআর (CPR) এর পূর্ণরূপ হলো Cardiopulmonary Resuscitation। এটি একটি সহজ অথচ অত্যন্ত কার্যকর জরুরি প্রাথমিক চিকিৎসা পদ্ধতি, যা হৃদস্পন্দন ও শ্বাসক্রিয়া বন্ধ হওয়া রোগীকে মৃত্যুর হাত থেকে ফিরিয়ে আনতে হাত দিয়ে কৃত্রিম চাপ দিয়ে রক্ত চলাচল অব্যাহত রাখে।"}
                </p>
                <div className="pt-2 border-t border-slate-800/40 text-[11px] flex items-start gap-1.5 text-slate-400">
                  <span className="text-emerald-500 font-bold shrink-0">✔</span>
                  <span>
                    {language === 'en'
                      ? "It acts as a manual heart pump to maintain fresh oxygenated blood circulation to the brain."
                      : "এটি কৃত্রিম হৃদযন্ত্র হিসেবে কাজ করে মস্তিষ্কে অক্সিজেন সমৃদ্ধ রক্ত সরবরাহ সচল রাখে, যতক্ষণ না উন্নত চিকিৎসা বা অ্যাম্বুলেন্স পৌঁছায়।"}
                  </span>
                </div>
              </div>
            </div>

            {/* WHY CPR IS GIVEN */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                <span>⚡</span> {language === 'en' ? "Why is CPR Given? (কেন দিতে হয়?)" : "সিপিআর কেন দিতে হয়?"}
              </h4>
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs gap-3 space-y-3">
                <div className="flex gap-2.5">
                  <div className="w-6.5 h-6.5 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <Clock size={13} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-100 text-[11px]">
                      {language === 'en' ? "Avoid Brain Damage (মস্তিষ্কের মৃত্যু রোধ)" : "মস্তিষ্কের চিরস্থায়ী ক্ষতি রোধ করা"}
                    </h5>
                    <p className="opacity-75 leading-relaxed text-[10px] mt-0.5">
                      {language === 'en'
                        ? "Brain cells begin to die within 4 to 6 minutes of oxygen deprivation. Action keeps cells alive."
                        : "শ্বাস ও হৃদস্পন্দন বন্ধ হলে মাত্র ৪ থেকে ৬ মিনিটের মধ্যে মানুষের মূল্যবান মস্তিষ্কের কোষগুলো চিরতরে নষ্ট হতে শুরু করে। সিপিআর ওই অংশে রক্তপ্রবাহ সচল রাখে।"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2.5 border-t border-slate-800/40">
                  <div className="w-6.5 h-6.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle size={13} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-100 text-[11px]">
                      {language === 'en' ? "Multiplies Survival Rates" : "বেঁচে থাকার সম্ভাবনা ২ থেকে ৩ গুণ বাড়ায়"}
                    </h5>
                    <p className="opacity-75 leading-relaxed text-[10px] mt-0.5">
                      {language === 'en'
                        ? "Immediate CPR performed by trained or untrained bystanders can double or triple survival chances."
                        : "তৎক্ষণাৎ নেওয়া পদক্ষেপের মাধ্যমে রোগীর শরীরে রক্তের প্রবাহ বজায় রাখা যায়, যা রোগীকে পুনরায় সম্পূর্ণ সুস্থ জীবনে ফেরার সর্বোচ্চ সুযোগ করে দেয়।"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* HOW TO PERFORM CPR - 6 STEPS */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                <span>⚡</span> {language === 'en' ? "How to Perform CPR? (কীভাবে দিবেন)" : "কীভাবে সিপিআর দিতে হয়? (ধাপসমূহ)"}
              </h4>

              <div className="space-y-3">
                
                {/* Step 1 */}
                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ১
                  </span>
                  <div className="text-xs leading-relaxed">
                    <h5 className="font-extrabold text-slate-200">
                      {language === 'en' ? "Ensure Scene Safety" : "পারিপার্শ্বিক নিরাপত্তা নিশ্চিতকরণ"}
                    </h5>
                    <p className="opacity-75 text-[10px] mt-0.5">
                      {language === 'en'
                        ? "Make sure the environment is safe for you and the victim (no active electrical leak, fire, or toxic gas)."
                        : "রোগীর কাছে যাওয়ার পূর্বে চারপাশ বিদ্যুৎস্পৃষ্টতার তার, আগুন বা বিষাক্ত গ্যাস থেকে নিরাপদ কিনা তা নিশ্চিত করুন।"}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ২
                  </span>
                  <div className="text-xs leading-relaxed">
                    <h5 className="font-extrabold text-slate-200">
                      {language === 'en' ? "Check Response" : "ব্যক্তির সাড়া পরীক্ষা করুন"}
                    </h5>
                    <p className="opacity-75 text-[10px] mt-0.5">
                      {language === 'en'
                        ? "Tap the shoulder and shout 'Are you OK?'. If there is zero response or gasping, they are unresponsive."
                        : "আক্রান্ত ব্যক্তির কাঁধ ধরে ঝাকিয়ে জোরে মুখে জোরে ডাকুন 'আপনি কি শুনতে পাচ্ছেন?। সাড়া না দিলে বুঝতে হবে অজ্ঞান।"}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ৩
                  </span>
                  <div className="text-xs leading-relaxed">
                    <h5 className="font-extrabold text-slate-200">
                      {language === 'en' ? "Call for Backup & Dial 999" : "সাহায্যের জন্য চিৎকার করুন এবং ৯৯৯ ডায়াল করুন"}
                    </h5>
                    <p className="opacity-75 text-[10px] mt-0.5">
                      {language === 'en'
                        ? "Ask bystanders to call emergency lines immediately, request an ambulance, and get an AED machine."
                        : "কাউকে চিৎকার করে ডেকে ৯৯৯ বা ১০২ নম্বরে অ্যাম্বুলেন্সের জন্য কল দিতে বলুন। সাহায্যকারী একা হলে নিজেই কল দিয়ে লাউডস্পিকার অন রাখুন।"}
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ৪
                  </span>
                  <div className="text-xs leading-relaxed">
                    <h5 className="font-extrabold text-slate-200">
                      {language === 'en' ? "Check Breathing" : "শ্বাস-প্রশ্বাস পর্যবেক্ষণ"}
                    </h5>
                    <p className="opacity-75 text-[10px] mt-0.5">
                      {language === 'en'
                        ? "Quickly look at the chest movement for 5-10 seconds. If not breathing or only abnormal gasping, prepare compressions."
                        : "ব্যক্তির বুকের ওঠানামা ৫-১০ সেকেন্ডের জন্য পর্যবেক্ষণ করুন। স্বাভাবিক শ্বাস না থাকলে বুকের মাঝে হাত স্থাপন করতে ভুলবেন না।"}
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-3.5 bg-red-950/20 rounded-xl border border-red-500/40 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                    ৫
                  </span>
                  <div className="text-xs leading-relaxed w-full">
                    <h5 className="font-extrabold text-rose-300">
                      {language === 'en' ? "Perform Dynamic Chest Compressions" : "বুকের মাঝখানে জোরপূর্বক কৃত্রিম চাপ প্রদান"}
                    </h5>
                    <p className="opacity-90 text-[10px] mt-0.5 text-slate-200">
                      {language === 'en'
                        ? "Interlock both hands, place the heel on the lower half of the breastbone. Keep elbows locked straight, push hard and fast."
                        : "ব্যক্তির পিঠের নিচে শক্ত মেঝে রেখে, এক হাতের তালুর উপর অন্য হাত রেখে আঙুলগুলো ইন্টারলক করুন। বুকের একদম মাঝখানে রাখুন এবং কনুই সোজা রেখে অবিরত জোরে জোরে নিচে চাপ দিতে থাকুন।"}
                    </p>
                    
                    {/* Visual Compression Metrics Panel */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="bg-black/50 p-2 rounded-lg border border-slate-800">
                        <span className="text-[9px] text-rose-400 block font-bold leading-none uppercase">
                          {language === 'en' ? "COMPRESSION DEPTH" : "চাপের গভীরতা"}
                        </span>
                        <span className="text-[11px] font-mono text-white mt-1 block">
                          {language === 'en' ? "2 to 2.4 inches" : "২ থেকে ২.৪ ইঞ্চি"}
                        </span>
                      </div>
                      <div className="bg-black/50 p-2 rounded-lg border border-slate-800">
                        <span className="text-[9px] text-rose-400 block font-bold leading-none uppercase">
                          {language === 'en' ? "CHEST RATE SPEED" : "গতি বা ফ্রিকোয়েন্সি"}
                        </span>
                        <span className="text-[11px] font-mono text-white mt-1 block">
                          {language === 'en' ? "100 - 120 per min" : "১০০ - ১২০ বার প্রতি মি."}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ৬
                  </span>
                  <div className="text-xs leading-relaxed">
                    <h5 className="font-extrabold text-slate-200">
                      {language === 'en' ? "Rescue Breaths & Cycle (30:2)" : "কৃত্রিম শ্বাস ও পুনরাবৃত্তি"}
                    </h5>
                    <p className="opacity-75 text-[10px] mt-0.5">
                      {language === 'en'
                        ? "If trained: Tilt head back, lift chin, pinch nose, and deliver 2 rescue breaths. Repeat cycle of 30 compressions & 2 breaths. If untrained, do continuous hands-only CPR."
                        : "যদি প্রশিক্ষিত হন: থুতনি সামান্য ওপরে তুলে কপাল আলতো হেলিয়ে দিন। নাক চেপে মুখ দিয়ে রোগীকে ২ বার ফুঁ দিয়ে কৃত্রিম শ্বাস দিন। প্রতি ৩০ বার চাপ দেওয়ার পর ২ বার শ্বাস দিন। প্রশিক্ষিত না হলে শুধু বুক পাম্প করেই যান।"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Sticky Lower Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#0f1b3b] border-t border-rose-500/20 flex gap-2 z-10">
            <button
              onClick={() => setShowCprModal(false)}
              className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all cursor-pointer active:scale-98"
            >
              {language === 'en' ? "Dismiss, Return to Main Menu" : "আমি বুঝতে পেরেছি, ফিরে যান"}
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
