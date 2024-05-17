import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import application from '../../../../../../../fixtures/application';
import { EUR_CURRENCY_CODE, NON_STANDARD_CURRENCY_CODE, SYMBOLS } from '../../../../../../../fixtures/currencies';
import formatCurrency from '../../../../../../../helpers/format-currency';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    AGENT_CHARGES_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

const fieldId = PAYABLE_COUNTRY_CODE;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Export contract - Change your answers - Agent charges - ${FIXED_SUM_AMOUNT} - As an exporter, I want to change my answers to an alternative currency`, () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: true,
        agentIsCharging: true,
        agentChargeMethodFixedSum: true,
      });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`changing ${PAYABLE_COUNTRY_CODE} to ${SYMBOLS.EUR}`, () => {
    const currencyCode = EUR_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_CHARGES_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHANGE, fieldId });
      });
    });

    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: EUR_CURRENCY_CODE });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHANGE });

      // submit the AGENT_CHARGES form
      cy.clickSubmitButton();
    });

    it(`should redirect to ${AGENT_CHARGES_CHANGE} and then ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS });
    });

    it(`should render the new answer for ${FIXED_SUM_AMOUNT} including ${SYMBOLS.EUR}`, () => {
      const row = summaryList.field(FIXED_SUM_AMOUNT);
      const expected = formatCurrency(application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT], currencyCode);

      cy.checkText(row.value(), expected);
    });
  });

  describe(`changing ${PAYABLE_COUNTRY_CODE} to an alternative currency`, () => {
    const currencyCode = NON_STANDARD_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_CHARGES_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });

        // submit AGENT_CHARGES form
        cy.clickSubmitButton();
      });

      it(`should redirect to ${AGENT_CHARGES_CHANGE} and then ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS });
      });

      it(`should render the new answer for ${FIXED_SUM_AMOUNT}`, () => {
        const row = summaryList.field(FIXED_SUM_AMOUNT);
        const expected = formatCurrency(application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT], currencyCode);

        cy.checkText(row.value(), expected);
      });
    });
  });
});
