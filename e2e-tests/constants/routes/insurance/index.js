import { ACCOUNT } from './account';
import { POLICY } from './policy';
import { EXPORTER_BUSINESS } from './business';
import { YOUR_BUYER } from './your-buyer';
import { EXPORT_CONTRACT } from './export-contract';
import { DECLARATIONS } from './declarations';
import { CHECK_YOUR_ANSWERS } from './check-your-answers';

export const INSURANCE_ROOT = '/insurance';
const ELIGIBILITY_ROOT = '/eligibility';

export const INSURANCE_ROUTES = {
  ROOT: INSURANCE_ROOT,
  START: `${INSURANCE_ROOT}/start`,
  ELIGIBILITY: {
    CHECK_IF_ELIGIBLE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/check-if-eligible`,
    CANNOT_APPLY: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/cannot-apply`,
    EXPORTER_LOCATION: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/exporter-location`,
    EXPORTER_LOCATION_CHANGE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/exporter-location/change`,
    COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/companies-house-number`,
    COMPANIES_HOUSE_NUMBER_CHANGE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/companies-house-number/change`,
    NO_COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/no-companies-house-number`,
    ENTER_COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/enter-companies-house-number`,
    ENTER_COMPANIES_HOUSE_NUMBER_CHANGE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/enter-companies-house-number/change`,
    COMPANIES_HOUSE_UNAVAILABLE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/companies-house-unavailable`,
    COMPANY_NOT_ACTIVE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/company-not-active`,
    COMPANY_DETAILS: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/company-details`,
    COMPANY_DETAILS_CHANGE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/company-details/change`,
    BUYER_COUNTRY: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/buyer-location`,
    BUYER_COUNTRY_CHANGE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/buyer-location/change`,
    TOTAL_VALUE_INSURED: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/total-value-insured`,
    TOTAL_VALUE_INSURED_CHANGE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/total-value-insured/change`,
    COVER_PERIOD: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/cover-period`,
    COVER_PERIOD_CHANGE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/cover-period/change`,
    LONG_TERM_COVER: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/long-term-cover`,
    UK_GOODS_OR_SERVICES: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/uk-goods-services`,
    UK_GOODS_OR_SERVICES_CHANGE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/uk-goods-services/change`,
    END_BUYER: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/end-buyer`,
    END_BUYER_CHANGE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/end-buyer/change`,
    CANNOT_APPLY_MULTIPLE_RISKS: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/multiple-risks`,
    CHECK_YOUR_ANSWERS: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/check-your-answers`,
    ELIGIBLE_TO_APPLY_ONLINE: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/eligible-to-apply-online`,
    HAVE_AN_ACCOUNT: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/do-you-have-an-account`,
    NEED_TO_START_AGAIN: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/need-to-start-again`,
    CONTRACT_TOO_SHORT: `${INSURANCE_ROOT}${ELIGIBILITY_ROOT}/contract-too-short`,
  },
  PAGE_NOT_FOUND: `${INSURANCE_ROOT}/page-not-found`,
  NO_ACCESS_TO_APPLICATION: `${INSURANCE_ROOT}/no-access-to-application`,
  NO_ACCESS_APPLICATION_SUBMITTED: `${INSURANCE_ROOT}/no-access-application-submitted`,
  ACCOUNT,
  DASHBOARD: `${INSURANCE_ROOT}/dashboard`,
  DASHBOARD_PAGE: `${INSURANCE_ROOT}/dashboard/page`,
  ALL_SECTIONS: '/all-sections',
  POLICY,
  EXPORTER_BUSINESS,
  YOUR_BUYER,
  EXPORT_CONTRACT,
  DECLARATIONS,
  CHECK_YOUR_ANSWERS,
  APPLICATION_SUBMITTED: '/application-submitted',
  COMPLETE_OTHER_SECTIONS: '/complete-other-sections',
  FEEDBACK: `${INSURANCE_ROOT}/give-feedback`,
  FEEDBACK_SENT: `${INSURANCE_ROOT}/feedback-sent`,
  ACCESSIBILITY_STATEMENT: `${INSURANCE_ROOT}/accessibility-statement`,
  COOKIES: `${INSURANCE_ROOT}/cookies`,
  COOKIES_SAVED: `${INSURANCE_ROOT}/cookies/saved`,
  COOKIES_CONSENT: `${INSURANCE_ROOT}/cookies-consent`,
  CONTACT_US: `${INSURANCE_ROOT}/contact-us`,
  PROBLEM_WITH_SERVICE: `${INSURANCE_ROOT}/problem-with-service`,
};
