import beforeYouStartPage from '../pages/beforeYouStart';
import {
  ORGANISATION,
  LANDING_PAGE as CONTENT_STRINGS,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

context('Before you start page', () => {
  it('returns 401 when incorrect login provided', () => {
    cy.request({
      url: CONSTANTS.ROUTES.BEFORE_YOU_START,
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

      beforeYouStartPage.intro3().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.INTRO_3);
      });
    });

    it('renders `covers` content', () => {
      beforeYouStartPage.coverAgainst.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.COVERS.HEADING);
      });

      const expectedLength = CONTENT_STRINGS.COVERS.LIST.length;
      beforeYouStartPage.coverAgainst.listItems().should('have.length', expectedLength);

      beforeYouStartPage.coverAgainst.listItems().each(($element, index) => {
        expect($element.text().trim()).equal(CONTENT_STRINGS.COVERS.LIST[index].text);
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

    it('renders a `start now` button`', () => {
      beforeYouStartPage.submitButton().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.SUBMIT_BUTTON);
      });
    });

    it('clicking `start now` redirects to the `Company based` page', () => {
      beforeYouStartPage.submitButton().click();

      cy.url().should('include', CONSTANTS.ROUTES.COMPANY_BASED);
    });
  });
});
