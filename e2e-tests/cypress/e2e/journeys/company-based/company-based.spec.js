import {
  buyerCountryPage,
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
    cy.visit(ROUTES.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    buyerCountryPage.searchInput().type('Fra');
    const results = buyerCountryPage.results();
    results.first().click();
    buyerCountryPage.submitButton().click();

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

    cy.url().should('include', ROUTES.BUYER_COUNTRY);
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

      it('should focus on input when clicking summary error message', () => {
        companyBasedPage.submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].yesInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.CAN_GET_PRIVATE_INSURANCE}`, () => {
        companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].yes().click();
        companyBasedPage.submitButton().click();

        cy.url().should('include', ROUTES.CAN_GET_PRIVATE_INSURANCE);
      });
    });
  });
});
