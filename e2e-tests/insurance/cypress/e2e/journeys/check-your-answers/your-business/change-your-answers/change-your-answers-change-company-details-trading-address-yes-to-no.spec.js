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
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE,
    COMPANY_DETAILS_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_ADDRESS: FIELD_ID,
    },
    ALTERNATIVE_TRADING_ADDRESS: {
      FULL_ADDRESS,
    },
  },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (fieldId, referenceNumber, route = COMPANY_DETAILS_CHECK_AND_CHANGE) => ({
  route,
  checkYourAnswersRoute: YOUR_BUSINESS,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Check your answers - Company details - Your business - ${FIELD_ID} - Yes to no`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

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

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
      const fieldVariables = getFieldVariables(FIELD_ID, referenceNumber);

      cy.checkChangeLinkUrl(fieldVariables, referenceNumber, FIELD_ID);
    });
  });

  describe('after changing the answer from yes to no', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE}`, () => {
      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitCompanyDetails({ differentTradingAddress: false });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE, fieldId: FIELD_ID });
    });

    it(`should render new ${FIELD_ID} answer and change link, with no ${FULL_ADDRESS} field`, () => {
      cy.assertSummaryListRowValue(summaryList, FIELD_ID, FIELD_VALUES.NO);
      cy.assertSummaryListRowDoesNotExist(summaryList, FULL_ADDRESS);
    });

    it('should retain a `completed` status tag', () => {
      cy.navigateToUrl(url);

      cy.checkTaskStatusCompleted(status);
    });
  });
});
