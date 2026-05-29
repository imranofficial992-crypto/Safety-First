/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'bn';

export type ScreenId =
  | 'home'
  | 'fire-safety'
  | 'medical-care'
  | 'legal-assistance'
  | 'disaster-management'
  | 'blood-donate'
  | 'ambulance'
  | 'expense-tracker'
  | 'women-child-safety'
  | 'emergency-prep'
  | 'contacts'
  | 'settings';

export interface AmbulanceProvider {
  id: string;
  name: string;
  mobile: string;
  address: string;
  available: boolean;
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: string;
  location: string;
  mobile: string;
  available: boolean;
  lastDonationDate: string;
}

export interface ExpenseItem {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface EmergencyRequest {
  id: string;
  bloodGroup: string;
  location: string;
  contactNumber: string;
  notes?: string;
  date: string;
}
