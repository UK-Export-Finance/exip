const INSURANCE = '/insurance';
const ELIGIBILITY = '/eligibility';

export const INSURANCE_ROUTES = {
  START: `${INSURANCE}/start`,
  ELIGIBILITY: {
    CHECK_IF_ELIGIBLE: `${INSURANCE}${ELIGIBILITY}/check-if-eligible`,
    BUYER_COUNTRY: `${INSURANCE}${ELIGIBILITY}/buyer-location`,
    CANNOT_APPLY: `${INSURANCE}${ELIGIBILITY}/cannot-apply`,
    APPLY_OFFLINE: `${INSURANCE}${ELIGIBILITY}/apply-using-our-form`,
    SPEAK_TO_UKEF_EFM: `${INSURANCE}${ELIGIBILITY}/speak-to-UKEF-EFM`,
    EXPORTER_LOCATION: `${INSURANCE}${ELIGIBILITY}/exporter-location`,
    UK_GOODS_OR_SERVICES: `${INSURANCE}${ELIGIBILITY}/uk-goods-services`,
    INSURED_AMOUNT: `${INSURANCE}${ELIGIBILITY}/insured-amount`,
    INSURED_PERIOD: `${INSURANCE}${ELIGIBILITY}/insured-over-2-years`,
    OTHER_PARTIES_INVOLVED: `${INSURANCE}${ELIGIBILITY}/other-parties`,
    LETTER_OF_CREDIT: `${INSURANCE}${ELIGIBILITY}/letter-of-credit`,
  },
};
