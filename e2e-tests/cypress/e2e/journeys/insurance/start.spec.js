import { heading, submitButton } from '../../pages/shared';
import { insurance } from '../../pages';
import partials from '../../partials';
import { BUTTONS, LINKS, ORGANISATION, PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.INSURANCE.START;

context('Insurance - start page', () => {
  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 70,
      'best-practices': 100,
      seo: 70,
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

    partials.backLink().should('have.attr', 'href', '#');
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('renders an intro', () => {
    insurance.startPage.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INTRO);
    });
  });
  
  describe('`you will need` list', () => {
    it('renders an intro', () => {
      insurance.startPage.list.intro().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.LIST.INTRO);
      });
    });

    it('renders list items', () => {
      insurance.startPage.list.item1().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.LIST.ITEMS[0]);
      });

      insurance.startPage.list.item2().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.LIST.ITEMS[1]);
      });

      insurance.startPage.list.item3().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.LIST.ITEMS[2]);
      });

      insurance.startPage.list.item4().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.LIST.ITEMS[3]);
      });
    });
  });

  it('renders a body text', () => {
    insurance.startPage.body1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BODY_1);
    });

    insurance.startPage.body2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BODY_2);
    });

    insurance.startPage.body3().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BODY_3);
    });

    insurance.startPage.body4().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BODY_4);
    });
  });

  it('renders a start now button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.START_NOW);
    });
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`, () => {
      submitButton().click();

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`;

      cy.url().should('eq', expected);
    });
  });
});
