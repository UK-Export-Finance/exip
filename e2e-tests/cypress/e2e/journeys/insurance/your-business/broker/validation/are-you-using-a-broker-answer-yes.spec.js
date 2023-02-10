import { broker } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/exporter-business';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const {
  BROKER: {
    USING_BROKER: FIELD_ID,
    NAME,
    ADDRESS_LINE_1,
    TOWN,
  },
} = FIELD_IDS;

const {
  ROOT,
  START,
  EXPORTER_BUSINESS: {
    BROKER,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

context('Insurance - Your business - Broker Page - As an Exporter I want to confirm that I am using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my export insurance', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();
    cy.completeAndSubmitTurnoverForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;
      checkYourAnswersUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when the yes radio is selected and no required fields are entered', () => {
    // for error assertion - common fields
    const expectedErrorsCount = 3;

    it('should display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      // NAME error check
      cy.submitAndAssertFieldErrors(broker[NAME], null, 0, expectedErrorsCount, BROKER_ERRORS[NAME].IS_EMPTY);

      // ADDRESS_LINE_1 error check
      cy.submitAndAssertFieldErrors(broker[ADDRESS_LINE_1], null, 1, expectedErrorsCount, BROKER_ERRORS[ADDRESS_LINE_1].IS_EMPTY);

      // TOWN error check
      cy.submitAndAssertFieldErrors(broker[TOWN], null, 2, expectedErrorsCount, BROKER_ERRORS[TOWN].IS_EMPTY);
    });
  });

  describe('when the yes radio is selected and all required fields are entered', () => {
    it('should not display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      broker[NAME].input().clear().type('name');
      broker[ADDRESS_LINE_1].input().clear().type('Address line 1');
      broker[TOWN].input().clear().type('town');

      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 0);
      cy.url().should('eq', checkYourAnswersUrl);
    });
  });
});
