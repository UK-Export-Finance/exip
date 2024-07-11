import { summaryList } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
    NAME_ON_POLICY_CHECK_AND_CHANGE,
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

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Different name fields - As an exporter, I want to change my answers to the different name on policy', () => {
  let url;
  let referenceNumber;

  const newPosition = 'Boss';
  const newEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');
  const newFirstName = 'James';
  const newLastName = 'Jones';

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

  describe(POSITION, () => {
    const fieldId = POSITION;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${NAME_ON_POLICY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitDifferentNameOnPolicyForm({
          firstName: false,
          lastName: false,
          email: false,
          position: newPosition,
        });
      });

      it('should render the new answers when completing the different name on policy form', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newPosition);
      });
    });
  });

  describe(EMAIL, () => {
    const fieldId = EMAIL;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${NAME_ON_POLICY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitDifferentNameOnPolicyForm({
          firstName: false,
          lastName: false,
          email: newEmail,
          position: false,
        });
      });

      it('should render the new answers when completing the different name on policy form', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newEmail);
      });
    });
  });

  describe(`${FIRST_NAME} and ${LAST_NAME}`, () => {
    const fieldId = NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${NAME_ON_POLICY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: NAME_ON_POLICY_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        // to get to different name on policy page
        cy.clickSubmitButton();

        cy.completeAndSubmitDifferentNameOnPolicyForm({
          firstName: newFirstName,
          lastName: newLastName,
          email: false,
          position: false,
        });
      });

      it('should render the new answers when completing the different name on policy form', () => {
        const newName = `${newFirstName} ${newLastName}`;

        cy.assertSummaryListRowValue(summaryList, NAME, newName);
        cy.assertSummaryListRowValue(summaryList, EMAIL, newEmail);
      });
    });
  });
});
