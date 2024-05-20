import { status, summaryList } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../fixtures/application';

const {
  CONNECTION_WITH_BUYER,
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    CONNECTION_WITH_BUYER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const { BUYER } = application;

const getFieldVariables = (fieldId, referenceNumber, route) => ({
  route,
  checkYourAnswersRoute: CHECK_YOUR_ANSWERS,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const fieldId = CONNECTION_WITH_BUYER;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Your buyer - Change your answers - Working with buyer - ${CONNECTION_WITH_BUYER} - As an exporter, I want to change my answers to the working with buyer section`, () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({});
      cy.completeAndSubmitCreditInsuranceCoverForm({});
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(CONNECTION_WITH_BUYER, () => {
    let fieldVariables = getFieldVariables(fieldId, referenceNumber, CONNECTION_WITH_BUYER_CHANGE);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${CONNECTION_WITH_BUYER_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber, CONNECTION_WITH_BUYER_CHANGE);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe(`form submission with a new answer - ${CONNECTION_WITH_BUYER} as yes`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: true });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER} and retain a "completed" status tag`, () => {
        fieldVariables.newValue = FIELD_VALUES.YES;
        cy.checkChangeAnswerRendered({ fieldVariables });

        cy.checkTaskStatusCompleted(status);
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER_DESCRIPTION} and retain a "completed" status tag`, () => {
        fieldVariables = getFieldVariables(CONNECTION_WITH_BUYER_DESCRIPTION, referenceNumber, CONNECTION_WITH_BUYER_CHANGE);
        fieldVariables.newValue = BUYER[CONNECTION_WITH_BUYER_DESCRIPTION];

        cy.checkChangeAnswerRendered({ fieldVariables });

        cy.checkTaskStatusCompleted(status);
      });
    });

    describe(`form submission with a new answer - ${CONNECTION_WITH_BUYER} as no`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitConnectionWithTheBuyerForm({});
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${CONNECTION_WITH_BUYER} and retain a "completed" status tag`, () => {
        fieldVariables = getFieldVariables(fieldId, referenceNumber, CONNECTION_WITH_BUYER_CHANGE);
        fieldVariables.newValue = FIELD_VALUES.NO;
        cy.checkChangeAnswerRendered({ fieldVariables });

        cy.checkTaskStatusCompleted(status);
      });

      it(`should NOT render a ${CONNECTION_WITH_BUYER_DESCRIPTION} row and retain a "completed" status tag`, () => {
        cy.assertSummaryListRowDoesNotExist(summaryList, CONNECTION_WITH_BUYER_DESCRIPTION);

        cy.checkTaskStatusCompleted(status);
      });
    });
  });
});
