import { pageNotFoundPage } from '../pages';
import { PAGE_NOT_FOUND_PAGE } from '../../../content-strings';

context('Page not found', () => {
  before(() => {
    cy.visit('/test', {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('renders a heading', () => {
    pageNotFoundPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(PAGE_NOT_FOUND_PAGE.HEADING);
    });
  });

  it('renders body text', () => {
    pageNotFoundPage.body1().invoke('text').then((text) => {
      expect(text.trim()).equal(PAGE_NOT_FOUND_PAGE.BODY_1);
    });

    pageNotFoundPage.body2().invoke('text').then((text) => {
      expect(text.trim()).equal(PAGE_NOT_FOUND_PAGE.BODY_2);
    });
  });
});
