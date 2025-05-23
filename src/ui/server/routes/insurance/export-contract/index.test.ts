import { get, post } from '../../../test-mocks/mock-router';
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
import { get as agentChargesCurrencyGet, post as agentChargesCurrencyPost } from '../../../controllers/insurance/export-contract/currency-of-agents-charge';
import { post as agentChargesCurrencySaveAndBackPost } from '../../../controllers/insurance/export-contract/currency-of-agents-charge/save-and-back';
import {
  get as howMuchTheAgentIsChargingGet,
  post as howMuchTheAgentIsChargingPost,
} from '../../../controllers/insurance/export-contract/how-much-the-agent-is-charging';
import { post as howMuchTheAgentIsChargingSaveAndBackPost } from '../../../controllers/insurance/export-contract/how-much-the-agent-is-charging/save-and-back';
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
  AGENT_CHARGES_CURRENCY,
  AGENT_CHARGES_CURRENCY_SAVE_AND_BACK,
  AGENT_CHARGES_CURRENCY_CHANGE,
  AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE,
  HOW_MUCH_THE_AGENT_IS_CHARGING,
  HOW_MUCH_THE_AGENT_IS_CHARGING_SAVE_AND_BACK,
  HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE,
  HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE,
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
    expect(get).toHaveBeenCalledTimes(35);
    expect(post).toHaveBeenCalledTimes(45);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROOT}`, exportContractRootGet);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED}`, howWasTheContractAwardedGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED}`, howWasTheContractAwardedPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED_CHANGE}`, howWasTheContractAwardedGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED_CHANGE}`, howWasTheContractAwardedPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE}`, howWasTheContractAwardedGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE}`, howWasTheContractAwardedPost);

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
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_CHANGE}`, howWillYouGetPaidGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_CHANGE}`, howWillYouGetPaidPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE}`, howWillYouGetPaidGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE}`, howWillYouGetPaidPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${PRIVATE_MARKET}`, privateMarketPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${PRIVATE_MARKET_SAVE_AND_BACK}`, privateMarketSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${PRIVATE_MARKET_CHANGE}`, privateMarketGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${PRIVATE_MARKET_CHANGE}`, privateMarketPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${PRIVATE_MARKET_CHECK_AND_CHANGE}`, privateMarketGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${PRIVATE_MARKET_CHECK_AND_CHANGE}`, privateMarketPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET}`, declinedByPrivateMarketGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET}`, declinedByPrivateMarketPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_SAVE_AND_BACK}`, declinedByPrivateMarketSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_CHANGE}`, declinedByPrivateMarketGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_CHANGE}`, declinedByPrivateMarketPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE}`, declinedByPrivateMarketGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE}`, declinedByPrivateMarketPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT}`, agentGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT}`, agentPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_SAVE_AND_BACK}`, agentSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHANGE}`, agentGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHANGE}`, agentPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHECK_AND_CHANGE}`, agentGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHECK_AND_CHANGE}`, agentPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_DETAILS}`, agentDetailsGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_DETAILS}`, agentDetailsPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_DETAILS_SAVE_AND_BACK}`, agentDetailsSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_DETAILS_CHANGE}`, agentDetailsGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_DETAILS_CHANGE}`, agentDetailsPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_DETAILS_CHECK_AND_CHANGE}`, agentDetailsGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_DETAILS_CHECK_AND_CHANGE}`, agentDetailsPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_SERVICE}`, agentServiceGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_SERVICE}`, agentServicePost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_SERVICE_SAVE_AND_BACK}`, agentServiceSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_SERVICE_CHANGE}`, agentServiceGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_SERVICE_CHANGE}`, agentServicePost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_SERVICE_CHECK_AND_CHANGE}`, agentServiceGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_SERVICE_CHECK_AND_CHANGE}`, agentServicePost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES}`, agentChargesGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES}`, agentChargesPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_SAVE_AND_BACK}`, agentChargesSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CHANGE}`, agentChargesGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CHANGE}`, agentChargesPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CHECK_AND_CHANGE}`, agentChargesGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CHECK_AND_CHANGE}`, agentChargesPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CURRENCY}`, agentChargesCurrencyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CURRENCY}`, agentChargesCurrencyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CURRENCY_SAVE_AND_BACK}`, agentChargesCurrencySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CURRENCY_CHANGE}`, agentChargesCurrencyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CURRENCY_CHANGE}`, agentChargesCurrencyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE}`, agentChargesCurrencyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE}`, agentChargesCurrencyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${HOW_MUCH_THE_AGENT_IS_CHARGING}`, howMuchTheAgentIsChargingGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_MUCH_THE_AGENT_IS_CHARGING}`, howMuchTheAgentIsChargingPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_MUCH_THE_AGENT_IS_CHARGING_SAVE_AND_BACK}`, howMuchTheAgentIsChargingSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE}`, howMuchTheAgentIsChargingGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE}`, howMuchTheAgentIsChargingPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE}`, howMuchTheAgentIsChargingGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE}`, howMuchTheAgentIsChargingPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);
  });
});
