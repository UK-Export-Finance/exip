import {
  headingCaption, yesRadio, noRadio, field,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.TRADING_HISTORY;

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY, CHECK_YOUR_ANSWERS, ALTERNATIVE_CURRENCY },
} = INSURANCE_ROUTES;

const {
  OUTSTANDING_PAYMENTS, FAILED_PAYMENTS, TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS,
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const { BUYER } = application;

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

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

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
      cy.checkIntroText(CONTENT_STRINGS.INTRO);
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

    describe(`${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
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

        it(`should not render a label for ${TOTAL_AMOUNT_OVERDUE}`, () => {
          field(TOTAL_AMOUNT_OVERDUE).label().should('not.be.visible');
        });

        it(`should not render an input for ${TOTAL_AMOUNT_OVERDUE}`, () => {
          field(TOTAL_AMOUNT_OVERDUE).input().should('not.be.visible');
        });
      });

      describe(`when clicking the 'yes' ${OUTSTANDING_PAYMENTS} radio`, () => {
        beforeEach(() => {
          cy.clickYesRadioInput();
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

        it(`should render a label for ${TOTAL_AMOUNT_OVERDUE}`, () => {
          cy.checkText(field(TOTAL_AMOUNT_OVERDUE).label(), FIELDS[TOTAL_AMOUNT_OVERDUE].LABEL);
        });

        it(`should render an input for ${TOTAL_AMOUNT_OVERDUE}`, () => {
          field(TOTAL_AMOUNT_OVERDUE).input().should('be.visible');
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
      cy.assertSaveAndBackButton();
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

            cy.assertNoRadioOptionIsChecked(0);
            cy.assertNoRadioOptionIsChecked(1);
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

            cy.assertYesRadioOptionIsChecked(0);

            cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), BUYER[TOTAL_OUTSTANDING_PAYMENTS]);
            cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), BUYER[TOTAL_AMOUNT_OVERDUE]);

            cy.assertNoRadioOptionIsChecked(1);
          });
        });
      });

      describe(`changing ${OUTSTANDING_PAYMENTS} from "yes" to "no"`, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          // submit OUTSTANDING_PAYMENTS as yes
          cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });

          cy.navigateToUrl(url);

          // change OUTSTANDING_PAYMENTS to no
          cy.completeAndSubmitTradingHistoryWithBuyerForm({});
        });

        describe('when going back to the page', () => {
          it(`should have the submitted values and have removed data from ${TOTAL_OUTSTANDING_PAYMENTS} and ${TOTAL_AMOUNT_OVERDUE}`, () => {
            cy.navigateToUrl(url);

            cy.assertNoRadioOptionIsChecked(0);

            // click first radio input to display optional fields
            cy.clickYesRadioInput();

            cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), '');
            cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), '');
          });
        });
      });
    });
  });
});
