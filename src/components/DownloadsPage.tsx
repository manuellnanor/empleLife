import { useState } from "react";
import { FileText, BookOpen, Download } from "lucide-react";

interface DownloadItem {
  title: string;
  filename: string;
}

export default function DownloadsPage() {
  const [activeTab, setActiveTab] = useState<"forms" | "brochures">("forms");

  const forms: DownloadItem[] = [
    { title: "Family Eternity Plus", filename: "Family_Eternity_Plus_Form.pdf" },
    { title: "Cash Plan Application Form", filename: "Cash_Plan_Application_Form.pdf" },
    { title: "Eternity Plan Application Form", filename: "Eternity_Plan_Application_Form.pdf" },
    { title: "Funeral Plus Application Form", filename: "Funeral_Plus_Application_Form.pdf" },
    { title: "Family Financial Wellness Plan", filename: "Family_Financial_Wellness_Plan_Form.pdf" },
    { title: "Retirement Plan Application Form", filename: "Retirement_Plan_Application_Form.pdf" },
    { title: "School Finance Plan Application Form", filename: "School_Finance_Plan_Application_Form.pdf" },
    { title: "Metropolitan Life Benefit Payment Application Form", filename: "Metropolitan_Life_Benefit_Form.pdf" },
    { title: "Policy Update Form", filename: "Policy_Update_Form.pdf" },
    { title: "Death Claim Application Form", filename: "Death_Claim_Application_Form.pdf" }
  ];

  const brochures: DownloadItem[] = [
    { title: "Family Financial Wellness Plan Brochure", filename: "Family_Financial_Wellness_Brochure.pdf" },
    { title: "Family Eternity Plus Brochure", filename: "Family_Eternity_Plus_Brochure.pdf" },
    { title: "Cash Plan Plus Brochure", filename: "Cash_Plan_Plus_Brochure.pdf" },
    { title: "School Finance Plan Brochure", filename: "School_Finance_Plan_Brochure.pdf" },
    { title: "Goal Achiever Plus Brochure", filename: "Goal_Achiever_Plus_Brochure.pdf" },
    { title: "emPLE Corporate & Product Guide", filename: "emPLE_Corporate_Guide.pdf" }
  ];

  const currentItems = activeTab === "forms" ? forms : brochures;

  const handleDownload = (item: DownloadItem) => {
    // Generate a simulated file download interaction
    alert(`Initiating download for ${item.title} (${item.filename}). This download is packed and prepared on demand.`);
  };

  return (
    <div className="bg-[#fafbfb] min-h-screen py-24 sm:py-28 md:py-36 font-montserrat select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Giant Centered Header */}
        <div className="text-center mb-16">
          <h1 className="text-[42px] sm:text-[54px] font-bold text-[#052e16] tracking-tight font-sans">
            Downloads
          </h1>
          <div className="w-16 h-1 bg-[#32B44A] mx-auto mt-4 rounded-full" />
        </div>

        {/* Two Column Layout matching screenshot closely */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Fixed Width Vertical Tab Selectors */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            
            {/* Forms Tab Selector */}
            <button
              onClick={() => setActiveTab("forms")}
              className={`w-full py-4.5 px-6 rounded-lg font-sans text-[16px] tracking-wide flex items-center justify-between border cursor-pointer transition-all duration-300 ${
                activeTab === "forms"
                  ? "bg-[#052e16] text-white border-transparent shadow-md font-semibold"
                  : "bg-white text-gray-800 border-gray-100 hover:bg-gray-50 hover:border-gray-300 font-medium"
              }`}
            >
              <span className="flex items-center gap-3">
                <span>Forms</span>
                <FileText size={18} />
              </span>
            </button>

            {/* Brochures Tab Selector */}
            <button
              onClick={() => setActiveTab("brochures")}
              className={`w-full py-4.5 px-6 rounded-lg font-sans text-[16px] tracking-wide flex items-center justify-between border cursor-pointer transition-all duration-300 ${
                activeTab === "brochures"
                  ? "bg-[#052e16] text-white border-transparent shadow-md font-semibold"
                  : "bg-white text-gray-800 border-gray-100 hover:bg-gray-50 hover:border-[#32B44A] font-medium"
              }`}
            >
              <span className="flex items-center gap-3">
                <span>Brochures</span>
                <BookOpen size={18} />
              </span>
            </button>

          </div>

          {/* Right Column: Files table-list matching exact visual design of screenshot */}
          <div className="lg:col-span-9 bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {currentItems.map((item) => (
                <div 
                  key={item.title} 
                  className="px-6 py-4.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  {/* Document Title */}
                  <span className="text-[14px] sm:text-[15px] font-sans font-medium text-gray-700 leading-tight">
                    {item.title}
                  </span>

                  {/* Clean dark green Download button with cloud icon matching the screenshot */}
                  <button
                    onClick={() => handleDownload(item)}
                    className="px-5 py-2.5 bg-[#052e16] hover:bg-[#0b4d27] text-white text-[12px] font-semibold tracking-wide rounded-md transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
                  >
                    <span>Download</span>
                    <Download size={14} className="stroke-[2.5]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
