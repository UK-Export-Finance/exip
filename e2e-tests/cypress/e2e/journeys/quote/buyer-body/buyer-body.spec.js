import {
  yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../pages/shared';
import partials from '../../../partials';
import { ERROR_MESSAGES, PAGES } from '../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';

const CONTENT_STRINGS = PAGES.QUOTE.BUYER_BODY;

const startRoute = ROUTES.QUOTE.START;

context('Buyer body page - as an exporter, I want to check if I can get an EXIP online quote for my buyers country', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();

    cy.url().should('include', ROUTES.QUOTE.BUYER_BODY);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.BUYER_BODY,
      backLink: ROUTES.QUOTE.BUYER_COUNTRY,
    });
  });

  it('should render a header with href to quote start', () => {
    partials.header.serviceName().should('have.attr', 'href', startRoute);
  });

  it('renders yes and no radio buttons', () => {
    yesRadio().should('exist');

    cy.checkText(yesRadio(), 'Yes');

    noRadio().should('exist');

    cy.checkText(noRadio(), 'No');
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.VALID_BUYER_BODY];

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `no`', () => {
      it(`should redirect to ${ROUTES.QUOTE.EXPORTER_LOCATION}`, () => {
        noRadio().click();
        submitButton().click();

        cy.url().should('include', ROUTES.QUOTE.EXPORTER_LOCATION);
      });
    });
  });
});
