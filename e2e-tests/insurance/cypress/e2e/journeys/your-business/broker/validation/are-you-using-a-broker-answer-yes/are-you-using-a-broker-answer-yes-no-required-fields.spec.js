import { brokerPage } from '../../../../../../../../pages/your-business';
import { field as fieldSelector } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/business';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';

const {
  BROKER: {
    USING_BROKER: FIELD_ID,
    NAME,
    ADDRESS_LINE_1,
    TOWN,
    EMAIL,
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { BROKER },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const field = brokerPage[FIELD_ID];

context('Insurance - Your business - Broker Page - As an Exporter I want to confirm that I am using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my export insurance', () => {
  let referenceNumber;

  before(() => {
    cy.clearCookies();

    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should display validation errors when the yes radio is selected and no required fields are entered', () => {
    const expectedErrorsCount = 5;

    field.yesRadioInput().click();

    // NAME error check
    cy.submitAndAssertFieldErrors(fieldSelector(NAME), null, 0, expectedErrorsCount, BROKER_ERRORS[NAME].IS_EMPTY);

    // ADDRESS_LINE_1 error check
    cy.submitAndAssertFieldErrors(fieldSelector(ADDRESS_LINE_1), null, 1, expectedErrorsCount, BROKER_ERRORS[ADDRESS_LINE_1].IS_EMPTY);

    // TOWN error check
    cy.submitAndAssertFieldErrors(fieldSelector(TOWN), null, 2, expectedErrorsCount, BROKER_ERRORS[TOWN].IS_EMPTY);

    // EMAIL error check
    cy.submitAndAssertFieldErrors(fieldSelector(EMAIL), null, 3, expectedErrorsCount, BROKER_ERRORS[EMAIL].INCORRECT_FORMAT);
  });
});
