import { get, post } from '../../../test-mocks/mock-router';
import { EXPORT_CONTRACT } from '../../../constants/routes/insurance/export-contract';
import { get as exportContractRootGet } from '../../../controllers/insurance/export-contract';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../../controllers/insurance/export-contract/about-goods-or-services';
import { post as aboutGoodsOrServicesSaveAndBackPost } from '../../../controllers/insurance/export-contract/about-goods-or-services/save-and-back';
import { get as howWillYouGetPaidGet, post as howWillYouGetPaidPost } from '../../../controllers/insurance/export-contract/how-will-you-get-paid';
import { post as howWillYouGetPaidSaveAndBackPost } from '../../../controllers/insurance/export-contract/how-will-you-get-paid/save-and-back';
import { get as privateMarketGet, post as privateMarketPost } from '../../../controllers/insurance/export-contract/private-market';
import {
  get as declinedByPrivateMarketGet,
  post as declinedByPrivateMarketPost,
} from '../../../controllers/insurance/export-contract/declined-by-private-market';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/export-contract/check-your-answers';

const {
  ROOT,
  ABOUT_GOODS_OR_SERVICES,
  ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK,
  ABOUT_GOODS_OR_SERVICES_CHANGE,
  ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
  HOW_WILL_YOU_GET_PAID,
  HOW_WILL_YOU_GET_PAID_SAVE_AND_BACK,
  PRIVATE_MARKET,
  DECLINED_BY_PRIVATE_MARKET,
  CHECK_YOUR_ANSWERS,
} = EXPORT_CONTRACT;

describe('routes/insurance/export-contract', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(8);
    expect(post).toHaveBeenCalledTimes(9);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROOT}`, exportContractRootGet);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`, aboutGoodsOrServicesSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, aboutGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, aboutGoodsOrServicesPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${HOW_WILL_YOU_GET_PAID}`, howWillYouGetPaidGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_WILL_YOU_GET_PAID}`, howWillYouGetPaidPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_SAVE_AND_BACK}`, howWillYouGetPaidSaveAndBackPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET}`, declinedByPrivateMarketGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET}`, declinedByPrivateMarketPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);
  });
});
