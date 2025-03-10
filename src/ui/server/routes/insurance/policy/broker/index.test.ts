import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as getBroker, post as postBroker } from '../../../../controllers/insurance/policy/broker';
import { post as postBrokerSaveAndBack } from '../../../../controllers/insurance/policy/broker/save-and-back';
import { get as getBrokerDetails, post as postBrokerDetails } from '../../../../controllers/insurance/policy/broker-details';
import { post as postBrokerDetailsSaveAndBack } from '../../../../controllers/insurance/policy/broker-details/save-and-back';
import { get as getBrokerAddresses, post as postBrokerAddresses } from '../../../../controllers/insurance/policy/broker-addresses';
import { post as postBrokerAddressesSaveAndBack } from '../../../../controllers/insurance/policy/broker-addresses/save-and-back';
import { get as getBrokerConfirmAddress, post as postBrokerConfirmAddress } from '../../../../controllers/insurance/policy/broker-confirm-address';
import { get as getBrokerZeroAddresses } from '../../../../controllers/insurance/policy/broker-zero-addresses';
import { get as getBrokerManualAddress, post as postBrokerManualAddress } from '../../../../controllers/insurance/policy/broker-manual-address';
import { post as postBrokerManualAddressSaveAndBack } from '../../../../controllers/insurance/policy/broker-manual-address/save-and-back';

const {
  BROKER_ROOT,
  BROKER_SAVE_AND_BACK,
  BROKER_CHANGE,
  BROKER_CHECK_AND_CHANGE,
  BROKER_DETAILS_ROOT,
  BROKER_DETAILS_SAVE_AND_BACK,
  BROKER_DETAILS_CHANGE,
  BROKER_DETAILS_CHECK_AND_CHANGE,
  BROKER_ADDRESSES_ROOT,
  BROKER_ADDRESSES_SAVE_AND_BACK,
  BROKER_ADDRESSES_CHANGE,
  BROKER_ADDRESSES_CHECK_AND_CHANGE,
  BROKER_CONFIRM_ADDRESS_ROOT,
  BROKER_CONFIRM_ADDRESS_CHANGE,
  BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE,
  BROKER_ZERO_ADDRESSES_ROOT,
  BROKER_MANUAL_ADDRESS_ROOT,
  BROKER_MANUAL_ADDRESS_CHANGE,
  BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE,
  BROKER_MANUAL_ADDRESS_SAVE_AND_BACK,
} = POLICY;

describe('routes/insurance/policy/broker', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(16);
    expect(post).toHaveBeenCalledTimes(19);

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

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ADDRESSES_ROOT}`, getBrokerAddresses);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ADDRESSES_ROOT}`, postBrokerAddresses);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ADDRESSES_SAVE_AND_BACK}`, postBrokerAddressesSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ADDRESSES_CHANGE}`, getBrokerAddresses);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ADDRESSES_CHANGE}`, postBrokerAddresses);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ADDRESSES_CHECK_AND_CHANGE}`, getBrokerAddresses);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ADDRESSES_CHECK_AND_CHANGE}`, postBrokerAddresses);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_ROOT}`, getBrokerConfirmAddress);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_ROOT}`, postBrokerConfirmAddress);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_CHANGE}`, getBrokerConfirmAddress);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_CHANGE}`, postBrokerConfirmAddress);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE}`, getBrokerConfirmAddress);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE}`, postBrokerConfirmAddress);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_ZERO_ADDRESSES_ROOT}`, getBrokerZeroAddresses);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_MANUAL_ADDRESS_ROOT}`, getBrokerManualAddress);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_MANUAL_ADDRESS_ROOT}`, postBrokerManualAddress);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_MANUAL_ADDRESS_SAVE_AND_BACK}`, postBrokerManualAddressSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_MANUAL_ADDRESS_CHANGE}`, getBrokerManualAddress);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_MANUAL_ADDRESS_CHANGE}`, postBrokerManualAddress);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE}`, getBrokerManualAddress);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE}`, postBrokerManualAddress);
  });
});
