import {
  heading, yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
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

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    cy.checkText(partials.backLink(), LINKS.BACK);

    partials.backLink().click();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders yes and no radio buttons', () => {
    yesRadio().should('exist');

    cy.checkText(yesRadio(), 'Yes');

    noRadio().should('exist');

    cy.checkText(noRadio(), 'No');
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    cy.checkText(submitButton(), BUTTONS.CONTINUE);
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
      beforeEach(() => {
        yesRadio().click();
        submitButton().click();
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES}`, () => {
        cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          partials.backLink().click();

          yesRadioInput().should('be.checked');
        });
      });
    });
  });
});
