import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BRANCHES_DATA } from "../data";
import { MapPin, Phone, Mail, Search, Clock, ShieldCheck } from "lucide-react";

export default function BranchFinder() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const regions = ["All", "Accra", "Ashanti Region", "Western Region", "Northern Region"];

  const filteredBranches = BRANCHES_DATA.filter((branch) => {
    const matchesRegion = selectedRegion === "All" || branch.region === selectedRegion;
    const matchesSearch =
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div id="branch-finder-component" className="w-full space-y-6">
      {/* Filters and search layout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-[#f1f1f1]">
        {/* Buttons filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {regions.map((region) => (
            <button
              key={region}
              id={`branch-filter-${region.toLowerCase().replace(" ", "-")}`}
              onClick={() => setSelectedRegion(region)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                selectedRegion === region
                  ? "bg-[#32B44A] text-white shadow-sm"
                  : "bg-white hover:bg-gray-100 text-gray-700 border border-[#f1f1f1]"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Input Text Search */}
        <div className="relative max-w-sm w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="branch-search-input"
            type="text"
            placeholder="Search address or branch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white text-xs text-gray-800 border border-[#f1f1f1] rounded-md focus:outline-none focus:border-emerald-500 font-sans"
          />
        </div>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch, index) => (
              <motion.div
                key={branch.name}
                id={`branch-card-${branch.name.toLowerCase().replace(" ", "-")}`}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl border border-[#f1f1f1] shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3.5">
                    <span className="text-[11px] bg-slate-100 text-slate-700 dark:bg-slate-50 dark:text-slate-800 px-2 py-0.5 rounded font-mono font-medium tracking-wide">
                      {branch.region}
                    </span>
                    <span className="inline-flex items-center text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      <ShieldCheck size={10} className="mr-1" />
                      Authorized
                    </span>
                  </div>

                  <h4 className="font-sans text-[15px] font-bold text-gray-900 mb-2">{branch.name}</h4>
                  
                  {/* Address coordinates */}
                  <div className="flex items-start space-x-2.5 text-xs text-gray-500 mb-4 leading-relaxed font-sans">
                    <MapPin size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                </div>

                <div className="border-t border-[#f1f1f1] pt-4 space-y-2 text-xs">
                  {/* Phone contact details */}
                  <div className="flex items-center space-x-2.5 text-gray-600">
                    <Phone size={13} className="text-[#32B44A] flex-shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:underline font-mono font-medium">{branch.phone}</a>
                  </div>
                  
                  {/* Operating hour tags */}
                  <div className="flex items-center space-x-2.5 text-gray-600">
                    <Clock size={13} className="text-gray-400 flex-shrink-0" />
                    <span className="font-sans text-[11px] text-gray-500">Mon - Fri: 8:00 AM - 5:00 PM</span>
                  </div>

                  {/* Mail contacts */}
                  <div className="flex items-center space-x-2.5 text-gray-600">
                    <Mail size={13} className="text-gray-400 flex-shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:underline text-emerald-700 font-medium">{branch.email}</a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-2 text-center py-12 bg-gray-50 rounded-xl border border-dashed border-[#f1f1f1]"
            >
              <p className="text-sm text-gray-500">No branch office match your search guidelines.</p>
              <button
                onClick={() => {
                  setSelectedRegion("All");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs text-emerald-600 hover:underline font-bold cursor-pointer"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
