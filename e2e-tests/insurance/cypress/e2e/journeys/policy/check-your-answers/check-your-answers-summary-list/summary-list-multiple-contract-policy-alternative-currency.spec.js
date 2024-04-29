import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';
import { NON_STANDARD_CURRENCY_CODE, NON_STANDARD_CURRENCY_NAME } from '../../../../../../../fixtures/currencies';

const {
  ROOT: INSURANCE_ROOT,
  POLICY,
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Check your answers - Summary list - Multiple contract policy - Alternative currency', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({
        policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        isoCode: NON_STANDARD_CURRENCY_CODE,
        alternativeCurrency: true,
      });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${POLICY.CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render ${TOTAL_SALES_TO_BUYER} with alternative currency code`, () => {
    checkSummaryList.multipleContractPolicy[TOTAL_SALES_TO_BUYER](NON_STANDARD_CURRENCY_CODE);
  });

  it(`should render ${MAXIMUM_BUYER_WILL_OWE} with alternative currency code`, () => {
    checkSummaryList.multipleContractPolicy[MAXIMUM_BUYER_WILL_OWE](NON_STANDARD_CURRENCY_CODE);
  });

  it(`should render ${CURRENCY_CODE} with alternative currency code`, () => {
    checkSummaryList[CURRENCY_CODE](NON_STANDARD_CURRENCY_NAME);
  });
});
