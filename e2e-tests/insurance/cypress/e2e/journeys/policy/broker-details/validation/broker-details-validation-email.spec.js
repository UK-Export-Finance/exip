import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { assertEmailFieldValidation } from '../../../../../../../shared-test-assertions';

const {
  BROKER_DETAILS: {
    EMAIL: FIELD_ID,
  },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    POLICY: {
      BROKER_DETAILS: {
        [FIELD_ID]: ERROR_MESSAGES_OBJECT,
      },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context("Insurance - Policy - Broker details page - As an exporter, I want to provide UKEF with my broker's details, So that UKEF can communicate with the broker as needed whilst processing my application'", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

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

  assertEmailFieldValidation({
    fieldId: FIELD_ID,
    errorIndex: 0,
    errorMessages: ERROR_MESSAGES_OBJECT,
    assertMaximumLength: true,
  });
});
