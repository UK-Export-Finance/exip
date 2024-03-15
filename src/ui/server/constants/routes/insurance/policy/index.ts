import ANOTHER_COMPANY_ROUTES from './another-company';
import BROKER_ROUTES from './broker';
import CHECK_YOUR_ANSWERS_ROUTES from './check-your-answers';
import LOSS_PAYEE_ROUTES from './loss-payee';
import MULTIPLE_CONTRACT_POLICY_ROUTES from './multiple-contract-policy';
import NAME_ON_POLICY_ROUTES from './name-on-policy';
import PRE_CREDIT_PERIOD_ROUTES from './pre-credit-period';
import ROOT from './root';
import SINGLE_CONTRACT_POLICY_ROUTES from './single-contract-policy';
import TYPE_OF_POLICY_ROUTES from './type-of-policy';

export const POLICY = {
  ...ANOTHER_COMPANY_ROUTES,
  ...BROKER_ROUTES,
  ...CHECK_YOUR_ANSWERS_ROUTES,
  ...LOSS_PAYEE_ROUTES,
  ...MULTIPLE_CONTRACT_POLICY_ROUTES,
  ...NAME_ON_POLICY_ROUTES,
  ...PRE_CREDIT_PERIOD_ROUTES,
  ROOT,
  ...SINGLE_CONTRACT_POLICY_ROUTES,
  ...TYPE_OF_POLICY_ROUTES,
};
