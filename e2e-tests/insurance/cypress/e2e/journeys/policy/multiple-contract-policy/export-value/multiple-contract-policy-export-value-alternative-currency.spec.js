import { field } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { PAGES } from '../../../../../../../content-strings';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { NON_STANDARD_CURRENCY_CODE, NON_STANDARD_CURRENCY_NAME } from '../../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
  },
} = INSURANCE_ROUTES;

const {
  EXPORT_VALUE: {
    MULTIPLE: {
      TOTAL_SALES_TO_BUYER,
      MAXIMUM_BUYER_WILL_OWE,
    },
  },
} = POLICY_FIELD_IDS;

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy - Export value page - Alternative currency', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm({ policyType });

      cy.completeAndSubmitMultipleContractPolicyForm({
        isoCode: NON_STANDARD_CURRENCY_CODE,
        alternativeCurrency: true,
      });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a heading with the alternative currency', () => {
      cy.assertHeadingWithCurrencyName({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currencyName: NON_STANDARD_CURRENCY_NAME,
      });
    });

    it(`should NOT render a ${TOTAL_SALES_TO_BUYER} prefix`, () => {
      field(TOTAL_SALES_TO_BUYER).prefix().should('not.exist');
    });

    it(`should NOT render a ${MAXIMUM_BUYER_WILL_OWE} prefix`, () => {
      field(MAXIMUM_BUYER_WILL_OWE).prefix().should('not.exist');
    });
  });
});
