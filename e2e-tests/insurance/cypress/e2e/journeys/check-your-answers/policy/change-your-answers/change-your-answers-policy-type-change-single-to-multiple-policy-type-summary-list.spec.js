import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { summaryList } from '../../../../../../../pages/shared';
import formatCurrency from '../../../../../../../helpers/format-currency';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  POLICY: {
    TYPE_OF_POLICY_CHECK_AND_CHANGE,
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS,
} = INSURANCE_ROUTES;

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    CONTRACT_POLICY: {
      MULTIPLE: {
        TOTAL_MONTHS_OF_COVER,
      },
    },
    EXPORT_VALUE: {
      MULTIPLE: {
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Change single to multiple policy type - Summary List', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let exportValueUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      const applicationRouteUrl = `${ROOT}/${referenceNumber}`;

      checkYourAnswersUrl = `${baseUrl}${applicationRouteUrl}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`;
      exportValueUrl = `${baseUrl}${applicationRouteUrl}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE}`;

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
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(checkYourAnswersUrl);
      cy.changePolicyTypeToMultipleAndSubmitContractPolicyForm();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY} with heading anchor`, () => {
      // assert the URL is MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE
      cy.assertUrl(`${exportValueUrl}#heading`);

      // complete the now required "export value" form.
      cy.completeAndSubmitExportValueForm();

      // assert the URL is CHECK_YOUR_ANSWERS.TYPE_OF_POLICY
      cy.assertUrl(`${checkYourAnswersUrl}#heading`);
    });
  });

  describe('render new answers and change links for new multiple policy fields', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);
    });

    it(POLICY_TYPE, () => {
      cy.assertSummaryListRowValue(summaryList, POLICY_TYPE, FIELD_VALUES.POLICY_TYPE.MULTIPLE);
    });

    it(TOTAL_MONTHS_OF_COVER, () => {
      fieldId = TOTAL_MONTHS_OF_COVER;

      const expectedValue = `${application.POLICY[fieldId]} months`;

      cy.assertSummaryListRowValue(summaryList, fieldId, expectedValue);
    });

    it(TOTAL_SALES_TO_BUYER, () => {
      fieldId = TOTAL_SALES_TO_BUYER;

      const expectedValue = formatCurrency(application.POLICY[fieldId]);

      cy.assertSummaryListRowValue(summaryList, fieldId, expectedValue);
    });

    it(MAXIMUM_BUYER_WILL_OWE, () => {
      fieldId = MAXIMUM_BUYER_WILL_OWE;

      const expectedMaximumBuyerWillOwe = formatCurrency(application.POLICY[fieldId]);

      cy.assertSummaryListRowValue(summaryList, fieldId, expectedMaximumBuyerWillOwe);

      // check the change link
      summaryList.field(MAXIMUM_BUYER_WILL_OWE).changeLink().click();

      cy.assertChangeAnswersPageUrl({
        referenceNumber, route: MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE, fieldId: MAXIMUM_BUYER_WILL_OWE, fragmentSuffix: 'label',
      });
    });
  });
});
