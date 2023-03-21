import { FIELD_IDS } from '../../../../constants';
import { LINKS } from '../../../links';

const { DECLARATIONS } = FIELD_IDS.INSURANCE;

const { AGREE_CONFIDENTIALITY, AGREE_ANTI_BRIBERY, HAS_ANTI_BRIBERY_CODE_OF_CONDUCT } = DECLARATIONS;

const CONFIRM_READ_AND_AGREE = "Confirm you've read and agree with the";

const HAVE_READ_AND_AREED = "I've read and agree with the";

export const DECLARATIONS_FIELDS = {
  [AGREE_CONFIDENTIALITY]: {
    LABEL: `${CONFIRM_READ_AND_AGREE} confidentiality declaration`,
    OPTION: {
      TEXT: `${HAVE_READ_AND_AREED} confidentiality declaration`,
      VALUE: true,
    },
  },
  [AGREE_ANTI_BRIBERY]: {
    LABEL: `${CONFIRM_READ_AND_AGREE} anti-bribery and corruption declaration`,
    OPTION: {
      TEXT: `${HAVE_READ_AND_AREED} anti-bribery and corruption declaration`,
      VALUE: true,
    },
  },
  [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]: {
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
};
