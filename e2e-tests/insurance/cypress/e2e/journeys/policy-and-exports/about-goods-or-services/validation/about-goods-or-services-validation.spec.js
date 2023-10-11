import { aboutGoodsOrServicesPage } from '../../../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../../../partials';
import { countryInput } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';

const { taskList } = partials.insurancePartials;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: ABOUT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - About goods or services page - form validation', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      cy.completeAndSubmitSingleContractPolicyForm({});

      const expectedUrl = `${baseUrl}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`;

      cy.assertUrl(expectedUrl);
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

    // final destination
    cy.submitAndAssertFieldErrors(
      countryInput.field(FINAL_DESTINATION),
      null,
      1,
      expectedErrorsCount,
      ABOUT_ERROR_MESSAGES[FINAL_DESTINATION].IS_EMPTY,
      false,
    );
  });
});
