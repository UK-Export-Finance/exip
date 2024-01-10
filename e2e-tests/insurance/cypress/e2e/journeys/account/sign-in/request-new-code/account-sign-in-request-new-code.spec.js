import { intro } from '../../../../../../../pages/shared';
import { enterCodePage, requestNewCodePage } from '../../../../../../../pages/insurance/account/sign-in';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE;

const {
  START,
  ACCOUNT: {
    SIGN_IN: { ENTER_CODE, REQUEST_NEW_CODE },
  },
} = ROUTES;

context('Insurance - Account - Sign in - Request new code page - I want to enter the new security code sent to my email by UK Export Finance, So that I can sign in into my UKEF digital service account', () => {
  const url = `${Cypress.config('baseUrl')}${REQUEST_NEW_CODE}`;
  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.verifyAccountEmail();

    cy.completeAndSubmitSignInAccountForm({});

    enterCodePage.requestNewCodeLink().click();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: REQUEST_NEW_CODE,
      backLink: ENTER_CODE,
      submitButtonCopy: BUTTONS.SEND_NEW_SECURITY_CODE,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render intro copy', () => {
      cy.checkText(intro(), CONTENT_STRINGS.INTRO);
    });

    describe('expandable details - do not have access to email', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      const { doNotHaveAccessToEmail } = requestNewCodePage;
      const { DO_NOT_HAVE_EMAIL_ACCESS } = CONTENT_STRINGS;

      it('should render summary text with collapsed conditional `details` content', () => {
        cy.checkText(doNotHaveAccessToEmail.summary(), DO_NOT_HAVE_EMAIL_ACCESS.INTRO);

        doNotHaveAccessToEmail.details().should('not.have.attr', 'open');
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `details` content', () => {
          doNotHaveAccessToEmail.summary().click();

          doNotHaveAccessToEmail.details().should('have.attr', 'open');

          doNotHaveAccessToEmail.cannotAccess().should('be.visible');

          cy.checkText(doNotHaveAccessToEmail.cannotAccess(), DO_NOT_HAVE_EMAIL_ACCESS.CANNOT_ACCESS);

          cy.checkLink(
            doNotHaveAccessToEmail.contactUsLink(),
            DO_NOT_HAVE_EMAIL_ACCESS.CONTACT_US.HREF,
            DO_NOT_HAVE_EMAIL_ACCESS.CONTACT_US.TEXT,
          );

          cy.checkText(doNotHaveAccessToEmail.outro(), DO_NOT_HAVE_EMAIL_ACCESS.OUTRO);
        });
      });
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSubmitButton();
    });

    it(`should redirect to ${ENTER_CODE}`, () => {
      const expected = `${Cypress.config('baseUrl')}${ENTER_CODE}`;
      cy.assertUrl(expected);
    });

    it('should render a success message', () => {
      enterCodePage.successBanner.container().should('exist');

      const { ENTER_CODE: ENTER_CODE_STRINGS } = PAGES.INSURANCE.ACCOUNT.SIGN_IN;

      const expected = ENTER_CODE_STRINGS.SUCCESS_BANNER.NEW_CODE_SENT;

      cy.checkText(enterCodePage.successBanner.newCodeSent(), expected);
    });
  });
});
