import dashboardPage from '../../../../pages/insurance/dashboard';
import { countryInput } from '../../../../pages/shared';
import partials from '../../../../partials';
import { ROUTES, FIELD_IDS } from '../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../commands/forms';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const {
  ELIGIBILITY: { BUYER_COUNTRY },
} = ROUTES.INSURANCE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - start and complete for a second time after creating an application', () => {
  let referenceNumber;

  const buyerCountryUrl = `${baseUrl}${BUYER_COUNTRY}`;

  before(() => {
    cy.deleteAccount();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      partials.header.navigation.applications().click();

      dashboardPage.startNewApplicationButton().click();

      cy.assertUrl(buyerCountryUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(buyerCountryUrl);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should NOT have prepopulated answers', () => {
    // buyer country question
    cy.checkValue(countryInput.field(FIELD_ID), '');
    completeAndSubmitBuyerCountryForm();

    // exporter location question
    cy.assertUncheckedYesNoRadios();
    cy.completeExporterLocationForm();

    // UK goods and services question
    cy.assertUncheckedYesNoRadios();
    cy.completeUkGoodsAndServicesForm();

    // insured amount question
    cy.assertUncheckedYesNoRadios();
    cy.completeInsuredAmountForm();

    // insured period question
    cy.assertUncheckedYesNoRadios();
    cy.completeInsuredPeriodForm();

    // companies house number question
    cy.assertUncheckedYesNoRadios();
    cy.completeCompaniesHouseNumberForm();
  });
});
