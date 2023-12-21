const SHARED = {
  HEADING_CAPTION: 'Your buyer',
};

const ROOT = {
  ...SHARED,
  PAGE_TITLE: 'Who is your buyer?',
  INTRO: "Next we'll ask you questions about your buyer and whether you've worked with them in the past.",
  LIST: {
    INTRO: 'We may also ask you to upload some documents. These are:',
    ITEMS: [
      'your trading history(for example, transactions with them over the last 12 months)',
      "any credit insurance you've previously held with them",
      "records of your buyer's financial accounts(for example, management reports)",
    ],
    OUTRO: "You don't have to provide these if you don't have them, or you would prefer not to share them.",
  },
  OUTRO: 'However, they will make it easier for us to process your application and we may ask you to provide them later on.',
};

const COMPANY_OR_ORGANISATION = {
  ...SHARED,
  PAGE_TITLE: "Buyer's company or organisation",
};

const WORKING_WITH_BUYER = {
  ...SHARED,
  PAGE_TITLE: 'Working with the buyer',
};

const CONNECTION_WITH_BUYER = {
  ...SHARED,
  PAGE_TITLE: 'Are you connected with the buyer in any way?',
  HINT: "For example, someone in your company is a shareholder or director of the buyer's company.",
};

const CHECK_YOUR_ANSWERS = {
  ...SHARED,
  PAGE_TITLE: 'Check your answers for this section',
};

export default {
  ROOT,
  COMPANY_OR_ORGANISATION,
  WORKING_WITH_BUYER,
  CONNECTION_WITH_BUYER,
  CHECK_YOUR_ANSWERS,
};
