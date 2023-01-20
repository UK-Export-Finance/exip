import { ELIGIBILITY_TEMPLATES } from './eligibility';
import { POLICY_AND_EXPORTS_TEMPLATES } from './policy-and-exports';
import { BUSINESS_TEMPLATES } from './business';
import { YOUR_BUYER_TEMPLATES } from './your-buyer';

export const INSURANCE_TEMPLATES = {
  START: 'insurance/start.njk',
  ELIGIBILITY: ELIGIBILITY_TEMPLATES,
  APPLY_OFFLINE: 'insurance/apply-offline.njk',
  SPEAK_TO_UKEF_EFM: 'insurance/speak-to-ukef-efm.njk',
  ALL_SECTIONS: 'insurance/all-sections.njk',
  POLICY_AND_EXPORTS: POLICY_AND_EXPORTS_TEMPLATES,
  EXPORTER_BUSINESS: BUSINESS_TEMPLATES,
  YOUR_BUYER: YOUR_BUYER_TEMPLATES,
  PAGE_NOT_FOUND: 'insurance/page-not-found.njk',
};
