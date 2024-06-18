import partials from '../../../../../../../../partials';
import { summaryList } from '../../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    REQUESTED: FIELD_ID,
    COMPANY_NAME,
    COMPANY_NUMBER,
    COUNTRY_CODE,
  },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { ANOTHER_COMPANY_CHECK_AND_CHANGE, OTHER_COMPANY_DETAILS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Another company - Yes to no - As an exporter, As an exporter, I want to change my answers to the other company details section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

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

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${ANOTHER_COMPANY_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: ANOTHER_COMPANY_CHECK_AND_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('after changing the answer from yes to no', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);
    });

    it(`should redirect to ${TYPE_OF_POLICY}`, () => {
      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved: false });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId: FIELD_ID });
    });

    it(`should render new answers and change links for ${FIELD_ID} and all other company details fields`, () => {
      checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[FIELD_ID]({ requested: false });
      checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NAME]({ shouldRender: false });
      checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NUMBER]({ shouldRender: false });
      checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[COUNTRY_CODE]({ shouldRender: false });
    });

    describe('when changing the answer again from no to yes', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved: true });
      });

      describe(`when going back to ${OTHER_COMPANY_DETAILS}`, () => {
        it('should have empty field values', () => {
          cy.assertEmptyOtherCompanyDetailsFieldValues();
        });
      });
    });
  });
});
