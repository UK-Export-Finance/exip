import {
  submitButton, inlineErrorMessage, yesRadioInput, yesRadio, yesNoRadioHint, noRadio,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  ERROR_MESSAGES,
  FIELDS,
  PAGES,
} from '../../../../../../content-strings';
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
  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAnswersHappyPath();

    const expected = `${Cypress.config('baseUrl')}${ACCOUNT_TO_APPLY_ONLINE}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ACCOUNT_TO_APPLY_ONLINE,
      backLink: ELIGIBLE_TO_APPLY_ONLINE,
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', START);
  });

  it('renders yes and no radio buttons with a hint', () => {
    yesRadio().should('exist');

    cy.checkText(yesRadio(), 'Yes');

    noRadio().should('exist');

    cy.checkText(noRadio(), 'No');

    cy.checkText(yesNoRadioHint(), FIELDS[FIELD_ID].HINT);
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY;

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${SIGN_IN.ROOT}`, () => {
        yesRadioInput().click();
        submitButton().click();

        const expected = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;
        cy.url().should('eq', expected);
      });
    });
  });
});
