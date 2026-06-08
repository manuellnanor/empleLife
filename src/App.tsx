"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { INSURANCE_PLANS, FAQS } from "./data";
import type { InsurancePlan } from "./types";

import Header from "./components/Header";
import PlanCard from "./components/PlanCard";
import PlanDetailModal from "./components/PlanDetailModal";
import BranchFinder from "./components/BranchFinder";
import EmpleWayPage from "./components/EmpleWayPage";
import ClaimsPage from "./components/ClaimsPage";
import BranchesPage from "./components/BranchesPage";
import DownloadsPage from "./components/DownloadsPage";
import ContactUsPage from "./components/ContactUsPage";
import VacanciesPage from "./components/VacanciesPage";

// Beautiful Icons
import {
  Check,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  ShieldCheck,
  X,
  Bell
} from "lucide-react";

export type AppView = "landing" | "products" | "claims" | "emple-way" | "branches" | "downloads" | "contact" | "vacancies";

const viewRoutes: Record<AppView, string> = {
  landing: "/",
  products: "/products",
  claims: "/claims",
  "emple-way": "/emple-way",
  branches: "/branches",
  downloads: "/downloads",
  contact: "/contact",
  vacancies: "/vacancies",
};

const routeViews: Record<string, AppView> = {
  "/": "landing",
  "/products": "products",
  "/claims": "claims",
  "/emple-way": "emple-way",
  "/branches": "branches",
  "/downloads": "downloads",
  "/contact": "contact",
  "/vacancies": "vacancies",
};

interface AppProps {
  initialView?: AppView;
}

