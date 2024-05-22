import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  CONNECTION_WITH_BUYER: FIELD_ID,
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const { BUYER } = application;

const getFieldVariables = (fieldId, referenceNumber, route) => ({
  route,
  checkYourAnswersRoute: YOUR_BUYER,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Check your answers - Your buyer - Working with buyer - ${FIELD_ID} - No to yes - As an exporter, I want to change my answers to the working with buyer section`, () => {
  let referenceNumber;
  let url;
  let fieldVariables;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Your business" check your answers page
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 1 });

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    fieldVariables = getFieldVariables(FIELD_ID, referenceNumber, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, () => {
      cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
    });
  });

  describe('form submission with a new answer', () => {
    it(`should redirect to ${YOUR_BUYER}`, () => {
      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: true });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId: FIELD_ID });
    });

    it(`should render the new answer for ${FIELD_ID}`, () => {
      fieldVariables.newValue = FIELD_VALUES.YES;

      cy.checkChangeAnswerRendered({ fieldVariables });
    });

    it(`should render the new answer for ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
      fieldVariables = getFieldVariables(CONNECTION_WITH_BUYER_DESCRIPTION, referenceNumber, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE);
      fieldVariables.newValue = BUYER[CONNECTION_WITH_BUYER_DESCRIPTION];

      cy.checkChangeAnswerRendered({ fieldVariables });
    });

    it('should retain a "completed" status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });
  });
});
