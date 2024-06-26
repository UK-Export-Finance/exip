import { body } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { companyDetailsPage } from '../../../../../../pages/insurance/eligibility';
import assertCompaniesHouseSummaryList from '../../../../../../commands/insurance/assert-companies-house-summary-list';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY, COMPANY_DETAILS, ENTER_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

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

    describe('companies house summary list', () => {
      it('should render `company number` key and value', () => {
        assertCompaniesHouseSummaryList.number();
      });

      it('should render `company name` key and value', () => {
        assertCompaniesHouseSummaryList.name({});
      });

      it('should render `company address` key and value', () => {
        assertCompaniesHouseSummaryList.address();
      });

      it('should render `company incorporated` key and value', () => {
        assertCompaniesHouseSummaryList.incorporated();
      });

      it('should render `company SIC codes` key and value', () => {
        assertCompaniesHouseSummaryList.sicCodes();
      });
    });

    it('should render `enter different companies house number` link', () => {
      cy.checkLink(companyDetailsPage.differentCompaniesHouseNumberLink(), ENTER_COMPANIES_HOUSE_NUMBER, CONTENT_STRINGS.DIFFERENT_COMPANIES_HOUSE_NUMBER);
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSubmitButton();
    });

    it(`should redirect to ${BUYER_COUNTRY}`, () => {
      const expected = `${baseUrl}${BUYER_COUNTRY}`;

      cy.assertUrl(expected);
    });
  });
});
