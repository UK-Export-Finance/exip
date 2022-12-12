import { saveAndBackButton } from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import partials from '../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const FIELD_ID = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const multiplePolicyField = insurance.policyAndExport.typeOfPolicy[FIELD_ID].multi;

const { taskList } = partials.insurancePartials;

context('Insurance - Policy and exports - Type of policy page - Save and go back', () => {
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

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`;
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

    it('should retain the `type of policy and exports` task status as `not started yet`', () => {
      const task = taskList.prepareApplication.tasks.policyTypeAndExports;

      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.NOT_STARTED_YET;

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('when selecting an answer and submitting the form via `save and go back` button', () => {
    before(() => {
      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();
    });

    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      multiplePolicyField.input().click();
      saveAndBackButton().click();

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should update the status of task `type of policy and exports`to `in progress`', () => {
      const task = taskList.prepareApplication.tasks.policyTypeAndExports;

      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.IN_PROGRESS;

        expect(text.trim()).equal(expected);
      });
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

        multiplePolicyField.input().should('be.checked');
      });
    });
  });
});
