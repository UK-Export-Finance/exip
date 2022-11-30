import { companyDetails, yourBusinessSummaryList } from '../../../../pages/your-business';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import partials from '../../../../partials';
import { ROUTES, FIELD_IDS, YOUR_BUSINESS_SUMMARY_LIST_FIELDS } from '../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      COMPANY_NAME,
      COMPANY_ADDRESS,
      COMPANY_NUMBER,
      COMPANY_INCORPORATED,
      COMPANY_SIC,
    },
  },
} = FIELD_IDS.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUSINESS.COMPANY_DETAILS;
const COMPANY_HOUSE_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

context('Your business - company details page', () => {
  before(() => {
    cy.visit(ROUTES.INSURANCE.YOUR_BUSINESS.COMPANY_DETAILS, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.url().should('include', ROUTES.INSURANCE.YOUR_BUSINESS.COMPANY_DETAILS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('should display an error if leaving the company house registration blank', () => {
    companyDetails.companiesHouseSearchButton().click();
    companyDetails.errorSummary().contains(COMPANY_HOUSE_ERRORS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT);
    partials.errorSummaryListItemLinks().eq(0).click();
    companyDetails.companiesHouseSearch().should('have.focus');

    companyDetails.companiesHouseSearchError().contains(COMPANY_HOUSE_ERRORS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT);
  });

  it('should display an error if company house number is too short', () => {
    companyDetails.companiesHouseSearch().clear().type('1234');
    companyDetails.companiesHouseSearchButton().click();
    companyDetails.errorSummary().contains(COMPANY_HOUSE_ERRORS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT);
    partials.errorSummaryListItemLinks().eq(0).click();
    companyDetails.companiesHouseSearch().should('have.focus');

    companyDetails.companiesHouseSearchError().contains(COMPANY_HOUSE_ERRORS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT);
  });

  it('should display an error if company house number has special characters', () => {
    companyDetails.companiesHouseSearch().clear().type('123456!');
    companyDetails.companiesHouseSearchButton().click();
    companyDetails.errorSummary().contains(COMPANY_HOUSE_ERRORS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT);
    partials.errorSummaryListItemLinks().eq(0).click();
    companyDetails.companiesHouseSearch().should('have.focus');

    companyDetails.companiesHouseSearchError().contains(COMPANY_HOUSE_ERRORS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT);
  });

  it('should display an error if company house number has a space', () => {
    companyDetails.companiesHouseSearch().clear().type('123456 ');
    companyDetails.companiesHouseSearchButton().click();
    companyDetails.errorSummary().contains(COMPANY_HOUSE_ERRORS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT);
    partials.errorSummaryListItemLinks().eq(0).click();
    companyDetails.companiesHouseSearch().should('have.focus');

    companyDetails.companiesHouseSearchError().contains(COMPANY_HOUSE_ERRORS[FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT].INCORRECT_FORMAT);
  });

  it('should display your business summary list if correctly entered', () => {
    companyDetails.companiesHouseSearch().clear().type('8989898');
    companyDetails.companiesHouseSearchButton().click();
    companyDetails.errorSummary().should('not.exist');
    companyDetails.companiesHouseSearchError().should('not.exist');

    companyDetails.yourBusinessHeading().contains(CONTENT_STRINGS.YOUR_BUSINESS_HEADING);
    yourBusinessSummaryList[COMPANY_NUMBER].key().contains(YOUR_BUSINESS_SUMMARY_LIST_FIELDS.COMPANY_NUMBER);
    yourBusinessSummaryList[COMPANY_NUMBER].value().contains('08989898');

    yourBusinessSummaryList[COMPANY_NAME].key().contains(YOUR_BUSINESS_SUMMARY_LIST_FIELDS.COMPANY_NAME);
    yourBusinessSummaryList[COMPANY_NAME].value().contains('DHG PROPERTY FINANCE LIMITED');

    yourBusinessSummaryList[COMPANY_ADDRESS].key().contains(YOUR_BUSINESS_SUMMARY_LIST_FIELDS.COMPANY_ADDRESS);
    yourBusinessSummaryList[COMPANY_ADDRESS].value().contains('Unit 3 Lewis Court');
    yourBusinessSummaryList[COMPANY_ADDRESS].value().contains('Cardiff');
    yourBusinessSummaryList[COMPANY_ADDRESS].value().contains('South Glamorgan');
    yourBusinessSummaryList[COMPANY_ADDRESS].value().contains('CF24 5HQ');

    yourBusinessSummaryList[COMPANY_INCORPORATED].key().contains(YOUR_BUSINESS_SUMMARY_LIST_FIELDS.COMPANY_INCORPORATED);
    yourBusinessSummaryList[COMPANY_INCORPORATED].value().contains('10 April 2014');

    yourBusinessSummaryList[COMPANY_SIC].key().contains(YOUR_BUSINESS_SUMMARY_LIST_FIELDS.COMPANY_SIC);
    yourBusinessSummaryList[COMPANY_SIC].value().contains('64999');
  });
});
