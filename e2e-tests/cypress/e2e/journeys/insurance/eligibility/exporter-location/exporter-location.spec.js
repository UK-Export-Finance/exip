import { buyerCountryPage, exporterLocationPage } from '../../../../pages/shared';
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

const CONTENT_STRINGS = PAGES.EXPORTER_LOCATION;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Insurance - Exporter location page - as an exporter, I want to check if my company can get UKEF issue export insurance cover', () => {
  beforeEach(() => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

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

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    exporterLocationPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders yes and no radio buttons', () => {
    const yesRadio = exporterLocationPage[FIELD_IDS.VALID_EXPORTER_LOCATION].yes();
    yesRadio.should('exist');

    yesRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });

    const noRadio = exporterLocationPage[FIELD_IDS.VALID_EXPORTER_LOCATION].no();
    noRadio.should('exist');

    noRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('No');
    });
  });

  it('renders a submit button', () => {
    const button = exporterLocationPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        exporterLocationPage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.VALID_EXPORTER_LOCATION];

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        exporterLocationPage[FIELD_IDS.VALID_EXPORTER_LOCATION].errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });

      it('should focus on input when clicking summary error message', () => {
        exporterLocationPage.submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        exporterLocationPage[FIELD_IDS.VALID_EXPORTER_LOCATION].yesInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES}`, () => {
        exporterLocationPage[FIELD_IDS.VALID_EXPORTER_LOCATION].yes().click();
        exporterLocationPage.submitButton().click();

        cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
      });
    });
  });
});
