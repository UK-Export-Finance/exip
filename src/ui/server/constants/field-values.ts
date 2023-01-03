import { APPLICATION } from './application';

export const FIELD_VALUES = {
  OPTIONAL_COOKIES: {
    ACCEPT: 'accept',
    REJECT: 'reject',
  },
  POLICY_TYPE: {
    SINGLE: APPLICATION.POLICY_TYPE.SINGLE,
    MULTI: APPLICATION.POLICY_TYPE.MULTI,
  },
  POLICY_LENGTH: {
    // default multi policy length in months
    MULTI: 12,
  },
};
