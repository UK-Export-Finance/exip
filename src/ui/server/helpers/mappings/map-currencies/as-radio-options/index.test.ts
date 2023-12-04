import mapCurrenciesAsRadioOptions from '.';
import getSupportedCurrencies from '..';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import { mockCurrencies } from '../../../../test-mocks';

const {
  POLICY: {
    CONTRACT_POLICY: { ALTERNATIVE_POLICY_CURRENCY_CODE, POLICY_CURRENCY_CODE },
  },
} = FIELD_IDS;

const { CONTRACT_POLICY } = POLICY_FIELDS;

describe('server/helpers/mappings/map-currencies/as-radio-options', () => {
  const supportedCurrencies = getSupportedCurrencies(mockCurrencies);

  it('should return an object of supported countries options and an ALTERNATIVE option', () => {
    const result = mapCurrenciesAsRadioOptions(supportedCurrencies);

    const [country0, country1, country2, country3] = supportedCurrencies;

    const expected = {
      [country0.isoCode]: {
        text: `${country0.name} (${country0.isoCode})`,
        value: country0.isoCode,
      },
      [country1.isoCode]: {
        text: `${country1.name} (${country1.isoCode})`,
        value: country1.isoCode,
      },
      [country2.isoCode]: {
        text: `${country2.name} (${country2.isoCode})`,
        value: country2.isoCode,
      },
      [country3.isoCode]: {
        text: `${country3.name} (${country3.isoCode})`,
        value: country3.isoCode,
      },
      ALTERNATIVE: {
        text: CONTRACT_POLICY[POLICY_CURRENCY_CODE][ALTERNATIVE_POLICY_CURRENCY_CODE].TEXT,
        value: CONTRACT_POLICY[POLICY_CURRENCY_CODE][ALTERNATIVE_POLICY_CURRENCY_CODE].ID,
      },
    };

    expect(result).toEqual(expected);
  });
});
