import {
  backLink,
  field,
  submitButton,
  summaryList,
} from '../../../../../../pages/shared';
import { policyTypePage } from '../../../../../../pages/quote';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { LINKS } from '../../../../../../content-strings';

const {
  ELIGIBILITY: {
    CONTRACT_VALUE,
    CREDIT_PERIOD,
    MAX_AMOUNT_OWED,
  },
  POLICY_LENGTH,
  POLICY_TYPE,
} = FIELD_IDS;

const {
  QUOTE: {
    TELL_US_ABOUT_YOUR_POLICY,
    POLICY_TYPE_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');
const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

/**
 * Change policy type from single to multiple
 * via "check answers" and policy type page flow
 */
const changeFromSingleToMultiple = () => {
  const row = summaryList.field(POLICY_TYPE);

  row.changeLink().click();

  policyTypePage[POLICY_TYPE].multiple.input().click();

  submitButton().click();

  // max amount owed and credit period fields are now required because it's a multiple policy
  cy.keyboardInput(field(MAX_AMOUNT_OWED).input(), '120000');
  policyTypePage[CREDIT_PERIOD].input().select('1');

  submitButton().click();
};

/**
 * Change policy type from multiple to single
 * via "check answers" and policy type page flow
 */
const changeFromMultipleToSingle = () => {
  const row = summaryList.field(POLICY_TYPE);

  // change from multiple to single
  row.changeLink().click();

  policyTypePage[POLICY_TYPE].single.input().click();

  submitButton().click();

  /**
   * "Policy length" and "contract value fields" are now required,
   * because it's a single policy.
   */
  cy.keyboardInput(field(POLICY_LENGTH).input(), '3');

  cy.keyboardInput(field(CONTRACT_VALUE).input(), '150');
  submitButton().click();
};

context('Change your answers - as an exporter, I want to change the details before submitting the proposal', () => {
  let row;

  context('Policy type and length fields - user flow', () => {
    before(() => {
      cy.login();
      cy.submitQuoteAnswersHappyPathSinglePolicy();

      cy.assertUrl(url);
      row = summaryList.field(POLICY_TYPE);
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${POLICY_TYPE_CHANGE} with a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change`, () => {
      const expectedUrl = `${baseUrl}${POLICY_TYPE_CHANGE}#heading`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      const expectedHref = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

      cy.checkLink(
        backLink(),
        expectedHref,
        LINKS.BACK,
      );
    });

    it('has originally submitted `policy type` (single)', () => {
      policyTypePage[POLICY_TYPE].single.input().should('be.checked');
    });

    it(`redirects to ${TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}#heading`;

      cy.assertUrl(expectedUrl);
    });
  });

  context('Policy type and length fields - check new answers', () => {
    beforeEach(() => {
      cy.login();

      cy.submitQuoteAnswersHappyPathSinglePolicy();
      cy.assertUrl(url);

      row = summaryList.field(POLICY_TYPE);

      cy.navigateToUrl(url);

      row.changeLink().click();

      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      // max amount owed and credit period fields are now required because it's a multiple policy
      cy.keyboardInput(field(MAX_AMOUNT_OWED).input(), '120000');
      policyTypePage[CREDIT_PERIOD].input().select('1');
      submitButton().click();
    });

    it('renders the new answers in `Check your answers` page (multi, 8 months)', () => {
      row = summaryList.field(MAX_AMOUNT_OWED);

      const expectedValue = '£120,000';
      cy.checkText(row.value(), expectedValue);

      row = summaryList.field(POLICY_TYPE);

      const expectedValue2 = FIELD_VALUES.POLICY_TYPE.MULTIPLE;
      cy.checkText(row.value(), expectedValue2);

      row = summaryList.field(POLICY_LENGTH);

      const expectedValue3 = `${FIELD_VALUES.POLICY_LENGTH.MULTIPLE} months`;
      cy.checkText(row.value(), expectedValue3);
    });
  });

  context('change `Policy type` and `Policy length` two times (single, multiple, then single 5 months)', () => {
    context('Policy type and length fields - user flow', () => {
      before(() => {
        cy.login();

        cy.submitQuoteAnswersHappyPathSinglePolicy();
        cy.assertUrl(url);

        cy.navigateToUrl(url);

        changeFromSingleToMultiple();

        changeFromMultipleToSingle();

        row = summaryList.field(POLICY_TYPE);
      });

      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(url);

        row.changeLink().click();
      });

      it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
        const expectedUrl = `${baseUrl}${POLICY_TYPE_CHANGE}#heading`;

        cy.assertUrl(expectedUrl);
      });

      it('renders a back link with correct url', () => {
        backLink().should('exist');

        const expectedHref = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

        cy.checkLink(
          backLink(),
          expectedHref,
          LINKS.BACK,
        );
      });

      it('has previously submitted `policy type` (single)', () => {
        policyTypePage[POLICY_TYPE].single.input().should('be.checked');
      });

      it(`redirects to ${TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
        policyTypePage[POLICY_TYPE].multiple.input().click();
        submitButton().click();

        const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}#heading`;

        cy.assertUrl(expectedUrl);
      });
    });

    context('Policy type and length fields - check new answers', () => {
      beforeEach(() => {
        cy.login();

        cy.submitQuoteAnswersHappyPathSinglePolicy();
        cy.assertUrl(url);

        cy.navigateToUrl(url);

        row = summaryList.field(POLICY_TYPE);

        changeFromSingleToMultiple();

        changeFromMultipleToSingle();
      });

      it('renders the new answers in `Check your answers` page (single policy, 3 months)', () => {
        row = summaryList.field(CONTRACT_VALUE);

        const expectedValue = '£150';
        cy.checkText(row.value(), expectedValue);

        row = summaryList.field(POLICY_TYPE);

        const expectedValue2 = FIELD_VALUES.POLICY_TYPE.SINGLE;
        cy.checkText(row.value(), expectedValue2);

        row = summaryList.field(POLICY_LENGTH);

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
        cy.assertUrl(url);

        cy.navigateToUrl(url);

        changeFromSingleToMultiple();

        changeFromMultipleToSingle();

        changeFromSingleToMultiple();

        row = summaryList.field(POLICY_TYPE);
      });

      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(url);

        row.changeLink().click();
      });

      it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
        const expectedUrl = `${baseUrl}${POLICY_TYPE_CHANGE}#heading`;

        cy.assertUrl(expectedUrl);
      });

      it('renders a back link with correct url', () => {
        const expectedHref = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

        cy.checkLink(
          backLink(),
          expectedHref,
          LINKS.BACK,
        );
      });

      it('has previously submitted `policy type` (single)', () => {
        policyTypePage[POLICY_TYPE].multiple.input().should('be.checked');
      });

      it(`redirects to ${TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
        policyTypePage[POLICY_TYPE].single.input().click();
        submitButton().click();

        const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}#heading`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
