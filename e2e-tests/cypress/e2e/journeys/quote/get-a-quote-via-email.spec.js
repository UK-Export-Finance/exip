import { buyerCountryPage, submitButton } from '../../pages/shared';
import { getAQuoteByEmailPage } from '../../pages/quote';
import partials from '../../partials';
import { PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL;

const COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY = 'Egypt';

const startRoute = ROUTES.QUOTE.START;

context('Get a quote via email exit page', () => {
  beforeEach(() => {
    cy.login();

    cy.keyboardInput(buyerCountryPage.searchInput(), COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL}`;

    cy.url().should('eq', expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL,
      backLink: ROUTES.QUOTE.BUYER_COUNTRY,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
      lightHouseThresholds: {
        seo: 60,
      },
    });
  });

  it('should render a header with href to quote start', () => {
    partials.header.serviceName().should('have.attr', 'href', startRoute);
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
