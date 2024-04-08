import partials from '../../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { summaryList } from '../../../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../../../pages/insurance/policy';
import { createTimestampFromNumbers, formatDate } from '../../../../../../../../helpers/date';
import formatCurrency from '../../../../../../../../helpers/format-currency';
import application from '../../../../../../../../fixtures/application';

const {
  ROOT,
  POLICY: {
    TYPE_OF_POLICY_CHECK_AND_CHANGE,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE,
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
  let checkAndChangeTotalContractValueUrl;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ referenceNumber });

      task.link().click();

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`;
      checkAndChangeTotalContractValueUrl = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`;

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
      const expected = `${baseUrl}${ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHECK_AND_CHANGE}#heading`;

      cy.assertUrl(expected);
    });
  });

  describe('after submitting a new policy type (single) and completing (now required) fields for a single policy', () => {
    it(`should redirect to ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE} because the policy type has changed`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(fieldId).changeLink().click();

      typeOfPolicyPage[fieldId].single.label().click();
      cy.clickSubmitButton();

      cy.completeAndSubmitSingleContractPolicyForm({});

      cy.assertUrl(`${checkAndChangeTotalContractValueUrl}#heading`);
    });

    describe(`after submitting a new ${TOTAL_CONTRACT_VALUE} answer`, () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, () => {
        cy.navigateToUrl(`${checkAndChangeTotalContractValueUrl}#heading`);

        cy.completeAndSubmitTotalContractValueForm({ });

        const expectedUrl = `${checkYourAnswersUrl}#heading`;

        cy.assertUrl(expectedUrl);
      });
    });

    describe('should render new answers and change links for new single policy fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(POLICY_TYPE, () => {
        cy.assertSummaryListRowValue(summaryList, POLICY_TYPE, FIELD_VALUES.POLICY_TYPE.SINGLE);
      });

      it(CONTRACT_COMPLETION_DATE, () => {
        fieldId = CONTRACT_COMPLETION_DATE;
        const newAnswer = application.POLICY[fieldId];

        const expectedDate = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedDate);
      });

      it(`${TOTAL_CONTRACT_VALUE} with different change link`, () => {
        fieldId = TOTAL_CONTRACT_VALUE;

        const expectedTotalContractValue = formatCurrency(application.POLICY[fieldId]);

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedTotalContractValue);

        // check the change link
        summaryList.field(TOTAL_CONTRACT_VALUE).changeLink().click();
        cy.assertChangeAnswersPageUrl({
          referenceNumber, route: SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE, fieldId: TOTAL_CONTRACT_VALUE, fragmentSuffix: 'label',
        });
      });
    });
  });
});
