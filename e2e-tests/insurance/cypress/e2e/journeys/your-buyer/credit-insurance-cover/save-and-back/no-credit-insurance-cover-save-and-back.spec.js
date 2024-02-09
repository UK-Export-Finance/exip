import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  YOUR_BUYER: { CREDIT_INSURANCE_COVER },
  ALL_SECTIONS,
  ROOT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Credit insurance cover - Save and back - No', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});
      cy.completeAndSubmitCompanyOrOrganisationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCreditInsuranceCoverForm({});

      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      cy.checkTaskBuyerStatusIsInProgress();
    });

    it('should retain all inputs on the page', () => {
      cy.navigateToUrl(url);

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
