import { get, post } from '../../../test-mocks/mock-router';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../constants/routes/insurance';

import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../../controllers/insurance/policy-and-export/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../../controllers/insurance/policy-and-export/type-of-policy/save-and-back';
import { get as singleContractPolicyGet, post as singleContractPolicyPost } from '../../../controllers/insurance/policy-and-export/single-contract-policy';
import { post as singleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy-and-export/single-contract-policy/save-and-back';
import { get as multipleContractPolicyGet, post as multipleContractPolicyPost } from '../../../controllers/insurance/policy-and-export/multiple-contract-policy';
import { post as multipleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy-and-export/multiple-contract-policy/save-and-back';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../../controllers/insurance/policy-and-export/about-goods-or-services';
import { post as aboutGoodsOrServicesSaveAndBackPost } from '../../../controllers/insurance/policy-and-export/about-goods-or-services/save-and-back';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/policy-and-export/check-your-answers';
import { post as checkYourAnswersSaveAndBackPost } from '../../../controllers/insurance/policy-and-export/check-your-answers/save-and-back';

describe('routes/insurance/policy-and-exports', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });


  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(9);
    expect(post).toHaveBeenCalledTimes(14);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`,
      typeOfPolicySaveAndBackPost,
    );
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY_CHANGE}`, typeOfPolicyGet);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`,
      singleContractPolicyGet,
    );
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`,
      singleContractPolicyPost,
    );
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      singleContractPolicySaveAndBackPost,
    );
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_CHANGE}`,
      singleContractPolicyGet,
    );
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_CHANGE}`,
      singleContractPolicyPost,
    );

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`,
      multipleContractPolicyGet,
    );
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`,
      multipleContractPolicyPost,
    );
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      multipleContractPolicySaveAndBackPost,
    );
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_CHANGE}`,
      multipleContractPolicyGet,
    );
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_CHANGE}`,
      multipleContractPolicyPost,
    );

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`,
      aboutGoodsOrServicesGet,
    );
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`,
      aboutGoodsOrServicesPost,
    );
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
      aboutGoodsOrServicesSaveAndBackPost,
    );
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES_CHANGE}`,
      aboutGoodsOrServicesGet,
    );
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES_CHANGE}`,
      aboutGoodsOrServicesPost,
    );

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${
      INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`,
      checkYourAnswersSaveAndBackPost,
    );
  });
});
