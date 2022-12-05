import { PRODUCT } from '../product';
import { POLICY_AND_EXPORTS } from './policy-and-export';

export const INSURANCE_ROOT = '/insurance';
const ELIGIBILITY = '/eligibility';

export const INSURANCE_ROUTES = {
  ROOT: INSURANCE_ROOT,
  START: `${INSURANCE_ROOT}/start`,
  ELIGIBILITY: {
    CHECK_IF_ELIGIBLE: `${INSURANCE_ROOT}${ELIGIBILITY}/check-if-eligible`,
    BUYER_COUNTRY: `${INSURANCE_ROOT}${ELIGIBILITY}/buyer-location`,
    CANNOT_APPLY: `${INSURANCE_ROOT}${ELIGIBILITY}/cannot-apply`,
    APPLY_OFFLINE: `${INSURANCE_ROOT}${ELIGIBILITY}/apply-using-our-form`,
    SPEAK_TO_UKEF_EFM: `${INSURANCE_ROOT}${ELIGIBILITY}/speak-to-UKEF-EFM`,
    EXPORTER_LOCATION: `${INSURANCE_ROOT}${ELIGIBILITY}/exporter-location`,
    UK_GOODS_OR_SERVICES: `${INSURANCE_ROOT}${ELIGIBILITY}/uk-goods-services`,
    INSURED_AMOUNT: `${INSURANCE_ROOT}${ELIGIBILITY}/insured-amount`,
    INSURED_PERIOD: `${INSURANCE_ROOT}${ELIGIBILITY}/insured-over-${PRODUCT.MAX_COVER_PERIOD_YEARS}-years`,
    OTHER_PARTIES_INVOLVED: `${INSURANCE_ROOT}${ELIGIBILITY}/other-parties`,
    LETTER_OF_CREDIT: `${INSURANCE_ROOT}${ELIGIBILITY}/letter-of-credit`,
    PRE_CREDIT_PERIOD: `${INSURANCE_ROOT}${ELIGIBILITY}/pre-credit-period`,
    COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}${ELIGIBILITY}/companies-house-number`,
    ELIGIBLE_TO_APPLY_ONLINE: `${INSURANCE_ROOT}${ELIGIBILITY}/eligible-to-apply-online`,
    ALREADY_HAVE_ACCOUNT: `${INSURANCE_ROOT}${ELIGIBILITY}/already-have-account`,
    NEED_TO_START_AGAIN: `${INSURANCE_ROOT}${ELIGIBILITY}/need-to-start-again`,
  },
  ALL_SECTIONS: '/all-sections',
  POLICY_AND_EXPORTS,
};
