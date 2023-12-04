import getSupportedCurrencies from '..';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import nameAndIsoCodeText from '../../../name-and-iso-code-text';
import { Currency, CurrencyRadios } from '../../../../../types';

const {
  POLICY: {
    CONTRACT_POLICY: { ALTERNATIVE_POLICY_CURRENCY_CODE, POLICY_CURRENCY_CODE },
  },
} = FIELD_IDS;

const { CONTRACT_POLICY } = POLICY_FIELDS;

/**
 * mapCurrenciesAsRadioOptions
 * Map supported currencies into the required structure for GOV radios component.
 * @param {Array} Array of currency objects
 * @returns {Object} Mapped currencies with an "alternative" option.
 */
const mapCurrenciesAsRadioOptions = (currencies: Array<Currency>) => {
  const supportedCurrencies = getSupportedCurrencies(currencies);

  const mappedObj = {} as CurrencyRadios;

  supportedCurrencies.forEach((country) => {
    const { isoCode, name } = country;

    mappedObj[isoCode] = {
      text: nameAndIsoCodeText(name, isoCode),
      value: isoCode,
    };
  });

  mappedObj.ALTERNATIVE = {
    text: CONTRACT_POLICY[POLICY_CURRENCY_CODE][ALTERNATIVE_POLICY_CURRENCY_CODE].TEXT,
    value: CONTRACT_POLICY[POLICY_CURRENCY_CODE][ALTERNATIVE_POLICY_CURRENCY_CODE].ID,
  };

  return mappedObj;
};

export default mapCurrenciesAsRadioOptions;
