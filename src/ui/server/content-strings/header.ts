import { ROUTES } from '../constants/routes';

const {
  INSURANCE: {
    DASHBOARD,
    ACCOUNT: { MANAGE, SIGN_OUT },
  },
} = ROUTES;

export const HEADER = {
  ACCOUNT: {
    HREF: MANAGE,
  },
  APPLICATIONS: {
    TEXT: 'My applications',
    HREF: DASHBOARD,
  },
  SIGN_OUT: {
    TEXT: 'Sign out',
    HREF: SIGN_OUT,
  },
};
