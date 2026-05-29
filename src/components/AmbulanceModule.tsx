/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Truck,
  Phone,
  MapPin,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  FileText,
  X,
  AlertCircle
} from 'lucide-react';
import { Language, AmbulanceProvider } from '../types';
import { EN_TRANSLATIONS, BN_TRANSLATIONS } from '../data/translations';

interface AmbulanceModuleProps {
  language: Language;
  providers: AmbulanceProvider[];
  onAddProvider: (p: { name: string; mobile: string; address: string; available: boolean }) => void;
  onRequestDispatch: (request: { location: string; contact: string; condition: string }) => void;
  showRequestModal: boolean;
  setShowRequestModal: (show: boolean) => void;
  theme: 'light' | 'dark';
}

export default function AmbulanceModule({
  language,
  providers,
  onAddProvider,
  onRequestDispatch,
  showRequestModal,
  setShowRequestModal,
  theme
}: AmbulanceModuleProps) {
  const t = language === 'en' ? EN_TRANSLATIONS : BN_TRANSLATIONS;

  // Search filter local state
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states for new ambulance
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newAvailable, setNewAvailable] = useState(true);

  // Form states for ambulance request
  const [reqLocation, setReqLocation] = useState('');
  const [reqContact, setReqContact] = useState('');
  const [reqCondition, setReqCondition] = useState('');

  // Call simulator local triggers
  const [dialingPhone, setDialingPhone] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const filteredProviders = providers.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) || p.address.toLowerCase().includes(query)
    );
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMobile || !newAddress) return;

    onAddProvider({
      name: newName,
      mobile: newMobile,
      address: newAddress,
      available: newAvailable
    });

    // Reset inputs
    setNewName('');
    setNewMobile('');
    setNewAddress('');
    setNewAvailable(true);
    setShowAddForm(false);

    triggerToast();
  };

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqLocation || !reqContact || !reqCondition) return;

    onRequestDispatch({
      location: reqLocation,
      contact: reqContact,
      condition: reqCondition
    });

    // Reset inputs
    setReqLocation('');
    setReqContact('');
    setReqCondition('');
    setShowRequestModal(false);

    triggerToast();
  };

  const triggerToast = () => {
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3500);
  };

  const triggerCallSim = (mobile: string) => {
    setDialingPhone(mobile);
    setTimeout(() => {
      setDialingPhone(null);
    }, 4000);
  };

  return (
    <div className="space-y-5 p-4 pb-12 relative">
      {/* SUCCESS TOAST BAR */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 right-4 z-50 p-3 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center gap-2.5"
          >
            <CheckCircle2 size={18} className="shrink-0" />
            <div className="text-xs">
              <span className="font-bold block">{t.success}</span>
              <span className="opacity-80">
                {language === 'en' ? "Data registered and loaded successfully." : "ডেটা সফলভাবে নিবন্ধিত ও লোড করা হয়েছে।"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK EMERGENCY CARD */}
      <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-rose-600 to-red-800 text-white shadow-xl">
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-[9px] uppercase font-bold tracking-widest font-mono">
              ★ {language === 'en' ? "ACTIVE HOTLINE DISPATCH" : "জরুরি ট্র্যাকিং কল-সেন্টার"}
            </div>
            <h3 className="text-lg font-extrabold tracking-tight mt-2.5">
              {t.ambulanceCardTitle}
            </h3>
            <p className="text-xs opacity-85 leading-relaxed mt-1.5">
              {language === 'en'
                ? "Immediate 24/7 patient transport for strokes, trauma, and burn accidents."
                : "পক্ষাঘাত, আঘাত বা দগ্ধ রোগীর তাৎক্ষণিক বহনের জন্য যেকোনো এলাকা থেকে কল করুন বা রিকুয়েস্ট করুন।"}
            </p>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setShowRequestModal(true)}
              id="btn-dispatch-modal"
              className="py-2.5 px-4 text-xs font-bold bg-white text-rose-700 hover:bg-slate-50 transition-colors rounded-xl shadow-md flex items-center gap-1.5"
            >
              <FileText size={14} />
              {t.ambulanceRequestBtn}
            </button>
            <button
              onClick={() => triggerCallSim("102")}
              className="py-2.5 px-3.5 text-xs font-bold bg-white/20 hover:bg-white/30 text-white transition-colors rounded-xl flex items-center justify-center"
            >
              <Phone size={14} />
            </button>
          </div>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-white size-32 pointer-events-none">
          <Truck className="size-full" />
        </div>
      </div>

      {/* SEARCH AND ADD CONTROLS */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className={`relative flex-1 rounded-xl transition-all ${
            theme === 'dark' ? 'bg-[#0f1b3b]' : 'bg-[#f1f5f9]'
          }`}>
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50">
              <Search size={15} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.providerPlaceholderSearch}
              className="w-full text-xs pl-10 pr-4 py-3 bg-transparent outline-none"
              id="search-ambulance"
            />
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            id="btn-toggle-add-ambulance"
            className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-colors flex items-center justify-center shrink-0"
            title={t.addProviderBtn}
          >
            <Plus size={18} />
          </button>
        </div>

        {/* ADD NEW SERVICE DRIVER INLINE BLOCK */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleAddSubmit}
              className={`p-4 border rounded-2xl space-y-3 overflow-hidden ${
                theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-2 mb-2 dark:border-slate-800">
                <h4 className="text-xs font-extrabold tracking-widest text-[#94a3b8] uppercase">
                  {t.addProviderTitle}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="opacity-50 hover:opacity-100"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-60 block">{t.providerName} *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                    theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                  id="add-amb-name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-60 block">{t.providerMobile} *</label>
                  <input
                    type="tel"
                    required
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                    id="add-amb-mobile"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-60 block">{t.availability}</label>
                  <select
                    value={newAvailable ? 'true' : 'false'}
                    onChange={(e) => setNewAvailable(e.target.value === 'true')}
                    className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <option value="true">{t.available}</option>
                    <option value="false">{t.unavailable}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-60 block">{t.providerAddress} *</label>
                <input
                  type="text"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="e.g. Mirpur 12, Dhaka"
                  className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                    theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                  id="add-amb-address"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-[11px] font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  id="btn-submit-ambulance"
                  className="px-4 py-1.5 text-[11px] font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  {t.save}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* AMBULANCE CARD DIRECTORY */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
          {t.ambulanceProviders}
        </h4>

        {filteredProviders.length === 0 ? (
          <div className="p-8 text-center opacity-50 text-xs">{t.noData}</div>
        ) : (
          <div className="space-y-3">
            {filteredProviders.map((provider) => (
              <motion.div
                key={provider.id}
                className={`p-4 border rounded-2xl transition-all flex justify-between items-center ${
                  theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="space-y-2 max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-extrabold tracking-tight">{provider.name}</h5>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] opacity-75">
                    <MapPin size={12} className="text-rose-500 shrink-0" />
                    <span className="truncate">{provider.address}</span>
                  </div>

                  {/* Availability badge */}
                  <div>
                    {provider.available ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 font-mono">
                        <CheckCircle2 size={9} /> {t.available}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-500/10 text-slate-500 font-mono">
                        <XCircle size={9} /> {t.unavailable}
                      </span>
                    )}
                  </div>
                </div>

                {/* Call Button Trigger */}
                <button
                  onClick={() => triggerCallSim(provider.mobile)}
                  id={`btn-call-ambulance-${provider.id}`}
                  className={`p-3 rounded-xl shadow transition-all ${
                    provider.available 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/15'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                  disabled={!provider.available}
                >
                  <Phone size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* DISPATCH EMERGENCY REGISTRATION MODAL */}
      <AnimatePresence>
        {showRequestModal && (
          <div id="modal-emergency-dispatch" className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end justify-center">
            <motion.form
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onSubmit={handleDispatchSubmit}
              className={`w-full max-w-lg mx-auto max-h-[90%] overflow-y-auto rounded-t-3xl p-5 space-y-4 shadow-2xl ${
                theme === 'dark' ? 'bg-[#0f1b3b] text-white' : 'bg-white text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 mb-1 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-rose-600/15 text-rose-600">
                    <Truck size={16} />
                  </div>
                  <h3 className="text-sm font-bold">{t.ambulanceModalTitle}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Patient Location */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wide opacity-60">{t.patientLocation} *</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 text-rose-500" />
                  <input
                    type="text"
                    required
                    value={reqLocation}
                    placeholder="e.g. Ward 4, House 2, Mirpur 1, Dhaka"
                    onChange={(e) => setReqLocation(e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              {/* Patient Contact */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wide opacity-60">{t.patientContact} *</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 text-rose-500" />
                  <input
                    type="tel"
                    required
                    value={reqContact}
                    placeholder="e.g. 017XXXXXXXX"
                    onChange={(e) => setReqContact(e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              {/* Condition Keyword */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wide opacity-60">{t.conditionKeyword} *</label>
                <div className="relative">
                  <AlertCircle size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 text-rose-500" />
                  <input
                    type="text"
                    required
                    value={reqCondition}
                    placeholder={language === 'en' ? "e.g. Pregnancy pain / Chest distress" : "যেমন: শ্বাসকষ্ট বা গুরুতর সড়ক দুর্ঘটনা"}
                    onChange={(e) => setReqCondition(e.target.value)}
                    className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border outline-none ${
                      theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-dispatch-submit"
                className="w-full py-3 bg-red-600 text-white hover:bg-red-700 text-xs font-extrabold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 font-display uppercase tracking-wider"
              >
                <Truck size={15} />
                {t.sendRequest}
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* CALLING OVERLAY DIALER */}
      {dialingPhone && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-3xl flex flex-col justify-center items-center p-6 text-center text-white shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center animate-ping-slow shadow-xl mb-6">
              <Phone size={32} className="text-white" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
              {language === 'en' ? "Calling Ambulance Driver..." : "চালকের সাথে যোগাযোগ করা হচ্ছে..."}
            </span>
            <h3 className="text-3xl font-extrabold tracking-wide mt-2">{dialingPhone}</h3>
            <p className="text-xs opacity-60 mt-3 max-w-[200px]">
              {language === 'en' ? "Direct calling system simulator is dialing with full carrier signals..." : "সেবা প্রদানকারী চালকের ফোনে মোবাইল নেটওয়ার্ক লিংক সরাসরি টিউন করা হচ্ছে।"}
            </p>

            <button
              onClick={() => setDialingPhone(null)}
              className="mt-8 px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-xs cursor-pointer"
            >
              {language === 'en' ? "End Call" : "কল বাতিল"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
