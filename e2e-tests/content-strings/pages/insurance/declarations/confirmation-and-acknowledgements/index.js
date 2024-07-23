import { SHARED, CONFIRM_READ_AND_AGREE, HAVE_READ_AND_AGREED } from '../shared';

export const CONFIRMATION_AND_ACKNOWLEDGEMENTS = {
  ...SHARED,
  PAGE_TITLE: 'Confirmation and acknowledgements',
  VERSIONS: [
    {
      VERSION: 2,
      LABEL: `${CONFIRM_READ_AND_AGREE} the confirmation and acknowledgements`,
      OPTION: {
        TEXT: `${HAVE_READ_AND_AGREED} the confirmation and acknowledgements`,
        VALUE: true,
      },
    },
  ],
};
