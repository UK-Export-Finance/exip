import { summaryList, field, submitButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import account from '../../../../../../fixtures/account';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    NAME_ON_POLICY_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      NAME_ON_POLICY: { NAME, POSITION },
    },
    ACCOUNT: { FIRST_NAME, LAST_NAME },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Change your answers - Policy contact- As an exporter, I want to change my answers to the same name on policy as policy owner', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();
      cy.completeAndSubmitNameOnPolicyForm({});

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

        cy.assertChangeAnswersPageUrl(referenceNumber, NAME_ON_POLICY_CHANGE, fieldId);
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

        cy.assertSummaryListRowValueNew(summaryList, NAME, oldName);
        cy.assertSummaryListRowValueNew(summaryList, POSITION, newAnswer);
      });
    });
  });
});
