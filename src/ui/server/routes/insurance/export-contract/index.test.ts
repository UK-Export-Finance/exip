import { get, post } from '../../../test-mocks/mock-router';
import { EXPORT_CONTRACT } from '../../../constants/routes/insurance/export-contract';
import { get as exportContractRootGet } from '../../../controllers/insurance/export-contract';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../../controllers/insurance/export-contract/about-goods-or-services';
import { post as aboutGoodsOrServicesSaveAndBackPost } from '../../../controllers/insurance/export-contract/about-goods-or-services/save-and-back';

const { ROOT, ABOUT_GOODS_OR_SERVICES, ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK } = EXPORT_CONTRACT;
const { ABOUT_GOODS_OR_SERVICES_CHANGE, ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE } = EXPORT_CONTRACT;

describe('routes/insurance/export-contract', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(4);
    expect(post).toHaveBeenCalledTimes(4);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROOT}`, exportContractRootGet);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`, aboutGoodsOrServicesSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, aboutGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, aboutGoodsOrServicesPost);
  });
});
