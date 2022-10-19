import { exporterLocationPage } from '../../../pages/shared';
import { ukGoodsOrServicesPage } from '../../../pages/quote';
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

const CONTENT_STRINGS = PAGES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF export insurance cover', () => {
  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();

    cy.url().should('include', ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
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
    cy.visit(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES, {
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

  it('renders a submit button', () => {
    const button = ukGoodsOrServicesPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('expandable details', () => {
    const { details } = ukGoodsOrServicesPage;
    const { DETAILS } = CONTENT_STRINGS;

    it('renders a summary', () => {
      details.summary().should('exist');

      details.summary().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.DETAILS.INTRO);
      });
    });

    it('clicking summary reveals details', () => {
      details.summary().click();

      details.includes.intro().should('be.visible');
    });

    describe('`includes` section', () => {
      it('renders intro', () => {
        details.includes.intro().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.INCLUDES.INTRO);
        });
      });

      it('renders list items', () => {
        details.includes.listItem1().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.INCLUDES.PRODUCTS);
        });

        details.includes.listItem2().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.INCLUDES.MANUFACTURED);
        });

        details.includes.listItem3().invoke('text').then((text) => {
          const expected = `${DETAILS.INCLUDES.STAFFING_COSTS.LINK.TEXT} ${DETAILS.INCLUDES.STAFFING_COSTS.TEXT}`;
          expect(text.trim()).equal(expected);
        });

        details.includes.listItem3Link().should('have.attr', 'href', DETAILS.INCLUDES.STAFFING_COSTS.LINK.HREF);

        details.includes.listItem4().invoke('text').then((text) => {
          const expected = `${DETAILS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.TEXT} ${DETAILS.INCLUDES.NON_PHYSICAL_ASSETS.TEXT}`;
          expect(text.trim()).equal(expected);
        });

        details.includes.listItem4Link().should('have.attr', 'href', DETAILS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.HREF);
      });

      it('renders `also count as` copy', () => {
        details.includes.canCountAs().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.INCLUDES.CAN_COUNT_AS);
        });
      });
    });

    describe('`does not count` section', () => {
      it('renders a heading', () => {
        details.doesNotCount.heading().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.DOES_NOT_COUNT.HEADING);
        });
      });

      it('renders copy', () => {
        details.doesNotCount.copy().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.DOES_NOT_COUNT.TEXT);
        });
      });
    });

    describe('`staffing costs` section', () => {
      it('renders a heading', () => {
        details.staffingCosts.heading().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.STAFFING_COSTS.HEADING);
        });
      });

      it('renders copy', () => {
        details.staffingCosts.copy().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.STAFFING_COSTS.TEXT);
        });
      });

      it('renders list items', () => {
        details.staffingCosts.listItem1().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.STAFFING_COSTS.LIST[0].TEXT);
        });

        details.staffingCosts.listItem2().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.STAFFING_COSTS.LIST[1].TEXT);
        });

        details.staffingCosts.listItem3().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.STAFFING_COSTS.LIST[2].TEXT);
        });
      });
    });

    describe('`non physical assets` section', () => {
      it('renders a heading', () => {
        details.nonPhysicalAssets.heading().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.NON_PHYSICAL_ASSETS.HEADING);
        });
      });

      it('renders copy', () => {
        details.nonPhysicalAssets.copy().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.NON_PHYSICAL_ASSETS.TEXT);
        });
      });
    });

    describe('`not sure` section', () => {
      it('renders a heading', () => {
        details.notSure.heading().invoke('text').then((text) => {
          expect(text.trim()).equal(DETAILS.NOT_SURE.HEADING);
        });
      });

      it('renders copy', () => {
        details.notSure.details().invoke('text').then((text) => {
          const expected = `${DETAILS.NOT_SURE.BODY_1} ${DETAILS.NOT_SURE.LINK.TEXT} ${DETAILS.NOT_SURE.BODY_2}`;

          expect(text.trim()).equal(expected);
        });

        details.notSure.detailsLast().invoke('text').then((text) => {
          const expected = DETAILS.NOT_SURE.BODY_3;
          expect(text.trim()).equal(expected);
        });

        details.notSure.detailsLink().should('have.attr', 'href', DETAILS.NOT_SURE.LINK.HREF);
      });
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
