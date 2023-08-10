import {
  submitButton, inlineErrorMessage, yesRadioInput, yesRadio, yesNoRadioHint, noRadio,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  ERROR_MESSAGES,
  FIELDS,
  PAGES,
} from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const {
  START,
  ELIGIBILITY: {
    ELIGIBLE_TO_APPLY_ONLINE, ACCOUNT_TO_APPLY_ONLINE,
  },
  ACCOUNT: { SIGN_IN },
} = ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE;

context('Insurance - Eligibility - Account to apply online page - I want to confirm that I have an account for UKEF digital servicel so that I can get guidance on how to sign in to my digital account that I can use for UKEF Export Insurance Applications', () => {
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAnswersHappyPath();

    url = `${Cypress.config('baseUrl')}${ACCOUNT_TO_APPLY_ONLINE}`;

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ACCOUNT_TO_APPLY_ONLINE,
      backLink: ELIGIBLE_TO_APPLY_ONLINE,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a `yes` radio button with a hint', () => {
      cy.checkText(yesRadio(), FIELD_VALUES.YES);

      cy.checkText(yesNoRadioHint(), FIELDS[FIELD_ID].HINT);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders a `no` radio button', () => {
      cy.checkText(noRadio(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        submitButton().click();
      });

      it('should render validation errors', () => {
        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = String(ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY);

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${SIGN_IN.ROOT}`, () => {
        cy.navigateToUrl(url);

        yesRadioInput().click();
        submitButton().click();

        const expected = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;
        cy.url().should('eq', expected);
      });
    });
  });
});
