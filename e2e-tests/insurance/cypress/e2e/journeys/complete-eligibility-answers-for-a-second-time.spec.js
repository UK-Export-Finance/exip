import dashboardPage from '../../../../pages/insurance/dashboard';
import { countryInput, field, } from '../../../../pages/shared';
import partials from '../../../../partials';
import { ROUTES, FIELD_IDS } from '../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../commands/forms';

const { 
  INSURANCE: {
    COMPANIES_HOUSE: { COMPANY_NUMBER },
    ELIGIBILITY: {
      BUYER_COUNTRY,
    },
  },
} = FIELD_IDS;

const {
  ELIGIBILITY: { EXPORTER_LOCATION },
} = ROUTES.INSURANCE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - start and complete for a second time after creating an application', () => {
  let referenceNumber;

  const exporterLocationUrl = `${baseUrl}${EXPORTER_LOCATION}`;

  before(() => {
    cy.deleteAccount();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      partials.header.navigation.applications().click();

      dashboardPage.startNewApplicationButton().click();

      cy.assertUrl(exporterLocationUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(exporterLocationUrl);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should NOT have prepopulated answers', () => {
    // exporter location question
    cy.assertUncheckedYesNoRadios();
    cy.completeExporterLocationForm();

    // companies house number question
    cy.assertUncheckedYesNoRadios();
    cy.completeCompaniesHouseNumberForm();

    // companies house search form
    cy.checkValue(field(COMPANY_NUMBER), '');

    cy.completeAndSubmitCompaniesHouseSearchForm({});

    // company details form
    cy.completeEligibilityCompanyDetailsForm();

    // buyer country question
    cy.checkValue(countryInput.field(BUYER_COUNTRY), '');
    completeAndSubmitBuyerCountryForm();

    // insured amount question
    cy.assertUncheckedYesNoRadios();
    cy.completeInsuredAmountForm();

    // insured period question
    cy.assertUncheckedYesNoRadios();
    cy.completeInsuredPeriodForm();

    // UK goods and services question
    cy.assertUncheckedYesNoRadios();
    cy.completeUkGoodsAndServicesForm();
  });
});
