import { field as fieldSelector } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../../../../fixtures/application';

const {
  BROKER_DETAILS: { NAME, IS_BASED_IN_UK },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_DETAILS_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker details page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'broker', usingBroker: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

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

  describe('when fields are partially completed', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.keyboardInput(fieldSelector(NAME).input(), mockApplication.BROKER[NAME]);

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.checkValue(fieldSelector(NAME), mockApplication.BROKER[NAME]);
    });
  });

  describe(`when submitting all fields with ${IS_BASED_IN_UK} as no`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeBrokerDetailsForm({ isBasedInUk: false });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 7 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 7 });

      cy.assertBrokerDetailsFieldValues({});
    });
  });

  describe(`when submitting all fields with ${IS_BASED_IN_UK} as yes`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeBrokerDetailsForm({ isBasedInUk: true });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 7 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 7 });

      cy.assertBrokerDetailsFieldValues({ isBasedInUk: false });
    });
  });
});
