import { SHARED } from '../shared';
import { LINKS } from '../../../../links';

export const ANTI_BRIBERY_CODE_OF_CONDUCT = {
  ...SHARED,
  PAGE_TITLE:
    'Do you have in place a code of conduct and written procedures of the type contemplated by Section(2) of the Bribery Act to discourage and prevent corrupt activity?',
  VERSIONS: [
    {
      VERSION: 1,
      HINT: {
        INTRO: 'If no, your attention is drawn to',
        LINK: {
          TEXT: 'Ministry of Justice guidance',
          HREF: LINKS.EXTERNAL.BRIBERY_ACT_2010_GUIDANCE,
        },
      },
      ANSWER_YES_REVEAL: {
        TEXT: "We will email you after you submit your application (also known as a 'proposal')  to request your anti-bribery code of conduct.",
      },
    },
  ],
};
