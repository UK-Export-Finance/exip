import { cookiesPage, cookiesSavedPage } from '../../../../pages';
import partials from '../../../../partials';
import {
  BUTTONS,
  ERROR_MESSAGES,
  FIELDS,
  PAGES,
} from '../../../../content-strings';
import { FIELD_IDS, ROUTES, COOKIE } from '../../../../constants';

const CONTENT_STRINGS = PAGES.COOKIES_PAGE;

const {
  INSURANCE: {
    COOKIES,
    COOKIES_SAVED,
    ACCOUNT: {
      SIGN_IN: { ROOT: SIGN_IN_ROOT },
    },
    ELIGIBILITY: { CHECK_IF_ELIGIBLE },
  },
} = ROUTES;

const { OPTIONAL_COOKIES: FIELD_ID } = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const url = COOKIES;

const checkIfEligibleUrl = `${baseUrl}${CHECK_IF_ELIGIBLE}`;

context('Cookies page - Insurance', () => {
  beforeEach(() => {
    cy.navigateToCheckIfEligibleUrl();

    partials.footer.supportLinks.cookies().click();

    cy.assertUrl(`${baseUrl}${url}`);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.clearCookies();

    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: COOKIES,
      backLink: CHECK_IF_ELIGIBLE,
      submitButtonCopy: BUTTONS.SAVE_CHANGES,
      assertAuthenticatedHeader: false,
      isInsurancePage: true,
    });
  });

  it('renders a intro/description', () => {
    cy.checkText(cookiesPage.body1(), CONTENT_STRINGS.BODY_1);

    cy.checkText(cookiesPage.body2(), CONTENT_STRINGS.BODY_2);
  });

  describe('essential cookies', () => {
    beforeEach(() => {
      cy.saveSession();
    });

    it('renders a heading', () => {
      cy.checkText(cookiesPage.essentialCookies.heading(), CONTENT_STRINGS.ESSENTIAL_COOKIES.HEADING);
    });

    it('renders an intro', () => {
      cy.checkText(cookiesPage.essentialCookies.intro(), CONTENT_STRINGS.ESSENTIAL_COOKIES.INTRO);
    });

    describe('table', () => {
      describe('headings', () => {
        beforeEach(() => {
          cy.saveSession();
        });

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

      describe('row 1', () => {
        beforeEach(() => {
          cy.saveSession();
        });

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

      describe('row 2', () => {
        beforeEach(() => {
          cy.saveSession();
        });

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
    beforeEach(() => {
      cy.saveSession();
    });

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
      const acceptRadio = cookiesPage[FIELD_ID].accept.input();
      acceptRadio.should('exist');

      const acceptRadioLabel = cookiesPage[FIELD_ID].accept.label();
      cy.checkText(acceptRadioLabel, FIELDS[FIELD_ID].OPTIONS.ACCEPT.TEXT);

      const rejectRadio = cookiesPage[FIELD_ID].reject.input();
      rejectRadio.should('exist');

      const rejectRadioLabel = cookiesPage[FIELD_ID].reject.label();
      cy.checkText(rejectRadioLabel, FIELDS[FIELD_ID].OPTIONS.REJECT.TEXT);
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        beforeEach(() => {
          cy.clearCookies();

          cy.navigateToUrl(url);

          cy.clickSubmitButton();
        });

        it('should render validation errors', () => {
          const expectedErrorsCount = 1;
          const expectedErrorMessage = ERROR_MESSAGES[FIELD_ID];

          cy.submitAndAssertRadioErrors({
            field: cookiesPage[FIELD_ID].accept,
            expectedErrorsCount,
            expectedErrorMessage,
          });
        });
      });

      describe('when submitting the answer as `accept`', () => {
        beforeEach(() => {
          cy.navigateToCheckIfEligibleUrl();
          partials.footer.supportLinks.cookies().click();

          cy.saveSession();

          cookiesPage[FIELD_ID].accept.label().click();
          cy.clickSubmitButton();
        });

        it(`should redirect to ${COOKIES_SAVED}`, () => {
          cy.assertUrl(`${baseUrl}${COOKIES_SAVED}`);
        });

        it(`should redirect to ${COOKIES_SAVED}`, () => {
          cy.assertUrl(`${baseUrl}${COOKIES_SAVED}`);
        });

        it('should render a link button with the URL that was visited prior to submitting an answer in the cookies page', () => {
          const expectedUrl = checkIfEligibleUrl;

          cy.checkLink(cookiesSavedPage.returnToServiceLinkButton(), expectedUrl, BUTTONS.RETURN_TO_SERVICE);
        });

        it('should NOT render the cookie consent banner', () => {
          cy.checkCookiesConsentBannerDoesNotExist();
        });

        it('should render a google analytics and google tag manager scripts', () => {
          cy.checkAnalyticsScriptsAreRendered();
        });

        it('should add an EXIP analytics consent cookie with a value of true', () => {
          cy.checkAnalyticsCookieIsTrue();
        });
      });

      describe('when submitting the answer as `reject`', () => {
        beforeEach(() => {
          cy.saveSession();

          cookiesPage[FIELD_ID].reject.label().click();
          cy.clickSubmitButton();
        });

        it(`should redirect to ${COOKIES_SAVED}`, () => {
          cy.assertUrl(`${baseUrl}${COOKIES_SAVED}`);
        });

        it(`should redirect to ${COOKIES_SAVED}`, () => {
          cy.assertUrl(`${baseUrl}${COOKIES_SAVED}`);
        });

        it('should render a link button with the URL that was visited prior to submitting an answer in the cookies page', () => {
          const expectedUrl = checkIfEligibleUrl;

          cy.checkLink(cookiesSavedPage.returnToServiceLinkButton(), expectedUrl, BUTTONS.RETURN_TO_SERVICE);
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
          cy.clearCookie(COOKIE.NAME.SESSION);

          cy.navigateToUrl(url);

          cookiesPage[FIELD_ID].accept.label().click();
          cy.clickSubmitButton();
        });

        it(`should render a link button with the URL to ${SIGN_IN_ROOT}`, () => {
          const expectedUrl = SIGN_IN_ROOT;

          cy.checkLink(cookiesSavedPage.returnToServiceLinkButton(), expectedUrl, BUTTONS.RETURN_TO_SERVICE);
        });
      });

      describe('when a user navigates to the cookies page directly via URL and optional cookies are submitted as `reject`', () => {
        beforeEach(() => {
          cy.clearCookie(COOKIE.NAME.SESSION);

          cy.navigateToUrl(url);

          cookiesPage[FIELD_ID].reject.label().click();
          cy.clickSubmitButton();
        });

        it(`should render a link button with the URL to ${SIGN_IN_ROOT}`, () => {
          const expectedUrl = SIGN_IN_ROOT;

          cy.checkLink(cookiesSavedPage.returnToServiceLinkButton(), expectedUrl, BUTTONS.RETURN_TO_SERVICE);
        });
      });
    });
  });
});
