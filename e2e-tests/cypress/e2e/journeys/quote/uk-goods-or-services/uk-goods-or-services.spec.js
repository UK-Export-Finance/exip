import { exporterLocationPage, ukGoodsOrServicesPage } from '../../../pages/shared';
import partials from '../../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm } from '../../../../support/quote/forms';
import { checkSummaryText, checkSummaryClickRevealsContent, checkDescriptionContent } from '../../../../support/check-uk-goods-and-services-description';

const CONTENT_STRINGS = {
  ...PAGES.UK_GOODS_OR_SERVICES,
  ...PAGES.QUOTE.UK_GOODS_OR_SERVICES,
};

const { ROUTES, FIELD_IDS } = CONSTANTS;

context('UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF export insurance cover', () => {
  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();

    cy.url().should('include', ROUTES.QUOTE.UK_GOODS_OR_SERVICES);
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
      seo: 60,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.QUOTE.EXPORTER_LOCATION);

    // go back to page
    cy.visit(ROUTES.QUOTE.UK_GOODS_OR_SERVICES, {
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

    ukGoodsOrServicesPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders `yes` radio button', () => {
    const yesRadio = ukGoodsOrServicesPage.yes();
    yesRadio.should('exist');

    yesRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });
  });

  it('renders `no` radio button', () => {
    const noRadio = ukGoodsOrServicesPage.no();
    noRadio.should('exist');

    noRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('No');
    });
  });

  describe('expandable details', () => {
    it('renders summary text', () => {
      checkSummaryText();
    });

    it('clicking summary text reveals details', () => {
      checkSummaryClickRevealsContent();
    });

    it('renders expanded content', () => {
      checkDescriptionContent();
    });

    it('renders `will calculate thoroughly` copy ', () => {
      partials.ukGoodsOrServicesDescription.calculateThoroughly().invoke('text').then((text) => {
        const expected = CONTENT_STRINGS.WILL_CALCULATE_THOROUGHLY;
        expect(text.trim()).equal(expected);
      });
    });
  });

  it('renders a submit button', () => {
    const button = ukGoodsOrServicesPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        ukGoodsOrServicesPage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES].IS_EMPTY;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        ukGoodsOrServicesPage.errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });

      it('should focus on input when clicking summary error message', () => {
        ukGoodsOrServicesPage.submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        ukGoodsOrServicesPage.yesInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.QUOTE.POLICY_TYPE}`, () => {
        ukGoodsOrServicesPage.yes().click();
        ukGoodsOrServicesPage.submitButton().click();

        cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);
      });
    });
  });
});
