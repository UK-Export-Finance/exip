import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { FIELD_VALUES } from '../../../../../constants/field-values';
import { field, backLink } from '../../../../../pages/shared';
import mockStringWithSpecialCharacters from '../../../../../fixtures/string-with-special-characters';

const {
  ROOT,
  POLICY: { PRE_CREDIT_PERIOD },
} = INSURANCE_ROUTES;

const { CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Textarea fields - `Policy` textarea fields should render special characters without character codes after submission', () => {
  let referenceNumber;
  let preCreditPeriodUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm();
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });

      preCreditPeriodUrl = `${baseUrl}${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(CREDIT_PERIOD_WITH_BUYER, () => {
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(preCreditPeriodUrl);

        cy.completeAndSubmitPreCreditPeriodForm({
          needPreCreditPeriod: true,
          description: mockStringWithSpecialCharacters,
        });

        backLink().click();

        cy.assertUrl(preCreditPeriodUrl);
      });

      it('should render special characters exactly as they were submitted', () => {
        const descriptionField = field(CREDIT_PERIOD_WITH_BUYER);

        const textareaField = {
          ...descriptionField,
          input: descriptionField.textarea,
        };

        cy.checkValue(textareaField, mockStringWithSpecialCharacters);
      });
    });
  });
});
