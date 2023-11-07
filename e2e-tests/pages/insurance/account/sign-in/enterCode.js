const enterCodePage = {
  successBanner: {
    container: () => cy.get('[data-cy="success-banner"]'),
    newCodeSent: () => cy.get('[data-cy="success-banner-new-code-sent"]'),
  },
  requestNewCodeLink: () => cy.get('[data-cy="request-new-code"]'),
};

export default enterCodePage;
