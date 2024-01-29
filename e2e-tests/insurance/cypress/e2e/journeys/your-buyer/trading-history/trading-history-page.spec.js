import {
  headingCaption, intro, saveAndBackButton, yesRadio, noRadio, field, noRadioInput,
} from '../../../../../../pages/shared';
import { BUTTONS, PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.TRADING_HISTORY;

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const { OUTSTANDING_PAYMENTS, FAILED_PAYMENTS } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Trading history page - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have trading history with the buyer as part of due diligence', () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      // TODO: EMS-2659 - use buyer commands to get here
      cy.navigateToUrl(url);

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${TRADING_HISTORY}`,
      backLink: `${ROOT}/${referenceNumber}${TRADING_HISTORY}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders an intro', () => {
      cy.checkText(intro(), CONTENT_STRINGS.INTRO);
    });

    describe(OUTSTANDING_PAYMENTS, () => {
      const FIELD_ID = OUTSTANDING_PAYMENTS;

      it('renders a label', () => {
        cy.checkText(field(FIELD_ID).legend(), FIELDS[FIELD_ID].LABEL);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().first().should('exist');

        cy.checkText(yesRadio().label().first(), FIELD_VALUES.YES);
      });

      it('renders `no` radio button', () => {
        noRadio().input().first().should('exist');

        cy.checkText(noRadio().label().first(), FIELD_VALUES.NO);
      });
    });

    describe(FAILED_PAYMENTS, () => {
      const FIELD_ID = FAILED_PAYMENTS;

      it('renders a label', () => {
        cy.checkText(field(FIELD_ID).legend(), FIELDS[FIELD_ID].LABEL);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().first().should('exist');

        cy.checkText(yesRadio().label().first(), FIELD_VALUES.YES);
      });

      it('renders `no` radio button', () => {
        noRadio().input().first().should('exist');

        cy.checkText(noRadio().label().first(), FIELD_VALUES.NO);
      });
    });

    it('renders a `save and back` button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        const expectedErrorsCount = 2;

        cy.submitAndAssertRadioErrors(
          yesRadio(OUTSTANDING_PAYMENTS),
          0,
          expectedErrorsCount,
          ERRORS[OUTSTANDING_PAYMENTS].IS_EMPTY,
        );

        cy.submitAndAssertRadioErrors(
          yesRadio(FAILED_PAYMENTS),
          1,
          expectedErrorsCount,
          ERRORS[FAILED_PAYMENTS].IS_EMPTY,
        );
      });
    });

    describe('when submitting a fully filled form', () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitTradingHistoryWithBuyerForm({});

        cy.assertUrl(checkYourAnswersUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          noRadioInput().first().should('be.checked');
          noRadioInput().last().should('be.checked');
        });
      });
    });
  });
});
