import { countryInput } from '../../../../../pages/shared';
import { getAQuoteByEmailPage } from '../../../../../pages/quote';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY = 'Egypt';

context('Get a quote via email exit page', () => {
  beforeEach(() => {
    cy.login();

    cy.keyboardInput(countryInput.field(FIELD_ID).input(), COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY);

    const results = countryInput.field(FIELD_ID).results();
    results.first().click();

    cy.clickSubmitButton();

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL,
      backLink: ROUTES.QUOTE.BUYER_COUNTRY,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      lightHouseThresholds: {
        seo: 60,
      },
    });
  });

  it('renders a reason and description ', () => {
    cy.checkText(getAQuoteByEmailPage.reason(), CONTENT_STRINGS.REASON.BUYER_COUNTRY);

    cy.checkText(getAQuoteByEmailPage.description(), CONTENT_STRINGS.REASON.BUYER_COUNTRY_DESCRIPTION);
  });

  it('renders `action` content', () => {
    const [actionStrings] = CONTENT_STRINGS.ACTION;
    const expectedText = `${actionStrings[0].text}${actionStrings[1].text}${actionStrings[2].text} ${actionStrings[3].text}`;

    cy.checkText(getAQuoteByEmailPage.action.text(), expectedText);

    cy.checkLink(
      getAQuoteByEmailPage.action.link1(),
      CONTENT_STRINGS.ACTION[0][0].href,
      CONTENT_STRINGS.ACTION[0][0].text,
    );

    cy.checkLink(
      getAQuoteByEmailPage.action.link2(),
      CONTENT_STRINGS.ACTION[0][3].href,
      CONTENT_STRINGS.ACTION[0][3].text,
    );
  });
});
