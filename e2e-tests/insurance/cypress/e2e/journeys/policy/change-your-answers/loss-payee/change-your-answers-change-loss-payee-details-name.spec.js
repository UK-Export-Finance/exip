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
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const fieldId = NAME;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Policy - Change your answers - Loss payee details - ${NAME} - As an exporter, I want to change my answers to the loss payee section`, () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ isAppointingLossPayee: true });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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

      summaryList.field(fieldId).changeLink().click();

      cy.changeAnswerField({ newValueInput }, field(fieldId).input());
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
    });

    it('should render the new answer', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, newValueInput);
    });
  });
});
