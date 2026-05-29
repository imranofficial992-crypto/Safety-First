/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Calendar,
  X,
  FileText,
  BadgeAlert
} from 'lucide-react';
import { Language, ExpenseItem } from '../types';
import { EN_TRANSLATIONS, BN_TRANSLATIONS, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/translations';

interface ExpenseTrackerModuleProps {
  language: Language;
  expenses: ExpenseItem[];
  onAddTransaction: (item: Omit<ExpenseItem, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
  theme: 'light' | 'dark';
}

export default function ExpenseTrackerModule({
  language,
  expenses,
  onAddTransaction,
  onDeleteTransaction,
  theme
}: ExpenseTrackerModuleProps) {
  const t = language === 'en' ? EN_TRANSLATIONS : BN_TRANSLATIONS;

  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [entryType, setEntryType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].en);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Analytics totals
  const totalIncome = expenses
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = expenses
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const handleTypeChange = (type: 'income' | 'expense') => {
    setEntryType(type);
    if (type === 'income') {
      setCategory(INCOME_CATEGORIES[0].en);
    } else {
      setCategory(EXPENSE_CATEGORIES[0].en);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    onAddTransaction({
      type: entryType,
      amount: val,
      category,
      description: description || category,
      date: date || new Date().toISOString().split('T')[0]
    });

    // Reset fields
    setAmount('');
    setDescription('');
    setShowAddForm(false);
  };

  // SVG Chart calculation helper
  const totalBoth = totalIncome + totalExpense || 1;
  const incomePercent = Math.min(100, Math.max(0, (totalIncome / totalBoth) * 100));
  const expensePercent = Math.min(100, Math.max(0, (totalExpense / totalBoth) * 100));

  return (
    <div className="space-y-5 p-4 pb-16">
      {/* HEADER STATEMENT BALANCE CARD */}
      <div className={`p-5 rounded-2xl border text-center relative overflow-hidden ${
        theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <span className="text-[10px] tracking-widest font-mono uppercase bg-rose-600/10 text-rose-500 font-extrabold px-3 py-1 rounded-full">
          {t.currentBalance}
        </span>
        <h2 className={`text-3xl font-black mt-3 font-sans tracking-tight ${
          netBalance >= 0 ? 'text-emerald-500' : 'text-red-500'
        }`}>
          ৳ {netBalance.toLocaleString()}
        </h2>
        <p className="text-[10px] opacity-40 mt-1">Automatic BDT balance computation algorithm</p>

        {/* Breakdown inside card */}
        <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t dark:border-slate-800">
          <div className="text-left">
            <span className="text-[9px] opacity-50 uppercase block font-bold">{t.totalIncome}</span>
            <span className="text-sm font-extrabold text-emerald-500 flex items-center gap-1.5 mt-1">
              <TrendingUp size={13} /> ৳ {totalIncome.toLocaleString()}
            </span>
          </div>

          <div className="text-left border-l pl-3 dark:border-slate-800">
            <span className="text-[9px] opacity-50 uppercase block font-bold">{t.totalExpense}</span>
            <span className="text-sm font-extrabold text-red-500 flex items-center gap-1.5 mt-1">
              <TrendingDown size={13} /> ৳ {totalExpense.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* QUICK ADD ENTRIES TRIGGER */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          id="btn-open-accounting-entry"
          className="w-full py-3.5 bg-rose-650 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={15} />
          {t.addTransactionTitle}
        </button>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className={`p-4 border rounded-2xl space-y-4 ${
            theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
            <h4 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest">
              {t.addTransactionTitle}
            </h4>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={15} />
            </button>
          </div>

          {/* Type radio toggler */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`py-1.5 text-xs font-bold rounded-md ${
                entryType === 'expense' ? 'bg-red-600 text-white shadow' : 'opacity-60 text-slate-500'
              }`}
            >
              {t.expense}
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`py-1.5 text-xs font-bold rounded-md ${
                entryType === 'income' ? 'bg-emerald-600 text-white shadow' : 'opacity-60 text-slate-500'
              }`}
            >
              {t.income}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Amount */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold opacity-60 block">{t.amount} *</label>
              <input
                type="number"
                required
                min="1"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                  theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
                id="ledger-amount"
              />
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold opacity-60 block">{language === 'en' ? "Date" : "তারিখ"} *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                  theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold opacity-60 block">{t.category} *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {entryType === 'expense'
                ? EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat.en} value={cat.en}>
                      {language === 'en' ? cat.en : cat.bn}
                    </option>
                  ))
                : INCOME_CATEGORIES.map((cat) => (
                    <option key={cat.en} value={cat.en}>
                      {language === 'en' ? cat.en : cat.bn}
                    </option>
                  ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold opacity-60 block">{t.description}</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full text-xs p-2.5 rounded-lg border outline-none ${
                theme === 'dark' ? 'bg-[#15234d] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
              id="ledger-description"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1 font-mono">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              id="btn-save-accounting-entry"
              className="px-4 py-1.5 text-xs font-bold bg-rose-650 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              {t.save}
            </button>
          </div>
        </motion.form>
      )}

      {/* GRAPHIC SVG ANALYTICS PREVIEW */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
      }`}>
        <div className="flex items-center gap-1.5">
          <PieChart size={14} className="text-rose-500" />
          <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
            {t.analyticsTitle}
          </h4>
        </div>

        {totalBoth <= 0 ? (
          <div className="py-4 text-center text-[11px] opacity-40">No analytical volumes found</div>
        ) : (
          <div className="space-y-2.5">
            {/* Split balance bar chart */}
            <div className="h-6 rounded-lg overflow-hidden flex bg-slate-100 dark:bg-slate-900 shadow-inner">
              {totalIncome > 0 && (
                <div
                  style={{ width: `${incomePercent}%` }}
                  className="bg-emerald-500 transition-all text-[10px] text-white flex items-center justify-center font-bold"
                  title="Income Percentage"
                >
                  {incomePercent.toFixed(0)}%
                </div>
              )}
              {totalExpense > 0 && (
                <div
                  style={{ width: `${expensePercent}%` }}
                  className="bg-red-500 transition-all text-[10px] text-white flex items-center justify-center font-bold"
                  title="Expense Percentage"
                >
                  {expensePercent.toFixed(0)}%
                </div>
              )}
            </div>

            <div className="flex justify-between text-[10px] opacity-75 px-1 font-sans">
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block" /> {language === 'en' ? "Total Inflows" : "সর্বমোট আয়"}
              </span>
              <span className="flex items-center gap-1.5 text-red-500">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block" /> {language === 'en' ? "Total Outflows" : "সর্বমোট ব্যয়"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* LEDGER ENTRIES LIST */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
          {t.recentTransactions}
        </h4>

        {expenses.length === 0 ? (
          <div className="p-8 text-center text-xs opacity-50">{t.noTransactions}</div>
        ) : (
          <div className="space-y-2.5">
            {expenses.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 border rounded-xl flex justify-between items-center ${
                  theme === 'dark' ? 'bg-[#0f1b3b] border-slate-800' : 'bg-white border-slate-100'
                }`}
              >
                <div className="space-y-1 max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                      item.type === 'income' 
                        ? 'bg-emerald-550/10 text-emerald-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {item.type === 'income' ? t.income : t.expense}
                    </span>
                    <span className="text-[9px] opacity-40 flex items-center gap-1 font-mono">
                      <Calendar size={9} /> {item.date}
                    </span>
                  </div>

                  <h5 className="text-xs font-extrabold tracking-tight truncate leading-tight">
                    {item.description}
                  </h5>

                  <p className="text-[10px] opacity-60 leading-none">
                    {item.category}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-sans font-black ${
                    item.type === 'income' ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {item.type === 'income' ? '+' : '-'} ৳{item.amount.toLocaleString()}
                  </span>

                  <button
                    onClick={() => onDeleteTransaction(item.id)}
                    id={`btn-delete-entry-${item.id}`}
                    className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    title={t.delete}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
