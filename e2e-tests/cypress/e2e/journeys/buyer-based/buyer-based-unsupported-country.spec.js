import {
  buyerBasedPage,
  cannotObtainCoverPage,
} from '../../pages';
import partials from '../../partials';
import { PAGES } from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_OBTAIN_COVER_PAGE;
const { ROUTES } = CONSTANTS;

const UNSUPPORTED_COUNTRY_NAME = 'Netherlands Antilles';

context('Which country is your buyer based page', () => {
  before(() => {
    cy.visit(ROUTES.BUYER_BASED, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.BUYER_BASED);

    buyerBasedPage.searchInput().type(UNSUPPORTED_COUNTRY_NAME);

    const results = buyerBasedPage.results();
    results.first().click();

    buyerBasedPage.submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.CANNOT_OBTAIN_COVER);
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.BUYER_BASED);
  });

  it('renders a specific reason', () => {
    cannotObtainCoverPage.reason().invoke('text').then((text) => {
      const { REASON } = CONTENT_STRINGS;
      const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${UNSUPPORTED_COUNTRY_NAME}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

      expect(text.trim()).equal(expected);
    });
  });
});
