export interface BenefitDetail {
  title: string;
  description: string;
}

export interface InsurancePlan {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  baseRatePerThousand: number; // monthly cost per $1000 coverage
  minimumCoverage: number;
  maximumCoverage: number;
  highlightedBenefits: string[];
  benefitsList: BenefitDetail[];
  targetAudience: string;
  iconColor: string;
}

export interface QuoteInputs {
  planId: string;
  age: number;
  coverageAmt: number;
  policyTerm: number; // in years
  includeCriticalIllness: boolean;
  includeAccidentCover: boolean;
  payoutFrequency: "monthly" | "lump_sum" | "split";
}

export interface Branch {
  name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
}
