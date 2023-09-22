import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../../controllers/insurance/policy-and-export/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../../controllers/insurance/policy-and-export/type-of-policy/save-and-back';
import { get as singleContractPolicyGet, post as singleContractPolicyPost } from '../../../controllers/insurance/policy-and-export/single-contract-policy';
import { post as singleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy-and-export/single-contract-policy/save-and-back';
import {
  get as multipleContractPolicyGet,
  post as multipleContractPolicyPost,
} from '../../../controllers/insurance/policy-and-export/multiple-contract-policy';
import { post as multipleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy-and-export/multiple-contract-policy/save-and-back';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../../controllers/insurance/policy-and-export/about-goods-or-services';
import { post as aboutGoodsOrServicesSaveAndBackPost } from '../../../controllers/insurance/policy-and-export/about-goods-or-services/save-and-back';
import { get as nameOnPolicyGet, post as nameOnPolicyPost } from '../../../controllers/insurance/policy-and-export/name-on-policy';
import { get as differentNameOnPolicyGet, post as differentNameOnPolicyPost } from '../../../controllers/insurance/policy-and-export/different-name-on-policy';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/policy-and-export/check-your-answers';
import { post as checkYourAnswersSaveAndBackPost } from '../../../controllers/insurance/policy-and-export/check-your-answers/save-and-back';

// @ts-ignore
const insurancePolicyAndExportsRouter = express.Router();

insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyPost);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`, typeOfPolicySaveAndBackPost);
insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY_CHANGE}`, typeOfPolicyGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY_CHANGE}`, typeOfPolicyPost);
insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyPost);

insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`, singleContractPolicyGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`, singleContractPolicyPost);
insurancePolicyAndExportsRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
  singleContractPolicySaveAndBackPost,
);
insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyPost);
insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, singleContractPolicyGet);
insurancePolicyAndExportsRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`,
  singleContractPolicyPost,
);

insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyPost);
insurancePolicyAndExportsRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
  multipleContractPolicySaveAndBackPost,
);
insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyPost);
insurancePolicyAndExportsRouter.get(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`,
  multipleContractPolicyGet,
);
insurancePolicyAndExportsRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`,
  multipleContractPolicyPost,
);

insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesPost);
insurancePolicyAndExportsRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
  aboutGoodsOrServicesSaveAndBackPost,
);
insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesPost);
insurancePolicyAndExportsRouter.get(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`,
  aboutGoodsOrServicesGet,
);
insurancePolicyAndExportsRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`,
  aboutGoodsOrServicesPost,
);

insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.NAME_ON_POLICY}`, nameOnPolicyGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.NAME_ON_POLICY}`, nameOnPolicyPost);

insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyPost);

insurancePolicyAndExportsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
insurancePolicyAndExportsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

insurancePolicyAndExportsRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`,
  checkYourAnswersSaveAndBackPost,
);

export default insurancePolicyAndExportsRouter;
