import partials from '../../../../../../partials';
import manageAccountPage from '../../../../../../pages/insurance/account/manage';
import { field, intro } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.MANAGE;

const {
  ACCOUNT: {
    CREATE: { YOUR_DETAILS },
    SIGN_IN: { ENTER_CODE },
    MANAGE,
  },
  DASHBOARD,
} = ROUTES;

const {
  ACCOUNT: { ACCESS_CODE },
} = INSURANCE_FIELD_IDS;

const {
  PAGE_TITLE,
  INTRO,
  CUSTOMER_SERVICE,
} = CONTENT_STRINGS;

context('Insurance - Account - Manage - As an Exporter, I want the service to have a page that shows how I can manage my account, So that I can readily access information on how to manage my account', () => {
  const baseUrl = Cypress.config('baseUrl');
  const createYourDetailsUrl = `${baseUrl}${YOUR_DETAILS}`;
  const enterCodeUrl = `${baseUrl}${ENTER_CODE}`;
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;
  const manageAccountUrl = `${baseUrl}${MANAGE}`;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(createYourDetailsUrl);

    cy.completeAndSubmitCreateAccountForm();

    cy.navigateToUrl(enterCodeUrl);

    cy.verifyAccountEmail();

    cy.completeAndSubmitSignInAccountForm({});
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('after signing in with a valid access code and navigating to the `manage account` page', () => {
    let validAccessCode;

    before(() => {
      cy.accountAddAndGetOTP().then((accessCode) => {
        validAccessCode = accessCode;

        cy.navigateToUrl(enterCodeUrl);

        cy.keyboardInput(field(ACCESS_CODE).input(), validAccessCode);

        cy.clickSubmitButton();

        partials.header.navigation.manageAccount().click();
      });
    });

    it(`should redirect to ${MANAGE}`, () => {
      cy.assertUrl(manageAccountUrl);
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(dashboardUrl);

        partials.header.navigation.manageAccount().click();
      });

      it('renders core page elements', () => {
        cy.corePageChecks({
          pageTitle: PAGE_TITLE,
          currentHref: MANAGE,
          backLink: DASHBOARD,
          assertBackLink: true,
          hasAForm: false,
          assertAuthenticatedHeader: true,
        });
      });

      it('renders an introduction', () => {
        cy.checkText(
          intro(),
          INTRO,
        );
      });

      it('renders a `customer service contact details` section', () => {
        cy.checkText(
          manageAccountPage.customerServiceHeading(),
          CUSTOMER_SERVICE.HEADING,
        );

        cy.assertCustomerServiceContactDetailsContent();
      });
    });
  });
});
