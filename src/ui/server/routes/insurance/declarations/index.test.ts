import { get, post } from '../../../test-mocks/mock-router';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as confidentialityGet, post as confidentialityPost } from '../../../controllers/insurance/declarations/confidentiality';
import { get as antiBriberyGet, post as antiBriberyPost } from '../../../controllers/insurance/declarations/anti-bribery';
import { get as codeOfConductGet, post as codeOfConductPost } from '../../../controllers/insurance/declarations/anti-bribery/code-of-conduct';
import {
  get as exportingWithCodeOfConductGet,
  post as exportingWithCodeOfConductPost,
} from '../../../controllers/insurance/declarations/anti-bribery/exporting-with-code-of-conduct';
import { get as modernSlaveryGet, post as modernSlaveryPost } from '../../../controllers/insurance/declarations/modern-slavery';
import {
  get as confirmationAndAcknowledgementsGet,
  post as confirmationAndAcknowledgementsPost,
} from '../../../controllers/insurance/declarations/confirmation-and-acknowledgements';
import { post as saveAndBackPost } from '../../../controllers/insurance/declarations/save-and-back';

describe('routes/insurance/declarations', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(6);
    expect(post).toHaveBeenCalledTimes(11);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY_SAVE_AND_BACK}`, saveAndBackPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.ROOT}`, antiBriberyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.ROOT}`, antiBriberyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.ROOT_SAVE_AND_BACK}`, saveAndBackPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.CODE_OF_CONDUCT}`, codeOfConductGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.CODE_OF_CONDUCT}`, codeOfConductPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.CODE_OF_CONDUCT_SAVE_AND_BACK}`, saveAndBackPost);

    expect(get).toHaveBeenCalledWith(
      `/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.EXPORTING_WITH_CODE_OF_CONDUCT}`,
      exportingWithCodeOfConductGet,
    );

    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.EXPORTING_WITH_CODE_OF_CONDUCT}`,
      exportingWithCodeOfConductPost,
    );

    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.EXPORTING_WITH_CODE_OF_CONDUCT_SAVE_AND_BACK}`,
      saveAndBackPost,
    );

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.MODERN_SLAVERY}`, modernSlaveryGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.MODERN_SLAVERY}`, modernSlaveryPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS}`, confirmationAndAcknowledgementsGet);

    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS}`,
      confirmationAndAcknowledgementsPost,
    );

    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS_SAVE_AND_BACK}`, saveAndBackPost);
  });
});
