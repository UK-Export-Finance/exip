import { exporterLocationPage, ukGoodsOrServicesPage } from '../../../../pages/shared';
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

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Insurance - Insured amount page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction that is less than the maxium amount of cover available online', () => {
  before(() => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeAndSubmitBuyerCountryForm();

    exporterLocationPage[FIELD_IDS.VALID_EXPORTER_LOCATION].yes().click();
    exporterLocationPage.submitButton().click();

    ukGoodsOrServicesPage.yes().click();
    ukGoodsOrServicesPage.submitButton().click();

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT}`;

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

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES);

    // go back to page
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT, {
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

    insurance.eligibility.insuredAmountPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders `yes` radio button', () => {
    const yesRadio = insurance.eligibility.insuredAmountPage.yes();
    yesRadio.should('exist');

    yesRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });
  });

  it('renders `no` radio button', () => {
    const noRadio = insurance.eligibility.insuredAmountPage.no();
    noRadio.should('exist');

    noRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('No');
    });
  });

  it('renders a submit button', () => {
    const button = insurance.eligibility.insuredAmountPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        insurance.eligibility.insuredAmountPage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD].IS_EMPTY;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        insurance.eligibility.insuredAmountPage.errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });

      it('should focus on input when clicking summary error message', () => {
        insurance.eligibility.insuredAmountPage.submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        insurance.eligibility.insuredAmountPage.yesInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `no`', () => {
      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.WANT_INSURANCE_OVER_MAX_PERIOD}`, () => {
        insurance.eligibility.insuredAmountPage.no().click();
        insurance.eligibility.insuredAmountPage.submitButton().click();

        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.WANT_INSURANCE_OVER_MAX_PERIOD}`;

        cy.url().should('eq', expected);
      });
    });
  });
});
