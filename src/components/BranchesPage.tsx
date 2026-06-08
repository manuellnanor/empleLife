import { useState } from "react";
import { MapPin, Search, X } from "lucide-react";

interface Branch {
  name: string;
  lines: string[];
  searchTags: string[];
}

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const branches: Branch[] = [
    {
      name: "Head Office - Accra Office",
      lines: [
        "North Ridge near DHL Office",
        "North Ridge, Accra",
        "Tel: 0302 633933"
      ],
      searchTags: ["accra", "head office", "north ridge", "dhl", "0302633933"]
    },
    {
      name: "Ring Road Office",
      lines: [
        "2nd Floor, Fidelity House",
        "(Near Starr FM/Nima Police Station)",
        "Ring Road Central",
        "Tel: 0577682091"
      ],
      searchTags: ["ring road", "fidelity", "starr fm", "nima", "accra", "0577682091"]
    },
    {
      name: "Tema Office",
      lines: [
        "Community 11",
        "General Hospital Road, Tema",
        "Tel: 0303 304045/0303 304046"
      ],
      searchTags: ["tema", "community 11", "hospital", "0303304045", "0303304046"]
    },
    {
      name: "Sunyani Office",
      lines: [
        "1st Floor, Knights of St John's Building",
        "Opposite the Corona Park",
        "Sunyani",
        "Tel: 0352 025853"
      ],
      searchTags: ["sunyani", "knights", "corona", "0352025853"]
    },
    {
      name: "Kumasi Office",
      lines: [
        "Chelsea House",
        "Adum",
        "Kumasi",
        "Tel: 03220 45820/ 80285/ 49034"
      ],
      searchTags: ["kumasi", "chelsea", "adum", "0322045820", "80285", "49034"]
    },
    {
      name: "Obuasi Office",
      lines: [
        "Off Golf Course Road",
        "Obuasi",
        "Tel: 03225 41657/03225 41659"
      ],
      searchTags: ["obuasi", "golf course", "0322541657", "0322541659"]
    },
    {
      name: "Akim Oda Office",
      lines: [
        "Hollard Building, Kwame Nk Nu Way",
        "Goil Filling Station near the Sports",
        "Stadium",
        "Tel: 0206715349",
        "0244183004/0275650302 / 02089527552"
      ],
      searchTags: ["akim oda", "hollard", "kwame nk", "goil", "sports stadium", "0206715349", "0244183004", "0275650302", "02089527552"]
    },
    {
      name: "Koforidua Office",
      lines: [
        "SSNIT Building near Chris Café Restaurant",
        "Ministries Area - Koforidua",
        "Tel: 0302 915981/0546 156482"
      ],
      searchTags: ["koforidua", "ssnit", "chris cafe", "ministries", "0302915981", "0546156482"]
    },
    {
      name: "Nkawkaw Office",
      lines: [
        "Near GES, Betrans Hotel Junction",
        "Ataa 'N' Ataa, Nkawkaw",
        "Tel: 0577681222/0201599610"
      ],
      searchTags: ["nkawkaw", "ges", "betrans", "ataa", "0577681222", "0201599610"]
    },
    {
      name: "Tamale Office",
      lines: [
        "J.Y. Pharmacy Building, 2nd Floor",
        "Kalpohini Estate Road, Tamale",
        "Tel: 0372 099 453"
      ],
      searchTags: ["tamale", "pharmacy", "kalpohini", "0372099453"]
    },
    {
      name: "Bolgatanga Office",
      lines: [
        "Stadium Road",
        "Same building with Aspect 'A'",
        "Adj ITTU, Bolgatanga",
        "Tel: 0201047555"
      ],
      searchTags: ["bolgatanga", "stadium", "aspect", "ittu", "0201047555"]
    },
    {
      name: "Denu Office",
      lines: [
        "Police Station Road",
        "High Ermocool, Denu",
        "Tel: 0577681223"
      ],
      searchTags: ["denu", "police", "ermocool", "0577681223"]
    },
    {
      name: "Ho Office",
      lines: [
        "NDC Park",
        "Lavamart Supermarket",
        "Ho",
        "Tel: 0244183004/0275650302 / 0289527552"
      ],
      searchTags: ["ho", "ndc", "lavamart", "0244183004", "0275650302", "0289527552"]
    },
    {
      name: "Hohoe Office",
      lines: [
        "Adjacent MTN Office",
        "Zongo Road",
        "Hohoe",
        "Tel: 0249889640/0362 720607"
      ],
      searchTags: ["hohoe", "mtn", "zongo", "0249889640", "0362720607"]
    },
    {
      name: "Cape Coast Office",
      lines: [
        "Abease",
        "Adj. Metropolitan Education Office",
        "Tel: 03321 38448"
      ],
      searchTags: ["cape coast", "abease", "education", "0332138448"]
    },
    {
      name: "Twifo Praso Office",
      lines: [
        "Opposite Old Council",
        "No.1 Station",
        "Twifo Praso",
        "Tel: 0577681219"
      ],
      searchTags: ["twifo praso", "council", "station", "0577681219"]
    },
    {
      name: "Weija Office",
      lines: [
        "Sereda Office Building",
        "Opposite the Block Factory Bus stop",
        "Tel: 0577 681212/0302 850306"
      ],
      searchTags: ["weija", "sereda", "block factory", "bus stop", "0577681212", "0302850306"]
    },
    {
      name: "Bibiani Office",
      lines: [
        "Sefwi Bekwai Road,",
        "Molta junction near Henex Radio",
        "Bibiani",
        "Tel: 0577681225"
      ],
      searchTags: ["bibiani", "sefwi", "bekwai", "molta", "henex", "0577681225"]
    },
    {
      name: "Takoradi Office",
      lines: [
        "CIC Building, 1st Floor",
        "Adj. Vodafone Regional Office",
        "(Chod Road) - Takoradi",
        "Tel: 0312 031896"
      ],
      searchTags: ["takoradi", "cic", "vodafone", "chod road", "0312031896"]
    },
    {
      name: "Tarkwa Office",
      lines: [
        "Alimens Building,",
        "Opposite Get in Touch Hotel",
        "Tarkwa",
        "Tel: 0312 322055/020 8540048"
      ],
      searchTags: ["tarkwa", "alimens", "get in touch", "0312322055", "0208540048"]
    },
    {
      name: "Wa Office",
      lines: [
        "Off Airport Road near Sinapi Aba Savings",
        "& Loans,",
        "Former CFC Office, Wa",
        "Tel: 039 202 4244"
      ],
      searchTags: ["wa", "airport road", "sinapi", "loans", "cfc", "0392024244"]
    }
  ];

  const filteredBranches = branches.filter((branch) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      branch.name.toLowerCase().includes(query) ||
      branch.searchTags.some((tag) => tag.includes(query)) ||
      branch.lines.some((line) => line.toLowerCase().includes(query))
    );
  });

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16 md:py-20 font-montserrat select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Subtle, highly functional Search filter matching the exact visual style of professional pages */}
        <div className="mb-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-8">
          <div>
            <h1 className="text-[28px] sm:text-[34px] font-bold text-gray-900 tracking-tight font-sans">
              emPLE Branches
            </h1>
            <p className="text-[13px] text-gray-500 font-sans mt-1.5 max-w-xl leading-relaxed">
              Serving you across the nation with 21 authorized customer points. Use the lookup tool below to instantly spotlight your nearest branch office.
            </p>
          </div>

          <div className="relative w-full max-w-xs md:max-w-sm">
            <input
              type="text"
              placeholder="Search branch by town or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-gray-50/80 hover:bg-gray-50 text-[13px] font-sans text-gray-800 border border-gray-100 rounded-md focus:outline-none focus:border-[#32B44A] transition-all"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-0.5 rounded-full hover:bg-gray-100"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* 21 Branches 3-column elegant layout strictly customized with cards and dark green hover transitions */}
        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBranches.map((branch) => (
              <div 
                key={branch.name}
                className="group p-6 bg-white border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 hover:bg-[#052e16] hover:border-transparent flex items-start gap-4 cursor-pointer"
              >
                {/* Visual pin icon circular emblem matching green & white background structure with clean inverted hover feedback */}
                <div className="w-[42px] h-[42px] rounded-full bg-[#052e16] group-hover:bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm transition-all duration-300">
                  <MapPin size={18} className="text-white group-hover:text-[#052e16] fill-white/10 group-hover:fill-[#052e16]/15 transition-colors duration-300" />
                </div>

                {/* Details layout */}
                <div className="space-y-2">
                  <h3 className="text-[15.5px] sm:text-[16.5px] font-bold text-gray-900 group-hover:text-white leading-tight font-sans tracking-tight transition-colors duration-300">
                    {branch.name}
                  </h3>
                  
                  <div className="space-y-1 text-[12.5px] leading-relaxed text-gray-500 group-hover:text-gray-200 font-sans font-light transition-colors duration-300">
                    {branch.lines.map((line, lIdx) => {
                      const isPhone = line.toLowerCase().startsWith("tel:") || line.includes("/") || /^\d{10}/.test(line.trim());
                      return (
                        <p key={lIdx} className="m-0 select-text">
                          {isPhone ? (
                            <span className="font-semibold text-gray-600 group-hover:text-emerald-300 font-mono tracking-wide transition-colors duration-300">{line}</span>
                          ) : (
                            line
                          )}
                        </p>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-100 rounded-xl bg-gray-50/50">
            <p className="text-sm text-gray-500 font-sans">No branch offices found matching "{searchQuery}".</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-[#32B44A] hover:underline text-xs font-bold font-sans cursor-pointer"
            >
              Show all branches
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
