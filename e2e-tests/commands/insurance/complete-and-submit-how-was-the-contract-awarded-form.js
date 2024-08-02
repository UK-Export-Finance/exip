import { field, radios } from '../../pages/shared';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../content-strings/fields/insurance';
import application from '../../fixtures/application';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const { OPEN_TENDER, NEGOTIATED_CONTRACT, DIRECT_AWARD, COMPETITIVE_BIDDING, OTHER } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD].OPTIONS;

/**
 * completeAndSubmitHowWasTheContractAwardedForm
 * Complete and submit the "How was the contract awarded" form
 * @param {Boolean} openTender: Award method as OPEN_TENDER. Defaults to true
 * @param {Boolean} negotiatedContract: Award method as NEGOTIATED_CONTRACT
 * @param {String} directAward: Award method as DIRECT_AWARD
 * @param {String} competitiveBidding: Award method as COMPETITIVE_BIDDING
 * @param {String} otherMethod: Award method as OTHER
 */
const completeAndSubmitHowWasTheContractAwardedForm = ({
  openTender = true,
  negotiatedContract = false,
  directAward = false,
  competitiveBidding = false,
  otherMethod = false,
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

    cy.keyboardInput(field(OTHER_AWARD_METHOD).input(), application.EXPORT_CONTRACT[OTHER_AWARD_METHOD]);
  }

  selector.label().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitHowWasTheContractAwardedForm;
