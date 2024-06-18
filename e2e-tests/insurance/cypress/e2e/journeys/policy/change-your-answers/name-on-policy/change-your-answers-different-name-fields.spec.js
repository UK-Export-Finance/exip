import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  POLICY: {
    CHECK_YOUR_ANSWERS,
    NAME_ON_POLICY_CHANGE,
    DIFFERENT_NAME_ON_POLICY_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: { NAME, POSITION },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy contact - Different name fields - As an exporter, I want to change my answers to the different name on policy', () => {
  let referenceNumber;
  let url;

  const newPosition = 'Boss';
  const newEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');
  const newFirstName = 'James';
  const newLastName = 'Jones';

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ sameName: false });

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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
      it(`should redirect to ${NAME_ON_POLICY_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: DIFFERENT_NAME_ON_POLICY_CHANGE, fieldId });
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
      it(`should redirect to ${NAME_ON_POLICY_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: DIFFERENT_NAME_ON_POLICY_CHANGE, fieldId });
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
