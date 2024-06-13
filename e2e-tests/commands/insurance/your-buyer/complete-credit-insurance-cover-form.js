import { field } from '../../../pages/shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import application from '../../../fixtures/application';

const { PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

/**
 * completeCreditInsuranceCoverForm
 * completes credit insurance cover form
 * if hasHadCreditInsuranceCoverWIthBuyer, then selects yes radio and fills in conditional textarea
 * if not hasHadCreditInsuranceCoverWIthBuyer then selects no radio
 * @param {Boolean} hasHadCreditInsuranceCoverWIthBuyer - should select yes or no radio
 */
const completeCreditInsuranceCoverForm = ({
  hasHadCreditInsuranceCoverWIthBuyer = false,
  creditInsuranceCoverDescription = application.BUYER[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
}) => {
  const fieldId = PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

  if (hasHadCreditInsuranceCoverWIthBuyer) {
    cy.clickYesRadioInput();
    cy.keyboardInput(field(fieldId).textarea(), creditInsuranceCoverDescription);
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeCreditInsuranceCoverForm;
