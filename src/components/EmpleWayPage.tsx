import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Eye, 
  Target, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronRight, 
  X, 
} from "lucide-react";
import { BOARD_MEMBERS, MANAGEMENT_MEMBERS, TeamMember } from "../data";

interface EmpleWayPageProps {
  onContactClick: () => void;
}

export default function EmpleWayPage({ onContactClick }: EmpleWayPageProps) {
  const [selectedLeader, setSelectedLeader] = useState<TeamMember | null>(null);

  return (
    <div className="bg-[#fafbfb] min-h-screen pb-16 font-sans">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] bg-emerald-950 overflow-hidden dark-bg scroll-mt-28 md:scroll-mt-32">
        {/* Abstract background elements */}
        <div className="absolute inset-0 bg-[#022c22]/35 z-10" />
        <img
          src="/assets/images/emple_way_banner_1780860095204.png"
          alt="emPLE Way Banner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-1000"
        />
        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[38px] sm:text-[48px] md:text-[56px] font-bold font-display text-white tracking-tight"
            >
              emPLE Way
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <div className="lg:col-span-4">
            <span className="text-[12px] font-bold text-emerald-600 tracking-widest uppercase block mb-2 font-mono">
              OUR STORY
            </span>
            <div className="h-0.5 w-12 bg-[#32B44A] mt-2 mb-6" />
          </div>

          <div className="lg:col-span-8 space-y-8 text-gray-700">
            <h2 className="text-[24px] sm:text-[32px] md:text-[38px] leading-[1.2] font-bold tracking-tight text-gray-900 font-display">
              emPLE means Empowering People. <br />
              It’s not just in our name; it is the core of who we are.
            </h2>
            
            <div className="space-y-6 text-[14px] sm:text-[15px] leading-relaxed text-gray-600 font-sans">
              <p>
                <span className="font-semibold text-gray-950">emPLE Ghana is part of the emPLE Group.</span> We evolved through the acquisition of Metropolitan's Life, Health, and Pensions businesses, carrying forward a legacy of trusted service in the Ghanaian market. From Metropolitan, we inherit deep local expertise and a strong reputation for reliability. From our parent company, EverCorp, we draw the entrepreneurial drive and long-term vision to build resilient, globally competitive businesses.
              </p>
              <p>
                This foundation positions emPLE Ghana as a new kind of financial protection partner — credible, people-focused, and agile enough to design solutions for today and tomorrow.
              </p>
              <p>
                We provide clear and accessible Life, Health, and Pensions solutions, guided by a simple purpose: empowering individuals, families, and institutions to move forward with confidence. With enhanced digital touchpoints and simplified service experiences, we are expanding access while staying committed to the dependable protection our customers have always known.
              </p>
              <p className="font-semibold text-[#32B44A]">
                At emPLE Ghana, we build on a trusted legacy — and help Ghanaians protect what matters most.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. OUR PURPOSE SECTION (Dark Green Background) */}
      <section className="bg-[#052e16] text-white py-16 md:py-24 dark-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
            <span className="text-[12px] font-bold text-emerald-400 tracking-widest uppercase block font-mono">
              OUR PURPOSE
            </span>
            <h2 className="text-[32px] sm:text-[42px] leading-[1.12] font-bold tracking-tight font-display">
              Empowering People. <br />Every Step of the Way.
            </h2>
            <p className="text-emerald-100/80 text-[14px] sm:text-[16px] max-w-xl leading-relaxed">
              To empower our clients by providing innovative financial solutions that ensures their freedom, security, and prosperity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Mission Card */}
            <div className="bg-[#021f0f] p-8 sm:p-10 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] dark-bg">
              <div>
                <div className="w-12 h-12 bg-emerald-500/10 text-[#32B44A] rounded-xl flex items-center justify-center mb-6">
                  <Target size={24} className="stroke-[2]" />
                </div>
                <h3 className="text-[20px] font-bold mb-4 tracking-tight">Our Mission</h3>
                <p className="text-emerald-100/70 text-sm leading-relaxed mb-6">
                  To empower our clients by providing innovative comprehensive financial and insurance solutions that ensures their freedom, security, and long-term prosperity.
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 tracking-wider flex items-center space-x-1 uppercase">
                <span>The Mission Path</span>
                <ChevronRight size={12} />
              </span>
            </div>

            {/* Our Vision Card */}
            <div className="bg-[#021f0f] p-8 sm:p-10 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] dark-bg">
              <div>
                <div className="w-12 h-12 bg-[#32B44A]/15 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                  <Eye size={24} className="stroke-[2]" />
                </div>
                <h3 className="text-[20px] font-bold mb-4 tracking-tight">Our Vision</h3>
                <p className="text-emerald-100/70 text-sm leading-relaxed mb-6">
                  To empower our clients by providing innovative financial solutions that ensures their freedom, security, and structural prosperity across diverse lifetimes.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#32B44A] tracking-wider flex items-center space-x-1 uppercase">
                <span>The Vision Dream</span>
                <ChevronRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header Description on Left */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
            <span className="text-[12px] font-bold text-emerald-600 tracking-widest uppercase block font-mono">
              CORE VALUES
            </span>
            <h2 className="text-[32px] sm:text-[36px] font-bold text-gray-900 tracking-tight font-display leading-[1.15]">
              The emPLE Way Pledge.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed font-sans max-w-sm">
              These values aren't words on a page; they are the principles that guide how we work, how we serve, and how we grow together as a cohesive community.
            </p>
            <div className="pt-4 hidden lg:block">
              <button 
                onClick={onContactClick}
                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-[11px] font-bold tracking-wider uppercase rounded-md transition duration-200"
              >
                Join Our Culture
              </button>
            </div>
          </div>

          {/* Grid Layout of 6 Cards on Right */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Core Values Brand Block */}
            <div className="bg-[#32B44A] text-white p-8 sm:p-10 rounded-2xl flex flex-col justify-end min-h-[220px] shadow-sm transform hover:scale-[1.01] transition-transform">
              <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest block mb-1">Values</span>
              <h3 className="text-[26px] sm:text-[32px] font-extrabold tracking-tight font-display">
                Core <br />Values
              </h3>
            </div>

            {/* Innovation */}
            <div className="bg-white border border-[#f1f1f1] p-8 rounded-2xl hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#32B44A] flex items-center justify-center mb-6">
                <Zap size={18} className="fill-emerald-400 stroke-none" />
              </div>
              <h4 className="text-[18px] font-extrabold text-gray-950 mb-3">Innovation</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-sans">
                We push boundaries and drive positive changes through groundbreaking ideas, simple client workflows, and optimized technology.
              </p>
            </div>

            {/* Integrity */}
            <div className="bg-white border border-[#f1f1f1] p-8 rounded-2xl hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#32B44A] flex items-center justify-center mb-6">
                <Zap size={18} className="fill-emerald-400 stroke-none" />
              </div>
              <h4 className="text-[18px] font-extrabold text-gray-950 mb-3">Integrity</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-sans">
                We uphold the absolute highest standards of honesty, privacy, and full financial transparency in all our operations and client policies.
              </p>
            </div>

            {/* Clients Focus */}
            <div className="bg-white border border-[#f1f1f1] p-8 rounded-2xl hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#32B44A] flex items-center justify-center mb-6">
                <Zap size={18} className="fill-emerald-400 stroke-none" />
              </div>
              <h4 className="text-[18px] font-extrabold text-gray-950 mb-3">Clients Focus</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-sans">
                Our clients are at the heart of everything we do. We craft solutions based on real life goals rather than static templates.
              </p>
            </div>

            {/* Respect */}
            <div className="bg-white border border-[#f1f1f1] p-8 rounded-2xl hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#32B44A] flex items-center justify-center mb-6">
                <Zap size={18} className="fill-emerald-400 stroke-none" />
              </div>
              <h4 className="text-[18px] font-extrabold text-gray-950 mb-3">Respect</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-sans">
                We treat everyone with extreme dignity and fairness, always fostering an empathetic, cooperative, and inclusive environment.
              </p>
            </div>

            {/* Sustainability */}
            <div className="bg-white border border-[#f1f1f1] p-8 rounded-2xl hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#32B44A] flex items-center justify-center mb-6">
                <Zap size={18} className="fill-emerald-400 stroke-none" />
              </div>
              <h4 className="text-[18px] font-extrabold text-gray-950 mb-3">Sustainability</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-sans">
                We are thoroughly committed to making a long-term positive impact on the environment, community development, and society.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BOARD OF DIRECTORS TEAM SECTION */}
      <section className="bg-white py-20 md:py-24 border-t border-b border-[#f1f1f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-[12px] font-bold text-emerald-600 tracking-widest uppercase block font-mono">
              OUR TEAM
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-gray-900 tracking-tight font-display mt-2">
              Board Of Directors
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mt-3 font-sans">
              Strong leadership powers our progress. Meet the world-class team shaping emPLE's future across Life, General, and digital services.
            </p>
          </div>

          {/* Grid Layout of Directors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {BOARD_MEMBERS.map((member, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-[#fafbfb] border border-[#f1f1f1] rounded-2xl overflow-hidden shadow-sm hover:shadow-md group transition-all duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => setSelectedLeader(member)}
              >
                {/* Image Box */}
                <div className="aspect-[4/5] bg-gray-200 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {/* Meta Box */}
                <div className="p-5 flex-grow flex justify-between items-end border-t border-[#f1f1f1] bg-white">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-[15px] sm:text-[16px] text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-sans tracking-tight">
                      {member.role}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#32B44A] group-hover:bg-[#32B44A] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                    <ArrowUpRight size={14} className="stroke-[2.5]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MANAGEMENT SECTION (Dark Background, Green Tags) */}
      <section className="bg-[#052312] py-20 md:py-24 text-white font-sans dark-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-[12px] font-bold text-emerald-400 tracking-widest uppercase block font-mono">
              EXECUTIVE FORCE
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight font-display mt-2 text-white">
              Management
            </h2>
            <p className="text-emerald-100/70 text-sm leading-relaxed mt-3 max-w-xl">
              Meet our highly experienced core operational managers guiding the daily client requests, technology, claims and policy frameworks with utmost precision.
            </p>
          </div>

          {/* Grid Layout of Managers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {MANAGEMENT_MEMBERS.map((member, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-[#02180b] rounded-2xl overflow-hidden relative group flex flex-col justify-end aspect-[4/5] h-full cursor-pointer shadow-md dark-bg"
                onClick={() => setSelectedLeader(member)}
              >
                {/* Bg Grayscale Portrait */}
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Overlaid Green Metal Tag precisely matching screenshot */}
                <div className="relative z-10 p-4 m-3 sm:m-4 bg-[#055325] border-l-4 border-[#32B44A] text-white rounded-lg flex justify-between items-center group-hover:bg-[#037230] transition-colors">
                  <div className="space-y-0.5 pr-2">
                    <h3 className="font-extrabold text-[12px] sm:text-[13px] tracking-tight leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[10px] text-emerald-300 tracking-tight">
                      {member.role}
                    </p>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-emerald-900/40 text-[#32B44A] group-hover:text-white flex items-center justify-center flex-shrink-0">
                    <ArrowRight size={10} className="stroke-[3]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE LEADER BIO MODAL DIALOG */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
              className="absolute inset-0 bg-[#021f0f]/80 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-4xl md:max-w-5xl bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] z-10 text-gray-800 scrollbar-thin"
            >
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/95 hover:bg-gray-100 rounded-full shadow-md hover:shadow-lg text-gray-700 hover:text-gray-900 transition z-30 cursor-pointer border border-[#f1f1f1]"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col md:flex-row items-stretch">
                {/* Left profile Column (Colored standard image) */}
                <div className="w-full md:w-[42%] aspect-[4/5] sm:aspect-[3/2] md:aspect-auto h-64 sm:h-80 md:h-auto bg-[#fafbfb] flex-shrink-0 relative">
                  <img
                    src={selectedLeader.image}
                    alt={selectedLeader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none object-top"
                  />
                </div>
                
                {/* Right narrative Column (100% proportional spacing) */}
                <div className="w-full md:w-[58%] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
                  <div>
                    <span className="text-[12px] sm:text-[13px] font-medium text-slate-500 tracking-[0.18em] uppercase block mb-3 font-sans">
                      {selectedLeader.role}
                    </span>
                    <h3 className="text-[32px] sm:text-[42px] md:text-[48px] font-semibold text-slate-800 leading-tight tracking-tight font-display">
                      {selectedLeader.name}
                    </h3>
                  </div>

                  <div className="h-[2px] bg-emerald-500/10 w-full" />

                  <div className="space-y-4 text-gray-600 text-[12px] sm:text-[13px] leading-relaxed font-sans">
                    <p>
                      {selectedLeader.name} is a highly accomplished executive with over two decades of experience in the Life Insurance, Pensions and broader high-growth corporate governance sectors across Ghana and the West African sub-region.
                    </p>
                    <p>
                      Dedicated to promoting the fundamental tenets of the "emPLE Way", they focus closely on ensuring simplified policy procurement, state-of-the-art digital service delivery, and professional stewardship. They have been instrumental in standardizing institutional workflows, maintaining rigorous compliance, and implementing best-in-class risk assurance methodologies.
                    </p>
                    <p>
                      Prior to joining the emPLE Life Insurance leadership, they held several senior-level policy and executive management roles at several highly recognized multinational financial associations and advisory boards, driving impact for generations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
