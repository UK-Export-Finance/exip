import { FIELD_IDS } from '../../../../constants';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { NATURE_OF_YOUR_BUSINESS } = EXPORTER_BUSINESS;

export const FIELDS = {
  NATURE_OF_YOUR_BUSINESS: {
    [NATURE_OF_YOUR_BUSINESS.GOODS_OR_SERVICES]: {
      LABEL: 'What goods or services does your company supply?',
      HINT: 'Give a general overview rather than just the exports you want to insure',
      MAXIMUM: 1000,
    },
  },
};
