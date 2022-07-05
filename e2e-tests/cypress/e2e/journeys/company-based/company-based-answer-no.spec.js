import {
  companyBasedPage,
  cannotObtainCoverPage,
} from '../../pages';
import partials from '../../partials';
import { PAGES } from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_OBTAIN_COVER_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Answering `no` to Company based inside the UK, Channel Islands and Isle of Man', () => {
  before(() => {
    cy.visit(ROUTES.COMPANY_BASED, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.url().should('include', ROUTES.COMPANY_BASED);

    companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].no().click();
    companyBasedPage.submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.CANNOT_OBTAIN_COVER);
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.COMPANY_BASED);
  });

  it('renders a specific reason', () => {
    cannotObtainCoverPage.reason().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.UNSUPPORTED_COMPANY_COUNTRY}`;

      expect(text.trim()).equal(expected);
    });
  });
});
