import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUSINESS,
  },
  EXPORTER_BUSINESS: { CREDIT_CONTROL_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: { HAS_CREDIT_CONTROL: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

const getFieldVariables = (fieldId, referenceNumber, route = CREDIT_CONTROL_CHECK_AND_CHANGE) => ({
  route,
  checkYourAnswersRoute: YOUR_BUSINESS,
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

let fieldVariables;
let referenceNumber;

context('Insurance - Check your answers - Company details - Credit control - Summary list', () => {
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Policy" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

      cy.assertUrl(url);

      fieldVariables = getFieldVariables(FIELD_ID, referenceNumber);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${CREDIT_CONTROL_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);

      cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CREDIT_CONTROL_CHECK_AND_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitCreditControlForm({ hasCreditControlProcess: false });
    });

    it(`should redirect to ${YOUR_BUSINESS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUSINESS, fieldId: FIELD_ID });
    });

    it('should render the new answer and retain a `completed` status tag', () => {
      cy.assertSummaryListRowValue(summaryList, FIELD_ID, FIELD_VALUES.NO);

      cy.checkTaskStatusCompleted(status);
    });
  });
});
