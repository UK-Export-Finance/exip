import {
  headingCaption, yesRadio, noRadio, field as fieldSelector,
} from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELD_STRINGS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CREDIT_INSURANCE_COVER;

const { BUYER } = application;

const {
  ROOT,
  YOUR_BUYER: { CREDIT_INSURANCE_COVER, BUYER_FINANCIAL_INFORMATION, TRADING_HISTORY },
} = INSURANCE_ROUTES;

const {
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Credit insurance cover page - As an exporter, I want to provide information, So that UKEF can better understand the risk undertaken if I am given insurance cover', () => {
  let referenceNumber;
  let url;
  let buyerFinancialInformationUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`;
      buyerFinancialInformationUrl = `${baseUrl}${ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`;

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      cy.completeAndSubmitTradingHistoryWithBuyerForm({});

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
      currentHref: `${ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`,
      backLink: `${ROOT}/${referenceNumber}${TRADING_HISTORY}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe(`renders ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} label and inputs`, () => {
      const fieldId = HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

      it('renders `yes` and `no` radio buttons in the correct order', () => {
        cy.assertYesNoRadiosOrder({ noRadioFirst: true });
      });

      it('renders `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(FIELD_STRINGS[fieldId].LABEL);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkRadioInputYesAriaLabel(FIELD_STRINGS[fieldId].LABEL);
      });

      it('renders a `save and back` button', () => {
        cy.assertSaveAndBackButton();
      });
    });

    describe(PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, () => {
      const fieldId = PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;
      const field = fieldSelector(fieldId);

      it('should NOT by visible by default', () => {
        field.textarea().should('not.be.visible');
      });

      describe(`when clicking ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} 'yes' radio`, () => {
        it(`should render ${fieldId} textarea`, () => {
          cy.clickYesRadioInput();

          const fieldStrings = FIELD_STRINGS[fieldId];

          cy.assertTextareaRendering({
            fieldId,
            expectedLabel: fieldStrings.LABEL,
            maximumCharacters: fieldStrings.MAXIMUM,
          });
        });
      });
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe(`when submitting the form with ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} as "no"`, () => {
      it(`should redirect to ${BUYER_FINANCIAL_INFORMATION} page`, () => {
        cy.completeAndSubmitCreditInsuranceCoverForm({});

        cy.assertUrl(buyerFinancialInformationUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.assertNoRadioOptionIsChecked();
        });
      });
    });

    describe(`when submitting the form with ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} as "yes"`, () => {
      it(`should redirect to ${BUYER_FINANCIAL_INFORMATION} page`, () => {
        cy.completeAndSubmitCreditInsuranceCoverForm({ hasHadCreditInsuranceCover: true });

        cy.assertUrl(buyerFinancialInformationUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.assertYesRadioOptionIsChecked();

          const field = fieldSelector(PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER).textarea();

          cy.checkText(field, BUYER[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]);
        });
      });
    });

    describe(`changing ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} from "yes" to "no"`, () => {
      it(`should redirect to ${BUYER_FINANCIAL_INFORMATION} page`, () => {
        cy.completeAndSubmitCreditInsuranceCoverForm({ hasHadCreditInsuranceCover: true });
        cy.assertUrl(buyerFinancialInformationUrl);

        // resubmit as no
        cy.navigateToUrl(url);
        cy.completeAndSubmitCreditInsuranceCoverForm({});
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.assertNoRadioOptionIsChecked();

          cy.clickYesRadioInput();

          const field = fieldSelector(PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER).textarea();

          cy.checkText(field, '');
        });
      });
    });
  });
});
