import { broker } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/exporter-business';

const {
  BROKER: {
    USING_BROKER: FIELD_ID,
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
const ERROR_MESSAGE = BROKER_ERRORS[FIELD_ID];

const ERROR_ASSERTIONS = {
  field: broker[FIELD_ID],
  numberOfExpectedErrors: 1,
  errorIndex: 0,
};

context('Insurance - Your business - Broker Page - As an Exporter I want to confirm that I am not using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my export insurance', () => {
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

  describe('when radio is not clicked', () => {
    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    it(`should display validation errors if ${FIELD_ID} radio not selected`, () => {
      const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

      cy.submitAndAssertRadioErrors(field, errorIndex, numberOfExpectedErrors, errorMessage);
    });
  });

  describe('when the no radio is selected', () => {
    it(`should  not display validation errors and redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      const field = broker[FIELD_ID];

      field.noRadioInput().click();
      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 0);
      cy.url().should('eq', checkYourAnswersUrl);
    });
  });
});
