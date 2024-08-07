import { summaryList } from '../../../../../../../pages/shared';
import application from '../../../../../../../fixtures/application';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  POLICY: { CHECK_YOUR_ANSWERS, NAME_ON_POLICY_CHANGE, DIFFERENT_NAME_ON_POLICY_CHANGE },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: { NAME, POSITION },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

const { POLICY_CONTACT } = application;

const fieldId = NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy contact - As an exporter, I want to change my answers to a different name on policy', () => {
  let referenceNumber;
  let url;
  let differentNameUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      differentNameUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY_CHANGE}`;
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
    it(`should redirect to ${NAME_ON_POLICY_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: NAME_ON_POLICY_CHANGE, fieldId });
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });
    });

    it(`should redirect to ${DIFFERENT_NAME_ON_POLICY_CHANGE}`, () => {
      cy.assertUrl(`${differentNameUrl}#${fieldId}-label`);
    });

    it('should render the new answers when completing different name on policy form', () => {
      cy.completeAndSubmitDifferentNameOnPolicyForm({});

      const newName = `${POLICY_CONTACT[FIRST_NAME]} ${POLICY_CONTACT[LAST_NAME]}`;
      const newEmail = POLICY_CONTACT[EMAIL];
      const newPosition = POLICY_CONTACT[POSITION];

      cy.assertSummaryListRowValue(summaryList, fieldId, newName);
      cy.assertSummaryListRowValue(summaryList, EMAIL, newEmail);
      cy.assertSummaryListRowValue(summaryList, POSITION, newPosition);
    });
  });
});
