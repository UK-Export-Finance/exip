import { field as fieldSelector } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import mockApplication from '../../../../../../fixtures/application';

const {
  ROOT,
  POLICY: {
    PRE_CREDIT_PERIOD,
  },
} = INSURANCE_ROUTES;

const { CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

const {
  [CREDIT_PERIOD_WITH_BUYER]: { MAXIMUM },
} = FIELDS;

const descriptionField = fieldSelector(CREDIT_PERIOD_WITH_BUYER);

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Pre-credit period page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;

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

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe('when submitting only the `no` radio and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completePreCreditPeriodForm({ needPreCreditPeriod: false });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have saved the submitted value when going back to the page', () => {
      cy.startInsurancePolicySection({});
      cy.clickSubmitButtonMultipleTimes({ count: 4 });

      cy.assertNoRadioOptionIsChecked();
    });
  });

  describe(`when entering an invalid ${CREDIT_PERIOD_WITH_BUYER} and submitting the form via 'save and go back' button`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completePreCreditPeriodForm({
        needPreCreditPeriod: true,
        description: 'a'.repeat(MAXIMUM + 1),
      });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should NOT have saved the invalid submitted value when going back to the page', () => {
      cy.startInsurancePolicySection({});
      cy.clickSubmitButtonMultipleTimes({ count: 4 });

      cy.assertYesRadioOptionIsChecked();
      descriptionField.textarea().should('have.value', '');
    });
  });

  describe(`when entering a valid ${CREDIT_PERIOD_WITH_BUYER} and submitting the form via 'save and go back' button`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completePreCreditPeriodForm({ needPreCreditPeriod: true });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have saved all submitted value when going back to the page', () => {
      cy.startInsurancePolicySection({});
      cy.clickSubmitButtonMultipleTimes({ count: 4 });

      cy.assertYesRadioOptionIsChecked();
      descriptionField.textarea().should('have.value', mockApplication.POLICY[CREDIT_PERIOD_WITH_BUYER]);
    });
  });
});
