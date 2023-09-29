import partials from '../../../../../../../partials';
import { FIELD_IDS, ROUTES, FIELD_VALUES } from '../../../../../../../constants';
import { submitButton, saveAndBackButton, summaryList } from '../../../../../../../pages/shared';
import { LINKS } from '../../../../../../../content-strings';
import { typeOfPolicyPage } from '../../../../../../../pages/insurance/policy-and-export';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy-and-exports';
import { createTimestampFromNumbers, formatDate } from '../../../../../../../helpers/date';
import formatCurrency from '../../../../../../../helpers/format-currency';
import application from '../../../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY_CHECK_AND_CHANGE,
    SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    SINGLE_CONTRACT_POLICY,
    ABOUT_GOODS_OR_SERVICES,
  },
  CHECK_YOUR_ANSWERS,
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

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Change your answers - Policy and exports - Change multiple to single policy type - Summary List', () => {
  const baseUrl = Cypress.config('baseUrl');
  let url;
  let referenceNumber;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`;

      cy.assertUrl(url);

      allSectionsUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  const fieldId = POLICY_TYPE;

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${TYPE_OF_POLICY_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);
      summaryList.field(fieldId).changeLink().click();

      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHECK_AND_CHANGE}#heading`;

      cy.assertUrl(expected);
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      typeOfPolicyPage[fieldId].single.input().click();

      submitButton().click();
    });

    it(`should redirect to ${SINGLE_CONTRACT_POLICY}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}#heading`;

      cy.assertUrl(expected);
    });
  });

  describe(`after completing (now required) fields in ${SINGLE_CONTRACT_POLICY} and proceeding to ${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(`${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}#heading`);

      // complete the form/now required fields for a single contract policy
      cy.completeAndSubmitSingleContractPolicyForm({});

      cy.assertUrl(`${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}#heading`);

      // go back to "all sections"
      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);
    });

    it(`should render the new answer when navigating back to ${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY} from ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(allSectionsUrl);
      cy.assertUrl(allSectionsUrl);

      // go into the "insurance - check your answers" section
      task.link().click();

      // submit check your answers - eligibility
      submitButton().click();

      cy.assertUrl(url);

      const expected = FIELD_VALUES.POLICY_TYPE.SINGLE;
      cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
    });

    describe('Updated summary list', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render the new answers and `change` links to the newly submitted fields', () => {
        const newDate = application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE];

        const expectedDate = formatDate(createTimestampFromNumbers(newDate.day, newDate.month, newDate.year));

        cy.assertSummaryListRowValueNew(summaryList, CONTRACT_COMPLETION_DATE, expectedDate);

        cy.checkText(
          summaryList.field(CONTRACT_COMPLETION_DATE).changeLink(),
          `${LINKS.CHANGE} ${SINGLE_FIELD_STRINGS[CONTRACT_COMPLETION_DATE].SUMMARY.TITLE}`,
        );

        const expectedTotalContractValue = formatCurrency(application.POLICY_AND_EXPORTS[TOTAL_CONTRACT_VALUE]);

        cy.assertSummaryListRowValueNew(summaryList, TOTAL_CONTRACT_VALUE, expectedTotalContractValue);

        cy.checkText(
          summaryList.field(TOTAL_CONTRACT_VALUE).changeLink(),
          `${LINKS.CHANGE} ${SINGLE_FIELD_STRINGS[TOTAL_CONTRACT_VALUE].SUMMARY.TITLE}`,
        );
      });

      it(`'total contract value' summary list row change link should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
        summaryList.field(TOTAL_CONTRACT_VALUE).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE, TOTAL_CONTRACT_VALUE, 'label');
      });
    });
  });
});
