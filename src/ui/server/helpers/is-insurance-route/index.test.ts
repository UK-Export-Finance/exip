import isInsuranceRoute from '.';
import { INSURANCE_ROOT } from '../../constants/routes/insurance';

describe('helpers/is-insurance-route', () => {
  it('should return true if url is undefined', () => {
    const response = isInsuranceRoute();

    expect(response).toEqual(true);
  });

  it('should return true if contains insurance', () => {
    const url = `url${INSURANCE_ROOT}/test`;

    const response = isInsuranceRoute(url);

    expect(response).toEqual(true);
  });

  it('should return false if does NOT contain insurance', () => {
    const url = 'url/test';

    const response = isInsuranceRoute(url);

    expect(response).toEqual(false);
  });

  it('should return false if url does NOT have any "/" in it', () => {
    const url = 'url';

    const response = isInsuranceRoute(url);

    expect(response).toEqual(false);
  });
});
