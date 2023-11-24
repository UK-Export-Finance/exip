import {
  backLink, countryInput, cannotApplyPage, submitButton,
} from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;
const { REASON } = CONTENT_STRINGS;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY, CANNOT_APPLY },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME = COUNTRY_APPLICATION_SUPPORT.UNSUPPORTED.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Buyer country page - as an exporter, I want to check if UKEF offer credit insurance policy for where my buyer is based - submit unsupported country', () => {
  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();

    cy.keyboardInput(countryInput.field(FIELD_ID).input(), COUNTRY_NAME);

    const results = countryInput.field(FIELD_ID).results();
    results.first().click();

    submitButton().click();
  });

  it('redirects to `cannot apply` exit page', () => {
    const expectedUrl = `${baseUrl}${CANNOT_APPLY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders a reason', () => {
    cannotApplyPage.reason().should('exist');

    const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_NAME}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });

  it('renders a back link with correct url', () => {
    const expectedHref = `${baseUrl}${BUYER_COUNTRY}`;

    cy.checkLink(
      backLink(),
      expectedHref,
      LINKS.BACK,
    );
  });

  it('should prepopulate the field when going back to the page via back link', () => {
    cy.clickBackLink();

    const expectedValue = COUNTRY_NAME;

    cy.checkValue(countryInput.field(FIELD_ID), expectedValue);

    cy.checkText(countryInput.field(FIELD_ID).results(), expectedValue);
  });
});
