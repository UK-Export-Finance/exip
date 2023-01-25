import { APPLICATION } from './application';

const { POLICY_TYPE, POLICY_AND_EXPORT } = APPLICATION;

export const FIELD_VALUES = {
  OPTIONAL_COOKIES: {
    ACCEPT: 'accept',
    REJECT: 'reject',
  },
  POLICY_TYPE: {
    SINGLE: APPLICATION.POLICY_TYPE.SINGLE,
    MULTIPLE: APPLICATION.POLICY_TYPE.MULTIPLE,
  },
  POLICY_LENGTH: {
    // default multiplepolicy length in months
    MULTIPLE: 12,
  },
  TOTAL_MONTHS_OF_COVER: Array.from(Array(POLICY_AND_EXPORT.TOTAL_MONTHS_OF_COVER).keys()),
};
