import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';
import application from '../../../fixtures/application';

const {
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
} = FIELD_IDS;

/**
 * completeAndSubmitCreditInsuranceCoverForm
 * completes credit insurance cover form and clicks submit button
 * @param {Boolean} hasHadCreditInsuranceCover - should select yes or no radio
 */
const completeAndSubmitCreditInsuranceCoverForm = ({
  hasHadCreditInsuranceCover = false,
  creditInsuranceCoverDescription = application.BUYER[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
}) => {
  cy.completeCreditInsuranceCoverForm({ hasHadCreditInsuranceCover, creditInsuranceCoverDescription });
  cy.clickSubmitButton();
};

export default completeAndSubmitCreditInsuranceCoverForm;
