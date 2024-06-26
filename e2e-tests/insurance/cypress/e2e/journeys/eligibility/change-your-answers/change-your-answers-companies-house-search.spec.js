import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { summaryList } from '../../../../../../pages/shared';
import { COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE, COMPANIES_HOUSE_NUMBER } from '../../../../../../constants/examples';
import mockCompanies from '../../../../../../fixtures/companies';

const { COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER_FIELD_ID, COMPANIES_HOUSE } = INSURANCE_FIELD_IDS.ELIGIBILITY;
const { COMPANY_NAME } = COMPANIES_HOUSE;

const {
  START,
  ELIGIBILITY: { ENTER_COMPANIES_HOUSE_NUMBER_CHANGE, COMPANY_DETAILS_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const oldCompanyNumber = COMPANIES_HOUSE_NUMBER;
const oldCompanyName = mockCompanies[COMPANIES_HOUSE_NUMBER][COMPANY_NAME];
const newCompanyNumber = COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE;
const newCompanyName = mockCompanies[COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE][COMPANY_NAME];
const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Change your answers - Companies house search - As an exporter, I want to change my answers to the eligibility Companies house search section',
  () => {
    const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

    before(() => {
      cy.navigateToUrl(START);

      cy.completeAndSubmitAllInsuranceEligibilityAnswers({});

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    const fieldId = COMPANIES_HOUSE_NUMBER_FIELD_ID;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ENTER_COMPANIES_HOUSE_NUMBER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ route: ENTER_COMPANIES_HOUSE_NUMBER_CHANGE, fieldId, isInsuranceEligibility: true });
      });
    });

    describe('form submission without changing the answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.clickSubmitButton();
      });

      it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
        cy.assertChangeAnswersPageUrl({ route: COMPANY_DETAILS_CHANGE, fieldId, isInsuranceEligibility: true });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS} when company details continue button pressed`, () => {
        cy.submitAndAssertChangeAnswersPageUrl({ route: CHECK_YOUR_ANSWERS, fieldId, isInsuranceEligibility: true });
      });

      it(`should render the original answer for ${COMPANIES_HOUSE_NUMBER_FIELD_ID}`, () => {
        cy.submitAndAssertSummaryListRowValue(summaryList, fieldId, oldCompanyNumber);
      });

      it(`should render the original answer for ${COMPANY_NAME}`, () => {
        cy.submitAndAssertSummaryListRowValue(summaryList, COMPANY_NAME, oldCompanyName);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitCompaniesHouseSearchForm({ companyNumber: newCompanyNumber });
      });

      it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
        cy.assertChangeAnswersPageUrl({ route: COMPANY_DETAILS_CHANGE, fieldId, isInsuranceEligibility: true });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS} when company details continue button pressed`, () => {
        cy.submitAndAssertChangeAnswersPageUrl({ route: CHECK_YOUR_ANSWERS, fieldId, isInsuranceEligibility: true });
      });

      it(`should render the new answer for ${COMPANIES_HOUSE_NUMBER_FIELD_ID}`, () => {
        cy.submitAndAssertSummaryListRowValue(summaryList, fieldId, newCompanyNumber);
      });

      it(`should render the new answer for ${COMPANY_NAME}`, () => {
        cy.submitAndAssertSummaryListRowValue(summaryList, COMPANY_NAME, newCompanyName);
      });
    });
  },
);
