import { ROUTES } from '../constants';
import { LINKS } from './links';

const sharedFooter = {
  SUPPORT_LINKS_HEADING: 'Support Links',
  PRIVACY: {
    TEXT: 'Privacy',
    HREF: LINKS.EXTERNAL.PRIVACY,
  },
  REPORT_VULNERABILITY: {
    TEXT: 'Report a vulnerability',
    HREF: 'https://www.gov.uk/guidance/report-a-vulnerability-on-a-ukef-system',
  },
  OGL_LICENCE: {
    INTRO: 'All content is available under the',
    LICENCE: 'Open Government Licence v3.0',
    DISCLAIMER: 'except where otherwise stated',
    HREF: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3',
  },
  CROWN_COPYRIGHT: {
    TEXT: 'Crown copyright',
    HREF: 'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/',
  },
};

export const QUOTE_FOOTER = {
  ...sharedFooter,
  ACCESSIBILITY_STATEMENT: {
    TEXT: 'Accessibility statement',
    HREF: ROUTES.ACCESSIBILITY_STATEMENT,
  },
  COOKIES: {
    TEXT: 'Cookies',
    HREF: ROUTES.COOKIES,
  },
  CONTACT: {
    TEXT: 'Contact',
    HREF: ROUTES.CONTACT_US,
  },
};

export const INSURANCE_FOOTER = {
  ...sharedFooter,
  ACCESSIBILITY_STATEMENT: {
    TEXT: 'Accessibility statement',
    HREF: ROUTES.INSURANCE.ACCESSIBILITY_STATEMENT,
  },
  COOKIES: {
    TEXT: 'Cookies',
    HREF: ROUTES.INSURANCE.COOKIES,
  },
  CONTACT: {
    TEXT: 'Contact',
    HREF: ROUTES.INSURANCE.CONTACT_US,
  },
};
