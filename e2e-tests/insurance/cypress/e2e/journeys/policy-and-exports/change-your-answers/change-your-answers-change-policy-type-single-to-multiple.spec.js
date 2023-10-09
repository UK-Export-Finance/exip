import { submitButton, summaryList } from '../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { LINKS } from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import formatCurrency from '../../../../../../helpers/format-currency';
import application from '../../../../../../fixtures/application';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    TYPE_OF_POLICY_CHANGE,
    MULTIPLE_CONTRACT_POLICY_CHANGE,
    MULTIPLE_CONTRACT_POLICY,
    ABOUT_GOODS_OR_SERVICES,
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

context('Insurance - Policy and exports - Change your answers - Policy type - single to multiple', () => {
  const baseUrl = Cypress.config('baseUrl');
  let referenceNumber;
  let checkYourAnswersUrl;
  let changeLinkHref;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completePolicyAndExportSection({});

      checkYourAnswersUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      changeLinkHref = `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_CHANGE}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(POLICY_TYPE).changeLink().click();
    });

    it(`should redirect to ${TYPE_OF_POLICY_CHANGE}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`;

      cy.assertUrl(expected);
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(POLICY_TYPE).changeLink().click();

      typeOfPolicyPage[POLICY_TYPE].multiple.input().click();
      submitButton().click();
    });

    it(`should redirect to ${MULTIPLE_CONTRACT_POLICY}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}#heading`;

      cy.assertUrl(expected);
    });

    describe(`after completing (now required) fields in ${MULTIPLE_CONTRACT_POLICY} and proceeding to ${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, () => {
      beforeEach(() => {
        cy.navigateToUrl(`${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}#heading`);

        // complete the form/now required fields for a multiple contract policy
        cy.completeAndSubmitMultipleContractPolicyForm({});

        cy.assertUrl(`${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}#heading`);

        // proceed to "name on policy"
        submitButton().click();
        // proceed to "check your answers"
        cy.completeAndSubmitNameOnPolicyForm({});

        const expectedUrl = `${checkYourAnswersUrl}#heading`;

        cy.assertUrl(expectedUrl);
      });

      it(`should render the new answer for ${POLICY_TYPE}`, () => {
        cy.assertSummaryListRowValueNew(summaryList, POLICY_TYPE, FIELD_VALUES.POLICY_TYPE.MULTIPLE);
      });

      it(`should render the new answers and 'change' links for ${TOTAL_MONTHS_OF_COVER}`, () => {
        const fieldId = TOTAL_MONTHS_OF_COVER;

        const expectedTotalMonthsOfCover = `${application.POLICY_AND_EXPORTS[fieldId]} months`;

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedTotalMonthsOfCover);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${MULTIPLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });

      it(`should render the new answer and 'change' link for ${TOTAL_SALES_TO_BUYER}`, () => {
        const fieldId = TOTAL_SALES_TO_BUYER;

        const expectedTotalSalesToBuyer = formatCurrency(application.POLICY_AND_EXPORTS[fieldId]);

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedTotalSalesToBuyer);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${MULTIPLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });

      it(`should render the new answer and 'change' link for ${MAXIMUM_BUYER_WILL_OWE}`, () => {
        const fieldId = MAXIMUM_BUYER_WILL_OWE;

        const expectedMaximumBuyerWillOwe = formatCurrency(application.POLICY_AND_EXPORTS[fieldId]);

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedMaximumBuyerWillOwe);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${MULTIPLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });
    });
  });
});