export default function App({ initialView = "landing" }: AppProps) {
  const [currentView, setCurrentView] = useState<AppView>(initialView);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<InsurancePlan | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  
  // Fast feedback contact state
  const [isAdvisorDrawerOpen, setIsAdvisorDrawerOpen] = useState(false);
  const [advisorName, setAdvisorName] = useState("");
  const [advisorPhone, setAdvisorPhone] = useState("");
  const [advisorNotes, setAdvisorNotes] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(routeViews[window.location.pathname] ?? "landing");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    const nextPath = viewRoutes[view];
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }
  };

  const handleSelectPlan = (plan: InsurancePlan) => {
    setSelectedPlanForModal(plan);
  };

  const handleOpenCalculatorWithPlan = (planId: string) => {
    setSelectedPlanForModal(null);
    const selectedPlan = INSURANCE_PLANS.find(p => p.id === planId);
    if (selectedPlan) {
      setAdvisorNotes(`Hi emPLE, I am interested in obtaining a custom premium quote for: "${selectedPlan.title}". Please contact me with quotation estimates.`);
    } else {
      setAdvisorNotes(`Hi emPLE, I am interested in requesting premium quotes.`);
    }
    setIsAdvisorDrawerOpen(true);
  };

  const handleExploreClick = () => {
    handleViewChange("landing");
    setTimeout(() => {
      const section = document.getElementById("plans-list-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleAdvisorSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!advisorName || !advisorPhone) {
      alert("Please provide your name and contact number.");
      return;
    }
    setIsAdvisorDrawerOpen(false);
    triggerToast(`Success! Your advisor request for ${advisorName} is queued. We'll speak soon!`);
    // reset
    setAdvisorName("");
    setAdvisorPhone("");
    setAdvisorNotes("");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-emerald-100 selection:text-emerald-800 overflow-x-hidden">
      
      {/* Dynamic Header */}
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onContactClick={() => setIsAdvisorDrawerOpen(true)}
      />

      {currentView === "landing" && (
        <>
          {/* Main Hero Section as requested: Heading on left, description/button on right */}
          <section id="home" className="pt-24 sm:pt-28 md:pt-36 pb-8 scroll-mt-28 md:scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main heading column */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[12px] font-bold text-gray-400 tracking-widest uppercase">
              LIFE PRODUCTS
            </span>
            <h1 className="text-[40px] sm:text-[52px] leading-[1.08] font-bold font-display tracking-tight text-gray-900 max-w-2xl">
              Protection for you, your loved ones and employees.
            </h1>
          </div>

          {/* Description & Exploration Trigger column */}
          <div className="lg:col-span-5 lg:pt-14 space-y-6">
            <p className="text-[15px] sm:text-[16px] text-gray-500 leading-relaxed font-sans font-normal">
              Our Life Assurance plans are designed to shield you in times of uncertainty. Whether you're starting out, there's a beautifully tailored emPLE plan built for you.
            </p>
            <div>
              <button
                id="hero-explore-btn"
                onClick={handleExploreClick}
                className="px-6 py-3 bg-[#32B44A] hover:bg-[#059669] text-white text-[13px] font-bold tracking-wider rounded-md transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer inline-flex items-center space-x-1.5 hover:-translate-y-0.5"
              >
                <span>Explore Products</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scaled Giant image matching screenshot exactly - wide aspect */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.1 }}
          className="relative w-full overflow-hidden aspect-[21/9] sm:aspect-[24/9]"
        >
          <img
            src="/assets/images/Hero_1.png"
            alt="emPLE Life Insurance Family Theme"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </section>

      {/* At a Glance listing grid */}
      <section id="plans-list-section" className="bg-white py-16 md:py-24 border-t border-[#f1f1f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sticky Narrative on Left Side */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
              <span className="text-[12px] font-bold text-gray-400 tracking-widest uppercase block">
                OUR LIFE PLANS
              </span>
              <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-bold font-display tracking-tight text-gray-950">
                Life Products at a Glance to get you protected
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed font-sans max-w-md">
                Our Life Assurance plans are designed to shield you in times of uncertainty and support you in times of opportunity. Whether you're starting out, there's a designated emPLE plan built precisely for your lifepath.
              </p>
              
              <div className="pt-4 border-t border-[#f1f1f1] hidden lg:block">
                <div className="flex items-center space-x-3.5 text-xs text-gray-400 font-sans">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#32B44A]" />
                  <span>Choose any plan to view customized riders and terms.</span>
                </div>
              </div>
            </div>

            {/* Vertical Cards Stack on Right Side */}
            <div className="lg:col-span-7 space-y-6">
              {INSURANCE_PLANS.map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  onSelect={handleSelectPlan}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Why emPLE Section */}
      <section id="emple-way" className="py-20 md:py-24 border-t border-[#f1f1f1] bg-[#fafafa]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual block on Left Side */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-emerald-100 rounded-2xl -rotate-1 scale-95 opacity-50 blur-lg" />
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-white rounded-xl overflow-hidden aspect-[4/3] shadow-md border border-[#f1f1f1]"
              >
                <img
                  src="/assets/images/emple_why_us_1780859293681.png"
                  alt="Why emPLE Meeting"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Bullets layout on Right Side */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[12px] font-bold text-gray-400 tracking-widest uppercase block mb-2">
                  OUR LIFE PLANS
                </span>
                <h2 className="text-[32px] sm:text-[38px] leading-[1.12] font-bold font-display tracking-tight text-gray-950 mb-4">
                  Why emPLE Life?
                </h2>
                <p className="text-[14px] text-gray-500 leading-relaxed font-sans max-w-xl">
                  Our Life Assurance plans are designed to shield you in times of uncertainty and support you in times of opportunity. Whether you're starting out, there's an emPLE plan built for you.
                </p>
              </div>

              {/* Grid 2 Column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4 border-t border-[#f1f1f1]">
                {/* Bullet 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-gray-950 flex items-center justify-center text-white flex-shrink-0">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                    <h4 className="text-[14px] font-extrabold text-gray-950">Protection + Possibility</h4>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-relaxed pl-7.5">
                    Cover that helps you recover from setbacks and pursue your absolute medium-term milestones safely.
                  </p>
                </div>

                {/* Bullet 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-gray-950 flex items-center justify-center text-white flex-shrink-0">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                    <h4 className="text-[14px] font-extrabold text-gray-950">Trusted by thousands</h4>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-relaxed pl-7.5">
                    Backed by stellar trust from over 550,000 policyholders and corporate accounts across Ghana.
                  </p>
                </div>

                {/* Bullet 3 */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-gray-950 flex items-center justify-center text-white flex-shrink-0">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                    <h4 className="text-[14px] font-extrabold text-gray-950">Fast, Fair, Transparent</h4>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-relaxed pl-7.5">
                    We settle valid claims rapidly within 3 to 5 working days, so you focus strictly on family support.
                  </p>
                </div>

                {/* Bullet 4 */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-gray-950 flex items-center justify-center text-white flex-shrink-0">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                    <h4 className="text-[14px] font-extrabold text-gray-950">Built for You</h4>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-relaxed pl-7.5">
                    Flexible contribution models and tailored options that fit your lifetime budgets as you scale.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cream Yellow Action Banner precisely matching screenshot */}
      <section className="bg-[#fefce8] py-16 md:py-20 border-t border-b border-[#f1f1f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
            <div className="space-y-2.5 max-w-2xl">
              <span className="text-[11px] font-bold text-gray-400 tracking-wider block uppercase">
                OUR LIFE PLANS
              </span>
              <h2 className="text-[32px] sm:text-[38px] leading-[1.12] font-bold font-display tracking-tight text-gray-900">
                Take the first step toward an empowered future.
              </h2>
              <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed font-sans">
                Our Life Assurance plans are designed to shield you in times of uncertainty and support you in times of opportunity. Whether you're starting out, let's explore.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <button
                id="cta-explore-btn"
                onClick={handleExploreClick}
                className="px-6 py-3 bg-[#32B44A] hover:bg-[#059669] text-white text-[13px] font-bold tracking-wider rounded-md transition-all duration-300 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0 font-montserrat"
              >
                Explore Life Plans
              </button>
              
              <button
                id="cta-talk-btn"
                onClick={() => setIsAdvisorDrawerOpen(true)}
                className="px-6 py-3 bg-transparent hover:bg-black/5 text-gray-800 text-[13px] font-semibold tracking-wider rounded-md transition-all duration-200 cursor-pointer"
              >
                Talk to an Advisor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Finder Area */}
      <section id="branches" className="py-20 max-w-7xl mx-auto px-6">
        <div className="mb-10 space-y-2">
          <span className="text-[12px] font-bold text-gray-400 tracking-wider uppercase block">
            NATIONWIDE COVERAGE
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-bold font-display text-gray-900 tracking-tight leading-tight">
            Find an emPLE Branch Office Near You
          </h2>
          <p className="text-sm text-gray-500 font-sans max-w-xl">
            Locate authorized agencies and customer experience outlets throughout Accra, Kumasi, Takoradi, and Tamale to submit claims or manage policies in-person.
          </p>
        </div>

        <BranchFinder />
      </section>

      {/* Frequently Asked Questions accordion */}
      <section className="py-20 bg-[#faf8f6]/30 border-t border-[#f1f1f1]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10 space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">ASSURANCE CLARITY</span>
            <h2 className="text-[28px] font-bold font-display tracking-tight text-gray-950">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-[#f1f1f1] rounded-lg overflow-hidden transition-all"
                >
                  <button
                    id={`faq-toggle-${index}`}
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left font-sans text-sm font-bold text-gray-800 hover:text-emerald-800 flex justify-between items-center transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-gray-400 flex-shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 text-xs text-gray-500 leading-relaxed bg-[#fafbfb] border-t border-[#f1f1f1]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
        </>
      )}

      {currentView === "products" && (
        <>
          {/* emPLE Life Products Header title block */}
          <section className="bg-white pt-24 sm:pt-28 md:pt-36 pb-5 scroll-mt-28 md:scroll-mt-32">
            <div className="max-w-7xl mx-auto px-6">
              <h1 id="products-view-heading" className="text-[40px] sm:text-[52px] leading-[1.08] font-bold font-sans tracking-tight text-gray-950">
                emPLE Life Products
              </h1>
            </div>
          </section>

          {/* Banner Image matching screenshot */}
          <section className="pb-12">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.1 }}
              className="relative w-full overflow-hidden aspect-[21/9] sm:aspect-[24/9]"
            >
              <img
                src="/assets/images/Hero_1.png"
                alt="emPLE Life Insurance Family Theme"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </section>

          {/* At a Glance listing grid */}
          <section id="products-plans-list" className="bg-white py-16 border-t border-[#f1f1f1]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Sticky Narrative on Left Side */}
                <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
                  <span className="text-[12px] font-bold text-gray-400 tracking-widest uppercase block">
                    OUR LIFE PLANS
                  </span>
                  <h2 className="text-[32px] sm:text-[40px] leading-[1.12] font-bold font-display tracking-tight text-gray-950">
                    Life Products at a Glance to get you protected
                  </h2>
                  <p className="text-[14px] text-gray-500 leading-relaxed font-sans max-w-md">
                    Our Life Assurance plans are designed to shield you in times of uncertainty and support you in times of opportunity. Whether you're starting out, there's a designated emPLE plan built precisely for your lifepath.
                  </p>
                </div>

                {/* Vertical Cards Stack on Right Side */}
                <div className="lg:col-span-7 space-y-6">
                  {INSURANCE_PLANS.map((plan, index) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      index={index}
                      onSelect={handleSelectPlan}
                    />
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* Beautiful Cream Yellow Action Banner precisely matching screenshot */}
          <section className="bg-[#fefce8] py-16 md:py-20 border-t border-[#f1f1f1] border-b">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
                <div className="space-y-2.5 max-w-2xl">
                  <span className="text-[11px] font-bold text-gray-400 tracking-wider block uppercase">
                    OUR LIFE PLANS
                  </span>
                  <h2 className="text-[32px] sm:text-[38px] leading-[1.12] font-bold font-display tracking-tight text-gray-900">
                    Take the first step toward an empowered future.
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed font-sans">
                    Our Life Assurance plans are designed to shield you in times of uncertainty and support you in times of opportunity. Whether you're starting out, let's explore.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    id="cta-calc-btn-products"
                    onClick={handleExploreClick}
                    className="px-6 py-3 bg-[#32B44A] hover:bg-[#059669] text-white text-[13px] font-bold tracking-wider rounded-md transition-all duration-300 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0 font-montserrat"
                  >
                    View Detailed Plans
                  </button>
                  
                  <button
                    id="cta-talk-btn-products"
                    onClick={() => setIsAdvisorDrawerOpen(true)}
                    className="px-6 py-3 bg-transparent hover:bg-black/5 text-gray-800 text-[13px] font-semibold tracking-wider rounded-md transition-all duration-200 cursor-pointer"
                  >
                    Talk to an Advisor
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {currentView === "emple-way" && (
        <EmpleWayPage onContactClick={() => setIsAdvisorDrawerOpen(true)} />
      )}

      {currentView === "claims" && (
        <ClaimsPage />
      )}

      {currentView === "branches" && (
        <BranchesPage />
      )}

      {currentView === "downloads" && (
        <DownloadsPage />
      )}

      {currentView === "contact" && (
        <ContactUsPage onOpenChatDrawer={() => setIsAdvisorDrawerOpen(true)} />
      )}

      {currentView === "vacancies" && (
        <VacanciesPage />
      )}

      {/* Deep Rich Green Detailed Footer matching design layouts */}
      <footer id="claims" className="bg-[#051c0c] text-white pt-16 pb-12 font-sans border-t border-[#f1f1f1] dark-bg">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          
          {/* Support Columns */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-[12px] font-bold text-[#32B44A] tracking-widest uppercase border-b border-emerald-900 pb-2">
              HELP AND SUPPORT
            </h4>
            <div className="flex flex-col space-y-2 text-[13px] text-gray-300">
              <button 
                onClick={() => {
                  handleViewChange("branches");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                className="hover:text-emerald-300 transition-colors text-left focus:outline-none cursor-pointer"
              >
                Locate a Branch
              </button>
              <button 
                onClick={() => {
                  handleViewChange("downloads");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                className="hover:text-emerald-300 transition-colors text-left focus:outline-none cursor-pointer"
              >
                Downloads & Forms
              </button>
              <a href="#home" className="hover:text-emerald-300 transition-colors">About Us</a>
              <a href="#plans-list-section" className="hover:text-emerald-300 transition-colors">Digital Site Map</a>
              <a href="#privacy" className="hover:text-emerald-300 transition-colors">Privacy Information</a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-[12px] font-bold text-[#32B44A] tracking-widest uppercase border-b border-emerald-900 pb-2">
              OTHER LINKS
            </h4>
            <div className="flex flex-col space-y-2 text-[13px] text-gray-300 leading-normal">
              <a href="https://nicgh.org/" target="_blank" rel="noreferrer" className="hover:text-emerald-300 transition-colors">The National Insurance Commission</a>
              <a href="https://giba.org.gh/" target="_blank" rel="noreferrer" className="hover:text-emerald-300 transition-colors">Ghana Insurance Brokers Association</a>
              <a href="#pensions" className="hover:text-emerald-300 transition-colors">National Pension Regulatory Authority</a>
            </div>
          </div>

          {/* Life is emPLE Careers */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[12px] font-bold text-[#32B44A] tracking-widest uppercase border-b border-emerald-900 pb-2">
              CAREERS
            </h4>
            <div className="flex flex-col space-y-2 text-[13px] text-gray-300">
              <button 
                onClick={() => {
                  handleViewChange("vacancies");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                className="hover:text-emerald-300 transition-all font-medium cursor-pointer text-left focus:outline-none"
              >
                Join Our Team
              </button>
              <span className="text-[11px] text-emerald-500 block">We are hiring advisors nationwide!</span>
            </div>
          </div>

          {/* Direct Interactive Contacts card layout */}
          <div id="footer-contact" className="md:col-span-4 space-y-6 bg-[#031508] p-6 rounded-xl md:-mt-2 dark-bg">
            
            {/* Call details */}
            <div className="flex items-start space-x-3.5">
              <div className="mt-1 p-2.5 bg-emerald-950 rounded-full text-emerald-400">
                <MessageSquare size={18} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">CONTACT US</span>
                <a href="tel:+233302633933" className="text-[20px] sm:text-[23px] font-extrabold font-mono hover:text-emerald-300 transition-colors block text-emerald-100">
                  +233 30 263 3933
                </a>
              </div>
            </div>

            {/* Email layouts */}
            <div className="flex items-start space-x-3.5 pt-4">
              <div className="mt-1 p-2.5 bg-emerald-950 rounded-full text-emerald-400">
                <Mail size={18} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">EMAIL US</span>
                <a href="mailto:infogh@emple.com.gh" className="text-sm font-bold text-gray-100 hover:text-emerald-300 transition-colors block">
                  infogh@emple.com.gh
                </a>
              </div>
            </div>

            {/* Social media footer integrations */}
            <div className="pt-4 flex justify-between items-center">
              <span className="text-[11px] text-emerald-500 font-bold tracking-widest uppercase">Follow Us:</span>
              <div className="flex space-x-3 text-emerald-300">
                <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="w-7 h-7 bg-emerald-950 hover:bg-emerald-900 flex items-center justify-center rounded-full transition-colors text-white" aria-label="Facebook link">f</a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="w-7 h-7 bg-emerald-950 hover:bg-emerald-900 flex items-center justify-center rounded-full transition-colors text-white" aria-label="Twitter link">t</a>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="w-7 h-7 bg-emerald-950 hover:bg-emerald-900 flex items-center justify-center rounded-full transition-colors text-white" aria-label="Instagram link">in</a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="w-7 h-7 bg-emerald-950 hover:bg-emerald-900 flex items-center justify-center rounded-full transition-colors text-white" aria-label="LinkedIn link">li</a>
              </div>
            </div>

          </div>

        </div>

        {/* Legal copyright footer band */}
        <div className="max-w-7xl mx-auto px-6 border-t border-[#f1f1f1] pt-8 mt-10 text-[11px] text-gray-400 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-1.5 max-w-xl">
            <p>
              emPLE Ghana © 25. All Rights Reserved.
            </p>
            <p className="leading-relaxed">
              Omnipotent House, 10 Dzorwulu Extension (N1 Highway Road), PMB CT 456, Cantonments, Accra, Ghana. Licensed insurer under NIC regulations.
            </p>
          </div>
          <div className="flex space-x-4 text-emerald-400/80 font-medium">
            <a href="#terms" className="hover:underline">Terms of Use</a>
            <span>|</span>
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* Plan Details Modal Dialog */}
      <AnimatePresence>
        {selectedPlanForModal && (
          <PlanDetailModal
            plan={selectedPlanForModal}
            onClose={() => setSelectedPlanForModal(null)}
            onOpenCalculator={handleOpenCalculatorWithPlan}
          />
        )}
      </AnimatePresence>

      {/* Quick Advisor Request slide out modal */}
      <AnimatePresence>
        {isAdvisorDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdvisorDrawerOpen(false)}
              className="absolute inset-0 bg-[#022c22]/50 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.45 }}
              className="relative w-full max-w-md h-full bg-white shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center border-b border-[#f1f1f1] pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-emerald-50 text-[#32B44A] rounded">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h3 className="font-sans text-[16px] font-bold text-gray-900">Request Advisor Session</h3>
                      <p className="text-[11px] text-gray-500">Scheduled personal consultation consultation</p>
                    </div>
                  </div>
                  
                  <button
                    id="btn-close-advisor"
                    onClick={() => setIsAdvisorDrawerOpen(false)}
                    className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAdvisorSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="adv-name-input" className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">Your Full Name</label>
                    <input
                      id="adv-name-input"
                      type="text"
                      required
                      placeholder="e.g. Samuel Osei"
                      value={advisorName}
                      onChange={(e) => setAdvisorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-[#f1f1f1] text-sm rounded focus:outline-none focus:border-[#32B44A]"
                    />
                  </div>

                  <div>
                    <label htmlFor="adv-phone-input" className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">Mobile Phone Number</label>
                    <input
                      id="adv-phone-input"
                      type="tel"
                      required
                      placeholder="e.g. +233 55 123 4567"
                      value={advisorPhone}
                      onChange={(e) => setAdvisorPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-[#f1f1f1] text-sm rounded focus:outline-none focus:border-[#32B44A] font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="adv-notes" className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5">Message / Selected plan (Optional)</label>
                    <textarea
                      id="adv-notes"
                      rows={3}
                      placeholder="Specify your insurance goals or required coverage limits..."
                      value={advisorNotes}
                      onChange={(e) => setAdvisorNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-[#f1f1f1] text-xs rounded focus:outline-none focus:border-[#32B44A] font-sans"
                    />
                  </div>

                  <p className="text-[10px] text-gray-400 leading-normal">
                    *Our certified Life Assurance advisor will attempt to contact you on the requested telephone number within 2 business hours.
                  </p>

                  <button
                    id="adv-submit-btn"
                    type="submit"
                    className="w-full py-3 bg-[#32B44A] hover:bg-[#059669] text-white text-xs font-bold rounded-md transition-all duration-300 shadow-sm hover:shadow"
                  >
                    Register Request
                  </button>
                </form>
              </div>

              <div className="border-t border-[#f1f1f1] pt-5 text-center">
                <span className="text-[11px] text-gray-400">
                  Or call directly: <span className="font-bold text-emerald-800 font-mono">+233 30 263 3933</span>
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating alert toast notifications absolute */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-50 bg-[#064e3b] text-white px-5 py-4 rounded-xl shadow-2xl border border-[#f1f1f1] flex items-start space-x-3.5"
          >
            <div className="p-1.5 bg-[#32B44A]/25 text-[#32B44A] rounded-full mt-0.5">
              <Bell size={16} />
            </div>
            <div>
              <h5 className="text-[12px] font-bold text-[#32B44A] uppercase tracking-wide">System Notice</h5>
              <p className="text-xs text-emerald-100 mt-1 leading-normal">
                {toastMessage}
              </p>
            </div>
            <button
               onClick={() => setToastMessage(null)}
               className="text-white/50 hover:text-white ml-auto"
            >
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
