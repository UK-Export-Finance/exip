import { companyDetails } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUSINESS.COMPANY_DETAILS;

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

  it('should display the correct components on the page', () => {
    partials.backLink().should('exist');
    companyDetails.headingCaption().contains(CONTENT_STRINGS.PAGE_GREY_HEADING);
    companyDetails.heading().contains(CONTENT_STRINGS.PAGE_TITLE);
    companyDetails.companiesHouseSearch().should('exist');
    companyDetails.companiesHouseSearchLabel().contains(CONTENT_STRINGS.CRN_HEADING);
    companyDetails.companiesHouseSearchHint().contains(CONTENT_STRINGS.CRN_HINT);
    companyDetails.companiesHouseSearchButton().contains(CONTENT_STRINGS.SEARCH);
    companyDetails.yourBusinessSummaryList().should('not.exist');
    companyDetails.companiesHouseNoNumber().contains(CONTENT_STRINGS.NO_COMPANY_HOUSE_NUMER);
    companyDetails.tradingName().contains(CONTENT_STRINGS.TRADING_NAME);
    companyDetails.tradingNameYesRadio().should('exist');
    companyDetails.tradingNameNoRadio().should('exist');

    companyDetails.tradingAddress().contains(CONTENT_STRINGS.TRADING_ADDRESS);
    companyDetails.tradingAddressYesRadio().should('exist');
    companyDetails.tradingAddressNoRadio().should('exist');

    companyDetails.companyWebsiteHeading().contains(CONTENT_STRINGS.WEBSITE);
    companyDetails.companyWebsite().should('exist');
  });
});
