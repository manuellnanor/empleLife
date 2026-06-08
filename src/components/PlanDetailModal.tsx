import { motion } from "motion/react";
import { X, Check, Award, Shield, DollarSign, ArrowRight, Sparkles } from "lucide-react";
import { InsurancePlan } from "../types";

interface PlanDetailModalProps {
  plan: InsurancePlan | null;
  onClose: () => void;
  onOpenCalculator: (planId: string) => void;
}

export default function PlanDetailModal({ plan, onClose, onOpenCalculator }: PlanDetailModalProps) {
  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#022c22]/60 backdrop-blur-xs"
      />

      {/* Modal Dialog container */}
      <motion.div
        id={`detail-modal-${plan.id}`}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 180 }}
        className="bg-white rounded-xl shadow-2xl relative max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row z-10"
      >
        {/* Close Button on Top Right (desktop and mobile responsive) */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 bg-white/90 hover:bg-white text-gray-800 hover:text-red-500 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Visual Brand Panel - Left half on wide screens */}
        <div className="w-full md:w-5/12 bg-emerald-900 relative overflow-hidden flex flex-col justify-end p-8 text-white min-h-[180px] md:min-h-auto">
          <img
            src={plan.image}
            alt={plan.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/30 to-transparent" />
          <div className="relative z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest bg-emerald-400/20 text-emerald-300 uppercase mb-3 border border-emerald-400/30">
              <Sparkles size={10} className="mr-1" />
              emPLE Life Plan
            </span>
            <h2 className="text-2xl font-bold font-display tracking-tight leading-tight mb-2">
              {plan.title}
            </h2>
            <p className="text-xs text-white/80 font-sans tracking-wide">
              {plan.tagline}
            </p>
          </div>
        </div>

        {/* Informational Panel - Right half */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto max-h-[65vh] md:max-h-[90vh] flex flex-col justify-between">
          <div>
            {/* Overview description info */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">Overview</h4>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                {plan.description}
              </p>
            </div>

            {/* Premium details block */}
            <div className="grid grid-cols-2 gap-4 bg-emerald-50/50 rounded-lg p-3.5 mb-6 border border-[#f1f1f1]">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700/80 tracking-wide block">Base Premium Rates</span>
                <span className="text-lg font-bold text-emerald-900 font-mono">
                  ${plan.baseRatePerThousand.toFixed(2)}
                  <span className="text-xs font-sans font-normal text-emerald-700"> / $1k cover</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700/80 tracking-wide block">Optimal Audience</span>
                <span className="text-xs leading-tight font-medium text-emerald-900 line-clamp-2 mt-0.5">
                  {plan.targetAudience}
                </span>
              </div>
            </div>

            {/* Core Benefits Bullets */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3">Key Highlights</h4>
              <div className="space-y-2.5">
                {plan.highlightedBenefits.map((bullet, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm text-gray-700">
                    <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check size={11} className="text-[#32B44A] stroke-[3]" />
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed components grid */}
            <div className="mb-6 border-t border-[#f1f1f1] pt-5">
              <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3">Specific policy features</h4>
              <div className="space-y-4">
                {plan.benefitsList.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3.5">
                    <div className="p-2 bg-slate-50 border border-[#f1f1f1] rounded-md text-emerald-600 mt-0.5">
                      {index === 0 ? <DollarSign size={15} /> : index === 1 ? <Shield size={15} /> : <Award size={15} />}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-800">{benefit.title}</h5>
                      <p className="text-[11px] text-gray-500 leading-normal mt-0.5">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="border-t border-[#f1f1f1] pt-5 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-[11px] text-gray-400 font-sans">
              *Payout thresholds subject to rapid authentication.
            </div>
            <button
              id={`modal-calc-btn-${plan.id}`}
              onClick={() => {
                onOpenCalculator(plan.id);
                onClose();
              }}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#32B44A] hover:bg-[#059669] text-white text-xs font-bold rounded-md transition-all duration-300 hover:shadow-md active:scale-95 cursor-pointer group font-montserrat"
            >
              <span>Request Premium Quote</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
