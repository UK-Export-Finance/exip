import { yourContactPage } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/exporter-business';

const {
  CONTACT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL_ADDRESS,
    POSITION,
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    CONTACT,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const YOUR_CONTACT_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

describe('Insurance - Your business - Contact page - form validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CONTACT}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    yourContactPage.field(FIRST_NAME).input().clear();
    yourContactPage.field(LAST_NAME).input().clear();
    yourContactPage.field(EMAIL_ADDRESS).input().clear();
    yourContactPage.field(POSITION).input().clear();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe(FIRST_NAME, () => {
    const FIELD_ID = FIRST_NAME;
    const ERROR_MESSAGE = YOUR_CONTACT_ERRORS[FIELD_ID];

    const ERROR_ASSERTIONS = {
      field: yourContactPage.field(FIELD_ID),
      numberOfExpectedErrors: 4,
      errorIndex: 0,
    };

    it(`should display validation errors when ${FIELD_ID} left empty`, () => {
      const errorMessage = ERROR_MESSAGE.IS_EMPTY;

      const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
      const value = null;

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
    });
  });

  describe(LAST_NAME, () => {
    const FIELD_ID = LAST_NAME;
    const ERROR_MESSAGE = YOUR_CONTACT_ERRORS[FIELD_ID];

    const ERROR_ASSERTIONS = {
      field: yourContactPage.field(FIELD_ID),
      numberOfExpectedErrors: 4,
      errorIndex: 1,
    };

    it(`should display validation errors when ${FIELD_ID} left empty`, () => {
      const errorMessage = ERROR_MESSAGE.IS_EMPTY;

      const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
      const value = null;

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
    });
  });

  describe(EMAIL_ADDRESS, () => {
    const FIELD_ID = EMAIL_ADDRESS;
    const ERROR_MESSAGE = YOUR_CONTACT_ERRORS[FIELD_ID];

    const ERROR_ASSERTIONS = {
      field: yourContactPage.field(FIELD_ID),
      numberOfExpectedErrors: 4,
      errorIndex: 2,
    };

    it(`should display validation errors when ${FIELD_ID} left empty`, () => {
      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

      const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
      const value = null;

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
    });

    it(`should display validation errors when ${FIELD_ID} is incorrectly entered`, () => {
      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

      const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
      const value = 'test';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
    });
  });

  describe(POSITION, () => {
    const FIELD_ID = POSITION;
    const ERROR_MESSAGE = YOUR_CONTACT_ERRORS[FIELD_ID];

    const ERROR_ASSERTIONS = {
      field: yourContactPage.field(FIELD_ID),
      numberOfExpectedErrors: 4,
      errorIndex: 3,
    };

    it(`should display validation errors when ${FIELD_ID} left empty`, () => {
      const errorMessage = ERROR_MESSAGE.IS_EMPTY;

      const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
      const value = null;

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
    });
  });
});
