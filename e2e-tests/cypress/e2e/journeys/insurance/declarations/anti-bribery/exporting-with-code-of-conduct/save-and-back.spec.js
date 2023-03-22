import {
  saveAndBackButton,
  submitButton,
  yesRadioInput,
} from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { TASKS } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const { STATUS: { IN_PROGRESS } } = TASKS;

const { taskList } = partials.insurancePartials;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  DECLARATIONS: {
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT },
  },
} = INSURANCE_ROUTES;

const task = taskList.submitApplication.tasks.declarations;

context('Insurance - Declarations - Exporting with code of conduct page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      // go to the page we want to test.
      task.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();
      cy.completeAndSubmitDeclarationAntiBribery();
      cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the status of task `declarations` as `in progress`', () => {
      cy.checkTaskStatus(task, IN_PROGRESS);
    });
  });

  describe('when submitting an answer via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      yesRadioInput().click();

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the status of task `declarations` as `in progress`', () => {
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      task.link().click();

      // go through the 1st declaration - confidentiality
      submitButton().click();

      // go through the 2nd declaration - anti-bribery
      submitButton().click();

      // go through the 3rd declaration - anti-bribery - code of conduct
      submitButton().click();

      yesRadioInput().should('be.checked');
    });
  });
});
