const SHARED = {
  HEADING_CAPTION: 'Your buyer',
};

const ROOT = {
  ...SHARED,
  PAGE_TITLE: 'Who is your buyer?',
  INTRO: "Next we'll ask you questions about your buyer. This includes:",
  LIST: {
    ITEMS: ["if you're connected to them in any way", "whether you've worked with them in the past", "if you've held credit insurance for them previously"],
    OUTRO:
      "We'll also ask if you have access to their financial accounts. You don't have to provide them if you don't have them, or you would prefer not to share them.",
  },
  OUTRO: 'However, they will make it easier for us to process your application and we may ask you to provide them later on.',
};

const COMPANY_OR_ORGANISATION = {
  ...SHARED,
  PAGE_TITLE: "Buyer's company or organisation",
  INTRO: "Enter details for the buyer's company or organisation",
};

const CONNECTION_WITH_BUYER = {
  ...SHARED,
  PAGE_TITLE: 'Are you connected with the buyer in any way?',
  HINT: "For example, someone in your company is a shareholder or director of the buyer's company.",
};

const TRADED_WITH_BUYER = {
  ...SHARED,
  PAGE_TITLE: 'Have you traded with this buyer before?',
};

const TRADING_HISTORY = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about your trading history with the buyer',
  INTRO: 'We will request a copy of your trading history once the application has been submitted.',
  PROVIDE_ALTERNATIVE_CURRENCY: 'Use a different currency for any outstanding or overdue payments from the buyer',
};

const ALTERNATIVE_CURRENCY = {
  ...SHARED,
  PAGE_TITLE: 'What currency are the outstanding or overdue payments in?',
};

const CREDIT_INSURANCE_COVER = {
  ...SHARED,
  PAGE_TITLE: 'Have you in the past held credit insurance cover on the buyer?',
};

const BUYER_FINANCIAL_INFORMATION = {
  ...SHARED,
  PAGE_TITLE: 'Do you hold any financial accounts in relation to the buyer?',
  HINT: "Providing additional information will help us process your application. You don't have to share this information, but we may ask for it later.",
  INTRO: 'Why do we ask for financial accounts?',
  LOOK_INTO_BUYER:
    "We look into your buyer as part of our due diligence process. This includes reviewing their accounts and checking that they're a legitimate company.",
  SHARING:
    "Sharing your buyer's financial accounts will help us to understand the risks associated with an export. It will also mean we can make a decision more quickly.",
  DO_NOT_HAVE_TO_SHARE:
    "You don't have to share their financial accounts if you don't have them or would prefer not to. Sharing this information helps us, but it won't impact the outcome of your application. ",
};

const CHECK_YOUR_ANSWERS = {
  ...SHARED,
  PAGE_TITLE: 'Check your answers for this section',
};

export default {
  ROOT,
  COMPANY_OR_ORGANISATION,
  CONNECTION_WITH_BUYER,
  TRADED_WITH_BUYER,
  TRADING_HISTORY,
  ALTERNATIVE_CURRENCY,
  CREDIT_INSURANCE_COVER,
  BUYER_FINANCIAL_INFORMATION,
  CHECK_YOUR_ANSWERS,
};
