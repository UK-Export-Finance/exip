import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get, post } from '../../../test-mocks/mock-router';
import { get as getYourBuyerDetails, post as postYourBuyeDetails } from '../../../controllers/insurance/your-buyer';

describe('routes/insurance/your-buyer', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledTimes(1);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, getYourBuyerDetails);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, postYourBuyeDetails);
  });
});
