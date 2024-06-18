import { companiesHouseUnavailablePage } from '../../../../../../../pages/insurance/eligibility';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_UNAVAILABLE;

const {
  ELIGIBILITY: { COMPANIES_HOUSE_UNAVAILABLE, ENTER_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Companies house number page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction if I have UK Companies House Registration Number', () => {
  const url = `${COMPANIES_HOUSE_UNAVAILABLE}`;

  before(() => {
    cy.navigateToUrl(url);

    cy.assertUrl(`${baseUrl}${url}`);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render `error reason` with `try again` link', () => {
      cy.checkText(companiesHouseUnavailablePage.reason(), CONTENT_STRINGS.ERROR_REASON);
      cy.checkLink(companiesHouseUnavailablePage.tryAgainLink(), ENTER_COMPANIES_HOUSE_NUMBER, CONTENT_STRINGS.TRY_AGAIN);
    });
  });
});
