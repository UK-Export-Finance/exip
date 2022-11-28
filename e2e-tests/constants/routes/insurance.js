const PRODUCT = require('../product');
import { POLICY_AND_EXPORTS } from './policy-and-export';

const ROOT = '/insurance';
const ELIGIBILITY = '/eligibility';

const INSURANCE_ROUTES = {
  ROOT,
  START: `${ROOT}/start`,
  ELIGIBILITY: {
    CHECK_IF_ELIGIBLE: `${ROOT}${ELIGIBILITY}/check-if-eligible`,
    BUYER_COUNTRY: `${ROOT}${ELIGIBILITY}/buyer-location`,
    CANNOT_APPLY: `${ROOT}${ELIGIBILITY}/cannot-apply`,
    APPLY_OFFLINE: `${ROOT}${ELIGIBILITY}/apply-using-our-form`,
    SPEAK_TO_UKEF_EFM: `${ROOT}${ELIGIBILITY}/speak-to-UKEF-EFM`,
    EXPORTER_LOCATION: `${ROOT}${ELIGIBILITY}/exporter-location`,
    UK_GOODS_OR_SERVICES: `${ROOT}${ELIGIBILITY}/uk-goods-services`,
    INSURED_AMOUNT: `${ROOT}${ELIGIBILITY}/insured-amount`,
    INSURED_PERIOD: `${ROOT}${ELIGIBILITY}/insured-over-${PRODUCT.MAX_COVER_PERIOD_YEARS}-years`,
    OTHER_PARTIES_INVOLVED: `${ROOT}${ELIGIBILITY}/other-parties`,
    LETTER_OF_CREDIT: `${ROOT}${ELIGIBILITY}/letter-of-credit`,
    PRE_CREDIT_PERIOD: `${ROOT}${ELIGIBILITY}/pre-credit-period`,
    COMPANIES_HOUSE_NUMBER: `${ROOT}${ELIGIBILITY}/companies-house-number`,
    ELIGIBLE_TO_APPLY_ONLINE: `${ROOT}${ELIGIBILITY}/eligible-to-apply-online`,
    ALREADY_HAVE_ACCOUNT: `${ROOT}${ELIGIBILITY}/already-have-account`,
    NEED_TO_START_AGAIN: `${ROOT}${ELIGIBILITY}/need-to-start-again`,
  },
  ALL_SECTIONS: '/all-sections',
  POLICY_AND_EXPORTS,
};

export default INSURANCE_ROUTES;
