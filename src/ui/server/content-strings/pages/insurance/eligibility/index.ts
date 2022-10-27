import { LINKS } from '../../../links';
import { PRODUCT } from '../../../../constants';
import formatCurrency from '../../../../helpers/format-currency';

const MAX_COVER_AMOUNT = formatCurrency(PRODUCT.MAX_COVER_AMOUNT_IN_GBP, 'GBP', 0);

const APPLY_OFFLINE = {
  PAGE_TITLE: 'You need to apply using our form',
  HEADING: 'You need to apply using our form',
  REASON: {
    INTRO: 'This is because',
    WANT_COVER_OVER_MAX_AMOUNT: `you want to be insured for more than ${MAX_COVER_AMOUNT} and we need to make extra checks.`,
    OTHER_PARTIES_INVOLVED: 'there are other parties involved in your exports and we need to make extra checks.',
  },
  ACTIONS: {
    DOWNLOAD_FORM: {
      LINK: {
        TEXT: 'Download this form',
        HREF: LINKS.EXTERNAL.NBI_FORM,
      },
      TEXT: "and email it to UKEF once you've filled it in.",
    },
    CONTACT: {
      TEXT: "If you'd like to discuss your exports or need help applying, you can",
      LINK: {
        TEXT: 'talk to your nearest export finance manager.',
        HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
      },
    },
  },
};

const SPEAK_TO_UKEF_EFM = {
  PAGE_TITLE: 'You need to speak with a UKEF export finance manager',
  HEADING: 'You need to speak with a UKEF export finance manager',
  REASON: {
    INTRO: 'This is because',
    WANT_COVER_OVER_MAX_PERIOD: `you want to be insured for longer than ${PRODUCT.MAX_COVER_PERIOD_YEARS} years.`,
  },
  ACTIONS: {
    FIND_EFM: [
      [
        {
          text: 'Find ',
        },
        {
          text: 'your nearest export finance manager',
          href: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
        },
        {
          text: ' to discuss this.',
        },
      ],
    ],
  },
};

const CHECK_IF_ELIGIBLE = {
  PAGE_TITLE: 'Check you can apply for UKEF insurance for your export',
  HEADING: 'Check you can apply for UKEF insurance for your export',
  BODY: 'This will take a couple of minutes. If your export is eligible, you can start the application immediately.',
};

const INSURED_AMOUNT = {
  PAGE_TITLE: `Do you want to be insured for ${MAX_COVER_AMOUNT} or more?`,
  HEADING: `Do you want to be insured for ${MAX_COVER_AMOUNT} or more?`,
};

const INSURED_PERIOD = {
  PAGE_TITLE: `Do you want to be insured for longer than ${PRODUCT.MAX_COVER_PERIOD_YEARS} years?`,
  HEADING: `Do you want to be insured for longer than ${PRODUCT.MAX_COVER_PERIOD_YEARS} years?`,
};

const OTHER_PARTIES_INVOLVED = {
  PAGE_TITLE: 'Are there any other parties involved, apart from you and the buyer?',
  HEADING: 'Are there any other parties involved, apart from you and the buyer?',
};

export default {
  APPLY_OFFLINE,
  SPEAK_TO_UKEF_EFM,
  CHECK_IF_ELIGIBLE,
  INSURED_AMOUNT,
  INSURED_PERIOD,
  OTHER_PARTIES_INVOLVED,
};
