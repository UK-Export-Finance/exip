import { LINKS } from './links';

export const ACTIONS = {
  INTRO: 'You can:',
  ELIGIBILITY: {
    TEXT: 'read about',
    LINK: {
      TEXT: 'eligibility',
      HREF: LINKS.EXTERNAL.GUIDANCE,
    },
  },
  CONTACT_APPROVED_BROKER: {
    LINK: {
      TEXT: 'contact an approved broker',
      HREF: LINKS.EXTERNAL.APPROVED_BROKER_LIST,
    },
    TEXT: 'who may be able to help you get insurance from the private sector, if you`ve not tried already',
  },
  CONTACT_EFM: {
    LINK: {
      TEXT: 'talk to your nearest export finance manager',
      HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
    },
    TEXT: 'to find out more about your options',
  },
};

export default ACTIONS;
