import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as getLossPayee, post as postLossPayee } from '../../../../controllers/insurance/policy/loss-payee';
import { post as postLossPayeeSaveAndBack } from '../../../../controllers/insurance/policy/loss-payee/save-and-back';
import {
  get as getLossPayeeFinancialDetailsUk,
  post as postLossPayeeFinancialDetailsUk,
} from '../../../../controllers/insurance/policy/loss-payee-financial-details-uk';
import { post as postLossPayeeFinancialDetailsUkSaveAndBack } from '../../../../controllers/insurance/policy/loss-payee-financial-details-uk/save-and-back';
import { get as getLossPayeeDetails, post as postLossPayeeDetails } from '../../../../controllers/insurance/policy/loss-payee-details';
import { post as postLossPayeeDetailsSaveAndBack } from '../../../../controllers/insurance/policy/loss-payee-details/save-and-back';
import {
  get as getLossPayeeFinancialInternational,
  post as postLossPayeeFinancialInternational,
} from '../../../../controllers/insurance/policy/loss-payee-financial-details-international';
import { post as postLossPayeeFinancialInternationalSaveAndBack } from '../../../../controllers/insurance/policy/loss-payee-financial-details-international/save-and-back';

const {
  LOSS_PAYEE_ROOT,
  LOSS_PAYEE_CHANGE,
  LOSS_PAYEE_CHECK_AND_CHANGE,
  LOSS_PAYEE_SAVE_AND_BACK,
  LOSS_PAYEE_DETAILS_ROOT,
  LOSS_PAYEE_DETAILS_CHANGE,
  LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE,
  LOSS_PAYEE_DETAILS_SAVE_AND_BACK,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_SAVE_AND_BACK,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_SAVE_AND_BACK,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
} = POLICY;

describe('routes/insurance/policy/loss-payee', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(12);
    expect(post).toHaveBeenCalledTimes(16);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_ROOT}`, getLossPayee);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_ROOT}`, postLossPayee);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_SAVE_AND_BACK}`, postLossPayeeSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_CHANGE}`, getLossPayee);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_CHANGE}`, postLossPayee);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_CHECK_AND_CHANGE}`, getLossPayee);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_CHECK_AND_CHANGE}`, postLossPayee);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_ROOT}`, getLossPayeeDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_ROOT}`, postLossPayeeDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_SAVE_AND_BACK}`, postLossPayeeDetailsSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHANGE}`, getLossPayeeDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHANGE}`, postLossPayeeDetails);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE}`, getLossPayeeDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE}`, postLossPayeeDetails);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, getLossPayeeFinancialDetailsUk);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, postLossPayeeFinancialDetailsUk);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_UK_SAVE_AND_BACK}`, postLossPayeeFinancialDetailsUkSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE}`, getLossPayeeFinancialDetailsUk);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE}`, postLossPayeeFinancialDetailsUk);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE}`, getLossPayeeFinancialDetailsUk);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE}`, postLossPayeeFinancialDetailsUk);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`, getLossPayeeFinancialInternational);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`, postLossPayeeFinancialInternational);
    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_SAVE_AND_BACK}`,
      postLossPayeeFinancialInternationalSaveAndBack,
    );
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE}`, getLossPayeeFinancialInternational);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE}`, postLossPayeeFinancialInternational);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE}`, getLossPayeeFinancialInternational);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE}`, postLossPayeeFinancialInternational);
  });
});
