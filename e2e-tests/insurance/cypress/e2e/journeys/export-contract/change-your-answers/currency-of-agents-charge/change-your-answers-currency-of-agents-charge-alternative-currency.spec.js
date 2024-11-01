import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';
import { EUR, NON_STANDARD_CURRENCY_CODE, NON_STANDARD_CURRENCY_NAME, SYMBOLS } from '../../../../../../../fixtures/currencies';
import formatCurrency from '../../../../../../../helpers/format-currency';

const {
  ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { FIXED_SUM_AMOUNT },
  },
} = INSURANCE_FIELD_IDS;

const currencyAssertion = {
  row: summaryList.field(CURRENCY_CODE),
  expected: '',
};

const amountAssertion = {
  row: summaryList.field(FIXED_SUM_AMOUNT),
  expected: '',
};

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - Change your answers - Currency of agent charges - Alternative currency - As an exporter, I want to change my answers to the export contract section',
  () => {
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

    describe(`changing ${CURRENCY_CODE} to an alternative currency (${NON_STANDARD_CURRENCY_CODE})`, () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(CURRENCY_CODE).changeLink().click();

        cy.completeAndSubmitCurrencyForm({ alternativeCurrency: true });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: CURRENCY_CODE });
      });

      it(`should render the new answer for ${CURRENCY_CODE} and ${FIXED_SUM_AMOUNT}`, () => {
        currencyAssertion.expected = NON_STANDARD_CURRENCY_NAME;

        cy.checkText(currencyAssertion.row.value(), currencyAssertion.expected);

        amountAssertion.expected = formatCurrency(application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT], NON_STANDARD_CURRENCY_CODE);

        cy.checkText(amountAssertion.row.value(), amountAssertion.expected);
      });
    });

    describe(`changing ${CURRENCY_CODE} from an alternative currency to ${SYMBOLS.EUR}`, () => {
      const currencyCode = EUR.isoCode;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(CURRENCY_CODE).changeLink().click();

        cy.completeAndSubmitCurrencyForm({ isoCode: currencyCode });
      });

      it(`should render the new answer for ${CURRENCY_CODE} and ${FIXED_SUM_AMOUNT}`, () => {
        currencyAssertion.expected = EUR.name;

        cy.checkText(currencyAssertion.row.value(), currencyAssertion.expected);

        amountAssertion.expected = formatCurrency(application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT], currencyCode);

        cy.checkText(amountAssertion.row.value(), amountAssertion.expected);
      });
    });
  },
);
