import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const { taskList } = partials.insurancePartials;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { CODE_OF_CONDUCT },
  },
} = INSURANCE_ROUTES;

const task = taskList.submitApplication.tasks.declarationsAndSubmit;

const baseUrl = Cypress.config('baseUrl');

const navigateBackToPage = () => {
  task.link().click();

  // go through the first 2 declaration forms.
  cy.clickSubmitButtonMultipleTimes({ count: 2 });
};

context('Insurance - Declarations - Anti-bribery - Code of conduct page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      // go to the page we want to test.
      task.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();
      cy.completeAndSubmitDeclarationAntiBribery();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT}`;

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

  describe(`when submitting an answer of ${FIELD_VALUES.YES} via 'save and go back' button`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `declarations` as `in progress`', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      navigateBackToPage();

      cy.assertYesRadioOptionIsChecked();
    });
  });

  describe(`when submitting an answer of ${FIELD_VALUES.NO} via 'save and go back' button`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickNoRadioInput();

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `declarations` as `in progress`', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      navigateBackToPage();

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
