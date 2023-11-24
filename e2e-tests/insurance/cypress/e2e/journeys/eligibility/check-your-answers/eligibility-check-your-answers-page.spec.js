import { submitButton, warning, body } from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import checkSummaryList from '../../../../../../commands/insurance/check-your-answers-eligibility-summary-list';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS;

const {
  START,
  ELIGIBILITY: {
    END_BUYER, CHECK_YOUR_ANSWERS, ELIGIBLE_TO_APPLY_ONLINE,
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
} = INSURANCE_FIELD_IDS.ELIGIBILITY;

const { COMPANY_NAME } = INSURANCE_FIELD_IDS.COMPANIES_HOUSE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - as an exporter, I want to confirm my selection for the eligibility section of my export insurance application, So that UKEF can accurately process my credit insurance application.', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  beforeEach(() => {
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

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CHECK_YOUR_ANSWERS,
      backLink: END_BUYER,
      assertAuthenticatedHeader: false,
      submitButtonCopy: BUTTONS.CONFIRM_AND_CONTINUE,
    });
  });

  it('renders a warning text', () => {
    warning().contains(CONTENT_STRINGS.WARNING);
  });

  it('renders a cannot change responses text', () => {
    cy.checkText(body(), CONTENT_STRINGS.CANNOT_CHANGE);
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

  describe('form submission', () => {
    it(`should redirect to ${ELIGIBLE_TO_APPLY_ONLINE}`, () => {
      submitButton().click();

      const expectedUrl = `${baseUrl}${ELIGIBLE_TO_APPLY_ONLINE}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
