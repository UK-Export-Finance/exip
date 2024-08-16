import dashboardPage from '../../../../pages/insurance/dashboard';
import { autoCompleteField, field } from '../../../../pages/shared';
import { ROUTES, FIELD_IDS } from '../../../../constants';

const {
  INSURANCE: {
    COMPANIES_HOUSE: { COMPANY_NUMBER },
    ELIGIBILITY: { BUYER_COUNTRY },
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

      cy.clickHeaderApplicationsLink();

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
    cy.checkValue(autoCompleteField(BUYER_COUNTRY), '');
    cy.completeAndSubmitBuyerCountryForm({});

    /**
     * total value insured question
     * check that both 2x radios are NOT checked.
     */
    cy.assertTotalValueInsuredRadios({ underThreshold: true, checked: false });
    cy.assertTotalValueInsuredRadios({ underThreshold: false, checked: false });
    cy.completeAndSubmitTotalValueInsuredForm({});

    /**
     * cover period question
     * check that both 2x radios are NOT checked.
     */
    cy.assertCoverPeriodRadios({ underThreshold: true, checked: false });
    cy.assertCoverPeriodRadios({ underThreshold: false, checked: false });
    cy.completeCoverPeriodForm({});

    // UK goods and services question
    cy.assertUncheckedYesNoRadios();
    cy.completeUkGoodsAndServicesForm();
  });
});
