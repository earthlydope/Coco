import React, { useState, useEffect } from 'react';
import { FinancialPreset, Proposal } from '../types';
import { IconCheck, IconWarning, IconShield } from './ui/Icons';

interface Props {
  treatmentCost: number;
  onProposalValid: (proposal: Proposal) => void;
}

const presets: Record<string, FinancialPreset> = {
  conservative: { name: 'Conservative', minDownPercent: 30, maxTermMonths: 12, minMonthly: 200, color: 'emerald' },
  balanced: { name: 'Balanced', minDownPercent: 20, maxTermMonths: 18, minMonthly: 150, color: 'blue' },
  aggressive: { name: 'Aggressive', minDownPercent: 10, maxTermMonths: 24, minMonthly: 100, color: 'amber' },
};

export const ProposalBuilder: React.FC<Props> = ({ treatmentCost, onProposalValid }) => {
  const [activePreset, setActivePreset] = useState<string>('balanced');
  const [downPayment, setDownPayment] = useState(treatmentCost * 0.2);
  const [termMonths, setTermMonths] = useState(18);
  const [insurance, setInsurance] = useState(0);
  const [insuranceVerified, setInsuranceVerified] = useState(false);
  const [isPayInFull, setIsPayInFull] = useState(false);

  // Constants
  const PAY_IN_FULL_DISCOUNT_PERCENT = 5;
  const payInFullDiscountAmount = Math.round(treatmentCost * (PAY_IN_FULL_DISCOUNT_PERCENT / 100));

  // Derived Values
  const effectiveTreatmentCost = isPayInFull ? treatmentCost - payInFullDiscountAmount : treatmentCost;
  const currentPreset = presets[activePreset];
  
  // Logic switch: If Pay in Full, Terms are 0 (immediate).
  // If Financing, calculate as normal.
  const principal = effectiveTreatmentCost - (isPayInFull ? effectiveTreatmentCost - insurance : downPayment) - insurance;
  // If Pay In Full, principal should be 0 conceptually for monthly payment, but we need to show the "Due Today" correctly.
  
  const monthlyPayment = (!isPayInFull && termMonths > 0) ? Math.max(0, (effectiveTreatmentCost - downPayment - insurance) / termMonths) : 0;
  
  const dueToday = isPayInFull 
    ? (effectiveTreatmentCost - insurance) // Full amount minus insurance coverage
    : downPayment;

  // DCE Validation Logic
  const minDown = treatmentCost * (currentPreset.minDownPercent / 100);
  
  const isValidDown = isPayInFull ? true : downPayment >= minDown;
  const isValidTerm = isPayInFull ? true : termMonths <= currentPreset.maxTermMonths;
  const isValidMonthly = isPayInFull ? true : monthlyPayment >= currentPreset.minMonthly;
  
  const isDCEValid = isValidDown && isValidTerm && isValidMonthly;

  useEffect(() => {
    if (isDCEValid) {
      onProposalValid({
        treatmentCost: effectiveTreatmentCost,
        downPayment: dueToday,
        termMonths: isPayInFull ? 0 : termMonths,
        insuranceEstimate: insurance,
        discount: isPayInFull ? payInFullDiscountAmount : 0,
        apr: 0,
        isPayInFull,
        insuranceVerified
      });
    }
  }, [downPayment, termMonths, insurance, isDCEValid, treatmentCost, onProposalValid, isPayInFull, dueToday, effectiveTreatmentCost, payInFullDiscountAmount, insuranceVerified]);

  return (
    <div className="space-y-6">
      {/* Strategy Selector (Disabled if Pay in Full) */}
      <div className={`grid grid-cols-3 gap-3 ${isPayInFull ? 'opacity-50 pointer-events-none' : ''}`}>
        {Object.entries(presets).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => {
              setActivePreset(key);
              setDownPayment(treatmentCost * (preset.minDownPercent / 100));
              setTermMonths(preset.maxTermMonths);
            }}
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              activePreset === key 
                ? `border-${preset.color}-500 bg-${preset.color}-50 text-${preset.color}-900` 
                : 'border-slate-200 hover:border-slate-300 text-slate-600'
            }`}
          >
            <div className="font-bold text-sm">{preset.name}</div>
            <div className="text-xs opacity-75">{preset.minDownPercent}% Down</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-8 shadow-sm">
        
        {/* Toggle Payment Mode */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setIsPayInFull(false)}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${!isPayInFull ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Monthly Plan
          </button>
          <button 
            onClick={() => setIsPayInFull(true)}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${isPayInFull ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Pay in Full (Save 5%)
          </button>
        </div>

        {/* Financials Breakdown */}
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Standard Fee</span>
            <span className="text-lg font-bold text-slate-900 line-through decoration-slate-400 decoration-2">${treatmentCost.toLocaleString()}</span>
          </div>

          {isPayInFull && (
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 bg-green-50 -mx-6 px-6 py-4">
              <span className="text-green-700 font-bold flex items-center gap-2">
                <IconCheck className="w-5 h-5" /> 5% Courtesy Applied
              </span>
              <span className="text-lg font-bold text-green-700">-${payInFullDiscountAmount.toLocaleString()}</span>
            </div>
          )}

          {/* Insurance Input with Verification */}
          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
             <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  Insurance Estimate
                  {!insuranceVerified && <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase">Pending Verification</span>}
                  {insuranceVerified && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase flex items-center gap-1"><IconShield className="w-3 h-3"/> Verified</span>}
                </label>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">${insurance.toLocaleString()}</div>
                </div>
              </div>
             <div className="flex gap-4 items-center">
               <input 
                type="range" 
                min="0" 
                max="3000" 
                step="100"
                value={insurance}
                onChange={(e) => {
                  setInsurance(Number(e.target.value));
                  setInsuranceVerified(false); // Reset verification on change
                }}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <button 
                onClick={() => setInsuranceVerified(!insuranceVerified)}
                className={`text-xs px-3 py-1.5 rounded-md font-bold transition-colors border ${
                  insuranceVerified 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-slate-500 border-slate-300 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {insuranceVerified ? 'Verified' : 'Verify'}
              </button>
             </div>
             <p className="text-xs text-slate-400 mt-2 italic">
               *Insurance is an estimate. Patient is responsible for any difference.
             </p>
          </div>

          {!isPayInFull && (
            <>
              {/* Down Payment Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Down Payment</label>
                  <span className={`text-sm font-bold ${isValidDown ? 'text-slate-900' : 'text-red-600'}`}>
                    ${downPayment.toLocaleString()}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={treatmentCost} 
                  step="100"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isValidDown ? 'bg-slate-200 accent-brand-600' : 'bg-red-100 accent-red-500'}`}
                />
                {!isValidDown && (
                  <p className="text-xs text-red-600 mt-1">Minimum ${minDown.toLocaleString()} required for {currentPreset.name} plan.</p>
                )}
              </div>

              {/* Term Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Term Length</label>
                  <span className={`text-sm font-bold ${isValidTerm ? 'text-slate-900' : 'text-red-600'}`}>
                    {termMonths} Months
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="36" 
                  value={termMonths}
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isValidTerm ? 'bg-slate-200 accent-brand-600' : 'bg-red-100 accent-red-500'}`}
                />
                {!isValidTerm && (
                  <p className="text-xs text-red-600 mt-1">Maximum {currentPreset.maxTermMonths} months allowed for {currentPreset.name} plan.</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Results Card */}
        <div className={`rounded-xl p-5 transition-colors shadow-inner ${isDCEValid ? 'bg-slate-900 text-white' : 'bg-red-50 border border-red-200'}`}>
          {isPayInFull ? (
             <div className="flex justify-between items-center">
               <div>
                  <p className="text-slate-400 text-sm mb-1">Total Due Today</p>
                  <p className="text-3xl font-bold text-white">${dueToday.toLocaleString()}</p>
               </div>
               <div className="text-right">
                 <div className="text-emerald-400 font-bold text-sm">Savings Applied</div>
                 <div className="text-slate-400 text-xs">Full Payment</div>
               </div>
             </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-sm ${isDCEValid ? 'text-slate-400' : 'text-red-800'}`}>Monthly Payment</p>
                <p className={`text-3xl font-bold ${isDCEValid ? 'text-white' : 'text-red-600'}`}>${Math.round(monthlyPayment)}/mo</p>
                <p className="text-xs text-slate-500 mt-1">Due Today: ${downPayment.toLocaleString()}</p>
              </div>
              {isDCEValid ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                  <IconCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wide">DCE Approved</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 bg-red-100 px-3 py-1.5 rounded-full border border-red-200">
                  <IconWarning className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wide">Invalid Terms</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};