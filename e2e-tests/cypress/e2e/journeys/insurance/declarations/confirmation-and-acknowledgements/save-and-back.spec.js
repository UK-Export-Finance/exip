import { saveAndBackButton, submitButton } from '../../../../pages/shared';
import { confirmationAndAcknowledgementsPage } from '../../../../pages/insurance/declarations';
import partials from '../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { STATUS: { IN_PROGRESS } } = TASKS;

const { taskList } = partials.insurancePartials;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  DECLARATIONS: { CONFIRMATION_AND_ACKNOWLEDGEMENTS },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS;

const task = taskList.submitApplication.tasks.declarations;

context('Insurance - Declarations - Confirmation and acknowledgements page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarations.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();
      cy.completeAndSubmitDeclarationAntiBribery();
      cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();
      cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
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
    let field;

    beforeEach(() => {
      cy.navigateToUrl(url);

      field = confirmationAndAcknowledgementsPage[FIELD_ID];

      field.input().click();

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

      // go through the 4th declaration - anti-bribery - exporting with code of conduct
      submitButton().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

      field.input().should('be.checked');
    });
  });
});
