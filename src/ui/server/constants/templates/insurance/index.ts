import { ELIGIBILITY_TEMPLATES } from './eligibility';
import { ACCOUNT_TEMPLATES } from './account';
import { POLICY_TEMPLATES } from './policy';
import { BUSINESS_TEMPLATES } from './business';
import { YOUR_BUYER_TEMPLATES } from './your-buyer';
import { DECLARATIONS_TEMPLATES } from './declarations';

export const INSURANCE_TEMPLATES = {
  START: 'insurance/start.njk',
  ELIGIBILITY: ELIGIBILITY_TEMPLATES,
  APPLY_OFFLINE: 'insurance/apply-offline.njk',
  SPEAK_TO_UKEF_EFM: 'insurance/speak-to-ukef-efm.njk',
  ACCOUNT: ACCOUNT_TEMPLATES,
  DASHBOARD: 'insurance/dashboard.njk',
  ALL_SECTIONS: 'insurance/all-sections.njk',
  POLICY: POLICY_TEMPLATES,
  EXPORTER_BUSINESS: BUSINESS_TEMPLATES,
  YOUR_BUYER: YOUR_BUYER_TEMPLATES,
  DECLARATIONS: DECLARATIONS_TEMPLATES,
  CHECK_YOUR_ANSWERS: 'insurance/check-your-answers/check-your-answers.njk',
  NEED_TO_START_NEW_APPLICATION: 'insurance/check-your-answers/need-to-start-new-application.njk',
  PAGE_NOT_FOUND: 'insurance/page-not-found.njk',
  NO_ACCESS_TO_APPLICATION: 'insurance/do-not-have-application-access.njk',
  NO_ACCESS_APPLICATION_SUBMITTED: 'insurance/cannot-access-application-submitted.njk',
  APPLICATION_SUBMITTED: 'insurance/application-submitted.njk',
  COMPLETE_OTHER_SECTIONS: 'insurance/complete-other-sections.njk',
  FEEDBACK: 'insurance/feedback.njk',
  FEEDBACK_SENT: 'insurance/feedback-confirmation.njk',
};
