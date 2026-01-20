import React from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { CheckCircle, XCircle, UploadCloud, Lock, Cpu, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="flex h-screen bg-[#f8f6f6] dark:bg-[#1a1d21] text-[#1b0d11] dark:text-white overflow-hidden font-display">
      <AppSidebar />
      
      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="max-w-[1200px] mx-auto w-full px-8 py-12 flex flex-col gap-12">
          
          {/* Hero Section */}
          <section className="flex flex-col gap-6 max-w-3xl">
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bd0f3b]/20 bg-[#bd0f3b]/5 px-3 py-1 text-xs font-bold text-[#bd0f3b]">
                 <CheckCircle className="w-3 h-3" />
                 User Guide V1
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-[#1b0d11] dark:text-white tracking-tight leading-[1.1]">
                How Fintech AI Works
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Stop manually entering data. Understand how our AI transforms your raw bank PDF statements into actionable financial intelligence in seconds.
              </p>
            </div>
          </section>

          {/* Comparison Cards */}
          <section className="grid md:grid-cols-2 gap-6 w-full">
            {/* The Old Way */}
            <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/30 p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600">
                  <XCircle className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-800/60 dark:text-red-300/60">The Old Way</span>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-xl font-bold text-[#1b0d11] dark:text-white">Manual Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Relies on complex spreadsheets that are time-consuming to update, difficult to format, and highly prone to human error during data entry.
                </p>
              </div>
            </div>

            {/* The New Way */}
            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-900/30 p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800/60 dark:text-emerald-300/60">The New Way</span>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-xl font-bold text-[#1b0d11] dark:text-white">AI Solutions</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Delivers instant transaction categorization, automated anomaly detection, and predictive spending trends without you lifting a finger.
                </p>
              </div>
            </div>
          </section>

          {/* Steps Guide */}
          <section className="flex flex-col gap-8 py-4">
            <div className="flex items-end justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <h2 className="text-2xl font-bold text-[#1b0d11] dark:text-white">Step-by-Step Guide</h2>
              <span className="text-sm font-medium text-[#bd0f3b] cursor-pointer hover:underline flex items-center gap-1">
                View Documentation <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Upload PDF', icon: UploadCloud, desc: 'Simply drag & drop your monthly bank statements directly into the dashboard area.' },
                { step: 2, title: 'Provide Password', icon: Lock, desc: 'Securely decrypt your files. Decryption happens locally in your browser for safety.' },
                { step: 3, title: 'AI Analysis', icon: Cpu, desc: 'Our engine parses lines, categorizes transactions, and identifies recurring bills.' },
                { step: 4, title: 'View Insights', icon: TrendingUp, desc: 'Visualize your spending habits with clean charts and actionable financial advice.' }
              ].map((item) => (
                <div key={item.step} className="group relative flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#242830] p-6 shadow-sm hover:shadow-xl hover:border-[#bd0f3b]/30 transition-all hover:-translate-y-1">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 flex items-center justify-center text-sm font-bold border border-white dark:border-gray-800 shadow-sm">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#bd0f3b]/10 flex items-center justify-center text-[#bd0f3b] mb-2 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-[#1b0d11] dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#bd0f3b]/10 to-transparent h-24 w-full flex items-center px-8 border border-[#bd0f3b]/10">
            <p className="text-[#bd0f3b] font-medium text-sm">
              Ready to simplify your finances? <Link to="/dashboard" className="underline font-bold hover:text-[#8a0b35]">Go to your Dashboard</Link> to start.
            </p>
          </div>
          
          <div className="h-10"></div>
        </div>
      </main>
    </div>
  );
}