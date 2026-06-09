import { InsurancePlan, Branch } from "./types";

const buildPersonImagePath = (name: string) => {
  const normalized = name
    .toLowerCase()
    .replace(/['".(),]/g, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `/assets/images/${normalized}.png`;
};

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: "wellness",
    title: "Family Financial Wellness Plan",
    tagline: "Tailored protection for life's modern requirements",
    description: "We understand your needs and have tailored our Family Financial Wellness Plan to help you achieve absolute financial security and wellness for the rest of your life.",
    image: "/assets/images/emple_wellness_1780859250792.png",
    baseRatePerThousand: 1.25,
    minimumCoverage: 10000,
    maximumCoverage: 500000,
    highlightedBenefits: [
      "High insurance coverage matching family income goals",
      "Tailored flexisave account option for milestone payouts",
      "Immediate financial peace of mind against life's events"
    ],
    benefitsList: [
      {
        title: "Family Income Benefit",
        description: "Provides a steady monthly income payout stream to support household expenses for up to 10 years."
      },
      {
        title: "Critical Illness Shield",
        description: "Receive a lump sum of up to 50% of the coverage amount instantly upon diagnosis of qualifying conditions."
      },
      {
        title: "Disability Benefit Waiver",
        description: "Waives all future premiums if the primary policyholder suffers severe accidental disability."
      }
    ],
    targetAudience: "Families, children, and spouses looking for reliable regular income support.",
    iconColor: "emerald"
  },
  {
    id: "eternity",
    title: "Family Eternity Plus",
    tagline: "Caring solutions that honor legacy and memory",
    description: "We provide you the most suitable solution to finance funeral expenses of loved ones, so the focus is strictly on emotional comfort and the memory of the loss, never on the cost.",
    image: "/assets/images/emple_eternity_1780859266732.png",
    baseRatePerThousand: 0.85,
    minimumCoverage: 5000,
    maximumCoverage: 100000,
    highlightedBenefits: [
      "Ultra-rapid claim payouts within 24 hours of notification",
      "Repatriation premium support options for departed family members",
      "Generous memorial service cash bonus upon maturity"
    ],
    benefitsList: [
      {
        title: "Fast-Track Death Claim",
        description: "Guarantees payout processing within 24 hours to handle urgent funeral logistics with dignity."
      },
      {
        title: "Extended Family Cover",
        description: "Enables protection to cover parents, parents-in-law, and siblings of the policyholder."
      },
      {
        title: "Maturity cashback",
        description: "Returns up to 15% of total premiums paid back to you if zero claims are filed in a 10-year block."
      }
    ],
    targetAudience: "Unions, extended African families, and legacy builders seeking support.",
    iconColor: "emerald"
  },
  {
    id: "cash_plan",
    title: "Cash Plan Plus",
    tagline: "Vibrant high-yielding accumulation for your future achievements",
    description: "Cash Plan Plus is a unit-linked investment product designed to help clients accumulate wealth over the years to enable them to finance their dream projects, startups, or lifestyle landmarks.",
    image: "/assets/images/emple_cash_plan_1780859279120.png",
    baseRatePerThousand: 2.10,
    minimumCoverage: 20000,
    maximumCoverage: 750000,
    highlightedBenefits: [
      "Direct capital wealth accumulation through prime managed funds",
      "Survival loyalty bonuses credited to your account balance",
      "Double maturity payout options based on fund performance choice"
    ],
    benefitsList: [
      {
        title: "Investment Fund Choice",
        description: "Decide between Conservative, Balanced, or Growth accounts backed by trusted national bonds and equities."
      },
      {
        title: "Partial Withdrawals",
        description: "Access up to 25% of your accrued cash value after Year 3 for unexpected cash flow needs."
      },
      {
        title: "Loyalty Boosters",
        description: "Adds an automated 5% premium bonus directly to your investment portfolio every 3 policy anniversaries."
      }
    ],
    targetAudience: "Investors, entrepreneurs, and career-builders seeking high returns + life assurance.",
    iconColor: "emerald"
  },
  {
    id: "school",
    title: "School Finance Plan",
    tagline: "A fortress securing uninterrupted education pathways",
    description: "Provide uninterrupted top-tier education for your child and enjoy absolute peace of mind, knowing their academic milestones are fully funded no matter what life presents.",
    image: "/assets/images/emple_wellness_1780859250792.png", // reused as in real site layout
    baseRatePerThousand: 1.40,
    minimumCoverage: 15000,
    maximumCoverage: 300000,
    highlightedBenefits: [
      "Guaranteed schedule of academic milestone payouts at JHS, SHS, and University",
      "School tuition fee coverage support in the event of parental disability",
      "Academic excellence rewards and scholar cash grants"
    ],
    benefitsList: [
      {
        title: "Educational Milestone Payouts",
        description: "Automated, target-specific lump-sums dispatched precisely when your child steps into higher education grades."
      },
      {
        title: "Premium Waiver Shield",
        description: "If the parent experiences permanent disability or death, the policy is fully paid-up by emPLE while payouts continue."
      },
      {
        title: "High-Achiever Scholar Fund",
        description: "Offers additional cash grants to students who maintain exceptional national exam results."
      }
    ],
    targetAudience: "Parents and guardians demanding stable, guaranteed paths for childhood learning.",
    iconColor: "emerald"
  },
  {
    id: "goal",
    title: "Goal Achiever Plus",
    tagline: "Structured planning that transforms dreams into realities",
    description: "Plan towards your medium-term life objectives. Dreams are not achieved by chance; they demand structured, high-yield capital accumulation and diligent shielding.",
    image: "/assets/images/emple_goal_1780859312692.png",
    baseRatePerThousand: 1.65,
    minimumCoverage: 10000,
    maximumCoverage: 500000,
    highlightedBenefits: [
      "Structured maturity horizons customized between 3 to 15 years",
      "Consistent interest compounding backing your financial goals",
      "Lump sum bonus payout options upon maturity completion"
    ],
    benefitsList: [
      {
        title: "Medium Term Horizon",
        description: "Customize your optimal savings duration parameters to match buying a home, starting a farm, or marriage."
      },
      {
        title: "Accidental Death Multiplier",
        description: "Provides an additional 100% of the coverage layout if policy claims are triggered via severe transit accident."
      },
      {
        title: "Goal Lock-In Security",
        description: "Guarantees maturity values from market volatility, preserving hard-won gains during term endings."
      }
    ],
    targetAudience: "Young professionals, goal-oriented planners, and business builders.",
    iconColor: "emerald"
  }
];

