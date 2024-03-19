import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../constants/field-ids/insurance';
import { field, backLink } from '../../../../../pages/shared';
import mockNameWithSpecialCharacters from '../../../../../fixtures/name-with-special-characters';
import application from '../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    LOSS_PAYEE_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    LOSS_PAYEE_DETAILS: {
      NAME,
    },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const { POLICY } = application;

const nameValue = mockNameWithSpecialCharacters(POLICY[NAME]);

context('Insurance - Name fields - Loss payee details - Name field should render special characters without character codes after submission', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: false });
      cy.completeAndSubmitLossPayeeForm({ appointingLossPayee: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(NAME, () => {
    describe('when submitting the name field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(url);

        cy.completeAndSubmitLossPayeeDetailsForm({ name: nameValue });

        backLink().click();

        cy.assertUrl(url);
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkValue(field(NAME), nameValue);
      });
    });
  });
});
