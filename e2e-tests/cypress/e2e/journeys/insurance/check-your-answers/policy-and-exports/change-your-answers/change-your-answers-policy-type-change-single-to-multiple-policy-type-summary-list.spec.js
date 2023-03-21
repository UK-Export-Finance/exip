import partials from '../../../../../partials';
import { FIELD_IDS, ROUTES, FIELD_VALUES } from '../../../../../../../constants';
import { submitButton } from '../../../../../pages/shared';
import { checkYourAnswersPolicyAndExports } from '../../../../../pages/insurance/check-your-answers';
import { DEFAULT, LINKS } from '../../../../../../../content-strings';
import { typeOfPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy-and-exports';

const {
  ROOT: INSURANCE_ROOT,
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY_CHECK_AND_CHANGE,
    MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: {
        MULTIPLE: {
          TOTAL_MONTHS_OF_COVER,
          TOTAL_SALES_TO_BUYER,
          MAXIMUM_BUYER_WILL_OWE,
        },
      },
    },
  },
} = FIELD_IDS;

const { CONTRACT_POLICY: { MULTIPLE: MULTIPLE_FIELD_STRINGS } } = FIELDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswersAndSubmit;

const { summaryList } = checkYourAnswersPolicyAndExports;

context('Insurance - Change your answers - Policy and exports - Change single to multiple policy type - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationSinglePolicyType();

      task.link().click();

      // to get past eligibility check your answers page
      submitButton().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  const fieldId = POLICY_TYPE;

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${TYPE_OF_POLICY_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);
      summaryList.field(fieldId).changeLink().click();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHECK_AND_CHANGE}#heading`;

      cy.url().should('eq', expected);
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      typeOfPolicyPage[fieldId].multiple.input().click();
      submitButton().click();
    });

    it(`should redirect to ${TYPE_OF_POLICY}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}#heading`;

      cy.url().should('eq', expected);
    });

    it('should render the new answer', () => {
      const expected = FIELD_VALUES.POLICY_TYPE.MULTIPLE;
      cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
    });
  });

  describe('`Add` links', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should have empty summary list row values and links for the empty multiple policy specific fields', () => {
      cy.assertSummaryListRowValueNew(summaryList, TOTAL_MONTHS_OF_COVER, DEFAULT.EMPTY);

      cy.checkText(
        summaryList.field(TOTAL_MONTHS_OF_COVER).changeLink(),
        `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[TOTAL_MONTHS_OF_COVER].SUMMARY.TITLE}`,
      );

      cy.assertSummaryListRowValueNew(summaryList, TOTAL_SALES_TO_BUYER, DEFAULT.EMPTY);

      cy.checkText(
        summaryList.field(TOTAL_SALES_TO_BUYER).changeLink(),
        `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[TOTAL_SALES_TO_BUYER].SUMMARY.TITLE}`,
      );

      cy.assertSummaryListRowValueNew(summaryList, MAXIMUM_BUYER_WILL_OWE, DEFAULT.EMPTY);

      cy.checkText(
        summaryList.field(MAXIMUM_BUYER_WILL_OWE).changeLink(),
        `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[MAXIMUM_BUYER_WILL_OWE].SUMMARY.TITLE}`,
      );
    });

    it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
      summaryList.field(TOTAL_MONTHS_OF_COVER).changeLink().click();
      cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE, TOTAL_MONTHS_OF_COVER, 'label');

      cy.clickBackLink();

      summaryList.field(TOTAL_SALES_TO_BUYER).changeLink().click();
      cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE, TOTAL_SALES_TO_BUYER, 'label');

      cy.clickBackLink();

      summaryList.field(MAXIMUM_BUYER_WILL_OWE).changeLink().click();
      cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE, MAXIMUM_BUYER_WILL_OWE, 'label');

      cy.clickBackLink();
    });
  });
});
