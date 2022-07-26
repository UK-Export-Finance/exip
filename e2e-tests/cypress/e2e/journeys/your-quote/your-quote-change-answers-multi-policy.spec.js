import {
  policyTypePage,
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

    const expectedUrl = `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}`;
    cy.url().should('include', expectedUrl);
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
    partials.backLink().should('have.attr', 'href', expected);
  });

  it('auto focuses the input', () => {
    policyTypePage[MULTI_POLICY_LENGTH].input().should('have.focus');
  });

  it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
    policyTypePage[POLICY_TYPE].single.input().click();
    policyTypePage[SINGLE_POLICY_LENGTH].input().clear().type('3');
    policyTypePage.submitButton().click();

    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  it('renders the new answer in the quote', () => {
    checkYourAnswersPage.submitButton().click();
    cy.url().should('include', ROUTES.YOUR_QUOTE);

    const row = yourQuotePage.panel.summaryList[SINGLE_POLICY_LENGTH];

    row.value().invoke('text').then((text) => {
      expect(text.trim()).equal('3 months');
    });
  });
});
