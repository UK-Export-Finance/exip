import {
  buyerCountryPage,
  cannotObtainCoverPage,
} from '../../../pages';
import { PAGES } from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_OBTAIN_COVER_PAGE;
const { ROUTES } = CONSTANTS;

const UNSUPPORTED_COUNTRY_NAME = 'Angola';

context(`Which country is your buyer based page - user testing scenarios - submit ${UNSUPPORTED_COUNTRY_NAME}`, () => {
  before(() => {
    cy.visit(ROUTES.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.BUYER_COUNTRY);

    buyerCountryPage.searchInput().type('Angola');

    const results = buyerCountryPage.results();
    results.first().click();

    buyerCountryPage.submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.CANNOT_OBTAIN_COVER);
  });

  it('renders a specific reason', () => {
    cannotObtainCoverPage.reason().invoke('text').then((text) => {
      const { REASON } = CONTENT_STRINGS;
      const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${UNSUPPORTED_COUNTRY_NAME}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

      expect(text.trim()).equal(expected);
    });
  });
});
