import { get, post } from '../../test-mocks/mock-router';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../constants/routes/insurance';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../controllers/insurance/policy-and-export/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../controllers/insurance/policy-and-export/type-of-policy/save-and-back';
import { get as singleContractPolicyGet, post as singleContractPolicyPost } from '../../controllers/insurance/policy-and-export/single-contract-policy';
import { post as singleContractPolicySaveAndBackPost } from '../../controllers/insurance/policy-and-export/single-contract-policy/save-and-back';
import { get as multipleContractPolicyGet, post as multipleContractPolicyPost } from '../../controllers/insurance/policy-and-export/multiple-contract-policy';
import { post as multipleContractPolicySaveAndBackPost } from '../../controllers/insurance/policy-and-export/multiple-contract-policy/save-and-back';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../controllers/insurance/policy-and-export/about-goods-or-services';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../controllers/insurance/policy-and-export/check-your-answers';
import { get as pageNotFoundGet } from '../../controllers/insurance/page-not-found';

describe('routes/insurance', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(27);
    expect(post).toHaveBeenCalledTimes(24);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.START, startGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.START, startPost);

    expect(get).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

    expect(get).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyGet);
    expect(post).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyPost);
    expect(post).toHaveBeenCalledWith(
      `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`,
      typeOfPolicySaveAndBackPost,
    );

    expect(get).toHaveBeenCalledWith(
      `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`,
      singleContractPolicyGet,
    );
    expect(post).toHaveBeenCalledWith(
      `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`,
      singleContractPolicyPost,
    );
    expect(post).toHaveBeenCalledWith(
      `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      singleContractPolicySaveAndBackPost,
    );

    expect(get).toHaveBeenCalledWith(
      `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`,
      multipleContractPolicyGet,
    );
    expect(post).toHaveBeenCalledWith(
      `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`,
      multipleContractPolicyPost,
    );
    expect(post).toHaveBeenCalledWith(
      `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      multipleContractPolicySaveAndBackPost,
    );

    expect(get).toHaveBeenCalledWith(
      `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`,
      aboutGoodsOrServicesGet,
    );
    expect(post).toHaveBeenCalledWith(
      `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`,
      aboutGoodsOrServicesPost,
    );

    expect(get).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.PAGE_NOT_FOUND, pageNotFoundGet);
  });
});
