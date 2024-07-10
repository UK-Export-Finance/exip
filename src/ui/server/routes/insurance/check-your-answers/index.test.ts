import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';
import {
  get as getCheckYourAnswersYourBusiness,
  post as postCheckYourAnswersYourBusiness,
} from '../../../controllers/insurance/check-your-answers/your-business';
import { get as getCheckYourAnswersYourBuyer, post as postCheckYourAnswersYourBuyer } from '../../../controllers/insurance/check-your-answers/your-buyer';
import { get as getCheckYourAnswersPolicy, post as postCheckYourAnswersPolicy } from '../../../controllers/insurance/check-your-answers/policy';
import {
  get as getCheckYourAnswersExportContract,
  post as postCheckYourAnswersExportContract,
} from '../../../controllers/insurance/check-your-answers/export-contract';
import { post as saveAndBack } from '../../../controllers/insurance/check-your-answers/save-and-back';

describe('routes/insurance/check-your-answers', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(4);
    expect(post).toHaveBeenCalledTimes(7);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS}`, getCheckYourAnswersYourBusiness);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS}`, postCheckYourAnswersYourBusiness);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS_SAVE_AND_BACK}`, saveAndBack);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUYER}`, getCheckYourAnswersYourBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUYER}`, postCheckYourAnswersYourBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUYER_SAVE_AND_BACK}`, saveAndBack);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, getCheckYourAnswersPolicy);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, postCheckYourAnswersPolicy);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.TYPE_OF_POLICY_SAVE_AND_BACK}`, saveAndBack);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.EXPORT_CONTRACT}`, getCheckYourAnswersExportContract);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.EXPORT_CONTRACT}`, postCheckYourAnswersExportContract);
  });
});
