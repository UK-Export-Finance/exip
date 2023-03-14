import { get, post } from '../../../test-mocks/mock-router';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

import { get as confidentialityGet, post as confidentialityPost } from '../../../controllers/insurance/declarations/confidentiality';

describe('routes/insurance/declarations', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledTimes(1);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityPost);
  });
});
