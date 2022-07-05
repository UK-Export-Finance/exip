import {
  buyerBasedPage,
  companyBasedPage,
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

const CONTENT_STRINGS = PAGES.COMPANY_BASED_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Company based inside the UK, Channel Islands and Isle of Man page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.BUYER_BASED, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    buyerBasedPage.searchInput().type('Fra');
    const results = buyerBasedPage.results();
    results.first().click();
    buyerBasedPage.submitButton().click();

    cy.url().should('include', ROUTES.COMPANY_BASED);
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

    cy.url().should('include', ROUTES.BUYER_BASED);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    companyBasedPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders yes and no radio buttons', () => {
    const yesRadio = companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].yes();
    yesRadio.should('exist');

    yesRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });

    const noRadio = companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].no();
    noRadio.should('exist');

    noRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('No');
    });
  });

  it('renders a submit button', () => {
    const button = companyBasedPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        companyBasedPage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.VALID_COMPANY_BASE];

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.TRIED_TO_OBTAIN_COVER}`, () => {
        companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].yes().click();
        companyBasedPage.submitButton().click();

        cy.url().should('include', ROUTES.TRIED_TO_OBTAIN_COVER);
      });
    });
  });
});
