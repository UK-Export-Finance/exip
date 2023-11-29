import { field as fieldSelector, submitButton, saveAndBackButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import application from '../../../../../../fixtures/application';

const { taskList } = partials.insurancePartials;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY: {
      MULTIPLE_CONTRACT_POLICY,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        CREDIT_PERIOD_WITH_BUYER,
        MULTIPLE: { TOTAL_SALES_TO_BUYER },
      },
    },
  },
} = FIELD_IDS;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection();
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

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
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });
  });

  describe('when entering an invalid total sales to buyer and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(TOTAL_SALES_TO_BUYER);
    const invalidValue = 'Not a number';

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), invalidValue);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.keyboardInput(field.input(), invalidValue);

        saveAndBackButton().click();

        cy.startInsurancePolicySection();

        submitButton().click();
      });

      it('should not have saved the submitted value', () => {
        field.input().should('have.value', '');
      });
    });
  });

  describe('when entering a valid total sales to buyer and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(TOTAL_SALES_TO_BUYER);

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), application.POLICY[TOTAL_SALES_TO_BUYER]);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.keyboardInput(field.input(), application.POLICY[TOTAL_SALES_TO_BUYER]);

        saveAndBackButton().click();

        cy.startInsurancePolicySection();
        submitButton().click();
      });

      it('should have the submitted value', () => {
        fieldSelector(TOTAL_SALES_TO_BUYER).input().should('have.value', application.POLICY[TOTAL_SALES_TO_BUYER]);
      });
    });
  });

  describe('when removing a previously submitted `buyer credit period` value', () => {
    const field = fieldSelector(CREDIT_PERIOD_WITH_BUYER);

    beforeEach(() => {
      cy.navigateToUrl(url);

      // submit a value
      cy.keyboardInput(field.input(), 'Test');
      saveAndBackButton().click();

      // go back to the page
      cy.clickBackLink();

      field.input().clear();
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        // submit a value
        cy.keyboardInput(field.input(), 'Test');
        saveAndBackButton().click();

        // go back to the page
        cy.clickBackLink();

        field.input().clear();
        saveAndBackButton().click();

        cy.startInsurancePolicySection();
        submitButton().click();
      });

      it('should have no value in `buyer credit period`', () => {
        field.input().should('have.value', '');
      });
    });
  });
});
