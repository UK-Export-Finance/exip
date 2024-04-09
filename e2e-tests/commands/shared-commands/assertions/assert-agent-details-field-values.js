import { field, autoCompleteField } from '../../../pages/shared';
import { EXPECTED_MULTI_LINE_STRING } from '../../../constants';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import mockApplication from '../../../fixtures/application';

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

/**
 * assertAgentDetailsFieldValues
 * Assert all field values in the "agent details" form.
 * @param {String} expectedName: Expected agent name
 * @param {String} expectedFullAddress: Expected agent address
 * @param {String} expectedCountryCode: Expected agent's country code
 */
const assertAgentDetailsFieldValues = ({
  expectedName = mockApplication.EXPORT_CONTRACT.AGENT_DETAILS[NAME],
  expectedFullAddress = EXPECTED_MULTI_LINE_STRING,
  expectedCountryCode = mockApplication.EXPORT_CONTRACT.AGENT_DETAILS[COUNTRY_CODE],
}) => {
  if (expectedName) {
    cy.checkValue(field(NAME), expectedName);
  }

  if (expectedFullAddress) {
    cy.checkTextareaValue({
      fieldId: FULL_ADDRESS,
      expectedValue: expectedFullAddress,
    });
  }

  if (expectedCountryCode) {
    cy.keyboardInput(autoCompleteField(COUNTRY_CODE).input(), expectedCountryCode);
  }
};

export default assertAgentDetailsFieldValues;
