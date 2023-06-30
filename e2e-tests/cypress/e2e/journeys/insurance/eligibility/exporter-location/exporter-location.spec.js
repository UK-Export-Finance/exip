import {
  yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../support/forms';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.EXPORTER_LOCATION;

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - Exporter location page - as an exporter, I want to check if my company can get UKEF issue export insurance cover', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY,
      assertAuthenticatedHeader: false,
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
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
      beforeEach(() => {
        yesRadio().click();
        submitButton().click();
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES}`, () => {
        cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          yesRadioInput().should('be.checked');
        });
      });
    });
  });
});
