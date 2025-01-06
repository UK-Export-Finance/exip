import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT },
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const navigateBackToPage = () => {
  cy.clickTaskDeclarationsAndSubmit();

  // go through the first 3 declaration forms.
  cy.clickSubmitButtonMultipleTimes({ count: 3 });
};

context('Insurance - Declarations - Exporting with code of conduct page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitDeclarationsForms({ stopSubmittingAfter: 'codeOfConduct', referenceNumber });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

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

    it('should retain the status of task `declarations and submit` as `in progress`', () => {
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

    it('should retain the status of task `declarations and submit` as `in progress`', () => {
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

    it('should retain the status of task `declarations and submit` as `in progress`', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      navigateBackToPage();

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
