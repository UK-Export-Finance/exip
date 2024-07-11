import { field } from '../../../pages/shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import application from '../../../fixtures/application';

const {
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = FIELD_IDS;

/**
 * assertConnectionWithBuyerFieldValues
 * Assert all field values in the "connection with buyer" form.
 */
const assertConnectionWithBuyerFieldValues = () => {
  cy.assertNoRadioOptionIsNotChecked();
  cy.assertYesRadioOptionIsChecked();

  cy.checkText(field(CONNECTION_WITH_BUYER_DESCRIPTION).textarea(), application.BUYER[CONNECTION_WITH_BUYER_DESCRIPTION]);
};

export default assertConnectionWithBuyerFieldValues;
