import { enterCodePage } from '../../../../../../../pages/insurance/account/sign-in';
import { field as fieldSelector } from '../../../../../../../pages/shared';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.ENTER_CODE;

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE, REQUEST_NEW_CODE },
  },
} = ROUTES;

const {
  ACCOUNT: { ACCESS_CODE },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ACCOUNT_FIELDS[ACCESS_CODE];

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Account - Sign in - I want to sign in into my UKEF digital service account after completing eligibility, So that I can complete my application for a UKEF Export Insurance Policy',
  () => {
    const url = `${baseUrl}${ENTER_CODE}`;

    before(() => {
      cy.deleteAccount();

      cy.navigateToCheckIfEligibleUrl();

      cy.submitEligibilityAndStartAccountCreation();
      cy.completeAndSubmitCreateAccountForm();
    });

    beforeEach(() => {
      cy.saveSession();
    });

    describe('when the account is verified', () => {
      before(() => {
        cy.verifyAccountEmail();

        cy.completeAndSubmitSignInAccountForm({});

        cy.assertUrl(url);
      });

      it('renders core page elements', () => {
        cy.corePageChecks({
          pageTitle: CONTENT_STRINGS.PAGE_TITLE,
          currentHref: ENTER_CODE,
          backLink: SIGN_IN_ROOT,
          assertAuthenticatedHeader: false,
          assertSaveAndBackButtonDoesNotExist: true,
        });
      });

      describe('page tests', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('renders `access code` label and input', () => {
          const fieldId = ACCESS_CODE;
          const field = fieldSelector(fieldId);

          cy.checkText(field.label(), FIELD_STRINGS.LABEL);

          cy.checkClassName(field.input(), 'govuk-input govuk-input--width-4 govuk-input--extra-letter-spacing');
        });

        it('renders a `request new code` link', () => {
          const expectedHref = CONTENT_STRINGS.REQUEST_NEW_CODE.HREF;
          const expectedText = CONTENT_STRINGS.REQUEST_NEW_CODE.TEXT;

          cy.checkLink(enterCodePage.requestNewCodeLink(), expectedHref, expectedText);
        });

        describe('when clicking `request new code`', () => {
          it(`should re-direct to ${REQUEST_NEW_CODE}`, () => {
            enterCodePage.requestNewCodeLink().click();

            const expectedUrl = `${baseUrl}${REQUEST_NEW_CODE}`;

            cy.assertUrl(expectedUrl);
          });
        });
      });
    });
  },
);
