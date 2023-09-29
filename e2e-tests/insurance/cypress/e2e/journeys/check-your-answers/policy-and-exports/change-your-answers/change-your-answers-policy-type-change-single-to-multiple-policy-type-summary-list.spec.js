import partials from '../../../../../../../partials';
import { FIELD_IDS, ROUTES, FIELD_VALUES } from '../../../../../../../constants';
import { submitButton, saveAndBackButton, summaryList } from '../../../../../../../pages/shared';
import { LINKS } from '../../../../../../../content-strings';
import { typeOfPolicyPage } from '../../../../../../../pages/insurance/policy-and-export';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy-and-exports';
import formatCurrency from '../../../../../../../helpers/format-currency';
import application from '../../../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY_CHECK_AND_CHANGE,
    MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    MULTIPLE_CONTRACT_POLICY,
    ABOUT_GOODS_OR_SERVICES,
  },
  CHECK_YOUR_ANSWERS,
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

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Change your answers - Policy and exports - Change single to multiple policy type - Summary List', () => {
  const baseUrl = Cypress.config('baseUrl');
  let url;
  let referenceNumber;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

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

      typeOfPolicyPage[fieldId].multiple.input().click();
      submitButton().click();
    });

    it(`should redirect to ${MULTIPLE_CONTRACT_POLICY}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}#heading`;

      cy.assertUrl(expected);
    });
  });

  describe(`after completing (now required) fields in ${MULTIPLE_CONTRACT_POLICY} and proceeding to ${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(`${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}#heading`);

      // complete the form/now required fields for a multiple contract policy
      cy.completeAndSubmitMultipleContractPolicyForm({});

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

      const expected = FIELD_VALUES.POLICY_TYPE.MULTIPLE;
      cy.assertSummaryListRowValueNew(summaryList, fieldId, expected);
    });

    describe('Updated summary list', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render the new answers and `change` links to the newly submitted fields', () => {
        const expectedTotalMonthsOfCover = `${String(application.POLICY_AND_EXPORTS[TOTAL_MONTHS_OF_COVER])} months`;

        cy.assertSummaryListRowValueNew(summaryList, TOTAL_MONTHS_OF_COVER, expectedTotalMonthsOfCover);

        cy.checkText(
          summaryList.field(TOTAL_MONTHS_OF_COVER).changeLink(),
          `${LINKS.CHANGE} ${MULTIPLE_FIELD_STRINGS[TOTAL_MONTHS_OF_COVER].SUMMARY.TITLE}`,
        );

        const expectedTotalSalesToBuyer = formatCurrency(application.POLICY_AND_EXPORTS[TOTAL_SALES_TO_BUYER]);

        cy.assertSummaryListRowValueNew(summaryList, TOTAL_SALES_TO_BUYER, expectedTotalSalesToBuyer);

        cy.checkText(
          summaryList.field(TOTAL_SALES_TO_BUYER).changeLink(),
          `${LINKS.CHANGE} ${MULTIPLE_FIELD_STRINGS[TOTAL_SALES_TO_BUYER].SUMMARY.TITLE}`,
        );

        const expectedMaximumBuyerWillOwe = formatCurrency(application.POLICY_AND_EXPORTS[MAXIMUM_BUYER_WILL_OWE]);

        cy.assertSummaryListRowValueNew(summaryList, MAXIMUM_BUYER_WILL_OWE, expectedMaximumBuyerWillOwe);

        cy.checkText(
          summaryList.field(MAXIMUM_BUYER_WILL_OWE).changeLink(),
          `${LINKS.CHANGE} ${MULTIPLE_FIELD_STRINGS[MAXIMUM_BUYER_WILL_OWE].SUMMARY.TITLE}`,
        );
      });

      it(`'maximum buyer will owe' summary list row change link should redirect to ${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, () => {
        summaryList.field(MAXIMUM_BUYER_WILL_OWE).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE, MAXIMUM_BUYER_WILL_OWE, 'label');
      });
    });
  });
});
