import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitDeclarationAntiBriberyCodeOfConduct
 * @param {boolean} Yes/no answer
 */
const completeAndSubmitDeclarationAntiBriberyCodeOfConduct = (answer) => {
  cy.assertPathnameContains(INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.CODE_OF_CONDUCT);

  if (answer === FIELD_VALUES.NO) {
    cy.clickNoRadioInput();
  } else {
    cy.clickYesRadioInput();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitDeclarationAntiBriberyCodeOfConduct;
