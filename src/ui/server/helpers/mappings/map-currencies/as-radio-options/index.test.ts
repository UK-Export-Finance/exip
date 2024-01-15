import mapCurrenciesAsRadioOptions from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { FIELDS } from '../../../../content-strings';
import nameAndIsoCodeText from '../../../name-and-iso-code-text';
import { mockCurrencies } from '../../../../test-mocks';

const {
  POLICY: {
    CONTRACT_POLICY: { ALTERNATIVE_POLICY_CURRENCY_CODE },
  },
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = FIELD_IDS;

describe('server/helpers/mappings/map-currencies/as-radio-options', () => {
  describe(`policy ${ALTERNATIVE_POLICY_CURRENCY_CODE}`, () => {
    it('should return an object of supported countries options and an ALTERNATIVE option', () => {
      const result = mapCurrenciesAsRadioOptions(mockCurrencies, ALTERNATIVE_POLICY_CURRENCY_CODE);

      const [currency0, currency1, currency2, currency3, currency4] = mockCurrencies;

      const expected = {
        [currency0.isoCode]: {
          text: nameAndIsoCodeText(currency0.name, currency0.isoCode),
          value: currency0.isoCode,
        },
        [currency1.isoCode]: {
          text: nameAndIsoCodeText(currency1.name, currency1.isoCode),
          value: currency1.isoCode,
        },
        [currency2.isoCode]: {
          text: nameAndIsoCodeText(currency2.name, currency2.isoCode),
          value: currency2.isoCode,
        },
        [currency3.isoCode]: {
          text: nameAndIsoCodeText(currency3.name, currency3.isoCode),
          value: currency3.isoCode,
        },
        [currency4.isoCode]: {
          text: nameAndIsoCodeText(currency4.name, currency4.isoCode),
          value: currency4.isoCode,
        },
        ALTERNATIVE: {
          text: FIELDS[ALTERNATIVE_POLICY_CURRENCY_CODE].TEXT,
          value: ALTERNATIVE_POLICY_CURRENCY_CODE,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe(ALTERNATIVE_CURRENCY_CODE, () => {
    it('should return an object of supported countries options and an ALTERNATIVE option', () => {
      const result = mapCurrenciesAsRadioOptions(mockCurrencies, ALTERNATIVE_CURRENCY_CODE);

      const [currency0, currency1, currency2, currency3, currency4] = mockCurrencies;

      const expected = {
        [currency0.isoCode]: {
          text: nameAndIsoCodeText(currency0.name, currency0.isoCode),
          value: currency0.isoCode,
        },
        [currency1.isoCode]: {
          text: nameAndIsoCodeText(currency1.name, currency1.isoCode),
          value: currency1.isoCode,
        },
        [currency2.isoCode]: {
          text: nameAndIsoCodeText(currency2.name, currency2.isoCode),
          value: currency2.isoCode,
        },
        [currency3.isoCode]: {
          text: nameAndIsoCodeText(currency3.name, currency3.isoCode),
          value: currency3.isoCode,
        },
        [currency4.isoCode]: {
          text: nameAndIsoCodeText(currency4.name, currency4.isoCode),
          value: currency4.isoCode,
        },
        ALTERNATIVE: {
          text: FIELDS[ALTERNATIVE_POLICY_CURRENCY_CODE].TEXT,
          value: ALTERNATIVE_CURRENCY_CODE,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
