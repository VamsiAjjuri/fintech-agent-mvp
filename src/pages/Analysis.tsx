import React, { useEffect, useState } from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { supabase } from '../supabaseClient';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, Activity, Loader2, PieChart as PieIcon } from 'lucide-react';

export default function Analysis() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    income: 0,
    expense: 0,
    savings: 0, // Renamed from balance
    txnCount: 0
  });
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topVendors, setTopVendors] = useState<any[]>([]);

  // Professional Fintech Palette
  const COLORS = ['#bd0f49', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#264653'];

  useEffect(() => {
    fetchAndProcessData();
  }, []);

  async function fetchAndProcessData() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('transactions').select('*');
      
      if (error) throw error;
      if (!data) return;

      let income = 0;
      let expense = 0;
      
      data.forEach(txn => {
        const amt = Number(txn.amount);
        if (txn.type === 'credit') income += amt;
        else expense += amt;
      });

      setMetrics({
        income,
        expense,
        savings: income - expense, // This is Cash Flow, not Total Balance
        txnCount: data.length
      });

      // Process Categories
      const catMap: Record<string, number> = {};
      data.filter(t => t.type === 'debit').forEach(txn => {
        const cat = txn.category || 'Uncategorized';
        catMap[cat] = (catMap[cat] || 0) + Number(txn.amount);
      });

      const catChartData = Object.keys(catMap).map(key => ({
        name: key,
        value: catMap[key]
      })).sort((a, b) => b.value - a.value);

      setCategoryData(catChartData);

      // Top Vendors
      const vendorMap: Record<string, number> = {};
      data.filter(t => t.type === 'debit').forEach(txn => {
        const v = txn.vendor || 'Unknown';
        vendorMap[v] = (vendorMap[v] || 0) + Number(txn.amount);
      });

      const sortedVendors = Object.entries(vendorMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

      setTopVendors(sortedVendors);

    } catch (err) {
      console.error("Error analyzing data:", err);
    } finally {
      setLoading(false);
    }
  }

  // Helper to format Rupees
  const formatRupee = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex h-screen bg-[#221016] text-white overflow-hidden font-display">
      <AppSidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#221016] p-8 gap-8">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Financial Intelligence</h1>
            <p className="text-[#c992a4]">AI-Driven analysis of your monthly cash flow.</p>
        </div>

        {loading ? (
            <div className="h-full flex items-center justify-center text-[#bd0f49]">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        ) : (
            <>
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#2d151d] p-6 rounded-2xl border border-[#48232f] flex flex-col gap-4 shadow-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-[#c992a4] font-bold text-xs uppercase tracking-wider">Total Inflow</span>
                            <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center text-green-500"><TrendingUp className="w-4 h-4" /></div>
                        </div>
                        <span className="text-3xl font-mono font-bold text-white">{formatRupee(metrics.income)}</span>
                    </div>
                    
                    <div className="bg-[#2d151d] p-6 rounded-2xl border border-[#48232f] flex flex-col gap-4 shadow-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-[#c992a4] font-bold text-xs uppercase tracking-wider">Total Outflow</span>
                            <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-500"><TrendingDown className="w-4 h-4" /></div>
                        </div>
                        <span className="text-3xl font-mono font-bold text-white">{formatRupee(metrics.expense)}</span>
                    </div>

                    <div className="bg-gradient-to-br from-[#bd0f49] to-[#8a0b35] p-6 rounded-2xl flex flex-col gap-4 shadow-lg shadow-[#bd0f49]/20 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                        <div className="flex items-center justify-between relative z-10">
                            <span className="text-white/80 font-bold text-xs uppercase tracking-wider">Net Savings (Month)</span>
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"><Wallet className="w-4 h-4" /></div>
                        </div>
                        <span className="text-3xl font-mono font-bold text-white relative z-10">{formatRupee(metrics.savings)}</span>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[400px]">
                    <div className="bg-[#2d151d] p-8 rounded-2xl border border-[#48232f] shadow-lg flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <PieIcon className="w-5 h-5 text-[#bd0f49]" />
                            <h3 className="font-bold text-lg">Expense Distribution</h3>
                        </div>
                        <div className="flex-1 min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip 
                                        formatter={(value: any) => formatRupee(Number(value || 0))}
                                        contentStyle={{ backgroundColor: '#1a0b10', borderColor: '#48232f', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-[#2d151d] p-8 rounded-2xl border border-[#48232f] shadow-lg flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <Activity className="w-5 h-5 text-[#bd0f49]" />
                            <h3 className="font-bold text-lg">High Value Transactions</h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            {topVendors.length === 0 ? (
                                <p className="text-[#c992a4] text-center mt-10">No data available.</p>
                            ) : (
                                topVendors.map(([vendor, amount], idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-[#221016] border border-[#48232f] hover:border-[#bd0f49]/50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-[#bd0f49]/10 flex items-center justify-center text-[#bd0f49] font-bold text-sm group-hover:bg-[#bd0f49] group-hover:text-white transition-colors">
                                                {idx + 1}
                                            </div>
                                            <span className="font-medium text-white truncate max-w-[150px]">{vendor}</span>
                                        </div>
                                        <span className="font-mono font-bold text-[#c992a4] group-hover:text-white">
                                            {formatRupee(amount)}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </>
        )}
      </main>
    </div>
  );
}