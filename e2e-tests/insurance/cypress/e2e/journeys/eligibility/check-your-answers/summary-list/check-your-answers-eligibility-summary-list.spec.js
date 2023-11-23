import checkSummaryList from '../../../../../../../commands/insurance/check-your-answers-eligibility-summary-list';
import { FIELD_IDS } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../../commands/forms';

const {
  START,
  ELIGIBILITY: {
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const {
  TOTAL_CONTRACT_VALUE,
  COVER_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  HAS_COMPANIES_HOUSE_NUMBER,
  HAS_END_BUYER,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

const { COMPANY_NAME } = FIELD_IDS.INSURANCE.COMPANIES_HOUSE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Eligibility - Summary List', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm();
    cy.completeAndSubmitTotalValueInsuredForm({});
    cy.completeCoverPeriodForm({});
    cy.completeUkGoodsAndServicesForm();
    cy.completeEndBuyerForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it(`should render a ${VALID_EXPORTER_LOCATION} summary list row`, () => {
    checkSummaryList[VALID_EXPORTER_LOCATION]();
  });

  it(`should render a ${HAS_COMPANIES_HOUSE_NUMBER} summary list row`, () => {
    checkSummaryList[HAS_COMPANIES_HOUSE_NUMBER]();
  });

  it(`should render a ${COMPANIES_HOUSE_NUMBER} summary list row`, () => {
    checkSummaryList[COMPANIES_HOUSE_NUMBER]();
  });

  it(`should render a ${COMPANY_NAME} summary list row`, () => {
    checkSummaryList[COMPANY_NAME]();
  });

  it(`should render a ${BUYER_COUNTRY} summary list row`, () => {
    checkSummaryList[BUYER_COUNTRY]();
  });

  it(`should render a ${TOTAL_CONTRACT_VALUE} summary list row`, () => {
    checkSummaryList[TOTAL_CONTRACT_VALUE]();
  });

  it(`should render a ${COVER_PERIOD} summary list row`, () => {
    checkSummaryList[COVER_PERIOD]();
  });

  it(`should render a ${HAS_MINIMUM_UK_GOODS_OR_SERVICES} summary list row`, () => {
    checkSummaryList[HAS_MINIMUM_UK_GOODS_OR_SERVICES]();
  });

  it(`should render a ${HAS_END_BUYER} summary list row`, () => {
    checkSummaryList[HAS_END_BUYER]();
  });
});
