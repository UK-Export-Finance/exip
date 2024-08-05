import express from 'express';
import { EXPORT_CONTRACT } from '../../../constants/routes/insurance/export-contract';
import { get as exportContractRootGet } from '../../../controllers/insurance/export-contract';
import {
  get as howWasTheContractAwardedGet,
  post as howWasTheContractAwardedPost,
} from '../../../controllers/insurance/export-contract/how-was-the-contract-awarded';
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
import { post as agentServiceSaveAndBackPost } from '../../../controllers/insurance/export-contract/agent-service/save-and-back';
import { get as agentChargesGet, post as agentChargesPost } from '../../../controllers/insurance/export-contract/agent-charges';
import { post as agentChargesSaveAndBackPost } from '../../../controllers/insurance/export-contract/agent-charges/save-and-back';
import {
  get as agentChargesAlternativeCurrencyGet,
  post as agentChargesAlternativeCurrencyPost,
} from '../../../controllers/insurance/export-contract/agent-charges/alternative-currency';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/export-contract/check-your-answers';

const {
  ROOT,
  HOW_WAS_THE_CONTRACT_AWARDED,
  HOW_WAS_THE_CONTRACT_AWARDED_CHANGE,
  HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE,
  ABOUT_GOODS_OR_SERVICES,
  ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK,
  ABOUT_GOODS_OR_SERVICES_CHANGE,
  ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
  HOW_WILL_YOU_GET_PAID,
  HOW_WILL_YOU_GET_PAID_SAVE_AND_BACK,
  HOW_WILL_YOU_GET_PAID_CHANGE,
  HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE,
  PRIVATE_MARKET,
  PRIVATE_MARKET_SAVE_AND_BACK,
  PRIVATE_MARKET_CHANGE,
  PRIVATE_MARKET_CHECK_AND_CHANGE,
  DECLINED_BY_PRIVATE_MARKET,
  DECLINED_BY_PRIVATE_MARKET_SAVE_AND_BACK,
  DECLINED_BY_PRIVATE_MARKET_CHANGE,
  DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE,
  AGENT,
  AGENT_SAVE_AND_BACK,
  AGENT_CHANGE,
  AGENT_CHECK_AND_CHANGE,
  AGENT_DETAILS,
  AGENT_DETAILS_SAVE_AND_BACK,
  AGENT_DETAILS_CHANGE,
  AGENT_DETAILS_CHECK_AND_CHANGE,
  AGENT_SERVICE,
  AGENT_SERVICE_SAVE_AND_BACK,
  AGENT_SERVICE_CHANGE,
  AGENT_SERVICE_CHECK_AND_CHANGE,
  AGENT_CHARGES,
  AGENT_CHARGES_SAVE_AND_BACK,
  AGENT_CHARGES_CHANGE,
  AGENT_CHARGES_CHECK_AND_CHANGE,
  AGENT_CHARGES_ALTERNATIVE_CURRENCY,
  AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHANGE,
  AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE,
  CHECK_YOUR_ANSWERS,
} = EXPORT_CONTRACT;

// @ts-ignore
const exportContractRoute = express.Router();

exportContractRoute.get(`/:referenceNumber${ROOT}`, exportContractRootGet);

exportContractRoute.get(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED}`, howWasTheContractAwardedGet);
exportContractRoute.post(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED}`, howWasTheContractAwardedPost);
exportContractRoute.get(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED_CHANGE}`, howWasTheContractAwardedGet);
exportContractRoute.post(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED_CHANGE}`, howWasTheContractAwardedPost);
exportContractRoute.get(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE}`, howWasTheContractAwardedGet);
exportContractRoute.post(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE}`, howWasTheContractAwardedPost);

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
exportContractRoute.get(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE}`, howWillYouGetPaidGet);
exportContractRoute.post(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE}`, howWillYouGetPaidPost);

exportContractRoute.get(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketGet);
exportContractRoute.post(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketPost);
exportContractRoute.post(`/:referenceNumber${PRIVATE_MARKET_SAVE_AND_BACK}`, privateMarketSaveAndBackPost);
exportContractRoute.get(`/:referenceNumber${PRIVATE_MARKET_CHANGE}`, privateMarketGet);
exportContractRoute.post(`/:referenceNumber${PRIVATE_MARKET_CHANGE}`, privateMarketPost);
exportContractRoute.get(`/:referenceNumber${PRIVATE_MARKET_CHECK_AND_CHANGE}`, privateMarketGet);
exportContractRoute.post(`/:referenceNumber${PRIVATE_MARKET_CHECK_AND_CHANGE}`, privateMarketPost);

