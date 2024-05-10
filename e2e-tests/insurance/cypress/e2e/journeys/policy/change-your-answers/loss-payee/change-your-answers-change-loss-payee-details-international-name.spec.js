import { field, summaryList } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';

const {
  LOSS_PAYEE_DETAILS: { NAME },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    LOSS_PAYEE_DETAILS_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const fieldId = NAME;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Policy - Change your answers - Loss payee details - International - ${NAME} - As an exporter, I want to change my answers to the loss payee section`, () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let lossPayeeDetailsUrl;
  let lossPayeeFinancialInternationalUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ isAppointingLossPayee: true, lossPayeeIsLocatedInUK: false });

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

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${LOSS_PAYEE_DETAILS_CHANGE}`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: LOSS_PAYEE_DETAILS_CHANGE, fieldId });
    });
  });

  describe('form submission with a new answer', () => {
    const newValueInput = `${application.POLICY[fieldId]} additional text`;

    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);
    });

    it(`should redirect to ${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE} and then ${CHECK_YOUR_ANSWERS}`, () => {
      summaryList.field(fieldId).changeLink().click();

      cy.assertUrl(`${lossPayeeDetailsUrl}#${NAME}-label`);

      cy.changeAnswerField({ newValueInput }, field(fieldId).input());

      cy.assertUrl(`${lossPayeeFinancialInternationalUrl}#${NAME}-label`);

      cy.completeAndSubmitLossPayeeFinancialDetailsInternationalForm({});

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
    });

    it('should render the new answer', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, newValueInput);
    });
  });
});
