import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Zap, Calendar, ArrowRight, LayoutDashboard, Briefcase, FileText 
} from 'lucide-react';

// --- DATA STRUCTURE (Add future emails here) ---
// --- UPDATED DATA STRUCTURE ---
// Added 'partners' to GTM to track agency relationships like Stagwell
const updatesData = [
  {
    id: 'nov-2025',
    date: 'Nov 2025',
    summary: 'Kickstarting Accelerator Program and building data moat.',
    financials: { bankBalance: 2980000, burn: 50000, mrr: 0, runwayMonths: 58 },
    product: [
      { title: 'Data Moat', value: '100M Questions', status: 'completed' },
      { title: 'Prediction Model', value: '90% Confidence', status: 'completed' }
    ],
    gtm: {
      signed: ['Ridge'],
      verbal: ['Wharton', 'Stagwell'],
      pipeline: [],
      partners: [] // New field to track agency partners
    },
    people: { teamSize: 3, keyHires: [], notes: 'Founding team of 3.' }
  },
  {
    id: 'jan-2026',
    date: 'Jan 2026',
    summary: 'Explosive growth in data (1.5B) and major GTM hire.',
    financials: { bankBalance: 2860000, burn: 61516, mrr: 17000, runwayMonths: 46 },
    product: [
      { title: 'Data Moat', value: '1.5B Questions', status: 'completed' },
      { title: 'Simulator', value: 'Core IP Active', status: 'completed' }
    ],
    gtm: {
      signed: ['Ridge', 'Wharton', 'Collectif', 'Credibly'],
      verbal: ['Cred'],
      pipeline: ['Harry\'s', 'Kitsch', 'Comcast', 'Estee Lauder'],
      partners: ['Stagwell', 'FenixCommerce', 'Super Bolt']
    },
    people: { 
      teamSize: 4, 
      keyHires: ['Phalgun'], 
      notes: 'Gautham (Intern) to Full-time.' 
    }
  }
];

// --- COMPONENTS ---

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      {subtext && <p className="text-slate-400 text-xs mt-1">{subtext}</p>}
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center space-x-2 mb-6 border-b border-slate-100 pb-2">
    <Icon className="w-5 h-5 text-indigo-600" />
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
  </div>
);

