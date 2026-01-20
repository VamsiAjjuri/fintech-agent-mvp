import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, PieChart, LifeBuoy, LogOut, Info, Wallet } from 'lucide-react';

// === CRITICAL FIX: The function name must match the file name ===
export function AppSidebar() {
  const navigate = useNavigate();
  
  const navItems = [
    { icon: Info, label: 'About App', path: '/about' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Registry', path: '/registry' },
    { icon: PieChart, label: 'Analysis', path: '/analysis' },
    { icon: LifeBuoy, label: 'Support', path: '/support' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className="w-64 h-full bg-[#2a0812] flex flex-col justify-between shrink-0 shadow-xl z-20 font-display border-r border-[#48232f]">
      <div className="flex flex-col gap-8 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#bd0f49] to-[#8a0b35] flex items-center justify-center text-white shadow-lg shadow-[#bd0f49]/20">
            <Wallet className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-xl font-extrabold tracking-tight leading-none">FinTech AI</h1>
            <p className="text-[#c992a4] text-[10px] font-medium tracking-wide uppercase mt-0.5">Wealth Manager</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#bd0f49] text-white shadow-lg shadow-[#bd0f49]/20 font-bold translate-x-1'
                    : 'text-[#c992a4] hover:bg-white/5 hover:text-white font-medium hover:translate-x-1'
                }`
              }
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110`} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-[#48232f]">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/5 text-[#c992a4] hover:text-white transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}