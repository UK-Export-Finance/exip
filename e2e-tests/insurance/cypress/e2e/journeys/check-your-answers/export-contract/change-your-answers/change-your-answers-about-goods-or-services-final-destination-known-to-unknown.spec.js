import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { DEFAULT } from '../../../../../../../content-strings';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

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
    FINAL_DESTINATION: FIELD_ID,
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (referenceNumber) => ({
  route: ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
  checkYourAnswersRoute: EXPORT_CONTRACT,
  newValueInput: '',
  fieldId: FIELD_ID,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(FIELD_ID).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Export contract - About goods or services - Summary list - Change Final destination known from `yes` to `no`', () => {
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

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);

      const fieldVariables = getFieldVariables(referenceNumber);

      cy.checkChangeLinkUrl(fieldVariables, referenceNumber, FIELD_ID);
    });
  });

  describe(`form submission with ${FIELD_ID} as 'unknown'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitAboutGoodsOrServicesForm({ finalDestinationKnown: false });
    });

    it(`should redirect to ${EXPORT_CONTRACT}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
    });

    it('should render an empty destination/country and retain a `completed` status tag', () => {
      cy.assertSummaryListRowValue(summaryList, FIELD_ID, DEFAULT.EMPTY);

      cy.checkTaskStatusCompleted(status);
    });
  });
});
