import { autoCompleteField, field } from '../../../pages/shared';
import { agentChargesPage } from '../../../pages/insurance/export-contract';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import application from '../../../fixtures/application';

const {
  AGENT_CHARGES: { METHOD, FIXED_SUM, PERCENTAGE, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

/**
 * assertAgentChargesFieldValues
 * Assert all field values in the "agent charges" form.
 * @param {boolean} fixedSumMethod: Method as "Fixed sum"
 * @param {boolean} percentageMethod: Method as "Percentage"
 * @param {string} expectedPercentageCharge: Expected charge percentage
 * @param {string} expectedPayableCountry: Expected payable country
 */
const assertAgentChargesFieldValues = ({
  fixedSumMethod = false,
  percentageMethod = false,
  expectedPercentageCharge = application.EXPORT_CONTRACT.AGENT_CHARGES[PERCENTAGE_CHARGE],
  expectedPayableCountry = application.EXPORT_CONTRACT.AGENT_CHARGES[PAYABLE_COUNTRY_CODE],
}) => {
  if (fixedSumMethod) {
    cy.assertRadioOptionIsChecked(agentChargesPage[METHOD][FIXED_SUM].input());
  }

  if (percentageMethod) {
    cy.assertRadioOptionIsChecked(agentChargesPage[METHOD][PERCENTAGE].input());

    if (expectedPercentageCharge) {
      cy.checkValue(field(PERCENTAGE_CHARGE), expectedPercentageCharge);
    }
  }

  if (expectedPayableCountry) {
    cy.checkValue(autoCompleteField(PAYABLE_COUNTRY_CODE), expectedPayableCountry);
  }
};

export default assertAgentChargesFieldValues;
