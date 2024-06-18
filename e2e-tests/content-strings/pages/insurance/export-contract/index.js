const SHARED = {
  HEADING_CAPTION: 'Your export contract',
};

const ROOT = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about your export contract',
  LIST: {
    INTRO: "We'll ask you questions about:",
    ITEMS: [
      'what goods and services you want to export',
      "how you'll get paid",
      'your agent (if you have one)',
      'your end buyer (if you have one)',
    ],
  },
  OUTRO:
    "We may also ask you about your approach to the private insurance market. This is because we provide credit insurance for exporters who haven't been able to get a policy through the private market.",
};

const ABOUT_GOODS_OR_SERVICES = {
  ...SHARED,
  PAGE_TITLE: 'About the goods or services',
};

const HOW_WILL_YOU_GET_PAID = {
  ...SHARED,
  PAGE_TITLE: 'How will you get paid for your export?',
};

const PRIVATE_MARKET = {
  ...SHARED,
  PAGE_TITLE: 'Have you tried to insure this export through the private insurance market?',
  HINT: 'We may ask for proof that you have been unable to insure the export through an alternative provider.',
};

const DECLINED_BY_PRIVATE_MARKET = {
  ...SHARED,
  PAGE_TITLE: "Why couldn't you get cover through the private insurance market?",
};

const AGENT = {
  ...SHARED,
  PAGE_TITLE: 'Did anyone help you win your export contract?',
  HINT: 'This is usually an agent who helped with tendering, connecting you to the buyer or setting up the contract.',
};

const AGENT_DETAILS = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the person who helped you win the export contract',
};

const AGENT_SERVICE = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the service the agent is providing',
};

const AGENT_CHARGES = {
  ...SHARED,
  PAGE_TITLE: "Tell us about the agent's charges",
  PROVIDE_ALTERNATIVE_CURRENCY: 'Use a different currency for agent fees',
};

const AGENT_CHARGES_ALTERNATIVE_CURRENCY = {
  ...SHARED,
  PAGE_TITLE: 'What currency is the agent charging you in?',
};

const CHECK_YOUR_ANSWERS = {
  ...SHARED,
  PAGE_TITLE: 'Check your answers for this section',
};

module.exports = {
  ROOT,
  ABOUT_GOODS_OR_SERVICES,
  HOW_WILL_YOU_GET_PAID,
  PRIVATE_MARKET,
  DECLINED_BY_PRIVATE_MARKET,
  AGENT,
  AGENT_DETAILS,
  AGENT_SERVICE,
  AGENT_CHARGES,
  AGENT_CHARGES_ALTERNATIVE_CURRENCY,
  CHECK_YOUR_ANSWERS,
};
