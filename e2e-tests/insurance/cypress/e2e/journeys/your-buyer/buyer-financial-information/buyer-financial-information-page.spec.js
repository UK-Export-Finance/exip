import {
  headingCaption, yesRadio, noRadio,
} from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { buyerFinancialInformationPage } from '../../../../../../pages/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.BUYER_FINANCIAL_INFORMATION;

const {
  YOUR_BUYER: {
    BUYER_FINANCIAL_INFORMATION, CHECK_YOUR_ANSWERS, TRADED_WITH_BUYER,
  },
} = ROUTES.INSURANCE;

const { HAS_BUYER_FINANCIAL_ACCOUNTS: FIELD_ID } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const ERROR_MESSAGE = ERRORS[FIELD_ID];

context('Insurance - Your Buyer - Buyer financial information - As an exporter, I want to provide the details on the buyer of my export trade, So that UKEF can gain clarity on the buyer history as part of due diligence', () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`;
      checkYourAnswersUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.startInsuranceYourBuyerSection({});
      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({});

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
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

    it('should display summary text with collapsed conditional `details` content', () => {
      cy.checkText(buyerFinancialInformationPage.summary(), CONTENT_STRINGS.SUMMARY);

      buyerFinancialInformationPage.details().should('not.have.attr', 'open');
    });

    describe('when clicking the summary text', () => {
      it('should expand the collapsed `details` content', () => {
        buyerFinancialInformationPage.summary().click();

        buyerFinancialInformationPage.details().should('have.attr', 'open');

        cy.checkText(buyerFinancialInformationPage.line1(), CONTENT_STRINGS.LOOK_INTO_BUYER);
        cy.checkText(buyerFinancialInformationPage.line2(), CONTENT_STRINGS.SHARING);
        cy.checkText(buyerFinancialInformationPage.line3(), CONTENT_STRINGS.DO_NOT_HAVE_TO_SHARE);
      });
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
      it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
        cy.completeAndSubmitBuyerFinancialInformationForm({ exporterHasBuyerFinancialAccounts: true });

        cy.assertUrl(checkYourAnswersUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.assertYesRadioOptionIsChecked();
        });
      });
    });

    describe('when submitting the form as "no"', () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
        cy.completeAndSubmitBuyerFinancialInformationForm({});

        cy.assertUrl(checkYourAnswersUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.assertNoRadioOptionIsChecked();
        });
      });
    });
  });
});
