import { summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    CONNECTION_WITH_BUYER,
    CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  CONNECTION_WITH_BUYER: FIELD_ID,
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Connection with buyer - Check your answers - ${FIELD_ID} - Yes to no`, () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber, hasConnectionToBuyer: true });

      task.link().click();

      // To get past "Your business" check your answers page
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 1 });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(checkYourAnswersUrl);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);
    });

    it(`should redirect to ${CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CONNECTION_WITH_BUYER_CHECK_AND_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('after changing the answer from yes to no', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: false });
    });

    it(`should redirect to ${YOUR_BUYER}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId: FIELD_ID });
    });

    it(`should render new ${FIELD_ID} answer and change link, with no other buyer connection fields`, () => {
      cy.assertSummaryListRowValue(summaryList, FIELD_ID, FIELD_VALUES.NO);

      cy.assertSummaryListRowDoesNotExist(summaryList, CONNECTION_WITH_BUYER_DESCRIPTION);
    });

    describe('when changing the answer again from no to yes', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();
      });

      it('should have an empty textarea', () => {
        cy.clickYesRadioInput();

        cy.checkTextareaValue({
          fieldId: CONNECTION_WITH_BUYER_DESCRIPTION,
          expectedValue: '',
        });
      });

      describe(`when going back to ${CONNECTION_WITH_BUYER}`, () => {
        it('should have the submitted values', () => {
          cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: true });

          summaryList.field(FIELD_ID).changeLink().click();

          cy.assertConnectionWithBuyerFieldValues();
        });
      });
    });
  });
});
