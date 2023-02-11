import {
  yesRadio,
  yesRadioInput,
  noRadio,
  inlineErrorMessage,
  submitButton,
} from '../../../pages/shared';
import partials from '../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import { completeAndSubmitBuyerBodyForm } from '../../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.EXPORTER_LOCATION;

context('Exporter location page - as an exporter, I want to check if my company can get UKEF issue export insurance cover', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();

    cy.url().should('include', ROUTES.QUOTE.EXPORTER_LOCATION);
  });

  it('renders core page elements', () => {
    cy.assertCorePageElements({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.EXPORTER_LOCATION,
      expectedBackLink: ROUTES.QUOTE.BUYER_BODY,
      assertSubmitButton: true,
    });
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

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.VALID_EXPORTER_LOCATION];

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.QUOTE.UK_GOODS_OR_SERVICES}`, () => {
        yesRadio().click();
        submitButton().click();

        cy.url().should('include', ROUTES.QUOTE.UK_GOODS_OR_SERVICES);
      });
    });
  });
});
