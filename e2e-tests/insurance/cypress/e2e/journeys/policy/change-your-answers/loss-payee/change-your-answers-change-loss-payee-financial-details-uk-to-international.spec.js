import { field, summaryList } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const {
  LOSS_PAYEE_DETAILS: { NAME, LOCATION, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { LOSS_PAYEE_DETAILS_CHANGE, LOSS_PAYEE_FINANCIAL_DETAILS_UK, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Policy - Change your answers - Loss payee details - Financial details - UK to International - As an exporter, I want to change my answers to the loss payee section',
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;
    let lossPayeeDetailsUrl;
    let lossPayeeFinancialInternationalUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePolicySection({
          isAppointingLossPayee: true,
          lossPayeeIsLocatedInUK: true,
        });

        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
        lossPayeeDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_CHANGE}`;
        lossPayeeFinancialInternationalUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe(`when clicking the ${NAME} 'change' link`, () => {
      it(`should redirect to ${LOSS_PAYEE_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(NAME).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: LOSS_PAYEE_DETAILS_CHANGE, fieldId: NAME });
      });
    });

    describe('after changing the answer from UK to International', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE} and then ${CHECK_YOUR_ANSWERS} after completing (now required) loss payee financial international fields`, () => {
        summaryList.field(NAME).changeLink().click();

        cy.assertUrl(`${lossPayeeDetailsUrl}#${NAME}-label`);

        cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: false });

        cy.assertUrl(`${lossPayeeFinancialInternationalUrl}#${NAME}-label`);

        cy.completeAndSubmitLossPayeeFinancialDetailsInternationalForm({});

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: NAME });
      });

      it('should render new answers and change links for International financial details, no UK financial details', () => {
        checkSummaryList.LOSS_PAYEE[NAME]({ shouldRender: true });

        checkSummaryList.LOSS_PAYEE[FINANCIAL_ADDRESS]({ shouldRender: true, isInternational: true });
        checkSummaryList.LOSS_PAYEE[BIC_SWIFT_CODE]({ shouldRender: true });
        checkSummaryList.LOSS_PAYEE[IBAN]({ shouldRender: true });

        checkSummaryList.LOSS_PAYEE[SORT_CODE]({ shouldRender: false });
        checkSummaryList.LOSS_PAYEE[ACCOUNT_NUMBER]({ shouldRender: false });
      });

      describe(`when changing the answer again from International to UK and going back to ${LOSS_PAYEE_FINANCIAL_DETAILS_UK}`, () => {
        it('should have pre-selected radio inputs and empty field values', () => {
          summaryList.field(NAME).changeLink().click();

          cy.assertRadioOptionIsNotChecked(field(`${LOCATION}-${IS_LOCATED_IN_UK}`).input());
          cy.assertRadioOptionIsChecked(field(`${LOCATION}-${IS_LOCATED_INTERNATIONALLY}`).input());

          cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: true });

          cy.assertEmptyLossPayeeFinancialUkFieldValues();
        });
      });
    });
  },
);
