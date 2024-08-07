import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
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

        cy.clickBackLink();
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: CREDIT_PERIOD_WITH_BUYER,
          expectedValue: mockStringWithSpecialCharacters,
        });
      });
    });
  });
});
