/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Droplet,
  Search,
  Plus,
  Phone,
  MapPin,
  Calendar,
  X,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  Heart
} from 'lucide-react';
import { Language, BloodDonor, EmergencyRequest } from '../types';
import { EN_TRANSLATIONS, BN_TRANSLATIONS } from '../data/translations';

interface BloodDonateModuleProps {
  language: Language;
  donors: BloodDonor[];
  requests: EmergencyRequest[];
  onAddDonor: (d: Omit<BloodDonor, 'id'>) => void;
  onAddRequest: (r: Omit<EmergencyRequest, 'id' | 'date'>) => void;
  theme: 'light' | 'dark';
}

export default function BloodDonateModule({
  language,
  donors,
  requests,
  onAddDonor,
  onAddRequest,
  theme
}: BloodDonateModuleProps) {
  const t = language === 'en' ? EN_TRANSLATIONS : BN_TRANSLATIONS;

  // Local toggles and searches
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');

  // Form display modals
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Adding donor state fields
  const [donorName, setDonorName] = useState('');
  const [donorGroup, setDonorGroup] = useState('O+');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorLocation, setDonorLocation] = useState('');
  const [donorLastDate, setDonorLastDate] = useState('');
  const [donorAvailable, setDonorAvailable] = useState(true);

  // Blood request state fields
  const [reqGroup, setReqGroup] = useState('A+');
  const [reqLocation, setReqLocation] = useState('');
  const [reqPhone, setReqPhone] = useState('');
  const [reqNotes, setReqNotes] = useState('');

  // Toast / Dial simulator states
  const [dialingPhone, setDialingPhone] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Distillation of blood groups and locations for search filters
  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  // Extrapolate list of districts from our active donor list to keep it smart!
  const districts = ['All', 'Dhaka', 'Chattogram', 'Sylhet', 'Khulna', 'Rajshahi', 'Barishal', 'Rangpur', 'Gazipur', 'Narayanganj', 'Comilla'];

  // FILTER LOGIC
  const filteredDonors = donors.filter((donor) => {
    const textFieldsMatch = 
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      donor.location.toLowerCase().includes(searchQuery.toLowerCase());

    const bloodGroupMatch = selectedBloodGroup === 'All' || donor.bloodGroup === selectedBloodGroup;

    const districtMatch = 
      selectedDistrict === 'All' || 
      donor.location.toLowerCase().includes(selectedDistrict.toLowerCase());

    return textFieldsMatch && bloodGroupMatch && districtMatch;
  });

  const handleDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorPhone || !donorLocation) return;

    onAddDonor({
      name: donorName,
      bloodGroup: donorGroup,
      location: donorLocation,
      mobile: donorPhone,
      available: donorAvailable,
      lastDonationDate: donorLastDate || "2026-05-01"
    });

    // Reset fields
    setDonorName('');
    setDonorPhone('');
    setDonorLocation('');
    setDonorLastDate('');
    setDonorAvailable(true);
    setShowDonorForm(false);
    showToast(language === 'en' ? "Thank you for registering as a life-saving donor!" : "রক্তদাতা হিসেবে মূল্যবান নিবন্ধনের জন্য আপনাকে ধন্যবাদ!");
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqLocation || !reqPhone) return;

    onAddRequest({
      bloodGroup: reqGroup,
      location: reqLocation,
      contactNumber: reqPhone,
      notes: reqNotes
    });

    // Reset fields
    setReqLocation('');
    setReqPhone('');
    setReqNotes('');
    setShowRequestForm(false);
    showToast(language === 'en' ? "Blood requirement broadcast has been published!" : "রক্তের রিকুয়েস্টটি সক্রিয়ভাবে পাবলিশ করা হয়েছে!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const triggerCallSim = (num: string) => {
    setDialingPhone(num);
    try {
      const sanitized = num.replace(/[\s-()]/g, '');
      window.location.href = `tel:${sanitized}`;
    } catch (e) {
      console.warn("Direct native dial failed:", e);
    }
    setTimeout(() => {
      setDialingPhone(null);
    }, 3800);
  };

  return (
    <div className="space-y-5 p-4 pb-16 relative">
      {/* Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 right-4 z-50 p-3 bg-red-600 text-white rounded-2xl shadow-xl flex items-center gap-2.5"
          >
            <CheckCircle size={18} className="shrink-0 text-white" />
            <span className="text-xs font-bold leading-tight">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BANNER BROADCAST ROW */}
      <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-red-700 to-rose-600 text-white shadow-xl">
        <div className="relative z-10 space-y-2 leading-tight">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-white/20 text-white font-mono tracking-wider">
            🚨 {language === 'en' ? "EMERGENCY BLOOD POOL" : "লাইভ রক্তের রিকুয়েস্ট পুল"}
          </div>
          <h3 className="text-lg font-black tracking-tight">{t.bloodDonateTitle}</h3>
          <p className="text-xs opacity-90 leading-relaxed pr-3">
            {language === 'en' 
              ? "Instantly reach donors list or register yourself to unlock help for local patients."
              : "আপনার এলাকা ও রক্তের গ্রুপ নির্বাচন করে রিকুয়েস্ট পাবলিশ করুন অথবা কল করুন।"}
          </p>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => setShowRequestForm(true)}
              id="btn-open-request-blood"
              className="py-2 px-3 bg-white text-rose-700 font-bold text-xs rounded-xl hover:bg-slate-50 shadow transition-colors"
            >
              + {language === 'en' ? "Request Blood" : "রক্তের রিকুয়েস্ট"}
            </button>
            <button
              onClick={() => setShowDonorForm(true)}
              id="btn-open-register-donor"
              className="py-2 px-3 bg-white/20 text-white font-semibold text-xs rounded-xl hover:bg-white/30 transition-colors"
            >
              ♥ {t.becomeDonorBtn}
            </button>
          </div>
        </div>
        <div className="absolute right-[-15px] bottom-[-15px] opacity-15 text-white pointer-events-none w-32 h-32">
          <Heart className="w-full h-full" />
        </div>
      </div>

      {/* FILTER PANEL SECTION */}
      <div className={`p-4 rounded-2xl border space-y-3.5 ${
        theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
      }`}>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-rose-500" />
          <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
            {language === 'en' ? "Smart Directory Matcher" : "রক্তদাতা ডিরেক্টরি ফিল্টার"}
          </h4>
        </div>

        {/* Search */}
        <div className={`relative rounded-xl ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-55">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder={t.bloodSearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-transparent outline-none"
            id="search-donors"
          />
        </div>

        {/* Select Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Blood group selection dropdown */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold opacity-60 uppercase">{t.filterBloodGroup}</label>
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className={`w-full text-xs p-2 rounded-lg border outline-none ${
                theme === 'dark' ? 'bg-[#15234d] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
              id="select-filter-bg"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg === 'All' ? t.all : bg}</option>
              ))}
            </select>
          </div>

          {/* District Select */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold opacity-60 uppercase">{t.filterDistrict}</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className={`w-full text-xs p-2 rounded-lg border outline-none ${
                theme === 'dark' ? 'bg-[#15234d] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {districts.map((d) => (
                <option key={d} value={d}>{d === 'All' ? t.all : d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ACTIVE EMERGENCY BROADCASTS LISTS */}
      {requests.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold tracking-widest text-red-500 uppercase flex items-center gap-1.5 animate-pulse">
            <AlertCircle size={13} /> {t.recentReqs}
          </h4>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin snap-x">
            {requests.map((req) => (
              <div
                key={req.id}
                className={`snap-center min-w-[250px] max-w-[270px] shrink-0 p-3.5 rounded-2xl border border-red-500/25 ${
                  theme === 'dark' ? 'bg-gradient-to-tr from-red-950/20 to-[#0f1b3b]' : 'bg-red-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-xs font-black bg-red-600 text-white font-mono">
                    {req.bloodGroup}
                  </span>
                  <span className="text-[10px] font-medium opacity-50 flex items-center gap-1">
                    <Clock size={10} /> Active
                  </span>
                </div>

                <p className="text-[11px] font-bold mt-2 text-slate-850 dark:text-slate-150 truncate">
                  📍 {req.location}
                </p>

                {req.notes && (
                  <p className="text-[10px] opacity-75 line-clamp-1 italic mt-1 leading-normal">
                    &ldquo;{req.notes}&rdquo;
                  </p>
                )}

                <div className="mt-3 flex justify-between items-center bg-white dark:bg-[#1a2b53]/45 p-1 px-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-mono leading-none tracking-tight">{req.contactNumber}</span>
                  <button
                    onClick={() => triggerCallSim(req.contactNumber)}
                    className="p-1 px-2 text-[9px] font-extrabold bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-1 cursor-pointer"
                  >
                    <Phone size={10} /> {t.callNow}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REGISTERED DONORS LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
            {language === 'en' ? "Verified Registered Donors" : "নিবন্ধিত সক্রিয় রক্তদাতাগণ"}
          </h4>
          <span className="text-[10px] opacity-50 font-mono">
            {filteredDonors.length} {language === 'en' ? "matching" : "তথ্য মিলছে"}
          </span>
        </div>

        {filteredDonors.length === 0 ? (
          <div className="p-8 text-center text-xs opacity-50">{t.noData}</div>
        ) : (
          <div className="space-y-3">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className={`p-4 border rounded-2xl flex justify-between items-center transition-all ${
                  theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="space-y-1.5 max-w-[70%]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 font-extrabold font-mono text-center flex items-center justify-center shrink-0">
                      {donor.bloodGroup}
                    </div>
                    <div className="truncate">
                      <h5 className="text-xs font-extrabold tracking-tight truncate leading-tight">{donor.name}</h5>
                      <span className="text-[10px] opacity-50 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} className="text-red-500 shrink-0" /> {donor.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                    {/* Available Status badge */}
                    {donor.available ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-500">
                        {t.available}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-450 dark:text-slate-400">
                        {t.unavailable}
                      </span>
                    )}

                    {/* Last donation date */}
                    <span className="text-[9px] font-medium opacity-50 flex items-center gap-1">
                      <Calendar size={10} /> {language === 'en' ? "Last:" : "শেষ:"} {donor.lastDonationDate}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => triggerCallSim(donor.mobile)}
                    id={`btn-call-donor-${donor.id}`}
                    className={`p-3 rounded-xl shadow transition-all ${
                      donor.available 
                        ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/15'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                    disabled={!donor.available}
                  >
                    <Phone size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FLOATING BECOME A DONOR FORM MODAL */}
      <AnimatePresence>
        {showDonorForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end justify-center">
            <motion.form
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onSubmit={handleDonorSubmit}
              className={`w-full max-w-lg mx-auto max-h-[90%] overflow-y-auto rounded-t-3xl p-5 space-y-4 shadow-2xl ${
                theme === 'dark' ? 'bg-[#0f1b3b] text-white' : 'bg-white text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Droplet size={16} className="text-red-500" /> {t.becomeDonorTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowDonorForm(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Donor Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-60 block">{t.donorName} *</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                    theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                  id="reg-donor-name"
                />
              </div>

              {/* Group and Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-60 block">{t.donorBloodGroup} *</label>
                  <select
                    value={donorGroup}
                    onChange={(e) => setDonorGroup(e.target.value)}
                    className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {bloodGroups.filter(g => g !== 'All').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-60 block">{t.donorPhone} *</label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                    id="reg-donor-phone"
                  />
                </div>
              </div>

              {/* Location and Last Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-60 block">{t.donorDistrict} *</label>
                  <input
                    type="text"
                    required
                    value={donorLocation}
                    placeholder="e.g. Dhaka, Mirpur 1"
                    onChange={(e) => setDonorLocation(e.target.value)}
                    className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                    id="reg-donor-location"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-60 block">{t.lastDonation}</label>
                  <input
                    type="date"
                    value={donorLastDate}
                    onChange={(e) => setDonorLastDate(e.target.value)}
                    className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5 flex items-center justify-between pt-1">
                <label className="text-[11px] font-bold opacity-60">{t.availability}</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={donorAvailable}
                    onChange={(e) => setDonorAvailable(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span className="text-xs">{t.available}</span>
                </div>
              </div>

              <button
                type="submit"
                id="btn-submit-donor-reg"
                className="w-full py-3 bg-red-600 text-white font-extrabold text-xs tracking-wide rounded-xl shadow-md transition-colors"
              >
                {t.submit}
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING REQ ALERT BROADCAST FORM MODAL */}
      <AnimatePresence>
        {showRequestForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end justify-center">
            <motion.form
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onSubmit={handleRequestSubmit}
              className={`w-full max-w-lg mx-auto max-h-[90%] overflow-y-auto rounded-t-3xl p-5 space-y-4 shadow-2xl ${
                theme === 'dark' ? 'bg-[#0f1b3b] text-white' : 'bg-white text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-500 animate-pulse" /> {t.emergencyBloodReqTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-60 block">{t.bloodReqGroup} *</label>
                  <select
                    value={reqGroup}
                    onChange={(e) => setReqGroup(e.target.value)}
                    className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {bloodGroups.filter(g => g !== 'All').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-60 block">{t.bloodReqContact} *</label>
                  <input
                    type="tel"
                    required
                    value={reqPhone}
                    placeholder="e.g. 018XXXXXXXX"
                    onChange={(e) => setReqPhone(e.target.value)}
                    className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                    id="req-blood-contact"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-60 block">{t.bloodReqLocation} *</label>
                <input
                  type="text"
                  required
                  value={reqLocation}
                  placeholder="e.g. United Hospital, Gulshan, Dhaka"
                  onChange={(e) => setReqLocation(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                    theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                  id="req-blood-location"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-60 block">{t.bloodReqNotes}</label>
                <textarea
                  value={reqNotes}
                  placeholder="e.g. Urgent heart bypass patient requires 2 bags. Ready tomorrow morning."
                  onChange={(e) => setReqNotes(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg border outline-none h-16 resize-none ${
                    theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <button
                type="submit"
                id="btn-broadcast-blood"
                className="w-full py-3 bg-red-600 text-white font-extrabold text-xs tracking-wide rounded-xl shadow-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Droplet size={14} />
                {t.submitBloodReq}
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* PHONE LINE DIALER SIMULATOR MAP */}
      {dialingPhone && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-3xl flex flex-col justify-center items-center p-6 text-center text-white shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center animate-bounce-slow shadow-xl mb-6 font-sans">
              <Phone size={24} className="text-white" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#ef4444] uppercase">
              {language === 'en' ? "Establishing Blood Query Line..." : "রক্তদাতার সাথে যোগাযোগ করা হচ্ছে..."}
            </span>
            <h3 className="text-3xl font-extrabold tracking-wide mt-2">{dialingPhone}</h3>
            <p className="text-xs opacity-60 mt-3 max-w-[200px]">
              {language === 'en' ? "Simulating connection. Be respectful when requesting blood units." : "কলিং সিমুলেটর চলছে। রক্তদানের ব্যাপারে বিনীতভাবে অনুরোধ জানান।"}
            </p>

            <button
              onClick={() => setDialingPhone(null)}
              className="mt-8 px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs cursor-pointer"
            >
              {language === 'en' ? "Hang Up" : "ফেলে দিন"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
