const noAccessApplicationSubmittedPage = {
  processingText: () => cy.get('[data-cy="processing"]'),
  furtherInformation: () => cy.get('[data-cy="further-information"]'),
  withdraw: () => cy.get('[data-cy="withdraw"]'),
  contact: () => cy.get('[data-cy="contact-email"]'),
};

export default noAccessApplicationSubmittedPage;
