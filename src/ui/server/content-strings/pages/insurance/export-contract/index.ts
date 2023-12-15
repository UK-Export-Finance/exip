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
      'your commissioning agent (if you have one)',
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

export default {
  ROOT,
  ABOUT_GOODS_OR_SERVICES,
};
