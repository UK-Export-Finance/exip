import { ROUTES } from '../../../../../../constants';

const {
  QUOTE: {
    POLICY_TYPE,
    POLICY_TYPE_CHANGE,
    NEED_TO_START_AGAIN,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');
const needToStartAgainUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

context('Manually going to the `Policy type` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(POLICY_TYPE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(needToStartAgainUrl);
  });
});

context('Manually going to the `Change Policy type` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(POLICY_TYPE_CHANGE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(needToStartAgainUrl);
  });
});
