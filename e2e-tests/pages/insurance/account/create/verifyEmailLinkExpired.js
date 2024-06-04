const verifyEmailLinkExpiredPage = {
  notVerified: () => cy.get('[data-cy="not-verified"]'),
  canSendNewLink: () => cy.get('[data-cy="can-send-new-link"]'),
};

export default verifyEmailLinkExpiredPage;
