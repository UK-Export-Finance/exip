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

context('Insurance - Policy and exports - Change your answers - Policy type - single to multiple', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm();
      cy.completeAndSubmitAboutGoodsOrServicesForm();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  const fieldId = POLICY_TYPE;

  describe('when clicking the `change` link', () => {
    before(() => {
      cy.navigateToUrl(url);

      summaryList[fieldId].changeLink().click();
    });

    it(`should redirect to ${TYPE_OF_POLICY_CHANGE}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`;

      cy.url().should('eq', expected);
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList[fieldId].changeLink().click();

      typeOfPolicyPage[fieldId].multiple.input().click();
      submitButton().click();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}#heading`;

      cy.url().should('eq', expected);
    });

    it('should render the new answer', () => {
      const expected = FIELD_VALUES.POLICY_TYPE.MULTIPLE;
      cy.assertSummaryListRowValue(summaryList, fieldId, expected);
    });

    describe('`Add` links', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

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

        cy.clickBackLink();

        summaryList[TOTAL_SALES_TO_BUYER].changeLink().click();
        cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, TOTAL_SALES_TO_BUYER, 'label');

        cy.clickBackLink();

        summaryList[MAXIMUM_BUYER_WILL_OWE].changeLink().click();
        cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, MAXIMUM_BUYER_WILL_OWE, 'label');

        cy.clickBackLink();
      });
    });
  });
});
