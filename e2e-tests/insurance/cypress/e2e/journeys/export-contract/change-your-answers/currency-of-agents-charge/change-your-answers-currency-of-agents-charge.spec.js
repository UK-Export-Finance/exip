import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';
import { USD } from '../../../../../../../fixtures/currencies';
import formatCurrency from '../../../../../../../helpers/format-currency';

const {
  ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS, AGENT_CHARGES_CURRENCY_CHANGE },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { FIXED_SUM_AMOUNT },
  },
} = INSURANCE_FIELD_IDS;

const getFieldVariables = (fieldId, referenceNumber) => ({
  changeLink: summaryList.field(fieldId).changeLink,
  checkYourAnswersRoute: CHECK_YOUR_ANSWERS,
  fieldId,
  newValueInput: '',
  referenceNumber,
  route: AGENT_CHARGES_CURRENCY_CHANGE,
  summaryList,
});

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - Change your answers - Currency of agent charges - As an exporter, I want to change my answers to the export contract section',
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

    describe(CURRENCY_CODE, () => {
      const fieldId = CURRENCY_CODE;

      const fieldVariables = {
        ...getFieldVariables(fieldId, referenceNumber),
        newValueInput: USD.isoCode,
        newValue: USD.name,
      };

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${AGENT_CHARGES_CURRENCY_CHANGE}`, () => {
          cy.navigateToUrl(checkYourAnswersUrl);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CURRENCY_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        beforeEach(() => {
          cy.navigateToUrl(checkYourAnswersUrl);

          summaryList.field(fieldId).changeLink().click();

          cy.changeAnswerRadioField(fieldVariables);
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it(`should render the new answer for ${CURRENCY_CODE} and ${FIXED_SUM_AMOUNT}`, () => {
          cy.checkText(summaryList.field(CURRENCY_CODE).value(), USD.name);

          const expectedAmount = formatCurrency(application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT], USD.isoCode);

          cy.checkText(summaryList.field(FIXED_SUM_AMOUNT).value(), expectedAmount);
        });
      });
    });
  },
);
