import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import {
  yesRadioInput, noRadioInput, submitButton, field,
} from '../../../pages/shared';
import application from '../../../fixtures/application';

const {
  WORKING_WITH_BUYER: {
    CONNECTION_WITH_BUYER_DESCRIPTION,
  },
} = INSURANCE_FIELD_IDS.YOUR_BUYER;

/**
 * completeAndSubmitWorkingWithBuyerForm
 * Completes and submits the "working with buyer" form.
 * @param {Object} Object with flags on how to complete the form.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" form. Defaults to "yes".
 */
const completeAndSubmitConnectionToTheBuyerForm = ({ hasConnectionToBuyer = false }) => {
  if (hasConnectionToBuyer) {
    yesRadioInput().click();
    cy.keyboardInput(field(CONNECTION_WITH_BUYER_DESCRIPTION).textarea(), application.BUYER[CONNECTION_WITH_BUYER_DESCRIPTION]);
  } else {
    noRadioInput().click();
  }

  submitButton().click();
};

export default completeAndSubmitConnectionToTheBuyerForm;
