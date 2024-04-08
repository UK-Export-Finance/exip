import { field } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../../fixtures/application';

const {
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = YOUR_BUYER_FIELD_IDS;

const {
  YOUR_BUYER: { CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER_ROUTE },
  ROOT,
} = INSURANCE_ROUTES;

const { BUYER } = application;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Connection to buyer - Has connection to buyer - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});
      cy.completeAndSubmitCompanyOrOrganisationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER_ROUTE}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `not started yet`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });
  });

  describe('when submitting a partially filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeConnectionToTheBuyerForm({});

      cy.clickYesRadioInput();

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });

    it('should retain completed input on the page', () => {
      // get to connection to buyer form
      cy.startInsuranceYourBuyerSection({});
      cy.clickSubmitButton();

      cy.assertYesRadioOptionIsChecked();
      cy.checkText(field(CONNECTION_WITH_BUYER_DESCRIPTION).textarea(), '');
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeConnectionToTheBuyerForm({ hasConnectionToBuyer: true });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });

    it('should retain all inputs on the page', () => {
      // get to connection to buyer form
      cy.startInsuranceYourBuyerSection({});
      cy.clickSubmitButton();

      cy.assertYesRadioOptionIsChecked();
      cy.checkText(field(CONNECTION_WITH_BUYER_DESCRIPTION).textarea(), BUYER[CONNECTION_WITH_BUYER_DESCRIPTION]);
    });
  });
});
