import dotenv from 'dotenv';
import generateAccountVerificationUrl from '.';

import { APPLICATION } from '../../constants';

dotenv.config();

const applicationUrl = String(process.env.APPLICATION_URL);

describe('api/helpers/generate-application-url', () => {
  it('should return the applications url', () => {
    const referenceNumber = 12345;

    const result = generateAccountVerificationUrl(referenceNumber);

    const expected = `${applicationUrl}/${referenceNumber}${APPLICATION.ALL_SECTIONS_ROUTE}`;

    expect(result).toEqual(expected);
  });
});
