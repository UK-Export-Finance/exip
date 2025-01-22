import { field } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import application from '../../../../../../fixtures/application';

const {
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker manual address page - Based in UK - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({
        stopSubmittingAfter: 'brokerDetails',
        usingBroker: true,
        isBasedInUk: true,
        buildingNumberOrName: '123456789',
      });

      cy.clickEnterAddressManuallyLink();

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `insurance policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe('when submitting an answer and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      cy.keyboardInput(field(FIELD_ID).textarea(), application.BROKER[FIELD_ID]);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `insurance policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });
  });
});
