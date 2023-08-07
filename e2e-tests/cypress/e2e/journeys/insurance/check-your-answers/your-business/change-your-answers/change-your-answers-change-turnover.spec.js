import partials from '../../../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { checkYourAnswersYourBusiness } from '../../../../../pages/insurance/check-your-answers';
import { turnover } from '../../../../../pages/your-business';
import {
  checkChangeLinkUrl,
  changeAnswerField,
  checkChangeAnswerRendered,
} from '../../../../../../support/check-summary-list-field-change';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUSINESS,
  },
  EXPORTER_BUSINESS: {
    TURNOVER_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const { summaryList } = checkYourAnswersYourBusiness;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: TURNOVER_CHECK_AND_CHANGE,
  checkYourAnswersRoute: YOUR_BUSINESS,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

context('Insurance - Check your answers - Turnover - Your business - Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      // To get past "Policy and exports" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

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

  describe(ESTIMATED_ANNUAL_TURNOVER, () => {
    const fieldId = ESTIMATED_ANNUAL_TURNOVER;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${TURNOVER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = '455445';
        changeAnswerField(fieldVariables, turnover[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = `£${fieldVariables.newValueInput}`;
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });

  describe(PERCENTAGE_TURNOVER, () => {
    const fieldId = PERCENTAGE_TURNOVER;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${TURNOVER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = '85';
        changeAnswerField(fieldVariables, turnover[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = `${fieldVariables.newValueInput}%`;
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });
});
