import { backLink, submitButton } from '../../../pages/shared';
import {
  policyTypePage,
  checkYourAnswersPage,
  tellUsAboutYourPolicyPage,
} from '../../../pages/quote';
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

const url = ROUTES.QUOTE.CHECK_YOUR_ANSWERS;

/**
 * Change policy type from single to multiple
 * via "check answers" and policy type page flow
 */
const changeFromSingleToMultiple = () => {
  const row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];

  row.changeLink().click();

  policyTypePage[POLICY_TYPE].multiple.input().click();

  submitButton().click();

  // max amount owed and credit period fields are now required because it's a multiple policy
  cy.keyboardInput(tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input(), '120000');
  tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');

  submitButton().click();
};

/**
 * Change policy type from multiple to single
 * via "check answers" and policy type page flow
 */
const changeFromMultipleToSingle = () => {
  const row = checkYourAnswersPage.summaryLists.policy[MULTIPLE_POLICY_TYPE];

  // change from multiple to single
  row.changeLink().click();

  policyTypePage[POLICY_TYPE].single.input().click();
  cy.keyboardInput(policyTypePage[SINGLE_POLICY_LENGTH].input(), '3');

  submitButton().click();

  // contract value field now required because it's a single policy
  cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '150');
  submitButton().click();
};

context('Change your answers - as an exporter, I want to change the details before submitting the proposal', () => {
  let row;

  context('Policy type and length fields - user flow', () => {
    before(() => {
      cy.login();
      cy.submitQuoteAnswersHappyPathSinglePolicy();

      cy.url().should('include', url);
      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.POLICY_TYPE_CHANGE}`, () => {
      const expectedUrl = ROUTES.QUOTE.POLICY_TYPE_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
      backLink().should('have.attr', 'href', expected);
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
  });

  context('Policy type and length fields - check new answers', () => {
    beforeEach(() => {
      cy.login();

      cy.submitQuoteAnswersHappyPathSinglePolicy();
      cy.url().should('include', url);
      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];

      cy.navigateToUrl(url);

      row.changeLink().click();

      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      // max amount owed and credit period fields are now required because it's a multiple policy
      cy.keyboardInput(tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input(), '120000');
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');
      submitButton().click();
    });

    it('renders the new answers in `Check your answers` page (multi, 8 months)', () => {
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
  });

  context('change `Policy type` and `Policy length` two times (single, multiple, then single 5 months)', () => {
    context('Policy type and length fields - user flow', () => {
      before(() => {
        cy.login();

        cy.submitQuoteAnswersHappyPathSinglePolicy();
        cy.url().should('include', url);

        cy.navigateToUrl(url);

        changeFromSingleToMultiple();

        changeFromMultipleToSingle();

        row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];
      });

      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(url);

        row.changeLink().click();
      });

      it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
        const expected = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
        cy.url().should('include', expected);
      });

      it('renders a back link with correct url', () => {
        backLink().should('exist');

        const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
        backLink().should('have.attr', 'href', expected);
      });

      it('has previously submitted `policy type` (single)', () => {
        policyTypePage[POLICY_TYPE].single.input().should('be.checked');
      });

      it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
        policyTypePage[POLICY_TYPE].multiple.input().click();
        submitButton().click();

        cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
      });
    });

    context('Policy type and length fields - check new answers', () => {
      beforeEach(() => {
        cy.login();

        cy.submitQuoteAnswersHappyPathSinglePolicy();
        cy.url().should('include', url);

        cy.navigateToUrl(url);

        row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];

        changeFromSingleToMultiple();

        changeFromMultipleToSingle();
      });

      it('renders the new answers in `Check your answers` page (single policy, 3 months)', () => {
        row = checkYourAnswersPage.summaryLists.policy[CONTRACT_VALUE];

        const expectedValue = '£150';
        cy.checkText(row.value(), expectedValue);

        row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];

        const expectedValue2 = FIELD_VALUES.POLICY_TYPE.SINGLE;
        cy.checkText(row.value(), expectedValue2);

        row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_LENGTH];

        const expectedValue3 = '3 months';
        cy.checkText(row.value(), expectedValue3);
      });
    });
  });

  context('change `Policy type` and `Policy length` three times (single, multiple, single, then multiple)', () => {
    context('Policy type and length fields - user flow', () => {
      before(() => {
        cy.login();

        cy.submitQuoteAnswersHappyPathSinglePolicy();
        cy.url().should('include', url);

        cy.navigateToUrl(url);

        changeFromSingleToMultiple();

        changeFromMultipleToSingle();

        changeFromSingleToMultiple();

        row = checkYourAnswersPage.summaryLists.policy[MULTIPLE_POLICY_TYPE];
      });

      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(url);

        row.changeLink().click();
      });

      it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
        const expected = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
        cy.url().should('include', expected);
      });

      it('renders a back link with correct url', () => {
        backLink().should('exist');

        const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
        backLink().should('have.attr', 'href', expected);
      });

      it('has previously submitted `policy type` (single)', () => {
        policyTypePage[POLICY_TYPE].multiple.input().should('be.checked');
      });

      it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
        policyTypePage[POLICY_TYPE].single.input().click();
        submitButton().click();

        cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
      });
    });
  });
});
