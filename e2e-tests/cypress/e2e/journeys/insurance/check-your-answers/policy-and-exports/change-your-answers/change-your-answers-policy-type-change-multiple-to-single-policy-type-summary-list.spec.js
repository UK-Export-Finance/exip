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
    SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
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
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      },
    },
  },
} = FIELD_IDS;

const { CONTRACT_POLICY: { SINGLE: SINGLE_FIELD_STRINGS } } = FIELDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const { summaryList } = checkYourAnswersPolicyAndExports;

context('Insurance - Change your answers - Policy and exports - Change multiple to single policy type - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType();

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

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

      typeOfPolicyPage[fieldId].single.input().click();
      submitButton().click();
    });

    it(`should redirect to ${TYPE_OF_POLICY}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}#heading`;

      cy.url().should('eq', expected);
    });

    it('should render the new answer', () => {
      const expected = FIELD_VALUES.POLICY_TYPE.SINGLE;
      cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
    });
  });

  describe('`Add` links', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should have empty summary list row values and links for the empty single policy specific fields', () => {
      cy.assertSummaryListRowValueNew(summaryList, CONTRACT_COMPLETION_DATE, DEFAULT.EMPTY);

      cy.checkText(
        summaryList.field(CONTRACT_COMPLETION_DATE).changeLink(),
        `${LINKS.ADD} ${SINGLE_FIELD_STRINGS[CONTRACT_COMPLETION_DATE].SUMMARY.TITLE}`,
      );

      cy.assertSummaryListRowValueNew(summaryList, TOTAL_CONTRACT_VALUE, DEFAULT.EMPTY);

      cy.checkText(
        summaryList.field(TOTAL_CONTRACT_VALUE).changeLink(),
        `${LINKS.ADD} ${SINGLE_FIELD_STRINGS[TOTAL_CONTRACT_VALUE].SUMMARY.TITLE}`,
      );
    });

    it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
      summaryList.field(TOTAL_CONTRACT_VALUE).changeLink().click();
      cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE, TOTAL_CONTRACT_VALUE, 'label');
    });
  });
});
