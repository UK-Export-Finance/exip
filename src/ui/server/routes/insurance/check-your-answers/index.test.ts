import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';

import { get as getcheckYourAnswersEligibility, post as postcheckYourAnswersEligibility } from '../../../controllers/insurance/check-your-answers/eligibility';
import {
  get as getcheckYourAnswersPolicyAndExports,
  post as postcheckYourAnswersPolicyAndExports,
} from '../../../controllers/insurance/check-your-answers/policy-and-exports';
import { post as postcheckYourAnswersPolicyAndExportsSaveAndBack } from '../../../controllers/insurance/check-your-answers/policy-and-exports/save-and-back';

describe('routes/insurance/check-your-answers', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(2);
    expect(post).toHaveBeenCalledTimes(3);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.ELIGIBILITY}`, getcheckYourAnswersEligibility);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.ELIGIBILITY}`, postcheckYourAnswersEligibility);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, getcheckYourAnswersPolicyAndExports);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, postcheckYourAnswersPolicyAndExports);
    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${ROUTES.INSURANCE.CHECK_YOUR_ANSWERS.TYPE_OF_POLICY_SAVE_AND_BACK}`,
      postcheckYourAnswersPolicyAndExportsSaveAndBack,
    );
  });
});
