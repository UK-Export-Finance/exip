import { submitButton, summaryList } from '../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../pages/insurance/policy';
import { FIELD_VALUES } from '../../../../../../constants';
import { DEFAULT, LINKS } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import application from '../../../../../../fixtures/application';

const {
  ROOT,
  POLICY: {
    CHECK_YOUR_ANSWERS,
    TYPE_OF_POLICY_CHANGE,
    MULTIPLE_CONTRACT_POLICY_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    CONTRACT_POLICY: {
      MULTIPLE: {
        TOTAL_MONTHS_OF_COVER,
      },
    },
    EXPORT_VALUE: {
      MULTIPLE: {
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const MULTIPLE_FIELD_STRINGS = {
  ...FIELDS.CONTRACT_POLICY.MULTIPLE,
  ...FIELDS.EXPORT_VALUE.MULTIPLE,
};

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy type - single to multiple', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let typeOfPolicyUrl;
  let changeLinkHref;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({});

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

      cy.completeAndSubmitMultipleContractPolicyForm();
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
        cy.assertSummaryListRowValue(summaryList, POLICY_TYPE, FIELD_VALUES.POLICY_TYPE.MULTIPLE);
      });

      it(TOTAL_MONTHS_OF_COVER, () => {
        const fieldId = TOTAL_MONTHS_OF_COVER;

        const expectedTotalMonthsOfCover = `${application.POLICY[fieldId]} months`;

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedTotalMonthsOfCover);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.CHANGE} ${MULTIPLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });

      it(TOTAL_SALES_TO_BUYER, () => {
        const fieldId = TOTAL_SALES_TO_BUYER;

        cy.assertSummaryListRowValue(summaryList, fieldId, DEFAULT.EMPTY);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });

      it(MAXIMUM_BUYER_WILL_OWE, () => {
        const fieldId = MAXIMUM_BUYER_WILL_OWE;

        cy.assertSummaryListRowValue(summaryList, fieldId, DEFAULT.EMPTY);

        cy.checkLink(
          summaryList.field(fieldId).changeLink(),
          `${changeLinkHref}#${fieldId}-label`,
          `${LINKS.ADD} ${MULTIPLE_FIELD_STRINGS[fieldId].SUMMARY.TITLE}`,
        );
      });
    });
  });
});
