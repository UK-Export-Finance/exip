import { cannotApplyPage } from '../../../pages/shared';
import { companyBasedPage } from '../../../pages/quote';
import partials from '../../../partials';
import { PAGES } from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm, completeAndSubmitBuyerBodyForm } from '../../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_OBTAIN_COVER;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Exporter location page - as an exporter, I want to check if my company can get UKEF issue export insurance cover - submit `not based inside the UK`', () => {
  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();

    cy.url().should('include', ROUTES.QUOTE.EXPORTER_LOCATION);

    companyBasedPage[FIELD_IDS.VALID_EXPORTER_LOCATION].no().click();
    companyBasedPage.submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.QUOTE.EXPORTER_LOCATION);
  });

  it('renders a specific reason', () => {
    cannotApplyPage.reason().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.UNSUPPORTED_COMPANY_COUNTRY}`;

      expect(text.trim()).equal(expected);
    });
  });
});
