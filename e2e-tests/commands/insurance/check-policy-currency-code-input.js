import { radios, field as fieldSelector } from '../../pages/shared';
import { POLICY_FIELDS } from '../../content-strings/fields/insurance/policy';
import {
  EUR,
  GBP,
  JPY,
  USD,
} from '../../fixtures/currencies';
import { SHARED_CONTRACT_POLICY } from '../../constants/field-ids/insurance/policy';

const { POLICY_CURRENCY_CODE, ALTERNATIVE_POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const { CONTRACT_POLICY } = POLICY_FIELDS;

/**
 * checkPolicyCurrencyCodeInput
 * Check "policy currency code" legend and radio options
 */
const checkPolicyCurrencyCodeInput = () => {
  const fieldId = POLICY_CURRENCY_CODE;
  const field = fieldSelector(fieldId);

  const CONTENT_STRINGS = POLICY_FIELDS.CONTRACT_POLICY[fieldId];

  cy.checkText(
    field.legend(),
    CONTENT_STRINGS.LEGEND,
  );

  cy.checkText(
    field.hint(),
    CONTENT_STRINGS.HINT,
  );

  const { option: option1 } = radios(fieldId, EUR.isoCode);
  const { option: option2 } = radios(fieldId, GBP.isoCode);
  const { option: option3 } = radios(fieldId, USD.isoCode);
  const { option: option4 } = radios(fieldId, JPY.isoCode);
  const { option: option5 } = radios(fieldId, ALTERNATIVE_POLICY_CURRENCY_CODE);

  // EUR
  cy.checkText(option1.label(), `${EUR.name} (${EUR.isoCode})`);
  cy.checkValue(option1, EUR.isoCode);

  // GBP
  cy.checkText(option2.label(), `${GBP.name} (${GBP.isoCode})`);
  cy.checkValue(option2, GBP.isoCode);

  // USD
  cy.checkText(option3.label(), `${USD.name} (${USD.isoCode})`);
  cy.checkValue(option3, USD.isoCode);

  // JPY
  cy.checkText(option4.label(), `${JPY.name} (${JPY.isoCode})`);
  cy.checkValue(option4, JPY.isoCode);

  // Alternative currency
  cy.checkText(option5.label(), CONTRACT_POLICY[fieldId][ALTERNATIVE_POLICY_CURRENCY_CODE].TEXT);
  cy.checkValue(option5, ALTERNATIVE_POLICY_CURRENCY_CODE);
};

export default checkPolicyCurrencyCodeInput;
