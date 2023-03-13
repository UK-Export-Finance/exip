import { PRODUCT } from '../../product';
import { POLICY_AND_EXPORTS } from './policy-and-export';
import { EXPORTER_BUSINESS } from './exporter-business';
import { YOUR_BUYER } from './your-buyer';
import { ACCOUNT } from './account';
import { CHECK_YOUR_ANSWERS } from './check-your-answers';

export const INSURANCE_ROOT = '/insurance';
const ELIGIBILITY_ROOT = '/eligibility';

export const INSURANCE_ROUTES = {
  INSURANCE_ROOT,
  ELIGIBILITY_ROOT,
  START: `${INSURANCE_ROOT}/start`,
  ELIGIBILITY: {
    CHECK_IF_ELIGIBLE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/check-if-eligible`,
    BUYER_COUNTRY: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/buyer-location`,
    CANNOT_APPLY: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/cannot-apply`,
    EXPORTER_LOCATION: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/exporter-location`,
    UK_GOODS_OR_SERVICES: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/uk-goods-services`,
    INSURED_AMOUNT: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/insured-amount`,
    INSURED_PERIOD: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/insured-over-${PRODUCT.MAX_COVER_PERIOD_YEARS}-years`,
    OTHER_PARTIES_INVOLVED: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/other-parties`,
    LETTER_OF_CREDIT: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/letter-of-credit`,
    PRE_CREDIT_PERIOD: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/pre-credit-period`,
    COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/companies-house-number`,
    ELIGIBLE_TO_APPLY_ONLINE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/eligible-to-apply-online`,
    ELIGIBLE_TO_APPLY_ONLINE_TEMP_CREATE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/eligible-to-apply-online/temp-create`,
    ACCOUNT_TO_APPLY_ONLINE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/account-to-apply-online`,
    NEED_TO_START_AGAIN: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/need-to-start-again`,
  },
  APPLY_OFFLINE: `${INSURANCE_ROOT}/apply-using-our-form`,
  SPEAK_TO_UKEF_EFM: `${INSURANCE_ROOT}/speak-to-UKEF-EFM`,
  PAGE_NOT_FOUND: `${INSURANCE_ROOT}/page-not-found`,
  NO_ACCESS_TO_APPLICATION: `${INSURANCE_ROOT}/no-access-to-application`,
  ACCOUNT,
  DASHBOARD: `${INSURANCE_ROOT}/dashboard`,
  ALL_SECTIONS: '/all-sections',
  EXPORTER_BUSINESS,
  POLICY_AND_EXPORTS,
  YOUR_BUYER,
  CHECK_YOUR_ANSWERS,
};
