import { yesRadioInput, noRadioInput, field } from '../../../pages/shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';

const {
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
} = FIELD_IDS;

/**
 * completeCreditInsuranceCoverForm
 * completes credit insurance cover form
 * if hasHadCreditInsuranceCover, then selects yes radio and fills in conditional text area
 * if not hasHadCreditInsuranceCover then selects no radio
 * @param {Boolean} hasHadCreditInsuranceCover - should select yes or no radio
 */
const completeCreditInsuranceCoverForm = ({ hasHadCreditInsuranceCover = false }) => {
  const fieldId = PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

  if (hasHadCreditInsuranceCover) {
    yesRadioInput().click();
    cy.keyboardInput(field(fieldId).textarea(), 'test');
  } else {
    noRadioInput().click();
  }
};

export default completeCreditInsuranceCoverForm;
