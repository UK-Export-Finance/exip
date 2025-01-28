import { FIELD_IDS } from '../../../constants';
import { singleInputField } from '../../../pages/shared';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY;

/**
 * completeAndSubmitAntiBriberyForm
 * Complete and submit the "anti-bribery" form.
 */
const completeAndSubmitAntiBriberyForm = () => {
  singleInputField(FIELD_ID).label().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitAntiBriberyForm;
