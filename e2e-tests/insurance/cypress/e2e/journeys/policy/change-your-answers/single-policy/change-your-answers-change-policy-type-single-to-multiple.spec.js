import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const {
  ROOT,
  POLICY: { CHECK_YOUR_ANSWERS, TYPE_OF_POLICY_CHANGE, MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE },
} = INSURANCE_ROUTES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy type - single to multiple', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let typeOfPolicyUrl;
  let exportValueUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({});

      const applicationRouteUrl = `${ROOT}/${referenceNumber}`;

      checkYourAnswersUrl = `${baseUrl}${applicationRouteUrl}${CHECK_YOUR_ANSWERS}`;
      typeOfPolicyUrl = `${baseUrl}${applicationRouteUrl}${TYPE_OF_POLICY_CHANGE}`;
      exportValueUrl = `${baseUrl}${applicationRouteUrl}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE}`;

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
      cy.changePolicyTypeToMultipleAndSubmitContractPolicyForm();
    });

    it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE} with heading anchor`, () => {
      const expectedUrl = `${exportValueUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });

    describe(`after completing (now required) ${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE} fields for a multiple policy`, () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
        cy.changePolicyTypeToMultipleAndSubmitContractPolicyForm();

        cy.completeAndSubmitExportValueForm({});
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        const expectedUrl = `${checkYourAnswersUrl}#heading`;

        cy.assertUrl(expectedUrl);
      });
    });

    describe('render new answers and change links for new multiple policy fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(POLICY_TYPE, () => {
        checkSummaryList.multipleContractPolicy[POLICY_TYPE]();
      });

      it(TOTAL_MONTHS_OF_COVER, () => {
        checkSummaryList.multipleContractPolicy[TOTAL_MONTHS_OF_COVER]();
      });

      it(TOTAL_SALES_TO_BUYER, () => {
        checkSummaryList.multipleContractPolicy[TOTAL_SALES_TO_BUYER]();
      });

      it(MAXIMUM_BUYER_WILL_OWE, () => {
        checkSummaryList.multipleContractPolicy[MAXIMUM_BUYER_WILL_OWE]();
      });
    });
  });
});
