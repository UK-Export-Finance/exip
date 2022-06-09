import triedToObtainCoverPage from '../pages/triedToObtainCover';
import partials from '../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  TRIED_TO_OBTAIN_COVER_PAGE as CONTENT_STRINGS,
  ERROR_MESSAGES,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

context('Tried to obtain private cover page', () => {
  it('returns 401 when incorrect login provided', () => {
    cy.request({
      url: CONSTANTS.ROUTES.TRIED_TO_OBTAIN_COVER,
      failOnStatusCode: false,
      auth: {
        username: 'invalid',
        password: 'invalid',
      },
    }).its('status').should('equal', 401);
  });

  describe('with valid login', () => {
    beforeEach(() => {
      cy.visit(CONSTANTS.ROUTES.TRIED_TO_OBTAIN_COVER, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });
      cy.url().should('include', CONSTANTS.ROUTES.TRIED_TO_OBTAIN_COVER);
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

      cy.url().should('include', CONSTANTS.ROUTES.BUYER_BASED);
    });

    it('renders a page title, heading and warning', () => {
      const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
      cy.title().should('eq', expectedPageTitle);

      triedToObtainCoverPage.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
      });

      triedToObtainCoverPage.warning().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.WARNING);
      });
    });

    it('renders yes and no radio buttons', () => {
      const yesRadio = triedToObtainCoverPage[CONSTANTS.FIELD_IDS.TRIED_PRIVATE_COVER].yes();
      yesRadio.should('exist');

      yesRadio.invoke('text').then((text) => {
        expect(text.trim()).equal('Yes');
      });

      const noRadio = triedToObtainCoverPage[CONSTANTS.FIELD_IDS.TRIED_PRIVATE_COVER].no();
      noRadio.should('exist');

      noRadio.invoke('text').then((text) => {
        expect(text.trim()).equal('No');
      });
    });

    it('renders a submit button', () => {
      const button = triedToObtainCoverPage.submitButton();
      button.should('exist');

      button.invoke('text').then((text) => {
        expect(text.trim()).equal(BUTTONS.CONTINUE);
      });
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        it('should render validation errors', () => {
          triedToObtainCoverPage.submitButton().click();

          partials.errorSummaryListItems().should('exist');
          partials.errorSummaryListItems().should('have.length', 1);

          const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.TRIED_PRIVATE_COVER];

          partials.errorSummaryListItems().first().invoke('text').then((text) => {
            expect(text.trim()).equal(expectedMessage);
          });

          triedToObtainCoverPage[CONSTANTS.FIELD_IDS.TRIED_PRIVATE_COVER].errorMessage().invoke('text').then((text) => {
            expect(text.trim()).includes(expectedMessage);
          });
        });
      });

      describe('when submitting the answer as `yes`', () => {
        it(`should redirect to ${CONSTANTS.ROUTES.FINAL_DESTINATION}`, () => {
          triedToObtainCoverPage[CONSTANTS.FIELD_IDS.TRIED_PRIVATE_COVER].yes().click();
          triedToObtainCoverPage.submitButton().click();

          cy.url().should('include', CONSTANTS.ROUTES.FINAL_DESTINATION);
        });
      });

      describe('when submitting the answer as `no`', () => {
        it(`should redirect to ${CONSTANTS.ROUTES.FINAL_DESTINATION}`, () => {
          triedToObtainCoverPage[CONSTANTS.FIELD_IDS.TRIED_PRIVATE_COVER].no().click();
          triedToObtainCoverPage.submitButton().click();

          cy.url().should('include', CONSTANTS.ROUTES.FINAL_DESTINATION);
        });
      });
    });
  });
});
