import { submitButton, summaryList } from '../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../constants';
import { LINKS } from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import formatCurrency from '../../../../../../helpers/format-currency';
import application from '../../../../../../fixtures/application';

const {
  ROOT,
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    TYPE_OF_POLICY_CHANGE,
    MULTIPLE_CONTRACT_POLICY_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
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
} = INSURANCE_FIELD_IDS;

const { CONTRACT_POLICY: { MULTIPLE: MULTIPLE_FIELD_STRINGS } } = FIELDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Change your answers - Policy type - single to multiple', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let typeOfPolicyUrl;
  let changeLinkHref;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completePolicyAndExportSection({});

      const applicationRouteUrl = `${ROOT}/${referenceNumber}`;

      checkYourAnswersUrl = `${baseUrl}${applicationRouteUrl}${CHECK_YOUR_ANSWERS}`;
      typeOfPolicyUrl = `${baseUrl}${applicationRouteUrl}${TYPE_OF_POLICY_CHANGE}`;
      changeLinkHref = `${applicationRouteUrl}${MULTIPLE_CONTRACT_POLICY_CHANGE}`;

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

    it(`should redirect to ${TYPE_OF_POLICY_CHANGE} with heading anchor`, () => {
      const expectedUrl = `${typeOfPolicyUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe('after submitting a new policy type (multiple) and completing (now required) fields for a multiple policy', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(POLICY_TYPE).changeLink().click();

      typeOfPolicyPage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      cy.completeAndSubmitMultipleContractPolicyForm({});
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      const expectedUrl = `${checkYourAnswersUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });

    describe('should render new answers and change links for new multiple policy fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(POLICY_TYPE, () => {
        cy.assertSummaryListRowValueNew(summaryList, POLICY_TYPE, FIELD_VALUES.POLICY_TYPE.MULTIPLE);
      });

      it(TOTAL_MONTHS_OF_COVER, () => {
        const fieldId = TOTAL_MONTHS_OF_COVER;

        const expectedTotalMonthsOfCover = `${application.POLICY_AND_EXPORTS[fieldId]} months`;

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedTotalMonthsOfCover);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${MULTIPLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });

      it(TOTAL_SALES_TO_BUYER, () => {
        const fieldId = TOTAL_SALES_TO_BUYER;

        const expectedTotalSalesToBuyer = formatCurrency(application.POLICY_AND_EXPORTS[fieldId]);

        cy.assertSummaryListRowValueNew(summaryList, fieldId, expectedTotalSalesToBuyer);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${MULTIPLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });

      it(MAXIMUM_BUYER_WILL_OWE, () => {
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
