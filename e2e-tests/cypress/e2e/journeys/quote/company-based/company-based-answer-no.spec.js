import {
  companyBasedPage,
  cannotObtainCoverPage,
} from '../../../pages/quote';
import partials from '../../../partials';
import { PAGES } from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';
import { completeAndSubmitBuyerForm } from '../../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.CANNOT_OBTAIN_COVER_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Company based page - as an exporter, I want to check if my company can get UKEF issue export insurance cover - submit `not based inside the UK`', () => {
  before(() => {
    cy.login();
    completeAndSubmitBuyerForm();

    cy.url().should('include', ROUTES.QUOTE.COMPANY_BASED);

    companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].no().click();
    companyBasedPage.submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.QUOTE.COMPANY_BASED);
  });

  it('renders a specific reason', () => {
    cannotObtainCoverPage.reason().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.UNSUPPORTED_COMPANY_COUNTRY}`;

      expect(text.trim()).equal(expected);
    });
  });
});
