import { heading, yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton } from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import partials from '../../../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../../../content-strings';
import CONSTANTS from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../support/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Insurance - Eligibility - Letter of credit page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction that is paid via letter of credit', () => {
  before(() => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeAndSubmitBuyerCountryForm();

    yesRadio().click();
    submitButton().click();

    yesRadio().click();
    submitButton().click();

    noRadio().click();
    submitButton().click();

    noRadio().click();
    submitButton().click();

    noRadio().click();
    submitButton().click();

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
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
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED}`;

    cy.url().should('include', expectedUrl);

    // go back to page
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
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

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders `yes` radio button', () => {
    yesRadio().should('exist');

    yesRadio().invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });
  });

  it('renders `no` radio button', () => {
    noRadio().should('exist');

    noRadio().invoke('text').then((text) => {
      expect(text.trim()).equal('No');
    });
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_IDS.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT].IS_EMPTY;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        inlineErrorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `no`', () => {
      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD}`, () => {
        noRadio().click();
        submitButton().click();

        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD}`;

        cy.url().should('eq', expected);
      });
    });
  });
});
