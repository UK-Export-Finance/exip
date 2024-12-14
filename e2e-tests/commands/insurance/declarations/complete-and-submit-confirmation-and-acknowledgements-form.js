import { FIELD_IDS } from '../../../constants';
import { singleInputField } from '../../../pages/shared';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS;

const completeAndSubmitConfirmationAndAcknowledgementsForm = () => {
  singleInputField(FIELD_ID).label().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitConfirmationAndAcknowledgementsForm;
