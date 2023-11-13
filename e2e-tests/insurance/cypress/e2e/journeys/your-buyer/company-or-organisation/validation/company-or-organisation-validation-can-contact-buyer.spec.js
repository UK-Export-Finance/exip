import { submitButton } from '../../../../../../../pages/shared';
import { companyOrOrganisationPage } from '../../../../../../../pages/insurance/your-buyer';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  COMPANY_OR_ORGANISATION: {
    CAN_CONTACT_BUYER: FIELD_ID,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: COMPANY_OR_ORG_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const ERROR_MESSAGE = COMPANY_OR_ORG_ERROR_MESSAGES[FIELD_ID];

context('Insurance - Your Buyer - Company or organisation page - form validation - can contact buyer', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;

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

  const field = companyOrOrganisationPage[FIELD_ID];

  const ERROR_ASSERTIONS = {
    field: companyOrOrganisationPage[FIELD_ID],
    numberOfExpectedErrors: 7,
    errorIndex: 6,
  };

  it(`should display validation errors when ${FIELD_ID} radio buttons are not selected`, () => {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;
    const { numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

    const radioField = {
      ...field,
      input: field.yesRadioInput,
    };

    cy.submitAndAssertRadioErrors(radioField, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it('should NOT display validation errors when yes radio is selected', () => {
    field.yesRadioInput().click();

    submitButton().click();

    cy.checkErrorSummaryListHeading();
    partials.errorSummaryListItems().should('have.length', 6);
  });

  it('should NOT display validation errors when no radio is selected', () => {
    field.noRadioInput().click();

    submitButton().click();

    cy.checkErrorSummaryListHeading();
    partials.errorSummaryListItems().should('have.length', 6);
  });
});