exportContractRoute.get(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET}`, declinedByPrivateMarketGet);
exportContractRoute.post(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET}`, declinedByPrivateMarketPost);
exportContractRoute.post(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_SAVE_AND_BACK}`, declinedByPrivateMarketSaveAndBackPost);
exportContractRoute.get(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_CHANGE}`, declinedByPrivateMarketGet);
exportContractRoute.post(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_CHANGE}`, declinedByPrivateMarketPost);
exportContractRoute.get(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE}`, declinedByPrivateMarketGet);
exportContractRoute.post(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE}`, declinedByPrivateMarketPost);

exportContractRoute.get(`/:referenceNumber${AGENT}`, agentGet);
exportContractRoute.post(`/:referenceNumber${AGENT}`, agentPost);
exportContractRoute.post(`/:referenceNumber${AGENT_SAVE_AND_BACK}`, agentSaveAndBackPost);
exportContractRoute.get(`/:referenceNumber${AGENT_CHANGE}`, agentGet);
exportContractRoute.post(`/:referenceNumber${AGENT_CHANGE}`, agentPost);
exportContractRoute.get(`/:referenceNumber${AGENT_CHECK_AND_CHANGE}`, agentGet);
exportContractRoute.post(`/:referenceNumber${AGENT_CHECK_AND_CHANGE}`, agentPost);

exportContractRoute.get(`/:referenceNumber${AGENT_DETAILS}`, agentDetailsGet);
exportContractRoute.post(`/:referenceNumber${AGENT_DETAILS}`, agentDetailsPost);
exportContractRoute.post(`/:referenceNumber${AGENT_DETAILS_SAVE_AND_BACK}`, agentDetailsSaveAndBackPost);
exportContractRoute.get(`/:referenceNumber${AGENT_DETAILS_CHANGE}`, agentDetailsGet);
exportContractRoute.post(`/:referenceNumber${AGENT_DETAILS_CHANGE}`, agentDetailsPost);
exportContractRoute.get(`/:referenceNumber${AGENT_DETAILS_CHECK_AND_CHANGE}`, agentDetailsGet);
exportContractRoute.post(`/:referenceNumber${AGENT_DETAILS_CHECK_AND_CHANGE}`, agentDetailsPost);

exportContractRoute.get(`/:referenceNumber${AGENT_SERVICE}`, agentServiceGet);
exportContractRoute.post(`/:referenceNumber${AGENT_SERVICE}`, agentServicePost);
exportContractRoute.post(`/:referenceNumber${AGENT_SERVICE_SAVE_AND_BACK}`, agentServiceSaveAndBackPost);
exportContractRoute.get(`/:referenceNumber${AGENT_SERVICE_CHANGE}`, agentServiceGet);
exportContractRoute.post(`/:referenceNumber${AGENT_SERVICE_CHANGE}`, agentServicePost);
exportContractRoute.get(`/:referenceNumber${AGENT_SERVICE_CHECK_AND_CHANGE}`, agentServiceGet);
exportContractRoute.post(`/:referenceNumber${AGENT_SERVICE_CHECK_AND_CHANGE}`, agentServicePost);

exportContractRoute.get(`/:referenceNumber${AGENT_CHARGES}`, agentChargesGet);
exportContractRoute.post(`/:referenceNumber${AGENT_CHARGES}`, agentChargesPost);
exportContractRoute.post(`/:referenceNumber${AGENT_CHARGES_SAVE_AND_BACK}`, agentChargesSaveAndBackPost);
exportContractRoute.get(`/:referenceNumber${AGENT_CHARGES_CHANGE}`, agentChargesGet);
exportContractRoute.post(`/:referenceNumber${AGENT_CHARGES_CHANGE}`, agentChargesPost);
exportContractRoute.get(`/:referenceNumber${AGENT_CHARGES_CHECK_AND_CHANGE}`, agentChargesGet);
exportContractRoute.post(`/:referenceNumber${AGENT_CHARGES_CHECK_AND_CHANGE}`, agentChargesPost);

exportContractRoute.get(`/:referenceNumber${AGENT_CHARGES_ALTERNATIVE_CURRENCY}`, agentChargesAlternativeCurrencyGet);
exportContractRoute.post(`/:referenceNumber${AGENT_CHARGES_ALTERNATIVE_CURRENCY}`, agentChargesAlternativeCurrencyPost);

exportContractRoute.get(`/:referenceNumber${AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHANGE}`, agentChargesAlternativeCurrencyGet);
exportContractRoute.post(`/:referenceNumber${AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHANGE}`, agentChargesAlternativeCurrencyPost);

exportContractRoute.get(`/:referenceNumber${AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`, agentChargesAlternativeCurrencyGet);
exportContractRoute.post(`/:referenceNumber${AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`, agentChargesAlternativeCurrencyPost);

exportContractRoute.get(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
exportContractRoute.post(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

export default exportContractRoute;
