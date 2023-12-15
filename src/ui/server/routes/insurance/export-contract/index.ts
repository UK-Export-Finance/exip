import express from 'express';
import { EXPORT_CONTRACT } from '../../../constants/routes/insurance/export-contract';
import { get as exportContractRootGet } from '../../../controllers/insurance/export-contract';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../../controllers/insurance/export-contract/about-goods-or-services';
import { post as aboutGoodsOrServicesSaveAndBackPost } from '../../../controllers/insurance/export-contract/about-goods-or-services/save-and-back';

const { ROOT, ABOUT_GOODS_OR_SERVICES, ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK } = EXPORT_CONTRACT;
const { ABOUT_GOODS_OR_SERVICES_CHANGE, ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE } = EXPORT_CONTRACT;

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

export default exportContractRoute;
