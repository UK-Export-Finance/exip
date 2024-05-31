import { field, summaryList } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  POLICY_TYPE: { MULTIPLE },
} = FIELD_VALUES;

const {
  ROOT,
  POLICY: { CHECK_YOUR_ANSWERS, MULTIPLE_CONTRACT_POLICY, MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE },
} = INSURANCE_ROUTES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy type - multiple to single, then back to multiple', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let exportValueUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ policyType: MULTIPLE });

      const applicationRouteUrl = `${ROOT}/${referenceNumber}`;

      checkYourAnswersUrl = `${baseUrl}${applicationRouteUrl}${CHECK_YOUR_ANSWERS}`;
      exportValueUrl = `${baseUrl}${applicationRouteUrl}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`;

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

  it(`should have empty field values when going back to ${MULTIPLE_CONTRACT_POLICY} and ${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, () => {
    cy.assertEmptyRequestedStartDateFieldValues();

    field(TOTAL_MONTHS_OF_COVER).input().should('have.value', '');

    cy.assertCurrencyFormFieldsAreEmpty();

    cy.navigateToUrl(exportValueUrl);

    field(TOTAL_SALES_TO_BUYER).input().should('have.value', '');
    field(MAXIMUM_BUYER_WILL_OWE).input().should('have.value', '');
  });
});
