import { FIELD_IDS } from '../../../constants';
import { singleInputField } from '../../../pages/shared';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

/**
 * completeAndSubmitConfidentialityForm
 * Complete and submit the "confidentiality" form.
 */
const completeAndSubmitConfidentialityForm = () => {
  singleInputField(FIELD_ID).label().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitConfidentialityForm;
