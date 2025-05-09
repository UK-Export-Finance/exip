import { yesRadio, noRadio } from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM;

const {
  ELIGIBILITY: { IS_PARTY_TO_CONSORTIUM: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  ELIGIBILITY: { END_BUYER, PARTY_TO_CONSORTIUM, PARTY_TO_CONSORTIUM_EXIT, MEMBER_OF_A_GROUP },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Party to a consortium page - As a Legal adviser, I want to know whether an Exporter used or will use a consortium as part of their export contract, So that I know whether other parties are involved in the execution of the export contract',
  () => {
    const url = `${baseUrl}${PARTY_TO_CONSORTIUM}`;

    before(() => {
      cy.completeAndSubmitEligibilityForms({ stopSubmittingAfter: 'endBuyer' });

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: PARTY_TO_CONSORTIUM,
        backLink: END_BUYER,
        assertAuthenticatedHeader: false,
        assertSaveAndBackButtonDoesNotExist: true,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });

      it('renders `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });
    });

    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        cy.submitAndAssertRadioErrors({
          field: yesRadio(FIELD_ID),
          expectedErrorMessage: ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY,
        });
      });
    });

    describe('when submitting the answer as `No`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.clickNoRadioInput();
        cy.clickSubmitButton();
      });

      it(`should redirect to ${MEMBER_OF_A_GROUP}`, () => {
        const expectedUrl = `${baseUrl}${MEMBER_OF_A_GROUP}`;

        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          cy.assertNoRadioOptionIsChecked();
        });
      });
    });

    describe('when submitting the answer as `yes`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.clickYesRadioInput();
        cy.clickSubmitButton();
      });

      it(`should redirect to ${PARTY_TO_CONSORTIUM_EXIT}`, () => {
        const expectedUrl = `${baseUrl}${PARTY_TO_CONSORTIUM_EXIT}`;

        cy.assertUrl(expectedUrl);
      });
    });
  },
);
