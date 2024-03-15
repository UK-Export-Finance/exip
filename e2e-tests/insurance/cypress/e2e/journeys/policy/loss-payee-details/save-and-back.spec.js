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
  ALL_SECTIONS,
  POLICY: {
    LOSS_PAYEE_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const { POLICY } = application;

context('Insurance - Policy - Loss payee details page - Save and back', () => {
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
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: false });
      cy.completeAndSubmitLossPayeeForm({ appointingLossPayee: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;
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

      cy.checkTaskPolicyStatusIsComplete();
    });
  });

  describe(`when entering a value for ${NAME}`, () => {
    it(`should redirect to ${ALL_SECTIONS} and keep the "insurance policy" task status to "in progress"`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(NAME).input(), POLICY[NAME]);

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkTaskPolicyStatusIsComplete();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToUrl(allSectionsUrl);

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
    it(`should redirect to ${ALL_SECTIONS} and retain the "insurance policy" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeDetailsForm({});

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkTaskPolicyStatusIsComplete();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.startInsurancePolicySection({});

      // go through 8 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 8 });

      cy.checkValue(field(NAME), POLICY[NAME]);
      const radioFieldId = `${LOCATION}-${IS_LOCATED_IN_UK}`;
      cy.assertRadioOptionIsChecked(field(radioFieldId).input());
    });
  });
});
