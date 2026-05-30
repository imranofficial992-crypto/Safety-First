/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  ShieldAlert, 
  Wrench, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  CheckCircle, 
  Workflow, 
  Eye, 
  FileText,
  Activity,
  HeartPulse,
  CornerDownRight,
  AlertTriangle,
  Building,
  Factory,
  Info,
  Calendar,
  Search,
  Shield
} from 'lucide-react';
import { Language } from '../types';

interface FireFighterGuideProps {
  language: Language;
  theme: 'light' | 'dark';
}

type TabType = 'guide' | 'routine' | 'equipment' | null;
type SubTabType = 'immediate' | 'classes' | 'highrise' | 'industrial' | 'extinguisher';

interface RoutineSlot {
  time: string;
  titleBn: string;
  titleEn: string;
  isBold?: boolean;
}

interface DailyRoutine {
  dayBn: string;
  dayEn: string;
  dayShortBn: string;
  dayShortEn: string;
  slots: RoutineSlot[];
}

const WINTER_ROUTINE: DailyRoutine[] = [
  {
    dayBn: 'শনিবার',
    dayEn: 'Saturday',
    dayShortBn: 'শনি',
    dayShortEn: 'Sat',
    slots: [
      { time: '০৬:০০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:৩০-০৭:২০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৭:২০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'স্টেশন স্টোরে রক্ষিত TEA লে-আউট করে পরিষ্কার ও ব্যবহারিক অনুশীলন 🔥', titleEn: 'TEA layout, clean-up & practical exercise in station store 🔥', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'টপোগ্রাফি/গণসংযোগ/মহড়া পরিচালনা 🗺️', titleEn: 'Topography / Public Relations / Drill Execution 🗺️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:০০-১৯:৩০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '১৯:৩০-০৬:০০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'রবিবার',
    dayEn: 'Sunday',
    dayShortBn: 'রবি',
    dayShortEn: 'Sun',
    slots: [
      { time: '০৬:০০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:৩০-০৭:২০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৭:২০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'পাম্প ড্রিল / সিরিজ পাম্প ও স্মোক ম্যানেজমেন্ট অনুশীলন 🧯', titleEn: 'Pump Drill / Series Pump & Smoke Management Exercise 🧯', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'সেলফ কনটেইনড ব্রিদিং অ্যাপারেটাস (SCBA), হিট প্রটেকটিভ স্যুট ও ফায়ার স্যুট ব্যবহারিক অনুশীলন 🛡️', titleEn: 'SCBA, Heat Protective Suit & Fire Suit Practical Drill 🛡️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:০০-১৯:৩০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '১৯:৩০-০৬:০০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'সোমবার',
    dayEn: 'Monday',
    dayShortBn: 'সোম',
    dayShortEn: 'Mon',
    slots: [
      { time: '০৬:০০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:৩০-০৭:২০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৭:২০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'লেডার ক্লাইম্বিং ও কনফাইন্ড স্পেস রেসকিউ অনুশীলন 🪜', titleEn: 'Ladder Climbing & Confined Space Rescue Exercise 🪜', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'স্পেশাল গিয়ার যেমন হাইড্রোলিক স্প্রেডার, জ্যাক, পাওয়ার কাটার, ট্রাইপড, চেইনকাপ্পা, কাম এলং ইত্যাদি ব্যবহারিক অনুশীলন ⚙️', titleEn: 'Practical Drill on Special Gear (Hydraulic Spreader, Jack, Power Cutter, Tripod, Chain Block, Come-Along) ⚙️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:০০-১৯:৩০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '১৯:৩০-০৬:০০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'মঙ্গলবার',
    dayEn: 'Tuesday',
    dayShortBn: 'মঙ্গল',
    dayShortEn: 'Tue',
    slots: [
      { time: '০৬:০০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:৩০-০৭:২০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৭:২০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'রেসকিউ ড্রিল / জরুরি উদ্ধার পদ্ধতি / স্ট্রেচার ড্রিল / গিঁট / আরটিএ অনুশীলন 🩺', titleEn: 'Rescue Drill / Emergency Rescue / Stretcher / Knots / RTA Exercise 🩺', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'সেলফ কনটেইনড ব্রিদিং অ্যাপারেটাস (SCBA), হিট প্রটেকティブ স্যুট ও ফায়ার স্যুট ব্যবহারিক অনুশীলন 🛡️', titleEn: 'SCBA, Heat Protective Suit & Fire Suit Practical Drill 🛡️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:০০-১৯:৩০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '১৯:৩০-০৬:০০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'বুধবার',
    dayEn: 'Wednesday',
    dayShortBn: 'বুধ',
    dayShortEn: 'Wed',
    slots: [
      { time: '০৬:০০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:৩০-০৭:২০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৭:২০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'স্লিং/ব্যান্ডেজ/পিকিংআপ ড্রিল/কুইক ড্রেস/CSSR/MFR অনুশীলন 🩹', titleEn: 'Sling & Bandages / Picking Up Drill / Quick Dress / CSSR / MFR 🩹', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'স্পেশাল গিয়ার যেমন হাইড্রোলিক স্প্রেডার, জ্যাক, পাওয়ার কাটার, ট্রাইপড, চেইনকাপ্পা, কাম এলং ইত্যাদি ব্যবহারিক অনুশীলন ⚙️', titleEn: 'Practical Drill on Special Gear (Hydraulic Spreader, Jack, Power Cutter, Tripod, Chain Block, Come-Along) ⚙️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:০০-১৯:৩০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '১৯:৩০-০৬:০০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'বৃহস্পতিবার',
    dayEn: 'Thursday',
    dayShortBn: 'বৃহ',
    dayShortEn: 'Thu',
    slots: [
      { time: '০৬:০০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:৩০-০৭:২০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৭:২০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'বিশেষ সরঞ্জামাদির উপর বাস্তব অনুশীলন / ব্রেভ হার্ড অনুশীলন 💪', titleEn: 'Practical Drill on Special Rescue Gear / Brave Heart Drill 💪', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'বিষয় ভিত্তিক তাত্ত্বিক ক্লাস 📖', titleEn: 'Subject-oriented Theoretical Classroom Training 📖', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:০০-১৯:৩০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '১৯:৩০-০৬:০০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'শুক্রবার',
    dayEn: 'Friday',
    dayShortBn: 'শুক্র',
    dayShortEn: 'Fri',
    slots: [
      { time: '০৬:০০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:৩০-০৭:২০', titleBn: 'সাপ্তাহিক গাড়ি টেস্ট ও পাম্প ওয়েট টেস্ট 🚒🧪', titleEn: 'Weekly Heavy Rescue Vehicle & Pump Wet Test 🚒🧪' },
      { time: '০৭:২০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১৯:০০', titleBn: 'শুক্রবার সাপ্তাহিক পবিত্র জুম্মা নামাজ, জুমা বিরতি ও সাধারণ রক্ষণাবেক্ষণ 🕌🕌', titleEn: 'Jummah Prayers, Special Rest Recess & Light Station Maintenance 🕌🕌' },
      { time: '১৯:০০-১৯:৩০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '১৯:৩০-০৬:০০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  }
];

const SUMMER_ROUTINE: DailyRoutine[] = [
  {
    dayBn: 'শনিবার',
    dayEn: 'Saturday',
    dayShortBn: 'শনি',
    dayShortEn: 'Sat',
    slots: [
      { time: '০৫:৩০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:০০-০৬:৫০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৬:৫০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'স্টেশন স্টোরে রক্ষিত TEA লে-আউট করে পরিষ্কার ও ব্যবহারিক অনুশীলন 🔥', titleEn: 'TEA layout, clean-up & practical exercise in station store 🔥', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'টপোগ্রাফি/গণসংযোগ/মহড়া পরিচালনা 🗺️', titleEn: 'Topography / Public Relations / Drill Execution 🗺️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:৩০-২০:০০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '২০:৩০-০৫:৩০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'রবিবার',
    dayEn: 'Sunday',
    dayShortBn: 'রবি',
    dayShortEn: 'Sun',
    slots: [
      { time: '০৫:৩০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:০০-০৬:৫০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৬:৫০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'পাম্প ড্রিল / серия পাম্প ও স্মোক ম্যানেজমেন্ট অনুশীলন 🧯', titleEn: 'Pump Drill / Series Pump & Smoke Management Exercise 🧯', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'সেলফ কনটেইনড ব্রিদিং অ্যাপারেটাস (SCBA), হিট প্রটেকティブ স্যুট ও ফায়ার স্যুট ব্যবহারিক অনুশীলন 🛡️', titleEn: 'SCBA, Heat Protective Suit & Fire Suit Practical Drill 🛡️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:৩০-২০:০০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '২০:৩০-০৫:৩০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'সোমবার',
    dayEn: 'Monday',
    dayShortBn: 'সোম',
    dayShortEn: 'Mon',
    slots: [
      { time: '০৫:৩০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:০০-০৬:৫০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৬:৫০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'লেডার ক্লাইম্বিং ও কনফাইন্ড স্পেস রেসকিউ অনুশীলন 🪜', titleEn: 'Ladder Climbing & Confined Space Rescue Exercise 🪜', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'স্পেশাল গিয়ার যেমন হাইড্রোলিক স্প্রেডার, জ্যাক, পাওয়ার কাটার, ট্রাইপড, চেইনকাপ্পা, কাম এলং ইত্যাদি ব্যবহারিক অনুশীলন ⚙️', titleEn: 'Practical Drill on Special Gear (Hydraulic Spreader, Jack, Power Cutter, Tripod, Chain Block, Come-Along) ⚙️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:৩০-২০:০০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '২০:৩০-০৫:৩০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'মঙ্গলবার',
    dayEn: 'Tuesday',
    dayShortBn: 'মঙ্গল',
    dayShortEn: 'Tue',
    slots: [
      { time: '০৫:৩০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:০০-০৬:৫০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৬:৫০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'রেসকিউ ড্রিল / জরুরি উদ্ধার পদ্ধতি / স্ট্রেচার ড্রিল / গিঁট / আরটিএ অনুশীলন 🩺', titleEn: 'Rescue Drill / Emergency Rescue / Stretcher / Knots / RTA Exercise 🩺', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'সেলফ কনটেইনড ব্রিদিং অ্যাপারেটাস (SCBA), হিট প্রটেকティブ স্যুট ও ফায়ার স্যুট ব্যবহারিক অনুশীলন 🛡️', titleEn: 'SCBA, Heat Protective Suit & Fire Suit Practical Drill 🛡️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:৩০-২০:০০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '২০:৩০-০৫:৩০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'বুধবার',
    dayEn: 'Wednesday',
    dayShortBn: 'বুধ',
    dayShortEn: 'Wed',
    slots: [
      { time: '০৫:৩০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:০০-০৬:৫০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৬:৫০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'স্লিং/ব্যান্ডেজ/পিকিংআপ ড্রিল/কুইক ড্রেস/CSSR/MFR অনুশীলন 🩹', titleEn: 'Sling & Bandages / Picking Up Drill / Quick Dress / CSSR / MFR 🩹', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'স্পেশাল গিয়ার যেমন হাইড্রোলিক স্প্রেডার, জ্যাক, পাওয়ার কাটার, ট্রাইপড, চেইনকাপ্পা, কাম এলং ইত্যাদি ব্যবহারিক অনুশীলন ⚙️', titleEn: 'Practical Drill on Special Gear (Hydraulic Spreader, Jack, Power Cutter, Tripod, Chain Block, Come-Along) ⚙️', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:৩০-২০:০০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '২০:৩০-০৫:৩০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'বৃহস্পতিবার',
    dayEn: 'Thursday',
    dayShortBn: 'বৃহ',
    dayShortEn: 'Thu',
    slots: [
      { time: '০৫:৩০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:০০-০৬:৫০', titleBn: 'শরীরচর্চা 🏃', titleEn: 'Physical Exercise 🏃' },
      { time: '০৬:৫০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি কাল ও সাধারণ বিরতি ⏱️', titleEn: 'Preparation & Gear Check ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১০:১০', titleBn: 'বিশেষ সরঞ্জামাদির উপর বাস্তব অনুশীলন / ব্রেভ হার্ড অনুশীলন 💪', titleEn: 'Practical Drill on Special Rescue Gear / Brave Heart Drill 💪', isBold: true },
      { time: '১০:১০-১০:২০', titleBn: 'বিরতি ১০ মিনিট ☕', titleEn: '10-Minute Break ☕' },
      { time: '১০:২০-১১:৩০', titleBn: 'বিষয় ভিত্তিক তাত্ত্বিক ক্লাস 📖', titleEn: 'Subject-oriented Theoretical Classroom Training 📖', isBold: true },
      { time: '১১:৩০-১৫:৩০', titleBn: 'বিশ্রাম ও দুপুরের খাবার 🛌', titleEn: 'Lunch & Rest Recess 🛌' },
      { time: '১৫:৩০', titleBn: 'প্রস্তুতি ঘণ্টা 🔔', titleEn: 'Preparation Hour Bell 🔔' },
      { time: '১৬:০০-১৭:০০', titleBn: 'ফলিন ঘণ্টা, খেলাধুলা ও স্টেশন এলাকা পরিষ্কার পরিচ্ছন্নতা ⚽', titleEn: 'Fall-In Hour, Sports & Station Area Cleanup ⚽' },
      { time: '১৯:৩০-২০:০০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '২০:৩০-০৫:৩০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  },
  {
    dayBn: 'শুক্রবার',
    dayEn: 'Friday',
    dayShortBn: 'শুক্র',
    dayShortEn: 'Fri',
    slots: [
      { time: '০৫:৩০', titleBn: 'জাগরণী ঘণ্টা 🔔', titleEn: 'Wake Up Bell 🔔' },
      { time: '০৬:০০-০৬:৫০', titleBn: 'সাপ্তাহিক গাড়ি টেস্ট ও পাম্প ওয়েট টেস্ট 🚒🧪', titleEn: 'Weekly Heavy Rescue Vehicle & Pump Wet Test 🚒🧪' },
      { time: '০৬:৫০-০৮:১০', titleBn: 'নাস্তা ও পোশাক বদল 🍳', titleEn: 'Breakfast & Uniform Change 🍳' },
      { time: '০৮:১০-০৮:৪০', titleBn: 'রোলকল, ডিউটি বণ্টন-১০মিঃ এবং প্যারেড-২০মিঃ 📋', titleEn: 'Roll Call, Duty Allocation (10m) & Parade (20m) 📋' },
      { time: '০৮:৪০-০৮:৫০', titleBn: 'প্রস্তুতি বিরতি ⏱️', titleEn: 'Preparation Break ⏱️' },
      { time: '০৮:৫০-০৯:২০', titleBn: 'গাড়ি পাম্প ও ইঞ্জিন গরম, চেকআপ এবং স্টেশন এলাকা পরিষ্কারকরণ 🚒', titleEn: 'Vehicle Pump & Engine Warming, Checkup & Station Cleanup 🚒' },
      { time: '০৯:২০-১৯:৩০', titleBn: 'শুক্রবার সাপ্তাহিক পবিত্র জুম্মা নামাজ, জুমা বিরতি ও সাধারণ রক্ষণাবেক্ষণ 🕌🕌', titleEn: 'Weekly Friday Jummah Prayer, Special Rest Recess & Light Maintenance 🕌🕌' },
      { time: '১৯:৩০-২০:০০', titleBn: 'রোলকল এবং গাড়ি পাম্প ইঞ্জিন গরম 📋', titleEn: 'Roll Call & Vehicle Pump Engine Warming 📋' },
      { time: '২০:৩০-০৫:৩০', titleBn: 'রাত্রিকালীন বিশ্রাম 💤', titleEn: 'Night Rest Period 💤' }
    ]
  }
];

interface EquipmentItem {
  id: string;
  nameBn: string;
  nameEn: string;
  categoryBn: string;
  categoryEn: string;
  descBn: string;
  descEn: string;
  specsBn: string[];
  specsEn: string[];
  usageBn: string;
  usageEn: string;
  safetyBn: string;
  safetyEn: string;
  iconName: 'breath' | 'heat' | 'suit' | 'ladder' | 'spreader' | 'jack' | 'cutter' | 'detector' | 'squeezer' | 'hammer' | 'rotary' | 'chainsaw' | 'wood';
}

const EQUIPMENT_DATA: EquipmentItem[] = [
  {
    id: 'scba',
    nameBn: 'সেল্প কনটেইন ব্রিদিং এ্যাপারেটাস (SCBA)',
    nameEn: 'Self-Contained Breathing Apparatus (SCBA)',
    categoryBn: 'ব্যক্তিগত সুরক্ষা',
    categoryEn: 'Personal Protection',
    descBn: 'অগ্নিবৃত বা বিষাক্ত ধোঁয়াযুক্ত ভবনে অক্সিজেনের সরবরাহ নিশ্চিত করতে ব্যবহৃত অত্যাধুনিক শ্বাসপ্রশ্বাস সহায়তাকারী ব্যাকপ্যাক সিলিন্ডার ও মাস্ক সিস্টেম।',
    descEn: 'Pressurized respiratory support system containing compressed clean air to sustain firefighters inside oxygen-deficit or toxic gas zones.',
    specsBn: [
      'সিলিন্ডার ক্ষমতা: ৪.৭ থেকে ৯.০ লিটার',
      'কার্যকর সময়কাল: ৪৫ থেকে ৬০ মিনিট',
      'সর্বোচ্চ চাপ ক্ষমতা: ৩০০ থেকে ৩১০ বার',
      'ওজন: কার্বন কম্পোজিট সিলিন্ডার সহ প্রায় ৮-১০ কেজি'
    ],
    specsEn: [
      'Cylinder Volume: 4.7L to 9.0L light carbon composite',
      'Working Duration: 45 to 60 minutes structural rescue',
      'Maximum Pressure: 300 to 310 Bar rating',
      'Total Weight: Approx 8-10 kg with dynamic harness'
    ],
    usageBn: 'এটি পিঠে পরিধান করার পর কুইক কানেক্টর খুলে দিন। ফেস মাস্কের বডি সিল নিশ্চিত করতে হালকা শ্বাস টেনে ভ্যাকুয়াম পরীক্ষা করুন। গেজে প্রেসার ২২০ বারের নিচে থাকলে বিপদজনক জোনে প্রবেশ করবেন না।',
    usageEn: 'Don the cylinder harness. Adjust facepiece strap tension and test positive air pressure seal. Do not enter heavy smoke environments if the gauge registers below 220 Bar.',
    safetyBn: 'সিলিন্ডারের বাতাস শেষ পর্যায়ে পৌঁছালে (প্রায় ৫০ বার) এটি উচ্চ সুরের সতর্কতামূলক বাশি বা হুইসেল বাজাবে। হুইসেল শোনা মাত্রই ৬০ সেকেন্ডের মধ্যে নিরাপদ জোনে ফিরে আসুন।',
    safetyEn: 'At 50-55 Bar remaining air, the system triggers a loud low-pressure distress whistle. Firefighters must evacuate immediately upon whistle initiation.',
    iconName: 'breath'
  },
  {
    id: 'heat_suit',
    nameBn: 'হিট প্রটেকティブ স্যূট',
    nameEn: 'Heat Protective Suit',
    categoryBn: 'ব্যক্তিগত সুরক্ষা',
    categoryEn: 'Personal Protection',
    descBn: 'তীব্র তাপ বিকিরণ (Radiant Heat) এবং আপৎকালীন আকস্মিক শিখা (Flash-over) থেকে রক্ষা পাওয়ার জন্য বিশেষ ধরণের অ্যালুমিনিয়াম প্রলেপযুক্ত প্রতিরক্ষামূলক স্যুট।',
    descEn: 'Aluminized multi-layered safety suit designed to reflect intense radiant thermal energy during industrial fire entries and proximity firefighting.',
    specsBn: [
      'বিকিরণ তাপ প্রতিরোধী সক্ষমতা: ১০০০ ডিগ্রি সেলসিয়াস পর্যন্ত',
      'মেটেরিয়াল: থার্মাল বেরিয়ার সহ নোমেক্স/ফাইবারগ্লাস ফেব্রিক',
      'কম্পোনেন্টস: ইন্টিগ্রেটেড হুড, বুট, জ্যাকেট, ট্রাউজার এবং হেভি গ্লাভস'
    ],
    specsEn: [
      'Radiant Heat Protection: Up to 1000°C resistance',
      'Primary Shell Material: Multi-layer aluminized fiberglass/para-aramid fabric',
      'Full Kit Components: Hood with gold reflective shield, jacket, pants, safety boots, and insulated gloves'
    ],
    usageBn: 'স্যুট পরিধানের সময় ভেতরের নোমেক্স থার্মাল আস্তরণটি সোজা আছে কিনা তা নিশ্চিত করতে হবে। কলার ও জয়েন্টগুলোর স্ন্যাপ হুকগুলো টাইট করে লক করতে হবে যেন ফাঁকা অংশ দিয়ে গরম বাতাস প্রবেশ করতে না পারে।',
    usageEn: 'Carefully align interior thermal liners. Check all Velcro seam seals, throat tabs, and zip connectors to eliminate any dynamic exposure to toxic hot gases.',
    safetyBn: 'এটি সরাসরি আগুনের শিখার সংস্পর্শে দীর্ঘক্ষণ থাকার জন্য ডিজাইন করা হয়নি (Proximity, not fire entry)। প্রতিটি অপারেশনের পর অ্যালুমিনাইজড তলে ফাটল বা তেল-ময়লা লেগে আছে কিনা চেক করুন।',
    safetyEn: 'This proximity skin does not permit prolonged direct physical contact with live flames. Routinely wipe soot and inspect the reflective laminate for wear or structural cracks.',
    iconName: 'heat'
  },
  {
    id: 'fire_suit',
    nameBn: 'ফায়ার স্যুট',
    nameEn: 'Fire Suit',
    categoryBn: 'ব্যক্তিগত সুরক্ষা',
    categoryEn: 'Personal Protection',
    descBn: 'ফায়ার ফাইটারদের প্রধান পেশাদারি পোশাক যা সরাসরি শিখা, উচ্চ তাপ, রাসায়নিক তরল ছিটকে পড়া এবং তীক্ষ্ণ ঘর্ষণ থেকে সমগ্র শরীরকে সুরক্ষিত রাখে।',
    descEn: 'Professional 3-layer heavy structural firefighting uniform constructed using high-performance fire-retardant synthetic fibers.',
    specsBn: [
      'উপাদান: নোমেক্স (Nomex), কেভলার (Kevlar) এবং পিবিআই ব্লেন্ড',
      'লেয়ার প্রযুক্তি: Outer Shell (বহিঃস্তর), Moisture Barrier (আর্দ্রতারোধক), Thermal Liner (তাপরোধক)',
      'সার্টিফিকেশন: NFPA 1971 / EN 469 স্ট্যান্ডার্ড অনুমোদিত'
    ],
    specsEn: [
      'Fibers: Advanced Nomex, Kevlar, and PBI specialized blend',
      'Structural Layering: Flame-resistant outer shell, breathable moisture barrier, thermal insulation liner',
      'Compliance Standard: Certified to NFPA 1971 and European EN 469 protocols'
    ],
    usageBn: 'ডিউটিতে যাওয়ার আগে প্যান্ট, ওভারকোট এবং জুতো ৩টি অংশই নিখুঁতভাবে লক করে নিন। প্যান্টের সাসপেন্ডার বেল্ট কাঁধের উপর শক্তভাবে বসানো নিশ্চিত করুন যেন দৌড়াদৌড়ির সময়ে খুলে না যায়।',
    usageEn: 'Always slip pants over standard safety boots before climbing into the truck. Strap on shoulder suspenders securely and overlap the protective jacket hem by at least 12 inches.',
    safetyBn: 'স্যুটটি ভিজে গেলে বা রাসায়নিক পদার্থ লাগলে থার্মাল প্রটেকশন পাওয়ার ক্ষমতা হ্রাস পেতে পারে। ফায়ার স্যুট নোংরা হলে তা ধুয়ে নিয়ে শুকিয়ে পুনঃব্যবহার করুন।',
    safetyEn: 'Wet turnouts conduct heat rapidly and increase risk of steam burns. Thoroughly wash oily spots and completely dry gear before entering hot zones.',
    iconName: 'suit'
  },
  {
    id: 'ladder',
    nameBn: 'লেডার',
    nameEn: 'Rescue Ladder',
    categoryBn: 'উদ্ধার কাজ',
    categoryEn: 'Rescue Operations',
    descBn: 'বহুতল ভবনের ব্যালকনি, জানালা বা ছাদে আরোহণ ও আটকে পড়া মানুষজনকে দ্রুত নিচের ভূমিতে নামিয়ে আনার জন্য ব্যবহৃত উচ্চ-ক্ষমতার অ্যালুমিনিয়াম বা ফাইবারগ্লাস মই।',
    descEn: 'Robust structural scale ladders designed to access mid and high-rise apertures to provide an emergency vertical egress path.',
    specsBn: [
      'ধরণ: টু-সেকশন বা থ্রি-সেকশন এক্সটেনশন লেডার',
      'উচ্চতা সীমা: ৩৫ থেকে ৪৫ ফুট পর্যন্ত বর্ধনশীল',
      'উপাদান: হালকা ও শক্ত স্পেস-গ্রেড অ্যালুমিনিয়াম অ্যালয়',
      'ধারণক্ষমতা: সর্বোচ্চ ১২০ থেকে ১৫০ কেজি (একযোগে ২ জন ব্যক্তি)'
    ],
    specsEn: [
      'Design: 2-Section or 3-Section sliding pulley extension ladder',
      'Operational Height: Adjustable from 14 ft fully retracted to 35-45 ft fully extended',
      'Metal Alloy: Fire-rated lightweight high-tensile structural aluminum',
      'Safe Working Load: 150 kg (approx 2 personnel capacity)'
    ],
    usageBn: 'মইটি সর্বদা ৪:১ অনুপাতে স্থাপন করুন (মইয়ের গোড়া দেয়াল থেকে মইয়ের ব্যবহৃত উচ্চতার ৪ ভাগের ১ ভাগ দূরে রাখুন)। এটি মাটির সাথে প্রায় ৭৫ ডিগ্রি কোণ তৈরি করবে।',
    usageEn: 'Place the safety ladder using the 4:1 rule (incline angle of 75 degrees). Secure the ladder tip to solid wall segments, never to window glass or loose plastic brackets.',
    safetyBn: 'মই স্থাপনের স্থানটি পিচ্ছিল হলে বা নিচে ড্রেন থাকলে তা পরিহার করুন। বৈদ্যুতিক লাইনের কাছাকাছি অ্যালুমিনিয়াম লেডারের ব্যবহার সম্পূর্ণ নিষিদ্ধ (বিদ্যুৎস্পৃষ্ট হওয়ার ঝুঁকি)।',
    safetyEn: 'Never use metal ladders near live electrical overhead wires. Verify that safety rungs are fully locked onto their catches before attempting to climb.',
    iconName: 'ladder'
  },
  {
    id: 'hydraulic_spreader',
    nameBn: 'হাইড্রোলিক স্প্রেডার',
    nameEn: 'Hydraulic Spreader',
    categoryBn: 'উদ্ধার কাজ',
    categoryEn: 'Rescue Operations',
    descBn: 'ঘটনাস্থলে চাপা পড়া ধাতব কাঠামো, গাড়ির দরজা বা কংক্রিটের স্ল্যাব দূরে ঠেলে সরিয়ে দিয়ে ভিকটিম উদ্ধারকারী তীব্র ক্ষমতার স্প্রেড টুল।',
    descEn: 'Ultra high-pressure hydraulic rescue arm used to force apart deformed metal vehicle doors, crushed frameworks, and collapsed structures.',
    specsBn: [
      'হাইড্রোলিক চাপ ক্ষমতা: ৭২০ বার (১০,০০০ PSI) পর্যন্ত',
      'স্প্রেডিং বা প্রসারিত দূরত্ব: ৬০০ থেকে ৮০০ মিলিমিটার',
      'সর্বোচ্চ স্প্রেডিং ফোর্স: ২০০ থেকে ২৫০ কিলো-নিউটন (প্রায় ২০-২৫ টন)'
    ],
    specsEn: [
      'System Operating Pressure: 720 Bar (10,400 PSI) rating',
      'Max Spreading Jaw Gap: 600 mm to 800 mm travel range',
      'Dynamic Spreading Force: 200 kN to 250 kN (approx 20-25 Tons)'
    ],
    usageBn: 'স্প্রেডারের টিপ বা ডগাটি চাপ আক্রান্ত খাঁজে সঠিকভাবে ঢুকিয়ে দিন। আস্তে আস্তে ভালভ খুলে চাপ বাড়ান। চাপের ফলে মেটাল স্লিপ খেয়ে ছিটকে পড়তে পারে, তাই সাইড অ্যাঙ্গেল থেকে কাজের দিকে নজর রাখুন।',
    usageEn: 'Wedge the solid dynamic arm tips as deeply as possible into the hinge seam. Operate hydraulic valves slowly to monitor reaction forces and avoid structural slippage.',
    safetyBn: 'ঘূর্ণনশীল বা চলমান হাইড্রোলিক পাইপে হাত দেবেন না। সর্বদা প্রতিরক্ষামূলক চোখের গ্লাস পরিধান করুন, কারণ স্প্রেড করার সময় অতি দ্রুত মেটাল ভেঙে বা ছিটকে বাইরে আসতে পারে।',
    safetyEn: 'Never touch high-pressure hydraulic hose lines during operation. Wear shatterproof polycarbonate eyewear to shield against flying metal chips or rivets.',
    iconName: 'spreader'
  },
  {
    id: 'hydraulic_jack',
    nameBn: 'জ্যাক (Hydraulic Jack / Ram)',
    nameEn: 'Hydraulic Jack / Rescue Ram',
    categoryBn: 'উদ্ধার কাজ',
    categoryEn: 'Rescue Operations',
    descBn: 'ধসে পড়া ছাদ, লোহার বিম বা ভারী ক্যাব ও ট্রাকের চ্যাসিস সোজা উপরে তুলে আটকে পড়া মানুষকে জীবিত মুক্ত করতে সাহায্যকারী টেলিস্কোপিক জ্যাক বা র‌্যাম।',
    descEn: 'Telescoping heavy-duty hydraulic lifting device designed to push vertically and support structural loads during building collapses.',
    specsBn: [
      'উত্তোলন ক্ষমতা: ১০ থেকে ৩০ টন পর্যন্ত',
      'অপারেটিং টাইপ: পোর্টেবল ম্যানুয়াল পাম্প বা মোটর চালিত কুইক হাইড্রোলিক পাম্প',
      'ভালভ বৈশিষ্ট্য: ওভারলোড ও প্রেশার ড্রপ প্রতিরোধে অটোমেটিক সেফটি চেক ভালভ'
    ],
    specsEn: [
      'Lifting Limit Capacity: 10 to 30 Metric Tons continuous payload',
      'Hydraulic Actuation: Manual hand pump or motor-driven fast-coupler connections',
      'Valves: Integrated pressure relief safety valves to counter spontaneous drops'
    ],
    usageBn: 'ভারী ওজনের নিচে জ্যাক স্থাপনের আগে নিচে একটি কাঠের তক্তা বা শক্ত ভিত্তি দিন। জ্যাক উপরে তোলার সাথে সাথেই ওজনের নিচে কাঠের ব্লক (Cribbing) দিয়ে ব্যাকআপ দিন, কেবল জ্যাকের উপর ভরসা রাখবেন না।',
    usageEn: 'Place a flat wooden plank beneath the jack foot to distribute soil pressure. Supplement the lift continuously with high-density wooden cribbing blocks.',
    safetyBn: 'জ্যাকের সিলিন্ডারে বা পাইন লাইনে কোনো তেল ফুটো থাকলে তা তাত্ক্ষণিকভাবে পরিবর্তন করতে হবে। ওভারলোড ভালভের সক্ষমতার অতিরিক্ত ওজন তোলার চেষ্টা করবেন না।',
    safetyEn: 'Do not lift loads exceeding rated tonnage limiters. Replace leaking or damaged seals immediately and never crawl underneath a load supported only by an uncribbed jack.',
    iconName: 'jack'
  },
  {
    id: 'power_cutter',
    nameBn: 'পাওয়ার কাটার',
    nameEn: 'Power Cutter',
    categoryBn: 'কাটিং ও ভাঙার সরঞ্জাম',
    categoryEn: 'Cutting & Breaker Tools',
    descBn: 'আরসিসি ঢালাইয়ের দেয়াল, লোহার মোটা পাইপলাইন ও কারখানার কলাপসিবল গেট অতি দ্রুত কেটে উদ্ধার পথ তৈরি করার জন্য ব্যবহৃত পেট্রল চালিত হাই-স্পিড রোটারি ডিস্ক কাটার।',
    descEn: 'Gasoline engine-driven high-velocity circular saw featuring interchangeable abrasive or diamond-grit blades to cut through masonry and iron rails.',
    specsBn: [
      'ইঞ্জিন পাওয়ার: ৩.৫ থেকে ৫.০ কিলোওয়াট (টু-স্ট্রোক পেট্রল ইঞ্জিন)',
      'ব্লেড সাইড ব্যাস: ১২ থেকে ১৪ ইঞ্চি (৩০০ থেকে ৩৫০ মিমি)',
      'সর্বোচ্চ ঘূর্ণন গতি: ৪৭০০ থেকে ৫০০০ আরপিএম (RPM)',
      'পানি প্রবাহ নালী: ধূলিকণা দমনের জন্য অটো পানিসংযোগ পোর্ট'
    ],
    specsEn: [
      'Internal Engine: 3.5 kW to 5.0 kW (2-stroke single cylinder)',
      'Cutting Blade Diameters: Supports 12-inch and 14-inch abrasive/diamond discs',
      'Rotary Shaft Speed: Up to 5000 RPM high-speed partition',
      'Dust Suppression: Built-in water connection flow hose port'
    ],
    usageBn: 'স্টার্ট দেওয়ার সময় করাতটি সমতল স্থলে রেখে চোক ও ডিকম্প্রেশন ভালভ অন করুন। কাটার সময় ব্লেডের দিক সোজা রাখুন এবং ধোঁয়া ও গরম মেটাল স্পার্কের বিপরীত কোণে অবস্থান নিন।',
    usageEn: 'Ignite the saw flat on cleared ground. Stand with feet planted wide, firmly grip two handles, and cut at full RPM to prevent wheel binding or severe bouncing.',
    safetyBn: 'কংক্রিট কাটার সময় সিলিকোসিস এড়াতে পানি স্প্রে আবশ্যক। কাজের সময় মুখের সামনে ক্লিয়ার ফেস শিল্ড ব্যবহার করুন যেন ধাতব কণা চোখের বড় ক্ষতি না করে।',
    safetyEn: 'Continuous cooling water flow is required when dry cutting concrete to minimize silica inhalation. Keep hands away from active spinning inertia.',
    iconName: 'cutter'
  },
  {
    id: 'gas_detector',
    nameBn: 'গ্যাস ডিটেক্টর (Gas Detector)',
    nameEn: 'Gas Detector',
    categoryBn: 'সনাক্তকরণ ও অন্যান্য',
    categoryEn: 'Detection & Others',
    descBn: 'বদ্ধ স্থান, সুড়ঙ্গ, সুয়ারেজ বা শিল্প কারখানায় আগুন লাগার আগে বা পরে বিষাক্ত গ্যাস ও বাতাসের অক্সিজেনের অনুপাত পরিমাপ করার সংবেদনশীল বহনযোগ্য ডিভাইস।',
    descEn: 'Compact, rugged, handheld safety device containing electro-chemical sensors to continuously read gas concentrations and atmospheric safety.',
    specsBn: [
      'সনাক্তকরণ গ্যাসসমূহ: অক্সিজেন (O2), কার্বন মনোক্সাইড (CO), হাইড্রোজেন সালফাইড (H2S), এবং দাহ্য গ্যাস (LEL)',
      'অ্যালার্ম সিস্টেম: ৯৫ ডেসিবেল লাউড হর্ন, উজ্জ্বল এলইডি বিপ এবং ভাইব্রেশন',
      'ব্যাটারি স্থায়িত্ব: একবার ফুল চার্জে একটানা ২৪ ঘণ্টা অপারেশন'
    ],
    specsEn: [
      'Gases Monitored: Oxygen (O2), Carbon Monoxide (CO), Hydrogen Sulfide (H2S), and Combustible Luminous LEL',
      'Warning Alarm: Loud 95dB sounder, flashing red LED strobes, and tactical handle vibration',
      'Battery Rating: Integrated rechargeable lithium-ion core providing up to 24-hour service'
    ],
    usageBn: 'ডিভাইসটি চালু করে বিষাক্ত গ্যাস জোনে প্রবেশের আগেই তা পরিষ্কার বাতাসে ক্যালিব্রেট করে নিন। এটি কাজের সময় ফায়ার স্যুটের বুকের দিকে ক্লিপ করে ঝুলিয়ে রাখুন।',
    usageEn: 'Power up and autozero-calibrate gas readings in completely fresh outdoor air before entry. Clip the monitor to your structural coat near the breathing zone.',
    safetyBn: 'যেকোনো একটি গ্যাসের মান লাল দাগ অতিক্রম করার সাথে সাথে বা অক্সিজেনের শতাংশ ১৯.৫% এর নিচে নামা মাত্রই SCBA অন করুন অথবা কড়া হুইসেল বাজা মাত্র এলাকা ত্যাগ করুন।',
    safetyEn: 'If oxygen values drop below 19.5% or carbon monoxide level hits alert thresholds, immediately transition to pressurized SCBA air or evacuate the basement.',
    iconName: 'detector'
  },
  {
    id: 'pipe_squeezer',
    nameBn: 'পাইপ এক্সকুইজার',
    nameEn: 'Pipe Squeezer',
    categoryBn: 'উদ্ধার কাজ',
    categoryEn: 'Rescue Operations',
    descBn: 'ক্ষতিগ্রস্ত গ্যাস পাইপলাইন, জলবাহী লাইন বা তরল কারখানায় ফায়ার অ্যাক্সিডেন্টের সময় পাইপটি চেপে ধসে দিয়ে প্রবাহ তাৎক্ষণিকভাবে বন্ধ রাখার বিশেষ ক্লাম্প।',
    descEn: 'Heavy-duty manual or hydraulic hand tool designed to squeeze steel, copper, or polymer conduits flat to isolate active fluid or volatile gas leaks.',
    specsBn: [
      'স্কুইজ ক্ষমতা ক্যাপাসিটি: সর্বোচ্চ ৪ ইঞ্চি (১০০ মিমি) ব্যাসের পাইপলাইন',
      'কার্যপ্রণালী: কুইক মেকানিকাল স্ক্রু থ্রেড অথবা পোর্টেবল পাম্প প্রেসার হাইড্রোলিক্স',
      'মেটেরিয়াল: নন-স্পার্ক ব্রোঞ্জ প্রলেপ সম্বলিত হেভি মেটাল বডি'
    ],
    specsEn: [
      'Squeeze Diameter Capacity: Up to 4" (100mm) outer diameter pipe sizing',
      'Operations: Manual heavy lead screw thread or high-capacity manual hydraulic hand pump',
      'Body Material: Anti-spark finish hardened carbon steel frame'
    ],
    usageBn: 'পাইপের লিকের আগে নিরাপদ দূরত্বে ফ্রেমিং সেট করুন। আস্তে আস্তে চাপ দিন যেন পাইপের মূল দেয়াল ফেটে না যায়, বরং সম্পূর্ণ চেপে সংকুচিত হয়ে ভেতরকার প্রবাহ অবরুদ্ধ হয়ে যায়।',
    usageEn: 'Place the clamping brackets a short distance back from the actual open pipe tear. Compress progressive strokes until gas hiss stops entirely.',
    safetyBn: 'দাহ্য গ্যাসের আশেপাশে কাজ করার সময় কোনো ঘর্ষণ বা স্পার্ক হওয়া যাবে না। পাইপ লাইনে কাজ সম্পন্ন হওয়ার পর রিলিজ করার সময় ধীরে ধীরে প্রেসার কমান।',
    safetyEn: 'Absolutely avoid rapid release on gas pipelines to prevent high velocity static spark generation. Inspect clamp plates for structural stress bends.',
    iconName: 'squeezer'
  },
  {
    id: 'chipping_hammer',
    nameBn: 'চিপিং হেমার',
    nameEn: 'Chipping Hammer',
    categoryBn: 'কাটিং ও ভাঙার সরঞ্জাম',
    categoryEn: 'Cutting & Breaker Tools',
    descBn: 'মেঝে, আরসিসি বিমের ধসা কংক্রিট বা ইটের গাঁথুনি নিখুঁতভাবে ভেঙে আটকে পড়া ভিকটিমকে খোঁজার ও উদ্ধার করার বৈদ্যুতিক বা বায়ুচালিত কম্প্যাক্ট ব্রেকার হ্যামার।',
    descEn: 'Medium-weight handheld demolition hammer designed to carefully crumble structural concrete and masonry around trapped disaster casualties.',
    specsBn: [
      'পাওয়ার সোর্স: নিউমেটিক (বায়ুচাপ চালিত) অথবা ২২০ ভোল্ট বৈদ্যুতিক',
      'ইমপ্যাক্ট এনার্জি: ১২ থেকে ১৫ জুলস প্রতি স্ট্রোক',
      'কম্পন দমন: শক্-প্রুফ অ্যান্টি-ভাইব্রেশন হ্যান্ডেল প্রযুক্তি'
    ],
    specsEn: [
      'Power Source: Pneumatic compressed air driven or 220V electric core',
      'Blow Impact Energy: 12 to 15 Joules per piston blow',
      'Vibration Safety: Integrated rubber kinetic suppression dampeners'
    ],
    usageBn: 'চিজেল বা বিটটি মাটির সাথে প্রায় ৭০ ডিগ্রি কোণে অবস্থান করিয়ে কাজ করুন। হ্যামারটির হ্যান্ডেল শক্ত করে দুই হাত দিয়ে ধরে মৃদু নিম্নমুখী প্রেস ক্রমান্বয়ে বজায় রাখুন।',
    usageEn: 'Insert flat or pointed chisel bits. Position the chisel tip at a 70-degree angle to the target surface. Maintain firm downward posture during activation.',
    safetyBn: 'দীর্ঘ সময় চিপিং করার ফলে শরীরে প্রচণ্ড ভাইব্রেশন ক্লান্তি আসে, তাই প্রতি ১৫ মিনিট পরপর কাজের হাত বদল বা বিরতি নিন। সুরক্ষামূলক চশমা ও গ্লাভস ব্যবহার অতি আবশ্যক।',
    safetyEn: 'Prolonged high impact vibrations cause finger fatigue and chronic nerve damage. Swap operators every 15 minutes. Wear thick protective gloves.',
    iconName: 'hammer'
  },
  {
    id: 'rotary_saw',
    nameBn: 'রোটারি রেস্কিউ স',
    nameEn: 'Rotary Rescue Saw',
    categoryBn: 'কাটিং ও ভাঙার সরঞ্জাম',
    categoryEn: 'Cutting & Breaker Tools',
    descBn: 'কাঠ, স্টিল এবং যেকোনো হার্ড ম্যাটেরিয়াল খুব দ্রুত কেটে দুর্ঘটনার সময় কলাপসিবল গেট, ব্যারিকেড বা গাড়ি কেটে পথ বের করে নেওয়ার শক্তিশালী পেশাদার রোটারি করাত।',
    descEn: 'High-power gas circular saw optimized with multi-material diamond and carbide-tipped blades for tactical entry and ventilation.',
    specsBn: [
      'ঘূর্ণন বেগ স্পিড: ৫৪০০ আরপিএম (RPM) এর বেশি স্পিন ক্ষমতা',
      'ব্লেড মান্যতা: কার্বাইড কাটার হুইল, সলিড মেটাল কাটিং হুইল এবং ডায়মন্ড ব্লেড',
      'বিশেষত্ব: কিক-ব্যাক প্রতিরোধক কুইক ব্রেক সেফটি কাভার'
    ],
    specsEn: [
      'Maximum Shaft Speed: Above 5400 RPM structural speed rating',
      'Supported Blades: Structural carbide-tipped demolition disc, silicon abrasive, or diamond grit wheels',
      'Features: Inertia-activated safety guard and quick blade-stop braking technology'
    ],
    usageBn: 'করাতটি কখনই শরীরের বুক বা কাঁধের সমান্তরাল উচ্চতার উপর তুলে চালাবেন না। ঘূর্ণন শুরু হলে কাজ শেষ না হওয়া পর্যন্ত হালকা কিন্তু নিয়মতান্ত্রিক কাটার গতি ও প্রেসার দিন।',
    usageEn: 'Never utilize the saw above shoulder height. Secure maximum workpiece stability. Stand to the left of the saw blade flight line to minimize spark splash.',
    safetyBn: 'করাতটির উপরের ৪ ভাগের ১ ভাগ জোন বা কিক-ব্যাক জোন দিয়ে কাজ করবেন না, কারণ এতে করাতটি ছিটকে আপনার মুখে হানা দিতে পারে (Kickback Hazard)।',
    safetyEn: 'Never let the upper quadrant of the wheel contact hard iron or timber to avoid violent upward kickback towards the operator face.',
    iconName: 'rotary'
  },
  {
    id: 'chainsaw',
    nameBn: 'চেইন স (Chain Saw)',
    nameEn: 'Chain Saw',
    categoryBn: 'কাটিং ও ভাঙার সরঞ্জাম',
    categoryEn: 'Cutting & Breaker Tools',
    descBn: 'ঘূর্ণিঝড়ে উপড়ে পড়া গাছ, বনের অগ্নিকাণ্ড দমনে কাঠের বিম এবং ক্ষতিগ্রস্ত ভবনের অভ্যন্তরীণ বড় কাঠের পিলার কেটে ফোকাস ক্লিয়ার করার বিশেষ দ্রুতগামী চেইন করাত।',
    descEn: 'Engine-driven saw featuring a continuous guide-bar chain fitted with hardened teeth, utilized to harvest blockages, fallen trees, and roof lumber.',
    specsBn: [
      'ইঞ্জিন পাওয়ার সাইজ: ৫০ সিসি থেকে ৭০ সিসি পেট্রোল চালিত ইঞ্জিন',
      'চেইন বার সাইজ: ১৫ থেকে ২০ ইঞ্চি পর্যন্ত কাটার এরিয়া',
      'লুব্রিকেশন মোড: অটোমেটিক গাইডবার অয়েল ফিড সিস্টেম'
    ],
    specsEn: [
      'Displacement Sizing: 50cc to 70cc heavy duty 2-stroke engine',
      'Guide Bar Lengths: 15-inch to 20-inch active cutting surface',
      'Chain Oiler: Automatic micro-metering bar oil pump system with backup reservoirs'
    ],
    usageBn: 'চেইন করাত অন করার পর বাম হাতের বুড়ো আঙুল হ্যান্ডল বা গার্ডে দিয়ে দৃঢ় কড়া গ্রিপ করুন। কাটার সময় করাতটি সোজা রেখে নিচের দিকে চাপ দিন, করাত দোলাবেন না।',
    usageEn: 'Firmly lock your thumb around the handle wrap. Operate at full throttle while starting timber cuts, and immediately release throttle when cutting finishes.',
    safetyBn: 'কাজের সময়ে চেইনের টেনশন বা ঢিলাভাব নিয়মিত চেক করে টাইট করে নিন। ঢিলা চেইন ছুটে গিয়ে ফায়ার ফাইটারের শরীর জখম করতে পারে। চেইন ব্রেক প্রটেকশন পরীক্ষা অপরিহার্য।',
    safetyEn: 'A loose saw chain will derail and cause catastrophic injuries. Stop the engine and check chain tension frequently. Insist on protective chain-saw chaps.',
    iconName: 'chainsaw'
  },
  {
    id: 'wood_cutter',
    nameBn: 'উড কাটার (Wood Cutter)',
    nameEn: 'Wood Cutter',
    categoryBn: 'কাটিং ও ভাঙার সরঞ্জাম',
    categoryEn: 'Cutting & Breaker Tools',
    descBn: 'ভবন ধসে আটক কাঠের আসবাবপত্র, ছাদের ট্রাস এবং গাছের বড় ডালপালা ফাস্ট রেসপন্স স্পিডে কাটার জন্য রেসিপ্রোকেটিং বা স্পেশাল কার্বাইড করাত।',
    descEn: 'Specialized reciprocal and high-capacity portable wood saws optimized to quickly slice structural dry beams, timber joists, and heavy root blockages.',
    specsBn: [
      'উপাদান: শক্ত কার্বাইড ও টাংস্টেন টিপস সমৃদ্ধ ব্লেড',
      'হ্যান্ডেল প্রযুক্তি: ভাইব্রেশন রোধক শক-অ্যাবজরবিং গ্লাসফাইবার হ্যান্ডেল',
      'ওজন বৈশিষ্ট্য: লাইটওয়েট এবং ক্লান্তিহীন দীর্ঘক্ষণ পরিচালনা উপযোগী'
    ],
    specsEn: [
      'Teeth Profile: Hardened carbide or cobalt tungsten tipped teeth construction',
      'Handles: Vibration-dampening ergonomic fiber reinforced composite shafts',
      'Weight Focus: Lightweight design aimed at minimizing joint fatigue during rescue fatigue lines'
    ],
    usageBn: 'কোনো কাঠের খণ্ডে কোনো লোহা বা পেরেক পোঁতা আছে কিনা তা সম্ভব হলে চোখ বুলিয়ে নিন। কাটার গতি ও প্রেশার কাঠটির ঘনত্বের সাথে সামঞ্জস্য রেখে নির্ধারণ করুন।',
    usageEn: 'Inspect the timber workpiece for embedded concrete nails or structural steel wire spikes. Modify swing geometry or stroke speed according to lumber density.',
    safetyBn: 'কাঠ কাটার সময় কাটের কণা চোখে যাতে না পড়ে তার জন্য সেফটি গগলস ব্যবহার করা বাধ্যতামূলক। কাজের সময় আপনার ডানে বা বামে ৩ ফুট ফাঁকা জায়গা রাখুন।',
    safetyEn: 'Flying wood chips and saw sawdust damage sensitive eyes instantly. Always wear protective goggles and maintain a 3-foot clearance safety radius around yourself.',
    iconName: 'wood'
  }
];

const getInitialSeason = (): 'winter' | 'summer' => {
  const date = new Date();
  const month = date.getMonth(); // 0 is Jan, 10 is Nov, 11 is Dec
  const day = date.getDate();
  
  // Nov 16 to Mar 15 is Winter
  if (month === 10 && day >= 16) return 'winter';
  if (month === 11) return 'winter';
  if (month === 0) return 'winter';
  if (month === 1) return 'winter';
  if (month === 2 && day <= 15) return 'winter';
  
  return 'summer';
};

const getInitialDayIndex = (): number => {
  const day = new Date().getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  // Map standard JS day: Sabbath/Sat is 6, Sun is 0, Mon is 1, Tue is 2, Wed is 3, Thu is 4, Fri is 5
  // In our array index mapping: 0: Sat, 1: Sun, 2: Mon, 3: Tue, 4: Wed, 5: Thu, 6: Fri
  if (day === 6) return 0;
  return day + 1;
};

export default function FireFighterGuide({ language, theme }: FireFighterGuideProps) {
  const [activeTab, setActiveTab] = useState<TabType>(null);
  const [isMainExpanded, setIsMainExpanded] = useState(false);
  const [subTab, setSubTab] = useState<SubTabType>('immediate');
  const [selectedSeason, setSelectedSeason] = useState<'winter' | 'summer'>(getInitialSeason());
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(getInitialDayIndex());
  
  const [equipmentSearch, setEquipmentSearch] = useState('');
  const [equipmentCategory, setEquipmentCategory] = useState<'all' | 'ppe' | 'rescue' | 'cutting' | 'detection'>('all');
  const [expandedEquipment, setExpandedEquipment] = useState<string | null>(null);

  const toggleMain = () => {
    setIsMainExpanded(!isMainExpanded);
    if (isMainExpanded) {
      setActiveTab(null);
    }
  };

  const handleTabClick = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const filteredEquipment = EQUIPMENT_DATA.filter(item => {
    // match category
    if (equipmentCategory !== 'all') {
      if (equipmentCategory === 'ppe' && item.categoryEn !== 'Personal Protection') return false;
      if (equipmentCategory === 'rescue' && item.categoryEn !== 'Rescue Operations') return false;
      if (equipmentCategory === 'cutting' && item.categoryEn !== 'Cutting & Breaker Tools') return false;
      if (equipmentCategory === 'detection' && item.categoryEn !== 'Detection & Others') return false;
    }
    // match search query
    if (equipmentSearch.trim() !== '') {
      const q = equipmentSearch.toLowerCase();
      const matchesEn = item.nameEn.toLowerCase().includes(q) || item.descEn.toLowerCase().includes(q);
      const matchesBn = item.nameBn.toLowerCase().includes(q) || item.descBn.toLowerCase().includes(q) || item.nameBn.includes(q) || item.descBn.includes(q);
      return matchesEn || matchesBn;
    }
    return true;
  });

  return (
    <div className="w-full space-y-2 mt-2">
      {/* Target Option Trigger Button */}
      <button
        onClick={toggleMain}
        id="firefighter-guide-trigger"
        className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all relative overflow-hidden group cursor-pointer ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-red-950/40 to-slate-900 border-red-500/20 text-white hover:border-red-500/40 shadow-lg shadow-red-950/10' 
            : 'bg-white border-red-200 text-slate-800 shadow-sm hover:border-red-400'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 relative flex items-center justify-center shrink-0">
            <Flame size={18} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          <div>
            <h4 className="text-xs font-black tracking-tight text-red-500 dark:text-red-400">
              {language === 'bn' ? 'ফায়ার ফাইটার গাইড 🛡️' : 'Fire Fighter Guide 🛡️'}
            </h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
              {language === 'bn' 
                ? 'ফায়ার গাইড, রুটিন এবং অত্যাধুনিক রেসকিউ টুলস সমূহের বিবরণ' 
                : 'Interactive protocols, drill times & professional rescue equipment'}
            </p>
          </div>
        </div>
        <div className={`p-1.5 rounded-lg transition-transform ${theme === 'dark' ? 'bg-[#1e293b]/50' : 'bg-slate-100'} text-slate-500 group-hover:text-red-500`}>
          {isMainExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {/* Main Expander Area */}
      <AnimatePresence>
        {isMainExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`overflow-hidden border rounded-xl divide-y ${
              theme === 'dark' ? 'border-red-950/40 bg-slate-950 divide-slate-800' : 'border-red-100 bg-red-50/10 divide-red-100/50'
            }`}
          >
            {/* 1. FIRE GUIDE TAB BUTTON */}
            <div className="flex flex-col">
              <button
                onClick={() => handleTabClick('guide')}
                className={`w-full p-3.5 flex items-center justify-between text-left text-xs font-bold transition-all ${
                  activeTab === 'guide'
                    ? (theme === 'dark' ? 'bg-red-950/30' : 'bg-red-50')
                    : 'hover:bg-slate-100/30 dark:hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert size={14} className="text-red-500" />
                  <span className={activeTab === 'guide' ? 'text-red-500' : ''}>
                    {language === 'bn' ? '১. অগ্নি নির্বাপণ নির্দেশিকা (Fire Guide)' : '1. Fire Evacuation Guide'}
                  </span>
                </div>
                {activeTab === 'guide' ? <ChevronUp size={12} className="text-red-500" /> : <ChevronDown size={12} className="opacity-60" />}
              </button>

              <AnimatePresence>
                {activeTab === 'guide' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-[#1a0f0f]/10 dark:bg-black/30 p-3 space-y-3"
                  >
                    {/* Intro Alert Box */}
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400 mb-1">
                        <Flame size={14} className="animate-bounce" />
                        <span>{language === 'bn' ? 'ফায়ার ফাইটার হিসেবে জনগণের প্রতি জরুরি নির্দেশনা' : 'Emergency Guidelines for Public'}</span>
                      </div>
                      <p className="italic">
                        {language === 'bn' 
                          ? '“আগুন লাগলে আতঙ্কিত না হয়ে শান্ত মনে পরিস্থিতি মোকাবেলা করা সবচেয়ে বড় ফায়ার ফাইটিং।” একজন ফায়ার ফাইটার হিসেবে আমি আপনাকে নিচের ৫টি বিভাগে সুবিন্যস্ত তথ্যগুলো পুঙ্খানুপুঙ্খ মনে রাখার অনুরোধ করছি।'
                          : '“Facing fire calmly with a clear mind is the ultimate firefighting skill.” As a professional firefighter, I urge you to study these structured safety protocols.'}
                      </p>
                    </div>

                    {/* Sub Tab Navigation */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none sticky top-0 z-10 bg-slate-100/20 p-1 rounded-lg dark:bg-slate-900/40">
                      <button
                        onClick={() => setSubTab('immediate')}
                        className={`px-2 py-1.5 rounded-md text-[9px] font-bold shrink-0 transition-all ${
                          subTab === 'immediate'
                            ? 'bg-red-500 text-white shadow'
                            : 'bg-white/50 dark:bg-slate-800/40 text-slate-500 hover:text-red-500'
                        }`}
                      >
                        {language === 'bn' ? '🚨 ৪ ধাপের সিদ্ধান্ত' : '🚨 4 Steps'}
                      </button>
                      <button
                        onClick={() => setSubTab('classes')}
                        className={`px-2 py-1.5 rounded-md text-[9px] font-bold shrink-0 transition-all ${
                          subTab === 'classes'
                            ? 'bg-red-500 text-white shadow'
                            : 'bg-white/50 dark:bg-slate-800/40 text-slate-500 hover:text-red-500'
                        }`}
                      >
                        {language === 'bn' ? '🔥 সঠিক নেভানোর মাধ্যম' : '🔥 Fire Classes'}
                      </button>
                      <button
                        onClick={() => setSubTab('highrise')}
                        className={`px-2 py-1.5 rounded-md text-[9px] font-bold shrink-0 transition-all ${
                          subTab === 'highrise'
                            ? 'bg-red-500 text-white shadow'
                            : 'bg-white/50 dark:bg-slate-800/40 text-slate-500 hover:text-red-500'
                        }`}
                      >
                        {language === 'bn' ? '🏢 বহুতল ভবন' : '🏢 High-Rise'}
                      </button>
                      <button
                        onClick={() => setSubTab('industrial')}
                        className={`px-2 py-1.5 rounded-md text-[9px] font-bold shrink-0 transition-all ${
                          subTab === 'industrial'
                            ? 'bg-red-500 text-white shadow'
                            : 'bg-white/50 dark:bg-slate-800/40 text-slate-500 hover:text-red-500'
                        }`}
                      >
                        {language === 'bn' ? '🏭 কারখানা গাইড' : '🏭 Factory'}
                      </button>
                      <button
                        onClick={() => setSubTab('extinguisher')}
                        className={`px-2 py-1.5 rounded-md text-[9px] font-bold shrink-0 transition-all ${
                          subTab === 'extinguisher'
                            ? 'bg-red-500 text-white shadow'
                            : 'bg-white/50 dark:bg-slate-800/40 text-slate-500 hover:text-red-500'
                        }`}
                      >
                        {language === 'bn' ? '🧯 এক্সটিংগুইশার রক্ষণাবেক্ষণ' : '🧯 Maintenance'}
                      </button>
                    </div>

                    {/* Sub Tab Panel Content */}
                    <div className="space-y-3.5">
                      {/* SUB TAB 1: IMMEDIATE ACTIONS (4 STEPS) */}
                      {subTab === 'immediate' && (
                        <div className="space-y-3">
                          {/* Step 1 */}
                          <div className="p-3 rounded-lg border border-red-500/20 bg-white dark:bg-slate-950 space-y-1.5 shadow-sm">
                            <span className="text-[10px] uppercase font-black tracking-wider text-red-500 font-mono block">
                              {language === 'bn' ? '১. আগুন লাগার সাথে সাথে প্রাথমিক করণীয় (Immediate Action)' : 'STEP 1: Immediate Action'}
                            </span>
                            <ul className="text-[10.5px] text-slate-650 dark:text-slate-300 space-y-1.5 pl-1">
                              <li className="flex items-start gap-1.5">
                                <span className="text-red-500 font-bold shrink-0">🔊</span>
                                <span>
                                  <strong>{language === 'bn' ? 'চিৎকার করুন:' : 'Shout Danger:'}</strong>{' '}
                                  {language === 'bn' ? '"আগুন", "আগুন" বলে সবাইকে অত্যন্ত সতর্ক করুন।' : '"Fire, Fire!" to alert neighbors and occupants immediately.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-red-500 font-bold shrink-0">📞</span>
                                <span>
                                  <strong>{language === 'bn' ? 'ফায়ার সার্ভিসে কল:' : 'Call Emergency:'}</strong>{' '}
                                  {language === 'bn' ? 'অবিলম্বে ফায়ার সার্ভিসের হটলাইন ১০২ বা জাতীয় জরুরি সেবা ৯৯৯-এ কল করুন।' : 'Instantly call Fire Service Hotline 102 or National emergency services 999.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-red-500 font-bold shrink-0">📍</span>
                                <span>
                                  <strong>{language === 'bn' ? 'ঠিকানা বলুন:' : 'State Location Address:'}</strong>{' '}
                                  {language === 'bn' ? 'আইডেন্টিফাইয়ার, সঠিক অবস্থান, ভবনের নাম এবং আগুনের ধরন পরিষ্কারভাবে জানান।' : 'Provide precise street addresses, nearby landmarks, and fire sources clearly.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-red-500 font-bold shrink-0">🔔</span>
                                <span>
                                  <strong>{language === 'bn' ? 'অ্যালার্ম বাজান:' : 'Trigger Alarm Panel:'}</strong>{' '}
                                  {language === 'bn' ? 'ভবনে ফায়ার অ্যালার্ম সিস্টেম থাকলে ম্যানুয়াল কল পয়েন্ট (Glass Breaker) চেপে তা চালু করুন।' : 'Activate manual call points by breaking and squeezing trigger flaps if available.'}
                                </span>
                              </li>
                            </ul>
                          </div>

                          {/* Step 2 */}
                          <div className="p-3 rounded-lg border border-orange-500/20 bg-white dark:bg-slate-950 space-y-1.5 shadow-sm">
                            <span className="text-[10px] uppercase font-black tracking-wider text-orange-500 font-mono block">
                              {language === 'bn' ? '২. নিরাপদ স্থানান্তর ও জীবন রক্ষা (Evacuation)' : 'STEP 2: Evacuation'}
                            </span>
                            <ul className="text-[10.5px] text-slate-650 dark:text-slate-300 space-y-1.5 pl-1">
                              <li className="flex items-start gap-1.5">
                                <span className="text-orange-500 font-bold shrink-0">🧎‍♀️</span>
                                <span>
                                  <strong>{language === 'bn' ? 'নিচু হয়ে হাঁটুন:' : 'Stay Low to Ground:'}</strong>{' '}
                                  {language === 'bn' ? 'ধোঁয়া থাকলে উপুড় হয়ে বা হামাগুড়ি দিয়ে বাতাসে বুক স্লাইড করে নিচু স্তর দিয়ে বের হন।' : 'Crawl under smoke layers. Safer clean air is always located near floors.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-orange-500 font-bold shrink-0">🧣</span>
                                <span>
                                  <strong>{language === 'bn' ? 'কাপড় ভেজান:' : 'Moist Mask protection:'}</strong>{' '}
                                  {language === 'bn' ? 'সম্ভব হলে নাক-মুখে ভেজা কাপড় বা রুমাল চাপা দিয়ে শ্বাস নিন।' : 'Place a wet cotton cloth or hand towel over mouth and nose to block carbon dust.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-orange-500 font-bold shrink-0">❌</span>
                                <span>
                                  <strong>{language === 'bn' ? 'লিফট বর্জন:' : 'Strictly Avoid Elevators:'}</strong>{' '}
                                  {language === 'bn' ? 'আগুন লাগলে কোনো অবস্থাতেই লিফট ব্যবহার করবেন না, সর্বদা জরুরি সিঁড়ি ব্যবহার করুন।' : 'Never take elevators under flame situations. Concrete fire escapes must be used.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-orange-500 font-bold shrink-0">🚪</span>
                                <span>
                                  <strong>{language === 'bn' ? 'দরজা পরীক্ষা:' : 'Verify Door Temp:'}</strong>{' '}
                                  {language === 'bn' ? 'কোনো বন্ধ দরজা খোলার আগে দরজার হাতল স্পর্শ করে দেখুন তা গরম কিনা। গরম হলে ওপাশে আগুন আছে, বিকল্প রাস্তা খুঁজুন।' : 'Touch door handles with the back of hand first. If hot, fire is present behind; find alternate routes.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-orange-500 font-bold shrink-0">🔒</span>
                                <span>
                                  <strong>{language === 'bn' ? 'আটকে পড়লে:' : 'If Trap Occurs:'}</strong>{' '}
                                  {language === 'bn' ? 'বের হতে না পারলে দরজা-জানালা বন্ধ করে দিন। ভেজা কাপড় উইন্ডো প্যাচে ও দরজার ফাটলে ঢুকিয়ে ধোঁয়া ব্লক করুন। ইশারা বা চিৎকার করে দৃষ্টি আকর্ষণ করুন।' : 'Seal door gaps with wet fabrics to block ingress. Wave bright fabrics out of windows for rescuers.'}
                                </span>
                              </li>
                            </ul>
                          </div>

                          {/* Step 3 */}
                          <div className="p-3 rounded-lg border border-amber-500/20 bg-white dark:bg-slate-950 space-y-1.5 shadow-sm">
                            <span className="text-[10px] uppercase font-black tracking-wider text-amber-500 font-mono block">
                              {language === 'bn' ? '৩. আগুন নেভানোর প্রাথমিক চেষ্টা (Fire Suppression)' : 'STEP 3: Fire Suppression'}
                            </span>
                            <ul className="text-[10.5px] text-slate-650 dark:text-slate-300 space-y-1.5 pl-1">
                              <li className="flex items-start gap-1.5">
                                <span className="text-amber-500 font-bold shrink-0">🧯</span>
                                <span>
                                  <strong>{language === 'bn' ? 'ছোট আগুন:' : 'Early Fire Containment:'}</strong>{' '}
                                  {language === 'bn' ? 'আগুন প্রাথমিক পর্যায়ে এবং ছোট থাকলে ফায়ার এক্সটিংগুইশার (অগ্নি নির্বাপক যন্ত্র) ব্যবহার করুন।' : 'Deploy functional fire extinguishers directly to extinguish early-stage flames.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-amber-500 font-bold shrink-0 font-mono">PASS</span>
                                <span>
                                  <strong>{language === 'bn' ? 'PASS পদ্ধতি:' : 'P.A.S.S Drill Technique:'}</strong>{' '}
                                  {language === 'bn' ? 'P সেফটি পিন টানুন -> A আগুনের উৎসের নিচে তাকাুন -> S হ্যান্ডেল চাপুন -> S এপাশ থেকে ওপাশে স্প্রে করুন।' : 'P (Pull Pin) -> A (Aim base) -> S (Squeeze Trigger) -> S (Sweep nozzle side-to-side).'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-amber-500 font-bold shrink-0">⚡</span>
                                <span>
                                  <strong>{language === 'bn' ? 'উৎস বন্ধ:' : 'Deactivate Sources:'}</strong>{' '}
                                  {language === 'bn' ? 'গ্যাসের সোর্স বন্ধে গ্যাসের সিলিন্ডার ভালভ বন্ধ করুন। বৈদ্যুতিক উৎসে মেইন পাওয়ার সুইচ বন্ধ করুন।' : 'Instantly secure gas valves and switch off mains electrical panels.'}
                                </span>
                              </li>
                            </ul>
                          </div>

                          {/* Step 4 */}
                          <div className="p-3 rounded-lg border border-emerald-500/20 bg-white dark:bg-slate-950 space-y-1.5 shadow-sm">
                            <span className="text-[10px] uppercase font-black tracking-wider text-emerald-500 font-mono block">
                              {language === 'bn' ? '৪. সাধারণ মহড়া ও পারিবারিক প্রস্তুতি (Preparedness)' : 'STEP 4: Family Preparedness'}
                            </span>
                            <ul className="text-[10.5px] text-slate-650 dark:text-slate-300 space-y-1.5 pl-1">
                              <li className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold shrink-0">🔄</span>
                                <span>
                                  <strong>{language === 'bn' ? 'এক্সটিংগুইশার রাখা:' : 'Secure Extinguishers:'}</strong>{' '}
                                  {language === 'bn' ? 'বাসা, অফিস ও গাড়িতে এক্সটিংগুইশার মজুত রাখুন এবং নিয়মিত গ্যাস রিফিলিং নিশ্চিত করুন।' : 'Equip home, car, and workplaces with verified extinguishers. Mandate annual refilling.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold shrink-0">👥</span>
                                <span>
                                  <strong>{language === 'bn' ? 'মহড়া পরিচালনা:' : 'Simulated Fire Drills:'}</strong>{' '}
                                  {language === 'bn' ? 'পরিবার বা সহকর্মীদের নিয়ে বছরে অন্তত দুবার অগ্নি নির্বাপণ ও উদ্ধার মহড়া সম্পাদন করুন।' : 'Perform fire evacuation run simulations twice a year with family or coworkers.'}
                                </span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold shrink-0">🚪</span>
                                <span>
                                  <strong>{language === 'bn' ? 'নিকাশ পথ উন্মুক্ত:' : 'Clear Evacuation Corridors:'}</strong>{' '}
                                  {language === 'bn' ? 'ভবনের জরুরি এক্সিট ডোর বা অ্যাক্সেস সিঁড়ি সবসময় উন্মুক্ত রাখুন; মালামাল স্তূপ করবেন না।' : 'Keep emergency paths, stairs, and balconies fully cleared. Do not dump packages.'}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* SUB TAB 2: CLASSES OF FIRE GRID */}
                      {subTab === 'classes' && (
                        <div className="space-y-3">
                          <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-md text-[9.5px] font-bold text-center text-red-500">
                            {language === 'bn' ? 'আগুনের ধরন এবং আগুন নেভানোর সঠিক মাধ্যম' : 'Fire Classifications & Effective Agents'}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {/* Class A */}
                            <div className="p-3 rounded-lg border border-teal-500/25 bg-white dark:bg-slate-950 space-y-2">
                              <div className="flex items-center justify-between border-b pb-1 border-slate-150 dark:border-slate-800">
                                <span className="text-[11px] font-black text-teal-500 tracking-tight">{language === 'bn' ? 'ক্লাস A (Class A)' : 'Class A'}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-500 font-bold">{language === 'bn' ? 'নিরাপদ' : 'Safe'}</span>
                              </div>
                              <div className="text-[10px] space-y-1">
                                <p><strong className="opacity-60">{language === 'bn' ? 'উৎস / কাঁচামাল:' : 'Source Material:'}</strong> {language === 'bn' ? 'কাঠ, কাগজ, কাপড়, প্লাস্টিক ও কঠিন অবশিষ্টাংশ।' : 'Wood, paper, cloth, plastics and general solids.'}</p>
                                <p><strong className="opacity-60">{language === 'bn' ? 'ব্যবহার্য মাধ্যম:' : 'Correct Agent:'}</strong> <span className="text-emerald-500 font-bold">{language === 'bn' ? 'পানি, শুকনো পাউডার (DCP)' : 'Water pressure, Dry Chemical Powder (DCP)'}</span></p>
                              </div>
                            </div>

                            {/* Class B */}
                            <div className="p-3 rounded-lg border border-rose-500/25 bg-white dark:bg-slate-950 space-y-2">
                              <div className="flex items-center justify-between border-b pb-1 border-slate-150 dark:border-slate-800">
                                <span className="text-[11px] font-black text-rose-500 tracking-tight">{language === 'bn' ? 'ক্লাস B (Class B)' : 'Class B'}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 font-bold">{language === 'bn' ? 'সংবেদনশীল' : 'Flammable'}</span>
                              </div>
                              <div className="text-[10px] space-y-1">
                                <p><strong className="opacity-60">{language === 'bn' ? 'উৎস / কাঁচামাল:' : 'Source Material:'}</strong> {language === 'bn' ? 'তেল, পেট্রোল, কেরোসিন, পেইন্ট ও তরল কেমিক্যাল।' : 'Oil, gasoline, kerosene, paints & chemical solvents.'}</p>
                                <p><strong className="opacity-60">{language === 'bn' ? 'ব্যবহার্য মাধ্যম:' : 'Correct Agent:'}</strong> <span className="text-emerald-500 font-bold">{language === 'bn' ? 'ফোম (Foam), CO₂ গ্যাস, DCP পাউডার' : 'Foam, CO₂ Gas, Dry Powder'}</span></p>
                                <div className="p-1 px-2 rounded bg-red-500/5 text-red-500 border border-red-500/10 text-[9px]">
                                  <strong>⚠️ {language === 'bn' ? 'ভুলেও ছিটাবেন না:' : 'NEVER USE:'}</strong> {language === 'bn' ? 'পানি (তেল পানির ওপর ভেসে আগুন দ্রুত ছড়িয়ে পড়বে)' : 'Water (liquid oil floats causing dramatic explosive spreading)'}
                                </div>
                              </div>
                            </div>

                            {/* Class C */}
                            <div className="p-3 rounded-lg border border-amber-500/25 bg-white dark:bg-slate-950 space-y-2">
                              <div className="flex items-center justify-between border-b pb-1 border-slate-150 dark:border-slate-800">
                                <span className="text-[11px] font-black text-amber-500 tracking-tight">{language === 'bn' ? 'ক্লাস C (Class C)' : 'Class C'}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold">{language === 'bn' ? 'বিস্ফোরক' : 'Explosive Gas'}</span>
                              </div>
                              <div className="text-[10px] space-y-1">
                                <p><strong className="opacity-60">{language === 'bn' ? 'উৎস / কাঁচামাল:' : 'Source Material:'}</strong> {language === 'bn' ? 'গ্যাস (এলপিজি, প্রাকৃতিক মিথেন গ্যাস সিলিন্ডার)।' : 'LPG, Natural Gas cylinder leaks & pressure pipelines.'}</p>
                                <p><strong className="opacity-60">{language === 'bn' ? 'ব্যবহার্য মাধ্যম:' : 'Correct Agent:'}</strong> <span className="text-emerald-500 font-bold">{language === 'bn' ? 'CO₂ গ্যাস, শুকনো পাউডার, গ্যাস কক ভালভ লক' : 'CO₂, Dry Powder, closing supply valves first'}</span></p>
                                <div className="p-1 px-2 rounded bg-red-500/5 text-red-500 border border-red-500/10 text-[9px]">
                                  <strong>⚠️ {language === 'bn' ? 'যা ব্যবহার করবেন না:' : 'NEVER USE:'}</strong> {language === 'bn' ? 'পানি ছিটাবেন না সরাসরি উৎসে।' : 'Direct high water pressure on gas head.'}
                                </div>
                              </div>
                            </div>

                            {/* Class E */}
                            <div className="p-3 rounded-lg border border-blue-500/25 bg-white dark:bg-slate-950 space-y-2">
                              <div className="flex items-center justify-between border-b pb-1 border-slate-150 dark:border-slate-800">
                                <span className="text-[11px] font-black text-blue-500 tracking-tight">{language === 'bn' ? 'ক্লাস E (Class E)' : 'Class E'}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold">{language === 'bn' ? 'শক বিপদ' : 'Shock Hazard'}</span>
                              </div>
                              <div className="text-[10px] space-y-1">
                                <p><strong className="opacity-60">{language === 'bn' ? 'উৎস / কাঁচামাল:' : 'Source Material:'}</strong> {language === 'bn' ? 'বৈদ্যুতিক সকেট, এয়ার কন্ডিশনার, ওয়্যারিং প্যানেল।' : 'Wiring junctions, high voltage appliances, distribution boards.'}</p>
                                <p><strong className="opacity-60">{language === 'bn' ? 'ব্যবহার্য মাধ্যম:' : 'Correct Agent:'}</strong> <span className="text-emerald-500 font-bold">{language === 'bn' ? 'CO₂ গ্যাস, শুকনো কেমিক্যাল পাউডার (DCP)' : 'CO₂ Extinguishers, Dry Chemical Powder'}</span></p>
                                <div className="p-1 px-2 rounded bg-red-500/5 text-red-500 border border-red-500/10 text-[9px]">
                                  <strong>⚠️ {language === 'bn' ? 'যা ব্যবহার করবেন না:' : 'NEVER USE:'}</strong> {language === 'bn' ? 'পানি (তড়িৎ পরিবাহী তরলে মারাত্মক স্পার্ক ও অবধারিত মৃত্যুর ঝুঁকি)' : 'Water (causes heavy electrocution risk and fatal physical currents)'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB TAB 3: HIGH-RISE BUILDINGS PLAN */}
                      {subTab === 'highrise' && (
                        <div className="space-y-3">
                          <div className="p-2 border border-red-500/10 bg-red-500/5 rounded-md flex items-center gap-1.5 text-[9.5px]">
                            <Building size={14} className="text-red-500 shrink-0" />
                            <span className="font-bold">{language === 'bn' ? 'বহুতল বা উচ্চ ভবনের বিশেষ অগ্নি নিরাপত্তা পরিকল্পনা' : 'High-Rise Construction Fire Safety Protocols'}</span>
                          </div>

                          <div className="space-y-2">
                            {/* Point 1 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🚪 {language === 'bn' ? 'জরুরি বহির্গমন সিঁড়ি (Fire Escape)' : 'Fire Escape (Emergency Stairs)'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'ভবনে অন্তত দুটি ফায়ার প্রুফ ও স্মোক প্রুফ জরুরি সিঁড়ি থাকতে হবে। সিঁড়ির দরজাগুলো সবসময় স্বয়ংক্রিয় "পুশ বার" (Push Bar) যুক্ত এবং ভেতরের দিকে সহজে খোলা থাকতে হবে।'
                                  : 'Must feature at least two fire-resistant, smoke-proof concrete stairs. Doors should integrate automatic Push Bars opening inwards only.'}
                              </p>
                            </div>

                            {/* Point 2 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🚫 {language === 'bn' ? 'সিঁড়িঘর উন্মুক্ত রাখা' : 'No Pathway Blocks'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'জরুরি সিঁড়িঘরে কোনো অবস্থাতেই আসবাবপত্র, ময়লার বিন বা অন্য কোনো মালামাল রাখা যাবে না। এটি সার্বক্ষণিক পরিচ্ছন্ন ও উন্মুক্ত রাখতে হবে।'
                                  : 'Absolutely no storage of scrap furniture or waste bins inside evacuation stairs. Pathways must reside completely unobstructed.'}
                              </p>
                            </div>

                            {/* Point 3 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                💧 {language === 'bn' ? 'রাইজার ও স্প্রিঙ্কলার সিস্টেম' : 'Wet Riser & Automated Sprinklers'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'প্রতি তলায় ফায়ার হাইড্রেন্ট বা ভেজা রাইজার (Wet Riser) পয়েন্ট থাকতে হবে। সিলিংয়ে অটোমেটিক স্প্রিঙ্কলার এবং থার্মাল/স্মোক ডিটেক্টর স্থাপন বাধ্যতামূলক।'
                                  : 'Deploy active Wet Riser hydrant valves on every floor. Mount automatic smoke detectors and heat sensing ceilings.'}
                              </p>
                            </div>

                            {/* Point 4 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🛡️ {language === 'bn' ? 'রিফিউজ এরিয়া (Refuge Area)' : 'Safe Refuge Floor'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'বহুতল ভবনে নির্দিষ্ট তলা পর পর একটি বিশেষভাবে সুরক্ষিত খোলা জায়গা বা "রিফিউজ এরিয়া" রাখা বাধ্যতামূলক, যেখানে ফায়ার ফাইটার দল কর্তৃক নিরাপদে উদ্ধার না হওয়া পর্যন্ত মানুষ আশ্রয় নিতে পারে।'
                                  : 'Reserve secure reinforced open zones (Refuge Floor) designated to shield tenants from heat while awaiting fire apparatus.'}
                              </p>
                            </div>

                            {/* Point 5 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🛑 {language === 'bn' ? 'লিফট ম্যানেজমেন্ট' : 'Locked Elevator System'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'আগুন চিহ্নিত হওয়ার সাথে সাথে কেন্দ্রীয় নিয়ন্ত্রণকারী লিফট স্বয়ংক্রিয়ভাবে নিচতলায় অবতরণ করবে এবং বন্ধ লক হয়ে যাবে। আগুন লাগার মুহূর্তে লিফট ব্যবহার কঠোরভাবে নিষিদ্ধ।'
                                  : 'Elevators must trigger a safety shunt down to the basement on detection. Tenant lift usage is entirely banned during alarms.'}
                              </p>
                            </div>

                            {/* Point 6 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                📢 {language === 'bn' ? 'পাবলিক অ্যাড্রেস সিস্টেম' : 'Public Address Broadcasting'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'পুরো ভবনের প্রতিটি পয়েন্টে একযোগে ঘোষণা দেওয়ার লাউডস্পিকার বা পাবলিক অ্যাড্রেস সিস্টেম সক্রিয় রাখতে হবে, যেন হুড়োহুড়ি ছাড়া নির্দেশনা পাঠানো যায়।'
                                  : 'Maintain full-building integrated speaker wiring to broadcast calm exit voice procedures clearly during crisis events.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB TAB 4: INDUSTRIAL SAFETY (GARMENTS/FACTORIES) */}
                      {subTab === 'industrial' && (
                        <div className="space-y-3">
                          <div className="p-2 border border-red-500/10 bg-red-500/5 rounded-md flex items-center gap-1.5 text-[9.5px]">
                            <Factory size={14} className="text-red-500 shrink-0" />
                            <span className="font-bold">{language === 'bn' ? 'গার্মেন্টস ও কলকারখানার বিশেষ ফায়ার সেফটি গাইডলাইন' : 'Industrial & Garments Fire Safety Manual'}</span>
                          </div>

                          <div className="space-y-2">
                            {/* Point 1 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🚒 {language === 'bn' ? 'ফায়ার ফাইটিং টিম গঠন' : 'Certified Firefighting Response Squad'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'মোট কর্মরত শ্রমিকের অন্তত ১৮% থেকে ২৫% কর্মীকে ফায়ার ফাইটিং, রেসকিউ এবং উন্নত প্রাথমিক চিকিৎসা (First Aid) বিষয়ে পেশাদার ফায়ার সার্ভিস দ্বারা প্রশিক্ষণপ্রাপ্ত টিম তৈরি করতে হবে।'
                                  : 'Ensure 18%-25% of the total factory workers receive expert training in fire control, victim search & rescue.'}
                              </p>
                            </div>

                            {/* Point 2 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🏃‍♂️ {language === 'bn' ? 'মহড়া ও ইভাকুয়েশন ড্রিল' : 'Monthly Evacuation Drills'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'প্রতি মাসে অন্তত একবার কারখানার সমস্ত শিফটের স্টাফ ও সাধারণ শ্রমিকদের নিয়ে বাধ্যতামূলক অগ্নি ইভাকুয়েশন ড্রিল বা অগ্নি নির্বাপণ মহড়া পরিচালনা করে রেকর্ড খাতা তৈরি করতে হবে।'
                                  : 'Mandate full evacuation time trials monthly. Document results in safety registrar sheets for public records.'}
                              </p>
                            </div>

                            {/* Point 3 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🟨 {language === 'bn' ? 'অবারিত যাতায়াত পথ (Aisle Marking)' : 'High Visibility Aisle Markings'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'কারখানার উৎপাদন ফ্লোরে চলাচলের প্রধান জরুরি পথগুলো উজ্জ্বল হলুদ রঙ দিয়ে দাগ চিহ্নিত (Aisle Marking) রাখতে হবে। এই পথে কোনো কাপড়, কার্টন বা জটলা রাখা দণ্ডনীয়।'
                                  : 'Paint vital escape pathways with yellow paint. Never block storage packages or clothes bundle on floor lines.'}
                              </p>
                            </div>

                            {/* Point 4 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🔓 {language === 'bn' ? 'লকমুক্ত জরুরি বহির্গমন গেট' : 'Unlocked Active Exit Gates'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'কর্মঘণ্টা চলাকালীন কারখানার কোনো কলাপসিবল গেট বা প্রধান জরুরি এক্সিট ডোর প্যাডলক দিয়ে তালাবদ্ধ রাখা যাবে না। এক্সিট সাইনবোর্ডে ব্যাকআপ ব্যাটারিযুক্ত ইমার্জেন্সি লাইট থাকতে হবে।'
                                  : 'Padlocks are strictly illegal during working shifts. Ensure fluorescent backup rechargeable battery signage lights shine over doors.'}
                              </p>
                            </div>

                            {/* Point 5 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🧪 {language === 'bn' ? 'কেমিক্যাল ও বয়লার নিরাপত্তা' : 'Hazmat & Boiler Pressure Control'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'দাহ্য তরল কেমিক্যাল, সুতার স্তূপ ও হাই-প্রেশার বয়লার রুম মূল উৎপাদন ফ্লোর থেকে কংক্রিট ফায়ারওয়াল বা নিরাপদ দূরত্বে স্থাপন করতে হবে এবং সার্বক্ষণিক চাপ পর্যবেক্ষণ করতে হবে।'
                                  : 'Segregate chemical storages and boilers inside solid brick structures. Mandate continuous PSI pressure relief valve visual checks.'}
                              </p>
                            </div>

                            {/* Point 6 */}
                            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-red-500 flex items-center gap-1">
                                🚨 {language === 'bn' ? 'উচ্চ ডেসিবেল অ্যালার্ম ও সিগন্যাল' : 'Siren Audio & Strobe Lights'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'কারখানার যন্ত্রপাতির উচ্চ আওয়াজকে ছাপিয়ে সংকেত শোনার জন্য উচ্চ হর্ন থাকতে হবে। বধির কর্মীদের সতর্ক করতে লাল ফ্ল্যাশিং স্ট্রব লাইট (ভিজুয়াল সিগন্যাল) বসাতে হবে।'
                                  : 'Install high-power sirens to cut through noise. Equip sewing lines with pulsing red strobe lights for audio-compromised technicians.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB TAB 5: EXTINGUISHER MAINTENANCE RULES */}
                      {subTab === 'extinguisher' && (
                        <div className="space-y-3">
                          <div className="p-2 border border-emerald-500/15 bg-emerald-500/5 rounded-md flex items-center gap-1.5 text-[9.5px]">
                            <Wrench size={14} className="text-emerald-500 shrink-0" />
                            <span className="font-bold">{language === 'bn' ? 'ফায়ার এক্সটিংগুইশার রক্ষণাবেক্ষণের আধুনিক নিয়মাবলি' : 'Fire Extinguisher Maintenance & Checklist'}</span>
                          </div>

                          <div className="space-y-2">
                            {/* Visual Check Category */}
                            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-red-500/10 space-y-2">
                              <span className="text-[10px] font-black tracking-wide text-red-500 block uppercase font-mono">
                                {language === 'bn' ? '১. মাসিক দৃশ্যমান পরিদর্শন (Visual Inspection)' : '1. Monthly Visual Inspection'}
                              </span>

                              <div className="grid grid-cols-1 gap-1.5 text-[9.5px]">
                                <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                  <strong>📊 {language === 'bn' ? 'গেজ রিডিং পরীক্ষা:' : 'Pressure Gauge Indicator:'}</strong>{' '}
                                  {language === 'bn' 
                                    ? 'গেজের প্রেসার সুইটি অবশ্যই মাঝখানের সবুজ (Green) জোনে থাকতে হবে। লাল জোনে চলে গেলে রিফিল বা লিকেজ রিপেয়ার করতে হবে।'
                                    : 'Confirm needle rests accurately inside green zone limits. Red signals flat charge or structural leaks (CO2 types lack gauges, must be weighed).'}
                                </div>

                                <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                  <strong>🔐 {language === 'bn' ? 'লক ও পিন অক্ষত:' : 'Safety Lock Cover & Seal Pin:'}</strong>{' '}
                                  {language === 'bn' 
                                    ? 'এক্সটিংগুইশারের মেটাল সেফটি রিং ও প্লাস্টিক ইন্ডিকেটর সিল সঠিক অবস্থানে লক অবস্থায় টাইট আছে কিনা পরীক্ষা করুন।'
                                    : 'Ensure metallic handle pull pin remains securely locked with its unbroken plastic collar harness seal.'}
                                </div>

                                <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                  <strong>🔌 {language === 'bn' ? 'হোস ও স্প্রে নজেল:' : 'Clean Hose Pathway:'}</strong>{' '}
                                  {language === 'bn' 
                                    ? 'হোস পাইপে ফেটে যাওয়া মাকড়সার জাল বা ব্লকেজ আছে কিনা পরীক্ষা করে পাইপের পথ পরিষ্কার রাখুন।'
                                    : 'Inspect rubber discharge line for cracking, spider blockages or physical sediment residue.'}
                                </div>

                                <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                  <strong>📍 {language === 'bn' ? 'ঝুলানোর উচ্চতা:' : 'Wall Mounting Height:'}</strong>{' '}
                                  {language === 'bn' 
                                    ? 'সহজে সবার চোখে পড়ার মতো জায়গায় মেঝে থেকে ৩.৫ ফুট থেকে সর্বোচ্চ ৫ ফুট উচ্চতায় কাঠের বা মেটাল ব্র্যাকেটে ঝুলিয়ে রাখুন।'
                                    : 'Mount on easily noticeable walls on brackets at heights which measure exactly 3.5 to 5 feet off floorboards.'}
                                </div>
                              </div>
                            </div>

                            {/* Powders check */}
                            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-emerald-500 flex items-center gap-1">
                                🔄 {language === 'bn' ? 'ঝাঁকুনি দেওয়া (DCP পাউডার সিলিন্ডার)' : 'Aerating Extinguisher Powder'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'ড্রাই কেমিক্যাল পাউডার (DCP) এক্সটিংগুইশারের ভেতরের পাউডার যেন জমাট বেঁধে শক্ত পাথর না হয়ে যায়, সেজন্য প্রতি মাসে অন্তত একবার সিলিন্ডারটি উল্টো করে অন্তত ৪/৫ বার হালকা ঝাঁকিয়ে নিন।'
                                  : 'Invert Dry Chemical Powder cylinders four to five times monthly. This stops internal chemicals from compacting into solid stones.'}
                              </p>
                            </div>

                            {/* Service check */}
                            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-emerald-500 flex items-center gap-1">
                                📆 {language === 'bn' ? 'বার্ষিক ডিলার সার্ভিস ও হাইড্রোস্ট্যাটিক টেস্ট' : 'Annual Dealers Service'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'বছরে অন্তত একবার অনুমোদিত ফায়ার সেফটি ডিলারের মাধ্যমে সিলিন্ডারের কার্যক্ষমতা পরীক্ষা ও মেটাল শেলে উচ্চ চাপ সহনশীলতার হাইড্রোস্ট্যাটিক টেস্ট করাতে হবে।'
                                  : 'Force certified fire apparatus dealers to conduct deep inspection tests and mandate cylinder hydrostatic body trials.'}
                              </p>
                            </div>

                            {/* Refilling rules */}
                            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-emerald-500 flex items-center gap-1">
                                🧯 {language === 'bn' ? 'আংশিক ব্যবহারে অবিলম্বে পুনরায় পূরণ' : 'Post-Discharge Refilling'}
                              </span>
                              <p className="text-slate-550 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'এক্সটিংগুইশারটি একবার আংশিক বা ২ সেকেন্ডের জন্য ব্যবহার হলেও তা ফেলে না রেখে অবিলম্বে নতুন করে মিক্সচার লোড ও রিফিল করুন। স্বাভাবিক মেয়াদের (Expiry Date) শেষ হওয়ার আগেই রিফিল করা বাধ্যতামূলক।'
                                  : 'Discharging a cylinder even for 2 seconds voids back-pressure. Always completely refill after every single usage.'}
                              </p>
                            </div>

                            {/* Card Tag */}
                            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-800 text-[10px] space-y-1">
                              <span className="font-bold text-emerald-500 flex items-center gap-1">
                                📝 {language === 'bn' ? 'পরিদর্শন কার্ড বা ট্যাগ (Inspection Tag)' : 'Active Logger Card Tag'}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                                {language === 'bn' 
                                  ? 'প্রতিটি এক্সটিংগুইশারের হ্যান্ডেল ক্যাচে একটি ভারী পরিদর্শন কার্ড বা ট্যাগ ঝুলিয়ে রাখুন, যেখানে প্রতি মাসের পরিদর্শনের ফলাফল, তারিখ এবং পরিদর্শকের স্বাক্ষর স্পষ্টভাবে লিপিবদ্ধ থাকবে।'
                                  : 'Tie waterproof visual cardboard register tags onto handles noting accurate monthly test dates and signature fields.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Warning */}
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 italic text-center mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {language === 'bn' 
                        ? '“আইন মেনে নিয়ম পালন করুন, বড় ক্ষয়ক্ষতি রুখে পরিবারকে নিরাপদ রাখুন।”' 
                        : '"Following fire prevention parameters is an ethical and legal obligation."'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. FIRE FIGHTER ROUTINE TAB BUTTON */}
            <div className="flex flex-col">
              <button
                onClick={() => handleTabClick('routine')}
                className={`w-full p-3.5 flex items-center justify-between text-left text-xs font-bold transition-all ${
                  activeTab === 'routine'
                    ? (theme === 'dark' ? 'bg-red-950/30' : 'bg-red-50')
                    : 'hover:bg-slate-100/30 dark:hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock size={14} className="text-red-500" />
                  <span className={activeTab === 'routine' ? 'text-red-500' : ''}>
                    {language === 'bn' ? '২. ফায়ার ফাইটার রুটিন (Fighter Routine)' : '2. Fire Fighter Daily Routine'}
                  </span>
                </div>
                {activeTab === 'routine' ? <ChevronUp size={12} className="text-red-500" /> : <ChevronDown size={12} className="opacity-60" />}
              </button>

              <AnimatePresence>
                {activeTab === 'routine' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-[#1a0f0f]/20 dark:bg-black/40 p-3.5 space-y-4"
                  >
                    {/* Season Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900/65 p-1 rounded-lg border border-slate-200/50 dark:border-slate-800">
                      <button
                        onClick={() => {
                          setSelectedSeason('winter');
                          setSelectedDayIndex(0); // reset to Saturday to avoid out of bounds
                        }}
                        className={`py-2 px-2.5 rounded-md text-center text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                          selectedSeason === 'winter'
                            ? 'bg-red-500 text-white shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        <Calendar size={12} />
                        <span className="truncate font-sans">
                          {language === 'bn' ? '❄️ শীতকালীন রুটিন (১৬ নভেম্বর- ১৫ মার্চ)' : '❄️ Winter Routine (16 Nov - 15 Mar)'}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSeason('summer');
                          setSelectedDayIndex(0); // reset to Saturday to avoid out of bounds
                        }}
                        className={`py-2 px-2.5 rounded-md text-center text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                          selectedSeason === 'summer'
                            ? 'bg-red-500 text-white shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        <Calendar size={12} />
                        <span className="truncate font-sans">
                          {language === 'bn' ? '☀️ গ্রীষ্মকালীন রুটিন (১৬ মার্চ- ১৫ নভেম্বর)' : '☀️ Summer Routine (16 Mar - 15 Nov)'}
                        </span>
                      </button>
                    </div>

                    {/* Day Selection Tabs (Sat - Fri) */}
                    <div className="flex gap-1 overflow-x-auto pb-1.5 scrollbar-none">
                      {(selectedSeason === 'winter' ? WINTER_ROUTINE : SUMMER_ROUTINE).map((routine, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedDayIndex(idx)}
                          className={`flex-1 py-1.5 px-3 min-w-[55px] text-center rounded-md text-[10px] font-medium transition-all ${
                            selectedDayIndex === idx
                              ? 'bg-red-500/10 dark:bg-red-500/20 text-red-500 border border-red-500/30 font-bold'
                              : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-350 border border-slate-150 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900'
                          }`}
                        >
                          {language === 'bn' ? routine.dayShortBn : routine.dayShortEn}
                        </button>
                      ))}
                    </div>

                    {/* Timeline Container */}
                    <div className="p-3.5 rounded-xl border border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-950/60 shadow-sm space-y-4">
                      {/* Active Day Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-2">
                        <span className="text-[11px] font-black tracking-wide text-red-500 uppercase flex items-center gap-1.5">
                          <Clock size={13} />
                          {language === 'bn' 
                            ? `${(selectedSeason === 'winter' ? WINTER_ROUTINE : SUMMER_ROUTINE)[selectedDayIndex]?.dayBn || 'রুটিন'} রুটিন` 
                            : `${(selectedSeason === 'winter' ? WINTER_ROUTINE : SUMMER_ROUTINE)[selectedDayIndex]?.dayEn || 'Schedule'} Schedule`}
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-mono">
                          {selectedSeason === 'winter' 
                            ? (language === 'bn' ? 'শীতকালীন' : 'Winter') 
                            : (language === 'bn' ? 'গ্রীষ্মকালীন' : 'Summer')}
                        </span>
                      </div>

                      {/* Timeline Slots */}
                      <div className="relative pl-3 border-l-2 border-red-500/20 space-y-3.5">
                        {((selectedSeason === 'winter' ? WINTER_ROUTINE : SUMMER_ROUTINE)[selectedDayIndex]?.slots || []).map((slot, sIdx) => (
                          <div key={sIdx} className="relative group text-[10px]">
                            {/* Dot */}
                            <div className={`absolute -left-[16.5px] top-1.5 w-2 h-2 rounded-full transition-transform group-hover:scale-125 ${
                              slot.isBold 
                                ? 'bg-red-500 ring-4 ring-red-500/20 animate-pulse' 
                                : 'bg-slate-300 dark:bg-slate-700'
                            }`} />

                            <div className={`transition-all rounded-lg ${
                              slot.isBold 
                                ? 'p-2.5 bg-red-500/5 hover:bg-red-500/10 border border-red-500/15 ring-1 ring-red-500/5' 
                                : 'p-1 hover:pl-2'
                            }`}>
                              {/* Time Label */}
                              <div className="flex items-center gap-2">
                                <span className={`font-black font-mono tracking-wider ${
                                  slot.isBold ? 'text-red-500 text-[10.5px]' : 'text-slate-400 dark:text-slate-500'
                                }`}>
                                  {slot.time}
                                </span>
                                {slot.isBold && (
                                  <span className="text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-red-500 text-white font-mono scale-[0.85] origin-left">
                                    {language === 'bn' ? 'বাস্তব অনুশীলন' : 'Core Drill'}
                                  </span>
                                )}
                              </div>

                              {/* Title / Info */}
                              <span className={`block mt-0.5 leading-relaxed ${
                                slot.isBold 
                                  ? 'font-bold text-slate-850 dark:text-white text-[10.5px]' 
                                  : 'text-slate-650 dark:text-slate-300 font-medium'
                              }`}>
                                {language === 'bn' ? slot.titleBn : slot.titleEn}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Operational Alert Box */}
                    <div className="p-3 bg-red-500/5 dark:bg-red-500/10 border border-red-500/15 rounded-lg flex gap-2.5 items-start text-[9.5px]">
                      <ShieldAlert size={14} className="text-red-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <strong className="text-red-500 font-bold">
                          {language === 'bn' ? '৬০ সেকেন্ডের স্ট্যান্ডবাই টার্ন-আউট লক্ষ্য!' : 'Strict 60-Second Turn-Out Protocol!'}
                        </strong>
                        <p className="text-slate-500 dark:text-slate-400 leading-normal font-medium">
                          {language === 'bn'
                            ? 'স্টেশনের অ্যালার্ম বাজার সাথে সাথে সর্বোচ্চ ৬০ সেকেন্ডের মধ্যে অগ্নি নির্বাপক দল রেডি হয়ে রাস্তায় রওনা হতে বাধ্য।'
                            : 'From general emergency alarm bell sounding, duty crew must mobilize and depart the base gates within 60 seconds.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. FIRE EQUIPMENT TAB BUTTON */}
            <div className="flex flex-col">
              <button
                onClick={() => handleTabClick('equipment')}
                className={`w-full p-3.5 flex items-center justify-between text-left text-xs font-bold transition-all ${
                  activeTab === 'equipment'
                    ? (theme === 'dark' ? 'bg-red-950/30' : 'bg-red-50')
                    : 'hover:bg-slate-100/30 dark:hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Wrench size={14} className="text-red-500" />
                  <span className={activeTab === 'equipment' ? 'text-red-500' : ''}>
                    {language === 'bn' ? '৩. অগ্নি সুরক্ষার সরঞ্জাম (Fire Equipment)' : '3. Advanced Rescue Equipment'}
                  </span>
                </div>
                {activeTab === 'equipment' ? <ChevronUp size={12} className="text-red-500" /> : <ChevronDown size={12} className="opacity-60" />}
              </button>

              <AnimatePresence>
                {activeTab === 'equipment' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-[#1a0f0f]/5 dark:bg-black/35 p-3.5 space-y-3.5"
                  >
                    {/* Search & Category Filter Headers */}
                    <div className="space-y-2">
                      <div className="relative flex items-center">
                        <span className="absolute left-2.5 text-slate-400 dark:text-slate-500 flex items-center">
                          <Search size={12} />
                        </span>
                        <input
                          type="text"
                          value={equipmentSearch}
                          onChange={(e) => setEquipmentSearch(e.target.value)}
                          placeholder={language === 'bn' ? 'সরঞ্জাম খুঁজুন... (SCBA, পাওয়ার কাটার, স্যুট ইত্যাদি)' : 'Search equipment... (SCBA, Power Cutter, Suit, etc.)'}
                          className={`w-full text-[10px] pl-8 pr-7 py-1.5 rounded-lg border text-slate-800 dark:text-slate-205 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all ${
                            theme === 'dark'
                              ? 'border-slate-800 bg-slate-950 text-slate-200 focus:border-red-500'
                              : 'border-slate-200 bg-white text-slate-800 focus:border-red-400'
                          }`}
                        />
                        {equipmentSearch && (
                          <button 
                            onClick={() => setEquipmentSearch('')}
                            className="absolute right-2.5 text-[9px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Category Selector Pills */}
                      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[8.5px] font-bold">
                        {[
                          { id: 'all', bn: 'সব সরঞ্জাম 🛡️', en: 'All Equipment 🛡️' },
                          { id: 'ppe', bn: 'ব্যক্তিগত সুরক্ষা', en: 'Personal Protection' },
                          { id: 'rescue', bn: 'উদ্ধার কাজ', en: 'Rescue Tools' },
                          { id: 'cutting', bn: 'কাটা ও ভাঙা', en: 'Cutting & Sawing' },
                          { id: 'detection', bn: 'সনাক্তকরণ ও অন্যান্য', en: 'Detection & Misc' }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setEquipmentCategory(cat.id as any)}
                            className={`px-2.5 py-1 rounded-full transition-all shrink-0 cursor-pointer ${
                              equipmentCategory === cat.id
                                ? 'bg-red-500 text-white font-black shadow-sm'
                                : theme === 'dark'
                                  ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                                  : 'bg-white border border-slate-200 text-slate-650 hover:bg-slate-50'
                            }`}
                          >
                            {language === 'bn' ? cat.bn : cat.en}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Equipment Card Streams */}
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {filteredEquipment.length === 0 ? (
                        <div className={`text-center py-8 rounded-xl border border-dashed ${
                          theme === 'dark' ? 'border-slate-800 bg-slate-950/40 text-slate-500' : 'border-slate-200 bg-white/60 text-slate-400'
                        }`}>
                          <p className="text-[10px] font-medium leading-relaxed">
                            {language === 'bn' ? 'দুঃখিত, কোনো সরঞ্জাম খুঁজে পাওয়া যায়নি! অনুগ্রহ করে অন্য কী-ওয়ার্ড ব্যবহার করুন।' : 'No equipment matches your search key! Please verify keywords & try again.'}
                          </p>
                        </div>
                      ) : (
                        filteredEquipment.map((item) => {
                          const isExpanded = expandedEquipment === item.id;
                          
                          // Set visual color indicators and corresponding icon layouts safely
                          let icon = <Wrench size={12} className="text-red-500 dark:text-red-400" />;
                          let badgeStyle = 'text-red-500 bg-red-500/5 dark:bg-red-500/10 border border-red-500/10';
                          
                          if (item.iconName === 'breath') {
                            icon = <Activity size={12} className="text-cyan-500" />;
                            badgeStyle = 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/10';
                          } else if (item.iconName === 'heat') {
                            icon = <Flame size={12} className="text-emerald-500" />;
                            badgeStyle = 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10';
                          } else if (item.iconName === 'suit') {
                            icon = <Shield size={12} className="text-orange-500" />;
                            badgeStyle = 'text-orange-600 dark:text-orange-400 bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10';
                          } else if (item.iconName === 'ladder') {
                            icon = <Building size={12} className="text-emerald-650 dark:text-emerald-400" />;
                            badgeStyle = 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10';
                          } else if (item.iconName === 'spreader') {
                            icon = <Wrench size={12} className="text-purple-500 dark:text-purple-400" />;
                            badgeStyle = 'text-purple-600 dark:text-purple-400 bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/10';
                          } else if (item.iconName === 'jack') {
                            icon = <CornerDownRight size={12} className="text-amber-500 dark:text-amber-400" />;
                            badgeStyle = 'text-amber-600 dark:text-amber-400 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10';
                          } else if (item.iconName === 'cutter') {
                            icon = <Wrench size={12} className="text-rose-500 dark:text-rose-400" />;
                            badgeStyle = 'text-rose-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/10';
                          } else if (item.iconName === 'detector') {
                            icon = <AlertTriangle size={12} className="text-indigo-500 dark:text-indigo-400" />;
                            badgeStyle = 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/10';
                          } else if (item.iconName === 'squeezer') {
                            icon = <Wrench size={12} className="text-sky-500 dark:text-sky-400" />;
                            badgeStyle = 'text-sky-600 dark:text-sky-400 bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/10';
                          } else if (item.iconName === 'hammer') {
                            icon = <Wrench size={12} className="text-stone-555 text-stone-500 dark:text-stone-400" />;
                            badgeStyle = 'text-stone-600 dark:text-stone-400 bg-stone-500/5 dark:bg-stone-500/10 border border-stone-500/10';
                          } else if (item.iconName === 'rotary') {
                            icon = <Wrench size={12} className="text-pink-500" />;
                            badgeStyle = 'text-pink-600 dark:text-pink-400 bg-pink-500/5 dark:bg-pink-500/10 border border-pink-500/10';
                          } else if (item.iconName === 'chainsaw') {
                            icon = <Workflow size={12} className="text-yellow-500 dark:text-yellow-400" />;
                            badgeStyle = 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/5 dark:bg-yellow-500/10 border border-yellow-500/10';
                          } else if (item.iconName === 'wood') {
                            icon = <Flame size={12} className="text-teal-500 dark:text-teal-400" />;
                            badgeStyle = 'text-teal-650 dark:text-teal-400 bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/10';
                          }

                          return (
                            <div 
                              key={item.id}
                              className={`rounded-xl border transition-all duration-200 text-[10px] ${
                                isExpanded 
                                  ? 'border-red-500/30 bg-white dark:bg-slate-950 shadow-md shadow-red-500/5 ring-1 ring-red-500/5' 
                                  : theme === 'dark'
                                    ? 'border-slate-850 bg-[#0c1328]/30 hover:border-slate-700'
                                    : 'border-slate-150 bg-white hover:border-slate-300 shadow-sm'
                              }`}
                            >
                              {/* Card Trigger Row */}
                              <button
                                onClick={() => setExpandedEquipment(isExpanded ? null : item.id)}
                                className="w-full flex items-start justify-between p-3 text-left focus:outline-none cursor-pointer"
                              >
                                <div className="flex gap-2.5 pr-2 items-start">
                                  <div className={`p-2 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                                    theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200/50'
                                  }`}>
                                    {icon}
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <h5 className="font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                                        {language === 'bn' ? item.nameBn : item.nameEn}
                                      </h5>
                                      <span className={`text-[8px] px-2 py-0.2 rounded-full font-extrabold uppercase shrink-0 ${badgeStyle}`}>
                                        {language === 'bn' ? item.categoryBn : item.categoryEn}
                                      </span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 leading-normal text-[9.5px]">
                                      {language === 'bn' ? item.descBn : item.descEn}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-slate-400 dark:text-slate-500 p-1 bg-slate-50 dark:bg-slate-900/40 rounded-md shrink-0">
                                  {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </div>
                              </button>

                              {/* Card Detailed Sections (Accordion Body) */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/80 p-3 rounded-b-xl space-y-3 text-[9.5px]"
                                  >
                                    {/* Specifications */}
                                    <div className={`p-2.5 rounded-lg border ${
                                      theme === 'dark' ? 'bg-slate-900/40 border-slate-850' : 'bg-white border-slate-100'
                                    } space-y-1.5`}>
                                      <span className="font-bold text-red-500 dark:text-red-400 block tracking-wide flex items-center gap-1 font-sans">
                                        📋 {language === 'bn' ? 'প্রধান কারিগরি বৈশিষ্ট্যসমূহ (Specifications)' : 'Primary Technical Specifications'}
                                      </span>
                                      <ul className="list-disc pl-4.5 space-y-1 text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                                        {(language === 'bn' ? item.specsBn : item.specsEn).map((spec, sIdx) => (
                                          <li key={sIdx}>{spec}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Guidelines */}
                                    <div className={`p-2.5 rounded-lg border ${
                                      theme === 'dark' ? 'bg-slate-900/40 border-slate-850' : 'bg-white border-slate-100'
                                    } space-y-1.5`}>
                                      <span className="font-bold text-blue-500 dark:text-blue-400 block tracking-wide flex items-center gap-1 font-sans">
                                        🛠️ {language === 'bn' ? 'ব্যবহারের নির্দেশাবলী ও পরিচালনা গাইড' : 'Operating Guidelines & Deployment'}
                                      </span>
                                      <p className="text-slate-655 dark:text-slate-350 leading-relaxed pl-2 border-l-2 border-blue-500/40 font-semibold text-[9.5px]">
                                        {language === 'bn' ? item.usageBn : item.usageEn}
                                      </p>
                                    </div>

                                    {/* Safety precautions */}
                                    <div className="p-2.5 rounded-lg border bg-amber-500/5 border-amber-500/10 space-y-1.5">
                                      <span className="font-bold text-amber-600 dark:text-amber-400 block tracking-wide flex items-center gap-1 font-sans">
                                        🛡️ {language === 'bn' ? 'জরুরি নিরাপত্তা সতর্কতা ও সুরক্ষামূলক টিপস' : 'Rescuer Safety Precautions & Pro Tips'}
                                      </span>
                                      <p className="text-slate-655 dark:text-slate-350 leading-relaxed pl-2 border-l-2 border-amber-500/40 font-semibold text-[9.5px]">
                                        {language === 'bn' ? item.safetyBn : item.safetyEn}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
