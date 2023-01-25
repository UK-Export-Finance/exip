import { submitButton } from '../../../../pages/shared';
import { typeOfPolicyPage, checkYourAnswersPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { DEFAULT, LINKS } from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import getReferenceNumber from '../../../../helpers/get-reference-number';

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

context('Insurance - Policy and exports - Check your answers - Policy type - As an exporter, I want to change my answers to the type of policy and exports section', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

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

      it(`should redirect to ${TYPE_OF_POLICY_CHANGE}`, () => {
        const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`;

        cy.url().should('eq', expected);
      });
    });

    describe('form submission with a new answer', () => {
      before(() => {
        typeOfPolicyPage[fieldId].multiple.input().click();
        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}#heading`;

        cy.url().should('eq', expected);
      });

      it('should render the new answer', () => {
        const expected = FIELD_VALUES.POLICY_TYPE.MULTI;
        cy.assertSummaryListRowValue(summaryList, fieldId, expected);
      });

      describe('`Add` links', () => {
        it('should have empty summary list row values and links for the empty multiple policy specific fields', () => {
          cy.assertSummaryListRowValue(summaryList, TOTAL_MONTHS_OF_COVER, DEFAULT.EMPTY);

          cy.checkText(
            summaryList[TOTAL_MONTHS_OF_COVER].changeLink(),
            `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[TOTAL_MONTHS_OF_COVER].SUMMARY.TITLE}`,
          );

          cy.assertSummaryListRowValue(summaryList, TOTAL_SALES_TO_BUYER, DEFAULT.EMPTY);

          cy.checkText(
            summaryList[TOTAL_SALES_TO_BUYER].changeLink(),
            `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[TOTAL_SALES_TO_BUYER].SUMMARY.TITLE}`,
          );

          cy.assertSummaryListRowValue(summaryList, MAXIMUM_BUYER_WILL_OWE, DEFAULT.EMPTY);

          cy.checkText(
            summaryList[MAXIMUM_BUYER_WILL_OWE].changeLink(),
            `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[MAXIMUM_BUYER_WILL_OWE].SUMMARY.TITLE}`,
          );
        });

        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[TOTAL_MONTHS_OF_COVER].changeLink().click();
          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, TOTAL_MONTHS_OF_COVER, 'label');

          partials.backLink().click();

          summaryList[TOTAL_SALES_TO_BUYER].changeLink().click();
          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, TOTAL_SALES_TO_BUYER, 'label');

          partials.backLink().click();

          summaryList[MAXIMUM_BUYER_WILL_OWE].changeLink().click();
          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, MAXIMUM_BUYER_WILL_OWE, 'label');

          partials.backLink().click();
        });
      });
    });
  });

  context('change policy type from multiple to single', () => {
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
    });
  });
});
