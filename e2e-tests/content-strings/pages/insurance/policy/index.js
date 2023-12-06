const SHARED = {
  HEADING_CAPTION: 'Type of policy and exports',
};

const ROOT = {
  ...SHARED,
  PAGE_TITLE: 'What type of cover do you need?',
  LIST: {
    INTRO: 'This section will cover',
    ITEMS: [
      'what type of policy you need (single or multiple)',
      'whose name should be on the policy',
      'whether you need cover during the pre-credit period',
      'any other companies that may need to be covered in your policy',
    ],
  },
  OUTRO: "We'll also ask you tell us if you have a broker or a nominated loss payee.",
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

const DIFFERENT_NAME_ON_POLICY = {
  ...SHARED,
  PAGE_TITLE: 'Enter the contact details for person you want named on the policy',
  HINT: "We'll contact both you and the policy holder to let you know the outcome of your application. We'll store their contact details securely and in line with GDPR.",
};

const CHECK_YOUR_ANSWERS = {
  ...SHARED,
  PAGE_TITLE: 'Check your answers for this section',
};

module.exports = {
  ROOT,
  TYPE_OF_POLICY,
  SINGLE_CONTRACT_POLICY,
  MULTIPLE_CONTRACT_POLICY,
  ABOUT_GOODS_OR_SERVICES,
  NAME_ON_POLICY,
  DIFFERENT_NAME_ON_POLICY,
  CHECK_YOUR_ANSWERS,
};
