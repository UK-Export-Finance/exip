import { saveAndBackButton } from '../../../../../../pages/shared';
import { insurance } from '../../../../../../pages';
import partials from '../../../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.policy;

const FIELD_ID = FIELD_IDS.INSURANCE.POLICY.POLICY_TYPE;
const multiplePolicyField = insurance.policy.typeOfPolicyPage[FIELD_ID].multiple;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Type of policy page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection();

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY.TYPE_OF_POLICY}`;
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

    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `not started yet`', () => {
      const expected = TASKS.STATUS.NOT_STARTED_YET;

      cy.checkText(task.status(), expected);
    });
  });

  describe('when selecting an answer and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();

      cy.startInsurancePolicySection();

      multiplePolicyField.input().click();
      saveAndBackButton().click();
    });

    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should update the status of task `type of policy`to `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;

      cy.checkText(task.status(), expected);
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        cy.startInsurancePolicySection();

        multiplePolicyField.input().should('be.checked');
      });
    });
  });
});
