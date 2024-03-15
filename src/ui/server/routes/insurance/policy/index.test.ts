import { get, use } from '../../../test-mocks/mock-router';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as policyRootGet } from '../../../controllers/insurance/policy';
import typeofPolicyRouter from './type-of-policy';
import singleContractPolicyRouter from './single-contract-policy';
import multipleContractPolicyRouter from './multiple-contract-policy';
import nameOnPolicyRouter from './name-on-policy';
import anotherCompanyRouter from './another-company';
import brokerRouter from './broker';
import preCreditPeriodRouter from './pre-credit-period';
import lossPayeeRouter from './loss-payee';
import checkYourAnswersRouter from './check-your-answers';

describe('routes/insurance/policy', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(1);
    expect(use).toHaveBeenCalledTimes(9);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ROOT}`, policyRootGet);

    expect(use).toHaveBeenCalledWith('/', typeofPolicyRouter);
    expect(use).toHaveBeenCalledWith('/', singleContractPolicyRouter);
    expect(use).toHaveBeenCalledWith('/', multipleContractPolicyRouter);
    expect(use).toHaveBeenCalledWith('/', nameOnPolicyRouter);
    expect(use).toHaveBeenCalledWith('/', anotherCompanyRouter);
    expect(use).toHaveBeenCalledWith('/', brokerRouter);
    expect(use).toHaveBeenCalledWith('/', preCreditPeriodRouter);
    expect(use).toHaveBeenCalledWith('/', lossPayeeRouter);
    expect(use).toHaveBeenCalledWith('/', checkYourAnswersRouter);
  });
});
