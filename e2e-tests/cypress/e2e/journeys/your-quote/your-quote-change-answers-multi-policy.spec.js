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
  CONTRACT_VALUE,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  POLICY_TYPE,
  QUOTE,
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

  describe('change `insured for`', () => {
    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

      row.changeLink().click();

      const expectedUrl = ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input().clear().type('200');
      tellUsAboutYourPolicyPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      checkYourAnswersPage.submitButton().click();

      const row = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

      row.value().invoke('text').then((text) => {
        const expected = '£200.00';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `policy length` and policy type to single', () => {
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

      tellUsAboutYourPolicyPage[CONTRACT_VALUE].input().type('900');
      tellUsAboutYourPolicyPage.submitButton().click();
    });

    it('renders the new answers in the quote', () => {
      checkYourAnswersPage.submitButton().click();
      cy.url().should('include', ROUTES.YOUR_QUOTE);

      const insuredFor = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

      insuredFor.value().invoke('text').then((text) => {
        expect(text.trim()).equal('£900.00');
      });

      const policyLength = yourQuotePage.panel.summaryList[SINGLE_POLICY_LENGTH];

      policyLength.value().invoke('text').then((text) => {
        expect(text.trim()).equal('3 months');
      });
    });
  });
});
