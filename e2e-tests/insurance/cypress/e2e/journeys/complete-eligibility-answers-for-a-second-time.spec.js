import dashboardPage from '../../../../pages/insurance/dashboard';
import { countryInput } from '../../../../pages/shared';
import partials from '../../../../partials';
import { ROUTES, FIELD_IDS } from '../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../commands/forms';
import {
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
  completePreCreditPeriodForm,
  completeCompaniesHouseNumberForm,
} from '../../../../commands/insurance/eligibility/forms';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const {
  ELIGIBILITY: { BUYER_COUNTRY },
} = ROUTES.INSURANCE;

context('Insurance - Eligibility - start and complete for a second time after creating an application', () => {
  let referenceNumber;

  const buyerCountryUrl = `${Cypress.config('baseUrl')}${BUYER_COUNTRY}`;

  before(() => {
    cy.deleteAccount();

    cy.completeSignInAndGoToApplication().then((refNumber) => {
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
    completeExporterLocationForm();

    // UK goods and services question
    cy.assertUncheckedYesNoRadios();
    completeUkGoodsAndServicesForm();

    // insured amount question
    cy.assertUncheckedYesNoRadios();
    completeInsuredAmountForm();

    // insured period question
    cy.assertUncheckedYesNoRadios();
    completeInsuredPeriodForm();

    // other parties question
    cy.assertUncheckedYesNoRadios();
    completeOtherPartiesForm();

    // letter of credit question
    cy.assertUncheckedYesNoRadios();
    completeLetterOfCreditForm();

    // pre-credit period question
    cy.assertUncheckedYesNoRadios();
    completePreCreditPeriodForm();

    // companies house number question
    cy.assertUncheckedYesNoRadios();
    completeCompaniesHouseNumberForm();
  });
});
