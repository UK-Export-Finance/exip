import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import application from '../../../../../fixtures/application';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - About goods or services - Save and go back', () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

    cy.completeAndSubmitSingleContractPolicyForm();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      saveAndBackButton().click();

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.IN_PROGRESS;

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('when submitting an answer and submitting the form via `save and go back` button', () => {
    before(() => {
      // go back to the page via the task list
      task.link().click();
      submitButton().click();
      submitButton().click();
    });

    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      aboutGoodsOrServicesPage[DESCRIPTION].input().type(application.POLICY_AND_EXPORTS[DESCRIPTION]);
      saveAndBackButton().click();

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should update the status of task `type of policy and exports`to `in progress`', () => {
      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.IN_PROGRESS;

        expect(text.trim()).equal(expected);
      });
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
});
