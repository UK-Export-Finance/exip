import { field } from '../../../../../../../pages/shared';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { USD, SYMBOLS } from '../../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE;

const {
  ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE, SINGLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  CONTRACT_POLICY: {
    SINGLE: { TOTAL_CONTRACT_VALUE },
  },
} = POLICY_FIELD_IDS;

const { CURRENCY: { CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy - Total contract value page - Non-GBP (supported) currency', () => {
  let referenceNumber;
  let url;
  let singleContractPolicyUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({
        isoCode: USD.isoCode,
      });

      url = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;
      singleContractPolicyUrl = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

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

    it('should render a heading with the non-GBP currency', () => {
      cy.assertHeadingWithCurrencyName({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currencyName: USD.name,
        withQuestionMark: true,
      });
    });

    it(`should render a ${TOTAL_CONTRACT_VALUE} ${USD.name} prefix`, () => {
      cy.checkText(field(TOTAL_CONTRACT_VALUE).prefix(), SYMBOLS.USD);
    });

    it('should prepopulate the radio on the single contract value page', () => {
      cy.navigateToUrl(singleContractPolicyUrl);

      const fieldId = `${CURRENCY_CODE}-${USD.isoCode}`;
      cy.assertRadioOptionIsChecked(field(fieldId).input());
    });
  });
});
