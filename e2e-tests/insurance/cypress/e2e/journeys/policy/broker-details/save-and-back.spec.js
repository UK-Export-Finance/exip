import { field as fieldSelector } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../../../../fixtures/application';

const {
  BROKER_DETAILS: { NAME },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: {
    BROKER_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker details page - Save and back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({});
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when no fields are provided', () => {
    it(`should redirect to ${ALL_SECTIONS} and retain the "insurance policy" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe('when fields are partially completed', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${ALL_SECTIONS} and retain the "insurance policy" task status as "in progress"`, () => {
      cy.keyboardInput(fieldSelector(NAME).input(), mockApplication.BROKER[NAME]);

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.checkValue(fieldSelector(NAME), mockApplication.BROKER[NAME]);
    });
  });

  describe('when all fields are provided', () => {
    it(`should redirect to ${ALL_SECTIONS} and change the "insurance policy" task status to "Completed"`, () => {
      cy.navigateToUrl(url);

      cy.completeBrokerDetailsForm({});

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkTaskPolicyStatusIsComplete();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.startInsurancePolicySection({});

      // go through 7 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 7 });

      cy.assertBrokerDetailsFieldValues({});
    });
  });
});
