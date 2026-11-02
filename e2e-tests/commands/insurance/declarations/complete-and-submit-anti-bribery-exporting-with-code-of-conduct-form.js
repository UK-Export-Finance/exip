import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitAntiBriberyExportingWithCodeOfConductForm
 * Complete and submit the "anti-bribery - exporting with code of conduct" form.
 * @param {boolean} Yes/no answer
 */
const completeAndSubmitAntiBriberyExportingWithCodeOfConductForm = (answer) => {
  cy.assertPathnameContains(INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.EXPORTING_WITH_CODE_OF_CONDUCT);

  if (answer === FIELD_VALUES.NO) {
    cy.clickNoRadioInput();
  } else {
    cy.clickYesRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitAntiBriberyExportingWithCodeOfConductForm;
