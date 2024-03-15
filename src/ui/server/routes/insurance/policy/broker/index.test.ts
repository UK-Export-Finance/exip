import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as getBroker, post as postBroker } from '../../../../controllers/insurance/policy/broker';
import { post as postBrokerSaveAndBack } from '../../../../controllers/insurance/policy/broker/save-and-back';
import { get as getBrokerDetails, post as postBrokerDetails } from '../../../../controllers/insurance/policy/broker-details';
import { post as postBrokerDetailsSaveAndBack } from '../../../../controllers/insurance/policy/broker-details/save-and-back';
import { get as getBrokerConfirmAddress, post as postBrokerConfirmAddress } from '../../../../controllers/insurance/policy/broker-confirm-address';

const {
  BROKER_ROOT,
  BROKER_SAVE_AND_BACK,
  BROKER_CHANGE,
  BROKER_CHECK_AND_CHANGE,
  BROKER_DETAILS_ROOT,
  BROKER_DETAILS_SAVE_AND_BACK,
  BROKER_DETAILS_CHANGE,
  BROKER_DETAILS_CHECK_AND_CHANGE,
  BROKER_CONFIRM_ADDRESS_ROOT,
} = POLICY;

describe('routes/insurance/policy/broker', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(7);
    expect(post).toHaveBeenCalledTimes(9);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ROOT}`, getBroker);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ROOT}`, postBroker);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_SAVE_AND_BACK}`, postBrokerSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CHANGE}`, getBroker);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CHANGE}`, postBroker);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CHECK_AND_CHANGE}`, getBroker);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CHECK_AND_CHANGE}`, postBroker);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_DETAILS_ROOT}`, getBrokerDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_DETAILS_ROOT}`, postBrokerDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_DETAILS_SAVE_AND_BACK}`, postBrokerDetailsSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_DETAILS_CHANGE}`, getBrokerDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_DETAILS_CHANGE}`, postBrokerDetails);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_DETAILS_CHECK_AND_CHANGE}`, getBrokerDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_DETAILS_CHECK_AND_CHANGE}`, postBrokerDetails);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_ROOT}`, getBrokerConfirmAddress);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_ROOT}`, postBrokerConfirmAddress);
  });
});
