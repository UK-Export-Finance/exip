import partials from '../../../../../../../../partials';
import { autoCompleteField, field, summaryList } from '../../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import application from '../../../../../../../../fixtures/application';
import { BRA } from '../../../../../../../../fixtures/countries';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    COMPANY_NAME,
    COMPANY_NUMBER,
    COUNTRY_CODE,
  },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Other company details - As an exporter, As an exporter, I want to change my answers to the other company details section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let otherCompanyDetailsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationMultiplePolicyType({
        referenceNumber,
        otherCompanyInvolved: true,
      });

      task.link().click();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 2 });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;
      otherCompanyDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(COMPANY_NAME, () => {
    const fieldId = COMPANY_NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newValueInput = `${application.REQUESTED_JOINTLY_INSURED_PARTY[fieldId]} additional text`;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.assertUrl(`${otherCompanyDetailsUrl}#${fieldId}-label`);

        cy.changeAnswerField({ newValueInput }, field(fieldId).input());

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newValueInput);
      });
    });
  });

  describe(COMPANY_NUMBER, () => {
    const fieldId = COMPANY_NUMBER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newValueInput = `${application.REQUESTED_JOINTLY_INSURED_PARTY[fieldId]}100`;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.assertUrl(`${otherCompanyDetailsUrl}#${fieldId}-label`);

        cy.changeAnswerField({ newValueInput }, field(fieldId).input());

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newValueInput);
      });
    });
  });

  describe(COUNTRY_CODE, () => {
    const fieldId = COUNTRY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newValueInput = BRA.NAME;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.assertUrl(`${otherCompanyDetailsUrl}#${fieldId}-label`);

        cy.keyboardInput(autoCompleteField(fieldId).input(), newValueInput);
        cy.clickSubmitButton();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newValueInput);
      });
    });
  });
});
