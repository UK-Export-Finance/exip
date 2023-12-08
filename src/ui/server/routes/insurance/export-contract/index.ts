import express from 'express';
import { EXPORT_CONTRACT } from '../../../constants/routes/insurance/export-contract';
import { get as exportContractRootGet } from '../../../controllers/insurance/export-contract';

const { ROOT } = EXPORT_CONTRACT;

// @ts-ignore
const exportContractRoute = express.Router();

exportContractRoute.get(`/:referenceNumber${ROOT}`, exportContractRootGet);

export default exportContractRoute;
