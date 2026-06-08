import { useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  UserCheck, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Upload, 
  FileText, 
  X, 
  Search, 
  Copy, 
  Check, 
  Clock, 
  AlertCircle 
} from "lucide-react";

export default function ClaimsPage() {
  // Modal state
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  
  // Claim submission form state
  const [claimStep, setClaimStep] = useState(1);
  const [claimantName, setClaimantName] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [claimType, setClaimType] = useState("Lump sum");
  const [contactPhone, setContactPhone] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [generatedRef, setGeneratedRef] = useState("");
  const [copied, setCopied] = useState(false);

  // Claim tracking state
  const [trackRef, setTrackRef] = useState("");
  const [trackingResult, setTrackingResult] = useState<{
    found: boolean;
    ref: string;
    claimant: string;
    type: string;
    status: "submitted" | "processing" | "approved" | "settled";
    date: string;
  } | null>(null);
  const [trackError, setTrackError] = useState("");

  // Handler for custom document upload
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  // Submit new mock claim
  const handleClaimSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (claimStep === 1) {
      setClaimStep(2);
    } else {
      // Final submission step
      const randomId = "CLM-" + Math.floor(100000 + Math.random() * 900000);
      setGeneratedRef(randomId);
      // Store in simple localStorage so it can be tracked
      const claimDb = JSON.parse(localStorage.getItem("emple_claims") || "{}");
      claimDb[randomId] = {
        ref: randomId,
        claimant: claimantName,
        type: claimType,
        status: "submitted",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      };
      localStorage.setItem("emple_claims", JSON.stringify(claimDb));
      setClaimStep(3);
    }
  };

  // Reset Claim Modal State
  const resetClaimForm = () => {
    setIsClaimModalOpen(false);
    setTimeout(() => {
      setClaimStep(1);
      setClaimantName("");
      setPolicyNumber("");
      setClaimType("Lump sum");
      setContactPhone("");
      setClaimAmount("");
      setAdditionalDetails("");
      setUploadedFile(null);
      setGeneratedRef("");
      setCopied(false);
    }, 300);
  };

  // Track lookup handler
  const handleTrackSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTrackError("");
    const formattedRef = trackRef.trim().toUpperCase();
    
    // Check localStorage first
    const claimDb = JSON.parse(localStorage.getItem("emple_claims") || "{}");
    const foundClaim = claimDb[formattedRef];

    if (foundClaim) {
      setTrackingResult({ ...foundClaim, found: true });
    } else if (formattedRef === "CLM-777215" || formattedRef === "CLM-GOLD") { // Preset quick sample demo
      setTrackingResult({
        found: true,
        ref: formattedRef,
        claimant: "Samuel Osei-Tutu",
        type: "Critical Illness Shield",
        status: "processing",
        date: "Jun 5, 2026"
      });
    } else if (formattedRef === "CLM-SETTLED") { // Settled sample demo
      setTrackingResult({
        found: true,
        ref: "CLM-SETTLED",
        claimant: "Abena Owusu",
        type: "Family Eternity funeral payout",
        status: "settled",
        date: "May 28, 2026"
      });
    } else {
      setTrackError("Claim reference not found. Please verify the format (e.g. CLM-987413) or submit a new claim to test.");
      setTrackingResult(null);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#fafbfb] min-h-screen pb-16 font-sans select-none">
      
      {/* 1. HERO BANNER SECTION (Precisely matching layout and styling of screenshot) */}
      <section className="relative w-full h-[280px] sm:h-[340px] bg-[#021f0f] overflow-hidden flex items-center dark-bg">
        {/* Background image & gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/85 to-[#021f0f]/60 z-10" />
        <img
          src="/assets/images/emple_cash_plan_1780859279120.png"
          alt="emPLE Claims Support banner image"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-100"
        />
        
        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[40px] sm:text-[52px] leading-tight font-bold font-sans text-white tracking-tight"
          >
            Claims
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[13px] sm:text-[14px] text-white/95 leading-relaxed max-w-sm font-sans font-light"
          >
            Life is full of moving parts, our homes, cars, travel, health, businesses. Each deserves protection you can trust.
          </motion.p>
        </div>
      </section>

      {/* 2. PROCESS CLAIMS STORY BLOCK (Matching the second block in screenshot) */}
      <section id="claims-process-intro" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Topic tracker */}
          <div className="lg:col-span-4">
            <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">
              PROCESS CLAIMS
            </span>
          </div>

          {/* Right Column: Dynamic summary narrative + responsive image */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-6">
              <h2 className="text-[28px] sm:text-[34px] leading-[1.14] font-bold tracking-tight text-gray-950 font-sans">
                Standing with You When It Matters Most
              </h2>
              
              <div className="space-y-4 text-[13px] sm:text-[14px] leading-relaxed text-gray-500 font-sans">
                <p>
                  Life doesn't always go to plan. Accidents happen, businesses face disruption, families experience loss. In those moments, you need more than promises, you need a partner who shows up.
                </p>
                <p>
                  At emPLE, paying claims is not just a process, it's our commitment to protect what matters most to you. We know that every claim represents someone's home, livelihood, health, or future; and we treat it with the urgency, fairness, and transparency it deserves.
                </p>
              </div>
            </div>

            {/* Realistic desk/office photo showcasing support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative bg-white rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[21/11] border border-[#f1f1f1] shadow-sm"
            >
              <img
                src="/assets/images/emple_why_us_1780859293681.png"
                alt="emPLE staff smiling, delivering compassionate and transparent client support"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE CARDS ("Make a Claim" and "Track a Claim") */}
      <section className="bg-white py-16 border-t border-b border-[#f1f1f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Make a Claim */}
            <div className="bg-[#fcfcfa]/90 border border-[#f1f1f1] p-8 sm:p-10 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">
                    EASE CLAIM
                  </span>
                  <h3 className="text-[22px] sm:text-[26px] font-bold text-gray-900 tracking-tight font-sans">
                    Make a Claim
                  </h3>
                </div>
                
                <p className="text-[13px] text-gray-500 leading-relaxed font-sans font-light">
                  When life takes an unexpected turn, you deserve clarity and support — not added stress. That's why our claims process is designed to be straightforward and transparent, helping you get back on track with confidence.
                </p>

                <button
                  onClick={() => {
                    setClaimStep(1);
                    setIsClaimModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#32B44A] hover:bg-[#059669] text-white text-[12px] font-bold tracking-wider rounded-md transition-all duration-300 inline-flex items-center space-x-2 shadow-sm cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Start Claim</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Bullet checks as seen in screenshot */}
              <div className="pt-8 mt-8 border-t border-gray-100 space-y-3.5">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 size={16} className="text-[#32B44A] shrink-0" />
                  <span className="text-[12px] text-gray-600 font-sans">Submit online through our website in minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 size={16} className="text-[#32B44A] shrink-0" />
                  <span className="text-[12px] text-gray-600 font-sans">Send your details via WhatsApp for quick support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 size={16} className="text-[#32B44A] shrink-0" />
                  <span className="text-[12px] text-gray-600 font-sans">Visit any of our branches nationwide for in-person assistance</span>
                </div>
              </div>
            </div>

            {/* Card 2: Track a Claim */}
            <div className="bg-[#fcfcfa]/90 border border-[#f1f1f1] p-8 sm:p-10 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block mb-1">
                    EASE TRACKING
                  </span>
                  <h3 className="text-[22px] sm:text-[26px] font-bold text-gray-900 tracking-tight font-sans">
                    Track a Claim
                  </h3>
                </div>

                <p className="text-[13px] text-gray-500 leading-relaxed font-sans font-light">
                  Your peace of mind matters. That's why we aim to give you clarity every step of the way. Once you've made a claim, you can follow its progress in real time. Once your claim is logged, you will receive a unique reference number.
                </p>

                <button
                  onClick={() => setIsTrackingModalOpen(true)}
                  className="px-5 py-2.5 bg-[#32B44A] hover:bg-[#059669] text-white text-[12px] font-bold tracking-wider rounded-md transition-all duration-300 inline-flex items-center space-x-2 shadow-sm cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Track My Claim</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Bullet checks as seen in screenshot */}
              <div className="pt-8 mt-8 border-t border-gray-100 space-y-3.5">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 size={16} className="text-[#32B44A] shrink-0" />
                  <span className="text-[12px] text-gray-600 font-sans">Monitor progress online in real time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 size={16} className="text-[#32B44A] shrink-0" />
                  <span className="text-[12px] text-gray-600 font-sans">Get updates on the status of your claim</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 size={16} className="text-[#32B44A] shrink-0" />
                  <span className="text-[12px] text-gray-600 font-sans">Know exactly where things stand — no hidden steps, no uncertainty</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TIMELINES DARK GREEN BAND SECTION (Matching third block in screenshot) */}
      <section className="bg-[#04200e] text-white py-16 md:py-20 select-none dark-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4 mb-16 max-w-3xl">
            <span className="text-[11px] font-bold text-emerald-400 tracking-widest uppercase block">
              TRUST
            </span>
            <h2 className="text-[32px] sm:text-[40px] leading-tight font-bold font-sans tracking-tight text-white">
              Timelines You Can Trust
            </h2>
            <p className="text-emerald-100/80 text-[13px] sm:text-[14px] leading-relaxed font-sans font-light max-w-2xl">
              We know speed matters. That's why we commit to transparency that ensures you're never left wondering and clear timelines you can count on. You'll always know what's happening, and when.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Timeline Item 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#32B44A] text-white flex items-center justify-center shrink-0">
                <Zap size={22} className="fill-white/10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans">
                Claim submission
              </h3>
              <p className="text-emerald-100/60 text-xs sm:text-[13px] leading-relaxed font-sans font-light">
                Instantly acknowledged once received
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#32B44A] text-white flex items-center justify-center shrink-0">
                <Activity size={22} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans">
                Claim processing & updates
              </h3>
              <p className="text-emerald-100/60 text-xs sm:text-[13px] leading-relaxed font-sans font-light">
                Instantly acknowledged once received
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#32B44A] text-white flex items-center justify-center shrink-0">
                <UserCheck size={22} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans">
                Settlement
              </h3>
              <p className="text-emerald-100/60 text-xs sm:text-[13px] leading-relaxed font-sans font-light">
                Valid claims paid promptly, with clear communication at every stage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DOCUMENT CHECKLISTS SECTION (Matching fifth block in screenshot) */}
      <section id="claims-downloads-section" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left label */}
            <div className="lg:col-span-4">
              <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase block">
                EMPOWER
              </span>
            </div>

            {/* Right main checklist layout */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-[26px] sm:text-[30px] font-bold text-gray-900 tracking-tight font-sans">
                Document Checklists
              </h3>
              
              <p className="text-[13px] text-gray-500 leading-relaxed font-sans font-light max-w-2xl">
                Across Africa, we are designing solutions that meet real needs in life insurance, general insurance, and savings & investments, serving both formal and informal sectors.
              </p>

              <div className="pt-4">
                <a
                  href="/assets/images/Hero_1.png"
                  download="emPLE_Claim_Checklists.zip"
                  onClick={(e) => {
                    // Prevent actual navigation but simulate downloading
                    e.preventDefault();
                    const link = document.createElement("a");
                    link.href = "#";
                    // Just alert/state downloader simulation
                    alert("Your download has been request. Checklist PDF is package and compiling.");
                  }}
                  className="px-5 py-3 bg-[#32B44A] hover:bg-[#059669] text-white text-[12px] font-bold tracking-wider rounded-md transition-all duration-300 inline-flex items-center space-x-2.5 shadow-sm hover:-translate-y-0.5"
                >
                  <span>Download Document</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* --- CLAIMS MODALS (Start Claim Modal) --- */}
      <AnimatePresence>
        {isClaimModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={resetClaimForm}
              className="fixed inset-0 bg-black"
            />

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden border border-[#f1f1f1]"
            >
              {/* Header */}
              <div className="border-b border-[#f1f1f1] px-6 py-4 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center space-x-2.5 text-gray-900">
                  <ShieldCheck className="text-[#32B44A]" size={20} />
                  <span className="font-semibold text-sm">Submit emPLE Insurance Claim</span>
                </div>
                <button
                  onClick={resetClaimForm}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Multi-step Content container */}
              <div className="p-6">
                
                {/* Step indicator */}
                {claimStep < 3 && (
                  <div className="flex items-center justify-between mb-6 text-xs text-gray-400">
                    <span className={claimStep === 1 ? "text-[#32B44A] font-bold" : ""}>1. Personal Info</span>
                    <div className="h-0.5 bg-gray-100 flex-1 mx-3" />
                    <span className={claimStep === 2 ? "text-[#32B44A] font-bold" : ""}>2. Document Details</span>
                  </div>
                )}

                {claimStep === 1 && (
                  <form onSubmit={handleClaimSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-gray-500 uppercase">Policyholder Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samuel Osei-Tutu"
                        className="w-full px-3 py-2.5 bg-white border border-[#f1f1f1] rounded text-[13px] font-sans focus:outline-none focus:border-[#32B44A]"
                        value={claimantName}
                        onChange={(e) => setClaimantName(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-gray-500 uppercase">Policy Number</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. EMP-2039A"
                          className="w-full px-3 py-2.5 bg-white border border-[#f1f1f1] rounded text-[13px] font-mono focus:outline-none focus:border-[#32B44A]"
                          value={policyNumber}
                          onChange={(e) => setPolicyNumber(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-gray-500 uppercase">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +233 55 123 4567"
                          className="w-full px-3 py-2.5 bg-white border border-[#f1f1f1] rounded text-[13px] font-mono focus:outline-none focus:border-[#32B44A]"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-gray-500 uppercase">Assurance Plan Type</label>
                      <select
                        className="w-full px-3 py-2.5 bg-white border border-[#f1f1f1] rounded text-[13px] font-sans focus:outline-none focus:border-[#32B44A]"
                        value={claimType}
                        onChange={(e) => setClaimType(e.target.value)}
                      >
                        <option value="Family Financial Wellness Plan">Family Financial Wellness Plan</option>
                        <option value="Family Eternity Plus">Family Eternity Plus</option>
                        <option value="Cash Plan Plus">Cash Plan Plus</option>
                        <option value="School Finance Plan">School Finance Plan</option>
                        <option value="Goal Achiever Plus">Goal Achiever Plus</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#32B44A] hover:bg-[#059669] text-white text-[12px] font-bold tracking-wider rounded transition-all mt-4 uppercase"
                    >
                      Continue to Next Step
                    </button>
                  </form>
                )}

                {claimStep === 2 && (
                  <form onSubmit={handleClaimSubmit} className="space-y-4">
                    <div className="space-y-1.5 bg-[#fbfbf9] p-3 rounded border border-yellow-50 text-[11px] text-gray-500 flex items-start space-x-2">
                      <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>Please specify benefit amount and provide supporting attachments (such as medical reports, death certificates, or ID photocopies).</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-gray-500 uppercase">Required Benefit Claim Amount (GHS)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 15000"
                        className="w-full px-3 py-2.5 bg-white border border-[#f1f1f1] rounded text-[13px] font-mono focus:outline-none focus:border-[#32B44A]"
                        value={claimAmount}
                        onChange={(e) => setClaimAmount(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-gray-500 uppercase">Event Description & Supporting Notes</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Provide details about the claim event (date, status, place, etc.)..."
                        className="w-full px-3 py-2.5 bg-white border border-[#f1f1f1] rounded text-[12px] font-sans focus:outline-none focus:border-[#32B44A]"
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                      />
                    </div>

                    {/* Drag and Drop Upload */}
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-gray-500 uppercase">Upload Supporting Documentation</label>
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-5 text-center transition-colors cursor-pointer ${
                          dragOver ? "border-[#32B44A] bg-emerald-50/20" : "border-gray-200 hover:border-[#32B44A]"
                        }`}
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Upload size={22} className="mx-auto text-gray-400 mb-1.5" />
                        {uploadedFile ? (
                          <div className="flex items-center justify-center space-x-1.5 text-xs text-emerald-600 font-bold">
                            <FileText size={14} />
                            <span className="truncate max-w-[200px]">{uploadedFile.name}</span>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <p className="text-xs text-gray-700 font-bold">Drag and drop file here, or click to upload</p>
                            <p className="text-[10px] text-gray-400">PDF, JPG, PNG up to 10MB</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setClaimStep(1)}
                        className="flex-1 py-3 border border-[#f1f1f1] hover:bg-gray-50 text-gray-700 text-[12px] font-bold tracking-wider rounded transition-all uppercase"
                      >
                        Back
                      </button>
                      
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-[#32B44A] hover:bg-[#059669] text-white text-[12px] font-bold tracking-wider rounded transition-all uppercase"
                      >
                        Submit Final Claim
                      </button>
                    </div>
                  </form>
                )}

                {claimStep === 3 && (
                  <div className="text-center py-6 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#32B44A] flex items-center justify-center mx-auto scale-110">
                      <CheckCircle2 size={38} className="stroke-[1.5]" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900">Claim Received Successfully</h3>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Your emPLE Life policy claim dossier has been compiled and logged. It has been directed immediately to our rapid claims division.
                      </p>
                    </div>

                    {/* Code display */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-[#f1f1f1] max-w-xs mx-auto space-y-1.5">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Claim Track Reference</span>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-mono text-base font-extrabold text-[#064e3b] tracking-wider">{generatedRef}</span>
                        <button
                          onClick={copyToClipboard}
                          className="text-gray-400 hover:text-emerald-600 focus:outline-none p-1 rounded hover:bg-gray-200 transition-colors"
                          title="Copy Claim Code"
                        >
                          {copied ? <Check size={14} className="text-[#32B44A]" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <p className="text-[11px] text-gray-400">
                        Our standard processing response window is <span className="font-bold text-gray-600">24 to 48 hours</span>. We will text you at <span className="font-mono font-bold text-gray-600">{contactPhone}</span> with review updates.
                      </p>

                      <button
                        onClick={resetClaimForm}
                        className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-[11px] font-bold tracking-wider uppercase rounded cursor-pointer"
                      >
                        Done & Close
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CLAIMS MODALS (Track Claim Modal) --- */}
      <AnimatePresence>
        {isTrackingModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsTrackingModalOpen(false);
                setTrackRef("");
                setTrackingResult(null);
                setTrackError("");
              }}
              className="fixed inset-0 bg-black"
            />

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden border border-[#f1f1f1]"
            >
              {/* Header */}
              <div className="border-b border-[#f1f1f1] px-6 py-4 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center space-x-2.5 text-gray-900">
                  <Activity className="text-[#32B44A]" size={19} />
                  <span className="font-semibold text-sm">Real-Time Claim Tracker</span>
                </div>
                <button
                  onClick={() => {
                    setIsTrackingModalOpen(false);
                    setTrackRef("");
                    setTrackingResult(null);
                    setTrackError("");
                  }}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                
                {/* Search Form */}
                <form onSubmit={handleTrackSubmit} className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Enter Claim Reference Number</label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        required
                        placeholder="e.g. CLM-987413"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#f1f1f1] rounded text-[13px] font-mono focus:outline-none focus:border-[#32B44A] uppercase"
                        value={trackRef}
                        onChange={(e) => setTrackRef(e.target.value)}
                      />
                      <Search size={14} className="absolute left-3.5 top-[13.5px] text-gray-400" />
                    </div>
                    <button
                      type="submit"
                      className="px-5 bg-gray-900 hover:bg-black text-white text-[12px] font-bold rounded cursor-pointer shrink-0 transition-colors"
                    >
                      Search
                    </button>
                  </div>
                  
                  {/* Demo Helper codes */}
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 pt-1.5 text-[10px] text-gray-400">
                    <span>Try testing with:</span>
                    <button
                      type="button"
                      onClick={() => setTrackRef("CLM-777215")}
                      className="underline font-mono text-emerald-600 hover:text-emerald-700 font-bold focus:outline-none"
                    >
                      CLM-777215
                    </button>
                    <span>or</span>
                    <button
                      type="button"
                      onClick={() => setTrackRef("CLM-SETTLED")}
                      className="underline font-mono text-emerald-600 hover:text-emerald-700 font-bold focus:outline-none"
                    >
                      CLM-SETTLED
                    </button>
                  </div>
                </form>

                {trackError && (
                  <div className="p-3 bg-red-50 text-red-600 border border-red-100/50 rounded text-xs flex items-start space-x-2 font-sans leading-relaxed">
                    <AlertCircle size={15} className="shrink-0 mt-0.5" />
                    <span>{trackError}</span>
                  </div>
                )}

                {/* Tracking Visualization Result */}
                {trackingResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-[#f1f1f1] rounded-xl overflow-hidden shadow-sm"
                  >
                    {/* Header info bar */}
                    <div className="bg-gray-50/50 border-b border-[#f1f1f1] p-4 flex justify-between items-center text-xs">
                      <div className="space-y-0.5">
                        <span className="text-gray-400 text-[10px] font-bold uppercase block">Claimant</span>
                        <span className="font-bold text-gray-900">{trackingResult.claimant}</span>
                      </div>
                      <div className="text-right space-y-0.5">
                        <span className="text-gray-400 text-[10px] font-bold uppercase block">Plan Cover</span>
                        <span className="text-gray-500 max-w-[140px] truncate block font-bold text-[11px]">{trackingResult.type}</span>
                      </div>
                    </div>

                    {/* Progress tracker state */}
                    <div className="p-5 space-y-6">
                      
                      {/* Visual gauge line */}
                      <div className="relative">
                        
                        {/* Static connecting background lines */}
                        <div className="absolute top-[13px] left-3 right-3 h-0.5 bg-gray-100 z-0" />
                        
                        {/* Dynamic colored progress fill */}
                        <div 
                          className="absolute top-[13px] left-3 h-0.5 bg-[#32B44A] z-0 transition-all duration-700" 
                          style={{
                            width: 
                              trackingResult.status === "submitted" ? "0%" : 
                              trackingResult.status === "processing" ? "33.3%" : 
                              trackingResult.status === "approved" ? "66.6%" : "100%"
                          }}
                        />

                        {/* Tracker nodes */}
                        <div className="flex justify-between items-center relative z-10 select-none">
                          
                          {/* Node 1: Submitted */}
                          <div className="text-center w-1/4">
                            <div className="w-7 h-7 rounded-full bg-[#32B44A] text-white flex items-center justify-center mx-auto text-[10px] font-extrabold shadow-sm">
                              <Check size={12} className="stroke-[3]" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-900 block mt-2 leading-none">Submitted</span>
                            <span className="text-[8px] text-gray-400 mt-1 block select-none leading-none">{trackingResult.date}</span>
                          </div>

                          {/* Node 2: Document Processing */}
                          <div className="text-center w-1/4">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold transition-colors shadow-sm ${
                              ["processing", "approved", "settled"].includes(trackingResult.status)
                                ? "bg-[#32B44A] text-white" 
                                : "bg-white border-2 border-gray-100 text-gray-300"
                            }`}>
                              {["approved", "settled"].includes(trackingResult.status) ? (
                                <Check size={12} className="stroke-[3]" />
                              ) : trackingResult.status === "processing" ? (
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#32B44A]"></span>
                                </span>
                              ) : (
                                <Clock size={12} />
                              )}
                            </div>
                            <span className={`text-[10px] font-bold block mt-2 leading-none ${
                              ["processing", "approved", "settled"].includes(trackingResult.status) ? "text-gray-900" : "text-gray-300"
                            }`}>Document Review</span>
                            <span className="text-[8px] text-gray-400 mt-1 block leading-none">
                              {trackingResult.status === "processing" ? "In progress" : ["approved", "settled"].includes(trackingResult.status) ? "Completed" : ""}
                            </span>
                          </div>

                          {/* Node 3: Approved */}
                          <div className="text-center w-1/4">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold transition-colors shadow-sm ${
                              ["approved", "settled"].includes(trackingResult.status)
                                ? "bg-[#32B44A] text-white" 
                                : "bg-white border-2 border-gray-100 text-gray-300"
                            }`}>
                              {trackingResult.status === "settled" ? (
                                <Check size={12} className="stroke-[3]" />
                              ) : trackingResult.status === "approved" ? (
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#32B44A]"></span>
                                </span>
                              ) : (
                                <Clock size={12} />
                              )}
                            </div>
                            <span className={`text-[10px] font-bold block mt-2 leading-none ${
                              ["approved", "settled"].includes(trackingResult.status) ? "text-gray-900" : "text-gray-300"
                            }`}>Authorized</span>
                            <span className="text-[8px] text-gray-400 mt-1 block leading-none">
                              {trackingResult.status === "approved" ? "Authorized" : trackingResult.status === "settled" ? "Approved" : ""}
                            </span>
                          </div>

                          {/* Node 4: Settled */}
                          <div className="text-center w-1/4">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold transition-colors shadow-sm ${
                              trackingResult.status === "settled"
                                ? "bg-[#32B44A] text-white" 
                                : "bg-white border-2 border-gray-100 text-gray-300"
                            }`}>
                              <CheckCircle2 size={13} className={trackingResult.status === "settled" ? "text-white" : "text-gray-300"} />
                            </div>
                            <span className={`text-[10px] font-bold block mt-2 leading-none ${
                              trackingResult.status === "settled" ? "text-gray-900" : "text-gray-300"
                            }`}>Paid Out</span>
                            <span className="text-[8px] text-gray-400 mt-1 block leading-none">
                              {trackingResult.status === "settled" ? "Dispatched" : ""}
                            </span>
                          </div>

                        </div>

                      </div>

                      {/* Descriptive narrative status check */}
                      <div className="bg-emerald-50/40 rounded-lg p-3.5 border border-emerald-100/30 text-xs text-emerald-800 leading-relaxed font-sans space-y-1">
                        <p className="font-bold">
                          {trackingResult.status === "submitted" && "Dossier Received, Pending Document Review"}
                          {trackingResult.status === "processing" && "Documents Being Validated"}
                          {trackingResult.status === "approved" && "Benefit Claim Authorized & Processed"}
                          {trackingResult.status === "settled" && "Settlement Dispatched & Cleared"}
                        </p>
                        <p className="text-emerald-700 font-light select-text">
                          {trackingResult.status === "submitted" && "Your submitted materials are being cataloged by our systems. No further action is required at this time."}
                          {trackingResult.status === "processing" && "Your policy and supporting document attachments are actively being validated for authenticity by our claims committee."}
                          {trackingResult.status === "approved" && "Your benefit check has been authorized. The payout package will be wired or paid in-person relative to your coverage structure within 12 hours!"}
                          {trackingResult.status === "settled" && `Success! The authorized claim GHS sum has been fully wired. Referenced on file: ${trackingResult.ref}.`}
                        </p>
                      </div>

                    </div>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
