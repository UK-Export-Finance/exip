import { aboutGoodsOrServicesPage } from '../../../../../../../pages/insurance/export-contract';
import { countryInput, yesRadioInput, noRadioInput } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/export-contract';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../../fixtures/countries';

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION, FINAL_DESTINATION_KNOWN },
  },
} = INSURANCE_FIELD_IDS;

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
    const expectedErrorsCount = 2;

    // description
    cy.submitAndAssertFieldErrors(
      textareaField,
      null,
      0,
      expectedErrorsCount,
      ABOUT_ERROR_MESSAGES[DESCRIPTION].IS_EMPTY,
      false,
    );

    // final destination known
    cy.submitAndAssertFieldErrors(
      countryInput.field(FINAL_DESTINATION_KNOWN),
      null,
      1,
      expectedErrorsCount,
      ABOUT_ERROR_MESSAGES[FINAL_DESTINATION_KNOWN].IS_EMPTY,
      false,
    );
  });

  it(`should display validation errors if ${DESCRIPTION} is over ${MAXIMUM} characters`, () => {
    cy.navigateToUrl(url);

    const errorIndex = 0;
    const expectedErrorsCount = 2;

    const errorMessage = ABOUT_ERROR_MESSAGES[DESCRIPTION].ABOVE_MAXIMUM;

    cy.submitAndAssertFieldErrors(
      textareaField,
      descriptionOverMaximum,
      errorIndex,
      expectedErrorsCount,
      errorMessage,
      true,
    );
  });

  describe(`when ${FINAL_DESTINATION_KNOWN} is 'yes', but ${FINAL_DESTINATION} is not provided`, () => {
    it(`should render a ${FINAL_DESTINATION} validation error`, () => {
      cy.navigateToUrl(url);

      // TODO : could just be "complete" form, as we submit below.
      cy.completeAndSubmitAboutGoodsOrServicesForm({
        includeFinalDestination: false,
      });

      const expectedErrorsCount = 1;

      cy.submitAndAssertFieldErrors(
        countryInput.field(FINAL_DESTINATION),
        null,
        0,
        expectedErrorsCount,
        ABOUT_ERROR_MESSAGES[FINAL_DESTINATION].IS_EMPTY,
        false,
      );
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

      yesRadioInput().should('be.checked');

      cy.checkText(countryInput.field(FINAL_DESTINATION).results(), COUNTRY_APPLICATION_SUPPORT.ONLINE.NAME);
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

      noRadioInput().should('be.checked');
    });
  });
});
