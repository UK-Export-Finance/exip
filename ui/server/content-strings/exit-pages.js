const EXIT_PAGES = {
  ACTIONS: {
    INTRO: 'You can:',
    ELIGIBILITY: {
      TEXT: 'read about',
      LINK: {
        TEXT: 'eligibility',
        HREF: '#',
      },
    },
    CONTACT_APPROVED_BROKER: {
      LINK: {
        TEXT: 'contact an approved broker',
        HREF: '#',
      },
      TEXT: 'who may be able to help you get insurance from the private sector, if you`ve not tried already',
    },
    LIST: [
      {
        text: 'read more about how this service works',
        href: '#',
      },
      {
        text: 'contact an approved broker who may be able to help you obtain private insurance',
        href: '#',
      },
    ],
  },
};

EXIT_PAGES.COMPANY_BASED = {
  PAGE_TITLE: 'You cannot apply for UKEF export insurance',
  HEADING: 'You cannot apply for UKEF export insurance.',
  DESCRIPTION: 'This is because your company is not based in the UK, Channel Islands or Isle of Man.',
  ACTIONS: EXIT_PAGES.ACTIONS,
};

EXIT_PAGES.BUYER_BASED = {
  PAGE_TITLE: 'Export insurance is only available when the buyer is based outside of the UK, Channel Islands and Isle of Man',
  HEADING: 'Export insurance is only available when the buyer is based outside of the UK, Channel Islands and Isle of Man.',
  DESCRIPTION: 'You cannot apply for export insurance if your buyer is based in the UK, Channel Islands or Isle of Man.',
  ACTIONS: EXIT_PAGES.ACTIONS,
};

module.exports = EXIT_PAGES;
