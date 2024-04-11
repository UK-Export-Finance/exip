import express from 'express';
import { EXPORT_CONTRACT } from '../../../constants/routes/insurance/export-contract';
import { get as exportContractRootGet } from '../../../controllers/insurance/export-contract';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../../controllers/insurance/export-contract/about-goods-or-services';
import { post as aboutGoodsOrServicesSaveAndBackPost } from '../../../controllers/insurance/export-contract/about-goods-or-services/save-and-back';
import { get as howWillYouGetPaidGet, post as howWillYouGetPaidPost } from '../../../controllers/insurance/export-contract/how-will-you-get-paid';
import { post as howWillYouGetPaidSaveAndBackPost } from '../../../controllers/insurance/export-contract/how-will-you-get-paid/save-and-back';
import { get as privateMarketGet, post as privateMarketPost } from '../../../controllers/insurance/export-contract/private-market';
import { post as privateMarketSaveAndBackPost } from '../../../controllers/insurance/export-contract/private-market/save-and-back';
import {
  get as declinedByPrivateMarketGet,
  post as declinedByPrivateMarketPost,
} from '../../../controllers/insurance/export-contract/declined-by-private-market';
import { post as declinedByPrivateMarketSaveAndBackPost } from '../../../controllers/insurance/export-contract/declined-by-private-market/save-and-back';
import { get as agentGet, post as agentPost } from '../../../controllers/insurance/export-contract/agent';
import { post as agentSaveAndBackPost } from '../../../controllers/insurance/export-contract/agent/save-and-back';
import { get as agentDetailsGet, post as agentDetailsPost } from '../../../controllers/insurance/export-contract/agent-details';
import { post as agentDetailsSaveAndBackPost } from '../../../controllers/insurance/export-contract/agent-details/save-and-back';
import { get as agentServiceGet, post as agentServicePost } from '../../../controllers/insurance/export-contract/agent-service';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/export-contract/check-your-answers';

const {
  ROOT,
  ABOUT_GOODS_OR_SERVICES,
  ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK,
  ABOUT_GOODS_OR_SERVICES_CHANGE,
  ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
  HOW_WILL_YOU_GET_PAID,
  HOW_WILL_YOU_GET_PAID_CHANGE,
  HOW_WILL_YOU_GET_PAID_SAVE_AND_BACK,
  PRIVATE_MARKET,
  PRIVATE_MARKET_CHANGE,
  PRIVATE_MARKET_SAVE_AND_BACK,
  DECLINED_BY_PRIVATE_MARKET,
  DECLINED_BY_PRIVATE_MARKET_SAVE_AND_BACK,
  AGENT,
  AGENT_SAVE_AND_BACK,
  AGENT_DETAILS,
  AGENT_DETAILS_SAVE_AND_BACK,
  AGENT_SERVICE,
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
exportContractRoute.get(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_CHANGE}`, howWillYouGetPaidGet);
exportContractRoute.post(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_CHANGE}`, howWillYouGetPaidPost);

exportContractRoute.get(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketGet);
exportContractRoute.post(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketPost);
exportContractRoute.post(`/:referenceNumber${PRIVATE_MARKET_SAVE_AND_BACK}`, privateMarketSaveAndBackPost);
exportContractRoute.get(`/:referenceNumber${PRIVATE_MARKET_CHANGE}`, privateMarketGet);
exportContractRoute.post(`/:referenceNumber${PRIVATE_MARKET_CHANGE}`, privateMarketPost);

exportContractRoute.get(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET}`, declinedByPrivateMarketGet);
exportContractRoute.post(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET}`, declinedByPrivateMarketPost);
exportContractRoute.post(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_SAVE_AND_BACK}`, declinedByPrivateMarketSaveAndBackPost);

exportContractRoute.get(`/:referenceNumber${AGENT}`, agentGet);
exportContractRoute.post(`/:referenceNumber${AGENT}`, agentPost);
exportContractRoute.post(`/:referenceNumber${AGENT_SAVE_AND_BACK}`, agentSaveAndBackPost);

exportContractRoute.get(`/:referenceNumber${AGENT_DETAILS}`, agentDetailsGet);
exportContractRoute.post(`/:referenceNumber${AGENT_DETAILS}`, agentDetailsPost);
exportContractRoute.post(`/:referenceNumber${AGENT_DETAILS_SAVE_AND_BACK}`, agentDetailsSaveAndBackPost);

exportContractRoute.get(`/:referenceNumber${AGENT_SERVICE}`, agentServiceGet);
exportContractRoute.post(`/:referenceNumber${AGENT_SERVICE}`, agentServicePost);

exportContractRoute.get(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
exportContractRoute.post(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

export default exportContractRoute;
