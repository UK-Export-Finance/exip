import { buyerCountryPage, getAQuoteByEmailPage } from '../../pages/quote';
import partials from '../../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';
import { completeAndSubmitBuyerForm, completeAndSubmitCompanyForm } from '../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.GET_A_QUOTE_BY_EMAIL_PAGE;
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
      performance: 80,
      'best-practices': 100,
      seo: 60,
    });
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

  it('renders a reason/body content ', () => {
    getAQuoteByEmailPage.body1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.REASON.BODY_1);
    });

    getAQuoteByEmailPage.body2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.REASON.BODY_2);
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
