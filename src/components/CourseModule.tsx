/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ArrowLeft, 
  DollarSign, 
  MessageSquare, 
  Briefcase, 
  Award, 
  Clock, 
  CheckCircle, 
  ChevronRight,
  Sparkles,
  Phone,
  Search
} from 'lucide-react';
import { Language } from '../types';

interface Course {
  id: string;
  titleEn: string;
  titleBn: string;
  categoryEn: string;
  categoryBn: string;
  durationEn: string;
  durationBn: string;
  descEn: string;
  descBn: string;
  incomeEn: string;
  incomeBn: string;
  howToEarnEn: string;
  howToEarnBn: string;
  learnEn: string[];
  learnBn: string[];
  color: string;
}

interface CourseModuleProps {
  language: Language;
  theme: 'light' | 'dark';
  onBack: () => void;
}

const COURSES: Course[] = [
  {
    id: 'react-web',
    titleEn: 'Professional Web Development with React',
    titleBn: 'প্রফেশনাল ওয়েব ডেভেলপমেন্ট (React JS)',
    categoryEn: 'Software Development',
    categoryBn: 'সফটওয়্যার ডেভেলপমেন্ট',
    durationEn: '4 Months (60+ Lectures)',
    durationBn: '৪ মাস (৬০+ লেকচার)',
    descEn: 'Master React.js, Tailwind CSS, JavaScript ES6, and modern state managers to build lightning fast, production-ready enterprise websites.',
    descBn: 'এইচটিএমএল, সিএসএস, আধুনিক জাভাস্ক্রিপ্ট (ES6) এবং রিয়্যাক্ট জেএস ফ্রেমওয়ার্ক শিখে রিয়েল-ওয়ার্ল্ড ওয়েব অ্যাপ্লিকেশন তৈরির সম্পূর্ণ প্রফেশনাল কোর্স।',
    incomeEn: '⭐⭐ BDT 15,000 to 50,000+ per month (Freelancing or Remote / Local Software firms)',
    incomeBn: '⭐⭐ প্রতি মাসে ১৫,০০০ থেকে ৫০,০০০+ টাকা পর্যন্ত (ফাইলান্সিং বা রিমোট/লোকাল সফটওয়্যার ফার্মে চাকরি)',
    howToEarnEn: 'Work as a front-end React developer on international platforms like Upwork, Fiverr, and Freelancer. Build client portals or land junior developer jobs in local software companies.',
    howToEarnBn: 'Upwork, Fiverr বা Freelancer-এ ফ্রন্ট-এন্ড ডেভেলপার হিসেবে কাজ করুন। তাছাড়া লোকাল আইটি প্রতিষ্ঠানগুলোতে জুনিয়র রিয়্যাক্ট ডেভেলপার হিসেবে ভালো বেতনে চাকুরি সম্ভব।',
    learnEn: [
      'HTML5, Tailwind CSS, & Responsive Web Design',
      'JavaScript ES6+ and Asynchronous API Integrations',
      'React Hooks, Router, and Context State Engine',
      'Deploying apps to Cloud and GitHub portfolio tuning'
    ],
    learnBn: [
      'HTML5, Tailwind CSS এবং রেসপনসিভ ওয়েব ডিজাইন',
      'জাভাস্ক্রিপ্ট ES6+ এবং এপিআই (API) ইন্টিগ্রেশন',
      'রিয়্যাক্ট হুকস, রাউটার এবং স্টেট ম্যানেজমেন্ট',
      'ক্লাউডে প্রজেক্ট ডিপ্লয় এবং গিটহাব পোর্টফোলিও তৈরি'
    ],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'flutter-app',
    titleEn: 'Cross-Platform Mobile App Development with Flutter',
    titleBn: 'মোবাইল অ্যাপ ডেভেলপমেন্ট (Flutter & Dart)',
    categoryEn: 'App Development',
    categoryBn: 'অ্যাপ ডেভেলপমেন্ট',
    durationEn: '4.5 Months (70+ Lectures)',
    durationBn: '৪.৫ মাস (৭০+ লেকচার)',
    descEn: 'Build highly interactive, smooth native Android and iOS applications from a single codebase using Flutter and Dart.',
    descBn: 'ফ্লাটার ও ডার্ট প্রোগ্রামিং ল্যাঙ্গুয়েজ ব্যবহার করে একটিমাত্র কোডবেস দিয়ে আকর্ষণীয় ও দ্রুতগতির অ্যান্ড্রোয়েড এবং আইওএস (iOS) অ্যাপ তৈরি শিখুন।',
    incomeEn: '⭐⭐ BDT 20,000 to 60,000+ per month (International clients, Ad revenue & Local Remote jobs)',
    incomeBn: '⭐⭐ প্রতি মাসে ২০,০০০ থেকে ৬০,০০০+ টাকা পর্যন্ত (আন্তর্জাতিক ক্লায়েন্ট, গুগল অ্যাডমব রেভিনিউ এবং জব)',
    howToEarnEn: 'Submit your custom developed Apps to Google Play Store & Apple App Store to earn through advertisements (Google AdMob) or in-app purchases. Secure freelance contracts globally on Upwork and Guru.',
    howToEarnBn: 'নিজের তৈরি করা অ্যাপ গুগল প্লে স্টোর ও অ্যাপল অ্যাপ স্টোরে আপলোড করে গুগল অ্যাডমব বিজ্ঞাপনের মাধ্যমে বা সাবস্ক্রিপশনে প্যাসিভ ইনকাম করুন। এছাড়াও ফ্রিল্যান্সিং সাইটে প্রচুর অ্যাপ প্রজেক্ট বরাদ্দ থাকে।',
    learnEn: [
      'Dart Programming Basics to Advanced OOP',
      'Flutter UI Architecture & Flutter Material widgets',
      'Shared Preferences & SQLite Local Databases',
      'Firebase Push Notifications & API Syncing'
    ],
    learnBn: [
      'ডার্ট প্রোগ্রামিং বেসিক থেকে অ্যাডভান্সড ওওপি (OOP)',
      'ফ্লাটার ইউআই আর্কিটেকচার ও কাস্টম উইজেটস',
      'লোকাল ডেটাবেস স্টোরেজ ও ফাইল ম্যানেজমেন্ট',
      'ফায়ারবেস পুশ নোটিফিকেশন এবং এপিআই সিনক্রোনাইজেশন'
    ],
    color: 'from-teal-500 to-emerald-600'
  },
  {
    id: 'ui-ux',
    titleEn: 'Professional UI/UX Design & Interaction Wireframing',
    titleBn: 'ইউআই/ইউএক্স ডিজাইন (Figma wireframing)',
    categoryEn: 'Design & Creative',
    categoryBn: 'ডিজাইন ও ক্রিয়েটিভ',
    durationEn: '3 Months (45+ Lectures)',
    durationBn: '৩ মাস (৪৫+ লেকচার)',
    descEn: 'Design clean visual structures and layout paths. Learn User Research, Wireframing, High-fidelity UI layouts, Prototypes and Mockups with Figma.',
    descBn: 'ইউজার রিসার্চ, ওয়্যারফ্রেমিং, ফিগমা টুলস, কালার থিওরি এবং প্রোটোটাইপিং শিখে প্রফেশনাল মোবাইল ও ওয়েব ডিজাইন ক্যারিয়ার শুরু করুন।',
    incomeEn: '⭐⭐ BDT 10,000 to 40,000+ per month (Selling UI Kits, Freelance orders on Fiverr/Dribbble)',
    incomeBn: '⭐⭐ প্রতি মাসে ১০,০০০ থেকে ৪০,০০০+ টাকা পর্যন্ত (ইউআই কিটস বিক্রি এবং ফাইভার/ড্রিবল ফ্রিল্যান্সিং)',
    howToEarnEn: 'Publish your designs on Dribbble and Behance to attract high-paying US/EU clients. Create and sell premium UI dashboard kits on UI8, Creative Market, or ThemeForest.',
    howToEarnBn: 'Dribbble ও Behance-এ কাজের পোর্টফোলিও শেয়ার করে সরাসরি বায়ারদের আকর্ষিত করুন। এছাড়া তৈরি করা ইউআই কিটস ও ড্যাশবোর্ড টেমপ্লেট বিভিন্ন মার্কেটে সেল করে আজীবন আয় নিশ্চিত করুন।',
    learnEn: [
      'Figma Tools, Auto-Layout, and Component Libraries',
      'UX Research, User Persona, and Journey Mapping',
      'Color Harmonies, Typography hierarchy styles',
      'Interactive Prototyping & Client hand-off frameworks'
    ],
    learnBn: [
      'ফিগমা টুলস, অটো-লেআউট এবং কম্পোনেন্ট লাইব্রেরি',
      'ইউএক্স গবেষণা, ইউজার পারসোনা এবং জার্নি ম্যাপিং',
      'কালার হারমনি, সাইকোলজি এবং টাইপোগ্রাফি হায়ারার্কি',
      'ইন্টারঅ্যাক্টিভ প্রোটোটাইপ ও ডেভেলপার হ্যান্ডঅফ সিস্টেম'
    ],
    color: 'from-pink-500 to-fuchsia-600'
  },
  {
    id: 'digital-marketing',
    titleEn: 'Digital Marketing, SEO & Global Marketplace Freelancing',
    titleBn: 'ডিজিটাল মার্কেটিং ও ফ্রিল্যান্সিং গাইডলাইন',
    categoryEn: 'Marketing & Business',
    categoryBn: 'মার্কেটিং ও বিজনেস',
    durationEn: '3 Months (40+ Lectures)',
    durationBn: '৩ মাস (৪০+ লেকচার)',
    descEn: 'Master Advanced Search Engine Optimization (SEO), Facebook/Google Ads Manager, Content Strategy, and high-converting marketing campaigns.',
    descBn: 'সার্চ ইঞ্জিন অপটিমাইজেশন (SEO), ফেইসবুক/গুগল ডাইনামিক বিজ্ঞাপন, সোশ্যাল মিডিয়া ব্র্যান্ডিং এবং কপিরাইটিং শিখে যেকোনো ব্যবসার পরিধি কয়েকগুণ বাড়ান।',
    incomeEn: '⭐⭐ BDT 12,000 to 35,000+ per month (Agency services, SEO Auditing & Social Media orders)',
    incomeBn: '⭐⭐ প্রতি মাসে ১২,০০০ থেকে ৩৫,০০০+ টাকা পর্যন্ত (মার্কেটিং এজেন্সি জব, এসইও অডিট এবং লোকাল ডিল)',
    howToEarnEn: 'Provide social media page setup and campaign management to local retail merchants, run paid ads for global brands on Facebook, and optimize online store rankings with specialized SEO audits.',
    howToEarnBn: 'বিভিন্ন লোকাল ও ইন্টারন্যাশনাল ব্র্যান্ডের ফেইসবুক পেজ বুস্টিং ও ক্যাম্পেইন পরিচালনা করুন। তাছাড়া বায়ারদের ওয়েবসাইটে গুগল রাঙ্কিং এনে দিয়ে মোটা অঙ্কের পেমেন্ট চার্জ করতে পারেন।',
    learnEn: [
      'On-Page & Off-Page SEO Optimization',
      'Facebook Pixel & Google Ads Ads Manager dashboards',
      'Social Media management, Content calendars',
      'Fiverr & Upwork account setup strategies for fast orders'
    ],
    learnBn: [
      'অন-পেজ এবং অফ-পেজ এসইও (SEO) অপটিমাইজেশন',
      'ফেইসবুক পিক্সেল সেটআপ এবং গুগল বিজ্ঞাপন ম্যানেজার',
      'সোশ্যাল মিডিয়া ম্যানেজমেন্ট ও কন্টেন্ট ক্যালেন্ডার ডিজাইন',
      'ফাইভার ও আপওয়ার্ক একাউন্ট তৈরি এবং প্রথম কাজ পাওয়ার সুনির্দিষ্ট ট্রিকস'
    ],
    color: 'from-cyan-500 to-sky-600'
  },
  {
    id: 'cpa-marketing',
    titleEn: 'Comprehensive CPA Marketing Mastery',
    titleBn: 'কম্প্রহেন্সিভ সিপিএ মার্কেটিং (CPA Marketing)',
    categoryEn: 'Affiliate Marketing',
    categoryBn: 'অ্যাফিলিয়েট ও সিপিএ মার্কেটিং',
    durationEn: '3 Months (40+ Lectures)',
    durationBn: '৩ মাস (৪০+ লেকচার)',
    descEn: 'CPA (Cost Per Action) Marketing is one of the easiest and fastest pathways to earn online. Learn how to generate consistent dollar commissions without selling any product—simply by driving user actions like Email Submits, App Installs, Sign-ups, or Form Submissions.',
    descBn: 'সিপিএ (Cost Per Action) মার্কেটিং হচ্ছে অনলাইন আয়ের অন্যতম সহজ ও দ্রুততম উপায়। এই কোর্সে কোনো প্রোডাক্ট বিক্রি ছাড়াই শুধুমাত্র ইমেইল সাবমিট, অ্যাপস ইনস্টল, সাইন-আপ বা লিড জেনারেশনের মাধ্যমে ডলার ইনকাম করার এ টু জেড সিক্রেট মেথড এবং লাইভ প্রজেক্ট দেখানো হয়েছে।',
    incomeEn: '⭐⭐ BDT 15,000 to 50,050+ equivalent dollars per month. Experienced students easily scale this up further using our highly converting organic traffic formula.',
    incomeBn: '⭐⭐ প্রতি মাসে ১৫,০০০ থেকে শুরু করে প্রথম ১-২ মাসেই ৫০,০০০+ টাকা বা তার বেশি মূল্যের ডলার (CPA Commission) অর্জন সম্ভব। সঠিক ট্রাফিক সোর্স এবং আমাদের স্পেশাল ফ্রি ও পেইড সোশ্যাল মিডিয়া গাইডলাইন ঠিকমতো অনুসরণ করলে ইনকাম নিশ্চিত।',
    howToEarnEn: '1. Pick high-payout offers (like Gift Cards, Games, iOS Apps or Gadget Giveaways) from leading approved platforms like CPAgrip, MaxBounty, CPALead or OGAds.\n2. Create a visually striking landing page with responsive lead capture or content lockers to protect premium resources.\n3. Implement targeted organic traffic campaigns on Pinterest, Reddit, TikTok and Quora or launch optimized paid search campaigns targeting USA/UK/Canada tier-1 audiences. Earn $1.50 to $12.00+ immediately for every single action submitted by users!',
    howToEarnBn: '১. গ্লোবাল সিপিএ নেটওয়ার্ক (যেমন CPAgrip, CPALead, MaxBounty, OGAds, AdWorkMedia) থেকে আকর্ষণীয় অফার (যেমন: ওয়ালামার্ট ফ্রি গিফট কার্ড, গেমস ডাউনলোড, আইফোন গিভঅ্যাওয়ে বা কুপন অফার) নির্বাচন করবেন।\n২. আমাদের স্পেশাল মেথড অনুযায়ী একটি আকর্ষণীয় ও মোবাইল ফ্রেন্ডলি ওয়ান-পেইজ ল্যান্ডিং পেইজ (Landing Page) এবং কন্টেন্ট লকার বিল্ডআপ করবেন।\n৩. টার্গেটেড ইউএসএ (USA), ইউকে (UK), কানাডা (Canada) বা অন্যান্য হাই-সিপিএম দেশের ট্রাফিকের কাছে সম্পূর্ণ ফ্রিতে কাস্টম ফোরাম গ্রুপস, পিন্টারেস্ট, টিকটক ও রেডিটের মাধ্যমে অথবা গুগল ও বিং বিজ্ঞাপনের মাধ্যমে অফারটি প্রমোট করে ইমেইল সাবমিট বা জিপ কোড সাবমিট করাবেন। প্রতি সফল সাবমিটে বা অ্যাকশনে আপনি পাবেন ১.৫ ডলার থেকে ১০ ডলার বা তারও বেশি কমিশন।',
    learnEn: [
      'Mastery of CPA Ecosystem: How to start earning without direct product sales',
      'Account Creation Secrets: Step-by-step verified approval on elite networks (CPAgrip, OGAds, CPALead)',
      'Landing Page & Conversion Funnel Design: Elements of high-converting lead structures',
      'Viral Free Traffic Blueprints: Drive massive USA/UK targeted users from Reddit, Pinterest, Quora & TikTok',
      'Passive Income via Content Locking: Monetize private premium guides, tools, and downloadable files',
      'Paid Campaign Scale-up: Crafting high-ROI Search Ads, Bing Campaigns, and inexpensive pop traffic ads',
      'Wallet Integration & Fast Payouts: Native tutorials for transferring USD to Payoneer, Wise, and Bkash'
    ],
    learnBn: [
      'সিপিএ মার্কেটিং কি এবং কিভাবে কোনো কিছু বিক্রি না করেই প্রতি অ্যাকশনে ডলার ইনকাম শুরু করবেন',
      'শীর্ষ সিপিএ নেটওয়ার্ক সমূহে অ্যাকাউন্ট তৈরি এবং প্রথমবারেই সিক্রেট এপ্রুভাল পাওয়ার জাদুকরী নিয়ম',
      'ফ্রিতে হাই-কনভার্টিং ল্যান্ডিং পেইজ (Landing Page) ও আই-ক্যাচিং অফার প্রমোশনাল ফানেল ডিজাইন',
      'অর্গানিক বা ফ্রি ইউএসএ ট্রাফিক ড্রাইভ মাস্টারক্লাস (Pinterest, Reddit, Quora, Medium, Twitter ও কাস্টম ফোরাম সাইট)',
      'ফেসবুক ও ইনস্টাগ্রাম রিলস, ইউটিউব শর্টস এবং টিকটকের মাধ্যমে ফ্রি ভাইরাল ট্রাফিক মেথড',
      'কন্টেন্ট লকার (Content Locking) এবং ফাইল লকিংয়ের মাধ্যমে ১০০% অটোমেটেড প্যাসিভ ইনকাম সেটআপ',
      'অ্যাডভান্সড পেইড অ্যাডভার্টাইজিং (Bing Search Ads, Google Ads ও কম খরচে প্রফেশনাল ক্যাম্পেন রান করার ট্রিকস)',
      'আয়কৃত ট্র্যাকিং ও দৈনিক ডলার পেমেন্ট উইথড্র করার উপায় (Payoneer, BKash ও লোকাল ব্যাংক বিকাশ ট্রান্সফার গাইড)'
    ],
    color: 'from-amber-400 to-orange-600'
  }
];

