const INSURANCE = '/insurance';
const ELIGIBILITY = '/eligibility';

export const INSURANCE_ROUTES = {
  START: `${INSURANCE}/start`,
  ELIGIBILITY: {
    CHECK_IF_ELIGIBLE: `${INSURANCE}${ELIGIBILITY}/check-if-eligible`,
    BUYER_LOCATION: `${INSURANCE}${ELIGIBILITY}/buyer-location`,
  },
};
