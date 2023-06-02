import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';
import { get as getcheckYourAnswersEligibility, post as postcheckYourAnswersEligibility } from '../../../controllers/insurance/check-your-answers/eligibility';
import { get as getStartNewApplication } from '../../../controllers/insurance/check-your-answers/start-new-application';
import {
  get as getcheckYourAnswersPolicyAndExports,
  post as postcheckYourAnswersPolicyAndExports,
} from '../../../controllers/insurance/check-your-answers/policy-and-exports';
import {
  get as getCheckYourAnswersYourBusiness,
  post as postCheckYourAnswersYourBusiness,
} from '../../../controllers/insurance/check-your-answers/your-business';
import { get as getCheckYourAnswersYourBuyer, post as postCheckYourAnswersYourBuyer } from '../../../controllers/insurance/check-your-answers/your-buyer';
import { post as saveAndBack } from '../../../controllers/insurance/check-your-answers/save-and-back';

describe('routes/insurance/check-your-answers', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(5);
    expect(post).toHaveBeenCalledTimes(7);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.ELIGIBILITY}`, getcheckYourAnswersEligibility);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.ELIGIBILITY}`, postcheckYourAnswersEligibility);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.START_NEW_APPLICATION}`, getStartNewApplication);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, getcheckYourAnswersPolicyAndExports);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, postcheckYourAnswersPolicyAndExports);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.TYPE_OF_POLICY_SAVE_AND_BACK}`, saveAndBack);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS}`, getCheckYourAnswersYourBusiness);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS}`, postCheckYourAnswersYourBusiness);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS_SAVE_AND_BACK}`, saveAndBack);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUYER}`, getCheckYourAnswersYourBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUYER}`, postCheckYourAnswersYourBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUYER_SAVE_AND_BACK}`, saveAndBack);
  });
});
