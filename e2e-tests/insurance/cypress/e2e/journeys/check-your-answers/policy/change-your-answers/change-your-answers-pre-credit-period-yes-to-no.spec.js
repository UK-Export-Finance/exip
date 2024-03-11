import {
  field,
  status,
  summaryList,
} from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
  POLICY: {
    BROKER_CHECK_AND_CHANGE,
    PRE_CREDIT_PERIOD,
    PRE_CREDIT_PERIOD_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD,
  CREDIT_PERIOD_WITH_BUYER,
} = POLICY_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: BROKER_CHECK_AND_CHANGE,
  checkYourAnswersRoute: TYPE_OF_POLICY,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Pre-credit period - Change from yes to no - Summary List', () => {
  let referenceNumber;
  let url;
  let needPreCreditPeriodUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber, needPreCreditPeriod: true });

      task.link().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;
      needPreCreditPeriodUrl = `${baseUrl}${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;

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

  describe(CREDIT_PERIOD_WITH_BUYER, () => {
    const fieldId = CREDIT_PERIOD_WITH_BUYER;

    const fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${PRE_CREDIT_PERIOD_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: PRE_CREDIT_PERIOD_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = 'Updated description';
        cy.changeAnswerField(fieldVariables, field(fieldId).textarea());
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        cy.checkChangeAnswerRendered({ fieldVariables });

        cy.checkTaskStatusCompleted(status);
      });
    });
  });

  describe(NEED_PRE_CREDIT_PERIOD, () => {
    const fieldId = NEED_PRE_CREDIT_PERIOD;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${PRE_CREDIT_PERIOD_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: PRE_CREDIT_PERIOD_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitPreCreditPeriodForm({ needPreCreditPeriod: false });
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it(`should render the new answer and not render ${CREDIT_PERIOD_WITH_BUYER} row`, () => {
        cy.checkText(summaryList.field(fieldId).value(), FIELD_VALUES.NO);

        cy.assertSummaryListRowDoesNotExist(summaryList, CREDIT_PERIOD_WITH_BUYER);
      });

      it('should retain a `completed` status tag', () => {
        cy.checkTaskStatusCompleted(status);
      });

      describe('when going back to the page', () => {
        it(`should have the submitted 'yes' value and an empty ${CREDIT_PERIOD_WITH_BUYER} value`, () => {
          cy.navigateToUrl(needPreCreditPeriodUrl);

          cy.assertNoRadioOptionIsChecked();

          field(CREDIT_PERIOD_WITH_BUYER).textarea().should('have.value', '');
        });
      });
    });
  });
});
