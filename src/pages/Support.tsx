import React from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { MessageSquare, Mail, Phone, ChevronDown, Send } from 'lucide-react';

export default function Support() {
  return (
    <div className="flex h-screen bg-[#221016] text-white overflow-hidden font-display">
      <AppSidebar />
      
      <main className="flex-1 h-full overflow-y-auto relative bg-[#221016]">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#bd0f49]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto w-full px-8 py-12 flex flex-col gap-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight">Help & Support</h1>
            <p className="text-[#c992a4] text-lg">Have a question? We're here to help you manage your finances better.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Col: Contact Form */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="bg-[#2d151d] border border-[#48232f] rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <MessageSquare className="text-[#bd0f49]" /> 
                  Send us a message
                </h2>
                <form className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-300">First Name</label>
                      <input type="text" className="bg-[#1a0f12] border border-[#48232f] rounded-lg p-3 text-white focus:border-[#bd0f49] focus:ring-1 focus:ring-[#bd0f49] outline-none transition-all" placeholder="John" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-300">Last Name</label>
                      <input type="text" className="bg-[#1a0f12] border border-[#48232f] rounded-lg p-3 text-white focus:border-[#bd0f49] focus:ring-1 focus:ring-[#bd0f49] outline-none transition-all" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-300">Email Address</label>
                    <input type="email" className="bg-[#1a0f12] border border-[#48232f] rounded-lg p-3 text-white focus:border-[#bd0f49] focus:ring-1 focus:ring-[#bd0f49] outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-300">Message</label>
                    <textarea className="bg-[#1a0f12] border border-[#48232f] rounded-lg p-3 text-white h-32 focus:border-[#bd0f49] focus:ring-1 focus:ring-[#bd0f49] outline-none transition-all resize-none" placeholder="Describe your issue..."></textarea>
                  </div>
                  <button className="bg-[#bd0f49] hover:bg-[#8a0b35] text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-[#bd0f49]/20 transition-all flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Ticket
                  </button>
                </form>
              </div>

              {/* FAQ Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                {[
                  "How do I reset my password for encrypted PDFs?",
                  "Is my financial data stored securely?",
                  "Can I export my transaction history?",
                  "Why is the AI categorization taking time?"
                ].map((q, i) => (
                  <div key={i} className="bg-[#2d151d] border border-[#48232f] rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-[#bd0f49]/50 transition-colors group">
                    <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{q}</span>
                    <ChevronDown className="text-[#c992a4]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Contact Info */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#bd0f49] rounded-2xl p-8 shadow-xl text-center relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/20 transition-colors"></div>
                 <Phone className="w-12 h-12 text-white mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-white mb-2">Priority Support</h3>
                 <p className="text-white/80 text-sm mb-6">Premium users get 24/7 dedicated support via phone line.</p>
                 <button className="bg-white text-[#bd0f49] font-bold py-2 px-6 rounded-lg w-full hover:bg-gray-100 transition-colors">Call Now</button>
              </div>

              <div className="bg-[#2d151d] border border-[#48232f] rounded-2xl p-6 flex flex-col gap-4">
                 <h3 className="font-bold text-gray-200">Contact Details</h3>
                 <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-8 h-8 rounded-full bg-[#1a0f12] flex items-center justify-center text-[#bd0f49] border border-[#48232f]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>support@fintechai.com</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-8 h-8 rounded-full bg-[#1a0f12] flex items-center justify-center text-[#bd0f49] border border-[#48232f]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>+91 1800-123-4567</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}