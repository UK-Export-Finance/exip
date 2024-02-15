import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
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
  CONNECTION_WITH_BUYER,
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = INSURANCE_FIELD_IDS.YOUR_BUYER;

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

context('Insurance - Check your answers - Working with buyer - Your buyer page - Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Policy" check your answers page
      cy.submitCheckYourAnswersForm();

      // To get past "Your business" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

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

  describe(CONNECTION_WITH_BUYER, () => {
    const fieldId = CONNECTION_WITH_BUYER;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe(`form submission with a new answer - ${CONNECTION_WITH_BUYER} as yes`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitConnectionToTheBuyerForm({ hasConnectionToBuyer: true });
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER} and retain a "completed" status tag`, () => {
        fieldVariables.newValue = FIELD_VALUES.YES;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER_DESCRIPTION} and retain a "completed" status tag`, () => {
        fieldVariables = getFieldVariables(CONNECTION_WITH_BUYER_DESCRIPTION, referenceNumber, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE);
        fieldVariables.newValue = BUYER[CONNECTION_WITH_BUYER_DESCRIPTION];

        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });
    });

    describe(`form submission with a new answer - ${CONNECTION_WITH_BUYER} as no`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitConnectionToTheBuyerForm({});
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER} and retain a "completed" status tag`, () => {
        fieldVariables = getFieldVariables(fieldId, referenceNumber, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE);
        fieldVariables.newValue = FIELD_VALUES.NO;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });

      it(`should not render a ${CONNECTION_WITH_BUYER_DESCRIPTION} row and retain a "completed" status tag`, () => {
        cy.assertSummaryListRowDoesNotExist(summaryList, CONNECTION_WITH_BUYER_DESCRIPTION);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });
});
