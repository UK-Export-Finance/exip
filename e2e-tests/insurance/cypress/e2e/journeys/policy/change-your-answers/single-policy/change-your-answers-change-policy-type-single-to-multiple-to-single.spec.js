import { field, summaryList } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/policy';

const {
  POLICY_TYPE: { SINGLE },
} = FIELD_VALUES;

const {
  ROOT,
  POLICY: { CHECK_YOUR_ANSWERS, SINGLE_CONTRACT_POLICY, SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE },
} = INSURANCE_ROUTES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: {
    SINGLE: { TOTAL_CONTRACT_VALUE },
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy type - single to multiple, then back to single', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let totalContractValueUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({});

      const applicationRouteUrl = `${ROOT}/${referenceNumber}`;

      checkYourAnswersUrl = `${baseUrl}${applicationRouteUrl}${CHECK_YOUR_ANSWERS}`;
      totalContractValueUrl = `${baseUrl}${applicationRouteUrl}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(checkYourAnswersUrl);

    cy.changePolicyTypeToMultipleAndSubmitContractPolicyForm();
    cy.completeAndSubmitExportValueForm();

    summaryList.field(POLICY_TYPE).changeLink().click();

    cy.completeAndSubmitPolicyTypeForm({ policyType: SINGLE });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should have empty field values when going back to ${SINGLE_CONTRACT_POLICY} and ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`, () => {
    cy.assertEmptyRequestedStartDateFieldValues();
    cy.assertEmptyContractCompletionDateFieldValues();

    cy.assertCurrencyFormFieldsAreEmpty();

    cy.navigateToUrl(totalContractValueUrl);

    field(TOTAL_CONTRACT_VALUE).input().should('have.value', '');
  });
});
