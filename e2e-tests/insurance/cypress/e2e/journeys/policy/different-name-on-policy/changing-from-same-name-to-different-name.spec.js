import {
  summaryList,
  field as fieldSelector,
} from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: { NAME, SAME_NAME, OTHER_NAME },
    DIFFERENT_NAME_ON_POLICY: {
      POSITION,
    },
  },
  ACCOUNT: {
    FIRST_NAME, LAST_NAME, EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Policy - Different name on Policy page - Changing ${SAME_NAME} to ${OTHER_NAME} should not populate fields on different name on policy page`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection();
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitNameOnPolicyForm({});
      cy.completeAndSubmitBrokerForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when changing from same name to different name', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(NAME).changeLink().click();

      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });
    });

    it('should not have fields populated on different name on policy page', () => {
      cy.checkValue(fieldSelector(FIRST_NAME), '');
      cy.checkValue(fieldSelector(LAST_NAME), '');
      cy.checkValue(fieldSelector(EMAIL), '');
      cy.checkValue(fieldSelector(POSITION), '');
    });
  });
});
