import { field as fieldSelector, submitButton, saveAndBackButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { TASKS } from '../../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import application from '../../../../../../../fixtures/application';

const { taskList } = partials.insurancePartials;

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: {
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    EXPORT_VALUE: {
      MULTIPLE: {
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const task = taskList.prepareApplication.tasks.policy;

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy export value page - Save and go back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(policyType);
      cy.completeAndSubmitMultipleContractPolicyForm();

      url = `${baseUrl}${ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`;
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

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
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
      cy.assertUrl(allSectionsUrl);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.keyboardInput(field.input(), invalidValue);

        saveAndBackButton().click();

        cy.startInsurancePolicySection({});

        submitButton().click();
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
      cy.assertUrl(allSectionsUrl);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should have the submitted value', () => {
        fieldSelector(TOTAL_SALES_TO_BUYER).input().should('have.value', application.POLICY[TOTAL_SALES_TO_BUYER]);
      });
    });
  });

  describe('when all fields are provided and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeExportValueForm({ policyType });
      saveAndBackButton().click();
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render all submitted values', () => {
        fieldSelector(TOTAL_SALES_TO_BUYER).input().should('have.value', application.POLICY[TOTAL_SALES_TO_BUYER]);
        fieldSelector(MAXIMUM_BUYER_WILL_OWE).input().should('have.value', application.POLICY[MAXIMUM_BUYER_WILL_OWE]);
      });
    });
  });
});