export const BRANCHES_DATA: Branch[] = [
  {
    name: "Dzorwulu Head Office",
    region: "Accra",
    address: "Omnipotent House, 10 Dzorwulu Extension (N1 Highway Road), PMB CT 456, Cantonments, Accra, Ghana",
    phone: "+233 30 263 3933",
    email: "infogh@emple.com.gh"
  },
  {
    name: "Adum Kumasi Branch",
    region: "Ashanti Region",
    address: "2nd Floor, Harper Road Plaza, Opposite Adum Post Office, Kumasi, Ghana",
    phone: "+233 32 208 4591",
    email: "kumasigh@emple.com.gh"
  },
  {
    name: "Takoradi Harbour Mall",
    region: "Western Region",
    address: "Harbour View Business Enclave, Shop 4, Ground Floor, Takoradi, Ghana",
    phone: "+233 31 202 1243",
    email: "takoradigh@emple.com.gh"
  },
  {
    name: "Tamale Commercial Hub",
    region: "Northern Region",
    address: "Bank Road Towers, Suite 12, Tamale Central, Ghana",
    phone: "+233 37 202 8815",
    email: "tamalegh@emple.com.gh"
  }
];

export const FAQS = [
  {
    question: "How do I make a claim under an emPLE plan?",
    answer: "Claims can be submitted instantly on our website or by visiting any nearby branch. Specify the life event, attach relevant certifications, and our rapid claim division will handle your request within 24 to 48 hours."
  },
  {
    question: "Can I adjust my monthly premiums over time?",
    answer: "Yes, our plans feature flexible premium adjustments to accommodate changes in your income, business cash flows, or life stage. You can upgrade coverage or apply for contribution adjustments on your premium anniversary."
  },
  {
    question: "What happens if I miss a monthly premium payment?",
    answer: "We offer a generous 30-day grace period for all emPLE plans. If you miss a payment, your policy components remain fully active, and you can easily make up payments using our web portal, bank deposits, or mobile money transfers."
  },
  {
    question: "Is there support for repatriation of loved ones from abroad?",
    answer: "Our Family Eternity Plus plan features optional repatriation benefits that assist financially and structurally with returning departed family members back home with care."
  }
];

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const BOARD_MEMBERS: TeamMember[] = [
  {
    name: "Kwame-Gazo Agbemyadzie",
    role: "Chairperson",
    image: buildPersonImagePath("Kwame-Gazo Agbemyadzie")
  },
  {
    name: "Rafique Daudi",
    role: "CEO/Country Head",
    image: buildPersonImagePath("Rafique Daudi")
  },
  {
    name: "Beatrice Bridget Ofei",
    role: "Independent Non-Executive Director",
    image: buildPersonImagePath("Beatrice Bridget Ofei")
  },
  {
    name: "Audrey Naa Dei Kotey",
    role: "Independent Non-Executive Director",
    image: buildPersonImagePath("Audrey Naa Dei Kotey")
  },
  {
    name: "Mr Nii Akwei Tetteh",
    role: "Independent Non Executive Director",
    image: buildPersonImagePath("Mr Nii Akwei Tetteh")
  },
  {
    name: "Mr. Jolaolu Fakoya",
    role: "Non-Executive Director",
    image: buildPersonImagePath("Mr. Jolaolu Fakoya")
  },
  {
    name: "Mr. Olufemi Ahmed Sofola",
    role: "Non Executive Director",
    image: buildPersonImagePath("Mr. Olufemi Ahmed Sofola")
  }
];

