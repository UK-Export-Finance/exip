import { cookiesPage } from '../pages';
import partials from '../partials';
import { PAGES } from '../../../content-strings';
import { ROUTES } from '../../../constants';

const CONTENT_STRINGS = PAGES.COOKIES_PAGE;

context('Cookies page', () => {
  before(() => {
    cy.login();

    partials.footer.supportLinks.cookies().click();
    cy.url().should('include', ROUTES.COOKIES);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
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
});
