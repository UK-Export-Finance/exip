import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { field } from '../../../pages/shared';
import application from '../../../fixtures/application';

const {
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = INSURANCE_FIELD_IDS.YOUR_BUYER;

/**
 * completeConnectionWithTheBuyerForm
 * Complete the "connection with the buyer" form.
 * @param {Boolean} hasConnectionToBuyer: Should submit "yes" to "have connection to buyer" radio. Defaults to "no".
 * @param {String} description: "Connection with buyer" description.
 */
const completeConnectionWithTheBuyerForm = ({
  hasConnectionToBuyer = false,
  description = application.BUYER[CONNECTION_WITH_BUYER_DESCRIPTION],
}) => {
  if (hasConnectionToBuyer) {
    cy.clickYesRadioInput();
    cy.keyboardInput(field(CONNECTION_WITH_BUYER_DESCRIPTION).textarea(), description);
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeConnectionWithTheBuyerForm;
