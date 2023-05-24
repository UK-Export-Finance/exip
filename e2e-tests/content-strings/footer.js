import { ROUTES } from '../constants';
import { LINKS } from './links';

export const FOOTER = {
  SUPPORT_LINKS_HEADING: 'Support Links',
  ACCESSIBILITY_STATEMENT: {
    TEXT: 'Accessibility statement',
    HREF: ROUTES.ACCESSIBILITY_STATEMENT,
  },
  PRIVACY: {
    TEXT: 'Privacy',
    HREF: LINKS.EXTERNAL.PRIVACY,
  },
  COOKIES: {
    TEXT: 'Cookies',
    HREF: ROUTES.COOKIES,
  },
  REPORT_VULNERABILITY: {
    TEXT: 'Report a vulnerability',
    HREF: 'https://www.gov.uk/guidance/report-a-vulnerability-on-a-ukef-system',
  },
  CONTACT: {
    TEXT: 'Contact',
    HREF: ROUTES.CONTACT_US,
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
