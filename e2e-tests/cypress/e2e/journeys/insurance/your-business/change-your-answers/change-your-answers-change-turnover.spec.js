import partials from '../../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { turnover, checkYourAnswers } from '../../../../pages/your-business';
import { submitButton } from '../../../../pages/shared';

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      TURNOVER: {
        ESTIMATED_ANNUAL_TURNOVER,
        PERCENTAGE_TURNOVER,
      },
    },
  },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: {
    TURNOVER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const { summaryList } = checkYourAnswers;

context('Insurance - Your business - Change your answers - Turnover - As an exporter, I want to change my answers to the turnover section', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitBrokerForm();
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe(ESTIMATED_ANNUAL_TURNOVER, () => {
    const fieldId = ESTIMATED_ANNUAL_TURNOVER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TURNOVER_CHANGE}`, () => {
        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, TURNOVER_CHANGE, ESTIMATED_ANNUAL_TURNOVER);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '455445';

      before(() => {
        cy.keyboardInput(turnover[fieldId].input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, `£${newAnswer}`);
      });
    });
  });

  describe(PERCENTAGE_TURNOVER, () => {
    const fieldId = PERCENTAGE_TURNOVER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TURNOVER_CHANGE}`, () => {
        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, TURNOVER_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '85';

      before(() => {
        cy.keyboardInput(turnover[fieldId].input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, `${newAnswer}%`);
      });
    });
  });
});
