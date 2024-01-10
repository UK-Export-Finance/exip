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
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

const task = taskList.prepareApplication.tasks.policy;

const policyType = FIELD_VALUES.POLICY_TYPE.SINGLE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy - total contract value page - Save and go back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(policyType);
      cy.completeAndSubmitSingleContractPolicyForm();

      url = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;
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

  describe('when entering an invalid total contract value and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(TOTAL_CONTRACT_VALUE);
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

  describe('when entering a valid total contract value and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(TOTAL_CONTRACT_VALUE);

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), application.POLICY[TOTAL_CONTRACT_VALUE]);

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
        fieldSelector(TOTAL_CONTRACT_VALUE).input().should('have.value', application.POLICY[TOTAL_CONTRACT_VALUE]);
      });
    });
  });
});
