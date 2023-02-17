import { submitButton } from '../../../pages/shared';
import {
  policyTypePage,
  checkYourAnswersPage,
  tellUsAboutYourPolicyPage,
} from '../../../pages/quote';
import partials from '../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../constants';

const {
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  MULTIPLE_POLICY_LENGTH,
  MULTIPLE_POLICY_TYPE,
  POLICY_LENGTH,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  SINGLE_POLICY_TYPE,
} = FIELD_IDS;

const submissionData = {
  [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [POLICY_LENGTH]: '3',
};

context('Change your answers (policy type and length fields) - as an exporter, I want to change the details before submitting the proposal', () => {
  let row;

  before(() => {
    cy.login();
    cy.submitQuoteAnswersHappyPathSinglePolicy();
    cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it(`clicking 'change' redirects to ${ROUTES.QUOTE.POLICY_TYPE_CHANGE}`, () => {
    row.changeLink().click();

    const expectedUrl = ROUTES.QUOTE.POLICY_TYPE_CHANGE;
    cy.url().should('include', expectedUrl);
  });

  it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
    const expected = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
    cy.url().should('include', expected);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
    partials.backLink().should('have.attr', 'href', expected);
  });

  it('has originally submitted `policy type` (single)', () => {
    policyTypePage[POLICY_TYPE].single.input().should('be.checked');
  });

  it(`has originally submitted 'policy length' (${submissionData[POLICY_LENGTH]})`, () => {
    policyTypePage[SINGLE_POLICY_LENGTH].input().should('have.attr', 'value', submissionData[POLICY_LENGTH]);
  });

  it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
    policyTypePage[POLICY_TYPE].multiple.input().click();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
  });

  it('renders the new answers in `Check your answers` page (multi, 8 months)', () => {
    // max amount owed and credit period fields are now required because it's a multiple policy
    tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input().type('120000');
    tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');
    submitButton().click();

    row = checkYourAnswersPage.summaryLists.policy[MAX_AMOUNT_OWED];

    const expectedValue = '£120,000';
    cy.checkText(row.value(), expectedValue);

    row = checkYourAnswersPage.summaryLists.policy[MULTIPLE_POLICY_TYPE];

    const expectedValue2 = FIELD_VALUES.POLICY_TYPE.MULTIPLE;
    cy.checkText(row.value(), expectedValue2);

    row = checkYourAnswersPage.summaryLists.policy[MULTIPLE_POLICY_LENGTH];

    const expectedValue3 = `${FIELD_VALUES.POLICY_LENGTH.MULTIPLE} months`;
    cy.checkText(row.value(), expectedValue3);
  });

  describe('change `Policy type` and `Policy length` for a second time (multiple to single 5 months)', () => {
    before(() => {
      row = checkYourAnswersPage.summaryLists.policy[MULTIPLE_POLICY_TYPE];

      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.POLICY_TYPE_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has previously submitted `policy type` (multi)', () => {
      policyTypePage[POLICY_TYPE].multiple.input().should('be.checked');
    });

    it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].single.input().click();
      policyTypePage[SINGLE_POLICY_LENGTH].input().clear().type('5');
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('renders the new answers in `Check your answers` page (single policy, 5 months)', () => {
      tellUsAboutYourPolicyPage[CONTRACT_VALUE].input().type('150');
      submitButton().click();

      row = checkYourAnswersPage.summaryLists.policy[CONTRACT_VALUE];

      const expectedValue = '£150';
      cy.checkText(row.value(), expectedValue);

      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];

      const expectedValue2 = FIELD_VALUES.POLICY_TYPE.SINGLE;
      cy.checkText(row.value(), expectedValue2);

      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_LENGTH];

      const expectedValue3 = '5 months';
      cy.checkText(row.value(), expectedValue3);
    });
  });

  describe('change `Policy type` and `Policy length` for a third time (single 5 months to multi)', () => {
    before(() => {
      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];

      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.POLICY_TYPE_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('has previously submitted `policy type` (single)', () => {
      policyTypePage[POLICY_TYPE].single.input().should('be.checked');
    });

    it('has previously submitted `policy length` (5 months)', () => {
      policyTypePage[SINGLE_POLICY_LENGTH].input().should('have.attr', 'value', '5');
    });

    it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('should have wiped previously submitted credit period field', () => {
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().should('not.have.attr', 'value');
    });
  });

  describe('change `Policy type` and `Policy length` for a fourth time (multiple to single 7 months)', () => {
    before(() => {
      tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input().type('100');
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('2');
      submitButton().click();

      row = checkYourAnswersPage.summaryLists.policy[MULTIPLE_POLICY_TYPE];
      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.POLICY_TYPE_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].single.input().click();
      policyTypePage[SINGLE_POLICY_LENGTH].input().clear().type('7');
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('renders the new answer in `Check your answers` page (single policy, 7 months)', () => {
      tellUsAboutYourPolicyPage[CONTRACT_VALUE].input().type('200');
      submitButton().click();

      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_LENGTH];

      const expected = '7 months';
      cy.checkText(row.value(), expected);
    });
  });
});
