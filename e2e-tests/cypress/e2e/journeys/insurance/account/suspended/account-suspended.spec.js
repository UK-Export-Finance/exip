import { suspendedPage } from '../../../../pages/insurance/account/suspended';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED;

const {
  ACCOUNT: {
    SUSPENDED: { ROOT: SUSPENDED_ROOT },
  },
} = ROUTES;

context('Insurance - Account - Suspended page', () => {
  const accountSuspendedUrl = `${Cypress.config('baseUrl')}${SUSPENDED_ROOT}`;

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(accountSuspendedUrl);
  });

  after(() => {
    cy.deleteAccount();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: accountSuspendedUrl,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      assertSubmitButton: false,
      submitButtonCopy: BUTTONS.REACTIVATE_ACCOUNT,
    });
  });

  describe('page tests', () => {
    it('should render body copy', () => {
      cy.checkText(suspendedPage.body(), CONTENT_STRINGS.BODY);
    });

    it('should render a link to reactivate the account', () => {
      cy.checkLink(
        suspendedPage.reactivateAccountLinkButton(),
        '#',
        BUTTONS.REACTIVATE_ACCOUNT,
      );
    });
  });
});