const TimelineView = ({ data }) => (
  <div className="space-y-8">
    {data.slice().reverse().map((update, idx) => (
      <div key={update.id} className="relative pl-8 border-l-2 border-slate-200 last:border-0">
        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white shadow-sm"></div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">{update.date}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">{update.summary}</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Financials</p>
              <p className="text-sm font-semibold text-slate-700">MRR: ${(update.financials.mrr / 1000).toFixed(1)}k</p>
              <p className="text-sm text-slate-600">Bank: ${(update.financials.bankBalance / 1000000).toFixed(2)}M</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Product Win</p>
              <p className="text-sm font-semibold text-slate-700">{update.product[0].title}</p>
              <p className="text-sm text-slate-600">{update.product[0].value}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">GTM</p>
              <p className="text-sm font-semibold text-slate-700">{update.gtm.signed.length} Clients Signed</p>
              <p className="text-sm text-slate-600">Pipeline: {update.gtm.pipeline.length} Active</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FinancialsView = ({ data }) => {
  const chartData = data.map(d => ({
    name: d.date,
    Bank: d.financials.bankBalance,
    Burn: d.financials.burn,
    MRR: d.financials.mrr
  }));

  const latest = data[data.length - 1].financials;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Current MRR" value={`$${latest.mrr.toLocaleString()}`} icon={TrendingUp} color="bg-green-500 text-green-600" />
        <StatCard title="Bank Balance" value={`$${(latest.bankBalance / 1000000).toFixed(2)}M`} icon={DollarSign} color="bg-blue-500 text-blue-600" />
        <StatCard title="Monthly Burn" value={`$${latest.burn.toLocaleString()}`} icon={Zap} color="bg-orange-500 text-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Runway & Cash (USD)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Area type="monotone" dataKey="Bank" stroke="#3b82f6" fill="#eff6ff" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">MRR Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="MRR" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductView = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {data.slice().reverse().map((update) => (
      <div key={update.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-slate-800">{update.date} Update</h3>
        </div>
        <ul className="space-y-4">
          {update.product.map((item, idx) => (
            <li key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <span className="block text-sm font-medium text-slate-900">{item.title}</span>
                <span className="block text-xs text-slate-500">{item.value}</span>
              </div>
              <span className={`px-2 py-1 text-xs font-bold rounded ${
                item.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {item.status.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// --- HELPER FUNCTION FOR LOGIC ---
const getGtmChanges = (current, previous) => {
  if (!previous) return { newClients: [], droppedClients: [] };

  // 1. Gather all names from Current and Previous states
  const getAllNames = (update) => [
    ...update.gtm.signed,
    ...update.gtm.verbal,
    ...update.gtm.pipeline,
    ...update.gtm.partners
  ];

  const currentNames = new Set(getAllNames(current));
  const previousNames = new Set(getAllNames(previous));

  // 2. Identify NEW clients (In Current, not in Previous)
  const newClients = [...currentNames].filter(x => !previousNames.has(x));

  // 3. Identify DROPPED clients (In Previous, NOT in Current)
  const droppedClients = [...previousNames].filter(x => !currentNames.has(x));

  return { newClients, droppedClients };
};

// --- UPDATED GTM VIEW COMPONENT ---
const GTMView = ({ data }) => {
  // Get the latest two updates for comparison
  const currentUpdate = data[data.length - 1];
  const previousUpdate = data.length > 1 ? data[data.length - 2] : null;
  
  const { newClients, droppedClients } = getGtmChanges(currentUpdate, previousUpdate);
  const latest = currentUpdate.gtm;

  // Helper to render list items with badges
  const renderList = (items) => (
    <ul className="space-y-2">
      {items.map(c => {
        const isNew = newClients.includes(c);
        return (
          <li key={c} className="flex items-center justify-between text-sm font-medium text-slate-700 bg-white px-3 py-2 rounded shadow-sm border border-slate-100">
            <span>{c}</span>
            {isNew && (
              <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded tracking-wider">
                New
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <SectionHeader title={`Pipeline Movement (${currentUpdate.date})`} icon={Briefcase} />
        
        {/* DROPPED / CHURN ALERT */}
        {droppedClients.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
            <h4 className="text-red-800 font-bold mb-2 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Dropped / No Longer Mentioned
            </h4>
            <div className="flex flex-wrap gap-2">
              {droppedClients.map(c => (
                <span key={c} className="text-sm font-medium text-red-700 bg-white px-2 py-1 rounded shadow-sm border border-red-100 strike-through">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* SIGNED */}
          <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
            <h4 className="text-green-800 font-bold mb-3 flex items-center text-xs uppercase tracking-wider">
              Signed Contracts
            </h4>
            {renderList(latest.signed)}
          </div>

          {/* VERBAL */}
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h4 className="text-blue-800 font-bold mb-3 flex items-center text-xs uppercase tracking-wider">
              Verbal / Closing
            </h4>
            {renderList(latest.verbal)}
          </div>

          {/* PIPELINE */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
            <h4 className="text-slate-600 font-bold mb-3 flex items-center text-xs uppercase tracking-wider">
              Active Conversations
            </h4>
            {renderList(latest.pipeline)}
          </div>
          
          {/* PARTNERS */}
          <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
            <h4 className="text-purple-800 font-bold mb-3 flex items-center text-xs uppercase tracking-wider">
              Partnerships
            </h4>
            {renderList(latest.partners)}
          </div>
        </div>
      </div>
    </div>
  );
};

const PeopleView = ({ data }) => (
  <div className="space-y-4">
    {data.slice().reverse().map((update) => (
      <div key={update.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
          <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded mr-3">{update.date}</span>
          Team Size: {update.people.teamSize}
        </h3>
        
        {update.people.keyHires.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Key Hires</h4>
            <div className="flex flex-wrap gap-2">
              {update.people.keyHires.map(hire => (
                <span key={hire} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  + {hire}
                </span>
              ))}
            </div>
          </div>
        )}
        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded italic">"{update.people.notes}"</p>
      </div>
    ))}
  </div>
);

// --- MAIN APP ---

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('timeline');

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: LayoutDashboard },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'product', label: 'Product Updates', icon: Zap },
    { id: 'gtm', label: 'Go-To-Market', icon: Briefcase },
    { id: 'people', label: 'People', icon: Users },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'timeline': return <TimelineView data={updatesData} />;
      case 'financials': return <FinancialsView data={updatesData} />;
      case 'product': return <ProductView data={updatesData} />;
      case 'gtm': return <GTMView data={updatesData} />;
      case 'people': return <PeopleView data={updatesData} />;
      default: return <TimelineView data={updatesData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Bodhium Labs</h1>
            <p className="text-slate-500 mt-2">Investor Update Portal • FY 2026</p>
          </div>
          <div className="text-right">
             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
               Active Portfolio
             </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors relative top-[1px] ${
                  isActive 
                    ? 'text-indigo-600 border-b-2 border-indigo-600' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in duration-300">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;