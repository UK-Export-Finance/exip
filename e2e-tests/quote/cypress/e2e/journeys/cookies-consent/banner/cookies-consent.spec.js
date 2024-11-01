import { cookieBanner } from '../../../../../../partials';
import { COOKIES_CONSENT, PRODUCT } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const {
  COOKIES,
  QUOTE: { BUYER_COUNTRY },
  INSURANCE: {
    ELIGIBILITY: { CHECK_IF_ELIGIBLE },
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Cookies consent - initial/default', () => {
  beforeEach(() => {
    cy.navigateToRootUrl();

    const expectedUrl = `${baseUrl}${BUYER_COUNTRY}`;

    cy.assertUrl(expectedUrl);
  });

  describe('question banner', () => {
    describe('heading', () => {
      it('should render a heading when on a Quote page/root', () => {
        cy.checkText(cookieBanner.heading(), `${COOKIES_CONSENT.HEADING_INTRO} ${PRODUCT.DESCRIPTION.QUOTE}`);
      });

      it('should render a heading when on an Insurance/application page', () => {
        cy.navigateToUrl(CHECK_IF_ELIGIBLE);

        cy.checkText(cookieBanner.heading(), `${COOKIES_CONSENT.HEADING_INTRO} ${PRODUCT.DESCRIPTION.APPLICATION}`);
      });

      it('should render a heading when on an root page', () => {
        cy.navigateToUrl(COOKIES);

        cy.checkText(cookieBanner.heading(), `${COOKIES_CONSENT.HEADING_INTRO} ${PRODUCT.DESCRIPTION.QUOTE}`);

        cy.navigateToRootUrl();
      });
    });

    it('should render copy', () => {
      cy.checkText(cookieBanner.question.copy(), COOKIES_CONSENT.QUESTION.COPY);
    });

    it('should render an `accept` button', () => {
      cy.checkText(cookieBanner.question.acceptButton(), COOKIES_CONSENT.QUESTION.ACCEPT_BUTTON);
    });

    it('should render a `reject` button', () => {
      cy.checkText(cookieBanner.question.rejectButton(), COOKIES_CONSENT.QUESTION.REJECT_BUTTON);
    });

    it('should render a link to cookies', () => {
      cy.checkLink(cookieBanner.cookiesLink(), COOKIES, COOKIES_CONSENT.QUESTION.VIEW_COOKIES);
    });

    it(`should redirect to ${COOKIES} when clicking cookies link`, () => {
      cookieBanner.cookiesLink().click();

      const expectedUrl = `${baseUrl}${COOKIES}`;

      cy.assertUrl(expectedUrl);
    });
  });

  it('should NOT render any scripts that contain `google` or `G-`', () => {
    cy.checkAnalyticsScriptsAreNotRendered();
  });

  it('should NOT have any EXIP analytics cookies', () => {
    cy.checkAnalyticsCookieDoesNotExist();
  });
});
