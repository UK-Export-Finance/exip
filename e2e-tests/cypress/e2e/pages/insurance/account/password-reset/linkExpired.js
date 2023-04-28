const linkExpiredPage = {
  passwordNotReset: () => cy.get('[data-cy="password-not-reset"]'),
  ifYouWouldLike: () => cy.get('[data-cy="if-you-would-like"]'),
  sendNewLinkButton: () => cy.get('[data-cy="send-new-link-button"]'),
};

export default linkExpiredPage;
