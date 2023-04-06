import { ROUTES } from '../constants/routes';

const {
  INSURANCE: {
    DASHBOARD,
    ACCOUNT: { MANAGE_ACCOUNT, SIGN_IN },
  },
} = ROUTES;

export const HEADER = {
  ACCOUNT: {
    HREF: MANAGE_ACCOUNT,
  },
  APPLICATIONS: {
    TEXT: 'My applications',
    HREF: DASHBOARD,
  },
  SIGN_OUT: {
    TEXT: 'Sign out',
    HREF: SIGN_IN.ROOT,
  },
};
