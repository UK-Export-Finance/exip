import {
  yesNoRadioHint, yesRadio, noRadio, noRadioInput, submitButton,
} from '../../../../../../pages/shared';
import { endBuyerPage } from '../../../../../../pages/insurance/eligibility';
import { PAGES, END_BUYERS_DESCRIPTION, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELDS_ELIGIBILITY } from '../../../../../../content-strings/fields/insurance/eligibility';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.END_BUYER;

const {
  ELIGIBILITY: { HAS_END_BUYER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  START,
  ELIGIBILITY: {
    END_BUYER, UK_GOODS_OR_SERVICES, CHECK_YOUR_ANSWERS, CANNOT_APPLY_MULTIPLE_RISKS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - End buyer page - as an exporter, I want to confirm if payment by the buyer of my export depends on payment from an end buyer, So that UKEF can have clarity of my export transaction', () => {
  const url = `${baseUrl}${END_BUYER}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitTotalValueInsuredForm({});
    cy.completeCoverPeriodForm({});
    cy.completeUkGoodsAndServicesForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: END_BUYER,
      backLink: UK_GOODS_OR_SERVICES,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `yes` radio button', () => {
      yesRadio().input().should('exist');

      cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

      cy.checkText(yesNoRadioHint(), FIELDS_ELIGIBILITY[FIELD_ID].HINT);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      cy.checkText(noRadio().label(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    describe('expandable details - why do we need to know about end buyers', () => {
      it('renders summary text', () => {
        cy.checkText(endBuyerPage.summary(), END_BUYERS_DESCRIPTION.INTRO);

        endBuyerPage.details().should('not.have.attr', 'open');
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `details` content', () => {
          endBuyerPage.summary().click();
          endBuyerPage.details().should('have.attr', 'open');

          cy.checkText(endBuyerPage.list.intro(), END_BUYERS_DESCRIPTION.LIST_INTRO);
          cy.checkText(endBuyerPage.list.item(1), END_BUYERS_DESCRIPTION.LIST[0]);
          cy.checkText(endBuyerPage.list.item(2), END_BUYERS_DESCRIPTION.LIST[1]);

          cy.checkText(endBuyerPage.outro.singleRiskOnly(), END_BUYERS_DESCRIPTION.OUTRO.SINGLE_RISK_ONLY);
          cy.checkText(endBuyerPage.outro.tryingMultipleRisk(), END_BUYERS_DESCRIPTION.OUTRO.IF_TRYING_MULTIPLE_RISKS);

          cy.checkActionTalkToYourNearestEFMLink({});

          cy.checkText(endBuyerPage.outro.toFindOutMore(), END_BUYERS_DESCRIPTION.OUTRO.TO_FIND_OUT_MORE);
        });
      });
    });
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render validation errors', () => {
      const expectedErrorsCount = 1;

      cy.submitAndAssertRadioErrors(
        yesRadio(FIELD_ID),
        0,
        expectedErrorsCount,
        ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY,
      );
    });
  });

  describe('when submitting the answer as `No`', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      noRadio().input().click();
      submitButton().click();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(expectedUrl);
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        cy.clickBackLink();

        noRadioInput().should('be.checked');
      });
    });
  });

  describe('when submitting the answer as `yes`', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      yesRadio().input().click();
      submitButton().click();
    });

    it(`should redirect to ${CANNOT_APPLY_MULTIPLE_RISKS}`, () => {
      const expectedUrl = `${baseUrl}${CANNOT_APPLY_MULTIPLE_RISKS}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
