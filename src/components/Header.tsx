import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import type { AppView } from "../App";

interface HeaderProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onContactClick: () => void;
}

export default function Header({ currentView, onViewChange, onContactClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "PRODUCTS", href: "#products" },
    { label: "CLAIMS", href: "#claims" },
    { label: "BRANCHES", href: "#branches" },
    { label: "emPLE WAY", href: "#emple-way" },
    { label: "DOWNLOADS", href: "#downloads" },
  ];

  const handleNavClick = (href: string, label: string) => {
    setIsMobileMenuOpen(false);
    if (label === "emPLE WAY") {
      onViewChange("emple-way");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "PRODUCTS" || label === "HEALTH" || label === "PENSIONS") {
      onViewChange("products");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "CLAIMS") {
      onViewChange("claims");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "BRANCHES") {
      onViewChange("branches");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "DOWNLOADS") {
      onViewChange("downloads");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "CONTACT US") {
      onViewChange("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "VACANCIES") {
      onViewChange("vacancies");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onViewChange("landing");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (href === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 120);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top Banner exactly matching screenshot */}
      <div className="bg-[#052e16] text-white text-[12px] py-1.5 px-6 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center space-x-2 font-medium tracking-wide">
          <Phone size={12} className="text-emerald-400" />
            <span><span className="hidden sm:inline">Talk To Us: </span><span className="text-emerald-300 pointer-events-auto hover:underline font-mono">+233 30 263 3933</span></span>
        </div>
        <div className="flex items-center space-x-6 text-[10px] sm:text-[11px] font-bold tracking-widest text-emerald-100/90">
          <button onClick={() => handleNavClick("#home", "HOME")} className="hover:text-emerald-300 transition-colors uppercase cursor-pointer">HOME</button>
          <button onClick={() => handleNavClick("#plans-list-section", "PRODUCTS")} className="hover:text-emerald-300 transition-colors uppercase cursor-pointer">HEALTH</button>
          <button onClick={() => handleNavClick("#plans-list-section", "PRODUCTS")} className="hover:text-emerald-300 transition-colors uppercase cursor-pointer">PENSIONS</button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className={`w-full bg-white border-b border-gray-100 transition-all duration-300 ${
        isScrolled ? "shadow-sm py-2" : "py-4.5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => handleNavClick("#home", "HOME")} className="flex items-center cursor-pointer text-left focus:outline-none">
            <img
              src="/assets/images/emple-life-insurance-logo.png"
              alt="emPLE Life Insurance"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </button>

          {/* Large screens menu items aligned to the right */}
          <nav className="hidden lg:flex items-center space-x-7 ml-auto">
            {menuItems.map((item) => {
              const isActive = 
                (item.label === "emPLE WAY" && currentView === "emple-way") ||
                (item.label === "PRODUCTS" && currentView === "products") ||
                (item.label === "CLAIMS" && currentView === "claims") ||
                (item.label === "BRANCHES" && currentView === "branches") ||
                (item.label === "DOWNLOADS" && currentView === "downloads");
              return (
                <button
                  key={item.label}
                  id={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                  onClick={() => handleNavClick(item.href, item.label)}
                  className={`font-montserrat text-[13px] tracking-wide transition-colors cursor-pointer focus:outline-none pb-1 border-b-2 transition-all ${
                    isActive 
                      ? "text-[#32B44A] border-[#32B44A] font-semibold" 
                      : "text-gray-700 hover:text-[#32B44A] border-transparent font-medium"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            {/* CAREER dropdown mimicking template */}
            <div className={`relative group cursor-pointer inline-flex items-center font-montserrat text-[13px] tracking-wide pb-1 border-b-2 ${
              currentView === "vacancies"
                ? "text-[#32B44A] border-[#32B44A] font-semibold"
                : "text-gray-700 hover:text-[#32B44A] border-transparent font-medium"
            }`}>
              <span>CAREER</span>
              <ChevronDown size={12} className={`ml-1 ${currentView === "vacancies" ? "text-[#32B44A]" : "text-gray-400 group-hover:text-[#32B44A]"}`} />
              <div className="absolute top-full right-0 mt-2 w-36 bg-white border border-gray-100 shadow-md rounded-md py-1 hidden group-hover:block z-50">
                <button 
                  onClick={() => handleNavClick("#vacancies", "VACANCIES")} 
                  className="w-full text-left block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#32B44A] font-semibold"
                >
                  Vacancies
                </button>
              </div>
            </div>

            <button
              id="nav-contact-us"
              onClick={() => handleNavClick("#footer-contact", "CONTACT US")}
              className={`font-montserrat text-[13px] tracking-wide transition-colors cursor-pointer pb-1 border-b-2 transition-all ${
                currentView === "contact"
                  ? "text-[#32B44A] border-[#32B44A] font-semibold"
                  : "text-gray-700 hover:text-[#32B44A] border-transparent font-medium"
              }`}
            >
              CONTACT US
            </button>
          </nav>

          {/* Mobile hamburger selector */}
          <button
            id="mobile-menu-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 ml-4 text-gray-600 hover:text-[#32B44A] focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay and Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-white shadow-xl z-50 p-6 flex flex-col justify-start lg:hidden"
            >
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <span className="text-sm font-bold text-gray-500 tracking-wider">Menu</span>
                <button
                  id="mobile-drawer-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col space-y-5">
                {menuItems.map((item) => {
                  const isActive = 
                    (item.label === "emPLE WAY" && currentView === "emple-way") ||
                    (item.label === "PRODUCTS" && currentView === "products") ||
                    (item.label === "CLAIMS" && currentView === "claims") ||
                    (item.label === "BRANCHES" && currentView === "branches") ||
                    (item.label === "DOWNLOADS" && currentView === "downloads");
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href, item.label)}
                      className={`text-left py-2 text-sm tracking-wider border-b border-gray-50 transition-colors ${
                        isActive 
                          ? "text-[#32B44A] font-semibold" 
                          : "text-gray-800 hover:text-[#32B44A] font-medium"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => handleNavClick("#vacancies", "VACANCIES")}
                  className={`text-left py-2 text-sm tracking-wider border-b border-gray-50 transition-colors ${
                      currentView === "vacancies" 
                        ? "text-[#32B44A] font-semibold" 
                        : "text-gray-800 hover:text-[#32B44A] font-medium"
                  }`}
                >
                  VACANCIES
                </button>
                <button
                  onClick={() => handleNavClick("#footer-contact", "CONTACT US")}
                  className={`text-left py-2 text-sm tracking-wider border-b border-gray-50 transition-colors ${
                    currentView === "contact" 
                      ? "text-[#32B44A] font-semibold" 
                      : "text-gray-800 hover:text-[#32B44A] font-medium"
                  }`}
                >
                  CONTACT US
                </button>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4 font-mono">
                  <Phone size={12} />
                  <span>+233 30 263 3933</span>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="w-full text-center py-2.5 bg-[#32B44A] text-white text-xs font-bold rounded-md"
                >
                  Talk with Advisor
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
