import {
  yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const CONTENT_STRINGS = PAGES.QUOTE.BUYER_BODY;

const {
  ELIGIBILITY: { VALID_BUYER_BODY },
} = FIELD_IDS;

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
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  it('should render a header with href to quote start', () => {
    partials.header.serviceName().should('have.attr', 'href', startRoute);
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

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = String(ERROR_MESSAGES.ELIGIBILITY[VALID_BUYER_BODY]);

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
