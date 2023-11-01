import { format } from 'date-fns';
import { body, submitButton, summaryList } from '../../../../../../pages/shared';
import { FIELDS, PAGES } from '../../../../../../content-strings';
import { DATE_FORMAT } from '../../../../../../constants';
import { COMPANIES_HOUSE_NUMBER } from '../../../../../../constants/examples';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { companyDetailsPage } from '../../../../../../pages/insurance/eligibility';
import mockCompanies from '../../../../../../fixtures/companies';

const mockCompany = mockCompanies[COMPANIES_HOUSE_NUMBER];

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS;

const {
  START,
  ELIGIBILITY: {
    BUYER_COUNTRY,
    COMPANY_DETAILS,
    ENTER_COMPANIES_HOUSE_NUMBER,
  },
} = INSURANCE_ROUTES;

const {
  COMPANIES_HOUSE: {
    COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_NAME, COMPANY_INCORPORATED, COMPANY_SIC, INDUSTRY_SECTOR_NAMES,
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Companies details page - I want to check if I can use online service to apply for UKEF Export Insurance Policy', () => {
  const url = `${baseUrl}${COMPANY_DETAILS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: COMPANY_DETAILS,
      backLink: ENTER_COMPANIES_HOUSE_NUMBER,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render body text', () => {
      cy.checkText(body(), CONTENT_STRINGS.BODY);
    });

    it('should render the companies house summary list', () => {
      cy.checkText(summaryList.field(COMPANY_NUMBER).key(), FIELDS[COMPANY_NUMBER].SUMMARY.TITLE);

      cy.checkText(summaryList.field(COMPANY_NUMBER).value(), COMPANIES_HOUSE_NUMBER);

      cy.checkText(summaryList.field(COMPANY_NAME).key(), FIELDS[COMPANY_NAME].SUMMARY.TITLE);

      cy.checkText(summaryList.field(COMPANY_NAME).value(), mockCompany[COMPANY_NAME]);

      cy.checkText(summaryList.field(COMPANY_ADDRESS).key(), FIELDS[COMPANY_ADDRESS].SUMMARY.TITLE);

      summaryList.field(COMPANY_ADDRESS).value().contains(mockCompany[COMPANY_ADDRESS].addressLine1);
      summaryList.field(COMPANY_ADDRESS).value().contains(mockCompany[COMPANY_ADDRESS].locality);
      summaryList.field(COMPANY_ADDRESS).value().contains(mockCompany[COMPANY_ADDRESS].region);
      summaryList.field(COMPANY_ADDRESS).value().contains(mockCompany[COMPANY_ADDRESS].postalCode);

      cy.checkText(summaryList.field(COMPANY_INCORPORATED).key(), FIELDS[COMPANY_INCORPORATED].SUMMARY.TITLE);

      const timestamp = mockCompany[COMPANY_INCORPORATED];
      const expectedDate = format(new Date(timestamp), DATE_FORMAT.DEFAULT);

      cy.checkText(summaryList.field(COMPANY_INCORPORATED).value(), expectedDate);

      cy.checkText(summaryList.field(COMPANY_SIC).key(), FIELDS[COMPANY_SIC].SUMMARY.TITLE);

      const expectedSicCodeValue = `${mockCompany[COMPANY_SIC][0]} - ${mockCompany[INDUSTRY_SECTOR_NAMES][0]}`;

      cy.checkText(summaryList.field(COMPANY_SIC).value(), expectedSicCodeValue);
    });

    it('should render `enter different companies house number` link', () => {
      cy.checkLink(
        companyDetailsPage.differentCompaniesHouseNumberLink(),
        ENTER_COMPANIES_HOUSE_NUMBER,
        CONTENT_STRINGS.DIFFERENT_COMPANIES_HOUSE_NUMBER,
      );
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      submitButton().click();
    });

    it(`should redirect to ${BUYER_COUNTRY}`, () => {
      const expected = `${baseUrl}${BUYER_COUNTRY}`;

      cy.assertUrl(expected);
    });
  });
});
