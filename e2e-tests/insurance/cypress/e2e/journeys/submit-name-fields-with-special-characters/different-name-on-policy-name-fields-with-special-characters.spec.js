import { INSURANCE_FIELD_IDS } from '../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { FIELD_VALUES } from '../../../../../constants/field-values';
import { field, backLink } from '../../../../../pages/shared';
import mockAccount from '../../../../../fixtures/account';
import mockNameWithSpecialCharacters from '../../../../../fixtures/name-with-special-characters';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { DIFFERENT_NAME_ON_POLICY },
} = INSURANCE_ROUTES;

const mockAccountSpecialCharacters = {
  ...mockAccount,
  [FIRST_NAME]: mockNameWithSpecialCharacters(mockAccount[FIRST_NAME]),
  [LAST_NAME]: mockNameWithSpecialCharacters(mockAccount[LAST_NAME]),
};

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Name fields - `Policy contact` name fields should render special characters without character codes after submission', () => {
  let referenceNumber;
  let differentNamOnPolicyUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm();
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });

      differentNamOnPolicyUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe("'policy - policy contact' page", () => {
    describe('when submitting name fields with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(differentNamOnPolicyUrl);

        cy.completeAndSubmitDifferentNameOnPolicyForm({
          [FIRST_NAME]: mockAccountSpecialCharacters[FIRST_NAME],
          [LAST_NAME]: mockAccountSpecialCharacters[LAST_NAME],
        });

        backLink().click();

        cy.assertUrl(differentNamOnPolicyUrl);
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkValue(field(FIRST_NAME), mockAccountSpecialCharacters[FIRST_NAME]);
        cy.checkValue(field(LAST_NAME), mockAccountSpecialCharacters[LAST_NAME]);
      });
    });
  });
});
