import partials from '../../../../../../partials';
import { turnover } from '../../../../../../pages/your-business';
import { submitButton, summaryList } from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    TURNOVER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Change your answers - Turnover - As an exporter, I want to change my answers to the turnover section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitBrokerForm({});

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(ESTIMATED_ANNUAL_TURNOVER, () => {
    const fieldId = ESTIMATED_ANNUAL_TURNOVER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TURNOVER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, TURNOVER_CHANGE, ESTIMATED_ANNUAL_TURNOVER);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '455445';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

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
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, TURNOVER_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '85';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

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
