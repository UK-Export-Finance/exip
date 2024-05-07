import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import application from '../../../../../../fixtures/application';
import { field } from '../../../../../../pages/shared';

const {
  LOSS_PAYEE_DETAILS: {
    NAME, LOCATION, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY,
  },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    LOSS_PAYEE_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const { POLICY } = application;

context('Insurance - Policy - Loss payee details page - Save and back', () => {
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
      cy.completeAndSubmitBrokerForm({ usingBroker: false });
      cy.completeAndSubmitLossPayeeForm({ isAppointingLossPayee: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;

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

  describe(`when entering a value for ${NAME}`, () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(NAME).input(), POLICY[NAME]);

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 8 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 8 });

      cy.checkValue(field(NAME), POLICY[NAME]);

      const radioFieldIdUk = `${LOCATION}-${IS_LOCATED_IN_UK}`;
      cy.assertRadioOptionIsNotChecked(field(radioFieldIdUk).input());

      const radioFieldIdInternational = `${LOCATION}-${IS_LOCATED_INTERNATIONALLY}`;
      cy.assertRadioOptionIsNotChecked(field(radioFieldIdInternational).input());
    });
  });

  describe('when all fields are provided', () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status to `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeDetailsForm({});

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 8 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 8 });

      cy.checkValue(field(NAME), POLICY[NAME]);
      const radioFieldId = `${LOCATION}-${IS_LOCATED_IN_UK}`;
      cy.assertRadioOptionIsChecked(field(radioFieldId).input());
    });
  });
});
