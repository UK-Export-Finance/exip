import { submitButton, summaryList } from '../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../pages/insurance/policy';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { LINKS } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { createTimestampFromNumbers, formatDate } from '../../../../../../helpers/date';
import formatCurrency from '../../../../../../helpers/format-currency';
import application from '../../../../../../fixtures/application';

const {
  ROOT,
  POLICY: {
    CHECK_YOUR_ANSWERS,
    TYPE_OF_POLICY_CHANGE,
    SINGLE_CONTRACT_POLICY_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    CONTRACT_POLICY: {
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

const { CONTRACT_POLICY: { SINGLE: SINGLE_FIELD_STRINGS } } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy type - multiple to single', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let typeOfPolicyUrl;
  let changeLinkHref;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE });

      const applicationRouteUrl = `${ROOT}/${referenceNumber}`;

      checkYourAnswersUrl = `${baseUrl}${applicationRouteUrl}${CHECK_YOUR_ANSWERS}`;
      typeOfPolicyUrl = `${baseUrl}${applicationRouteUrl}${TYPE_OF_POLICY_CHANGE}`;
      changeLinkHref = `${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHANGE}`;

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

  describe('after submitting a new policy type (single) and completing (now required) fields for a single policy', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(POLICY_TYPE).changeLink().click();

      typeOfPolicyPage[POLICY_TYPE].single.input().click();
      submitButton().click();

      cy.completeAndSubmitSingleContractPolicyForm();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      const expectedUrl = `${checkYourAnswersUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });

    describe('should render new answers and change links for new single policy fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(POLICY_TYPE, () => {
        cy.assertSummaryListRowValue(summaryList, POLICY_TYPE, FIELD_VALUES.POLICY_TYPE.SINGLE);
      });

      it(CONTRACT_COMPLETION_DATE, () => {
        const fieldId = CONTRACT_COMPLETION_DATE;
        const newAnswer = application.POLICY[fieldId];

        const expectedDate = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedDate);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${SINGLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });

      it(TOTAL_CONTRACT_VALUE, () => {
        const fieldId = TOTAL_CONTRACT_VALUE;

        const expectedTotalContractValue = formatCurrency(application.POLICY[fieldId]);

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedTotalContractValue);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${SINGLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });
    });
  });
});
