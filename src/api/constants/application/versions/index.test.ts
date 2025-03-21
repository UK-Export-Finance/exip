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
        BROKER_ADDRESS_AS_MULTIPLE_FIELDS: true,
      },
      {
        VERSION_NUMBER: '2',
        OVER_500K_SUPPORT: true,
        DEFAULT_FINAL_DESTINATION_KNOWN: null,
        DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: null,
        DEFAULT_CURRENCY: GBP,
        BROKER_ADDRESS_AS_MULTIPLE_FIELDS: false,
      },
      {
        VERSION_NUMBER: '3',
        OVER_500K_SUPPORT: true,
        DEFAULT_FINAL_DESTINATION_KNOWN: null,
        DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: null,
        DEFAULT_CURRENCY: GBP,
        BROKER_ADDRESS_AS_MULTIPLE_FIELDS: false,
        REQUESTED_CREDIT_LIMIT_REQUIRED: true,
        SMALL_EXPORT_BUILDER: {
          MAXIMUM_BUYER_WILL_OWE: 25000,
        },
      },
      {
        VERSION_NUMBER: '4',
        OVER_500K_SUPPORT: true,
        DEFAULT_FINAL_DESTINATION_KNOWN: null,
        DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: null,
        DEFAULT_CURRENCY: GBP,
        BROKER_ADDRESS_AS_MULTIPLE_FIELDS: false,
        REQUESTED_CREDIT_LIMIT_REQUIRED: true,
        SMALL_EXPORT_BUILDER: {
          MAXIMUM_BUYER_WILL_OWE: 25000,
        },
        DECLARATIONS_MODERN_SLAVERY: true,
      },
      {
        VERSION_NUMBER: '5',
        OVER_500K_SUPPORT: true,
        DEFAULT_FINAL_DESTINATION_KNOWN: null,
        DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: null,
        DEFAULT_CURRENCY: GBP,
        BROKER_ADDRESS_AS_MULTIPLE_FIELDS: false,
        REQUESTED_CREDIT_LIMIT_REQUIRED: true,
        SMALL_EXPORT_BUILDER: {
          MAXIMUM_BUYER_WILL_OWE: 25000,
        },
        DECLARATIONS_MODERN_SLAVERY: true,
        BROKER_ADDRESS_LOOKUP: true,
      },
    ];

    expect(VERSIONS).toEqual(expected);
  });
});
