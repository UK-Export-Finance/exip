import {
  headingCaption, yesRadio, noRadio,
} from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.TRADED_WITH_BUYER;

const {
  YOUR_BUYER: {
    CONNECTION_WITH_BUYER, TRADED_WITH_BUYER, TRADING_HISTORY, BUYER_FINANCIAL_INFORMATION,
  },
} = ROUTES.INSURANCE;

const { TRADED_WITH_BUYER: FIELD_ID } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const ERROR_MESSAGE = ERRORS[FIELD_ID];

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Traded with buyer page - As an exporter, I want to confirm my buyer details', () => {
  let referenceNumber;
  let url;
  let tradingHistoryUrl;
  let buyerFinancialInformationUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`;
      tradingHistoryUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY}`;
      buyerFinancialInformationUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders `yes` and `no` radio buttons in the correct order', () => {
      cy.assertYesNoRadiosOrder({ noRadioFirst: true });
    });

    it('renders `yes` radio button', () => {
      yesRadio().input().should('exist');

      cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      noRadio().input().should('exist');

      cy.checkText(noRadio().label(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render validation errors', () => {
      const expectedErrorsCount = 1;

      cy.submitAndAssertRadioErrors(
        noRadio(FIELD_ID),
        0,
        expectedErrorsCount,
        ERROR_MESSAGE.IS_EMPTY,
      );
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe('when submitting the form as "yes"', () => {
      it(`should redirect to ${TRADING_HISTORY} page`, () => {
        cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

        cy.assertUrl(tradingHistoryUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.assertYesRadioOptionIsChecked();
        });
      });
    });

    describe('when submitting the form as "no"', () => {
      it(`should redirect to ${BUYER_FINANCIAL_INFORMATION} page`, () => {
        cy.completeAndSubmitTradedWithBuyerForm({});

        cy.assertUrl(buyerFinancialInformationUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.assertNoRadioOptionIsChecked();
        });
      });
    });
  });
});
