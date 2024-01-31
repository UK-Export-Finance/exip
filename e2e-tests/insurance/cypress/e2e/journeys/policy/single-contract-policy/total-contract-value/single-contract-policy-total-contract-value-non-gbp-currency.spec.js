import { field, heading } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { USD, SYMBOLS } from '../../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE;

const {
  ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE },
} = INSURANCE_ROUTES;

const {
  CONTRACT_POLICY: {
    SINGLE: { TOTAL_CONTRACT_VALUE },
  },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy - Total contract value page - Non-GBP (supported) currency', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({
        isoCode: USD.isoCode,
      });

      url = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;

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
      const expected = `${CONTENT_STRINGS.PAGE_TITLE} ${USD.name}?`;

      cy.checkText(heading(), expected);
    });

    it(`should render a ${TOTAL_CONTRACT_VALUE} ${USD.name} prefix`, () => {
      cy.checkText(field(TOTAL_CONTRACT_VALUE).prefix(), SYMBOLS.USD);
    });
  });
});
