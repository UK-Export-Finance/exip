import {
  beforeYouStartPage,
  guidancePage,
} from '../pages';
import partials from '../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

const CONTENT_STRINGS = PAGES.BEFORE_YOU_START;
const { ROUTES } = CONSTANTS;

context('Before you start page', () => {
  before(() => {
    cy.visit(ROUTES.GUIDANCE, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    guidancePage.eligibility.getAQuote().click();
    cy.url().should('include', ROUTES.BEFORE_YOU_START);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 75,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    const expected = `${Cypress.config('baseUrl')}${ROUTES.GUIDANCE}`;

    partials.backLink().should('have.attr', 'href', expected);
  });

  it('renders a page title, heading and intro text', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    beforeYouStartPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });

    beforeYouStartPage.intro1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INTRO_1);
    });

    beforeYouStartPage.intro2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INTRO_2);
    });
  });

  it('renders `use this service to` content', () => {
    beforeYouStartPage.useServiceTo.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.USE_SERVICE_TO.INTRO);
    });

    const expectedLength = CONTENT_STRINGS.USE_SERVICE_TO.LIST.length;
    beforeYouStartPage.useServiceTo.listItems().should('have.length', expectedLength);

    beforeYouStartPage.useServiceTo.listItems().each(($element, index) => {
      expect($element.text().trim()).equal(CONTENT_STRINGS.USE_SERVICE_TO.LIST[index].text);
    });
  });

  it('renders `you can also` content', () => {
    beforeYouStartPage.canAlso.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.CAN_ALSO.INTRO);
    });

    const expectedLength = CONTENT_STRINGS.CAN_ALSO.LIST.length;
    beforeYouStartPage.canAlso.listItems().should('have.length', expectedLength);

    beforeYouStartPage.canAlso.listItems().each(($element, index) => {
      expect($element.text().trim()).equal(CONTENT_STRINGS.CAN_ALSO.LIST[index].text);
    });
  });

  it('renders `you will need` copy', () => {
    beforeYouStartPage.youWillNeed().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.YOU_WILL_NEED);
    });
  });

  it('renders `completion time` copy', () => {
    beforeYouStartPage.completionTime().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.COMPLETION_TIME);
    });
  });

  it('renders `if you need cover for more than...` content', () => {
    beforeYouStartPage.moreThanMaxPeriod().invoke('text').then((text) => {
      expect(text.trim()).includes(CONTENT_STRINGS.MORE_THAN_MAX_PERIOD[0][0].text);
      expect(text.trim()).includes(CONTENT_STRINGS.MORE_THAN_MAX_PERIOD[0][1].text);
      expect(text.trim()).includes(CONTENT_STRINGS.MORE_THAN_MAX_PERIOD[0][2].text);
      expect(text.trim()).includes(CONTENT_STRINGS.MORE_THAN_MAX_PERIOD[0][3].text);
    });

    const expectedHref = CONTENT_STRINGS.MORE_THAN_MAX_PERIOD[0][1].href;
    beforeYouStartPage.moreThanMaxPeriodLink().should('have.attr', 'href', expectedHref);
  });

  it('renders a `start now` button`', () => {
    beforeYouStartPage.submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.SUBMIT_BUTTON);
    });
  });

  it('clicking `start now` redirects to the `Buyer based` page', () => {
    beforeYouStartPage.submitButton().click();

    cy.url().should('include', ROUTES.BUYER_COUNTRY);
  });
});
