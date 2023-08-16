const SHARED = {
  banner: () => cy.get('[data-cy="change-eligibility-banner"]'),
  bannerLink: () => cy.get('[data-cy="change-eligibility-link"]'),
};

export default SHARED;
