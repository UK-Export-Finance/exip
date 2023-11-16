import { backLink, countryInput, submitButton } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { FIELD_IDS } from '../../../../../../constants';
import { COUNTRY_SUPPORTRED_BY_EMAIL } from '../../../../../../fixtures/countries';
import { LINKS } from '../../../../../../content-strings';

const {
  ELIGIBILITY: { BUYER_COUNTRY },
  START,
  APPLY_OFFLINE,
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const baseUrl = Cypress.config('baseUrl');

context('Buyer country page - as an exporter, I want to check if UKEF issue credit insurance cover for where my buyer is based - submit country that can only apply offline/via a physical form', () => {
  const buyerCountryUrl = BUYER_COUNTRY;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(buyerCountryUrl);

    cy.keyboardInput(countryInput.field(FIELD_ID).input(), COUNTRY_SUPPORTRED_BY_EMAIL.name);

    const results = countryInput.field(FIELD_ID).results();
    results.first().click();

    submitButton().click();
  });

  it('redirects to `apply offline` exit page', () => {
    const expectedUrl = `${baseUrl}${APPLY_OFFLINE}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders a back link with correct url', () => {
    const expectedHref = `${Cypress.config('baseUrl')}${BUYER_COUNTRY}`;

    cy.checkLink(
      backLink(),
      expectedHref,
      LINKS.BACK,
    );
  });

  it('should prepopulate the field when going back to the page via back link', () => {
    cy.clickBackLink();

    const expectedValue = COUNTRY_SUPPORTRED_BY_EMAIL.name;

    cy.checkValue(countryInput.field(FIELD_ID), expectedValue);

    cy.checkText(countryInput.field(FIELD_ID).results(), expectedValue);
  });
});
