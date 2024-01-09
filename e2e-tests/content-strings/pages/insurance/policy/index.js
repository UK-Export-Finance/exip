const SHARED = {
  HEADING_CAPTION: 'Your insurance coverage',
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
};

const SINGLE_CONTRACT_POLICY = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the single contract policy you need',
};

const MULTIPLE_CONTRACT_POLICY = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the multiple contract policy you need',
};

const SINGLE_CONTRACT_POLICY_EXPORT_VALUE = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the total value of your export in',
};

const MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the total value of your export in',
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

const PRE_CREDIT_PERIOD = {
  ...SHARED,
  PAGE_TITLE: 'Do you need cover for a period before you supply the goods or services to the buyer?',
};

const BROKER = {
  ...SHARED,
  PAGE_TITLE: 'Are you using a broker to get this insurance?',
  SUMMARY: 'Why appoint a broker?',
  LINE_1: 'A broker can advise you during the application process and lifetime of any UKEF insurance policy.',
  LINE_2: 'You can find your nearest one on',
  LINK_TEXT: "UKEF's list of approved brokers.",
  LINE_3: 'Alternatively, you can use any broker you prefer. They do not have to be approved by UKEF.',
  LINE_4: 'Appointing a broker does not change the cost to you of any UKEF credit insurance policy.',
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
  SINGLE_CONTRACT_POLICY_EXPORT_VALUE,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
  NAME_ON_POLICY,
  DIFFERENT_NAME_ON_POLICY,
  PRE_CREDIT_PERIOD,
  BROKER,
  CHECK_YOUR_ANSWERS,
};
