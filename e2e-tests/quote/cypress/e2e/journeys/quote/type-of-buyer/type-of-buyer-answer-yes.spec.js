import { backLink } from '../../../../../../pages/shared';
import { getAQuoteByEmailPage } from '../../../../../../pages/quote';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const {
  QUOTE: { TYPE_OF_BUYER, GET_A_QUOTE_BY_EMAIL },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Type of buyer page - as an exporter, I want to check if I can get an EXIP online quote for my buyers country - submit `buyer is a government or public sector body`',
  () => {
    const url = `${baseUrl}${TYPE_OF_BUYER}`;

    before(() => {
      cy.navigateToRootUrl();
      cy.completeAndSubmitBuyerCountryForm({});

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);

      cy.clickYesRadioInput();
      cy.clickSubmitButton();
    });

    it('redirects to exit page', () => {
      const expectedUrl = `${baseUrl}${GET_A_QUOTE_BY_EMAIL}`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      cy.checkLink(backLink(), TYPE_OF_BUYER, LINKS.BACK);
    });

    it('renders a specific reason and description', () => {
      const expectedReason = PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL.REASON.TYPE_OF_BUYER;
      cy.checkText(getAQuoteByEmailPage.reason(), expectedReason);

      const expectedDescription = PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL.REASON.TYPE_OF_BUYER_DESCRIPTION;
      cy.checkText(getAQuoteByEmailPage.description(), expectedDescription);
    });

    describe('navigating back to the type of buyer page', () => {
      it('auto checks the previously submitted answer', () => {
        cy.clickBackLink();

        cy.assertYesRadioOptionIsChecked();
      });
    });
  },
);
