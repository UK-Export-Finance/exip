import { summaryList, field, submitButton } from '../../../../../../pages/shared';
import account from '../../../../../../fixtures/account';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const {
  POLICY: {
    CHECK_YOUR_ANSWERS,
    NAME_ON_POLICY_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: { NAME, POSITION },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy contact - As an exporter, I want to change my answers to the same name on policy as policy owner', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: NAME_ON_POLICY_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'Boss';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(POSITION).input(), newAnswer);

        submitButton().click();
      });

      it('should render the new answers when completing the same name on policy form', () => {
        const oldName = `${account[FIRST_NAME]} ${account[LAST_NAME]}`;

        cy.assertSummaryListRowValue(summaryList, NAME, oldName);
        cy.assertSummaryListRowValue(summaryList, POSITION, newAnswer);
      });
    });
  });
});
