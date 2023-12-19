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
 * completeAndSubmitConnectionToTheBuyerForm
 * Completes and submits the "connection to the buyer" form.
 * @param {Object} Object with flags on how to complete the form.
 * - hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio. Defaults to "no".
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
