import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Zap, Briefcase, ArrowRight, LayoutDashboard, ExternalLink, CheckCircle2, Clock, Search 
} from 'lucide-react';

// --- HELPER: MOCK URL GENERATOR ---
const getSearchLink = (name) => `https://www.google.com/search?q=${encodeURIComponent(name)}`;

// --- DATA STRUCTURE (Updated with ALL email details) ---
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
        { name: 'Ridge', url: getSearchLink('Ridge Wallet'), status: 'Signed (First Participant)' }
      ],
      partnerships: [],
      pipeline: [
        { name: 'Wharton', url: getSearchLink('Wharton Executive Education'), status: 'Verbal' },
        { name: 'Stagwell', url: getSearchLink('Stagwell'), status: 'Verbal' }
      ],
      notes: 'Launched 12-week Accelerator Program. Focus on Measurement tool + Influence tool.'
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
        { name: 'Ridge', url: getSearchLink('Ridge Wallet'), status: 'Signed (Case Study)' },
        { name: 'Wharton Exec-Ed', url: getSearchLink('Wharton Executive Education'), status: 'Signed' },
        { name: 'Collectif London', url: getSearchLink('Collectif London'), status: 'Signed' },
        { name: 'Credibly', url: getSearchLink('Credibly'), status: 'Signed' }
      ],
      partnerships: [
        { name: 'Stagwell', url: getSearchLink('Stagwell'), type: 'Marketing Agency' },