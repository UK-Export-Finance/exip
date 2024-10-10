import { summaryList } from '../../../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import application from '../../../../../../../../fixtures/application';
import { EUR, NON_STANDARD_CURRENCY_CODE, NON_STANDARD_CURRENCY_NAME, SYMBOLS } from '../../../../../../../../fixtures/currencies';
import formatCurrency from '../../../../../../../../helpers/format-currency';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
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
  'Insurance - Change your answers - Export contract - Summary list - Currency of agent charges - Alternative currency - As an exporter, I want to change my answers to the export contract section',
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({
          referenceNumber,
          isUsingAgent: true,
          agentIsCharging: true,
          agentChargeMethodFixedSum: true,
        });

        cy.clickTaskCheckAnswers();

        // To get past previous "Check your answers" pages
        cy.completeAndSubmitMultipleCheckYourAnswers({ count: 3 });

        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;

        cy.assertUrl(checkYourAnswersUrl);
      });
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(checkYourAnswersUrl);
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe(`changing ${CURRENCY_CODE} to an alternative currency (${NON_STANDARD_CURRENCY_CODE})`, () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(CURRENCY_CODE).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });
      });

      it(`should redirect to ${EXPORT_CONTRACT}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: CURRENCY_CODE });
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

        cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: currencyCode });
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
