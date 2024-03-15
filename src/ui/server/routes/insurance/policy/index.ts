import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as policyRootGet } from '../../../controllers/insurance/policy';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../../controllers/insurance/policy/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../../controllers/insurance/policy/type-of-policy/save-and-back';
import { get as singleContractPolicyGet, post as singleContractPolicyPost } from '../../../controllers/insurance/policy/single-contract-policy';
import { post as singleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy/single-contract-policy/save-and-back';
import {
  get as singleContractPolicyContractValueGet,
  post as singleContractPolicyContractValuePost,
} from '../../../controllers/insurance/policy/single-contract-policy/total-contract-value';
import { post as contractValueSaveAndBackPost } from '../../../controllers/insurance/policy/single-contract-policy/total-contract-value/save-and-back';
import { get as multipleContractPolicyGet, post as multipleContractPolicyPost } from '../../../controllers/insurance/policy/multiple-contract-policy';
import {
  get as multipleContractPolicyExportValueGet,
  post as multipleContractPolicyExportValuePost,
} from '../../../controllers/insurance/policy/multiple-contract-policy/export-value';
import { post as multipleContractPolicyExportValueSaveAndBackPost } from '../../../controllers/insurance/policy/multiple-contract-policy/export-value/save-and-back';
import { post as multipleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy/multiple-contract-policy/save-and-back';
import { get as nameOnPolicyGet, post as nameOnPolicyPost } from '../../../controllers/insurance/policy/name-on-policy';
import { post as nameOnPolicySaveAndBackPost } from '../../../controllers/insurance/policy/name-on-policy/save-and-back';
import { get as differentNameOnPolicyGet, post as differentNameOnPolicyPost } from '../../../controllers/insurance/policy/different-name-on-policy';
import { get as preCreditPeriodGet, post as preCreditPeriodPost } from '../../../controllers/insurance/policy/pre-credit-period';
import { get as anotherCompanyGet, post as anotherCompanyPost } from '../../../controllers/insurance/policy/another-company';
import { post as anotherCompanySaveAndBackPost } from '../../../controllers/insurance/policy/another-company/save-and-back';
import { get as otherCompanyDetailsGet, post as otherCompanyDetailsPost } from '../../../controllers/insurance/policy/other-company-details';
import { post as otherCompanyDetailsSaveAndBackPost } from '../../../controllers/insurance/policy/other-company-details/save-and-back';
import { post as preCreditPeriodSaveAndBackPost } from '../../../controllers/insurance/policy/pre-credit-period/save-and-back';
import { post as differentNameOnPolicySaveAndBackPost } from '../../../controllers/insurance/policy/different-name-on-policy/save-and-back';
import { get as getBroker, post as postBroker } from '../../../controllers/insurance/policy/broker';
import { post as postBrokerSaveAndBack } from '../../../controllers/insurance/policy/broker/save-and-back';
import { get as getBrokerDetails, post as postBrokerDetails } from '../../../controllers/insurance/policy/broker-details';
import { post as postBrokerDetailsSaveAndBack } from '../../../controllers/insurance/policy/broker-details/save-and-back';
import { get as getBrokerConfirmAddress, post as postBrokerConfirmAddress } from '../../../controllers/insurance/policy/broker-confirm-address';
import { get as getLossPayee, post as postLossPayee } from '../../../controllers/insurance/policy/loss-payee';
import { post as postLossPayeeSaveAndBack } from '../../../controllers/insurance/policy/loss-payee/save-and-back';
import { get as getLossPayeeFinancialUK, post as postLossPayeeFinancialUK } from '../../../controllers/insurance/policy/loss-payee-financial-uk';
import {
  get as getLossPayeeFinancialInternational,
  post as postLossPayeeFinancialInternational,
} from '../../../controllers/insurance/policy/loss-payee-financial-international';
import { get as getLossPayeeDetails, post as postLossPayeeDetails } from '../../../controllers/insurance/policy/loss-payee-details';
import { post as postLossPayeeDetailsSaveAndBack } from '../../../controllers/insurance/policy/loss-payee-details/save-and-back';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/policy/check-your-answers';

// @ts-ignore
const insurancePolicyRouter = express.Router();

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ROOT}`, policyRootGet);

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

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`, singleContractPolicyContractValueGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`, singleContractPolicyContractValuePost);

insurancePolicyRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_SAVE_AND_BACK}`,
  contractValueSaveAndBackPost,
);

