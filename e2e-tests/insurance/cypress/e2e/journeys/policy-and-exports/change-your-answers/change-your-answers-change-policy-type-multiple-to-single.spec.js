import { submitButton, summaryList } from '../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { LINKS } from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { createTimestampFromNumbers, formatDate } from '../../../../../../helpers/date';
import formatCurrency from '../../../../../../helpers/format-currency';
import application from '../../../../../../fixtures/application';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    TYPE_OF_POLICY_CHANGE,
    SINGLE_CONTRACT_POLICY_CHANGE,
    SINGLE_CONTRACT_POLICY,
    ABOUT_GOODS_OR_SERVICES,
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

context('Insurance - Policy and exports - Change your answers - Policy type - multiple to single', () => {
  const baseUrl = Cypress.config('baseUrl');
  let referenceNumber;
  let checkYourAnswersUrl;
  let changeLinkHref;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);
      cy.completeAndSubmitMultipleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();
      cy.completeAndSubmitNameOnPolicyForm({});

      checkYourAnswersUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      changeLinkHref = `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHANGE}`;

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
    it(`should redirect to ${TYPE_OF_POLICY_CHANGE}`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(POLICY_TYPE).changeLink().click();

      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`;

      cy.assertUrl(expected);
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(POLICY_TYPE).changeLink().click();

      typeOfPolicyPage[POLICY_TYPE].single.input().click();

      submitButton().click();
    });

    it(`should redirect to ${SINGLE_CONTRACT_POLICY}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}#heading`;

      cy.assertUrl(expected);
    });

    describe(`after completing (now required) fields in ${SINGLE_CONTRACT_POLICY} and proceeding to ${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, () => {
      beforeEach(() => {
        cy.navigateToUrl(`${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}#heading`);

        // complete the form/now required fields for a multiple contract policy
        cy.completeAndSubmitSingleContractPolicyForm({});

        cy.assertUrl(`${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}#heading`);

        // proceed to "name on policy"
        submitButton().click();
        // proceed to "check your answers"
        cy.completeAndSubmitNameOnPolicyForm({});

        const expectedUrl = `${checkYourAnswersUrl}#heading`;

        cy.assertUrl(expectedUrl);
      });

      it(`should render the new answer for ${POLICY_TYPE}`, () => {
        cy.assertSummaryListRowValueNew(summaryList, POLICY_TYPE, FIELD_VALUES.POLICY_TYPE.SINGLE);
      });

      it(`should render the new answer and 'change' links for ${CONTRACT_COMPLETION_DATE}`, () => {
        const fieldId = CONTRACT_COMPLETION_DATE;
        const newAnswer = application.POLICY_AND_EXPORTS[fieldId];

        const expectedDate = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedDate);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${SINGLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });

      it(`should render the new answer and 'change' links for ${TOTAL_CONTRACT_VALUE}`, () => {
        const fieldId = TOTAL_CONTRACT_VALUE;

        const expectedTotalContractValue = formatCurrency(application.POLICY_AND_EXPORTS[fieldId]);

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedTotalContractValue);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${SINGLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });
    });
  });
});
