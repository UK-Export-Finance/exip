import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as anotherCompanyGet, post as anotherCompanyPost } from '../../../../controllers/insurance/policy/another-company';
import { post as anotherCompanySaveAndBackPost } from '../../../../controllers/insurance/policy/another-company/save-and-back';
import { get as otherCompanyDetailsGet, post as otherCompanyDetailsPost } from '../../../../controllers/insurance/policy/other-company-details';
import { post as otherCompanyDetailsSaveAndBackPost } from '../../../../controllers/insurance/policy/other-company-details/save-and-back';

const {
  ANOTHER_COMPANY,
  ANOTHER_COMPANY_SAVE_AND_BACK,
  ANOTHER_COMPANY_CHANGE,
  ANOTHER_COMPANY_CHECK_AND_CHANGE,
  OTHER_COMPANY_DETAILS,
  OTHER_COMPANY_DETAILS_SAVE_AND_BACK,
  OTHER_COMPANY_DETAILS_CHANGE,
  OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE,
} = POLICY;

describe('routes/insurance/policy/another-company', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(6);
    expect(post).toHaveBeenCalledTimes(8);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ANOTHER_COMPANY}`, anotherCompanyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ANOTHER_COMPANY}`, anotherCompanyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ANOTHER_COMPANY_SAVE_AND_BACK}`, anotherCompanySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ANOTHER_COMPANY_CHANGE}`, anotherCompanyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ANOTHER_COMPANY_CHANGE}`, anotherCompanyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${ANOTHER_COMPANY_CHECK_AND_CHANGE}`, anotherCompanyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${ANOTHER_COMPANY_CHECK_AND_CHANGE}`, anotherCompanyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${OTHER_COMPANY_DETAILS}`, otherCompanyDetailsGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${OTHER_COMPANY_DETAILS}`, otherCompanyDetailsPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${OTHER_COMPANY_DETAILS_SAVE_AND_BACK}`, otherCompanyDetailsSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${OTHER_COMPANY_DETAILS_CHANGE}`, otherCompanyDetailsGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${OTHER_COMPANY_DETAILS_CHANGE}`, otherCompanyDetailsPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`, otherCompanyDetailsGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`, otherCompanyDetailsPost);
  });
});