insurancePolicyRouter.get(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`,
  singleContractPolicyContractValueGet,
);
insurancePolicyRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`,
  singleContractPolicyContractValuePost,
);

insurancePolicyRouter.get(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`,
  singleContractPolicyContractValueGet,
);
insurancePolicyRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`,
  singleContractPolicyContractValuePost,
);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`, multipleContractPolicySaveAndBackPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, multipleContractPolicyExportValueGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, multipleContractPolicyExportValuePost);
insurancePolicyRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_SAVE_AND_BACK}`,
  multipleContractPolicyExportValueSaveAndBackPost,
);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE}`, multipleContractPolicyExportValueGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE}`, multipleContractPolicyExportValuePost);
insurancePolicyRouter.get(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE}`,
  multipleContractPolicyExportValueGet,
);
insurancePolicyRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE}`,
  multipleContractPolicyExportValuePost,
);

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

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.PRE_CREDIT_PERIOD}`, preCreditPeriodGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.PRE_CREDIT_PERIOD}`, preCreditPeriodPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.PRE_CREDIT_PERIOD_SAVE_AND_BACK}`, preCreditPeriodSaveAndBackPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.PRE_CREDIT_PERIOD_CHANGE}`, preCreditPeriodGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.PRE_CREDIT_PERIOD_CHANGE}`, preCreditPeriodPost);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.PRE_CREDIT_PERIOD_CHECK_AND_CHANGE}`, preCreditPeriodGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.PRE_CREDIT_PERIOD_CHECK_AND_CHANGE}`, preCreditPeriodPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ANOTHER_COMPANY}`, anotherCompanyGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ANOTHER_COMPANY}`, anotherCompanyPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ANOTHER_COMPANY_SAVE_AND_BACK}`, anotherCompanySaveAndBackPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.OTHER_COMPANY_DETAILS}`, otherCompanyDetailsGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.OTHER_COMPANY_DETAILS}`, otherCompanyDetailsPost);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.OTHER_COMPANY_DETAILS_SAVE_AND_BACK}`, otherCompanyDetailsSaveAndBackPost);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_ROOT}`, getBroker);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_ROOT}`, postBroker);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_SAVE_AND_BACK}`, postBrokerSaveAndBack);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CHANGE}`, getBroker);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CHANGE}`, postBroker);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CHECK_AND_CHANGE}`, getBroker);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CHECK_AND_CHANGE}`, postBroker);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_DETAILS_ROOT}`, getBrokerDetails);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_DETAILS_ROOT}`, postBrokerDetails);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_DETAILS_SAVE_AND_BACK}`, postBrokerDetailsSaveAndBack);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_DETAILS_CHANGE}`, getBrokerDetails);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_DETAILS_CHANGE}`, postBrokerDetails);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_DETAILS_CHECK_AND_CHANGE}`, getBrokerDetails);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_DETAILS_CHECK_AND_CHANGE}`, postBrokerDetails);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CONFIRM_ADDRESS_ROOT}`, getBrokerConfirmAddress);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CONFIRM_ADDRESS_ROOT}`, postBrokerConfirmAddress);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_ROOT}`, getLossPayee);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_ROOT}`, postLossPayee);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_CHANGE}`, getLossPayee);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_CHANGE}`, postLossPayee);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_CHECK_AND_CHANGE}`, getLossPayee);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_CHECK_AND_CHANGE}`, postLossPayee);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_SAVE_AND_BACK}`, postLossPayeeSaveAndBack);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_DETAILS_ROOT}`, getLossPayeeDetails);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_DETAILS_ROOT}`, postLossPayeeDetails);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_DETAILS_CHANGE}`, getLossPayeeDetails);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_DETAILS_CHANGE}`, postLossPayeeDetails);
insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE}`, getLossPayeeDetails);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE}`, postLossPayeeDetails);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_DETAILS_SAVE_AND_BACK}`, postLossPayeeDetailsSaveAndBack);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_FINANCIAL_UK_ROOT}`, getLossPayeeFinancialUK);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_FINANCIAL_UK_ROOT}`, postLossPayeeFinancialUK);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL_ROOT}`, getLossPayeeFinancialInternational);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL_ROOT}`, postLossPayeeFinancialInternational);

insurancePolicyRouter.get(`/:referenceNumber${INSURANCE_ROUTES.POLICY.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
insurancePolicyRouter.post(`/:referenceNumber${INSURANCE_ROUTES.POLICY.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

export default insurancePolicyRouter;
