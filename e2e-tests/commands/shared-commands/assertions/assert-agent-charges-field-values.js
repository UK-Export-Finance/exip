import { autoCompleteField, field } from '../../../pages/shared';
import { agentChargesPage } from '../../../pages/insurance/export-contract';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import application from '../../../fixtures/application';

const {
  AGENT_CHARGES: {
    METHOD, FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE, CHARGE_PERCENTAGE, PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

/**
 * assertAgentChargesFieldValues
 * Assert all field values in the "agent charges" form.
 * @param {Boolean} fixedSumMethod: Method as "Fixed sum"
 * @param {Boolean} percentageMethod: Method as "Percentage"
 * @param {String} expectedFixedSumAmount: Expected fixed sum amount
 * @param {String} expectedChargePercentage: Expected charge percentage
 * @param {String} expectedPayableCountry: Expected payable country
 */
const assertAgentChargesFieldValues = ({
  fixedSumMethod = false,
  percentageMethod = false,
  expectedFixedSumAmount = application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT],
  expectedChargePercentage = application.EXPORT_CONTRACT.AGENT_CHARGES[CHARGE_PERCENTAGE],
  expectedPayableCountry = application.EXPORT_CONTRACT.AGENT_CHARGES[PAYABLE_COUNTRY_CODE],
}) => {
  if (fixedSumMethod) {
    cy.assertRadioOptionIsChecked(
      agentChargesPage[METHOD][FIXED_SUM].input(),
    );

    cy.checkValue(
      field(FIXED_SUM_AMOUNT),
      expectedFixedSumAmount,
    );
  }

  if (percentageMethod) {
    cy.assertRadioOptionIsChecked(
      agentChargesPage[METHOD][PERCENTAGE].input(),
    );

    cy.checkValue(
      field(CHARGE_PERCENTAGE),
      expectedChargePercentage,
    );
  }

  cy.keyboardInput(autoCompleteField(PAYABLE_COUNTRY_CODE).input(), expectedPayableCountry);
};

export default assertAgentChargesFieldValues;
