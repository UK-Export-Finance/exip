import { FIELD_VALUES } from '../../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';

const { ROOT: INSURANCE_ROOT, POLICY } = INSURANCE_ROUTES;

const {
  USING_BROKER,
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Check your answers - Summary list - Multiple contract policy - Broker - not based in UK - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({
        policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        usingBroker: true,
        brokerIsBasedInUk: false,
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

  it(`should render a ${USING_BROKER} summary list row`, () => {
    checkSummaryList[USING_BROKER]({ usingBroker: true });
  });

  it(`should render a ${FULL_ADDRESS} summary list row`, () => {
    checkSummaryList.BROKER[FULL_ADDRESS]({});
  });
});
