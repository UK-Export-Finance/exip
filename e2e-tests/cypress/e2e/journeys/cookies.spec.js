import { cookiesPage } from '../pages';
import partials from '../partials';
import {
  BUTTONS, ERROR_MESSAGES, FIELDS, LINKS, PAGES,
} from '../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../constants';

const CONTENT_STRINGS = PAGES.COOKIES_PAGE;

context('Cookies page', () => {
  beforeEach(() => {
    cy.login();

    partials.footer.supportLinks.cookies().click();
    cy.url().should('include', ROUTES.COOKIES);

    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  // TODO: re-enable after solution for lighthouse-GHA found
  // it('passes the audits', () => {
  //   cy.lighthouse({
  //     accessibility: 100,
  //     performance: 75,
  //     'best-practices': 100,
  //     seo: 60,
  //   });
  // });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.BUYER_COUNTRY}`;

    partials.backLink().should('have.attr', 'href', expected);
  });

  it('renders a heading', () => {
    cookiesPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders a intro/description', () => {
    cookiesPage.body1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BODY_1);
    });

    cookiesPage.body2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BODY_2);
    });
  });

  describe('essential cookies', () => {
    it('renders a heading', () => {
      cookiesPage.essentialCookies.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.ESSENTIAL_COOKIES.HEADING);
      });
    });

    it('renders an intro', () => {
      cookiesPage.essentialCookies.intro().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.ESSENTIAL_COOKIES.INTRO);
      });
    });

    context('table', () => {
      context('headings', () => {
        it('renders name heading', () => {
          cookiesPage.essentialCookies.table.head.cell1().invoke('text').then((text) => {
            expect(text.trim()).equal(CONTENT_STRINGS.TABLE_HEADINGS.NAME);
          });
        });

        it('renders purpose heading', () => {
          cookiesPage.essentialCookies.table.head.cell2().invoke('text').then((text) => {
            expect(text.trim()).equal(CONTENT_STRINGS.TABLE_HEADINGS.PURPOSE);
          });
        });

        it('renders an expires heading', () => {
          cookiesPage.essentialCookies.table.head.cell3().invoke('text').then((text) => {
            expect(text.trim()).equal(CONTENT_STRINGS.TABLE_HEADINGS.EXPIRES);
          });
        });
      });

      context('row 1', () => {
        it('renders name column', () => {
          cookiesPage.essentialCookies.table.body.row1.cell1().invoke('text').then((text) => {
            expect(text.trim()).equal(CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[0].NAME);
          });
        });

        it('renders purpose column', () => {
          cookiesPage.essentialCookies.table.body.row1.cell2().invoke('text').then((text) => {
            expect(text.trim()).equal(CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[0].PURPOSE);
          });
        });

        it('renders expires column', () => {
          cookiesPage.essentialCookies.table.body.row1.cell3().invoke('text').then((text) => {
            expect(text.trim()).equal(CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[0].EXPIRES);
          });
        });
      });

      context('row 2', () => {
        it('renders name column', () => {
          cookiesPage.essentialCookies.table.body.row2.cell1().invoke('text').then((text) => {
            expect(text.trim()).equal(CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[1].NAME);
          });
        });

        it('renders purpose column', () => {
          cookiesPage.essentialCookies.table.body.row2.cell2().invoke('text').then((text) => {
            expect(text.trim()).equal(CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[1].PURPOSE);
          });
        });

        it('renders expires column', () => {
          cookiesPage.essentialCookies.table.body.row2.cell3().invoke('text').then((text) => {
            expect(text.trim()).equal(CONTENT_STRINGS.ESSENTIAL_COOKIES.ITEMS[1].EXPIRES);
          });
        });
      });
    });
  });

  describe('optional cookies', () => {
    it('renders a heading', () => {
      cookiesPage.optionalCookies.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.OPTIONAL_COOKIES.HEADING);
      });
    });

    it('renders body text', () => {
      cookiesPage.optionalCookies.body1().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.OPTIONAL_COOKIES.BODY_1);
      });

      cookiesPage.optionalCookies.body2().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.OPTIONAL_COOKIES.BODY_2);
      });

      cookiesPage.optionalCookies.body3().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.OPTIONAL_COOKIES.BODY_3);
      });
    });

    it('renders a text list of analytics information', () => {
      cookiesPage.optionalCookies.analyticsInfoList.item1().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.OPTIONAL_COOKIES.ANALYTICS_INFO_LIST[0].text);
      });

      cookiesPage.optionalCookies.analyticsInfoList.item2().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.OPTIONAL_COOKIES.ANALYTICS_INFO_LIST[1].text);
      });

      cookiesPage.optionalCookies.analyticsInfoList.item3().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.OPTIONAL_COOKIES.ANALYTICS_INFO_LIST[2].text);
      });
    });

    it('renders accept and reject radio buttons', () => {
      const acceptRadio = cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput();
      acceptRadio.should('exist');

      const acceptRadioLabel = cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptLabel();
      acceptRadioLabel.invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[FIELD_IDS.OPTIONAL_COOKIES].OPTIONS.ACCEPT.TEXT);
      });

      const rejectRadio = cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectInput();
      rejectRadio.should('exist');

      const rejectRadioLabel = cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectLabel();
      rejectRadioLabel.invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[FIELD_IDS.OPTIONAL_COOKIES].OPTIONS.REJECT.TEXT);
      });
    });

    it('renders a submit button', () => {
      const button = cookiesPage.optionalCookies.submitButton();
      button.should('exist');

      button.invoke('text').then((text) => {
        expect(text.trim()).equal(BUTTONS.SAVE_CHANGES);
      });
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        it('should render validation errors', () => {
          cookiesPage.optionalCookies.submitButton().click();

          partials.errorSummaryListItems().should('exist');
          partials.errorSummaryListItems().should('have.length', 1);

          const expectedMessage = ERROR_MESSAGES[FIELD_IDS.OPTIONAL_COOKIES];

          partials.errorSummaryListItems().first().invoke('text').then((text) => {
            expect(text.trim()).equal(expectedMessage);
          });

          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].errorMessage().invoke('text').then((text) => {
            expect(text.trim()).includes(expectedMessage);
          });
        });

        it('should focus on input when clicking summary error message', () => {
          cookiesPage.optionalCookies.submitButton().click();

          partials.errorSummaryListItemLinks().eq(0).click();
          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().should('have.focus');
        });
      });

      describe('when submitting the answer as `accept`', () => {
        beforeEach(() => {
          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().click();
          cookiesPage.optionalCookies.submitButton().click();
        });

        it(`should redirect to ${ROUTES.COOKIES}`, () => {
          cy.url().should('include', ROUTES.COOKIES);
        });

        it('should render a success message with correct content and `go back` link', () => {
          cookiesPage.successBanner.heading().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.HEADING);
          });

          cookiesPage.successBanner.body().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.BODY);
          });

          cookiesPage.successBanner.goBackLink().should('exist');
          cookiesPage.successBanner.goBackLink().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.GO_BACK);
          });

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
          cookiesPage.optionalCookies.submitButton().click();
        });

        it(`should redirect to ${ROUTES.COOKIES}`, () => {
          cy.url().should('include', ROUTES.COOKIES);
        });

        it('should render a success message with correct content and `go back` link', () => {
          cookiesPage.successBanner.heading().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.HEADING);
          });

          cookiesPage.successBanner.body().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.BODY);
          });

          cookiesPage.successBanner.goBackLink().should('exist');
          cookiesPage.successBanner.goBackLink().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.GO_BACK);
          });

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
          cy.visit(ROUTES.COOKIES, {
            auth: {
              username: Cypress.config('basicAuthKey'),
              password: Cypress.config('basicAuthSecret'),
            },
          });

          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().click();
          cookiesPage.optionalCookies.submitButton().click();
        });

        it('should render a success message with correct content and no `go back` link', () => {
          cookiesPage.successBanner.heading().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.HEADING);
          });

          cookiesPage.successBanner.body().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.BODY);
          });

          cookiesPage.successBanner.goBackLink().should('not.exist');
        });
      });

      describe('when a user navigates to the cookies page directly via URL and optional cookies are submitted as `reject`', () => {
        beforeEach(() => {
          cy.visit(ROUTES.COOKIES, {
            auth: {
              username: Cypress.config('basicAuthKey'),
              password: Cypress.config('basicAuthSecret'),
            },
          });

          cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectInput().click();
          cookiesPage.optionalCookies.submitButton().click();
        });

        it('should render a success message with correct content and no `go back` link', () => {
          cookiesPage.successBanner.heading().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.HEADING);
          });

          cookiesPage.successBanner.body().invoke('text').then((text) => {
            expect(text.trim()).includes(CONTENT_STRINGS.SUCCESS_BANNER.BODY);
          });

          cookiesPage.successBanner.goBackLink().should('not.exist');
        });
      });
    });
  });
});
