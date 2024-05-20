import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/business';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUSINESS,
  },
} = INSURANCE_ROUTES;

const {
  HAS_CREDIT_CONTROL: FIELD_ID,
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

let referenceNumber;

context('Insurance - Check your answers - Company details - Credit control - No to yes - As an exporter, I want to change my answers to the credit control section', () => {
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        hasCreditControlProcess: false,
      });

      task.link().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    summaryList.field(FIELD_ID).changeLink().click();

    cy.completeAndSubmitCreditControlForm({ hasCreditControlProcess: true });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${YOUR_BUSINESS}`, () => {
    cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUSINESS, fieldId: FIELD_ID });
  });

  it('should render the new answer and retain a `completed` status tag', () => {
    cy.assertSummaryListRowValue(summaryList, FIELD_ID, FIELD_VALUES.YES);

    cy.checkTaskStatusCompleted(status);
  });
});
