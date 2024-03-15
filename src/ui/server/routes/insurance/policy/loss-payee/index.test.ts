import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as getLossPayee, post as postLossPayee } from '../../../../controllers/insurance/policy/loss-payee';
import { post as postLossPayeeSaveAndBack } from '../../../../controllers/insurance/policy/loss-payee/save-and-back';
import { get as getLossPayeeFinancialUK, post as postLossPayeeFinancialUK } from '../../../../controllers/insurance/policy/loss-payee-financial-uk';
import { get as getLossPayeeDetails, post as postLossPayeeDetails } from '../../../../controllers/insurance/policy/loss-payee-details';

const {
  LOSS_PAYEE_ROOT,
  LOSS_PAYEE_CHANGE,
  LOSS_PAYEE_CHECK_AND_CHANGE,
  LOSS_PAYEE_SAVE_AND_BACK,
  LOSS_PAYEE_DETAILS_ROOT,
  LOSS_PAYEE_DETAILS_CHANGE,
  LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE,
  LOSS_PAYEE_FINANCIAL_UK_ROOT,
} = POLICY;

describe('routes/insurance/policy/loss-payee', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(8);
    expect(post).toHaveBeenCalledTimes(9);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_ROOT}`, getLossPayee);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_ROOT}`, postLossPayee);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_SAVE_AND_BACK}`, postLossPayeeSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_CHANGE}`, getLossPayee);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_CHANGE}`, postLossPayee);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_CHECK_AND_CHANGE}`, getLossPayee);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_CHECK_AND_CHANGE}`, postLossPayee);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_ROOT}`, getLossPayeeDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_ROOT}`, postLossPayeeDetails);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHANGE}`, getLossPayeeDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHANGE}`, postLossPayeeDetails);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE}`, getLossPayeeDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE}`, postLossPayeeDetails);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_UK_ROOT}`, getLossPayeeFinancialUK);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_UK_ROOT}`, postLossPayeeFinancialUK);
  });
});
