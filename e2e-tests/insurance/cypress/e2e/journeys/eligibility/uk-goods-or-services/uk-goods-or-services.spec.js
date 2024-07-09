import { yesNoRadioHint, yesRadio, noRadio } from '../../../../../../pages/shared';
import { FIELDS, PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  checkCalculateDescriptionSummaryText,
  checkCalculateDescriptionSummaryClickRevealsContent,
  checkCalculateDescriptionDescriptionContent,
} from '../../../../../../commands/shared-commands/assertions/check-uk-goods-and-services-calculate-description';
import {
  checkDescriptionSummaryText,
  checkDescriptionSummaryClickRevealsContent,
  checkDescriptionContent,
} from '../../../../../../commands/shared-commands/assertions/check-uk-goods-and-services-description';

const CONTENT_STRINGS = PAGES.UK_GOODS_OR_SERVICES;

const {
  ELIGIBILITY: { HAS_MINIMUM_UK_GOODS_OR_SERVICES: FIELD_ID },
} = FIELD_IDS;

const {
  ELIGIBILITY: { UK_GOODS_OR_SERVICES, END_BUYER, COVER_PERIOD },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF credit insurance cover', () => {
  const url = `${baseUrl}${UK_GOODS_OR_SERVICES}`;

  before(() => {
    cy.navigateToCheckIfEligibleUrl();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitTotalValueInsuredForm({});
    cy.completeCoverPeriodForm({});

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: UK_GOODS_OR_SERVICES,
      backLink: COVER_PERIOD,
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

      cy.checkText(yesNoRadioHint(), FIELDS[FIELD_ID].HINT);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      cy.checkText(noRadio().label(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    describe('expandable details - how to calculate percentage', () => {
      it('renders summary text', () => {
        checkCalculateDescriptionSummaryText();
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `details` content', () => {
          checkCalculateDescriptionSummaryClickRevealsContent();

          checkCalculateDescriptionDescriptionContent();
        });
      });
    });

    describe('expandable details - what counts as UK goods and services', () => {
      it('renders summary text', () => {
        checkDescriptionSummaryText();
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `details` content', () => {
          checkDescriptionSummaryClickRevealsContent();

          checkDescriptionContent();
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

      cy.submitAndAssertRadioErrors({
        field: yesRadio(FIELD_ID),
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES.ELIGIBILITY[FIELD_ID].IS_EMPTY,
      });
    });
  });

  describe('when submitting the answer as `yes`', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();
      cy.clickSubmitButton();
    });

    it(`should redirect to ${END_BUYER}`, () => {
      const expectedUrl = `${baseUrl}${END_BUYER}`;

      cy.assertUrl(expectedUrl);
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        cy.clickBackLink();

        cy.assertYesRadioOptionIsChecked();
      });
    });
  });
});
