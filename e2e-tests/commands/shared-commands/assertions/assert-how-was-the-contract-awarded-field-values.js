import { field as fieldSelector, radios } from '../../../pages/shared';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../content-strings/fields/insurance';
import application from '../../../fixtures/application';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const { OPEN_TENDER, NEGOTIATED_CONTRACT, DIRECT_AWARD, COMPETITIVE_BIDDING, OTHER } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD].OPTIONS;

/**
 * assertHowWasTheContractAwardedFieldValues
 * Assert all field values in the "how was the contract awarded" form.
 * @param {Boolean} openTender: Award method as OPEN_TENDER
 * @param {Boolean} negotiatedContract: Award method as NEGOTIATED_CONTRACT
 * @param {String} directAward: Award method as DIRECT_AWARD
 * @param {String} competitiveBidding: Award method as COMPETITIVE_BIDDING
 * @param {String} otherMethod: Award method as OTHER
 */
const assertHowWasTheContractAwardedFieldValues = ({
  openTender = false,
  negotiatedContract = false,
  directAward = false,
  competitiveBidding = false,
  otherMethod = false,
}) => {
  const selectors = {
    openTender: radios(OPEN_TENDER.ID).option.input(),
    negotiatedContract: radios(NEGOTIATED_CONTRACT.ID).option.input(),
    directAward: radios(DIRECT_AWARD.ID).option.input(),
    competitiveBidding: radios(COMPETITIVE_BIDDING.ID).option.input(),
    otherMethod: radios(OTHER.ID).option.input(),
    otherMethodTextInput: fieldSelector(OTHER_AWARD_METHOD),
  };

  if (openTender) {
    cy.assertRadioOptionIsChecked(selectors.openTender);

    cy.assertRadioOptionIsNotChecked(selectors.negotiatedContract);
    cy.assertRadioOptionIsNotChecked(selectors.directAward);
    cy.assertRadioOptionIsNotChecked(selectors.competitiveBidding);
    cy.assertRadioOptionIsNotChecked(selectors.otherMethod);
  }

  if (negotiatedContract) {
    cy.assertRadioOptionIsChecked(selectors.negotiatedContract);

    cy.assertRadioOptionIsNotChecked(selectors.openTender);
    cy.assertRadioOptionIsNotChecked(selectors.directAward);
    cy.assertRadioOptionIsNotChecked(selectors.competitiveBidding);
    cy.assertRadioOptionIsNotChecked(selectors.otherMethod);
  }

  if (directAward) {
    cy.assertRadioOptionIsChecked(selectors.directAward);

    cy.assertRadioOptionIsNotChecked(selectors.openTender);
    cy.assertRadioOptionIsNotChecked(selectors.negotiatedContract);
    cy.assertRadioOptionIsNotChecked(selectors.competitiveBidding);
    cy.assertRadioOptionIsNotChecked(selectors.otherMethod);
  }

  if (competitiveBidding) {
    cy.assertRadioOptionIsChecked(selectors.competitiveBidding);

    cy.assertRadioOptionIsNotChecked(selectors.openTender);
    cy.assertRadioOptionIsNotChecked(selectors.negotiatedContract);
    cy.assertRadioOptionIsNotChecked(selectors.directAward);
    cy.assertRadioOptionIsNotChecked(selectors.otherMethod);
  }

  if (otherMethod) {
    cy.assertRadioOptionIsChecked(selectors.otherMethod);

    cy.checkValue(selectors.otherMethodTextInput, application.EXPORT_CONTRACT[OTHER_AWARD_METHOD]);

    cy.assertRadioOptionIsNotChecked(selectors.openTender);
    cy.assertRadioOptionIsNotChecked(selectors.negotiatedContract);
    cy.assertRadioOptionIsNotChecked(selectors.competitiveBidding);
    cy.assertRadioOptionIsNotChecked(selectors.directAward);
  }
};

export default assertHowWasTheContractAwardedFieldValues;
