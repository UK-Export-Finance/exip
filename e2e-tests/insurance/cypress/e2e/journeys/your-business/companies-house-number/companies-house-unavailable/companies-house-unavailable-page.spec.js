import { companiesHouseUnavailablePage } from '../../../../../../../pages/your-business';
import { PAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';

const { ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_UNAVAILABLE;

const { COMPANIES_HOUSE_NUMBER, COMPANIES_HOUSE_UNAVAILABLE } = ROUTES.INSURANCE.EXPORTER_BUSINESS;

context("Insurance - Your business - Companies house unavailable page - I want to enter my business's Companies House Registration Number (CRN) but companies house API is down", () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;
  let companiesHouseNumberUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`;

      allSectionsUrl = `${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      companiesHouseNumberUrl = `${ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`,
      backLink: null,
      assertBackLink: false,
      assertSubmitButton: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should display the correct text on the page', () => {
      cy.checkText(companiesHouseUnavailablePage.reason(), CONTENT_STRINGS.ERROR_REASON);
      cy.checkText(companiesHouseUnavailablePage.tryAgain(), `${CONTENT_STRINGS.TRY_AGAIN_PREFIX} ${CONTENT_STRINGS.TRY_AGAIN}`);
      cy.checkText(companiesHouseUnavailablePage.continue(), `${CONTENT_STRINGS.CONTINUE_PREFIX} ${CONTENT_STRINGS.CONTINUE_LINK} ${CONTENT_STRINGS.CONTINUE_SUFFIX}`);
      cy.checkText(companiesHouseUnavailablePage.information(), CONTENT_STRINGS.INFORMATION);
    });

    it('should have the correct hrefs for the links on the page', () => {
      cy.checkLink(companiesHouseUnavailablePage.tryAgainLink(), companiesHouseNumberUrl, CONTENT_STRINGS.TRY_AGAIN);
      cy.checkLink(companiesHouseUnavailablePage.continueLink(), allSectionsUrl, CONTENT_STRINGS.CONTINUE_LINK);
    });
  });
});
