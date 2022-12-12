import { ELIGIBILITY_TEMPLATES } from './eligibility';
import { POLICY_AND_EXPORTS_TEMPLATES } from './policy-and-exports';
import { BUSINESS_TEMPLATES } from './business';

export const INSURANCE_TEMPLATES = {
  START: 'insurance/start.njk',
  ELIGIBILITY: ELIGIBILITY_TEMPLATES,
  EXPORTER_BUSINESS: BUSINESS_TEMPLATES,
  ALL_SECTIONS: 'insurance/all-sections.njk',
  POLICY_AND_EXPORTS: POLICY_AND_EXPORTS_TEMPLATES,
  PAGE_NOT_FOUND: 'insurance/page-not-found.njk',
};
