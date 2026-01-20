import React, { useEffect, useState } from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { supabase } from '../supabaseClient'; // <--- The Bridge
import { Search, Calendar, Download, Trash2, Archive, ChevronDown, CreditCard, ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react';

export default function Registry() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // === The Magic: Fetching Real Data ===
  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen bg-[#221016] text-white overflow-hidden font-display selection:bg-[#bd0f49]/30">
      <AppSidebar />
      
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#221016] overflow-hidden">
        {/* Header Section */}
        <header className="flex-shrink-0 px-8 py-6 flex flex-col gap-6 z-20 bg-[#221016]">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-3xl font-extrabold tracking-tight">Master Registry</h2>
              <p className="text-[#c992a4] text-sm">Live data from Supabase Database</p>
            </div>
            <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#bd0f49] hover:bg-[#8a0b35] text-white text-sm font-bold shadow-lg transition-all">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
        </header>

        {/* Table Container */}
        <div className="flex-1 overflow-hidden px-8 pb-8 flex flex-col min-h-0">
          <div className="flex-1 w-full border border-[#48232f] rounded-xl bg-[#221016] shadow-xl overflow-hidden flex flex-col">
            
            {/* Loading State */}
            {loading ? (
              <div className="flex-1 flex items-center justify-center flex-col gap-4 text-[#c992a4]">
                <Loader2 className="w-8 h-8 animate-spin text-[#bd0f49]" />
                <p>Syncing with database...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="flex-1 flex items-center justify-center flex-col gap-2 text-gray-500">
                <p>No transactions found.</p>
                <p className="text-xs">Upload a PDF to populate this table.</p>
              </div>
            ) : (
              <div className="overflow-auto flex-1 w-full">
                <table className="w-full min-w-[1400px] text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-[#2d151d] shadow-sm">
                    <tr>
                      {['Date', 'Account', 'Vendor', 'Type', 'Amount', 'Category', 'Status'].map((h) => (
                        <th key={h} className="px-5 py-4 text-xs font-bold text-[#c992a4] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#48232f]">
                    {transactions.map((txn, index) => (
                      <tr key={txn.id} className={`hover:bg-[#3d1e29] transition-colors group ${index % 2 === 1 ? 'bg-[#261219]' : 'bg-[#2d151d]'}`}>
                        <td className="px-5 py-4 text-sm text-white font-medium">{txn.date_time || 'N/A'}</td>
                        <td className="px-5 py-4 text-sm text-[#e0e0e0]">{txn.account || 'Unknown'}</td>
                        <td className="px-5 py-4 text-sm text-white font-semibold">{txn.vendor}</td>
                        <td className="px-5 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${txn.type === 'credit' ? 'bg-green-900/40 text-green-300 border-green-700/50' : 'bg-[#bd0f49]/20 text-[#ff8ba7] border-[#bd0f49]/30'}`}>
                             {txn.type}
                           </span>
                        </td>
                        <td className="px-5 py-4 text-sm font-mono font-medium text-right text-white">
                          ₹{Number(txn.amount).toLocaleString('en-IN')}
                        </td>
                        <td className="px-5 py-4">
                           <span className="bg-[#221016] border border-[#48232f] px-3 py-1 rounded text-sm text-[#c992a4]">{txn.category}</span>
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-500 uppercase">{txn.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}