export default function CourseModule({ language, theme, onBack }: CourseModuleProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COURSES.filter(course => {
    const title = language === 'bn' ? course.titleBn : course.titleEn;
    const cat = language === 'bn' ? course.categoryBn : course.categoryEn;
    return title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           cat.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleWhatsAppContact = (courseName: string) => {
    const text = language === 'bn' 
      ? `আসসালামু আলাইকুম, আমি আপনাদের "${courseName}" কোর্সটি সম্পর্কে জানতে আগ্রহী এবং ভর্তি হতে চাই।`
      : `Hello, I am interested in enrolling in the "${courseName}" course. Please provide details.`;
    const whatsappUrl = `https://wa.me/8801880492649?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-4 px-4 pt-1">
      <AnimatePresence mode="wait">
        {!selectedCourse ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 text-left"
          >
            {/* Header / Intro */}
            <div className={`p-4 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 text-rose-500 mb-1">
                <Sparkles size={16} className="animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                  {language === 'bn' ? 'স্কিল ডেভেলপমেন্ট পোর্টাল' : 'SKILL DEVELOPMENT PORTAL'}
                </span>
              </div>
              <h2 className="text-base font-extrabold tracking-tight">
                {language === 'bn' ? 'ভবিষ্যতের আইটি কোর্স মডিউল' : 'Futuristic IT Course Modules'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {language === 'bn' 
                  ? 'উন্নত বিশ্বের সাথে তাল মিলিয়ে ফ্রিল্যান্সিং ও আইটি সেক্টরে স্বাবলম্বী হওয়ার জন্য আমাদের স্পেশাল ট্রেনিং মেমোরি। পছন্দ অনুয়াযী কোর্স নির্বাচন করুন।'
                  : 'Acquire high-demand technical skills to double your earning potentials. Master direct tools, and join global freelancing platforms.'}
              </p>
            </div>

            {/* Search bar */}
            <div className={`relative flex items-center p-0.5 rounded-xl border ${
              theme === 'dark' ? 'bg-[#15234d]/60 border-slate-800' : 'bg-white border-slate-200 shadow-inner'
            }`}>
              <Search size={14} className="text-slate-400 absolute left-3.5" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'পছন্দের কোর্স খুঁজুন...' : 'Search preferred courses...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-xs bg-transparent focus:outline-none border-none outline-none text-slate-800 dark:text-white"
              />
            </div>

            {/* Course List Grid */}
            <div className="space-y-3">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedCourse(course)}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all relative overflow-hidden group ${
                      theme === 'dark' 
                        ? 'bg-[#0f1b3b] hover:bg-[#15234d] border-slate-800' 
                        : 'bg-white hover:bg-slate-50 border-slate-100 shadow-sm'
                    }`}
                  >
                    {/* Decorative colored left strip */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${course.color}`} />

                    <div className="flex items-start justify-between gap-3 pl-2.5">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-500 uppercase tracking-wider">
                          {language === 'bn' ? course.categoryBn : course.categoryEn}
                        </span>
                        <h4 className="text-xs font-black tracking-tight mt-1 transition-colors group-hover:text-rose-500">
                          {language === 'bn' ? course.titleBn : course.titleEn}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {language === 'bn' ? course.descBn : course.descEn}
                        </p>
                      </div>
                      
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-rose-500 transition-colors shrink-0">
                        <ChevronRight size={14} />
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between pl-2.5">
                      <div className="flex items-center gap-1 text-slate-400 font-mono text-[9px]">
                        <Clock size={10} />
                        <span>{language === 'bn' ? course.durationBn : course.durationEn}</span>
                      </div>
                      
                      <span className="text-[9px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {language === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Details'}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 opacity-60 text-xs">
                  {language === 'bn' ? 'কোনো কোর্স পাওয়া যায়নি।' : 'No courses found.'}
                </div>
              )}
            </div>

            {/* Back to Home Button */}
            <button
              onClick={onBack}
              className={`w-full py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border transition-all ${
                theme === 'dark' 
                  ? 'border-slate-800 bg-[#0f1b3b] text-slate-300 hover:bg-slate-800' 
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ArrowLeft size={13} />
              {language === 'bn' ? 'প্রধান মেন্যুতে ফিরে যান' : 'Back to Main Menu'}
            </button>
          </motion.div>
        ) : (
          /* Course Details View */
          <motion.div
            key="details"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 text-left"
          >
            {/* Header Navigation card */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedCourse(null)}
                className={`p-2 rounded-xl border transition-colors ${
                  theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-700'
                }`}
                title="Go Back"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest block leading-none">
                  {language === 'bn' ? selectedCourse.categoryBn : selectedCourse.categoryEn}
                </span>
                <span className="text-xs font-bold font-mono text-emerald-500 mt-1 block">
                  {language === 'bn' ? selectedCourse.durationBn : selectedCourse.durationEn}
                </span>
              </div>
            </div>

            {/* Banner card */}
            <div className={`p-4 rounded-2xl border relative overflow-hidden bg-gradient-to-br ${selectedCourse.color} text-white`}>
              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-white/20 text-white font-mono uppercase tracking-wider">
                  <Award size={10} /> {language === 'bn' ? 'সার্টিফাইড ক্যারিয়ার কোর্স' : 'Certified Career Track'}
                </span>
                <h3 className="text-base font-black leading-tight tracking-tight">
                  {language === 'bn' ? selectedCourse.titleBn : selectedCourse.titleEn}
                </h3>
                <p className="text-[11px] leading-relaxed text-slate-100 opacity-95">
                  {language === 'bn' ? selectedCourse.descBn : selectedCourse.descEn}
                </p>
              </div>
              {/* background decoration circle */}
              <div className="absolute right-[-10px] bottom-[-20px] w-24 h-24 bg-white/10 rounded-full blur-xl" />
            </div>

            {/* Income Potential Card (কোর্স শেষে কত টাকা ইনকাম করতে পারেন) */}
            <div className={`p-4 rounded-2xl border space-y-2 ${
              theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <h4 className="text-xs font-extrabold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign size={14} className="text-emerald-500 shrink-0" />
                {language === 'bn' ? 'কোর্স শেষে কত টাকা ইনকাম করতে পারেন?' : 'Monthly Income Potential After Course'}
              </h4>
              <p className="text-xs leading-relaxed font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-2.5 rounded-xl border border-emerald-500/10">
                {language === 'bn' ? selectedCourse.incomeBn : selectedCourse.incomeEn}
              </p>
            </div>

            {/* How to Earn (কিভাবে ইনকাম করবেন) */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <h4 className="text-xs font-extrabold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase size={14} className="text-rose-500 shrink-0" />
                {language === 'bn' ? 'কিভাবে ইনকাম করবেন? (ধাপসমূহ)' : 'How Will You Earn & Scale?'}
              </h4>
              <div className="space-y-2">
                {(language === 'bn' ? selectedCourse.howToEarnBn : selectedCourse.howToEarnEn).split('\n').map((step, idx) => (
                  <div key={idx} className="p-3 text-xs leading-relaxed rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30 flex gap-2.5 items-start">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black shrink-0 font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{step.replace(/^\d+\.\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SPECIAL BONUS FEATURE JUST FOR CPA MARKETING */}
            {selectedCourse.id === 'cpa-marketing' && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-550/10 to-amber-500/10 border border-orange-500/20 space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-orange-500 animate-spin-slow" />
                  <h4 className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                    {language === 'bn' ? 'সিপিএ সিক্রেট ট্রাফিক সোর্স ও ফানেল বোনাস' : 'CPA Secret Traffic Sources & Bonuses'}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block mb-0.5">
                      {language === 'bn' ? 'ফ্রি ট্রাফিক মেথড' : 'Free Organic Methods'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 leading-relaxed">
                      {language === 'bn' 
                        ? 'পিন্টারেস্ট ভাইরাল ক্যাম্পেইন, রেডিট সাব-কমিউনিটি ডিসকাশন, কুওরা ডিরেক্ট লিংক এবং টিকটক প্রমোশন।'
                        : 'Viral Pinterest strategies, high-interest Subreddit forums, Quora directs and organic TikTok videos.'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
                      {language === 'bn' ? 'পেইড এডস ক্যাম্পেইন' : 'Paid Ads Strategy'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 leading-relaxed">
                      {language === 'bn' 
                        ? 'বিং সার্চ এডস কিওয়ার্ড সেটআপ, স্বল্প বাজেটে প্রপেলার-এডস পপ ট্রাফিক এবং ফেইسبুক লিড এডস।'
                        : 'High-ROI Bing Search Ads, PropellerAds popup targeting, and budget-friendly Meta pixel scaling.'}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 border-t border-orange-500/10 pt-2 bg-gradient-to-r bg-clip-text">
                  {language === 'bn' 
                    ? '🎁 বিশেষ বোনাস উপহার: কোর্সে ভর্তি হওয়া মাত্রই ১টি রেডি-মেড প্রি-বিল্ট ক্লিক-ট্রিগার ল্যান্ডিং পেজ টেমপ্লেট এবং আমাদের সিক্রেট ট্রাফিক পিন জেনারেটর মেথড আজীবন ব্যবহারের জন্য সম্পূর্ণ ফ্রিতে দেওয়া হবে।'
                    : '🎁 Exclusive Bonus Content: Get 1 pre-built conversion-ready landing page template plus step-by-step guidance on premium CPA networks free of charge.'}
                </div>
              </div>
            )}

            {/* What you will learn */}
            <div className={`p-4 rounded-2xl border space-y-3.5 ${
              theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <h4 className="text-xs font-extrabold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={13} className="shrink-0" />
                {language === 'bn' ? 'কোর্স মডিউলের মূল পাঠ্য বিষয়সমূহ' : 'What You Will Master'}
              </h4>
              
              <div className="grid grid-cols-1 gap-2">
                {(language === 'bn' ? selectedCourse.learnBn : selectedCourse.learnEn).map((item, id) => (
                  <div key={id} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT CARD - WITH MANDATED WHATSAPP CONTACT - 01880492649 */}
            <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 space-y-3.5">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 shrink-0">
                  <Phone size={18} className="animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-rose-500 uppercase tracking-wider">
                    {language === 'bn' ? 'সরাসরি এডমিনের সাথে যোগাযোগ করুন' : 'Direct Admin Support Line'}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-300 mt-0.5">
                    {language === 'bn' 
                      ? 'কোর্স সম্পর্কে বিস্তারিত জানতে বা সরাসরি সিট বুক করতে আমাদের হটলাইন এডমিনের সাথে যোগাযোগ করুন।'
                      : 'Interested candidates should contact our admin on WhatsApp directly to book a sit.'}
                  </p>
                </div>
              </div>

              {/* Number presentation */}
              <div className="bg-black/20 dark:bg-black/40 py-2.5 px-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] opacity-60 uppercase font-bold tracking-wide block leading-none text-slate-400">
                    {language === 'bn' ? 'জরুরি হোয়াটসঅ্যাপ মেসেঞ্জিং' : 'Emergency WhatsApp Line'}
                  </span>
                  <span className="text-base font-black font-mono text-emerald-400 block mt-1">
                    01880492649
                  </span>
                </div>
                <span className="text-[10px] font-extrabold text-rose-450 bg-rose-500/20 px-2 py-0.5 rounded-full font-mono uppercase animate-pulse">
                  {language === 'bn' ? 'সরাসরি চ্যাট' : 'Direct Chat'}
                </span>
              </div>

              {/* Button */}
              <button
                onClick={() => handleWhatsAppContact(language === 'bn' ? selectedCourse.titleBn : selectedCourse.titleEn)}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-550 to-green-600 hover:from-emerald-650 hover:to-green-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
              >
                <MessageSquare size={14} className="animate-pulse" />
                {language === 'bn' ? 'এডমিনের সাথে হোয়াটসঅ্যাপে কথা বলুন' : 'Chat with Admin on WhatsApp'}
              </button>
            </div>

            {/* Footer Back */}
            <div className="pt-2">
              <button
                onClick={() => setSelectedCourse(null)}
                className={`w-full py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border transition-all ${
                  theme === 'dark' 
                    ? 'border-slate-800 bg-[#0f1b3b] hover:bg-slate-800 text-slate-300' 
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                {language === 'bn' ? 'কোর্স তালিকায় ফিরে যান' : 'Back to Course List'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
