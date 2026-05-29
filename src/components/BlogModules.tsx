/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  HeartPulse,
  Scale,
  ShieldCheck,
  Users,
  Compass,
  CheckSquare,
  Square,
  ArrowRight,
  PhoneCall,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Clock,
  ShieldAlert,
  MapPin,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { Language, ScreenId } from '../types';
import { EN_TRANSLATIONS, BN_TRANSLATIONS } from '../data/translations';

interface BlogModulesProps {
  language: Language;
  screenId: ScreenId;
  theme: 'light' | 'dark';
}

export default function BlogModules({ language, screenId, theme }: BlogModulesProps) {
  const t = language === 'en' ? EN_TRANSLATIONS : BN_TRANSLATIONS;

  // Track checked items for Emergency Kit list locally so they stay live!
  const initialCheckedItems = [
    false, false, false, false, false, false, false, false, false
  ];
  const [checkedKitItems, setCheckedKitItems] = useState<boolean[]>(initialCheckedItems);

  const toggleKitItem = (index: number) => {
    const updated = [...checkedKitItems];
    updated[index] = !updated[index];
    setCheckedKitItems(updated);
  };

  // Helper renderers for each blog category
  const renderFireSafety = () => {
    const tips = [
      t.fireTip1, t.fireTip2, t.fireTip3, t.fireTip4, t.fireTip5,
      t.fireTip6, t.fireTip7, t.fireTip8, t.fireTip9, t.fireTip10
    ];

    return (
      <div className="space-y-6">
        {/* Hero banner */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-red-550 to-orange-600 text-white shadow-lg overflow-hidden">
          <div className="absolute right-[-10px] bottom-[-10px] opacity-15 pointer-events-none">
            <Flame size={120} />
          </div>
          <span className="text-[10px] tracking-widest font-mono uppercase bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
            {language === 'en' ? "PREVENTION DRILL" : "প্রতিরোধ প্রস্তুতি গাইড"}
          </span>
          <h3 className="text-lg font-extrabold tracking-tight mt-2">{t.fireSafetyTitle}</h3>
          <p className="text-xs opacity-90 mt-1.5 leading-relaxed">
            {language === 'en' 
              ? "Comprehensive guidelines designed to secure households against LPG cylinders and electric hazards."
              : "বাসাবাড়িতে এলপিজি গ্যাস বিস্ফোরণ এবং শর্ট সার্কিট আগুন এড়ানোর চূড়ান্ত নিরাপত্তা সেল।"}
          </p>
        </div>

        {/* 10 Important Tips Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase flex items-center gap-1.5">
            <CheckCircle size={14} className="text-rose-500" />
            {t.firePrevTitle}
          </h4>

          <div className="space-y-2.5">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex gap-3 text-xs leading-relaxed transition-all ${
                  theme === 'dark' 
                    ? 'bg-[#0f1b3b] border-slate-800 text-slate-200' 
                    : 'bg-white border-slate-100 shadow-xs text-slate-700'
                }`}
              >
                <span className="font-mono font-bold text-rose-500 text-sm shrink-0 w-5">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections with Beautiful Cards */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
            {language === 'en' ? "SITUATIONAL GUIDELINES" : "পরিস্থিতি ভিত্তিক নির্দেশিকা"}
          </h4>

          {/* Causes of Fire */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            theme === 'dark' ? 'bg-[#0f1b3b]/60 border-slate-800' : 'bg-rose-50/50 border-rose-100/60'
          }`}>
            <h5 className="text-xs font-bold text-rose-500 uppercase flex items-center gap-1.5">
              <AlertTriangle size={13} /> {t.fireCauses}
            </h5>
            <ul className="text-xs space-y-1.5 list-disc pl-4 opacity-80 leading-relaxed">
              <li>{language === 'en' ? "Faulty insulated electric wiring and loose connection sparks." : "ক্ষতিগ্রস্ত বা নিম্নমানের বৈদ্যুতিক তার এবং আলগা সংযোগের স্ফুলিঙ্গ।"}</li>
              <li>{language === 'en' ? "LPG Gas Regulator leaks and cylinder exposure to high temperature." : "এলপিজি গ্যাস রেগুলেটরের ত্রুটিপুর্ণ ভালভ ও চুলা থেকে লিকেজ।"}</li>
              <li>{language === 'en' ? "Unattended candles, matches, and cigarettes thrown near fabrics." : "মোমবাতি, মশার ক্যাপ বা দেশলাই তামাক আসবাবপত্রের কাছে অরক্ষিত রাখা।"}</li>
            </ul>
          </div>

          {/* LPG cylinder safety precautions */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            theme === 'dark' ? 'bg-[#0f1b3b]/60 border-slate-800' : 'bg-orange-50/40 border-orange-100'
          }`}>
            <h4 className="text-xs font-bold text-orange-500 uppercase flex items-center gap-1.5">
              <Lightbulb size={13} /> {t.lpgSafety}
            </h4>
            <p className="text-xs leading-relaxed opacity-85">
              {language === 'en'
                ? "Never check burner gas leaks with fire. Use soapy liquid foam water over pipe joints. Keep ventilation windows completely open before lighting matches."
                : "জ্বলন্ত কাঠি দিয়ে কস্মিনকালেও সিলিন্ডার পরীক্ষা করবেন না। সাবানযুক্ত ফেনার পানি সংযোগস্থলে দিন। চুলা জ্বালানোর আগে ঘরের সকল দরজা-জানালা খুলে রাখুন।"}
            </p>
          </div>

          {/* Extinguisher instruction PASS */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            theme === 'dark' ? 'bg-[#0f1b3b]/60 border-slate-850' : 'bg-slate-50 border-slate-100'
          }`}>
            <h4 className="text-xs font-bold text-blue-500 uppercase flex items-center gap-1.5">
              <ShieldAlert size={14} /> {t.extinguisherUsage}
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
              <div className="p-2 rounded-xl bg-red-500/15 text-red-500">
                <span className="block text-sm font-extrabold font-mono">P</span>
                Pull Pin
              </div>
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500">
                <span className="block text-sm font-extrabold font-mono">A</span>
                Aim Base
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-500">
                <span className="block text-sm font-extrabold font-mono">S</span>
                Squeeze
              </div>
              <div className="p-2 rounded-xl bg-blue-500/15 text-blue-500">
                <span className="block text-sm font-extrabold font-mono">S</span>
                Sweep Side
              </div>
            </div>
            <p className="text-[11px] leading-relaxed opacity-75">
              {language === 'en'
                ? "Aim at the base of the fire, not the flames. Stand 6-8 feet away and spray horizontally."
                : "আগুনের শিখায় নয়, আগুনের মূল উপাদানের তলদেশে টিপ করে ধরুন। ৬-৮ ফুট দূরত্ব বজায় রেখে স্প্রে করুন।"}
            </p>
          </div>

          {/* Children and building evacuation drills */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-[#0e162f] border-slate-800' : 'bg-white border-slate-150'}`}>
              <h5 className="text-[11px] font-bold text-red-500 uppercase">{t.kitchenSafety}</h5>
              <p className="text-[10px] opacity-75 mt-1 leading-relaxed">
                {language === 'en' ? "Keep paper towels, plastic packages, and oil jars at least 3 feet from stove range." : "কাগজের কার্টন, প্লাস্টিক ব্যাগ এবং তেলের পাত্র চুলা থেকে অন্তত ৩ ফুট দূরে সরিয়ে রাখুন।"}
              </p>
            </div>
            <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-[#0e162f] border-slate-800' : 'bg-white border-slate-150'}`}>
              <h5 className="text-[11px] font-bold text-amber-500 uppercase">{language === 'en' ? "Child evacuation" : "শিশুর সুরক্ষা"}</h5>
              <p className="text-[10px] opacity-75 mt-1 leading-relaxed">
                {language === 'en' ? "Teach toddlers to Crawl Low under thick smoke clouds and cover nostrils." : "শিশুদের ধোঁয়া থাকলে হাত-পা গুটিয়ে নিচু হয়ে হামাগুড়ি দিয়ে নাক ঢেকে বের হওয়ার শিক্ষা দিন।"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMedicalCare = () => {
    return (
      <div className="space-y-5">
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-emerald-555 to-teal-700 text-white shadow-lg overflow-hidden font-sans">
          <span className="text-[10px] tracking-widest font-mono uppercase bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
            {language === 'en' ? "EMERGENCY MEDICS" : "প্রাথমিক স্বাস্থ্য নির্দেশিকা"}
          </span>
          <h3 className="text-lg font-extrabold mt-2">{t.medicalCareTitle}</h3>
          <p className="text-xs opacity-90 mt-1">
            {language === 'en'
              ? "Essential protocols for Cardiac Arrest, severe accidents, Heat stroke risk control."
              : "হার্ট অ্যাটাক, তিব্র রোদ এবং ডেঙ্গু জ্বরে ঘরোয়া উপায়ে জীবনরক্ষাকারী তাত্ক্ষণিক ব্যবস্থার বিশ্লেষণ।"}
          </p>
        </div>

        {/* CPR Instruction card */}
        <div className={`p-4 rounded-xl border space-y-3.5 ${
          theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-teal-50/30 border-teal-100 shadow-xs'
        }`}>
          <h4 className="text-xs font-bold text-teal-600 uppercase flex items-center gap-1.5">
            <HeartPulse size={14} /> {t.cprHeader}
          </h4>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
            {t.cprSteps}
          </p>
          <div className="p-3 bg-red-500/10 rounded-xl flex items-center gap-3">
            <span className="text-2xl animate-pulse">⏰</span>
            <span className="text-[11px] text-red-500 font-medium">
              {language === 'en' ? "Every second counts. CPR maintains vital blood supply to brain structures." : "মনে রাখবেন, প্রতি সেকেন্ড মূল্যবান। ব্রেইন সেলকে সক্রিয় রাখতে সাহায্য করে।"}
            </span>
          </div>
        </div>

        {/* First aid checklist */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <h4 className="text-xs font-bold text-[#475569] dark:text-slate-300 uppercase">
            {t.firstAidHeader}
          </h4>
          <ul className="space-y-2 text-xs">
            {[t.firstAid1, t.firstAid2, t.firstAid3, t.firstAid4].map((item, idx) => (
              <li key={idx} className="flex gap-2 text-slate-700 dark:text-slate-300">
                <ChevronRight size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dengue & Heat Stroke */}
        <div className="grid grid-cols-1 gap-4">
          <div className={`p-4 rounded-xl border space-y-1.5 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100'}`}>
            <h4 className="text-xs font-bold text-amber-500 uppercase flex items-center gap-1.5">
              ⚠️ {t.dengueTitle}
            </h4>
            <p className="text-xs opacity-85 leading-relaxed">
              {t.dengueTips}
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100'}`}>
            <h4 className="text-xs font-bold text-orange-500 uppercase flex items-center gap-1.5">
              ☀️ {t.heatStrokeTitle}
            </h4>
            <p className="text-xs opacity-85 leading-relaxed">
              {t.heatStrokeTips}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderLegalAssistance = () => {
    return (
      <div className="space-y-5">
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-indigo-650 to-blue-750 text-white shadow-lg overflow-hidden">
          <span className="text-[10px] tracking-widest font-mono uppercase bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
            {language === 'en' ? "CITATIVE ASSIST" : "আইনি অধিকার সংরক্ষণ"}
          </span>
          <h3 className="text-lg font-extrabold mt-2">{t.legalTitle}</h3>
          <p className="text-xs opacity-90 mt-1">
            {language === 'en'
              ? "Draft GD easily, secure bank frauds, and learn citizen protection rights."
              : "সহজে থানা জিডির খসড়া করুন, বিকাশ/ব্যাংক অ্যাকাউন্ট জালিয়াতি এবং অধিকার সম্পর্কে জানুন।"}
          </p>
        </div>

        {/* Step-by-step GD Filing */}
        <div className={`p-4 rounded-2xl border space-y-3.5 ${
          theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
        }`}>
          <h4 className="text-xs font-bold text-indigo-500 uppercase flex items-center gap-1.5">
            📝 {t.gdFilingTitle}
          </h4>
          <p className="text-xs leading-relaxed opacity-85">
            {t.gdSteps}
          </p>
        </div>

        {/* Online Fraud and Cyber crime */}
        <div className="grid grid-cols-1 gap-4">
          <div className={`p-4 rounded-xl border space-y-1.5 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-150'}`}>
            <h4 className="text-xs font-bold text-red-505 uppercase">💻 {t.cyberCrimeTitle}</h4>
            <p className="text-xs opacity-75 leading-relaxed">
              {language === 'en'
                ? "If defamed or threatened on WhatsApp/Facebook, save clear screenshots of target accounts immediately, download links, and submit a secure complaint through official BD Digital Security Cell."
                : "ফেসবুক বা হোয়াটস্যাপে হেনস্থা বা হয়রানির শিকার হলে সংশ্লিষ্ট আইডির স্ক্রিনশট ও প্রোফাইল লিংক সংগ্রহ করুন। নিরাপদ ডিজিটাল অভিযোগ জানাতে পুলিশ হেডকোয়ার্টারে মেইল করুন।"}
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-150'}`}>
            <h4 className="text-xs font-bold text-indigo-550 uppercase">🛍️ {t.consumerRights}</h4>
            <p className="text-xs opacity-75 leading-relaxed">
              {language === 'en'
                ? "Every customer has rights against adulteration, fake weight scaling, and overpricing. Log secure complain details direct with the National Consumer Rights Department."
                : "ভেজাল সামগ্রী, ওজনে কারচুপি ও অতিরিক্ত মূল্যে জিনিস বিক্রয়ের বিরুদ্ধে প্রতি নাগরিকের জাতীয় অধিকার রয়েছে। জাতীয় ভোক্তা অধিকার অধিদপ্তরে সহজে ফোন বা মেইলে নালিশ জানান।"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderDisasterManagement = () => {
    return (
      <div className="space-y-5">
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-750 text-white shadow-lg overflow-hidden">
          <span className="text-[10px] tracking-widest font-mono uppercase bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
            {language === 'en' ? "NATURAL THREAT CONTROL" : "প্রাকৃতিক দুর্যোগ সুরক্ষা"}
          </span>
          <h3 className="text-lg font-extrabold mt-2">{t.disasterTitle}</h3>
          <p className="text-xs opacity-90 mt-1">
            {language === 'en'
              ? "Critical guidance for major earthquakes, cyclonic rainfalls, and regional safe shelters."
              : "ভূমিকম্প, তীব্র বন্যা ও ঘূর্ণিঝড়ের সময় সুরক্ষিত অবস্থায় জীবনরক্ষামূলক নিরাপদ গাইডলাইন।"}
          </p>
        </div>

        {/* Drop Cover Hold Earthquake */}
        <div className={`p-4 rounded-2xl border space-y-3.5 ${
          theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-amber-50/20 border-amber-100'
        }`}>
          <h4 className="text-xs font-bold text-amber-550 uppercase flex items-center gap-1.5">
            🫨 {t.earthquakeTitle}
          </h4>
          <p className="text-xs leading-relaxed font-medium">
            {t.earthquakeDrop}
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
            <div className="p-2 border rounded-xl bg-orange-500/10 border-orange-500/30 text-orange-500">
              DROP DOWN
            </div>
            <div className="p-2 border rounded-xl bg-amber-500/10 border-amber-500/30 text-amber-550">
              TAKE COVER
            </div>
            <div className="p-2 border rounded-xl bg-blue-500/10 border-blue-500/30 text-blue-500">
              HOLD ON
            </div>
          </div>
        </div>

        {/* Flood check and Storm alerts */}
        <div className="grid grid-cols-1 gap-4">
          <div className={`p-4 rounded-xl border space-y-2 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100'}`}>
            <h4 className="text-xs font-bold text-blue-500 uppercase flex items-center gap-1.5">
              🌊 {t.floodTitle}
            </h4>
            <p className="text-xs opacity-85 leading-relaxed">
              {t.floodHealth}
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-2 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100'}`}>
            <h4 className="text-xs font-bold text-cyan-600 uppercase flex items-center gap-1.5">
              🌪️ {t.stormPrep}
            </h4>
            <p className="text-xs opacity-85 leading-relaxed">
              {language === 'en'
                ? "Secure window locks, recharge flashlights and mobile powerbanks immediately, preserve dried food, and move cattle to highland shelters immediately upon signal 8."
                : "ঘরের জানালা সাবধানে বন্ধ করুন, টর্চ লাইট ও পাওয়ার ব্যাংক চার্জ রাখুন, শুকনো খাবারের বন্দোবস্ত রাখুন এবং সংকেত মহাবিপদ সংকেত ৮ এ গেলেই পরিবার নিয়ে আশ্রয়কেন্দ্রে যান।"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderWomenChildSafety = () => {
    return (
      <div className="space-y-5">
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-700 text-white shadow-lg overflow-hidden">
          <span className="text-[10px] tracking-widest font-mono uppercase bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
            {language === 'en' ? "RAPID PROTECTION" : "সুরক্ষা ও আইনি সাহায্য"}
          </span>
          <h3 className="text-lg font-extrabold mt-2">{t.womenChildTitle}</h3>
          <p className="text-xs opacity-90 mt-1">
            {language === 'en'
              ? "Immediate helplines 109 & 1098, protection laws and instant advice."
              : "নারী ও শিশু নির্যাতন দমন ট্রাইব্যুনাল বিল, ১০৯ এবং ১০৯৮ হটলাইন সহায়তার তাত্ক্ষণিক গাইড।"}
          </p>
        </div>

        {/* Hotlines Dial buttons */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-4 rounded-2xl border text-center space-y-2 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-pink-50/15 border-pink-100 shadow-xs'}`}>
            <span className="text-xs uppercase font-bold text-pink-500 font-mono tracking-wide">Women Help</span>
            <h4 className="text-2xl font-black text-pink-600">109</h4>
            <p className="text-[10px] opacity-70">{t.womenHelpline}</p>
          </div>

          <div className={`p-4 rounded-2xl border text-center space-y-2 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-fuchsia-50/15 border-fuchsia-100 shadow-xs'}`}>
            <span className="text-xs uppercase font-bold text-fuchsia-500 font-mono tracking-wide">Child Support</span>
            <h4 className="text-2xl font-black text-fuchsia-600">1098</h4>
            <p className="text-[10px] opacity-70">{t.childHelpline}</p>
          </div>
        </div>

        {/* Legal Protections summary */}
        <div className={`p-4 rounded-xl border space-y-3 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-850' : 'bg-white border-slate-100'}`}>
          <h4 className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase flex items-center gap-1.5">
            ⚖️ Legal Framework & Rights
          </h4>
          <p className="text-xs leading-relaxed opacity-85">
            {t.safetyLawsInfo}
          </p>
          <div className="p-3 rounded-xl bg-pink-500/10 text-pink-600 text-xs">
            {language === 'en'
              ? "All citizens can file complaints confidentially. National emergency networks offer free legal state counsel."
              : "যেকোনো নাগরিক সম্পূর্ণ গোপনে থানায় আইনি অভিযোগ ফাইল করতে পারেন। জেলা লিগ্যাল এইড কমিটির আওতায় যেকোনো অসহায় নারী সম্পূর্ণ বিনামূল্যে সরকারি আইনজীবী পাবেন।"}
          </div>
        </div>
      </div>
    );
  };

  const renderEmergencyPrep = () => {
    const listItems = t.prepKitItems;

    return (
      <div className="space-y-5">
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-700 text-white shadow-lg overflow-hidden">
          <span className="text-[10px] tracking-widest font-mono uppercase bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
            {language === 'en' ? "GO-BAG KIT" : "দুর্যোগকালীন জরুরি ব্যাগ গাইড"}
          </span>
          <h3 className="text-lg font-extrabold mt-2">{t.emergencyPrepTitle}</h3>
          <p className="text-xs opacity-90 mt-1">
            {language === 'en'
              ? "Your 72-hour survival bag setup checkoff module."
              : "দুর্যোগের শুরুতে যেকোনো মুহূর্তে সহজে বাড়ি ছাড়তে ৭২ ঘণ্টার গো-ব্যাগের ডিজিটাল চেকলিস্ট।"}
          </p>
        </div>

        {/* Checkable List Component */}
        <div className={`p-4 rounded-2xl border space-y-4 ${
          theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
        }`}>
          <div className="flex items-center justify-between border-b pb-2 mb-2 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase">
              {t.prepKitItemsLabel}
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold">
              {checkedKitItems.filter(Boolean).length} / {listItems.length} packed
            </span>
          </div>

          <div className="space-y-2.5">
            {listItems.map((item, index) => {
              const isChecked = checkedKitItems[index];
              return (
                <button
                  key={index}
                  onClick={() => toggleKitItem(index)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                      : theme === 'dark'
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100'
                  }`}
                  id={`go-bag-item-${index}`}
                >
                  <span className="truncate pr-4">{item}</span>
                  <div>
                    {isChecked ? (
                      <CheckSquare size={16} className="text-amber-500 shrink-0" />
                    ) : (
                      <Square size={16} className="text-slate-400 shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Go back tips */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <HelpCircle size={20} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-[11px] leading-relaxed opacity-75">
            {language === 'en'
              ? "Keep your Go-Bag placed high up, close to the main household exits. Teach each memory-capable child the backpack's designated spot."
              : "আপনার ব্যাগের ওজন ১০ কেজির নিচে রাখুন। বাড়ির প্রধান বহির্গমন দরজার কাছে উচু ও দৃশ্যমান বুকশেলফে এটি স্থাপন করুন যাতে অন্ধকারের মধ্যেও সহজে ব্যাগটি তুলে নেওয়া যায়।"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 pb-12 max-w-full">
      {screenId === 'fire-safety' && renderFireSafety()}
      {screenId === 'medical-care' && renderMedicalCare()}
      {screenId === 'legal-assistance' && renderLegalAssistance()}
      {screenId === 'disaster-management' && renderDisasterManagement()}
      {screenId === 'women-child-safety' && renderWomenChildSafety()}
      {screenId === 'emergency-prep' && renderEmergencyPrep()}
    </div>
  );
}
