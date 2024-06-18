import { summaryList } from '../../../../../../../pages/shared';
import { POLICY as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  POLICY: {
    CHECK_YOUR_ANSWERS,
    NAME_ON_POLICY_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  NAME_ON_POLICY: { NAME, OTHER_NAME, SAME_NAME },
} = FIELD_IDS;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: NAME_ON_POLICY_CHANGE,
  checkYourAnswersRoute: CHECK_YOUR_ANSWERS,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const fieldId = NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Policy contact - As an exporter, I want to change my answers from different name to the same name on policy as policy owner', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ sameName: false });

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

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${NAME_ON_POLICY_CHANGE}`, () => {
      cy.navigateToUrl(url);
      const fieldVariables = getFieldVariables(fieldId, referenceNumber);

      cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
    });
  });

  describe(`when changing from ${OTHER_NAME} to ${SAME_NAME} and then back to ${OTHER_NAME}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(NAME).changeLink().click();

      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });

      summaryList.field(NAME).changeLink().click();

      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });
    });

    it('should NOT have fields populated on different name on policy page', () => {
      cy.assertDifferentNameOnPolicyFieldValues({});
    });
  });
});
