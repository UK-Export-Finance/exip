const SHARED = {
  HEADING_CAPTION: 'Type of policy and exports',
};

const TYPE_OF_POLICY = {
  ...SHARED,
  PAGE_TITLE: 'What type of policy do you need?',
  INTRO: 'You can change this before you accept and pay for any policy.',
};

const SINGLE_CONTRACT_POLICY = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the single contract policy you need',
};

const MULTIPLE_CONTRACT_POLICY = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the multiple contract policy you need',
};

const ABOUT_GOODS_OR_SERVICES = {
  ...SHARED,
  PAGE_TITLE: 'About the goods or services',
};

const NAME_ON_POLICY = {
  ...SHARED,
  PAGE_TITLE: 'Whose name should be on the policy?',
  HINT: "This should be the person who will sign the contract on behalf of your organisation. We call this the 'authorised signatory.' We'll still contact you about your application's progress even if you're not named on the policy.",
};

const CHECK_YOUR_ANSWERS = {
  ...SHARED,
  PAGE_TITLE: 'Check your answers for this section',
};

export default {
  TYPE_OF_POLICY,
  SINGLE_CONTRACT_POLICY,
  MULTIPLE_CONTRACT_POLICY,
  ABOUT_GOODS_OR_SERVICES,
  CHECK_YOUR_ANSWERS,
  NAME_ON_POLICY,
};
