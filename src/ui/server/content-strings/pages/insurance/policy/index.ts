const SHARED = {
  HEADING_CAPTION: 'Your insurance coverage',
};

const ROOT = {
  ...SHARED,
  PAGE_TITLE: 'What type of cover do you need?',
  LIST: {
    INTRO: 'This section will cover:',
    ITEMS: [
      'what type of policy you need (single or multiple/revolving)',
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

const SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the value of the contract and the value of the policy in',
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
  PAGE_TITLE: 'Do you need pre-credit cover before you supply the goods or services to the buyer?',
};

const ANOTHER_COMPANY = {
  ...SHARED,
  PAGE_TITLE: 'Is there another company that needs to be insured in your policy?',
};

const OTHER_COMPANY_DETAILS = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the other company you want to insure in your policy',
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

const BROKER_DETAILS = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about your broker',
  INTRO:
    "Your broker's contact details will be stored securely and in line with GDPR. They will also be our main point of contact when processing your application.",
};

const BROKER_CONFIRM_ADDRESS = {
  ...SHARED,
  PAGE_TITLE: "Confirm broker's address",
  USE_DIFFERENT_ADDRESS: 'Use a different address',
  ENTER_ADDRESS_MANUALLY: 'Enter address manually',
};

const LOSS_PAYEE = {
  ...SHARED,
  PAGE_TITLE: 'Are you appointing a loss payee?',
};

const LOSS_PAYEE_DETAILS = {
  ...SHARED,
  PAGE_TITLE: 'Tell us about the nominated loss payee',
};

const LOSS_PAYEE_FINANCIAL_DETAILS = {
  ...SHARED,
  PAGE_TITLE: "What are your loss payee's bank details?",
  HINT: "We'll use these bank details to pay the loss payee in the event of a valid claim. If you're unsure, ask your bank or lender. You can also check your bank statement.",
};

const CHECK_YOUR_ANSWERS = {
  ...SHARED,
  PAGE_TITLE: 'Check your answers for this section',
};

export default {
  ROOT,
  TYPE_OF_POLICY,
  SINGLE_CONTRACT_POLICY,
  MULTIPLE_CONTRACT_POLICY,
  SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
  NAME_ON_POLICY,
  DIFFERENT_NAME_ON_POLICY,
  PRE_CREDIT_PERIOD,
  ANOTHER_COMPANY,
  OTHER_COMPANY_DETAILS,
  BROKER,
  BROKER_DETAILS,
  BROKER_CONFIRM_ADDRESS,
  LOSS_PAYEE,
  LOSS_PAYEE_DETAILS,
  LOSS_PAYEE_FINANCIAL_DETAILS,
  CHECK_YOUR_ANSWERS,
};
