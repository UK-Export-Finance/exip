import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { submitButton, summaryList } from '../../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../../pages/insurance/policy';
import { createTimestampFromNumbers, formatDate } from '../../../../../../../helpers/date';
import formatCurrency from '../../../../../../../helpers/format-currency';
import application from '../../../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    TYPE_OF_POLICY_CHECK_AND_CHANGE,
    SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS,
} = INSURANCE_ROUTES;

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    CONTRACT_POLICY: {
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Change multiple to single policy type - Summary List', () => {
  let checkYourAnswersUrl;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      checkYourAnswersUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`;
      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  let fieldId = POLICY_TYPE;

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(POLICY_TYPE).changeLink().click();
    });

    it(`should redirect to ${TYPE_OF_POLICY_CHECK_AND_CHANGE} with heading anchor`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHECK_AND_CHANGE}#heading`;

      cy.assertUrl(expected);
    });
  });

  describe('after submitting a new policy type (single) and completing (now required) fields for a single policy', () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(fieldId).changeLink().click();

      typeOfPolicyPage[fieldId].single.input().click();
      submitButton().click();

      cy.completeAndSubmitSingleContractPolicyForm({});

      const expectedUrl = `${checkYourAnswersUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });

    describe('should render new answers and change links for new single policy fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(POLICY_TYPE, () => {
        cy.assertSummaryListRowValueNew(summaryList, POLICY_TYPE, FIELD_VALUES.POLICY_TYPE.SINGLE);
      });

      it(CONTRACT_COMPLETION_DATE, () => {
        fieldId = CONTRACT_COMPLETION_DATE;
        const newAnswer = application.POLICY[fieldId];

        const expectedDate = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedDate);
      });

      it(`${TOTAL_CONTRACT_VALUE} with different change link`, () => {
        fieldId = TOTAL_CONTRACT_VALUE;

        const expectedTotalContractValue = formatCurrency(application.POLICY[fieldId]);

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedTotalContractValue);

        // check the change link
        summaryList.field(TOTAL_CONTRACT_VALUE).changeLink().click();
        cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE, TOTAL_CONTRACT_VALUE, 'label');
      });
    });
  });
});
