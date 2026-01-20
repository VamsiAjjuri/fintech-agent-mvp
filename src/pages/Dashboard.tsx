import React, { useEffect, useState } from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { supabase } from '../supabaseClient'; // <--- Connect to Database
import { Upload, FileText, CheckCircle, ArrowRight, Settings, FolderOpen, Timer, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // === 1. Fetch the list of files from Database ===
  useEffect(() => {
    async function fetchFiles() {
      try {
        // We look at the 'transactions' table to see which files we have analyzed
        // We get the 'account' column because that's where we stored the filename
        const { data, error } = await supabase
          .from('transactions')
          .select('account');

        if (error) throw error;

        // The database returns every single row (e.g., 50 rows for 1 file).
        // We use 'Set' to remove duplicates so we just get the unique filenames.
        const uniqueFiles = [...new Set(data?.map(item => item.account) || [])];
        
        setFiles(uniqueFiles);
      } catch (err) {
        console.error("Error loading files:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <AppSidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <section className="bg-white dark:bg-background-dark border-b border-primary/10 p-8 flex flex-col gap-6 shrink-0 h-[30%] min-h-[250px] justify-center shadow-sm z-10 relative">
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-1">
              <h2 className="text-[#1b0d11] dark:text-white text-3xl font-bold tracking-tight">Welcome, Vamshi Ajjuri</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Here is your financial overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-primary transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:border-primary transition-colors bg-gray-200">
                <img src="https://ui-avatars.com/api/?name=Vamshi+Ajjuri&background=bd0f3b&color=fff" alt="Profile" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 z-10">
            {[
              { label: 'Current Plan', value: 'Premium', icon: '👑' },
              { label: 'Processed Files', value: files.length.toString(), icon: FolderOpen }, // <--- Real Data
              { label: 'Transactions', value: 'Live', icon: Timer }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-surface-dark p-5 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-1 group hover:border-primary/30 transition-all relative overflow-hidden">
                <div className="absolute right-0 top-0 w-16 h-16 bg-primary/5 rounded-bl-full -mr-2 -mt-2"></div>
                <div className="flex items-center justify-between relative z-10">
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                  {typeof stat.icon === 'string' ? <span className="text-xl">{stat.icon}</span> : <stat.icon className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />}
                </div>
                <p className="text-[#1b0d11] dark:text-white text-2xl font-bold tracking-tight relative z-10">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-[#1a1d21] flex-1 flex flex-col p-8 overflow-y-auto relative scroll-smooth">
          <h3 className="text-[#1b0d11] dark:text-white text-xl font-bold tracking-tight mb-4">Processed Statements</h3>
          
          <div className="flex flex-col gap-3 pb-24">
            {loading ? (
               <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading recent files...</span>
               </div>
            ) : files.length === 0 ? (
               <div className="p-8 border-2 border-dashed rounded-xl text-center text-gray-400">
                 No files analyzed yet. Run the Python script to upload data.
               </div>
            ) : (
              /* === 2. Loop through the Real Files === */
              files.map((filename, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-green-100 bg-green-50/30 dark:bg-green-900/10 dark:border-green-900/30 transition-all hover:scale-[1.01] hover:shadow-md cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center text-green-600 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#1b0d11] dark:text-white">{filename}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <p className="text-green-600 dark:text-green-400 text-xs font-semibold">AI Analysis Complete</p>
                    </div>
                  </div>
                  <Link to="/registry" className="text-primary text-xs font-bold hover:underline px-4">
                     VIEW DATA
                  </Link>
                </div>
              ))
            )}
          </div>

          <div className="fixed bottom-8 right-8 z-30">
            <Link to="/registry" className="bg-primary hover:bg-primary-dark text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all rounded-full py-4 px-8 flex items-center gap-3 group">
              <span className="font-bold text-lg tracking-wide">View Registry</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}