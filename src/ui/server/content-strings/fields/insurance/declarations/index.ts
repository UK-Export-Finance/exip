import { FIELD_IDS } from '../../../../constants';
import { LINKS } from '../../../links';

const { DECLARATIONS } = FIELD_IDS.INSURANCE;

const { AGREE_CONFIDENTIALITY, AGREE_ANTI_BRIBERY } = DECLARATIONS;

const { HAS_ANTI_BRIBERY_CODE_OF_CONDUCT, AGREE_CONFIRMATION_ACKNOWLEDGEMENTS, AGREE_HOW_YOUR_DATA_WILL_BE_USED } = DECLARATIONS;

const CONFIRM_READ_AND_AGREE = "Confirm you've read and agree with";

const HAVE_READ_AND_AGREED = "I've read and agree with";

export const DECLARATIONS_FIELDS = {
  [AGREE_CONFIDENTIALITY]: {
    LABEL: `${CONFIRM_READ_AND_AGREE} the confidentiality declaration`,
    OPTION: {
      TEXT: `${HAVE_READ_AND_AGREED} the confidentiality declaration`,
      VALUE: true,
    },
  },
  [AGREE_ANTI_BRIBERY]: {
    LABEL: `${CONFIRM_READ_AND_AGREE} the anti-bribery and corruption declaration`,
    OPTION: {
      TEXT: `${HAVE_READ_AND_AGREED} the anti-bribery and corruption declaration`,
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
  [AGREE_CONFIRMATION_ACKNOWLEDGEMENTS]: {
    LABEL: `${CONFIRM_READ_AND_AGREE} the confirmation and acknowledgements`,
    OPTION: {
      TEXT: `${HAVE_READ_AND_AGREED} the confirmation and acknowledgements`,
      VALUE: true,
    },
  },
  [AGREE_HOW_YOUR_DATA_WILL_BE_USED]: {
    LABEL: `${CONFIRM_READ_AND_AGREE} how your data will be used`,
    OPTION: {
      TEXT: `${HAVE_READ_AND_AGREED} how my data will be used`,
      VALUE: true,
    },
  },
  [AGREE_CONFIRMATION_ACKNOWLEDGEMENTS]: {
    LABEL: `${CONFIRM_READ_AND_AGREE} confirmation and acknowledgements`,
    OPTION: {
      TEXT: `${HAVE_READ_AND_AGREED} confirmation and acknowledgements`,
      VALUE: true,
    },
  },
};
