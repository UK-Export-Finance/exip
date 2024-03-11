import { field, summaryList } from '../../../../../../pages/shared';
import { GBP_CURRENCY_CODE } from '../../../../../../constants';
import { NON_STANDARD_CURRENCY_CODE } from '../../../../../../fixtures/currencies';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import formatCurrency from '../../../../../../helpers/format-currency';

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    TURNOVER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Change your answers - Turnover - As an exporter, I want to change my answers to the turnover section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitCreditControlForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(ESTIMATED_ANNUAL_TURNOVER, () => {
    const fieldId = ESTIMATED_ANNUAL_TURNOVER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TURNOVER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TURNOVER_CHANGE, fieldId: ESTIMATED_ANNUAL_TURNOVER });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '455445';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newAnswer);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        const expectedValue = formatCurrency(newAnswer, GBP_CURRENCY_CODE);

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedValue);
      });
    });
  });

  describe(`${ESTIMATED_ANNUAL_TURNOVER} change currency`, () => {
    const fieldId = ESTIMATED_ANNUAL_TURNOVER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TURNOVER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TURNOVER_CHANGE, fieldId: ESTIMATED_ANNUAL_TURNOVER });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '455445';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS });
      });

      it('should render the new answer', () => {
        const currency = NON_STANDARD_CURRENCY_CODE;
        const expectedValue = formatCurrency(newAnswer, currency);

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedValue);
      });
    });
  });

  describe(PERCENTAGE_TURNOVER, () => {
    const fieldId = PERCENTAGE_TURNOVER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TURNOVER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TURNOVER_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '85';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newAnswer);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, `${newAnswer}%`);
      });
    });
  });
});
