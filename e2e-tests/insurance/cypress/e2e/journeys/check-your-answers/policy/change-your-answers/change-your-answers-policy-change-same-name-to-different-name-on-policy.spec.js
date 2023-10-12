import partials from '../../../../../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../../pages/shared';
import application from '../../../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    NAME_ON_POLICY_CHECK_AND_CHANGE,
    DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: { NAME, POSITION },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const { POLICY_CONTACT } = application;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: NAME_ON_POLICY_CHECK_AND_CHANGE,
  checkYourAnswersRoute: TYPE_OF_POLICY,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Change from same name to different name on policy - Summary List', () => {
  let url;
  let referenceNumber;
  let differentNameUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;
      differentNameUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(NAME, () => {
    const fieldId = NAME;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${NAME_ON_POLICY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitNameOnPolicyForm({ sameName: false });
      });

      it(`should redirect to ${DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, () => {
        cy.assertUrl(`${differentNameUrl}#${fieldId}-label`);
      });

      it(`should redirect to ${TYPE_OF_POLICY} and display new answers after submitting form`, () => {
        cy.completeAndSubmitDifferentNameOnPolicyForm({});

        cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);

        const newName = `${POLICY_CONTACT[FIRST_NAME]} ${POLICY_CONTACT[LAST_NAME]}`;
        const newEmail = POLICY_CONTACT[EMAIL];
        const newPosition = POLICY_CONTACT[POSITION];

        cy.assertSummaryListRowValueNew(summaryList, fieldId, newName);
        cy.assertSummaryListRowValueNew(summaryList, EMAIL, newEmail);
        cy.assertSummaryListRowValueNew(summaryList, POSITION, newPosition);
      });
    });
  });
});
