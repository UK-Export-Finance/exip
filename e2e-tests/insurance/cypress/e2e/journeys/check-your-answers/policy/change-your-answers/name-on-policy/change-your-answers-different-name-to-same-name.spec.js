import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { summaryList, status } from '../../../../../../../../pages/shared';
import application from '../../../../../../../../fixtures/application';
import account from '../../../../../../../../fixtures/account';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { NAME_ON_POLICY_CHECK_AND_CHANGE },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: { NAME, POSITION },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

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

const fieldId = NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Change from different name to same name on policy - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ differentPolicyContact: true });

      cy.clickTaskCheckAnswers();

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

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitNameOnPolicyForm({});
    });

    it('renders a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });

    it(`should redirect to ${TYPE_OF_POLICY} and display new answers`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId });

      const newName = `${account[FIRST_NAME]} ${account[LAST_NAME]}`;
      const newPosition = POLICY_CONTACT[POSITION];

      cy.assertSummaryListRowValue(summaryList, fieldId, newName);
      cy.assertSummaryListRowValue(summaryList, POSITION, newPosition);
    });
  });
});
