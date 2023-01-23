import { submitButton } from '../../../../pages/shared';
import { typeOfPolicyPage, checkYourAnswersPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import checkText from '../../../../helpers/check-text';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    TYPE_OF_POLICY_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const { summaryList } = checkYourAnswersPage;

const assertAnswersPageUrl = (referenceNumber) => {
  const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}#heading`;

  cy.url().should('eq', expected);
};

context('Insurance - Policy and exports - Check your answers - Policy type - As an exporter, I want to change my answers to the type of policy and exports section', () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
    cy.completeAndSubmitSingleContractPolicyForm();
    cy.completeAndSubmitAboutGoodsOrServicesForm();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  const fieldId = POLICY_TYPE;

  context('change policy type from single to multiple', () => {
    describe('when clicking the `change` link', () => {
      before(() => {
        summaryList[fieldId].changeLink().click();
      });

      it('should redirect to the type of policy page', () => {
        const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`;
        cy.url().should('eq', expected);
      });
    });

    describe('form submission with a new answer', () => {
      before(() => {
        typeOfPolicyPage[fieldId].multiple.input().click();
        submitButton().click();
      });

      it('should redirect to the check answers page', () => {
        assertAnswersPageUrl(referenceNumber);
      });

      it('should render the new answer', () => {
        checkText(
          summaryList[fieldId].value(),
          FIELD_VALUES.POLICY_TYPE.MULTI,
        );
      });

      // TODO: it should render empty rows
    });
  });

  context('change policy type from multiple to single', () => {
    describe('when clicking the `change` link', () => {
      before(() => {
        summaryList[POLICY_TYPE].changeLink().click();
      });

      it('should redirect to the type of policy page', () => {
        const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`;
        cy.url().should('eq', expected);
      });
    });

    describe('form submission with a new answer', () => {
      before(() => {
        typeOfPolicyPage[POLICY_TYPE].single.input().click();
        submitButton().click();
      });

      it('should redirect to the check answers page', () => {
        assertAnswersPageUrl(referenceNumber);
      });

      it('should render the new answer', () => {
        checkText(
          summaryList[POLICY_TYPE].value(),
          FIELD_VALUES.POLICY_TYPE.SINGLE,
        );
      });
    });
  });
});
