import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { mockBicSwiftCodeLowerCase } from '../../../../../../fixtures/bic-swift-codes';
import { mockIbanLowerCase } from '../../../../../../fixtures/ibans';

const {
  ROOT,
  POLICY: { LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Policy - Loss Payee Financial Details - International - Lower case entries - As an exporter, I want to provide UKEF with my loss payee's financial International details So that they can be paid in the event of a claim on the policy",
  () => {
    let referenceNumber;
    let url;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({ formToStopAt: 'lossPayeeDetails', isAppointingLossPayee: true, locatedInUK: false });

        url = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`;
        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe('form submission', () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitLossPayeeFinancialDetailsInternationalForm({ iban: mockIbanLowerCase, bicSwiftCode: mockBicSwiftCodeLowerCase });

        cy.assertUrl(checkYourAnswersUrl);
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values in upper case', () => {
        cy.navigateToUrl(url);

        cy.assertLossPayeeFinancialInternationalFieldValues({
          expectedIban: mockIbanLowerCase.toUpperCase(),
          expectedBicSwiftCode: mockBicSwiftCodeLowerCase.toUpperCase(),
        });
      });
    });
  },
);
