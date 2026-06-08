import { useState } from "react";
import type { FormEvent } from "react";
import { ThumbsUp, CheckCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactUsPageProps {
  onOpenChatDrawer: () => void;
}

export default function ContactUsPage({ onOpenChatDrawer }: ContactUsPageProps) {
  const [feedbackType, setFeedbackType] = useState<"compliment" | "complaint" | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim() || !feedbackEmail.trim()) return;
    
    // Simulate API feedback dispatch
    setFeedbackSubmitted(true);
    setTimeout(() => {
      // Clear states after showing feedback completion
      setFeedbackSubmitted(false);
      setFeedbackType(null);
      setFeedbackText("");
      setFeedbackEmail("");
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen font-montserrat select-none pb-20">
      
      {/* Immersive visual banner header featuring high contrast image matching screenshot layout */}
      <div className="relative h-[280px] sm:h-[340px] md:h-[400px] w-full overflow-hidden bg-[#fafafa] pt-24 sm:pt-28 md:pt-36 scroll-mt-28 md:scroll-mt-32">
        {/* Absolute portrait overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/assets/images/director_female_2_1780860132717.png" 
            alt="emPLE representative smiling" 
            className="w-full h-full object-cover object-[center_35%] transform scale-100 saturate-[1.1]"
            referrerPolicy="no-referrer"
          />
          {/* Gentle, high-fidelity dark gradient overlay to ensure great text contrast without washing out the photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        </div>

        {/* Content container inside the header */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 h-full flex flex-col justify-end pb-8 sm:pb-12 md:pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="text-[34px] sm:text-[44px] md:text-[52px] font-bold text-white tracking-tight leading-[1.1] font-sans select-text">
              We’d Love to Hear <br />
              From You
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Core Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-16 sm:mt-24">
        
        {/* Segment Intro Title matching exact wording */}
        <div className="text-center space-y-2 mb-16 sm:mb-24">
          <h4 className="text-[18px] sm:text-[20px] font-extrabold text-[#052e16] tracking-wider uppercase font-sans">
            Let's chat
          </h4>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-gray-900 tracking-tight leading-tight max-w-lg mx-auto">
            Pick your preference
          </h2>
          <div className="w-12 h-1 bg-[#32B44A] mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid matching numbers 1 to 4 precisely */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 max-w-5xl mx-auto">
          
          {/* Option 1: Live Web Chat */}
          <div className="flex flex-col items-center text-center space-y-4 px-4">
            <div className="w-[52px] h-[52px] rounded-full bg-[#052e16] flex items-center justify-center font-sans font-extrabold text-white text-[20px] shadow">
              1
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-900 tracking-tight font-sans">
                Chat here and now
              </h3>
              <p className="text-[13.5px] text-gray-500 leading-relaxed font-sans max-w-sm">
                Our chatbot is ready to give you instant answers.
              </p>
            </div>
            <button
              onClick={onOpenChatDrawer}
              className="mt-2 px-5 py-2.5 bg-[#32B44A] hover:bg-[#0b8a5f] text-white text-[13px] font-bold tracking-wide rounded-md transition-all duration-300 shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Use our chatbot</span>
              <span className="text-[14px]">💬</span>
            </button>
          </div>

          {/* Option 2: Feedback & Complaints */}
          <div className="flex flex-col items-center text-center space-y-4 px-4">
            <div className="w-[52px] h-[52px] rounded-full bg-[#052e16] flex items-center justify-center font-sans font-extrabold text-white text-[20px] shadow">
              2
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-900 tracking-tight font-sans">
                Compliments & Complaints
              </h3>
              <p className="text-[13.5px] text-gray-500 leading-relaxed font-sans max-w-sm">
                Good or bad, we’re all ears
              </p>
            </div>
            <button
              onClick={() => setFeedbackType("compliment")}
              className="mt-2 px-5 py-2.5 bg-[#32B44A] hover:bg-[#0b8a5f] text-white text-[13px] font-bold tracking-wide rounded-md transition-all duration-300 shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1"
            >
              <span>Send Feedback</span>
              <span className="font-extrabold text-[12px] tracking-tight">≫</span>
            </button>
          </div>

          {/* Option 3: Call Centre */}
          <div className="flex flex-col items-center text-center space-y-4 px-4">
            <div className="w-[52px] h-[52px] rounded-full bg-[#052e16] flex items-center justify-center font-sans font-extrabold text-white text-[20px] shadow">
              3
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-900 tracking-tight font-sans">
                Contact our call centre
              </h3>
              <p className="text-[13.5px] text-gray-500 leading-relaxed font-sans max-w-md select-text">
                Our people are standing by to take your call, Mondays – Fridays: 8am – 5pm, excluding Public Holidays
              </p>
            </div>
            <a 
              href="tel:+233302633933"
              className="text-[20px] sm:text-[22px] font-extrabold text-[#052e16] hover:text-[#32B44A] font-mono tracking-wide transition-colors cursor-pointer select-text mt-1.5 block"
            >
              +233 (0) 30 263 3933
            </a>
          </div>

          {/* Option 4: Head Office */}
          <div className="flex flex-col items-center text-center space-y-4 px-4">
            <div className="w-[52px] h-[52px] rounded-full bg-[#052e16] flex items-center justify-center font-sans font-extrabold text-white text-[20px] shadow">
              4
            </div>
            <div className="space-y-1.5">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-900 tracking-tight font-sans">
                Our Head Office Details
              </h3>
              <p className="text-[14px] sm:text-[15px] font-semibold text-[#052e16] tracking-tight font-sans select-text leading-snug max-w-sm mt-1">
                Omnipotent House, 10 Dzorwulu Extension (N1 Road)
              </p>
              <span className="text-[12px] text-gray-400 font-sans tracking-wide block pt-1">
                Accra, Ghana
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Beautiful Modal popups for sending Compliments and Complaints (Feedback flow) */}
      <AnimatePresence>
        {feedbackType !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark back backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setFeedbackType(null)}
              className="absolute inset-0 bg-[#021307]"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 overflow-hidden z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setFeedbackType(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none p-1 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={16} />
              </button>

              {/* Feedback Submitted Success Alert */}
              <AnimatePresence mode="wait">
                {feedbackSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-[48px] h-[48px] rounded-full bg-emerald-50 text-[#32B44A] flex items-center justify-center">
                      <CheckCircle size={28} className="stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-md font-bold text-gray-900 font-sans">
                        Thank You!
                      </h3>
                      <p className="text-xs text-gray-500 max-w-xs font-sans">
                        Your valuable insights have been recorded. Our support division will investigate this request diligently.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#32B44A] tracking-widest uppercase">
                        VALUED CLIENT REVIEWS
                      </span>
                      <h3 className="text-[18px] font-bold text-gray-900 font-sans leading-tight">
                        Send Compliments & Complaints
                      </h3>
                      <p className="text-xs text-gray-500 font-sans">
                        We strive to offer premium services. Help us align with your corporate demands perfectly.
                      </p>
                    </div>

                    {/* Toggle Selector Segment */}
                    <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-50 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setFeedbackType("compliment")}
                        className={`py-2 text-xs font-bold font-sans rounded-md transition-all flex items-center justify-center gap-1.5 ${
                          feedbackType === "compliment"
                            ? "bg-white text-[#052e16] shadow-sm"
                            : "text-gray-500 hover:text-gray-950"
                        }`}
                      >
                        <ThumbsUp size={12} />
                        <span>Compliment</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeedbackType("complaint")}
                        className={`py-2 text-xs font-bold font-sans rounded-md transition-all flex items-center justify-center gap-1.5 ${
                          feedbackType === "complaint"
                            ? "bg-white text-rose-700 shadow-sm"
                            : "text-gray-500 hover:text-rose-600"
                        }`}
                      >
                        <span>Complaint</span>
                      </button>
                    </div>

                    {/* Input Field Section */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-extrabold font-sans text-gray-500 uppercase mb-1">
                          Your Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={feedbackEmail}
                          onChange={(e) => setFeedbackEmail(e.target.value)}
                          placeholder="client@company.com"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#32B44A] text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold font-sans text-gray-500 uppercase mb-1">
                          Share your feedback
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder={
                            feedbackType === "compliment"
                              ? "Share what we did exceptionally well today..."
                              : "Detail your complaint so our quality Assurance group can resolve it immediately..."
                          }
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#32B44A] text-gray-800 resize-none font-sans"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#052e16] hover:bg-[#074721] text-white text-[12px] font-bold rounded-md tracking-wider transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Submit Form Details</span>
                      <Send size={12} />
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
