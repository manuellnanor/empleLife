import { motion } from "motion/react";
import { ArrowUpRight, Zap } from "lucide-react";
import type { InsurancePlan } from "../types";

interface PlanCardProps {
  plan: InsurancePlan;
  index: number;
  onSelect: (plan: InsurancePlan) => void;
}

export default function PlanCard({ plan, index, onSelect }: PlanCardProps) {
  return (
    <motion.div
      id={`plan-card-${plan.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 80 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onSelect(plan)}
      className="flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden border border-[#f1f1f1] shadow-xs hover:shadow-md transition-shadow duration-300 cursor-pointer group"
    >
      {/* Photo Column - occupies left side on desktop */}
      <div className="w-full md:w-[42%] relative overflow-hidden h-[240px] md:h-auto min-h-[220px]">
        <motion.img
          src={plan.image}
          alt={plan.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
          variants={{
            hover: { scale: 1.05 }
          }}
          whileHover="hover"
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Narrative & Details Column - occupies right side on desktop */}
      <div className="w-full md:w-[58%] bg-[#fcfbfa] p-8 flex flex-col justify-between items-start transition-colors duration-300 group-hover:bg-[#faf8f5]">
        <div className="w-full">
          {/* Green Electric Flash Icon */}
          <motion.div
            className="w-8 h-8 rounded bg-[#32B44A] flex items-center justify-center text-white mb-5 shadow-sm"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Zap size={15} fill="currentColor" className="text-white" />
          </motion.div>

          <h3 className="font-sans text-[20px] font-bold text-gray-950 leading-tight mb-3 group-hover:text-emerald-950 transition-colors">
            {plan.title}
          </h3>

          <p className="text-[13px] text-gray-500 leading-relaxed font-sans font-normal mb-6 max-w-lg">
            {plan.description}
          </p>
        </div>

        {/* Learn More link exactly matching emPLE guidelines */}
        <div className="inline-flex items-center text-[12px] font-bold text-gray-800 group-hover:text-[#32B44A] tracking-wider transition-colors space-x-1">
          <span>Learn More</span>
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
            className="inline-flex items-center"
          >
            <ArrowUpRight size={13} className="ml-1" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
