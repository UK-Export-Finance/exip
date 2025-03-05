import { summaryList, status } from '../../../../../../../../pages/shared';
import { POLICY as FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { NAME_ON_POLICY_CHECK_AND_CHANGE },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const {
  NAME_ON_POLICY: { POSITION },
} = FIELD_IDS;

const fieldId = POSITION;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Change your answers - Policy - Same name - ${POSITION} - As an exporter, I want to change my answers to the different name on policy`,
  () => {
    let url;
    let referenceNumber;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;
        cy.completePrepareApplicationMultiplePolicyType({ differentPolicyContact: false });

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
      it(`should redirect to ${NAME_ON_POLICY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: NAME_ON_POLICY_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'Boss';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitDifferentNameOnPolicyForm({
          firstName: false,
          lastName: false,
          email: false,
          position: newAnswer,
        });
      });

      it('renders a `completed` status tag', () => {
        cy.checkTaskStatusCompleted(status);
      });

      it('should render the new answers when completing the different name on policy form', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  },
);
