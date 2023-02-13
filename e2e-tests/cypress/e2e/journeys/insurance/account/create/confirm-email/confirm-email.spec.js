import { confirmEmailPage } from '../../../../../pages/insurance/account/create';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL;

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS, CONFIRM_EMAIL } },
} = ROUTES;

context('Insurance - Account - Create - Confirm email page - I want to create an account for UKEF digital service, So that I can readily use it for my Export Insurance Application with UKEF', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    const expected = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CONFIRM_EMAIL,
      backLink: YOUR_DETAILS,
    });
  });

  it('renders `check your email`', () => {
    const expected = CONTENT_STRINGS.CHECK_YOUR_EMAIL;

    cy.checkText(confirmEmailPage.checkYourEmail(), expected);
  });

  describe('having problems section', () => {
    const STRINGS = CONTENT_STRINGS.HAVING_PROBLEMS;
    const { wrongEmail } = confirmEmailPage.havingProblems;

    it('renders a heading', () => {
      const expected = STRINGS.HEADING;

      cy.checkText(confirmEmailPage.havingProblems.heading(), expected);
    });

    it('renders `can request a new link`', () => {
      const { REQUEST_NEW } = STRINGS;
      const { YOU_CAN, LINK, IF_NOT_RECEIVED } = REQUEST_NEW;

      cy.checkText(confirmEmailPage.havingProblems.requestNew.youCan(), YOU_CAN);

      cy.checkText(confirmEmailPage.havingProblems.requestNew.link(), LINK.TEXT);
      confirmEmailPage.havingProblems.requestNew.link().should('have.attr', 'href', LINK.HREF);

      cy.checkText(confirmEmailPage.havingProblems.requestNew.ifNotReceived(), IF_NOT_RECEIVED);
    });

    it('renders `if entered wrong email`', () => {
      const { WRONG_EMAIL } = STRINGS;
      const { ENTERED_INCORRECTLY, CREATE_ACCOUNT_AGAIN } = WRONG_EMAIL;

      cy.checkText(confirmEmailPage.havingProblems.wrongEmail.enteredIncorrectly(), ENTERED_INCORRECTLY);

      cy.checkText(wrongEmail.createAccountAgainLink(), CREATE_ACCOUNT_AGAIN.TEXT);
      wrongEmail.createAccountAgainLink().should('have.attr', 'href', ROUTES.ACCOUNT.CREATE.YOUR_DETAILS);
    });

    describe('when clicking on the `create account again` link', () => {
      it(`should redirect to ${ROUTES.ACCOUNT.CREATE.YOUR_DETAILS}`, () => {
        wrongEmail.createAccountAgainLink().click();

        const expected = `${Cypress.config('baseUrl')}${ROUTES.ACCOUNT.CREATE.YOUR_DETAILS}`;

        cy.url().should('eq', expected);
      });
    });
  });
});
