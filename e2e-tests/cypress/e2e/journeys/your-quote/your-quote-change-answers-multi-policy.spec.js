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
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

context('Your quote page - multi policy type - change policy type and length to single', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPath();

    // change policy type to multi
    checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE].changeLink().click();

    policyTypePage[POLICY_TYPE].multi.input().click();
    policyTypePage[MULTI_POLICY_LENGTH].input().type('2');
    policyTypePage.submitButton().click();

    checkYourAnswersPage.submitButton().click();

    cy.url().should('include', ROUTES.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  let row = yourQuotePage.panel.summaryList[MULTI_POLICY_LENGTH];

  it(`clicking 'change' redirects to ${ROUTES.POLICY_TYPE_CHANGE}`, () => {
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
    policyTypePage[SINGLE_POLICY_LENGTH].input().type('3');
    policyTypePage.submitButton().click();

    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  it('renders the new answer in the quote', () => {
    row = yourQuotePage.panel.summaryList[SINGLE_POLICY_LENGTH];

    row.value().invoke('text').then((text) => {
      expect(text.trim()).equal('3 months');
    });
  });
});
