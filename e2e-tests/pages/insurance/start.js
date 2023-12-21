const startPage = {
  list: {
    intro: () => cy.get('[data-cy="list-intro"]'),
    item1: () => cy.get('[data-cy="list-item-1"]'),
    item2: () => cy.get('[data-cy="list-item-2"]'),
    item3: () => cy.get('[data-cy="list-item-3"]'),
    item4: () => cy.get('[data-cy="list-item-4"]'),
  },
  body1: () => cy.get('[data-cy="body-1"]'),
  body2: () => cy.get('[data-cy="body-2"]'),
  body3: () => cy.get('[data-cy="body-3"]'),
  body4: () => cy.get('[data-cy="body-4"]'),
  signIn: {
    text: () => cy.get('[data-cy="sign-in"]'),
    youCan: () => cy.get('[data-cy="sign-in-you-can"]'),
    link: () => cy.get('[data-cy="sign-in-link"]'),
    toContinueApplication: () => cy.get('[data-cy="sign-in-to-continue-application"]'),
  },
  findOutMore: {
    text: () => cy.get('[data-cy="find-out-more"]'),
    youCan: () => cy.get('[data-cy="find-out-more-you-can"]'),
    link: () => cy.get('[data-cy="find-out-more-link"]'),
    toFindOutMore: () => cy.get('[data-cy="find-out-more-to-find-out-more"]'),
  },
  extraSupport: {
    intro: () => cy.get('[data-cy="export-support-intro"]'),
    link: () => cy.get('[data-cy="finance-managers-link"]'),
  },
  getAQuote: {
    text: () => cy.get('[data-cy="get-a-quote"]'),
    youCan: () => cy.get('[data-cy="get-a-quote-you-can"]'),
    link: () => cy.get('[data-cy="get-a-quote-link"]'),
    ifYouNeed: () => cy.get('[data-cy="get-a-quote-if-you-need"]'),
  },
};

export default startPage;
