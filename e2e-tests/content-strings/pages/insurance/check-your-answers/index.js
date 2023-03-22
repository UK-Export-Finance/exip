import { ROUTES } from '../../../../constants';

const { START } = ROUTES.INSURANCE;

const SHARED = {
  HEADING_CAPTION: 'Check your answers',
};

export const ELIGIBILITY = {
  ...SHARED,
  PAGE_TITLE: 'Eligibility',
  CHANGE_ELIGIBILITY: "If you want to change your eligibility answers, you'll need to",
  CHANGE_ELIGIBILITY_LINK: {
    text: 'start a new application.',
    href: START,
  },
  CHANGE_ANSWERS: 'Change answers and start new application',
};

export const POLICY_AND_EXPORTS = {
  ...SHARED,
  PAGE_TITLE: 'Type of policy and exports',
};

export const YOUR_BUSINESS = {
  ...SHARED,
  PAGE_TITLE: 'About your business',
};

export const YOUR_BUYER = {
  ...SHARED,
  PAGE_TITLE: 'Your buyer',
};
