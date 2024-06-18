import { summaryList } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import application from '../../../../../../../../fixtures/application';
import { EUR_CURRENCY_CODE, NON_STANDARD_CURRENCY_CODE, SYMBOLS } from '../../../../../../../../fixtures/currencies';
import formatCurrency from '../../../../../../../../helpers/format-currency';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    EXPORT_CONTRACT,
  },
  EXPORT_CONTRACT: { AGENT_CHARGES_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const fieldId = FIXED_SUM_AMOUNT;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Change your answers - Export contract - Summary list - Agent charges - ${FIXED_SUM_AMOUNT} - As an exporter, I want to change my answers to an alternative currency`, () => {
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

      task.link().click();

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

  describe(`changing ${PAYABLE_COUNTRY_CODE} to ${SYMBOLS.EUR}`, () => {
    const currencyCode = EUR_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_CHARGES_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHECK_AND_CHANGE, fieldId });
      });
    });

    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: EUR_CURRENCY_CODE });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHECK_AND_CHANGE });

      // submit the AGENT_CHARGES form
      cy.clickSubmitButton();
    });

    it(`should redirect to ${AGENT_CHARGES_CHECK_AND_CHANGE} and then ${EXPORT_CONTRACT}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT });
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
      it(`should redirect to ${AGENT_CHARGES_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHECK_AND_CHANGE, fieldId });
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

      it(`should redirect to ${AGENT_CHARGES_CHECK_AND_CHANGE} and then ${EXPORT_CONTRACT}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT });
      });

      it(`should render the new answer for ${FIXED_SUM_AMOUNT}`, () => {
        const row = summaryList.field(FIXED_SUM_AMOUNT);
        const expected = formatCurrency(application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT], currencyCode);

        cy.checkText(row.value(), expected);
      });
    });
  });
});
