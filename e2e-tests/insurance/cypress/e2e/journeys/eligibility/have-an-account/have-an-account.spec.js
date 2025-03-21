import { yesRadio, yesNoRadioHint, noRadio } from '../../../../../../pages/shared';
import { ERROR_MESSAGES, FIELDS, PAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: { ELIGIBLE_TO_APPLY_ONLINE, HAVE_AN_ACCOUNT },
  ACCOUNT: { SIGN_IN },
} = ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.HAVE_AN_ACCOUNT;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Have an account page - I want to confirm that I have an account for UKEF digital service so that I can get guidance on how to sign in to my digital account that I can use for UKEF Export Insurance Applications',
  () => {
    let url;

    before(() => {
      cy.navigateToCheckIfEligibleUrl();

      cy.submitInsuranceEligibilityAnswersHappyPath();

      url = `${baseUrl}${HAVE_AN_ACCOUNT}`;

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: HAVE_AN_ACCOUNT,
        backLink: ELIGIBLE_TO_APPLY_ONLINE,
        assertAuthenticatedHeader: false,
        assertSaveAndBackButtonDoesNotExist: true,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a `yes` radio button with a hint', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkText(yesNoRadioHint(), FIELDS[FIELD_ID].HINT);

        cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });

      it('renders a `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          cy.clickSubmitButton();
        });

        it('should render validation errors', () => {
          cy.submitAndAssertRadioErrors({
            field: yesRadio(FIELD_ID),
            expectedErrorMessage: ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY,
          });
        });
      });

      describe('when submitting the answer as `yes`', () => {
        it(`should redirect to ${SIGN_IN.ROOT}`, () => {
          cy.navigateToUrl(url);

          cy.clickYesRadioInput();
          cy.clickSubmitButton();

          const expected = `${baseUrl}${SIGN_IN.ROOT}`;
          cy.assertUrl(expected);
        });
      });
    });
  },
);
