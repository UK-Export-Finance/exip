import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const {
  START,
  ELIGIBILITY: { CANNOT_APPLY },
} = INSURANCE_ROUTES;

const COUNTRY_NAME_1 = COUNTRY_APPLICATION_SUPPORT.UNSUPPORTED_1.NAME;
const COUNTRY_NAME_2 = COUNTRY_APPLICATION_SUPPORT.UNSUPPORTED_2.NAME;
const COUNTRY_NAME_3 = COUNTRY_APPLICATION_SUPPORT.UNSUPPORTED_3.NAME;
const COUNTRY_NAME_4 = COUNTRY_APPLICATION_SUPPORT.UNSUPPORTED_4.NAME;

context('Insurance - Buyer country page - Unsupported countries', () => {
  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
  });

  describe(COUNTRY_NAME_1, () => {
    it(`redirects to ${CANNOT_APPLY} exit page`, () => {
      cy.assertExitPageUrlBuyerCountry(COUNTRY_NAME_1, CANNOT_APPLY);
    });
  });

  describe(COUNTRY_NAME_2, () => {
    it(`redirects to ${CANNOT_APPLY} exit page`, () => {
      cy.assertExitPageUrlBuyerCountry(COUNTRY_NAME_2, CANNOT_APPLY);
    });
  });

  describe(COUNTRY_NAME_3, () => {
    it(`redirects to ${CANNOT_APPLY} exit page`, () => {
      cy.assertExitPageUrlBuyerCountry(COUNTRY_NAME_3, CANNOT_APPLY);
    });
  });

  describe(COUNTRY_NAME_4, () => {
    it(`redirects to ${CANNOT_APPLY} exit page`, () => {
      cy.assertExitPageUrlBuyerCountry(COUNTRY_NAME_4, CANNOT_APPLY);
    });
  });
});
