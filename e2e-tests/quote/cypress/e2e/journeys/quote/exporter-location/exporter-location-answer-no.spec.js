import { backLink, cannotApplyPage } from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { completeAndSubmitBuyerBodyForm } from '../../../../../../commands/quote/forms';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_APPLY;

const {
  QUOTE: { EXPORTER_LOCATION, CANNOT_APPLY },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Exporter location page - as an exporter, I want to check if my company can get UKEF issue credit insurance cover - submit `not based inside the UK`',
  () => {
    const url = `${baseUrl}${EXPORTER_LOCATION}`;

    before(() => {
      cy.login();
      completeAndSubmitBuyerCountryForm({});
      completeAndSubmitBuyerBodyForm();

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);

      cy.clickNoRadioInput();
      cy.clickSubmitButton();
    });

    it('redirects to exit page', () => {
      const expectedUrl = `${baseUrl}${CANNOT_APPLY}`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      cy.checkLink(backLink(), EXPORTER_LOCATION, LINKS.BACK);
    });

    it('renders a specific reason', () => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.UNSUPPORTED_COMPANY_COUNTRY}`;
      cy.checkText(cannotApplyPage.reason(), expected);
    });
  },
);
