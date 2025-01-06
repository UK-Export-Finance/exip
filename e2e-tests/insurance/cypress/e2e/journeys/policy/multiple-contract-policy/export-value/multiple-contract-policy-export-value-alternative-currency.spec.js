import { field, heading } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { PAGES } from '../../../../../../../content-strings';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { NON_STANDARD_CURRENCY_CODE, NON_STANDARD_CURRENCY_NAME } from '../../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE, MULTIPLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy - Export value page - Alternative currency', () => {
  let referenceNumber;
  let url;
  let multipleContractPolicyUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({
        stopSubmittingAfter: 'multipleContractPolicy',
        policyType,
        isoCode: NON_STANDARD_CURRENCY_CODE,
        alternativeCurrency: true,
      });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`;
      multipleContractPolicyUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

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
      cy.assertCopyWithCurrencyName({
        expectedCopy: CONTENT_STRINGS.PAGE_TITLE,
        currencyName: NON_STANDARD_CURRENCY_NAME,
        selector: heading(),
      });
    });

    it(`should NOT render a ${TOTAL_SALES_TO_BUYER} prefix`, () => {
      cy.assertPrefix({ fieldId: TOTAL_SALES_TO_BUYER });
    });

    it(`should NOT render a ${MAXIMUM_BUYER_WILL_OWE} prefix`, () => {
      cy.assertPrefix({ fieldId: MAXIMUM_BUYER_WILL_OWE });
    });

    it('should prepopulate the radio on the single contract value page', () => {
      cy.navigateToUrl(multipleContractPolicyUrl);
      cy.assertRadioOptionIsChecked(field(ALTERNATIVE_CURRENCY_CODE).input());
    });
  });
});
