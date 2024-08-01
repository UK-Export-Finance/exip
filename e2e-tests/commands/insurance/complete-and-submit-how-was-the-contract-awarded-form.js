import { radios } from '../../pages/shared';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../content-strings/fields/insurance';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const AWARD_METHOD_OPTIONS = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD].OPTIONS;

/**
 * completeAndSubmitHowWasTheContractAwardedForm
 * Complete and submit the "How was the contract awarded" form
 */
const completeAndSubmitHowWasTheContractAwardedForm = () => {
  const selector = radios(AWARD_METHOD_OPTIONS.OPEN_TENDER.ID).option;

  selector.label().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitHowWasTheContractAwardedForm;
