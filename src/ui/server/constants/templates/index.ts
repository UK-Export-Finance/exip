import { QUOTE_TEMPLATES } from './quote';
import { INSURANCE_TEMPLATES } from './insurance';
import { SHARED_PAGES } from './shared-pages';
import { PARTIALS } from './partials';

export const TEMPLATES = {
  ACCESSIBILITY_STATEMENT: 'accessibility-statement.njk',
  COOKIES: 'cookies.njk',
  COOKIES_SAVED: 'cookies-saved.njk',
  PROBLEM_WITH_SERVICE: 'problem-with-service.njk',
  CANNOT_APPLY: 'cannot-apply.njk',
  CONTACT_US: 'contact-us.njk',
  QUOTE: QUOTE_TEMPLATES,
  INSURANCE: INSURANCE_TEMPLATES,
  SHARED_PAGES,
  PARTIALS,
  ATTRIBUTES: {
    CLASSES: {
      LEGEND: {
        S_NOT_BOLD: 'govuk-fieldset__legend--s govuk-!-font-weight-regular',
        M: 'govuk-fieldset__legend--m',
        XL: 'govuk-fieldset__legend--xl',
      },
    },
  },
};
