import { summaryList } from '../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../pages/insurance/policy';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../commands/insurance/check-policy-summary-list';

const {
  ROOT,
  POLICY: {
    CHECK_YOUR_ANSWERS,
    TYPE_OF_POLICY_CHANGE,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE,
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

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy type - multiple to single', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let typeOfPolicyUrl;
  let checkAndChangeTotalContractValueUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE });

      const applicationRouteUrl = `${ROOT}/${referenceNumber}`;

      checkYourAnswersUrl = `${baseUrl}${applicationRouteUrl}${CHECK_YOUR_ANSWERS}`;
      typeOfPolicyUrl = `${baseUrl}${applicationRouteUrl}${TYPE_OF_POLICY_CHANGE}`;
      checkAndChangeTotalContractValueUrl = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`;

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

      typeOfPolicyPage[POLICY_TYPE].single.label().click();
      cy.clickSubmitButton();

      cy.completeAndSubmitSingleContractPolicyForm({});
    });

    it(`should redirect to ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE} because the policy type has changed`, () => {
      const expectedUrl = `${checkAndChangeTotalContractValueUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });

    describe(`after submitting a new ${TOTAL_CONTRACT_VALUE} answer`, () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.completeAndSubmitTotalContractValueForm({});

        const expectedUrl = `${checkYourAnswersUrl}#heading`;

        cy.assertUrl(expectedUrl);
      });
    });

    describe('should render new answers and change links for new single policy fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(POLICY_TYPE, () => {
        checkSummaryList.singleContractPolicy[POLICY_TYPE]();
      });

      it(CONTRACT_COMPLETION_DATE, () => {
        checkSummaryList.singleContractPolicy[CONTRACT_COMPLETION_DATE]();
      });

      it(TOTAL_CONTRACT_VALUE, () => {
        checkSummaryList.singleContractPolicy[TOTAL_CONTRACT_VALUE]();
      });
    });
  });
});
