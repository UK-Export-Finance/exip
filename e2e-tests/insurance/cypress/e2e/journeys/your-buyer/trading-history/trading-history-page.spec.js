import {
  headingCaption, intro, saveAndBackButton, yesRadio, noRadio, field, noRadioInput, yesRadioInput,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.TRADING_HISTORY;

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY, CHECK_YOUR_ANSWERS, ALTERNATIVE_CURRENCY },
} = INSURANCE_ROUTES;

const {
  OUTSTANDING_PAYMENTS, FAILED_PAYMENTS, TOTAL_OVERDUE_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS,
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Trading history page - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have trading history with the buyer as part of due diligence', () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;
  let alternativeCurrencyUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      alternativeCurrencyUrl = `${ROOT}/${referenceNumber}${ALTERNATIVE_CURRENCY}`;

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

    describe(`${TOTAL_OVERDUE_PAYMENTS} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
      describe(`when not selecting a ${OUTSTANDING_PAYMENTS} radio`, () => {
        it('should not render a heading', () => {
          field(TOTAL_OUTSTANDING_PAYMENTS).heading().should('not.be.visible');
        });

        it(`should not render a label for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
          field(TOTAL_OUTSTANDING_PAYMENTS).label().should('not.be.visible');
        });

        it(`should not render an input for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
          field(TOTAL_OUTSTANDING_PAYMENTS).input().should('not.be.visible');
        });

        it(`should not render a label for ${TOTAL_OVERDUE_PAYMENTS}`, () => {
          field(TOTAL_OVERDUE_PAYMENTS).label().should('not.be.visible');
        });

        it(`should not render an input for ${TOTAL_OVERDUE_PAYMENTS}`, () => {
          field(TOTAL_OVERDUE_PAYMENTS).input().should('not.be.visible');
        });
      });

      describe(`when clicking the 'yes' ${OUTSTANDING_PAYMENTS} radio`, () => {
        beforeEach(() => {
          yesRadioInput().first().click();
        });

        it('should render a heading', () => {
          cy.checkText(field(TOTAL_OUTSTANDING_PAYMENTS).heading(), FIELDS[TOTAL_OUTSTANDING_PAYMENTS].HEADING);
        });

        it(`should render a label for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
          cy.checkText(field(TOTAL_OUTSTANDING_PAYMENTS).label(), FIELDS[TOTAL_OUTSTANDING_PAYMENTS].LABEL);
        });

        it(`should render an input for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
          field(TOTAL_OUTSTANDING_PAYMENTS).input().should('be.visible');
        });

        it(`should render a label for ${TOTAL_OVERDUE_PAYMENTS}`, () => {
          cy.checkText(field(TOTAL_OVERDUE_PAYMENTS).label(), FIELDS[TOTAL_OVERDUE_PAYMENTS].LABEL);
        });

        it(`should render an input for ${TOTAL_OVERDUE_PAYMENTS}`, () => {
          field(TOTAL_OVERDUE_PAYMENTS).input().should('be.visible');
        });

        it('should render a hyperlink for changing the currency', () => {
          cy.checkLink(partials.provideAlternativeCurrencyLink(), alternativeCurrencyUrl, CONTENT_STRINGS.PROVIDE_ALTERNATIVE_CURRENCY);
        });
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
    describe('when submitting a fully filled form', () => {
      describe(`${OUTSTANDING_PAYMENTS} as "no"`, () => {
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

      describe(`${OUTSTANDING_PAYMENTS} as "yes"`, () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });

          cy.assertUrl(checkYourAnswersUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted values', () => {
            cy.navigateToUrl(url);

            yesRadioInput().first().should('be.checked');
            noRadioInput().last().should('be.checked');
          });
        });
      });
    });
  });
});
