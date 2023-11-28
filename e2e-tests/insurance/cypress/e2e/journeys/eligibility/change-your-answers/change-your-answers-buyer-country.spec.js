import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { summaryList, submitButton } from '../../../../../../pages/shared';
import { country } from '../../../../../../fixtures/application';
import mockCountries from '../../../../../../fixtures/countries';

const { BUYER_COUNTRY } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const oldCountry = country.NAME;
const newCountry = mockCountries[0].NAME;
const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Change your answers - Buyer country - As an exporter, I want to change my answers to the eligibility buyer country section', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeAndSubmitAllInsuranceEligibilityAnswers();

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

      cy.assertChangeAnswersPageUrl({ route: BUYER_COUNTRY_CHANGE, fieldId, isInsuranceEligibility: true });
    });
  });

  describe('form submission without changing the answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      submitButton().click();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ route: CHECK_YOUR_ANSWERS, fieldId, isInsuranceEligibility: true });
    });

    it('should render the same answer', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, oldCountry);
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      completeAndSubmitBuyerCountryForm({ countryName: newCountry });
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ route: CHECK_YOUR_ANSWERS, fieldId, isInsuranceEligibility: true });
    });

    it('should render the new answer', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, newCountry);
    });
  });
});
