import beforeYouStartPage from '../pages/beforeYouStart';
import { ORGANISATION, PAGES } from '../../../content-strings';
import CONSTANTS from '../../../constants';

const CONTENT_STRINGS = PAGES.BEFORE_YOU_START;
const { ROUTES } = CONSTANTS;

context('Before you start page', () => {
  it('returns 401 when incorrect login provided', () => {
    cy.request({
      url: ROUTES.BEFORE_YOU_START,
      failOnStatusCode: false,
      auth: {
        username: 'invalid',
        password: 'invalid',
      },
    }).its('status').should('equal', 401);
  });

  describe('with valid login', () => {
    beforeEach(() => {
      cy.login();
    });

    it('passes the audits', () => {
      cy.lighthouse({
        accessibility: 100,
        performance: 80,
        'best-practices': 100,
        seo: 75,
      });
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

    it('renders `if you need cover for more than...` copy', () => {
      beforeYouStartPage.moreThanMaxPeriod().invoke('text').then((text) => {
        const expected = `${CONTENT_STRINGS.MORE_THAN_MAX_PERIOD.INTRO} ${CONTENT_STRINGS.MORE_THAN_MAX_PERIOD.LINK.TEXT} ${CONTENT_STRINGS.MORE_THAN_MAX_PERIOD.OUTRO}`;

        expect(text.trim()).equal(expected);
      });
    });

    it('renders `if you need cover for more than...` link', () => {
      beforeYouStartPage.moreThanMaxPeriodLink().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.MORE_THAN_MAX_PERIOD.LINK.TEXT);
      });

      const expectedHref = CONTENT_STRINGS.MORE_THAN_MAX_PERIOD.LINK.HREF;
      beforeYouStartPage.moreThanMaxPeriodLink().should('have.attr', 'href', expectedHref);
    });

    it('renders a `start now` button`', () => {
      beforeYouStartPage.submitButton().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.SUBMIT_BUTTON);
      });
    });

    it('clicking `start now` redirects to the `Buyer based` page', () => {
      beforeYouStartPage.submitButton().click();

      cy.url().should('include', ROUTES.BUYER_BASED);
    });
  });
});
