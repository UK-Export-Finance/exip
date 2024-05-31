import { summaryList } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/policy';

const {
  POLICY_TYPE: { SINGLE },
} = FIELD_VALUES;

const {
  ROOT,
  POLICY: { CHECK_YOUR_ANSWERS, SINGLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy type - single to multiple, then back to single', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({});

      const applicationRouteUrl = `${ROOT}/${referenceNumber}`;

      checkYourAnswersUrl = `${baseUrl}${applicationRouteUrl}${CHECK_YOUR_ANSWERS}`;

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

  it(`should have empty field values when going back to ${SINGLE_CONTRACT_POLICY}`, () => {
    cy.assertEmptyRequestedStartDateFieldValues();
    cy.assertEmptyContractCompletionDateFieldValues();

    cy.assertCurrencyFormFieldsAreEmpty();
  });
});
