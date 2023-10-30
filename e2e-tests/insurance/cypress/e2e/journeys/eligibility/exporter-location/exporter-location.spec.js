import {
  yesRadio, yesRadioInput, noRadio, submitButton,
} from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.EXPORTER_LOCATION;

const {
  START,
  ELIGIBILITY: {
    CHECK_IF_ELIGIBLE,
    EXPORTER_LOCATION,
    COMPANIES_HOUSE_NUMBER,
  },
} = INSURANCE_ROUTES;

const {
  ELIGIBILITY: { VALID_EXPORTER_LOCATION: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Exporter location page - as an exporter, I want to check if my company can get UKEF issue export insurance cover', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();

    const expectedUrl = `${baseUrl}${EXPORTER_LOCATION}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: EXPORTER_LOCATION,
      backLink: CHECK_IF_ELIGIBLE,
      assertAuthenticatedHeader: false,
    });
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

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        const expectedErrorsCount = 1;

        cy.submitAndAssertRadioErrors(
          yesRadio(FIELD_ID),
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.ELIGIBILITY[FIELD_ID],
        );

        submitButton().click();
      });
    });

    describe('when submitting the answer as `yes`', () => {
      beforeEach(() => {
        yesRadio().input().click();
        submitButton().click();
      });

      it(`should redirect to ${COMPANIES_HOUSE_NUMBER}`, () => {
        const expectedUrl = `${baseUrl}${COMPANIES_HOUSE_NUMBER}`;

        cy.assertUrl(expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          yesRadioInput().should('be.checked');
        });
      });
    });
  });
});
