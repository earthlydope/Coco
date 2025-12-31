import React, { useState } from 'react';
import { ProposalBuilder } from './ProposalBuilder';
import { Proposal } from '../types';
import { IconClipboard, IconCheck, IconShield } from './ui/Icons';

export const CaseWorkflow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [proposal, setProposal] = useState<Proposal | null>(null);

  const steps = [
    { id: 1, name: 'Intake' },
    { id: 2, name: 'Proposal' },
    { id: 3, name: 'Contract' },
    { id: 4, name: 'Payment' }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-24">
      {/* Progress Stepper - Enhanced for Tablet */}
      <div className="mb-8 sticky top-0 bg-slate-50 pt-4 pb-4 z-20">
        <div className="flex items-center justify-between relative max-w-3xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-slate-200 rounded-full -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-brand-600 rounded-full -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  step >= s.id ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 scale-110' : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {step > s.id ? <IconCheck className="w-6 h-6" /> : s.id}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${step >= s.id ? 'text-brand-900' : 'text-slate-400'}`}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Workflow Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
                  <IconClipboard className="w-6 h-6" />
                </div>
                Patient Intake
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">First Name</label>
                    <input type="text" defaultValue="Sarah" className="w-full p-4 text-lg rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-brand-500 focus:border-brand-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Last Name</label>
                    <input type="text" defaultValue="Mitchell" className="w-full p-4 text-lg rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-brand-500 focus:border-brand-500 transition-all" />
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Treatment Type</label>
                   <select className="w-full p-4 text-lg rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-brand-500 focus:border-brand-500 transition-all appearance-none">
                     <option>Invisalign Complete - $5,500</option>
                     <option>Comprehensive Braces - $4,800</option>
                     <option>Phase 1 Early Treatment - $3,200</option>
                   </select>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-brand-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 active:scale-[0.98]"
                  >
                    Continue to Financials
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="animate-fade-in">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 mb-6">
                   <ProposalBuilder 
                      treatmentCost={5500} 
                      onProposalValid={setProposal}
                   />
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="px-8 py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors">Back</button>
                  <button 
                    disabled={!proposal}
                    onClick={() => setStep(3)}
                    className="flex-1 bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl text-lg font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 active:scale-[0.98]"
                  >
                    Review & Sign
                  </button>
                </div>
             </div>
          )}

          {step === 3 && (
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fade-in">
               <div className="text-center py-6">
                 <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                   <IconCheck className="w-10 h-10 text-green-600" />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-2">Terms Validated & Approved</h2>
                 <p className="text-slate-500 mb-10 text-lg">Contract #CO-29384 generated securely.</p>
                 
                 {/* Contract Summary Card */}
                 <div className="bg-slate-50 rounded-xl p-6 text-left mb-10 border border-slate-200 relative overflow-hidden">
                   <div className="absolute top-0 right-0 bg-slate-200 text-slate-600 text-[10px] px-2 py-1 rounded-bl-lg font-bold">DRAFT PREVIEW</div>
                   
                   <div className="grid grid-cols-2 gap-y-4 text-sm md:text-base">
                     <div className="text-slate-500">Total Treatment</div>
                     <div className="font-bold text-slate-900 text-right">${proposal?.treatmentCost.toLocaleString()}</div>
                     
                     <div className="text-slate-500">Insurance (Est.)</div>
                     <div className="font-bold text-slate-900 text-right">-${proposal?.insuranceEstimate.toLocaleString()}</div>
                     
                     {proposal?.isPayInFull && (
                        <>
                          <div className="text-emerald-600 font-bold">Pay-in-Full Discount</div>
                          <div className="font-bold text-emerald-600 text-right">-${proposal?.discount.toLocaleString()}</div>
                        </>
                     )}

                     <div className="col-span-2 h-px bg-slate-200 my-2"></div>
                     
                     <div className="text-slate-900 font-bold text-lg">Due Today</div>
                     <div className="font-bold text-brand-700 text-2xl text-right">${proposal?.downPayment.toLocaleString()}</div>
                     
                     {!proposal?.isPayInFull && (
                       <>
                         <div className="text-slate-500 mt-2">Monthly Payment</div>
                         <div className="font-medium text-slate-900 text-right mt-2">{proposal?.termMonths} months @ <span className="font-bold">${Math.round((proposal?.treatmentCost! - proposal?.downPayment! - proposal?.insuranceEstimate!) / proposal?.termMonths!).toLocaleString()}</span></div>
                       </>
                     )}
                   </div>
                 </div>

                 <button 
                    onClick={() => setStep(4)}
                    className="w-full bg-[#2463eb] text-white py-5 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <span>Sign via DocuSign</span>
                    <svg className="w-5 h-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <p className="text-xs text-slate-400 mt-4">SECURE: 256-bit Encrypted Transaction</p>
               </div>
             </div>
          )}
           
           {step === 4 && (
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fade-in">
               <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                 <IconShield className="w-6 h-6 text-emerald-600" />
                 Secure Payment Processing
               </h2>
               <div className="space-y-6">
                 <div className="p-6 border border-brand-200 bg-brand-50/50 rounded-xl flex justify-between items-center">
                   <div>
                     <span className="block text-sm text-brand-600 font-bold uppercase tracking-wide mb-1">Total Due Now</span>
                     <span className="text-3xl font-bold text-brand-900">${proposal?.downPayment.toLocaleString()}</span>
                   </div>
                   <div className="bg-white px-3 py-1 rounded border border-brand-100 text-xs text-brand-700 font-mono">
                     INV-{Math.floor(Math.random() * 10000)}
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <button className="p-6 border-2 border-brand-600 bg-brand-50 rounded-xl relative overflow-hidden group">
                     <div className="absolute top-2 right-2 text-brand-600">
                       <IconCheck className="w-5 h-5" />
                     </div>
                     <div className="font-bold text-slate-900 text-lg mb-1">Credit Card</div>
                     <div className="text-sm text-slate-500">Stripe Secure Checkout</div>
                   </button>
                   <button className="p-6 border-2 border-slate-100 hover:border-brand-200 bg-white hover:bg-slate-50 rounded-xl transition-all text-left">
                     <div className="font-bold text-slate-900 text-lg mb-1">Bank Transfer</div>
                     <div className="text-sm text-slate-500">ACH / eCheck</div>
                   </button>
                 </div>
                 
                 <div className="pt-4">
                    <button className="w-full bg-emerald-600 text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 active:scale-[0.98] transition-all flex justify-center items-center gap-2">
                      <span>Process Payment</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </button>
                 </div>
               </div>
             </div>
           )}

        </div>

        {/* Sidebar Info - Tablet Optimized */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wide text-sm border-b border-slate-100 pb-2">Patient Profile</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl font-bold text-slate-400">
                  SM
                </div>
                <div>
                  <div className="font-bold text-xl text-slate-900">Sarah Mitchell</div>
                  <div className="text-sm text-slate-500 font-medium">New Patient • 24 Years</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Phone</div>
                  <div className="text-slate-900 font-medium">555-0123-4567</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <div className="text-xs text-slate-400 uppercase font-bold mb-1">Primary Insurance</div>
                  <div className="text-slate-900 font-medium flex justify-between items-center">
                    Delta Dental PPO
                    {proposal?.insuranceVerified && <IconCheck className="w-4 h-4 text-blue-500" />}
                  </div>
                </div>
              </div>

               {/* AI Insight Card */}
               <div className="mt-6 bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                 <div className="flex gap-3">
                   <div className="text-indigo-600 bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-serif font-bold">i</div>
                   <div>
                     <p className="text-xs font-bold text-indigo-800 uppercase mb-1">AI Intelligence</p>
                     <p className="text-sm text-slate-700 leading-relaxed">
                       Patient expressed high interest in speed. Mention <span className="font-semibold text-indigo-700">Invisalign Express</span> if standard term length is an objection.
                     </p>
                   </div>
                 </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};