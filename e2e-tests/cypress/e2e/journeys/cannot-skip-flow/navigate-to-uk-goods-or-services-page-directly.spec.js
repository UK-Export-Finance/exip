import CONSTANTS from '../../../../constants';
const { ROUTES } = CONSTANTS;

context('Manually going to the `UK goods or services` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.visit(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.NEED_TO_START_AGAIN);
  });
});

context('Manually going to the `Change UK goods or services` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.visit(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.NEED_TO_START_AGAIN);
  });
});
