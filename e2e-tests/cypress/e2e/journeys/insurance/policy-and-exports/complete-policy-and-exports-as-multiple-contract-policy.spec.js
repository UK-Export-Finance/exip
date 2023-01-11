import partials from '../../../partials';
import { TASKS } from '../../../../../content-strings';
import { FIELD_VALUES, ROUTES } from '../../../../../constants';
import getReferenceNumber from '../../../helpers/get-reference-number';
import checkText from '../../../helpers/check-text';

const { taskList } = partials.insurancePartials;

const {
  INSURANCE: {
    START,
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
  },
} = ROUTES;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Complete the entire section as a multiple contract policy', () => {
  before(() => {
    cy.visit(START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTI);
    cy.completeAndSubmitMultipleContractPolicyForm();
    cy.completeAndSubmitAboutGoodsOrServicesForm();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`should redirect to ${ALL_SECTIONS} change the 'type of policy and exports' task status to 'completed'`, () => {
    getReferenceNumber().then((referenceNumber) => {
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expectedUrl);

      checkText(
        task.status(),
        TASKS.STATUS.COMPLETED,
      );
    });
  });
});
