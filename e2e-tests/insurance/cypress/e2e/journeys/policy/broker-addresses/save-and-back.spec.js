import { radios } from '../../../../../../pages/shared';
import { ORDNANCE_SURVEY_EXAMPLES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const { TREASURY } = ORDNANCE_SURVEY_EXAMPLES;

const {
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_ADDRESSES_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const optionValue = `${TREASURY.ADDRESS_LINE_1} ${TREASURY.ADDRESS_LINE_2}`;

context('Insurance - Policy - Broker addresses page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'brokerDetails', usingBroker: true, isBasedInUk: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}`;

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
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe('when submitting an answer and submitting the form via `save and go back` button', () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeBrokerAddressesForm({ optionValue });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain the selected field on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 8 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 8 });

      const { option } = radios(FIELD_ID, optionValue);

      cy.assertRadioOptionIsChecked(option.input());
    });
  });
});
