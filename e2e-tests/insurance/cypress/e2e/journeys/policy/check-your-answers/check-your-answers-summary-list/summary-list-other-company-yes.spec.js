import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  POLICY,
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    REQUESTED,
    COMPANY_NAME,
    COMPANY_NUMBER,
    COUNTRY_CODE,
  },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Check your answers - Summary list - Other company as yes', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ sameName: false, otherCompanyInvolved: true });

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
    cy.assertGenericSinglePolicySummaryListRows();
  });

  it(`should render a ${REQUESTED} summary list row`, () => {
    checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[REQUESTED]({ requested: true });
  });

  it(`should render a ${COMPANY_NAME} summary list row`, () => {
    checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NAME]({ shouldRender: true });
  });

  it(`should render a ${COMPANY_NUMBER} summary list row`, () => {
    checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NUMBER]({ shouldRender: true });
  });

  it(`should render a ${COUNTRY_CODE} summary list row`, () => {
    checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[COUNTRY_CODE]({ shouldRender: true });
  });
});
