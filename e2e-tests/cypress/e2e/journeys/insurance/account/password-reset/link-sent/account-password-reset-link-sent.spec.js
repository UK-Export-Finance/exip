import partials from '../../../../../partials';
import { backLink, submitButton } from '../../../../../pages/shared';
import { signInPage } from '../../../../../pages/insurance/account/sign-in';
import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import { linkSentPage } from '../../../../../pages/insurance/account/password-reset';
import accountFormFields from '../../../../../partials/insurance/accountFormFields';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import mockAccount from '../../../../../../fixtures/account';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_SENT;

const {
  CHECK_YOUR_INBOX,
  FOLLOW_THE_LINK,
  NOT_RECEIVED_ANYTHING,
  NOT_YOUR_EMAIL_ADDRESS,
} = CONTENT_STRINGS;

const {
  START,
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, LINK_SENT },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Password reset - link sent page - As an Exporter, I want to reset the password on my UKEF digital service account, So that I can securely access my UKEF digital service account', () => {
  let url;

  // TODDO - go to "already have account", click yes.
  before(() => {
    cy.navigateToUrl(START);
    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    // go back to create account page
    backLink().click();

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    // navigate to password reset page
    signInPage.resetPasswordLink().click();

    cy.keyboardInput(accountFormFields[EMAIL].input(), mockAccount[EMAIL]);

    submitButton().click();

    url = `${Cypress.config('baseUrl')}${LINK_SENT}`;

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: LINK_SENT,
      backLink: PASSWORD_RESET_ROOT,
      assertAuthenticatedHeader: false,
      assertSubmitButton: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to insurance start', () => {
      partials.header.serviceName().should('have.attr', 'href', START);
    });

    // TODO: page content

    it('should render `check your inbox` copy with the submitted email', () => {
      const expected = `${CHECK_YOUR_INBOX} ${mockAccount[EMAIL]}`;

      cy.checkText(linkSentPage.checkInbox(), expected);
    });

    it('should render `follow the link` copy', () => {
      cy.checkText(linkSentPage.followTheLink(), FOLLOW_THE_LINK);
    });

    describe('`not received anything` section', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a heading', () => {
        cy.checkText(linkSentPage.notReceivedAnything.heading(), NOT_RECEIVED_ANYTHING.HEADING);
      });

      it('should render `get a new password reset link` copy and link', () => {
        cy.checkText(linkSentPage.notReceivedAnything.youCan(), NOT_RECEIVED_ANYTHING.YOU_CAN);

        cy.checkLink(linkSentPage.notReceivedAnything.link(), PASSWORD_RESET_ROOT, NOT_RECEIVED_ANYTHING.LINK.TEXT);
      });
    });

    describe('`not your email address` section', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a heading', () => {
        cy.checkText(linkSentPage.notYourEmailAddress.heading(), NOT_YOUR_EMAIL_ADDRESS.HEADING);
      });

      it('should render `create account again` copy and link', () => {
        cy.checkText(linkSentPage.notYourEmailAddress.needTo(), NOT_YOUR_EMAIL_ADDRESS.NEED_TO);

        cy.checkLink(linkSentPage.notYourEmailAddress.link(), PASSWORD_RESET_ROOT, NOT_YOUR_EMAIL_ADDRESS.LINK.TEXT);
      });
    });
  });
});
