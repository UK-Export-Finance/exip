import mapRadioAndSelectOptions from '.';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import mapCurrenciesAsRadioOptions from '../as-radio-options';
import mapCurrenciesAsSelectOptions from '../as-select-options';
import { mockCurrencies } from '../../../../test-mocks';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/mappings/map-currencies/radio-and-select-options', () => {
  it('should return an object of mapped currencies via helper functions', () => {
    const mockSelectedValue = mockCurrencies[1].isoCode;

    const result = mapRadioAndSelectOptions(mockCurrencies, mockCurrencies, mockSelectedValue);

    const expected = {
      currencies: mapCurrenciesAsRadioOptions(mockCurrencies, ALTERNATIVE_CURRENCY_CODE),
      allCurrencies: mapCurrenciesAsSelectOptions(mockCurrencies, mockSelectedValue, true),
    };

    expect(result).toEqual(expected);
  });
});
