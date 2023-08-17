import {
  yesRadio,
  yesRadioInput,
  noRadio,
  inlineErrorMessage,
  submitButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { completeAndSubmitBuyerBodyForm } from '../../../../../../commands/quote/forms';

const CONTENT_STRINGS = PAGES.EXPORTER_LOCATION;

const {
  QUOTE: {
    EXPORTER_LOCATION,
    BUYER_BODY,
    UK_GOODS_OR_SERVICES,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Exporter location page - as an exporter, I want to check if my company can get UKEF issue export insurance cover', () => {
  const url = `${baseUrl}${EXPORTER_LOCATION}`;

  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: EXPORTER_LOCATION,
      backLink: BUYER_BODY,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  it('renders `yes` radio button', () => {
    cy.checkText(yesRadio(), FIELD_VALUES.YES);

    cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders `no` radio button', () => {
    cy.checkText(noRadio(), FIELD_VALUES.NO);

    cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        submitButton().click();

        cy.checkErrorSummaryListHeading();

        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = String(ERROR_MESSAGES.ELIGIBILITY[FIELD_IDS.ELIGIBILITY.VALID_EXPORTER_LOCATION]);

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
      it(`should redirect to ${UK_GOODS_OR_SERVICES}`, () => {
        yesRadio().click();
        submitButton().click();

        const expectedUrl = `${baseUrl}${UK_GOODS_OR_SERVICES}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
