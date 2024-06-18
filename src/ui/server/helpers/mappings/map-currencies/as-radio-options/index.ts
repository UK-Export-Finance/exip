import nameAndIsoCodeText from '../../../name-and-iso-code-text';
import { Currency, CurrencyRadios } from '../../../../../types';
import { FIELDS } from '../../../../content-strings';

/**
 * mapCurrenciesAsRadioOptions
 * Map supported currencies into the required structure for GOV radios component.
 * for alternative currency, returns text based on provided fieldId
 * @param {Array} Array of currency objects
 * @param {String} alternativeCurrencyFieldId fieldId for alternative currency
 * @returns {Object} Mapped currencies with an "alternative" option.
 */
const mapCurrenciesAsRadioOptions = (currencies: Array<Currency>, alternativeCurrencyFieldId: string) => {
  const mappedObj = {} as CurrencyRadios;

  currencies.forEach((country) => {
    const { isoCode, name } = country;

    mappedObj[isoCode] = {
      text: nameAndIsoCodeText(name, isoCode),
      value: isoCode,
    };
  });

  mappedObj.ALTERNATIVE = {
    text: FIELDS[alternativeCurrencyFieldId].TEXT as string,
    value: alternativeCurrencyFieldId,
  };

  return mappedObj;
};

export default mapCurrenciesAsRadioOptions;
