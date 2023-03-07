import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import application from '../../../../../fixtures/application';

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
    },
  },
} = FIELD_IDS;

const { STATUS: { IN_PROGRESS } } = TASKS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - About goods or services page - Save and go back', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      cy.completeAndSubmitSingleContractPolicyForm();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      saveAndBackButton().click();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      cy.checkTaskStatus(task, IN_PROGRESS);
    });
  });

  describe('when submitting an answer and submitting the form via `save and go back` button', () => {
    before(() => {
      // go back to the page via the task list
      task.link().click();
      submitButton().click();
      submitButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.keyboardInput(aboutGoodsOrServicesPage[DESCRIPTION].input(), application.POLICY_AND_EXPORTS[DESCRIPTION]);
      saveAndBackButton().click();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should update the status of task `type of policy and exports`to `in progress`', () => {
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      before(() => {
        // go back to the page via the task list
        task.link().click();
        submitButton().click();
        submitButton().click();
      });

      it('should have the originally submitted answer selected', () => {
        aboutGoodsOrServicesPage[DESCRIPTION].input().should('have.value', application.POLICY_AND_EXPORTS[DESCRIPTION]);
      });
    });
  });

  describe('when removing a previously submitted `buyer credit period` value', () => {
    const field = aboutGoodsOrServicesPage[DESCRIPTION];

    before(() => {
      // submit a value
      cy.keyboardInput(field.input(), 'Test');
      saveAndBackButton().click();

      // go back to the page
      cy.clickBackLink();

      field.input().clear();
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      before(() => {
        task.link().click();
        submitButton().click();
        submitButton().click();
      });

      it('should have no value in `buyer credit period`', () => {
        field.input().should('have.value', '');
      });
    });
  });
});
