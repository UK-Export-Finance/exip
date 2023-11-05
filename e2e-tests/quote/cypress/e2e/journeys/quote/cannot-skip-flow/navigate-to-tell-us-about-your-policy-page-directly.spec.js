import { ROUTES } from '../../../../../../constants';

const {
  QUOTE: {
    TELL_US_ABOUT_YOUR_POLICY,
    TELL_US_ABOUT_YOUR_POLICY_CHANGE,
    NEED_TO_START_AGAIN,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');
const needToStartAgainUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

context('Manually going to the `Tell us about your policy` page via URL without completing previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(TELL_US_ABOUT_YOUR_POLICY);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(needToStartAgainUrl);
  });
});

context('Manually going to the `Change Tell us about your policy` page via URL without completing previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(TELL_US_ABOUT_YOUR_POLICY_CHANGE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(needToStartAgainUrl);
  });
});
