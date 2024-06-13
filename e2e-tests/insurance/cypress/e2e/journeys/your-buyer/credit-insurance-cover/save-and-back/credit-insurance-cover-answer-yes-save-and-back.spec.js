import { field } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../../fixtures/application';

const { PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

const {
  YOUR_BUYER: { CREDIT_INSURANCE_COVER },
  ROOT,
} = INSURANCE_ROUTES;

const { BUYER } = application;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Credit insurance cover - Save and back - Yes', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});
      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      cy.completeAndSubmitTradingHistoryWithBuyerForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`;

      cy.navigateToUrl(url);

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

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });
  });

  describe('when submitting a partially filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

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
      cy.navigateToUrl(url);

      cy.assertYesRadioOptionIsChecked();

      const textArea = field(PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER).textarea();
      cy.checkText(textArea, '');
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCreditInsuranceCoverForm({ hasHadCreditInsuranceCoverWIthBuyer: true });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });

    it('should retain all inputs on the page', () => {
      cy.navigateToUrl(url);

      cy.assertYesRadioOptionIsChecked();

      const textArea = field(PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER).textarea();
      cy.checkText(textArea, BUYER[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]);
    });
  });
});
