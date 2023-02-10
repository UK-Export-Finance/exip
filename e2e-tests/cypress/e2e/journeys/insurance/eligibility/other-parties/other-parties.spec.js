import {
  heading, yesRadio, yesRadioInput, noRadio, noRadioInput, inlineErrorMessage, submitButton,
} from '../../../../pages/shared';
import { insurance } from '../../../../pages';
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
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
} from '../../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED;

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - Other parties page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction if there are other parties involved in the export', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    cy.checkText(partials.backLink(), LINKS.BACK);

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD}`;

    cy.url().should('include', expectedUrl);

    // go back to page
    cy.navigateToUrl(ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders `yes` radio button', () => {
    yesRadio().should('exist');

    cy.checkText(yesRadio(), 'Yes');
  });

  it('renders `no` radio button', () => {
    noRadio().should('exist');

    cy.checkText(noRadio(), 'No');
  });

  describe('expandable details', () => {
    it('renders summary text', () => {
      insurance.eligibility.otherPartiesPage.description.summary().should('exist');

      cy.checkText(insurance.eligibility.otherPartiesPage.description.summary(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.INTRO);
    });

    it('clicking summary text reveals details', () => {
      insurance.eligibility.otherPartiesPage.description.summary().click();

      insurance.eligibility.otherPartiesPage.description.list.intro().should('be.visible');
    });

    it('renders expanded content', () => {
      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.intro(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST_INTRO);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item1(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[0].TEXT);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item2(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[1].TEXT);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item3(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[2].TEXT);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item4(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[3].TEXT);

      cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item5(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[4].TEXT);
    });
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

        const expectedMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_IDS.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED].IS_EMPTY;

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
      beforeEach(() => {
        noRadio().click();
        submitButton().click();
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`, () => {
        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`;

        cy.url().should('eq', expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          partials.backLink().click();

          noRadioInput().should('be.checked');
        });
      });
    });
  });
});
