import {
  policyTypePage,
  tellUsAboutYourPolicyPage,
  checkYourAnswersPage,
  yourQuotePage,
} from '../../pages';
import partials from '../../partials';
import CONSTANTS from '../../../../constants';

const {
  ROUTES,
  FIELD_IDS,
} = CONSTANTS;

const {
  MULTI_POLICY_LENGTH,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

context('Your quote page - change policy type and length from multi single', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPathMultiPolicy();
    checkYourAnswersPage.submitButton().click();

    cy.url().should('include', ROUTES.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`clicking 'change' redirects to ${ROUTES.POLICY_TYPE_CHANGE}`, () => {
    const row = yourQuotePage.panel.summaryList[MULTI_POLICY_LENGTH];
    row.changeLink().click();

    const expectedUrl = ROUTES.POLICY_TYPE_CHANGE;
    cy.url().should('include', expectedUrl);
  });

  it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
    const expected = `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}-label`;
    cy.url().should('include', expected);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
    partials.backLink().should('have.attr', 'href', expected);
  });

  it(`redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY} when submitting a new answer`, () => {
    policyTypePage[POLICY_TYPE].single.input().click();
    policyTypePage[SINGLE_POLICY_LENGTH].input().clear().type('3');
    policyTypePage.submitButton().click();

    cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
  });

  it('renders the new answer in the quote', () => {
    tellUsAboutYourPolicyPage.submitButton().click();
    checkYourAnswersPage.submitButton().click();
    cy.url().should('include', ROUTES.YOUR_QUOTE);

    const row = yourQuotePage.panel.summaryList[SINGLE_POLICY_LENGTH];

    row.value().invoke('text').then((text) => {
      expect(text.trim()).equal('3 months');
    });
  });
});
