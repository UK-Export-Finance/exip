import { field, radios } from '../../pages/shared';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../content-strings/fields/insurance';
import application from '../../fixtures/application';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const { OPEN_TENDER, NEGOTIATED_CONTRACT, DIRECT_AWARD, COMPETITIVE_BIDDING, OTHER } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD].OPTIONS;

/**
 * completeHowWasTheContractAwardedForm
 * Complete the "How was the contract awarded" form
 * @param {boolean} openTender: Award method as OPEN_TENDER. Defaults to true
 * @param {boolean} negotiatedContract: Award method as NEGOTIATED_CONTRACT. Defaults to false
 * @param {boolean} directAward: Award method as DIRECT_AWARD. Defaults to false
 * @param {boolean} competitiveBidding: Award method as COMPETITIVE_BIDDING. Defaults to false
 * @param {boolean} otherMethod: Award method as OTHER. Defaults to false
 * @param {string} otherMethodText: OTHER award method text
 */
const completeHowWasTheContractAwardedForm = ({
  openTender = true,
  negotiatedContract = false,
  directAward = false,
  competitiveBidding = false,
  otherMethod = false,
  otherMethodText = application.EXPORT_CONTRACT[OTHER_AWARD_METHOD],
}) => {
  let selector;

  if (openTender) {
    selector = radios(OPEN_TENDER.ID).option;
  }

  if (negotiatedContract) {
    selector = radios(NEGOTIATED_CONTRACT.ID).option;
  }

  if (directAward) {
    selector = radios(DIRECT_AWARD.ID).option;
  }

  if (competitiveBidding) {
    selector = radios(COMPETITIVE_BIDDING.ID).option;
  }

  if (otherMethod) {
    selector = radios(OTHER.ID).option;

    selector.label().click();

    if (otherMethodText) {
      cy.keyboardInput(field(OTHER_AWARD_METHOD).input(), otherMethodText);
    }
  }

  selector.label().click();
};

export default completeHowWasTheContractAwardedForm;
