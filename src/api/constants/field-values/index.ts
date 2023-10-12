import APPLICATION from '../application';

const { POLICY_TYPE, POLICY } = APPLICATION;

export const FIELD_VALUES = {
  OPTIONAL_COOKIES: {
    ACCEPT: 'accept',
    REJECT: 'reject',
  },
  POLICY_TYPE: {
    SINGLE: POLICY_TYPE.SINGLE,
    MULTIPLE: POLICY_TYPE.MULTIPLE,
  },
  POLICY_LENGTH: {
    // default multiple policy length in months
    MULTIPLE: 12,
  },
  TOTAL_MONTHS_OF_COVER: Array.from(Array(POLICY.TOTAL_MONTHS_OF_COVER).keys()),
  YES: 'Yes',
  NO: 'No',
};
