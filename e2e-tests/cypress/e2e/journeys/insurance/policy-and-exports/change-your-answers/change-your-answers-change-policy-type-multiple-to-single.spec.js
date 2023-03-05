import { submitButton } from '../../../../pages/shared';
import { typeOfPolicyPage, checkYourAnswersPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { DEFAULT, LINKS } from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    TYPE_OF_POLICY_CHANGE,
    SINGLE_CONTRACT_POLICY_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: {
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      },
    },
  },
} = FIELD_IDS;

const { CONTRACT_POLICY: { SINGLE: SINGLE_FIELD_STRINGS } } = FIELDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const { summaryList } = checkYourAnswersPage;

context('Insurance - Policy and exports - Change your answers - Policy type - multiple to single', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);
      cy.completeAndSubmitMultipleContractPolicyForm();
      cy.completeAndSubmitAboutGoodsOrServicesForm();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  const fieldId = POLICY_TYPE;

  describe('when clicking the `change` link', () => {
    before(() => {
      summaryList[fieldId].changeLink().click();
    });

    it(`should redirect to ${TYPE_OF_POLICY_CHANGE}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`;

      cy.url().should('eq', expected);
    });
  });

  describe('form submission with a new answer', () => {
    before(() => {
      typeOfPolicyPage[fieldId].single.input().click();
      submitButton().click();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}#heading`;

      cy.url().should('eq', expected);
    });

    it('should render the new answer', () => {
      const expected = FIELD_VALUES.POLICY_TYPE.SINGLE;
      cy.assertSummaryListRowValue(summaryList, fieldId, expected);
    });

    describe('`Add` links', () => {
      it('should have empty summary list row values and links for the empty single policy specific fields', () => {
        cy.assertSummaryListRowValue(summaryList, CONTRACT_COMPLETION_DATE, DEFAULT.EMPTY);

        cy.checkText(
          summaryList[CONTRACT_COMPLETION_DATE].changeLink(),
          `${LINKS.ADD} ${SINGLE_FIELD_STRINGS[CONTRACT_COMPLETION_DATE].SUMMARY.TITLE}`,
        );

        cy.assertSummaryListRowValue(summaryList, TOTAL_CONTRACT_VALUE, DEFAULT.EMPTY);

        cy.checkText(
          summaryList[TOTAL_CONTRACT_VALUE].changeLink(),
          `${LINKS.ADD} ${SINGLE_FIELD_STRINGS[TOTAL_CONTRACT_VALUE].SUMMARY.TITLE}`,
        );
      });

      it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
        summaryList[TOTAL_CONTRACT_VALUE].changeLink().click();
        cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, TOTAL_CONTRACT_VALUE, 'label');
      });
    });
  });
});
