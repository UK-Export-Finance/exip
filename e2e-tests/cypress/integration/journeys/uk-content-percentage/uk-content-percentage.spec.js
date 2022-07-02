import {
  triedToObtainCoverPage,
  ukContentPercentagePage,
} from '../../pages';
import partials from '../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.UK_CONTENT_PERCENTAGE_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('What percentage of your export is UK content page', () => {
  before(() => {
    cy.visit(ROUTES.TRIED_TO_OBTAIN_COVER, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    triedToObtainCoverPage[FIELD_IDS.TRIED_PRIVATE_COVER].no().click();
    triedToObtainCoverPage.submitButton().click();

    cy.url().should('include', ROUTES.UK_CONTENT_PERCENTAGE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 75,
    });
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.TRIED_TO_OBTAIN_COVER);

    // go back to page
    cy.visit(ROUTES.UK_CONTENT_PERCENTAGE, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    ukContentPercentagePage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders `yes` radio button', () => {
    const yesRadio = ukContentPercentagePage.yes();
    yesRadio.should('exist');

    yesRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });
  });

  it('renders `no` radio button', () => {
    const noRadio = ukContentPercentagePage.no();
    noRadio.should('exist');

    noRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('No');
    });
  });

  it('renders a submit button', () => {
    const button = ukContentPercentagePage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('expandable details', () => {
    const { details } = ukContentPercentagePage;
    const { DETAILS } = CONTENT_STRINGS;

    it('renders a summary', () => {
      details.summary().should('exist');

      details.summary().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.DETAILS.INTRO);
      });
    });

    it('clicking summary reveals details', () => {
      details.summary().click();

      details.includes.copy().should('be.visible');
    });

    describe('`includes` section', () => {
      it('renders copy', () => {
        details.includes.copy().invoke('text').then((text) => {
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

      it('renders list items', () => {
        details.notSure.details1().invoke('text').then((text) => {
          const stringItem = DETAILS.NOT_SURE.ITEMS[0];

          expect(text.trim()).includes(stringItem[0].text);
          expect(text.trim()).includes(stringItem[1].text);
          expect(text.trim()).includes(stringItem[2].text);
        });

        details.notSure.details1Link().should('have.attr', 'href', DETAILS.NOT_SURE.ITEMS[0][1].href);

        details.notSure.details2().invoke('text').then((text) => {
          expect(text.trim()).includes(DETAILS.NOT_SURE.ITEMS[1][0].text);
        });
      });
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        ukContentPercentagePage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.UK_CONTENT_PERCENTAGE].IS_EMPTY;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        ukContentPercentagePage.errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL}`, () => {
        ukContentPercentagePage.yes().click();
        ukContentPercentagePage.submitButton().click();

        cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
      });
    });
  });
});
