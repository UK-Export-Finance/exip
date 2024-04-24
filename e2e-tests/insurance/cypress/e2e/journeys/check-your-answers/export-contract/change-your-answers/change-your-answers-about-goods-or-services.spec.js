import { field, status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';
import { XAD } from '../../../../../../../fixtures/countries';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    EXPORT_CONTRACT,
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: {
    DESCRIPTION,
    FINAL_DESTINATION,
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (fieldId, referenceNumber) => ({
  changeLink: summaryList.field(fieldId).changeLink,
  checkYourAnswersRoute: EXPORT_CONTRACT,
  fieldId,
  newValueInput: '',
  referenceNumber,
  route: ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
  summaryList,
});

const NEW_COUNTRY_INPUT = XAD.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Export contract - Summary list - About goods or services - Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

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

  describe(DESCRIPTION, () => {
    const fieldId = DESCRIPTION;
    const fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = `${application.EXPORT_CONTRACT[fieldId]} additional text`;
      fieldVariables.newValueInput = newAnswer;
      fieldVariables.newValue = newAnswer;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.changeAnswerField(fieldVariables, field(fieldId).textarea());
      });

      it(`should redirect to ${EXPORT_CONTRACT}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId });
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        cy.checkChangeAnswerRendered({ fieldVariables });

        cy.checkTaskStatusCompleted(status);
      });
    });
  });

  describe(FINAL_DESTINATION, () => {
    const fieldId = FINAL_DESTINATION;
    const fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      fieldVariables.newValue = NEW_COUNTRY_INPUT;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.autocompleteKeyboardInput(fieldId, fieldVariables.newValue);
        cy.clickSubmitButton();
      });

      it(`should redirect to ${EXPORT_CONTRACT}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId });
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        cy.checkChangeAnswerRendered({ fieldVariables });

        cy.checkTaskStatusCompleted(status);
      });
    });
  });
});
