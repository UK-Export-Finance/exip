import { inlineErrorMessage, submitButton } from '../pages/shared';
import { cookiesPage } from '../pages';
import partials from '../partials';
import {
  BUTTONS, ERROR_MESSAGES, FIELDS, PAGES,
} from '../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../constants';

const CONTENT_STRINGS = PAGES.COOKIES_PAGE;

context('Cookies page', () => {
  beforeEach(() => {
    cy.login();

    partials.footer.supportLinks.cookies().click();
    cy.url().should('include', ROUTES.COOKIES);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.COOKIES,
      backLink: ROUTES.QUOTE.BUYER_COUNTRY,
      submitButtonCopy: BUTTONS.SAVE_CHANGES,
    });
  });

  it('renders a intro/description', () => {
    cy.checkText(cookiesPage.body1(), CONTENT_STRINGS.BODY_1);

    cy.checkText(cookiesPage.body2(), CONTENT_STRINGS.BODY_2);
  });

  describe('essential cookies', () => {
    it('renders a heading', () => {
      cy.checkText(cookiesPage.essentialCookies.heading(), CONTENT_STRINGS.ESSENTIAL_COOKIES.HEADING);
    });

    it('renders an intro', () => {
      cy.checkText(cookiesPage.essentialCookies.intro(), CONTENT_STRINGS.ESSENTIAL_COOKIES.INTRO);
    });

    context('table', () => {
      context('headings', () => {
        it('renders name heading', () => {
          cy.checkText(cookiesPage.essentialCookies.table.head.cell1(), CONTENT_STRINGS.TABLE_HEADINGS.NAME);
        });

        it('renders purpose heading', () => {
          cy.checkText(cookiesPage.essentialCookies.table.head.cell2(), CONTENT_STRINGS.TABLE_HEADINGS.PURPOSE);
        });

        it('renders an expires heading', () => {
          cy.checkText(cookiesPage.essentialCookies.table.head.cell3(), CONTENT_STRINGS.TABLE_HEADINGS.EXPIRES);
        });
      });

      context('row 1', () => {
        it('renders name column', () => {
          cy.checkText(cookiesPage.essentialCookies.table.body.row1.cell1(), CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[0].NAME);
        });

        it('renders purpose column', () => {
          cy.checkText(cookiesPage.essentialCookies.table.body.row1.cell2(), CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[0].PURPOSE);
        });

        it('renders expires column', () => {
          cy.checkText(cookiesPage.essentialCookies.table.body.row1.cell3(), CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[0].EXPIRES);
        });
      });

      context('row 2', () => {
        it('renders name column', () => {
          cy.checkText(cookiesPage.essentialCookies.table.body.row2.cell1(), CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[1].NAME);
        });

        it('renders purpose column', () => {
          cy.checkText(cookiesPage.essentialCookies.table.body.row2.cell2(), CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[1].PURPOSE);
        });

        it('renders expires column', () => {
          cy.checkText(cookiesPage.essentialCookies.table.body.row2.cell3(), CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[1].EXPIRES);
        });
      });
    });
  });

  describe('optional cookies', () => {
    it('renders a heading', () => {
      cy.checkText(cookiesPage.optionalCookies.heading(), CONTENT_STRINGS.OPTIONAL_COOKIES.HEADING);
    });

    it('renders body text', () => {
      cy.checkText(cookiesPage.optionalCookies.body1(), CONTENT_STRINGS.OPTIONAL_COOKIES.BODY_1);

      cy.checkText(cookiesPage.optionalCookies.body2(), CONTENT_STRINGS.OPTIONAL_COOKIES.BODY_2);

      cy.checkText(cookiesPage.optionalCookies.body3(), CONTENT_STRINGS.OPTIONAL_COOKIES.BODY_3);
    });

    it('renders a text list of analytics information', () => {
      cy.checkText(cookiesPage.optionalCookies.analyticsInfoList.item1(), CONTENT_STRINGS.OPTIONAL_COOKIES.ANALYTICS_INFO_LIST[0].text);

      cy.checkText(cookiesPage.optionalCookies.analyticsInfoList.item2(), CONTENT_STRINGS.OPTIONAL_COOKIES.ANALYTICS_INFO_LIST[1].text);

      cy.checkText(cookiesPage.optionalCookies.analyticsInfoList.item3(), CONTENT_STRINGS.OPTIONAL_COOKIES.ANALYTICS_INFO_LIST[2].text);
    });

    it('renders accept and reject radio buttons', () => {
      const acceptRadio = cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput();
      acceptRadio.should('exist');

      const acceptRadioLabel = cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptLabel();
      cy.checkText(acceptRadioLabel, FIELDS[FIELD_IDS.OPTIONAL_COOKIES].OPTIONS.ACCEPT.TEXT);

      const rejectRadio = cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectInput();
      rejectRadio.should('exist');

      const rejectRadioLabel = cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectLabel();
      cy.checkText(rejectRadioLabel, FIELDS[FIELD_IDS.OPTIONAL_COOKIES].OPTIONS.REJECT.TEXT);
    });

    it('renders a submit button', () => {
      submitButton().should('exist');

      cy.checkText(submitButton(), BUTTONS.SAVE_CHANGES);
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        it('should render validation errors', () => {
          submitButton().click();

          partials.errorSummaryListItems().should('exist');
          partials.errorSummaryListItems().should('have.length', 1);

          const expectedMessage = ERROR_MESSAGES[FIELD_IDS.OPTIONAL_COOKIES];

          cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

          cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
        });

        it('should focus on input when clicking summary error message', () => {
          submitButton().click();

          partials.errorSummaryListItemLinks().eq(0).click();
          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().should('have.focus');
        });
      });

      describe('when submitting the answer as `accept`', () => {
        beforeEach(() => {
          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().click();
          submitButton().click();
        });

        it(`should redirect to ${ROUTES.COOKIES}`, () => {
          cy.url().should('include', ROUTES.COOKIES);
        });

        it('should render a success message with correct content and `go back` link', () => {
          cy.checkText(cookiesPage.successBanner.heading(), CONTENT_STRINGS.SUCCESS_BANNER.HEADING);

          cy.checkText(cookiesPage.successBanner.body(), CONTENT_STRINGS.SUCCESS_BANNER.BODY);

          cookiesPage.successBanner.goBackLink().should('exist');
          cy.checkText(cookiesPage.successBanner.goBackLink(), CONTENT_STRINGS.SUCCESS_BANNER.GO_BACK);

          const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.BUYER_COUNTRY}`;
          cookiesPage.successBanner.goBackLink().should('have.attr', 'href', expectedUrl);
        });

        it('should NOT render the cookie consent banner', () => {
          cy.checkCookiesConsentBannerDoesNotExist();
        });

        it('should render a google tag manager script and data layer script', () => {
          cy.checkAnalyticsScriptsAreRendered();
        });

        it('should add an EXIP analytics consent cookie with a value of true', () => {
          cy.checkAnalyticsCookieIsTrue();
        });
      });

      describe('when submitting the answer as `reject`', () => {
        beforeEach(() => {
          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectInput().click();
          submitButton().click();
        });

        it(`should redirect to ${ROUTES.COOKIES}`, () => {
          cy.url().should('include', ROUTES.COOKIES);
        });

        it('should render a success message with correct content and `go back` link', () => {
          cy.checkText(cookiesPage.successBanner.heading(), CONTENT_STRINGS.SUCCESS_BANNER.HEADING);

          cy.checkText(cookiesPage.successBanner.body(), CONTENT_STRINGS.SUCCESS_BANNER.BODY);

          cookiesPage.successBanner.goBackLink().should('exist');
          cy.checkText(cookiesPage.successBanner.goBackLink(), CONTENT_STRINGS.SUCCESS_BANNER.GO_BACK);

          const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.BUYER_COUNTRY}`;
          cookiesPage.successBanner.goBackLink().should('have.attr', 'href', expectedUrl);
        });

        it('should NOT render the cookie consent banner', () => {
          cy.checkCookiesConsentBannerDoesNotExist();
        });

        it('should NOT render a google tag manager script and data layer script', () => {
          cy.checkAnalyticsScriptsAreNotRendered();
        });

        it('should add an EXIP analytics consent cookie with a value of false', () => {
          cy.checkAnalyticsCookieIsFalse();
        });
      });

      describe('when a user navigates to the cookies page directly via URL and optional cookies are submitted as `accept`', () => {
        beforeEach(() => {
          cy.navigateToUrl(ROUTES.COOKIES);

          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().click();
          submitButton().click();
        });

        it('should render a success message with correct content and no `go back` link', () => {
          cy.checkText(cookiesPage.successBanner.heading(), CONTENT_STRINGS.SUCCESS_BANNER.HEADING);

          cy.checkText(cookiesPage.successBanner.body(), CONTENT_STRINGS.SUCCESS_BANNER.BODY);

          cookiesPage.successBanner.goBackLink().should('not.exist');
        });
      });

      describe('when a user navigates to the cookies page directly via URL and optional cookies are submitted as `reject`', () => {
        beforeEach(() => {
          cy.navigateToUrl(ROUTES.COOKIES);

          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectInput().click();
          submitButton().click();
        });

        it('should render a success message with correct content and no `go back` link', () => {
          cy.checkText(cookiesPage.successBanner.heading(), CONTENT_STRINGS.SUCCESS_BANNER.HEADING);

          cy.checkText(cookiesPage.successBanner.body(), CONTENT_STRINGS.SUCCESS_BANNER.BODY);

          cookiesPage.successBanner.goBackLink().should('not.exist');
        });
      });
    });
  });
});
