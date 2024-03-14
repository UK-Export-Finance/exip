import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as preCreditPeriodGet, post as preCreditPeriodPost } from '../../../../controllers/insurance/policy/pre-credit-period';
import { post as preCreditPeriodSaveAndBackPost } from '../../../../controllers/insurance/policy/pre-credit-period/save-and-back';

const { PRE_CREDIT_PERIOD, PRE_CREDIT_PERIOD_SAVE_AND_BACK, PRE_CREDIT_PERIOD_CHANGE, PRE_CREDIT_PERIOD_CHECK_AND_CHANGE } = POLICY;

describe('routes/insurance/policy/pre-credit-period', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(3);
    expect(post).toHaveBeenCalledTimes(4);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${PRE_CREDIT_PERIOD}`, preCreditPeriodGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${PRE_CREDIT_PERIOD}`, preCreditPeriodPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${PRE_CREDIT_PERIOD_SAVE_AND_BACK}`, preCreditPeriodSaveAndBackPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${PRE_CREDIT_PERIOD_CHANGE}`, preCreditPeriodGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${PRE_CREDIT_PERIOD_CHANGE}`, preCreditPeriodPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${PRE_CREDIT_PERIOD_CHECK_AND_CHANGE}`, preCreditPeriodGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${PRE_CREDIT_PERIOD_CHECK_AND_CHANGE}`, preCreditPeriodPost);
  });
});
