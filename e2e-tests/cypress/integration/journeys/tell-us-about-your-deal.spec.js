import tellUsAboutYourDealPage from '../pages/tellUsAboutYourDeal';
import partials from '../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  FIELDS,
  TELL_US_ABOUT_YOUR_DEAL_PAGE as CONTENT_STRINGS,
  ERROR_MESSAGES,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

context('Tell us about your deal page', () => {
  it('returns 401 when incorrect login provided', () => {
    cy.request({
      url: CONSTANTS.ROUTES.TELL_US_ABOUT_YOUR_DEAL,
      failOnStatusCode: false,
      auth: {
        username: 'invalid',
        password: 'invalid',
      },
    }).its('status').should('equal', 401);
  });

  describe('with valid login', () => {
    describe('rendering', () => {
      before(() => {
        cy.visit(CONSTANTS.ROUTES.TELL_US_ABOUT_YOUR_DEAL, {
          auth: {
            username: Cypress.config('basicAuthKey'),
            password: Cypress.config('basicAuthSecret'),
          },
        });
        cy.url().should('include', CONSTANTS.ROUTES.TELL_US_ABOUT_YOUR_DEAL);
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

        partials.backLink().should('have.attr', 'href', CONSTANTS.ROUTES.UK_CONTENT_PERCENTAGE);
      });

      it('renders a page title, heading and description', () => {
        const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
        cy.title().should('eq', expectedPageTitle);

        tellUsAboutYourDealPage.heading().invoke('text').then((text) => {
          expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
        });

        tellUsAboutYourDealPage.description().invoke('text').then((text) => {
          expect(text.trim()).equal(CONTENT_STRINGS.DESCRIPTION);
        });
      });

      it('renders `credit limit group` label and hint', () => {
        const fieldId = CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP;

        const field = tellUsAboutYourDealPage[fieldId];

        field.labelText().should('exist');
        field.labelText().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].HEADING);
        });

        field.hint().should('exist');
        field.hint().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].HINT);
        });
      });

      it('renders `credit limit currency` hidden label and input', () => {
        const fieldId = CONSTANTS.FIELD_IDS.CREDIT_LIMIT_CURRENCY;

        const field = tellUsAboutYourDealPage[fieldId];

        field.label().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].LABEL);
        });

        field.input().should('exist');
      });

      it('renders `credit limit` hidden label and input', () => {
        const fieldId = CONSTANTS.FIELD_IDS.CREDIT_LIMIT;

        const field = tellUsAboutYourDealPage[fieldId];

        field.label().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].LABEL);
        });

        field.input().should('exist');
      });

      it('renders `pre credit period` label, hint and input', () => {
        const fieldId = CONSTANTS.FIELD_IDS.PRE_CREDIT_PERIOD;

        const field = tellUsAboutYourDealPage[fieldId];

        field.label().should('exist');
        field.labelText().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].LABEL);
        });

        field.hint().should('exist');
        field.hint().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].HINT);
        });

        field.input().should('exist');
      });

      it('renders `credit period` label, hint and input', () => {
        const fieldId = CONSTANTS.FIELD_IDS.CREDIT_PERIOD;

        const field = tellUsAboutYourDealPage[fieldId];

        field.label().should('exist');
        field.labelText().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].LABEL);
        });

        field.hint().should('exist');
        field.hint().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].HINT);
        });

        field.input().should('exist');
      });

      it('renders `policy length` label, hint and input', () => {
        const fieldId = CONSTANTS.FIELD_IDS.POLICY_LENGTH;

        const field = tellUsAboutYourDealPage[fieldId];

        field.label().should('exist');
        field.labelText().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].LABEL);
        });

        field.hint().should('exist');
        field.hint().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].HINT);
        });

        field.input().should('exist');
      });

      it('renders `policy type` label, hint and radio inputs', () => {
        const fieldId = CONSTANTS.FIELD_IDS.POLICY_TYPE;

        const field = tellUsAboutYourDealPage[fieldId];

        field.label().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].LABEL);
        });

        field.hint().should('exist');
        field.hint().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].HINT);
        });

        field.single.input().should('exist');
        field.single.label().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].OPTIONS.SINGLE.TEXT);
        });

        field.single.hint().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].OPTIONS.SINGLE.HINT);
        });

        field.multi.input().should('exist');
        field.multi.label().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].OPTIONS.MULTI.TEXT);
        });

        field.multi.hint().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[fieldId].OPTIONS.MULTI.HINT);
        });
      });

      it('renders a submit button', () => {
        const button = tellUsAboutYourDealPage.submitButton();
        button.should('exist');

        button.invoke('text').then((text) => {
          expect(text.trim()).equal(BUTTONS.CONTINUE);
        });
      });
    });

    describe('form submission', () => {
      beforeEach(() => {
        cy.visit(CONSTANTS.ROUTES.TELL_US_ABOUT_YOUR_DEAL, {
          auth: {
            username: Cypress.config('basicAuthKey'),
            password: Cypress.config('basicAuthSecret'),
          },
        });
      });

      describe('when submitting an empty form', () => {
        it('should render validation errors for all required fields', () => {
          tellUsAboutYourDealPage.submitButton().click();

          partials.errorSummaryListItems().should('exist');

          const TOTAL_REQUIRED_FIELDS = 4;
          partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

          // credit limit
          partials.errorSummaryListItems().eq(0).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP].IS_EMPTY;

            expect(text.trim()).equal(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP].IS_EMPTY;

            expect(text.trim()).includes(expectedMessage);
          });

          // credit period
          partials.errorSummaryListItems().eq(1).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].IS_EMPTY;

            expect(text.trim()).equal(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].IS_EMPTY;

            expect(text.trim()).includes(expectedMessage);
          });

          // policy length
          partials.errorSummaryListItems().eq(2).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.POLICY_LENGTH].IS_EMPTY;

            expect(text.trim()).equal(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_LENGTH].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.POLICY_LENGTH].IS_EMPTY;

            expect(text.trim()).includes(expectedMessage);
          });

          // policy type
          partials.errorSummaryListItems().eq(3).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.POLICY_TYPE];

            expect(text.trim()).equal(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_TYPE].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.POLICY_TYPE];

            expect(text.trim()).includes(expectedMessage);
          });
        });
      });

      describe('when no `credit limit currency` is provided, but credit limit is', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_CURRENCY].input().select('AED');
          tellUsAboutYourDealPage.submitButton().click();

          partials.errorSummaryListItems().eq(0).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP].IS_EMPTY;

            expect(text.trim()).equal(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP].IS_EMPTY;

            expect(text.trim()).includes(expectedMessage);
          });
        });
      });

      describe('when no `credit limit` is provided, but `credit limit currency` is', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT].input().type('100');
          tellUsAboutYourDealPage.submitButton().click();

          partials.errorSummaryListItems().eq(0).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP].IS_EMPTY;

            expect(text.trim()).equal(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_GROUP].IS_EMPTY;

            expect(text.trim()).includes(expectedMessage);
          });
        });
      });

      describe('when `credit limit` has a non-numeric value', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_CURRENCY].input().select('AED');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT].input().type('a');
          tellUsAboutYourDealPage.submitButton().click();

          partials.errorSummaryListItems().eq(0).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_LIMIT].NOT_A_NUMBER;

            expect(text.trim()).equal(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_LIMIT].NOT_A_NUMBER;

            expect(text.trim()).includes(expectedMessage);
          });
        });
      });

      describe('when (optional field) `pre-credit period` has a non-numeric value', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.PRE_CREDIT_PERIOD].input().type('a');
          tellUsAboutYourDealPage.submitButton().click();

          partials.errorSummaryListItems().eq(1).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER;

            expect(text.trim()).equal(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.PRE_CREDIT_PERIOD].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER;

            expect(text.trim()).includes(expectedMessage);
          });
        });
      });

      describe('when `credit period` and `policy length` have non-numeric values', () => {
        it('should render validation errors', () => {
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].input().type('a');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_LENGTH].input().type('a');
          tellUsAboutYourDealPage.submitButton().click();

          partials.errorSummaryListItems().eq(1).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER;

            expect(text.trim()).equal(expectedMessage);
          });

          partials.errorSummaryListItems().eq(2).invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.POLICY_LENGTH].NOT_A_NUMBER;

            expect(text.trim()).equal(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER;

            expect(text.trim()).includes(expectedMessage);
          });

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_LENGTH].errorMessage().invoke('text').then((text) => {
            const expectedMessage = ERROR_MESSAGES[CONSTANTS.FIELD_IDS.POLICY_LENGTH].NOT_A_NUMBER;

            expect(text.trim()).includes(expectedMessage);
          });
        });
      });

      describe('with any validation error', () => {
        it('should render submitted values', () => {
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_CURRENCY].input().select('AED');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.PRE_CREDIT_PERIOD].input().type('0');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].input().type('1');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_LENGTH].input().type('2');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_TYPE].multi.input().click();

          tellUsAboutYourDealPage.submitButton().click();

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.PRE_CREDIT_PERIOD].input()
            .should('have.attr', 'value', '0');

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].input()
            .should('have.attr', 'value', '1');

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_LENGTH].input()
            .should('have.attr', 'value', '2');

          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_TYPE].multi.input().should('be.checked');
        });
      });

      describe('when form is valid', () => {
        it(`should redirect to ${CONSTANTS.ROUTES.CHECK_YOUR_ANSWERS}`, () => {
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT_CURRENCY].input().select('AED');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_LIMIT].input().type('100');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.PRE_CREDIT_PERIOD].input().type('0');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.CREDIT_PERIOD].input().type('1');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_LENGTH].input().type('2');
          tellUsAboutYourDealPage[CONSTANTS.FIELD_IDS.POLICY_TYPE].single.input().click();

          tellUsAboutYourDealPage.submitButton().click();

          cy.url().should('include', CONSTANTS.ROUTES.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
