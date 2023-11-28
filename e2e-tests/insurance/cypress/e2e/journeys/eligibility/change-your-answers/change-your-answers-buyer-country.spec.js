import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { summaryList, submitButton } from '../../../../../../pages/shared';
import { country } from '../../../../../../fixtures/application';

const { BUYER_COUNTRY } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const oldCountry = country.NAME;
const newCountry = 'United Arab Emirates';
const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Change your answers - Buyer country - As an exporter, I want to change my answers to the eligibility buyer country section', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitTotalValueInsuredForm({});
    cy.completeCoverPeriodForm({});
    cy.completeUkGoodsAndServicesForm();
    cy.completeEndBuyerForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  const fieldId = BUYER_COUNTRY;

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${BUYER_COUNTRY_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl(undefined, BUYER_COUNTRY_CHANGE, fieldId, undefined, true);
    });
  });

  describe('form submission without changing the answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      submitButton().click();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl(undefined, CHECK_YOUR_ANSWERS, fieldId, undefined, true);
    });

    it('should render the same answer', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, oldCountry);
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      completeAndSubmitBuyerCountryForm({ country: newCountry });
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl(undefined, CHECK_YOUR_ANSWERS, fieldId, undefined, true);
    });

    it('should render the new answer', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, newCountry);
    });
  });
});
