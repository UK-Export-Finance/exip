import { summaryList } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';

const {
  CONNECTION_WITH_BUYER: FIELD_ID,
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    CONNECTION_WITH_BUYER,
    CONNECTION_WITH_BUYER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

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

context(`Insurance - Your buyer - Change your answers - Working with buyer - ${CONNECTION_WITH_BUYER} - Yes to no - As an exporter, I want to change my answers to the working with buyer section`, () => {
  let url;
  let connectionWithBuyerUrl;
  let referenceNumber;
  let fieldVariables;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: true });
      cy.completeAndSubmitTradedWithBuyerForm({});
      cy.completeAndSubmitCreditInsuranceCoverForm({});
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      connectionWithBuyerUrl = `${baseUrl}${ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER}`;
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

      cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: false });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
    });

    it(`should render the new answer and no ${CONNECTION_WITH_BUYER_DESCRIPTION} row`, () => {
      fieldVariables.newValue = FIELD_VALUES.NO;

      cy.checkChangeAnswerRendered({ fieldVariables });

      cy.assertSummaryListRowDoesNotExist(summaryList, CONNECTION_WITH_BUYER_DESCRIPTION);
    });

    describe(`when going back to ${CONNECTION_WITH_BUYER}`, () => {
      it(`should have the submitted answer and an empty ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
        cy.navigateToUrl(connectionWithBuyerUrl);

        cy.assertNoRadioOptionIsChecked();

        cy.clickYesRadioInput();

        cy.checkTextareaValue({
          fieldId: CONNECTION_WITH_BUYER_DESCRIPTION,
          expectedValue: '',
        });
      });
    });
  });
});
