import { ROUTES } from '../../../constants';
import { field } from '../../../pages/shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import application from '../../../fixtures/application';

const {
  YOUR_BUYER: { CREDIT_INSURANCE_COVER },
} = ROUTES.INSURANCE;

const { PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

/**
 * completeCreditInsuranceCoverForm
 * completes credit insurance cover form
 * if hasHadCreditInsuranceCoverWithBuyer, then selects yes radio and fills in conditional textarea
 * if not hasHadCreditInsuranceCoverWithBuyer then selects no radio
 * @param {boolean} hasHadCreditInsuranceCoverWithBuyer - should select yes or no radio
 */
const completeCreditInsuranceCoverForm = ({
  hasHadCreditInsuranceCoverWithBuyer = false,
  creditInsuranceCoverDescription = application.BUYER[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
}) => {
  cy.assertPathnameContains(CREDIT_INSURANCE_COVER);
  const fieldId = PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

  if (hasHadCreditInsuranceCoverWithBuyer) {
    cy.clickYesRadioInput();
    cy.keyboardInput(field(fieldId).textarea(), creditInsuranceCoverDescription);
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeCreditInsuranceCoverForm;
