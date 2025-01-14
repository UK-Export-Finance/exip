import { getAQuoteByEmailPage } from '../../../../../pages/quote';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL;

const baseUrl = Cypress.config('baseUrl');

context('Get a quote via email exit page', () => {
  beforeEach(() => {
    cy.navigateToRootUrl();

    cy.completeAndSubmitBuyerCountryForm({});

    cy.clickYesRadioInput();
    cy.clickSubmitButton();

    const expectedUrl = `${baseUrl}${ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL,
      backLink: ROUTES.QUOTE.TYPE_OF_BUYER,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      assertSaveAndBackButtonDoesNotExist: true,
      lightHouseThresholds: {
        seo: 60,
      },
    });
  });

  it('renders a reason and description ', () => {
    cy.checkText(getAQuoteByEmailPage.reason(), CONTENT_STRINGS.REASON.TYPE_OF_BUYER);

    cy.checkText(getAQuoteByEmailPage.description(), CONTENT_STRINGS.REASON.TYPE_OF_BUYER_DESCRIPTION);
  });

  it('renders `action` content', () => {
    const [actionStrings] = CONTENT_STRINGS.ACTION;
    const expectedText = `${actionStrings[0].text}${actionStrings[1].text}${actionStrings[2].text} ${actionStrings[3].text}`;

    cy.checkText(getAQuoteByEmailPage.action.text(), expectedText);

    cy.checkLink(getAQuoteByEmailPage.action.link1(), CONTENT_STRINGS.ACTION[0][0].href, CONTENT_STRINGS.ACTION[0][0].text);

    cy.checkLink(getAQuoteByEmailPage.action.link2(), CONTENT_STRINGS.ACTION[0][3].href, CONTENT_STRINGS.ACTION[0][3].text);
  });
});
