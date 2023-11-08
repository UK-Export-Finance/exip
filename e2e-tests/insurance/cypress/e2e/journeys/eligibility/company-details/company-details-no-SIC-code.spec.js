import { summaryList } from '../../../../../../pages/shared';
import { DEFAULT } from '../../../../../../content-strings';
import { COMPANIES_HOUSE_NUMBER_NO_SIC_CODE } from '../../../../../../constants/examples';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const {
  START,
  ELIGIBILITY: { COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const {
  COMPANIES_HOUSE: { COMPANY_SIC },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Companies details page - company with no SIC code - I want to check if I can use online service to apply for UKEF Export Insurance Policy', () => {
  const url = `${baseUrl}${COMPANY_DETAILS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({ companyNumber: COMPANIES_HOUSE_NUMBER_NO_SIC_CODE });

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it(`should render ${COMPANY_SIC} as "${DEFAULT.EMPTY}" in summary list`, () => {
    const expectedValue = DEFAULT.EMPTY;

    cy.checkText(summaryList.field(COMPANY_SIC).value(), expectedValue);
  });
});
