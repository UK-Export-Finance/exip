import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORTER_BUSINESS: { CREDIT_CONTROL },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Credit control - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});
      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_CONTROL}`;

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
    before(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `your business` as `in progress`', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskBusinessStatusIsInProgress();
    });
  });

  describe('when submitting the answer as `yes` via `save and go back` button', () => {
    it('should redirect to `all sections`', () => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();
      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should change the status of task `your business` as `completed`', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskBusinessStatusIsComplete();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.assertYesRadioOptionIsChecked();
    });
  });

  describe('when submitting the answer as `no` via `save and go back` button', () => {
    it('should redirect to `all sections`', () => {
      cy.navigateToUrl(url);

      cy.clickNoRadioInput();
      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should change the status of task `your business` as `completed`', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskBusinessStatusIsComplete();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
