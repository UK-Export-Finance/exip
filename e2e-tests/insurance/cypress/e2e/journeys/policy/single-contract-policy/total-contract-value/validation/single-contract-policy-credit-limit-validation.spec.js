import { MINIMUM_CHARACTERS } from '../../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { monetaryFieldValidation } from '../../../../../../../../shared-test-assertions';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE },
} = INSURANCE_ROUTES;

const {
  CONTRACT_POLICY: {
    SINGLE: { CREDIT_LIMIT: FIELD_ID },
  },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: {
          [FIELD_ID]: ERROR_MESSAGES_OBJECT,
        },
      },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Policy - Single contract policy - Total contract value page - form validation - ${FIELD_ID}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({ formToStopAt: 'singleContractPolicy' });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  monetaryFieldValidation({
    fieldId: FIELD_ID,
    errorIndex: 1,
    errorMessages: ERROR_MESSAGES_OBJECT,
    totalExpectedErrors: 2,
    totalExpectedOtherErrorsWithValidMonetaryValue: 1,
    minimum: MINIMUM_CHARACTERS.POLICY.CREDIT_LIMIT,
  });
});
