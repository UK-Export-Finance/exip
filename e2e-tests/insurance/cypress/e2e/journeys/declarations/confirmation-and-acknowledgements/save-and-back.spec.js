import { singleInputField } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { taskList } = partials.insurancePartials;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { CONFIRMATION_AND_ACKNOWLEDGEMENTS },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS;

const task = taskList.submitApplication.tasks.declarationsAndSubmit;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Confirmation and acknowledgements page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitDeclarationsForms({ formToStopAt: 'exportingWithCodeOfConduct', referenceNumber });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

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

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `declarations` as `in progress`', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
    });
  });

  describe('when submitting an answer via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      singleInputField(FIELD_ID).label().click();

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should update the status of task `declarations` to `completed`', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsComplete();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      task.link().click();

      // go through the first 4 declaration forms.
      cy.clickSubmitButtonMultipleTimes({ count: 4 });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

      cy.assertRadioOptionIsChecked(singleInputField(FIELD_ID).input());
    });
  });
});
