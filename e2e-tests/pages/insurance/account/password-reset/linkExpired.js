const linkExpiredPage = {
  passwordNotReset: () => cy.get('[data-cy="password-not-reset"]'),
  ifYouWouldLike: () => cy.get('[data-cy="if-you-would-like"]'),
};

export default linkExpiredPage;
