const INSURANCE = '/insurance';
const ELIGIBILITY = '/eligibility';

export const INSURANCE_ROUTES = {
  START: `${INSURANCE}/start`,
  ELIGIBILITY: {
    CHECK_IF_ELIGIBLE: `${INSURANCE}${ELIGIBILITY}/check-if-eligible`,
    BUYER_COUNTRY: `${INSURANCE}${ELIGIBILITY}/buyer-location`,
    CANNOT_APPLY: `${INSURANCE}${ELIGIBILITY}/cannot-apply`,
    APPLY_OFFLINE: `${INSURANCE}${ELIGIBILITY}/apply-using-our-form`,
    EXPORTER_LOCATION: `${INSURANCE}${ELIGIBILITY}/exporter-location`,
    UK_GOODS_OR_SERVICES: `${INSURANCE}${ELIGIBILITY}/uk-goods-services`,
    INSURED_AMOUNT: `${INSURANCE}${ELIGIBILITY}/insured-amount`,
  },
};
