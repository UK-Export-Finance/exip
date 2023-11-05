const linkSentPage = {
  checkInbox: () => cy.get('[data-cy="check-inbox"]'),
  followTheLink: () => cy.get('[data-cy="follow-the-link"]'),
  notReceivedAnything: {
    heading: () => cy.get('[data-cy="not-received-anything-heading"]'),
    youCan: () => cy.get('[data-cy="not-received-anything-you-can"]'),
    link: () => cy.get('[data-cy="not-received-anything-link"]'),
  },
  notYourEmailAddress: {
    heading: () => cy.get('[data-cy="not-your-email-address-heading"]'),
    needTo: () => cy.get('[data-cy="not-your-email-address-need-to"]'),
    link: () => cy.get('[data-cy="not-your-email-address-link"]'),
  },
};

export default linkSentPage;
