import { summaryList } from '../../../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import application from '../../../../../../../../fixtures/application';
import { USD } from '../../../../../../../../fixtures/currencies';
import formatCurrency from '../../../../../../../../helpers/format-currency';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
  EXPORT_CONTRACT: { AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { FIXED_SUM_AMOUNT },
  },
} = INSURANCE_FIELD_IDS;

const getFieldVariables = (fieldId, referenceNumber) => ({
  changeLink: summaryList.field(fieldId).changeLink,
  checkYourAnswersRoute: EXPORT_CONTRACT,
  fieldId,
  newValueInput: '',
  referenceNumber,
  route: AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE,
  summaryList,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Export contract - Summary list - Currency of agent charges', () => {
  let referenceNumber;
  let url;

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

      url = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
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
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.changeAnswerRadioField(fieldVariables);
      });

      it(`should redirect to ${EXPORT_CONTRACT}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId });
      });

      it(`should render the new answer for ${CURRENCY_CODE} and ${FIXED_SUM_AMOUNT}`, () => {
        cy.checkText(summaryList.field(CURRENCY_CODE).value(), USD.name);

        const expectedAmount = formatCurrency(application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT], USD.isoCode);

        cy.checkText(summaryList.field(FIXED_SUM_AMOUNT).value(), expectedAmount);
      });
    });
  });
});
