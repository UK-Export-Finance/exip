import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { COMPANIES_HOUSE_NUMBER_COMPANY_WITH_SPECIAL_CHARACTER_NAME } from '../../../../../../constants/examples';
import checkSummaryList from '../../../../../../commands/insurance/check-your-answers-eligibility-summary-list';

const {
  START,
  ELIGIBILITY: { CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const { COMPANIES_HOUSE_NUMBER } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const { COMPANY_NAME } = INSURANCE_FIELD_IDS.COMPANIES_HOUSE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Check your answers - company name with special characters', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  beforeEach(() => {
    cy.navigateToUrl(START);

    cy.completeAndSubmitAllInsuranceEligibilityAnswers({ companyNumber: COMPANIES_HOUSE_NUMBER_COMPANY_WITH_SPECIAL_CHARACTER_NAME });

    cy.assertUrl(url);
  });

  it(`should render a ${COMPANIES_HOUSE_NUMBER} summary list row`, () => {
    checkSummaryList[COMPANIES_HOUSE_NUMBER]({ differentCompany: true });
  });

  it(`should render a ${COMPANY_NAME} summary list row with special characters`, () => {
    checkSummaryList[COMPANY_NAME]({ differentCompany: true });
  });
});
