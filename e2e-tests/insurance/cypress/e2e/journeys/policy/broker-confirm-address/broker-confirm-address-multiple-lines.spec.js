import { insetTextHtml, insetTextHtmlLineBreak } from '../../../../../../pages/shared';
import {
  MULTI_LINE_STRING,
  EXPECTED_SINGLE_LINE_STRING,
} from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  BROKER_DETAILS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_CONFIRM_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker confirm address - Address with multiple lines', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: true });
      cy.completeAndSubmitBrokerDetailsForm({
        fullAddress: MULTI_LINE_STRING,
      });

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`renders ${FULL_ADDRESS} exactly as they were submitted, with line break elements`, () => {
    /**
     * Cypress text assertion does not pick up HTML characters such as <br/>.
     * Therefore, we have to assert the text without line breaks
     * and instead, assert the line breaks separately.
     */
    cy.checkText(insetTextHtml(), EXPECTED_SINGLE_LINE_STRING);

    const expectedLineBreaks = 3;

    cy.assertLength(
      insetTextHtmlLineBreak(),
      expectedLineBreaks,
    );
  });
});
