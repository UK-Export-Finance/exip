import { field, summaryList } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  POLICY_TYPE: { MULTIPLE },
} = FIELD_VALUES;

const {
  ROOT,
  POLICY: { CHECK_YOUR_ANSWERS, MULTIPLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy type - multiple to single, then back to multiple', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ policyType: MULTIPLE });

      const applicationRouteUrl = `${ROOT}/${referenceNumber}`;

      checkYourAnswersUrl = `${baseUrl}${applicationRouteUrl}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(checkYourAnswersUrl);

    cy.changePolicyTypeToSingleAndSubmitContractPolicyForm();
    cy.completeAndSubmitTotalContractValueForm({});

    summaryList.field(POLICY_TYPE).changeLink().click();

    cy.completeAndSubmitPolicyTypeForm({ policyType: MULTIPLE });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should have empty field values when going back to ${MULTIPLE_CONTRACT_POLICY}`, () => {
    cy.assertEmptyRequestedStartDateFieldValues();

    field(TOTAL_MONTHS_OF_COVER).input().should('have.value', '');

    cy.assertCurrencyFormFieldsAreEmpty();
  });
});
