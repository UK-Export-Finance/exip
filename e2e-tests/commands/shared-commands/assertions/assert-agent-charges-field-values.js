import { autoCompleteField, field } from '../../../pages/shared';
import { agentChargesPage } from '../../../pages/insurance/export-contract';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import application from '../../../fixtures/application';

const {
  AGENT_CHARGES: {
    METHOD, FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE,
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
  expectedChargePercentage = application.EXPORT_CONTRACT.AGENT_CHARGES[PERCENTAGE_CHARGE],
  expectedPayableCountry = application.EXPORT_CONTRACT.AGENT_CHARGES[PAYABLE_COUNTRY_CODE],
}) => {
  if (fixedSumMethod) {
    cy.assertRadioOptionIsChecked(
      agentChargesPage[METHOD][FIXED_SUM].input(),
    );

    if (expectedFixedSumAmount) {
      cy.checkValue(
        field(FIXED_SUM_AMOUNT),
        expectedFixedSumAmount,
      );
    }
  }

  if (percentageMethod) {
    cy.assertRadioOptionIsChecked(
      agentChargesPage[METHOD][PERCENTAGE].input(),
    );

    if (expectedChargePercentage) {
      cy.checkValue(
        field(PERCENTAGE_CHARGE),
        expectedChargePercentage,
      );
    }
  }

  if (expectedPayableCountry) {
    cy.checkValue(autoCompleteField(PAYABLE_COUNTRY_CODE), expectedPayableCountry);
  }
};

export default assertAgentChargesFieldValues;
