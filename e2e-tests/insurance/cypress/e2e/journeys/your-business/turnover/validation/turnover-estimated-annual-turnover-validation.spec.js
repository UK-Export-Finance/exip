import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/business';

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER: FIELD_ID,
  },
} = FIELD_IDS;

const TURNOVER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const ERROR_MESSAGE = TURNOVER_ERRORS[FIELD_ID];

const assertions = {
  field: fieldSelector(FIELD_ID),
  expectedErrorsCount: 2,
};

const baseUrl = Cypress.config('baseUrl');

describe(`Insurance - Your business - Turnover page - form validation - ${FIELD_ID}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT}`;

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

  it(`should display validation errors when ${FIELD_ID} is left empty`, () => {
    cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR_MESSAGE.IS_EMPTY });
  });

  it(`should display validation errors when ${FIELD_ID} is a decimal place number`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '5.5',
      expectedErrorMessage: ERROR_MESSAGE.INCORRECT_FORMAT,
    });
  });

  it(`should display validation errors when ${FIELD_ID} has special characters`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '50',
      expectedErrorMessage: ERROR_MESSAGE.INCORRECT_FORMAT,
    });
  });

  it(`should display validation errors when ${FIELD_ID} is negative but has a decimal place`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: '-123.456',
      expectedErrorMessage: ERROR_MESSAGE.INCORRECT_FORMAT,
    });
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered as a whole number`, () => {
    const fieldId = FIELD_ID;
    const field = fieldSelector(fieldId);

    cy.keyboardInput(field.input(), '5');
    cy.clickSubmitButton();
    cy.assertErrorSummaryListLength(1);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered with a comma`, () => {
    const fieldId = FIELD_ID;
    const field = fieldSelector(fieldId);

    cy.keyboardInput(field.input(), '5,00');
    cy.clickSubmitButton();
    cy.assertErrorSummaryListLength(1);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered as 0`, () => {
    const fieldId = FIELD_ID;
    const field = fieldSelector(fieldId);

    cy.keyboardInput(field.input(), '0');
    cy.clickSubmitButton();
    cy.assertErrorSummaryListLength(1);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered as a negative number`, () => {
    const fieldId = FIELD_ID;
    const field = fieldSelector(fieldId);

    cy.keyboardInput(field.input(), '-256');
    cy.clickSubmitButton();
    cy.assertErrorSummaryListLength(1);
  });
});
