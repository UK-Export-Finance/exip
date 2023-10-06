import { summaryList, field, submitButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    NAME_ON_POLICY_CHANGE,
    DIFFERENT_NAME_ON_POLICY_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      NAME_ON_POLICY: { NAME, POSITION },
    },
    ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Change your answers - Policy contact- As an exporter, I want to change my answers to the different name on policy', () => {
  let referenceNumber;
  let url;
  const newPosition = 'Boss';
  const newEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');
  const newFirstName = 'James';
  const newLastName = 'Jones';

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();
      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });
      cy.completeAndSubmitDifferentNameOnPolicyForm({});

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

        cy.assertChangeAnswersPageUrl(referenceNumber, DIFFERENT_NAME_ON_POLICY_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newPosition);

        submitButton().click();
      });

      it('should render the new answers when completing the different name on policy form', () => {
        cy.assertSummaryListRowValueNew(summaryList, fieldId, newPosition);
      });
    });
  });

  describe(EMAIL, () => {
    const fieldId = EMAIL;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${NAME_ON_POLICY_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, DIFFERENT_NAME_ON_POLICY_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newEmail);

        submitButton().click();
      });

      it('should render the new answers when completing the different name on policy form', () => {
        cy.assertSummaryListRowValueNew(summaryList, fieldId, newEmail);
      });
    });
  });

  describe(`${FIRST_NAME} and ${LAST_NAME}`, () => {
    const fieldId = NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${NAME_ON_POLICY_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, NAME_ON_POLICY_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        // to get to different name on policy page
        submitButton().click();

        cy.keyboardInput(field(FIRST_NAME).input(), newFirstName);
        cy.keyboardInput(field(LAST_NAME).input(), newLastName);

        submitButton().click();
      });

      it('should render the new answers when completing the different name on policy form', () => {
        const newName = `${newFirstName} ${newLastName}`;

        cy.assertSummaryListRowValueNew(summaryList, NAME, newName);
      });
    });
  });
});
