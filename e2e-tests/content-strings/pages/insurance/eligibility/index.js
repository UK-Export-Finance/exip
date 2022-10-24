const LINKS = require('../../../links');
const { PRODUCT } = require('../../../../constants')

const MAX_COVER_AMOUNT = PRODUCT.MAX_COVER_AMOUNT_IN_GBP.toLocaleString('en', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const APPLY_OFFLINE = {
  PAGE_TITLE: 'You need to apply using our form',
  HEADING: 'You need to apply using our form',
  REASON: {
    INTRO: 'This is because',
    WANT_COVER_OVER_MAX_PERIOD: `you want to be insured for more than ${MAX_COVER_AMOUNT} and we need to make extra checks.`,
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

const CHECK_IF_ELIGIBLE = {
  PAGE_TITLE: 'Check you can apply for UKEF insurance for your export',
  HEADING: 'Check you can apply for UKEF insurance for your export',
  BODY: 'This will take a couple of minutes. If your export is eligible, you can start the application immediately.',
};

const INSURED_AMOUNT = {
  PAGE_TITLE: `Do you want to be insured for ${MAX_COVER_AMOUNT} or more?`,
  HEADING: `Do you want to be insured for ${MAX_COVER_AMOUNT} or more?`,
};

module.exports = {
  APPLY_OFFLINE,
  CHECK_IF_ELIGIBLE,
  INSURED_AMOUNT,
};
