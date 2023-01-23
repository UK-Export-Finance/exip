import { submitButton } from '../../../../pages/shared';
import { typeOfPolicyPage, checkYourAnswersPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { DEFAULT, LINKS } from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import checkText from '../../../../helpers/check-text';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    TYPE_OF_POLICY_CHANGE,
    MULTIPLE_CONTRACT_POLICY_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: {
        MULTIPLE: {
          TOTAL_MONTHS_OF_COVER,
          TOTAL_SALES_TO_BUYER,
          MAXIMUM_BUYER_WILL_OWE,
        },
      },
    },
  },
} = FIELD_IDS;

const { CONTRACT_POLICY: { MULTIPLE: MULTIPLE_FIELD_STRINGS } } = FIELDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const { summaryList } = checkYourAnswersPage;

const assertChangePageUrl = (referenceNumber, fieldId) => {
  const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_CHANGE}#${fieldId}-label`;
  cy.url().should('eq', expected);
};

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

      it('should have empty summary list row values and `Add` links for the empty multiple policy specific fields', () => {
        checkText(
          summaryList[TOTAL_MONTHS_OF_COVER].value(),
          DEFAULT.EMPTY,
        );

        checkText(
          summaryList[TOTAL_MONTHS_OF_COVER].changeLink(),
          `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[TOTAL_MONTHS_OF_COVER].SUMMARY.TITLE}`,
        );

        checkText(
          summaryList[TOTAL_SALES_TO_BUYER].value(),
          DEFAULT.EMPTY,
        );

        checkText(
          summaryList[TOTAL_SALES_TO_BUYER].changeLink(),
          `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[TOTAL_SALES_TO_BUYER].SUMMARY.TITLE}`,
        );

        checkText(
          summaryList[MAXIMUM_BUYER_WILL_OWE].value(),
          DEFAULT.EMPTY,
        );

        checkText(
          summaryList[MAXIMUM_BUYER_WILL_OWE].changeLink(),
          `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[MAXIMUM_BUYER_WILL_OWE].SUMMARY.TITLE}`,
        );
      });

      describe('`Add` links', () => {
        it(`should redirect to ${TYPE_OF_POLICY_CHANGE}`, () => {
          summaryList[TOTAL_MONTHS_OF_COVER].changeLink().click();
          assertChangePageUrl(referenceNumber, TOTAL_MONTHS_OF_COVER);

          partials.backLink().click();

          summaryList[TOTAL_SALES_TO_BUYER].changeLink().click();
          assertChangePageUrl(referenceNumber, TOTAL_SALES_TO_BUYER);

          partials.backLink().click();

          summaryList[MAXIMUM_BUYER_WILL_OWE].changeLink().click();
          assertChangePageUrl(referenceNumber, MAXIMUM_BUYER_WILL_OWE);

          partials.backLink().click();
        });
      });
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
