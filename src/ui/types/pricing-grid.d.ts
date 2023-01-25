type PricingGridRate = {
  insuredFor: number;
  premiumRate: number;
};

type PricingGridMonth = {
  months: number;
  rates: Array<PricingGridRate>;
};

type PricingGridSinglePolicy = {
  HIGH: Array<PricingGridMonth>;
  STANDARD: Array<PricingGridMonth>;
  VERY_HIGH: Array<PricingGridMonth>;
};

type PricingGridMultiPolicy = {
  HIGH: Array<PricingGridMonth>;
  STANDARD: Array<PricingGridMonth>;
  VERY_HIGH: Array<PricingGridMonth>;
};

interface PricingGrid {
  SINGLE_POLICY: PricingGridSinglePolicy;
  MULTIPLE_POLICY: PricingGridMultiPolicy;
}

export { PricingGrid, PricingGridMonth, PricingGridRate };
