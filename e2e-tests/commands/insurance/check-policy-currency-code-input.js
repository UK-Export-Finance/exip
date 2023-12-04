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

  // EUR
  const option1 = radios(fieldId, EUR.isoCode).option;
  cy.checkText(option1.label(), `${EUR.name} (${EUR.isoCode})`);
  option1.input().should('have.value', EUR.isoCode);

  // GBP
  const option2 = radios(fieldId, GBP.isoCode).option;
  cy.checkText(option2.label(), `${GBP.name} (${GBP.isoCode})`);
  option2.input().should('have.value', GBP.isoCode);

  // USD
  const option3 = radios(fieldId, USD.isoCode).option;
  cy.checkText(option3.label(), `${USD.name} (${USD.isoCode})`);
  option3.input().should('have.value', USD.isoCode);

  // JPY
  const option4 = radios(fieldId, JPY.isoCode).option;
  cy.checkText(option4.label(), `${JPY.name} (${JPY.isoCode})`);
  option4.input().should('have.value', JPY.isoCode);

  // Alternative currency
  const option5 = radios(fieldId, ALTERNATIVE_POLICY_CURRENCY_CODE).option;
  cy.checkText(option5.label(), CONTRACT_POLICY[fieldId][ALTERNATIVE_POLICY_CURRENCY_CODE].TEXT);
  option5.input().should('have.value', ALTERNATIVE_POLICY_CURRENCY_CODE);
};

export default checkPolicyCurrencyCodeInput;
