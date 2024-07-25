import { SHARED, CONFIRM_READ_AND_AGREE, HAVE_READ_AND_AGREED } from '../shared';

export const CONFIRMATION_AND_ACKNOWLEDGEMENTS = {
  VERSIONS: [
    {
      VERSION: '1',
      ...SHARED,
      PAGE_TITLE: 'Confirmation and acknowledgements',
      LABEL: `${CONFIRM_READ_AND_AGREE} the confirmation and acknowledgements`,
      OPTION: {
        TEXT: `${HAVE_READ_AND_AGREED} the confirmation and acknowledgements`,
        VALUE: true,
      },
      INTRO: "By submitting this application (also known as a 'proposal') you agree that:",
      LIST: [
        {
          text: 'you confirm that the information contained in this Proposal and any related discussions or correspondence constitutes a fair presentation of the risk to include all material facts and circumstances; and',
        },
        {
          text: 'you acknowledge that:',
          children: [
            {
              text: 'you should contact us or your broker (if applicable) if you are in any doubt as to what constitutes a material fact;',
            },
            {
              text: 'we will rely on the information, statements and declarations in this Proposal when deciding whether, and on what terms, to issue any policy; and',
            },
            {
              text: 'you must continue to disclose material facts to us and any changes to material facts after the date of signature of this Proposal until the date cover commences under any policy unless this would, or might reasonably be considered to, constitute the offence of “tipping off” under s.333A of the Proceeds of Crime Act 2002.',
            },
          ],
        },
      ],
    },
  ],
};
