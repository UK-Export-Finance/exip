import partials from '../../../../../../../../partials';
import { POLICY as FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../../../pages/shared';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    NAME_ON_POLICY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  NAME_ON_POLICY: { NAME, OTHER_NAME, SAME_NAME },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: NAME_ON_POLICY_CHECK_AND_CHANGE,
  checkYourAnswersRoute: TYPE_OF_POLICY,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const fieldId = NAME;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Change your answers - Policy - Different name on Policy page - Changing ${OTHER_NAME} to ${SAME_NAME} and then back to ${OTHER_NAME} should not populate fields on different name on policy page`, () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ differentPolicyContact: true });

      task.link().click();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 2 });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${NAME_ON_POLICY_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);
      const fieldVariables = getFieldVariables(fieldId, referenceNumber);

      cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
    });
  });

  describe(`when changing from ${OTHER_NAME} to ${SAME_NAME} and then back to ${OTHER_NAME}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(NAME).changeLink().click();

      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });

      summaryList.field(NAME).changeLink().click();

      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });
    });

    it('should not have fields populated on different name on policy page', () => {
      cy.assertDifferentNameOnPolicyFieldValues({});
    });
  });
});
