import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Search, Calendar, MapPin, ChevronRight, Briefcase, X, FileText, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Job {
  id: string;
  title: string;
  company: string;
  postedDate: string;
  location: string;
  specialization: string;
  country: string;
  type: string; // Full-time, Permanent
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export default function VacanciesPage() {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedSpec, setSelectedSpec] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Application form state
  const [applyName, setApplyName] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyResume, setApplyResume] = useState<File | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  // Load the embed content
  const loadContent = (country?: string, specialization?: string) => {
    const sh = (window as any).SH_Embed;
    if (!sh) {
      console.warn("SH_Embed is not loaded yet.");
      return;
    }

    const c = country ?? selectedCountry;
    const s = specialization ?? selectedSpec;

    const embed = document.getElementById('SH_Embed');
    if (embed) {
      embed.innerHTML = sh.pull({
        key: 'eyJpdiI6IkpIQmNaYVoya2g1ZkdBcWQwVkhSZ2c9PSIsInZhbHVlIjoiUW1SZGoyUlNYL3Via3pTKytnNytzVjJCSkxnSjVEdlpWRzVBMVQxeTljQlo3M1YzQ000NW91OU1CMGw2WHk3Nk1vOFpQZ3hTeC90b1J5RzZIRENZaGc9PSIsIm1hYyI6ImU3YTU2NWVjODQ4MjkxNmNhMWNhNDJlYzhlNDEyMWE2MzdlYWNhMTE3NjEzNzMwMjUwOWYzZmY1YWViNGY5NTYiLCJ0YWciOiIifQ==',
        base_url: 'https://emplegh.seamlesshiring.com/',
        country: c === 'all' ? 'all' : c,
        specialization: s === 'all' ? 'all' : s
      });

      // Wrap select fields and button in flex container
      const selects = embed.querySelectorAll('select');
      const button = embed.querySelector('button');

      if (selects.length && button) {
        const wrapper = document.createElement('div');
        wrapper.className = 'sh-filters flex flex-col sm:flex-row gap-4 mb-8 bg-white p-6 rounded-lg border border-gray-100 shadow-sm';
        selects.forEach(sel => {
          sel.className = "flex-1 min-w-[200px] pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded text-gray-700 text-sm font-medium focus:outline-none focus:border-[#32B44A] transition-all cursor-pointer appearance-none bg-no-repeat bg-[center_right_1rem] bg-[length:1.25em_1.25em]";
          sel.style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`;
          wrapper.appendChild(sel);
        });
        button.className = "px-8 py-3.5 bg-[#052e16] hover:bg-[#074721] text-white font-sans font-bold text-sm tracking-wider rounded transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow";
        wrapper.appendChild(button);
        embed.prepend(wrapper);
      }
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://emplegh.seamlesshiring.com/js/embed.js";
    script.async = true;
    script.onload = () => {
      if ((window as any).SH_Embed) {
        setEmbedLoaded(true);
      } else {
        const fallback = document.createElement("script");
        fallback.src = "https://seamlesshiring.com/js/embed.js";
        fallback.async = true;
        fallback.onload = () => {
          if ((window as any).SH_Embed) {
            setEmbedLoaded(true);
          } else {
            setEmbedError(true);
          }
        };
        fallback.onerror = () => setEmbedError(true);
        document.body.appendChild(fallback);
      }
    };
    script.onerror = () => {
      const fallback = document.createElement("script");
      fallback.src = "https://seamlesshiring.com/js/embed.js";
      fallback.async = true;
      fallback.onload = () => {
        if ((window as any).SH_Embed) {
          setEmbedLoaded(true);
        } else {
          setEmbedError(true);
        }
      };
      fallback.onerror = () => setEmbedError(true);
      document.body.appendChild(fallback);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (embedLoaded) {
      loadContent(selectedCountry, selectedSpec);
    }
  }, [embedLoaded, selectedCountry, selectedSpec]);

  const initialJobs: Job[] = [
    {
      id: "corp-biz-mgr",
      title: "Corporate Business Manager",
      company: "emPLE Health Insurance Ghana LTD",
      postedDate: "Tue. 26 May, 2026",
      location: "Dzorwulu, Accra (Head Office)",
      specialization: "business-mgmt",
      country: "gh",
      type: "Full-time",
      description: "We are seeking an dynamic Corporate Business Manager to foster relationship growth, lead strategic corporate key account acquisitions, and oversee product representations for emPLE Health in West Africa.",
      responsibilities: [
        "Formulate and drive sales strategies for corporate and SME market segments.",
        "Nurture relationships with corporate clients, HR heads, and key brokers.",
        "Ensure competitive positioning of emPLE healthcare benefit solutions.",
        "Collaborate with underwriting and operations divisions to customize group schemes."
      ],
      requirements: [
        "Bachelor's degree in Business Administration, Marketing, or public health administration (Master's preferred).",
        "5+ years of active experience in commercial group healthcare schemes or corporate insurance sales.",
        "Outstanding negotiation, presentation, and team coordination expertise.",
        "Strong network within public and private payroll structures in Ghana."
      ]
    },
    {
      id: "qa-auditor",
      title: "Quality Assurance Auditor",
      company: "emPLE Life Insurance Ghana LTD",
      postedDate: "Mon. 15 June, 2026",
      location: "Accra, Ghana",
      specialization: "finance-audit",
      country: "gh",
      type: "Full-time",
      description: "The QA Auditor evaluates operational and claim processes for quality, financial prudence, regulatory adherence, and general service delivery metrics.",
      responsibilities: [
        "Audit claim files, underwriting documents, and customer correspondence for internal standards.",
        "Collaborate with risk compliance groups to verify regulatory reports are intact.",
        "Devise corrective recommendations for client service divisions."
      ],
      requirements: [
        "Strong familiarity with NIC (National Insurance Commission) guidelines.",
        "Degree in Accounting, Finance, Actuarial Studies, or related professional qualification.",
        "3+ years in auditing role within a life insurance environment."
      ]
    },
    {
      id: "retail-sales-lead",
      title: "Retail Sales Team Lead",
      company: "emPLE Pensions Ghana LTD",
      postedDate: "Thu. 28 May, 2026",
      location: "Kumasi Branch, Ghana",
      specialization: "sales",
      country: "gh",
      type: "Full-time",
      description: "Direct a motivated team of retail agency professionals to register individual asset builders on emPLE tier-3 personal pension plans.",
      responsibilities: [
        "Train, mentor, and monitor monthly target completions for Kumasi sales agents.",
        "Host neighborhood informational seminars regarding savings and pension policies.",
        "Liaise with industrial associations for micro-pension pilot expansion."
      ],
      requirements: [
        "Excellent leadership talent and active training capabilities.",
        "Diploma or University degree with 3 years of agency, retail banking, or insurance experience.",
        "Familiarity with Ashanti region retail landscapes and dialects."
      ]
    },
    {
      id: "sr-frontend",
      title: "Senior Frontend Engineer (React/TypeScript)",
      company: "emPLE Digital Solutions Group",
      postedDate: "Fri. 05 June, 2026",
      location: "Accra, Ghana (Hybrid Available)",
      specialization: "engineering-it",
      country: "gh",
      type: "Full-time",
      description: "Build, maintain, and expand premium digital claims tracking systems, agency management portals, and modern customer calculators utilizing React, styled natively with Tailwind CSS.",
      responsibilities: [
        "Lead client-side performance audits and scale self-service portals.",
        "Architect scalable UI component libraries aligned with emPLE branding guidelines.",
        "Integrate RESTful backends and Gemini AI-grounded interactive components cleanly."
      ],
      requirements: [
        "5+ years developer experience crafting production-grade React interfaces.",
        "Highly proficient in modern web standards, state managers, and component bundles.",
        "Familiarity with Docker, Tailwind CSS, Vite, and Node.js backend proxy configurations."
      ]
    }
  ];

  const countries = [
    { value: "all", label: "Select country" },
    { value: "gh", label: "Ghana" }
  ];

  const specializations = [
    { value: "all", label: "Select specialization" },
    { value: "business-mgmt", label: "Business Management" },
    { value: "finance-audit", label: "Finance & Audit" },
    { value: "sales", label: "Sales & Marketing" },
    { value: "engineering-it", label: "Engineering & IT" }
  ];

  // Search logic
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);

  const handleSearchCommit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    if (embedLoaded) {
      loadContent(selectedCountry, selectedSpec);
      return;
    }
    
    let results = initialJobs;

    if (selectedCountry !== "all") {
      results = results.filter(j => j.country === selectedCountry);
    }
    if (selectedSpec !== "all") {
      results = results.filter(j => j.specialization === selectedSpec);
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      results = results.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.description.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q)
      );
    }

    setFilteredJobs(results);
  };

  const handleApplySubmit = (e: FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setSelectedJob(null);
      setApplyName("");
      setApplyEmail("");
      setApplyResume(null);
    }, 2800);
  };

  return (
    <div className="bg-[#FAFBFB] min-h-screen font-sans select-none pb-24">
      
      {/* Immersive head header matching screenshot */}
      <div className="relative h-[280px] sm:h-[340px] md:h-[380px] w-full overflow-hidden bg-[#0a2312]">
        
        {/* Exact Photo placement from system assets */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/assets/images/director_male_1_1780860112475.png" 
            alt="Male professional smiling work call center" 
            className="w-full h-full object-cover object-[center_28%] opacity-65 transform scale-100 saturate-[1.1] filter contrast-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle natural vignetting gradient matching screenshot layout */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFBFB] via-[#FAFBFB]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031d0d]/80 via-transparent to-[#031d0d]/40" />
        </div>

        {/* Content layout strictly following design guidelines */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 h-full flex flex-col justify-center items-center text-center pb-8 sm:pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-4"
          >
            <h1 className="text-[34px] sm:text-[46px] md:text-[54px] font-extrabold text-white tracking-tight leading-none">
              Job Vacancies
            </h1>
            <p className="text-[14px] sm:text-[15.5px] font-light text-gray-100/90 leading-relaxed max-w-lg mx-auto font-sans">
              Explore our latest job opportunities and find the role that's right for you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Jobs Listing Structure exactly duplicating layout screenshot */}
      <div className="max-w-4xl mx-auto px-6 mt-12 sm:mt-16">
        
        {/* Render the SH_Embed container, customized for our theme */}
        <div 
          id="SH_Embed" 
          className={`w-full select-text transition-all duration-350 min-h-[150px] ${embedLoaded ? 'block' : 'hidden'}`} 
        />

        {embedError && (
          <div className="bg-white border border-amber-100 rounded-lg p-6 text-center shadow-sm">
            <Briefcase size={34} className="text-amber-400 mx-auto mb-3 stroke-[1.5]" />
            <h4 className="text-sm font-bold text-gray-800 font-sans">Live vacancies could not load</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 leading-relaxed">
              Use the available local listings below while the external hiring feed is unavailable.
            </p>
          </div>
        )}

        {!embedLoaded && (
          filteredJobs.length > 0 ? (
            <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white border border-gray-100 hover:border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Meta details */}
                <div className="flex flex-col space-y-1.5 mb-5 select-text">
                  <h3 className="text-[17px] sm:text-[19px] font-bold text-gray-900 font-sans leading-tight">
                    {job.title}
                  </h3>
                  <span className="text-[13px] sm:text-[14px] font-medium text-gray-500 font-sans tracking-wide">
                    {job.company}
                  </span>
                </div>

                {/* Separator line */}
                <div className="w-full h-px bg-gray-100 my-4" />

                {/* Additional Metadata indicators exactly styled */}
                <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-[12.5px] text-gray-500 font-sans mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-400" />
                    <span>Posted: {job.postedDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 select-text">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={14} className="text-gray-400" />
                    <span className="bg-emerald-50 text-[#047857] px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase">
                      {job.type}
                    </span>
                  </div>
                </div>

                {/* Call to action element right aligned */}
                <div className="flex justify-start">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setAppliedSuccess(false);
                    }}
                    className="group text-[13px] font-bold text-gray-900 group-hover:text-[#32B44A] flex items-center gap-1 transition-all hover:text-[#32B44A] cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-50 rounded-lg py-16 px-6 text-center shadow-xs">
            <Briefcase size={40} className="text-gray-300 mx-auto mb-4 stroke-[1.5]" />
            <h4 className="text-base font-bold text-gray-800 font-sans">No matching positions found</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 leading-relaxed">
              We update our active roles regularly. Alter your filters or search options to review other premium careers at emPLE.
            </p>
            <button
              onClick={() => {
                setSelectedCountry("all");
                setSelectedSpec("all");
                setSearchQuery("");
                setFilteredJobs(initialJobs);
              }}
              className="mt-4 text-xs font-bold text-[#32B44A] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )
      )}

      </div>

      {/* Bottom search section for vacancy filtering */}
      <div className="max-w-4xl mx-auto px-6 mt-10 sm:mt-14">
        <form 
          onSubmit={handleSearchCommit}
          className="bg-white rounded-lg shadow-xl hover:shadow-2xl border border-gray-100 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
        >
          <div className="md:col-span-4 relative">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-100 rounded text-gray-700 text-sm font-medium focus:outline-none focus:border-[#32B44A] transition-colors cursor-pointer appearance-none bg-no-repeat bg-[center_right_1rem] bg-[length:1.25em_1.25em]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`
              }}
            >
              {countries.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-5 relative">
            <select
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value)}
              className="w-full pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-100 rounded text-gray-700 text-sm font-medium focus:outline-none focus:border-[#32B44A] transition-colors cursor-pointer appearance-none bg-no-repeat bg-[center_right_1rem] bg-[length:1.25em_1.25em]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`
              }}
            >
              {specializations.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#052e16] hover:bg-[#074721] text-white font-sans font-bold text-sm tracking-wider rounded transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow hover:shadow-md"
            >
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>

      {/* View Details Interactive Sidebar / Modal Overlay */}
      <AnimatePresence>
        {selectedJob !== null && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-black/60"
            />

            {/* Panel slider */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg sm:max-w-xl bg-white shadow-2xl h-full flex flex-col items-stretch z-10 overflow-hidden"
            >
              {/* Header inside Panel */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-[#052e16] text-white">
                <div className="space-y-1.5 max-w-md select-text">
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/55 px-2.5 py-1 rounded inline-block uppercase tracking-wider font-sans">
                    {selectedJob.company}
                  </span>
                  <h3 className="text-[18px] sm:text-[21px] font-bold tracking-tight leading-snug">
                    {selectedJob.title}
                  </h3>
                  <p className="text-xs text-emerald-100/80 flex items-center gap-1.5 select-text pt-1">
                    <MapPin size={12} />
                    <span>{selectedJob.location}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1 px-1.5 focus:outline-none hover:bg-white/10 rounded text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* Applied success state widget inside the slider */}
                <AnimatePresence mode="wait">
                  {appliedSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-6 text-center space-y-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle size={24} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-gray-900 font-sans">Application Received!</h4>
                        <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto mt-1 leading-relaxed">
                          Your profile details and file have been securely dispatched. Our talent acquisition specialists will contact you soon.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      {/* Job Description Text area */}
                      <div className="space-y-2 select-text">
                        <h4 className="text-[13.5px] font-bold uppercase tracking-wider text-gray-800 font-sans">
                          Job Overview
                        </h4>
                        <p className="text-[13px] text-gray-600 leading-relaxed font-sans font-light">
                          {selectedJob.description}
                        </p>
                      </div>

                      {/* Responsibilities list */}
                      {selectedJob.responsibilities && (
                        <div className="space-y-2.5">
                          <h4 className="text-[13.5px] font-bold uppercase tracking-wider text-gray-800 font-sans">
                            Core Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {selectedJob.responsibilities.map((resp, ix) => (
                              <li key={ix} className="text-[12.5px] text-gray-600 leading-relaxed font-sans flex items-start gap-2.5 select-text">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#32B44A] mt-1.5 shrink-0" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Job Requirements list */}
                      {selectedJob.requirements && (
                        <div className="space-y-2.5">
                          <h4 className="text-[13.5px] font-bold uppercase tracking-wider text-gray-800 font-sans">
                            Candidate Requirements
                          </h4>
                          <ul className="space-y-2">
                            {selectedJob.requirements.map((req, ix) => (
                              <li key={ix} className="text-[12.5px] text-gray-600 leading-relaxed font-sans flex items-start gap-2.5 select-text">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Interactive Apply Form */}
                      <div className="border-t border-gray-100 pt-6">
                        <h4 className="text-[14px] font-bold text-gray-900 font-sans mb-3 flex items-center gap-1.5">
                          <FileText size={16} className="text-[#32B44A]" />
                          <span>Quick Application Form</span>
                        </h4>

                        <form onSubmit={handleApplySubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">
                                Full Name
                              </label>
                              <input
                                type="text"
                                required
                                value={applyName}
                                onChange={(e) => setApplyName(e.target.value)}
                                placeholder="E.g. Joyce Mensah"
                                className="w-full px-3 py-2 border border-gray-200 rounded text-xs text-gray-800 focus:outline-none focus:border-[#32B44A]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">
                                Email Address
                              </label>
                              <input
                                type="email"
                                required
                                value={applyEmail}
                                onChange={(e) => setApplyEmail(e.target.value)}
                                placeholder="joyce@company.com"
                                className="w-full px-3 py-2 border border-gray-200 rounded text-xs text-gray-800 focus:outline-none focus:border-[#32B44A]"
                              />
                            </div>
                          </div>

                          {/* Simplified file mock upload and select */}
                          <div>
                            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1.5 font-sans">
                              Upload CV/Resume (.pdf, .doc)
                            </label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-5 text-center hover:border-[#32B44A] transition-colors bg-gray-50/50 cursor-pointer relative">
                              <input
                                type="file"
                                required
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setApplyResume(e.target.files[0]);
                                  }
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept=".pdf,.doc,.docx"
                              />
                              <div className="space-y-1 text-gray-500">
                                <span className="text-[12px] block font-bold text-gray-700">
                                  {applyResume ? applyResume.name : "Click to select or drag Resume file here"}
                                </span>
                                <span className="text-[10px] block text-gray-400">
                                  Maximum file size 5MB
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 bg-[#052e16] hover:bg-[#074721] text-white text-[12.5px] font-bold rounded tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow"
                          >
                            <span>Submit My Application</span>
                            <Send size={12} />
                          </button>
                        </form>
                      </div>
                    </>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
