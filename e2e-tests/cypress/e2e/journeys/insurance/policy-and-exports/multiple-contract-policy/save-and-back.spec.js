import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import { typeOfPolicyPage, multipleContractPolicyPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import application from '../../../../../fixtures/application';

const { taskList } = partials.insurancePartials;

const multiplePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const multiplePolicyField = typeOfPolicyPage[multiplePolicyFieldId].multiple;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY_AND_EXPORTS: {
      MULTIPLE_CONTRACT_POLICY,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: { TOTAL_SALES_TO_BUYER },
      },
    },
  },
} = FIELD_IDS;

context('Insurance - Policy and exports - Multiple contract policy page - Save and go back', () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    multiplePolicyField.input().click();
    submitButton().click();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      saveAndBackButton().click();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      const task = taskList.prepareApplication.tasks.policyTypeAndExports;

      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.IN_PROGRESS;

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('when entering an invalid total sales to buyer and submitting the form via `save and go back` button', () => {
    const field = multipleContractPolicyPage[TOTAL_SALES_TO_BUYER];
    const invalidValue = 'Not a number';

    before(() => {
      // go back to the page via the task list
      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();
      submitButton().click();

      field.input().type(invalidValue);
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      saveAndBackButton().click();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      const task = taskList.prepareApplication.tasks.policyTypeAndExports;

      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.IN_PROGRESS;

        expect(text.trim()).equal(expected);
      });
    });

    describe('when going back to the page', () => {
      before(() => {
        taskList.prepareApplication.tasks.policyTypeAndExports.link().click();
        submitButton().click();
      });

      it('should not have saved the submitted value', () => {
        field.input().should('have.value', '');
      });
    });
  });

  describe('when entering a valid total sales to buyer and submitting the form via `save and go back` button', () => {
    const field = multipleContractPolicyPage[TOTAL_SALES_TO_BUYER];

    before(() => {
      field.input().type(application.POLICY_AND_EXPORTS[TOTAL_SALES_TO_BUYER]);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      const task = taskList.prepareApplication.tasks.policyTypeAndExports;

      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.IN_PROGRESS;

        expect(text.trim()).equal(expected);
      });
    });

    describe('when going back to the page', () => {
      before(() => {
        taskList.prepareApplication.tasks.policyTypeAndExports.link().click();
        submitButton().click();
      });

      it('should have the submitted value', () => {
        multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input().should('have.value', application.POLICY_AND_EXPORTS[TOTAL_SALES_TO_BUYER]);
      });
    });
  });
});
