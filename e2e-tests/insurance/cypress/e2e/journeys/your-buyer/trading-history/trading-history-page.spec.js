import {
  headingCaption, hint, saveAndBackButton, yesRadio, noRadio, field,
} from '../../../../../../pages/shared';
import { BUTTONS, PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { ROUTES, FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.TRADING_HISTORY;

const {
  YOUR_BUYER: { TRADING_HISTORY },
} = ROUTES.INSURANCE;

const { OUTSTANDING_PAYMENTS, FAILED_PAYMENTS } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

context('Insurance - Your Buyer - Trading history page - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have trading history with the buyer as part of due diligence', () => {
  let referenceNumber;
  let url;
  // let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      // cy.completeAndSubmitCompanyOrOrganisationForm({});
      // cy.completeAndSubmitConnectionToTheBuyerForm({});

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY}`;
      // checkYourAnswersUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a hint', () => {
      cy.checkText(hint(), CONTENT_STRINGS.HINT);
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

  // describe('form submission', () => {
  //   beforeEach(() => {
  //     cy.navigateToUrl(url);
  //   });

  //   describe('when submitting the form as "yes"', () => {
  //     it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
  //       cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

  //       cy.assertUrl(checkYourAnswersUrl);
  //     });

  //     describe('when going back to the page', () => {
  //       it('should have the submitted values', () => {
  //         cy.navigateToUrl(url);

  //         yesRadioInput().should('be.checked');
  //       });
  //     });
  //   });

  //   describe('when submitting the form as "no"', () => {
  //     it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
  //       cy.completeAndSubmitTradedWithBuyerForm({});

  //       cy.assertUrl(checkYourAnswersUrl);
  //     });

  //     describe('when going back to the page', () => {
  //       it('should have the submitted values', () => {
  //         cy.navigateToUrl(url);

  //         noRadioInput().should('be.checked');
  //       });
  //     });
  //   });
  // });
});
