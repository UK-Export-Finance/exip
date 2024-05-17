import mapAndSave from '.';
import saveCompany from '../../save-data/company-details';
import saveAddress from '../../save-data/company-different-trading-address';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import nullifyCompanyDifferentTradingAddress from '../../../../../helpers/nullify-company-different-trading-address-data';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/business/map-and-save/company-details - with TRADING_ADDRESS=false, has FULL_ADDRESS', () => {
  jest.mock('../../save-data/company-details');
  jest.mock('../../save-data/company-different-trading-address');

  const mockFormBody = {
    _csrf: '1234',
    [TRADING_ADDRESS]: 'false',
  };

  const mockSaveCompanyDetails = mockSpyPromise();
  const mockSaveCompanyAddress = mockSpyPromise();

  saveCompany.companyDetails = mockSaveCompanyDetails;
  saveAddress.companyDifferentTradingAddress = mockSaveCompanyAddress;

  it('should call saveAddress.companyDifferentTradingAddress with application and nullified data', async () => {
    await mapAndSave.companyDetails(mockFormBody, mockApplication);

    expect(saveAddress.companyDifferentTradingAddress).toHaveBeenCalledTimes(1);
    expect(saveAddress.companyDifferentTradingAddress).toHaveBeenCalledWith(mockApplication, nullifyCompanyDifferentTradingAddress());
  });

  it('should return true', async () => {
    const result = await mapAndSave.companyDetails(mockFormBody, mockApplication);

    expect(result).toEqual(true);
  });
});
