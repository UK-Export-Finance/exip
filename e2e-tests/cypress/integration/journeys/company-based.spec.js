import companyBasedPage from '../pages/companyBased';
import partials from '../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  COMPANY_BASED_PAGE as CONTENT_STRINGS,
  ERROR_MESSAGES,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

context('Company based inside the UK, Channel Islands and Isle of Man page', () => {
  it('returns 401 when incorrect login provided', () => {
    cy.request({
      url: CONSTANTS.ROUTES.COMPANY_BASED,
      failOnStatusCode: false,
      auth: {
        username: 'invalid',
        password: 'invalid',
      },
    }).its('status').should('equal', 401);
  });

  describe('with valid login', () => {
    beforeEach(() => {
      cy.visit(CONSTANTS.ROUTES.COMPANY_BASED, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      cy.url().should('include', CONSTANTS.ROUTES.COMPANY_BASED);
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

      cy.url().should('include', CONSTANTS.ROUTES.BEFORE_YOU_START);
    });

    it('renders a page title and heading', () => {
      const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
      cy.title().should('eq', expectedPageTitle);

      companyBasedPage.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
      });
    });

    it('renders yes and no radio buttons', () => {
      const yesRadio = companyBasedPage[CONSTANTS.FIELD_IDS.VALID_COMPANY_BASE].yes();
      yesRadio.should('exist');

      yesRadio.invoke('text').then((text) => {
        expect(text.trim()).equal('Yes');
      });

      const noRadio = companyBasedPage[CONSTANTS.FIELD_IDS.VALID_COMPANY_BASE].no();
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

          const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.VALID_COMPANY_BASE];

          partials.errorSummaryListItems().first().invoke('text').then((text) => {
            expect(text.trim()).equal(expectedMessage);
          });

          companyBasedPage[CONSTANTS.FIELD_IDS.VALID_COMPANY_BASE].errorMessage().invoke('text').then((text) => {
            expect(text.trim()).includes(expectedMessage);
          });
        });
      });

      describe('when submitting the answer as `no`', () => {
        it(`should redirect to ${CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE}`, () => {
          companyBasedPage[CONSTANTS.FIELD_IDS.VALID_COMPANY_BASE].no().click();
          companyBasedPage.submitButton().click();

          cy.url().should('include', CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE);
        });
      });

      describe('when submitting the answer as `yes`', () => {
        it(`should redirect to ${CONSTANTS.ROUTES.BUYER_BASED}`, () => {
          companyBasedPage[CONSTANTS.FIELD_IDS.VALID_COMPANY_BASE].yes().click();
          companyBasedPage.submitButton().click();

          cy.url().should('include', CONSTANTS.ROUTES.BUYER_BASED);
        });
      });
    });
  });
});
