import { summaryList } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../fixtures/application';

const {
  CONNECTION_WITH_BUYER: FIELD_ID,
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

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Your buyer - Change your answers - Working with buyer - ${FIELD_ID} - No to yes - As an exporter, I want to change my answers to the working with buyer section`, () => {
  let url;
  let referenceNumber;
  let fieldVariables;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: false });
      cy.completeAndSubmitTradedWithBuyerForm({});
      cy.completeAndSubmitCreditInsuranceCoverForm({});
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    fieldVariables = getFieldVariables(FIELD_ID, referenceNumber, CONNECTION_WITH_BUYER_CHANGE);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${CONNECTION_WITH_BUYER_CHANGE}`, () => {
      cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
    });
  });

  describe('form submission with a new answer', () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: true });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
    });

    it(`should render the new answer for ${FIELD_ID}`, () => {
      fieldVariables.newValue = FIELD_VALUES.YES;

      cy.checkChangeAnswerRendered({ fieldVariables });
    });

    it(`should render the new answer for ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
      fieldVariables = getFieldVariables(CONNECTION_WITH_BUYER_DESCRIPTION, referenceNumber, CONNECTION_WITH_BUYER_CHANGE);
      fieldVariables.newValue = BUYER[CONNECTION_WITH_BUYER_DESCRIPTION];

      cy.checkChangeAnswerRendered({ fieldVariables });
    });
  });
});
