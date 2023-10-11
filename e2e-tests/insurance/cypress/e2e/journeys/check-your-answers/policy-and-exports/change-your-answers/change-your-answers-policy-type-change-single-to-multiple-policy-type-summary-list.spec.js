import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { submitButton, summaryList } from '../../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../../pages/insurance/policy-and-export';
import formatCurrency from '../../../../../../../helpers/format-currency';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY_CHECK_AND_CHANGE,
    MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS,
} = INSURANCE_ROUTES;

const {
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
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy and exports - Change single to multiple policy type - Summary List', () => {
  let checkYourAnswersUrl;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`;
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

      summaryList.field(fieldId).changeLink().click();
    });

    it(`should redirect to ${TYPE_OF_POLICY_CHECK_AND_CHANGE} with heading anchor`, () => {
      const expected = `${baseUrl}${ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHECK_AND_CHANGE}#heading`;

      cy.assertUrl(expected);
    });
  });

  describe('after submitting a new policy type (multiple) and completing (now required) fields for a multiple policy', () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(fieldId).changeLink().click();

      typeOfPolicyPage[fieldId].multiple.input().click();
      submitButton().click();

      cy.completeAndSubmitMultipleContractPolicyForm({});

      const expectedUrl = `${checkYourAnswersUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });

    describe('should render new answers and change links for new multiple policy fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(POLICY_TYPE, () => {
        cy.assertSummaryListRowValueNew(summaryList, POLICY_TYPE, FIELD_VALUES.POLICY_TYPE.SINGLE);
      });

      it(TOTAL_MONTHS_OF_COVER, () => {
        fieldId = TOTAL_MONTHS_OF_COVER;

        const expectedValue = `${application.POLICY_AND_EXPORTS[fieldId]} months`;

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedValue);
      });

      it(TOTAL_SALES_TO_BUYER, () => {
        fieldId = TOTAL_SALES_TO_BUYER;

        const expectedValue = formatCurrency(application.POLICY_AND_EXPORTS[fieldId]);

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedValue);
      });

      it(`${MAXIMUM_BUYER_WILL_OWE} with different change link`, () => {
        fieldId = MAXIMUM_BUYER_WILL_OWE;

        const expectedMaximumBuyerWillOwe = formatCurrency(application.POLICY_AND_EXPORTS[fieldId]);

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedMaximumBuyerWillOwe);

        // check the change link
        summaryList.field(MAXIMUM_BUYER_WILL_OWE).changeLink().click();
        cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE, MAXIMUM_BUYER_WILL_OWE, 'label');
      });
    });
  });
});
