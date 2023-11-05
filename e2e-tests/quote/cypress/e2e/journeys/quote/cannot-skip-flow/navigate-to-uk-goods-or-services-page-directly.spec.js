import { ROUTES } from '../../../../../../constants';

const {
  QUOTE: {
    UK_GOODS_OR_SERVICES,
    UK_GOODS_OR_SERVICES_CHANGE,
    NEED_TO_START_AGAIN,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

const needToStartAgainUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

context('Manually going to the `UK goods or services` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(UK_GOODS_OR_SERVICES);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(needToStartAgainUrl);
  });
});

context('Manually going to the `Change UK goods or services` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(UK_GOODS_OR_SERVICES_CHANGE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(needToStartAgainUrl);
  });
});
