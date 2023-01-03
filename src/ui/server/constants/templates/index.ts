import { QUOTE_TEMPLATES } from './quote';
import { INSURANCE_TEMPLATES } from './insurance';
import { SHARED_PAGES } from './shared-pages';
import { YOUR_BUYER_DETAILS_TEMPLATES } from './insurance/your-buyer-details';

export const TEMPLATES = {
  COOKIES: 'cookies.njk',
  PROBLEM_WITH_SERVICE: 'problem-with-service.njk',
  CANNOT_APPLY: 'cannot-apply.njk',
  QUOTE: QUOTE_TEMPLATES,
  INSURANCE: INSURANCE_TEMPLATES,
  YOUR_BUYER: YOUR_BUYER_DETAILS_TEMPLATES,
  SHARED_PAGES,
};