export const MANAGEMENT_MEMBERS: TeamMember[] = [
  {
    name: "Rafique Daudi",
    role: "CEO/Country Head",
    image: buildPersonImagePath("Rafique Daudi")
  },
  {
    name: "Betty Sarpong Dadzie (Mrs.)",
    role: "Head of Operations",
    image: buildPersonImagePath("Betty Sarpong Dadzie Mrs")
  },
  {
    name: "Mr. Lawal Aburi Alhassan",
    role: "Ag. Chief Finance Officer (CFO)",
    image: buildPersonImagePath("Mr. Lawal Aburi Alhassan")
  },
  {
    name: "Louisa Duncan-Williams",
    role: "Head of Human Capital & Admin",
    image: buildPersonImagePath("Louisa Duncan-Williams")
  },
  {
    name: "Philip Kwao Nyumutei",
    role: "Head of Business Enablement & IT",
    image: buildPersonImagePath("Philip Kwao Nyumutei")
  },
  {
    name: "Bennet Tettey Madjitey",
    role: "Head of Retail Distribution",
    image: buildPersonImagePath("Bennet Tettey Madjitey")
  },
  {
    name: "Kwame Tabiri",
    role: "Head, Internal Auditor",
    image: buildPersonImagePath("Kwame Tabiri")
  },
  {
    name: "Yaw Okyere Sompa",
    role: "Head, Legal and Risk",
    image: buildPersonImagePath("Yaw Okyere Sompa")
  },
  {
    name: "Mr. Richmond Grant",
    role: "Head , Corporate and Alternative Distribution",
    image: buildPersonImagePath("Mr. Richmond Grant")
  }
];
