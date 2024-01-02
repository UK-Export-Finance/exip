import { aboutGoodsOrServicesPage } from '../../../../../../../pages/insurance/export-contract';
import { countryInput } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

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

    const descriptionField = aboutGoodsOrServicesPage[DESCRIPTION];

    const textareaField = { ...descriptionField, input: descriptionField.textarea };

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

  describe(`when ${FINAL_DESTINATION_KNOWN} is 'yes', but ${FINAL_DESTINATION} is not provided`, () => {
    it(`should render a ${FINAL_DESTINATION} validation error`, () => {
      cy.navigateToUrl(url);

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
});
