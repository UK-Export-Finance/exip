import { buyerCountryPage } from '../../pages/shared';
import { getAQuoteByEmailPage } from '../../pages/quote';
import partials from '../../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';
import { completeAndSubmitBuyerCountryForm, completeAndSubmitCompanyForm } from '../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL;
const { FIELD_IDS, ROUTES } = CONSTANTS;

const COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY = 'Egypt';

context('Get a quote via email exit page', () => {
  beforeEach(() => {
    cy.login();

    buyerCountryPage.searchInput().type(COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    buyerCountryPage.submitButton().click();
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

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    getAQuoteByEmailPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders a reason and description ', () => {
    getAQuoteByEmailPage.reason().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.REASON.BUYER_COUNTRY);
    });

    getAQuoteByEmailPage.description().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.REASON.BUYER_COUNTRY_DESCRIPTION);
    });
  });

  it('renders `action` content', () => {
    getAQuoteByEmailPage.action.text().invoke('text').then((text) => {
      const actionStrings = CONTENT_STRINGS.ACTION[0];
      const expected = `${actionStrings[0].text}${actionStrings[1].text}${actionStrings[2].text} ${actionStrings[3].text}`
      expect(text.trim()).equal(expected);
    });

    getAQuoteByEmailPage.action.link1().invoke('text').then((text) => {
      const expected = CONTENT_STRINGS.ACTION[0][0].text;
      expect(text.trim()).equal(expected);
    });

    getAQuoteByEmailPage.action.link1().should('have.attr', 'href', CONTENT_STRINGS.ACTION[0][0].href);

    getAQuoteByEmailPage.action.link2().invoke('text').then((text) => {
      const expected = CONTENT_STRINGS.ACTION[0][3].text;
      expect(text.trim()).equal(expected);
    });

    getAQuoteByEmailPage.action.link2().should('have.attr', 'href', CONTENT_STRINGS.ACTION[0][3].href);
  });
});
