import express from 'express';
import { EXPORT_CONTRACT } from '../../../constants/routes/insurance/export-contract';
import { get as exportContractRootGet } from '../../../controllers/insurance/export-contract';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../../controllers/insurance/export-contract/about-goods-or-services';
import { post as aboutGoodsOrServicesSaveAndBackPost } from '../../../controllers/insurance/export-contract/about-goods-or-services/save-and-back';
import { get as howWillYouGetPaidGet, post as howWillYouGetPaidPost } from '../../../controllers/insurance/export-contract/how-will-you-get-paid';
import { post as howWillYouGetPaidSaveAndBackPost } from '../../../controllers/insurance/export-contract/how-will-you-get-paid/save-and-back';
import { get as privateMarketGet, post as privateMarketPost } from '../../../controllers/insurance/export-contract/private-market';
import { get as declinedByPrivateMarketGet } from '../../../controllers/insurance/export-contract/declined-by-private-market';
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

// @ts-ignore
const exportContractRoute = express.Router();

exportContractRoute.get(`/:referenceNumber${ROOT}`, exportContractRootGet);

exportContractRoute.get(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesGet);
exportContractRoute.post(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesPost);
exportContractRoute.post(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`, aboutGoodsOrServicesSaveAndBackPost);
exportContractRoute.get(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesGet);
exportContractRoute.post(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesPost);
exportContractRoute.get(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, aboutGoodsOrServicesGet);
exportContractRoute.post(`/:referenceNumber${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, aboutGoodsOrServicesPost);

exportContractRoute.get(`/:referenceNumber${HOW_WILL_YOU_GET_PAID}`, howWillYouGetPaidGet);
exportContractRoute.post(`/:referenceNumber${HOW_WILL_YOU_GET_PAID}`, howWillYouGetPaidPost);
exportContractRoute.post(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_SAVE_AND_BACK}`, howWillYouGetPaidSaveAndBackPost);

exportContractRoute.get(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketGet);
exportContractRoute.post(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketPost);

exportContractRoute.get(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET}`, declinedByPrivateMarketGet);

exportContractRoute.get(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
exportContractRoute.post(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

export default exportContractRoute;
