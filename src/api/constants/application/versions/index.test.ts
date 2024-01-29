import VERSIONS from '.';
import { GBP } from '../../supported-currencies';

describe('api/constants/application/versions', () => {
  it('should return an array of application versions', () => {
    const expected = [
      {
        VERSION_NUMBER: '1',
        OVER_500K_SUPPORT: false,
        MAXIMUM_BUYER_CAN_OWE: 500000,
        TOTAL_VALUE_OF_CONTRACT: 500000,
        DEFAULT_FINAL_DESTINATION_KNOWN: true,
        DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: false,
      },
      {
        VERSION_NUMBER: '2',
        OVER_500K_SUPPORT: true,
        DEFAULT_FINAL_DESTINATION_KNOWN: null,
        DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: null,
        DEFAULT_CURRENCY: GBP,
      },
    ];

    expect(VERSIONS).toEqual(expected);
  });
});
