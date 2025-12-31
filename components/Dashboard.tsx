import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Case } from '../types';
import { IconPhone, IconCalendar } from './ui/Icons';

const data = [
  { name: 'Mon', revenue: 4200, starts: 2 },
  { name: 'Tue', revenue: 6800, starts: 3 },
  { name: 'Wed', revenue: 5400, starts: 2 },
  { name: 'Thu', revenue: 9200, starts: 5 },
  { name: 'Fri', revenue: 8100, starts: 4 },
];

interface DashboardProps {
  onNewCase: () => void;
  onViewCase: (caseId: string) => void;
}

const activeNegotiations: Case[] = [
  { id: '1', patientId: 'p1', patientName: 'Sarah Mitchell', status: 'Proposal', lastUpdated: '10 min ago', totalValue: 5500, assignedTo: 'Sarah T.', probability: 'High' },
  { id: '2', patientId: 'p2', patientName: 'John Desmond', status: 'Discovery', lastUpdated: '1 hour ago', totalValue: 6200, assignedTo: 'Dr. Ramzi', probability: 'Medium' },
];

const recallQueue: Case[] = [
  { id: '3', patientId: 'p3', patientName: 'Emma Kline', status: 'Observation', lastUpdated: '30 days ago', totalValue: 4800, assignedTo: 'Sarah T.', observationReason: 'Spouse Consult', recallDate: 'Today' },
  { id: '4', patientId: 'p4', patientName: 'Mike Ross', status: 'Observation', lastUpdated: '45 days ago', totalValue: 5800, assignedTo: 'Sarah T.', observationReason: 'Insurance Waiting', recallDate: 'Overdue' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNewCase, onViewCase }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 font-medium">Overview for Main Office</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm">
            View Reports
          </button>
          <button 
            onClick={onNewCase}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow-md hover:bg-brand-700 transition-colors flex items-center gap-2"
          >
            <span>+</span> New Case
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cash Collected (MTD)</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">$142,500</h3>
          <p className="text-sm text-emerald-600 mt-2 font-semibold flex items-center gap-1">
            <span>↑</span> 12% vs last month
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Time to Signature</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">28 hrs</h3>
          <p className="text-sm text-emerald-600 mt-2 font-semibold flex items-center gap-1">
            <span>↓</span> 4 hrs vs avg
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">68%</h3>
          <p className="text-sm text-amber-600 mt-2 font-semibold">Target: 70%</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute right-0 top-0 p-3 opacity-5">
            <IconPhone className="w-24 h-24" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recall Queue</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">6</h3>
          <p className="text-sm text-brand-600 mt-2 font-semibold">
            3 overdue tasks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Revenue & Starts</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span> Revenue
              </span>
              <select className="text-xs border-slate-200 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500">
                <option>This Week</option>
                <option>Last 30 Days</option>
              </select>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px'}}
                  cursor={{stroke: '#cbd5e1', strokeWidth: 1}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Lists */}
        <div className="space-y-6">
          {/* Active Negotiations */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide flex items-center justify-between">
              Active Negotiations
              <span className="bg-brand-100 text-brand-700 text-xs px-2 py-0.5 rounded-full">{activeNegotiations.length}</span>
            </h3>
            <div className="space-y-3">
              {activeNegotiations.map((c) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-brand-200 transition-colors cursor-pointer" onClick={() => onViewCase(c.id)}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-slate-900">{c.patientName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase
                      ${c.probability === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {c.probability} Prob
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{c.status}</span>
                    <span>{c.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recall Queue - Critical for "Observation is Revenue" */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide flex items-center justify-between">
              Recall Queue
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{recallQueue.length}</span>
            </h3>
            <div className="space-y-3">
              {recallQueue.map((c) => (
                <div key={c.id} className="group p-3 bg-white rounded-lg border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                      <IconCalendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900">{c.patientName}</div>
                      <div className="text-xs text-red-500 font-medium">{c.recallDate}</div>
                    </div>
                  </div>
                  <div className="pl-11 text-xs text-slate-500 flex justify-between items-center">
                    <span>Reason: {c.observationReason}</span>
                    <button className="opacity-0 group-hover:opacity-100 bg-brand-50 text-brand-700 px-2 py-1 rounded text-[10px] font-bold transition-opacity">
                      ENGAGE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};