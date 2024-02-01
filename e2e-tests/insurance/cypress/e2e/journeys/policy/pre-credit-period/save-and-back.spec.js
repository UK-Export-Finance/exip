import { field as fieldSelector, saveAndBackButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { FIELD_VALUES } from '../../../../../../constants';
import mockApplication from '../../../../../../fixtures/application';

const { taskList } = partials.insurancePartials;

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: {
    PRE_CREDIT_PERIOD,
  },
} = INSURANCE_ROUTES;

const { CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

const {
  [CREDIT_PERIOD_WITH_BUYER]: { MAXIMUM },
} = FIELDS;

const descriptionField = fieldSelector(CREDIT_PERIOD_WITH_BUYER);

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Pre-credit period page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
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

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });
  });

  describe('when submitting only the `no` radio and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completePreCreditPeriodForm({ needPreCreditPeriod: false });

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
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

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    it('should not have saved the invalid submitted value when going back to the page', () => {
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

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    it('should have saved all submitted value when going back to the page', () => {
      cy.startInsurancePolicySection({});
      cy.clickSubmitButtonMultipleTimes({ count: 4 });

      cy.assertYesRadioOptionIsChecked();
      descriptionField.textarea().should('have.value', mockApplication.POLICY[CREDIT_PERIOD_WITH_BUYER]);
    });
  });
});
