import { FIELD_IDS } from '../../../constants';
import { POLICY_FIELDS as FIELDS } from '../../../content-strings/fields/insurance';
import mapTotalMonthsOfCover from '.';
import mapMonthString from '../../data-content-mappings/map-month-string';

const {
  POLICY: { CONTRACT_POLICY },
} = FIELD_IDS.INSURANCE;

const {
  MULTIPLE: { TOTAL_MONTHS_OF_COVER },
} = CONTRACT_POLICY;

describe('server/helpers/mappings/map-total-months-of-insurance', () => {
  const monthOptions = FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_MONTHS_OF_COVER].OPTIONS as Array<number>;

  it('should return an array of mapped objects with a default option', () => {
    const result = mapTotalMonthsOfCover(monthOptions);

    const expectedMonths = monthOptions.map((month) => ({
      text: mapMonthString(month + 1),
      value: String(month + 1),
    }));

    const expected = [
      {
        disabled: true,
        selected: true,
        value: '',
      },
      ...expectedMonths,
    ];

    expect(result).toEqual(expected);
  });

  describe('when a selectedValue is passed', () => {
    it('should return an array of mapped objects with selected option and no default option', () => {
      const mockSimpleMonthOptions = [0, 1, 2];

      const { 2: mockSelectedValue } = mockSimpleMonthOptions;

      const result = mapTotalMonthsOfCover(mockSimpleMonthOptions, mockSelectedValue);

      const expected = [
        {
          text: mapMonthString(1),
          value: String(1),
        },
        {
          text: mapMonthString(2),
          value: String(2),
          selected: true,
        },
        {
          text: mapMonthString(3),
          value: String(3),
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
