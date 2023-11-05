const yourQuotePage = {
  panel: {
    subHeading: () => cy.get('[data-cy="sub-heading"]'),
  },
  noticeList: {
    item1: () => cy.get('[data-cy="notice-list-item-1"]'),
    item2: () => cy.get('[data-cy="notice-list-item-2"]'),
    item3: () => cy.get('[data-cy="notice-list-item-3"]'),
  },
  whatHappensNext: {
    heading: () => cy.get('[data-cy="what-happens-next-heading"]'),
    intro: {
      youCan: () => cy.get('[data-cy="what-happens-next-intro-you-can"]'),
      fullApplicationLink: () => cy.get('[data-cy="what-happens-next-full-application-link"]'),
      timeframe: () => cy.get('[data-cy="what-happens-next-intro-timeframe"]'),
      canGetHelp: () => cy.get('[data-cy="what-happens-next-intro-can-get-help"]'),
    },
    financeManagers: {
      heading: () => cy.get('[data-cy="what-happens-next-finance-managers-heading"]'),
      available: () => cy.get('[data-cy="what-happens-next-finance-managers-available"]'),
      link: () => cy.get('[data-cy="what-happens-next-finance-managers-link"]'),
    },
    brokers: {
      heading: () => cy.get('[data-cy="what-happens-next-brokers-heading"]'),
      actAs: () => cy.get('[data-cy="what-happens-next-brokers-act-as"]'),
      theyReceive: {
        intro: () => cy.get('[data-cy="what-happens-next-brokers-they-receive-intro"]'),
        link: () => cy.get('[data-cy="what-happens-next-brokers-link"]'),
        outro: () => cy.get('[data-cy="what-happens-next-brokers-outro"]'),
      },
    },
  },
  links: {
    startAgain: () => cy.get('[data-cy="start-again"]'),
    feedback: () => cy.get('[data-cy="feedback"]'),
  },
};

export default yourQuotePage;
