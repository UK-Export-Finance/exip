import { SHARED, CONFIRM_READ_AND_AGREE, HAVE_READ_AND_AGREED } from '../shared';

export const HOW_YOUR_DATA_WILL_BE_USED = {
  ...SHARED,
  PAGE_TITLE: 'How your data will be used',
  VERSIONS: [
    {
      VERSION: '1',
      ...SHARED,
      PAGE_TITLE: 'How your data will be used',
      LABEL: `${CONFIRM_READ_AND_AGREE} how your data will be used`,
      OPTION: {
        TEXT: `${HAVE_READ_AND_AGREED} how my data will be used`,
        VALUE: true,
      },
    },
  ],
};
