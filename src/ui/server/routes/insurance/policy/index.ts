import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../../controllers/insurance/policy/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../../controllers/insurance/policy/type-of-policy/save-and-back';
import { get as singleContractPolicyGet, post as singleContractPolicyPost } from '../../../controllers/insurance/policy/single-contract-policy';
import { post as singleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy/single-contract-policy/save-and-back';
import { get as multipleContractPolicyGet, post as multipleContractPolicyPost } from '../../../controllers/insurance/policy/multiple-contract-policy';
import { post as multipleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy/multiple-contract-policy/save-and-back';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../../controllers/insurance/policy/about-goods-or-services';
import { post as aboutGoodsOrServicesSaveAndBackPost } from '../../../controllers/insurance/policy/about-goods-or-services/save-and-back';
import { get as nameOnPolicyGet, post as nameOnPolicyPost } from '../../../controllers/insurance/policy/name-on-policy';
import { post as nameOnPolicySaveAndBackPost } from '../../../controllers/insurance/policy/name-on-policy/save-and-back';
import { get as differentNameOnPolicyGet, post as differentNameOnPolicyPost } from '../../../controllers/insurance/policy/different-name-on-policy';
import { post as differentNameOnPolicySaveAndBackPost } from '../../../controllers/insurance/policy/different-name-on-policy/save-and-back';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/policy/check-your-answers';
import { post as checkYourAnswersSaveAndBackPost } from '../../../controllers/insurance/policy/check-your-answers/save-and-back';

// @ts-ignore
const insurancePolicyRouter = express.Router();

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY}`, typeOfPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY}`, typeOfPolicyPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY_SAVE_AND_BACK}`, typeOfPolicySaveAndBackPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY_CHANGE}`, typeOfPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY_CHANGE}`, typeOfPolicyPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY}`, singleContractPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY}`, singleContractPolicyPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`, singleContractPolicySaveAndBackPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, singleContractPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, singleContractPolicyPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`, multipleContractPolicySaveAndBackPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`, aboutGoodsOrServicesSaveAndBackPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ABOUT_GOODS_OR_SERVICES_CHANGE}`, aboutGoodsOrServicesPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, aboutGoodsOrServicesGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, aboutGoodsOrServicesPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY}`, nameOnPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY}`, nameOnPolicyPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_SAVE_AND_BACK}`, nameOnPolicySaveAndBackPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_CHANGE}`, nameOnPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_CHANGE}`, nameOnPolicyPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_CHECK_AND_CHANGE}`, nameOnPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_CHECK_AND_CHANGE}`, nameOnPolicyPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_SAVE_AND_BACK}`, differentNameOnPolicySaveAndBackPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_CHANGE}`, differentNameOnPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_CHANGE}`, differentNameOnPolicyPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, differentNameOnPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, differentNameOnPolicyPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`, checkYourAnswersSaveAndBackPost);

export default insurancePolicyRouter;
