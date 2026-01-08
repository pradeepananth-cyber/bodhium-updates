import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Zap, Briefcase, ArrowRight, LayoutDashboard, ExternalLink, CheckCircle2, Clock, Search, Target, Info 
} from 'lucide-react';

// --- HELPER: MOCK URL GENERATOR ---
const getSearchLink = (name) => `https://www.google.com/search?q=${encodeURIComponent(name)}`;

// --- DATA STRUCTURE (Updated with 'detail' for Tooltips) ---
const updatesData = [
  {
    id: 'nov-2025',
    date: 'Nov 2025',
    summary: 'Kickstarting Accelerator Program & Data Moat V1',
    financials: {
      bankBalance: 2980000, 
      burn: 50000,          
      mrr: 0,
      runwayMonths: 58
    },
    product: [
      { title: 'Data Moat V1', value: '100M+ Questions collected', detail: 'Processed billions of pages. Aiming for 1B+ in days.', status: 'completed' },
      { title: 'Prediction Model', value: '90% Confidence', detail: 'Can predict ChatGPT/Gemini answers (ranking & semantics).', status: 'completed' },
      { title: 'Simulator', value: 'Prototype', detail: 'Running "what if" simulations on ranking changes.', status: 'in-progress' },
      { title: 'Data Intelligence Layer', value: 'Built', detail: 'Consolidates visibility tracking & analytics. Previewing with partners.', status: 'completed' }
    ],
    gtm: {
      accelerator: [
        { name: 'Ridge', url: getSearchLink('Ridge Wallet'), status: 'Signed', detail: 'First Accelerator participant. Using Measurement & Influence tools.' }
      ],
      partnerships: [],
      pipeline: [
        { name: 'Wharton', url: getSearchLink('Wharton Executive Education'), status: 'Verbal', detail: 'Verbal confirmation received.' },
        { name: 'Stagwell', url: getSearchLink('Stagwell'), status: 'Verbal', detail: 'Verbal confirmation received.' }
      ],
      upcoming: [
         "Kickstart Accelerator Program (12-week program)",
         "Monitor Design Partners' progress to ROI",
         "Detailed end-of-year update coming around Xmas"
      ],
      notes: 'Launched 12-week Accelerator Program.'
    },
    people: {
      teamSize: 3,
      keyHires: [],
      interns: [],
      notes: 'Krishna, Kartik, and Zhi (Founders). Seeking advisors (SEO/CMOs).'
    }
  },
  {
    id: 'jan-2026',
    date: 'Jan 2026',
    summary: 'Major GTM Hire, 1.5B Data Scale, $17k MRR',
    financials: {
      bankBalance: 2860000,
      burn: 61516,
      mrr: 17000,
      runwayMonths: 46
    },
    product: [
      { title: 'Data Moat V2', value: '1.5 Billion Questions', detail: 'Likely largest human questions dataset. 26B+ pages processed.', status: 'completed' },
      { title: 'Simulator Model', value: 'Core IP Active', detail: 'Optimizing content for clients based on prediction model.', status: 'completed' },
      { title: 'Strategic Content', value: 'Live', detail: 'Providing influence suggestions to Ridge.', status: 'completed' },
      { title: 'Legal Vertical', value: 'New Exploration', detail: 'Leveraging dataset for Legal visibility insights.', status: 'new' }
    ],
    gtm: {
      accelerator: [
        { name: 'Ridge', url: getSearchLink('Ridge Wallet'), status: 'Signed (Case Study)', detail: 'Providing "Influence" (content suggestions). Creating a case study.' },
        { name: 'Wharton Exec-Ed', url: getSearchLink('Wharton Executive Education'), status: 'Signed', detail: 'Converted from verbal. Accelerator partner.' },
        { name: 'Collectif London', url: getSearchLink('Collectif London'), status: 'Signed', detail: 'New Accelerator partner.' },
        { name: 'Credibly', url: getSearchLink('Credibly'), status: 'Signed', detail: 'New Accelerator partner.' }
      ],
      partnerships: [
        { name: 'Stagwell', url: getSearchLink('Stagwell'), type: 'Marketing Agency', detail: 'Signed partnership. Big marketing agency.' },
        { name: 'FenixCommerce', url: getSearchLink('FenixCommerce'), type: 'Partner', detail: 'Signed partnership.' },
        { name: 'Super Bolt', url: getSearchLink('Super Bolt'), type: 'Agency', detail: 'Signed partnership.' }
      ],
      pipeline: [
        { name: 'Cred', url: getSearchLink('Cred'), status: 'Verbal', detail: 'Verbal agreement secured. Expected to close this month.' },
        { name: 'Harry\'s', url: getSearchLink('Harrys'), status: 'Design Partner', detail: 'Continuing conversations to convert from Design Partner to Accelerator.' },
        { name: 'Kitsch', url: getSearchLink('Kitsch'), status: 'Design Partner', detail: 'Continuing conversations to convert from Design Partner to Accelerator.' },
        { name: 'Comcast', url: getSearchLink('Comcast'), status: 'Initial Meetings', detail: 'Building on momentum from initial meetings.' },
        { name: 'Estee Lauder', url: getSearchLink('Estee Lauder'), status: 'Initial Meetings', detail: 'Building on momentum from initial meetings.' },
        { name: 'SocioSquares', url: getSearchLink('SocioSquares'), status: 'Legal Vertical', detail: 'Exploring new GTM effort for Legal firms with founder Gaurav.' }
      ],
      upcoming: [
         "Convert Design Partners: Continuing conversations with Harry’s and Kitsch.",
         "Enterprise Momentum: Build on initial meetings with Comcast and Estee Lauder.",
         "New Vertical (Legal): Explore GTM with Gaurav (SocioSquares) leveraging questions dataset.",
         "Marketing: Publish a case study from Ridge."
      ],
      notes: 'Reached $17K MRR.'
    },
    people: {
      teamSize: 4,
      keyHires: [
        { name: 'Phalgun', role: 'Head of GTM', detail: 'Ex-Co-Founder upGrad (~$2B val)' }
      ],
      interns: [
        { name: 'Gautham', role: 'Engineering', status: 'Converted to Full-time' },
        { name: 'Vincent', role: 'Engineering', status: 'Joining Full-time July (UCSD)' },
        { name: 'Andy', role: 'Engineering', status: 'Joining Full-time July (UCSD)' }
      ],
      notes: 'Strong conversion of intern talent.'
    }
  }
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  let styles = "bg-slate-100 text-slate-600";
  let Icon = Clock;
  
  if (status === 'completed') {
    styles = "bg-emerald-100 text-emerald-800 border border-emerald-200";
    Icon = CheckCircle2;
  } else if (status === 'in-progress') {
    styles = "bg-blue-100 text-blue-800 border border-blue-200";
    Icon = Clock;
  } else if (status === 'new') {
    styles = "bg-purple-100 text-purple-800 border border-purple-200";
    Icon = Zap;
  }

  return (
    <span className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${styles}`}>
      <Icon className="w-3 h-3" />
      <span>{status}</span>
    </span>
  );
};

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
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Financials</p>
              <p className="text-sm font-semibold text-slate-700">MRR: ${(update.financials.mrr / 1000).toFixed(1)}k</p>
              <p className="text-sm text-slate-600">Bank: ${(update.financials.bankBalance / 1000000).toFixed(2)}M</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Top Product Win</p>
              <p className="text-sm font-semibold text-slate-700">{update.product[0].title}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{update.product[0].detail}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">GTM Highlight</p>
              <p className="text-sm font-semibold text-slate-700">{update.gtm.accelerator.length} Clients Signed</p>
              <p className="text-sm text-slate-600 text-xs mt-1">
                Pipeline: {update.gtm.pipeline.length} Active Conversations
              </p>
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
      <div key={update.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h3 className="font-bold text-lg text-slate-800">{update.date} Update</h3>
        </div>
        <ul className="space-y-4">
          {update.product.map((item, idx) => (
            <li key={idx} className="flex flex-col space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-800">{item.title}</span>
                <StatusBadge status={item.status} />
              </div>
              <div className="text-sm text-indigo-600 font-semibold">{item.value}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const GTMView = ({ data }) => {
  const latest = data[data.length - 1].gtm;

  const LinkItem = ({ client }) => (
    <li className="relative flex items-center justify-between group p-2 -mx-2 hover:bg-indigo-50/50 rounded-lg transition-colors cursor-help">
      <div className="flex items-center space-x-2">
         <a 
            href={client.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 flex items-center transition-colors relative z-0"
            onClick={(e) => e.stopPropagation()}
         >
            {client.name}
            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
         </a>
      </div>
      <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded border border-slate-200 group-hover:border-indigo-200">
        {client.status || client.type}
      </span>

      {/* HOVER TOOLTIP */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
        <p className="font-bold text-slate-200 mb-1 flex items-center">
            <Info className="w-3 h-3 mr-1" />
            {client.name}
        </p>
        <p className="leading-relaxed text-slate-300">{client.detail || "No additional details available."}</p>
        {/* Triangle Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
      </div>
    </li>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 overflow-visible">
        <SectionHeader title="Current Commercial Snapshot" icon={Briefcase} />
        <p className="text-xs text-slate-400 mb-4 -mt-4 italic">Hover over clients for details</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Signed Column */}
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
            <h4 className="text-emerald-800 font-bold mb-4 flex items-center uppercase text-xs tracking-wider">
              <ArrowRight className="w-4 h-4 mr-1"/> Signed Clients
            </h4>
            <ul className="space-y-3 relative">
              {latest.accelerator.map((c, i) => <LinkItem key={i} client={c} />)}
            </ul>
          </div>

          {/* Partnerships Column */}
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h4 className="text-blue-800 font-bold mb-4 flex items-center uppercase text-xs tracking-wider">
              <ArrowRight className="w-4 h-4 mr-1"/> Partnerships
            </h4>
            <ul className="space-y-3 relative">
              {latest.partnerships.map((c, i) => <LinkItem key={i} client={c} />)}
            </ul>
          </div>

          {/* Pipeline Column */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="text-slate-800 font-bold mb-4 flex items-center uppercase text-xs tracking-wider">
              <ArrowRight className="w-4 h-4 mr-1"/> Pipeline / Verbal
            </h4>
            <ul className="space-y-3 relative">
              {latest.pipeline.map((c, i) => <LinkItem key={i} client={c} />)}
            </ul>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Strategic Focus */}
      <div className="bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-xl shadow-sm border border-indigo-100">
        <h4 className="text-indigo-800 font-bold mb-4 flex items-center text-lg">
          <Target className="w-5 h-5 mr-2" />
          Strategic Focus & Next Steps
        </h4>
        <div className="grid grid-cols-1 gap-3">
           {latest.upcoming && latest.upcoming.map((item, i) => (
             <div key={i} className="flex items-start p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-700 text-sm font-medium leading-relaxed">{item}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const PeopleView = ({ data }) => (
  <div className="space-y-6">
    {data.slice().reverse().map((update) => (
      <div key={update.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
           <h3 className="font-bold text-slate-800 flex items-center text-lg">
            {update.date} Team Update
          </h3>
          <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded font-bold">Size: {update.people.teamSize}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Hires */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Key Hires</h4>
            {update.people.keyHires.length > 0 ? (
              <div className="space-y-3">
                {update.people.keyHires.map((hire, i) => (
                  <div key={i} className="flex items-start bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <div className="bg-purple-200 p-1 rounded-full mr-3">
                       <Users className="w-4 h-4 text-purple-700" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{hire.name}</p>
                      <p className="text-xs text-purple-700 font-medium">{hire.role}</p>
                      <p className="text-xs text-slate-500 mt-1">{hire.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-slate-400 italic">No major executive hires this month.</p>}
          </div>

          {/* Interns & Notes */}
          <div>
             <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Interns & Staff</h4>
             {update.people.interns.length > 0 ? (
               <ul className="space-y-2">
                 {update.people.interns.map((intern, i) => (
                   <li key={i} className="text-sm flex justify-between bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="font-medium text-slate-700">{intern.name} ({intern.role})</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center">
                        {intern.status}
                      </span>
                   </li>
                 ))}
               </ul>
             ) : <p className="text-sm text-slate-400 italic">No intern updates.</p>}
             
             <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500 italic">"{update.people.notes}"</p>
             </div>
          </div>
        </div>
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