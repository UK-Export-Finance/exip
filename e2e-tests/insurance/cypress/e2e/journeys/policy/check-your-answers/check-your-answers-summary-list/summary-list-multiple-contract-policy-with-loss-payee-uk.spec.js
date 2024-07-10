import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const {
  ROOT: INSURANCE_ROOT,
  POLICY,
} = INSURANCE_ROUTES;

const {
  LOSS_PAYEE: { IS_APPOINTED: LOSS_PAYEE_IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { NAME },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Check your answers - Summary list - Multiple contract policy - Using loss payee based in the UK', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({
        policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        isAppointingLossPayee: true,
        lossPayeeIsLocatedInUK: true,
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

  it('should render generic policy summary list rows', () => {
    cy.assertGenericMultiplePolicySummaryListRows();
  });

  it(`should render a ${LOSS_PAYEE_IS_APPOINTED} summary list row`, () => {
    checkSummaryList[LOSS_PAYEE_IS_APPOINTED]({ isAppointingLossPayee: true });
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[NAME]({ shouldRender: true });
  });

  it(`should render a ${FINANCIAL_ADDRESS} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[FINANCIAL_ADDRESS]({ shouldRender: true, isUk: true });
  });

  it(`should render a ${SORT_CODE} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[SORT_CODE]({ shouldRender: true });
  });

  it(`should render a ${ACCOUNT_NUMBER} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[ACCOUNT_NUMBER]({ shouldRender: true });
  });

  it(`should NOT render a ${BIC_SWIFT_CODE} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[BIC_SWIFT_CODE]({ shouldRender: false });
  });

  it(`should NOT render an ${IBAN} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[IBAN]({ shouldRender: false });
  });
});
