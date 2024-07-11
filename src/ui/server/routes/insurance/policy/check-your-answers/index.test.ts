import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../../controllers/insurance/policy/check-your-answers';

const { CHECK_YOUR_ANSWERS } = POLICY;

describe('routes/insurance/policy/check-your-answers', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledTimes(1);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);
  });
});
