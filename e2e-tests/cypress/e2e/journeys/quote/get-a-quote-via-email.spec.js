import { buyerCountryPage, heading, submitButton } from '../../pages/shared';
import { getAQuoteByEmailPage } from '../../pages/quote';
import partials from '../../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL;

const COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY = 'Egypt';

const startRoute = ROUTES.QUOTE.START;

context('Get a quote via email exit page', () => {
  beforeEach(() => {
    cy.login();

    buyerCountryPage.searchInput().type(COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('should render a header with href to quote start', () => {
    partials.header.serviceName().should('have.attr', 'href', startRoute);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    cy.checkText(partials.backLink(), LINKS.BACK);

    partials.backLink().click();

    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders a reason and description ', () => {
    cy.checkText(getAQuoteByEmailPage.reason(), CONTENT_STRINGS.REASON.BUYER_COUNTRY);

    cy.checkText(getAQuoteByEmailPage.description(), CONTENT_STRINGS.REASON.BUYER_COUNTRY_DESCRIPTION);
  });

  it('renders `action` content', () => {
    const actionStrings = CONTENT_STRINGS.ACTION[0];
    const expectedText = `${actionStrings[0].text}${actionStrings[1].text}${actionStrings[2].text} ${actionStrings[3].text}`;
    cy.checkText(getAQuoteByEmailPage.action.text(), expectedText);

    const expectedLink = CONTENT_STRINGS.ACTION[0][0].text;
    cy.checkText(getAQuoteByEmailPage.action.link1(), expectedLink);

    getAQuoteByEmailPage.action.link1().should('have.attr', 'href', CONTENT_STRINGS.ACTION[0][0].href);

    const expectedLink2 = CONTENT_STRINGS.ACTION[0][3].text;
    cy.checkText(getAQuoteByEmailPage.action.link2(), expectedLink2);

    getAQuoteByEmailPage.action.link2().should('have.attr', 'href', CONTENT_STRINGS.ACTION[0][3].href);
  });
});
