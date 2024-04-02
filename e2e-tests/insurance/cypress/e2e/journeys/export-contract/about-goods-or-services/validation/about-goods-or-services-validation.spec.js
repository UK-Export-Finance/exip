import { aboutGoodsOrServicesPage } from '../../../../../../../pages/insurance/export-contract';
import { autoCompleteField } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/export-contract';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../../fixtures/countries';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION, FINAL_DESTINATION_KNOWN },
} = FIELD_IDS;

const {
  ROOT: INSURANCE_ROOT,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      ABOUT_GOODS_OR_SERVICES: ABOUT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const { YES, NO } = FIELD_VALUES;

const {
  ABOUT_GOODS_OR_SERVICES: {
    [DESCRIPTION]: { MAXIMUM },
  },
} = FIELDS;

const descriptionField = aboutGoodsOrServicesPage[DESCRIPTION];

const textareaField = {
  ...descriptionField,
  input: descriptionField.textarea,
};

const descriptionOverMaximum = 'a'.repeat(MAXIMUM + 1);

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - About goods or services page - form validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceExportContractSection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should render validation errors for all required fields', () => {
    // description
    cy.submitAndAssertFieldErrors({
      field: textareaField,
      expectedErrorsCount: 2,
      expectedErrorMessage: ABOUT_ERROR_MESSAGES[DESCRIPTION].IS_EMPTY,
      clearInput: false,
    });

    // final destination known
    cy.submitAndAssertFieldErrors({
      field: autoCompleteField(FINAL_DESTINATION_KNOWN),
      errorIndex: 1,
      expectedErrorsCount: 2,
      expectedErrorMessage: ABOUT_ERROR_MESSAGES[FINAL_DESTINATION_KNOWN].IS_EMPTY,
      clearInput: false,
    });
  });

  it(`should display validation errors if ${DESCRIPTION} is over ${MAXIMUM} characters`, () => {
    cy.navigateToUrl(url);

    cy.submitAndAssertFieldErrors({
      field: textareaField,
      value: descriptionOverMaximum,
      expectedErrorsCount: 2,
      expectedErrorMessage: ABOUT_ERROR_MESSAGES[DESCRIPTION].ABOVE_MAXIMUM,
    });
  });

  describe(`when ${FINAL_DESTINATION_KNOWN} is 'yes', but ${FINAL_DESTINATION} is not provided`, () => {
    it(`should render a ${FINAL_DESTINATION} validation error`, () => {
      cy.navigateToUrl(url);

      cy.completeAboutGoodsOrServicesForm({
        includeFinalDestination: false,
      });

      cy.submitAndAssertFieldErrors({
        field: autoCompleteField(FINAL_DESTINATION),
        expectedErrorsCount: 1,
        expectedErrorMessage: ABOUT_ERROR_MESSAGES[FINAL_DESTINATION].IS_EMPTY,
        clearInput: false,
      });
    });
  });

  describe(`when ${FINAL_DESTINATION_KNOWN} is '${YES}', ${FINAL_DESTINATION} is provided, but ${DESCRIPTION} is over ${MAXIMUM} characters`, () => {
    it('should retain all submitted values', () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitAboutGoodsOrServicesForm({
        description: descriptionOverMaximum,
        includeFinalDestination: true,
      });

      descriptionField.textarea().should('have.value', descriptionOverMaximum);

      cy.assertYesRadioOptionIsChecked();

      cy.checkText(autoCompleteField(FINAL_DESTINATION).results(), COUNTRY_APPLICATION_SUPPORT.ONLINE.NAME);
    });
  });

  describe(`when ${FINAL_DESTINATION_KNOWN} is '${NO}', but ${DESCRIPTION} is over ${MAXIMUM} characters`, () => {
    it('should retain all submitted values', () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitAboutGoodsOrServicesForm({
        finalDestinationKnown: false,
        description: descriptionOverMaximum,
      });

      descriptionField.textarea().should('have.value', descriptionOverMaximum);

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
