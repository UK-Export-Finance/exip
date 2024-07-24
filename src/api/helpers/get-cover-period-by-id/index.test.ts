import getCoverPeriodById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import coverPeriod from '../../test-helpers/cover-period';
import { Context, CoverPeriod } from '../../types';

describe('helpers/get-cover-period-by-id', () => {
  let context: Context;
  let createdCoverPeriod: CoverPeriod;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdCoverPeriod = (await coverPeriod.create(context)) as CoverPeriod;
  });

  it('should return a cover period by ID', async () => {
    const result = await getCoverPeriodById(context, createdCoverPeriod.id);

    expect(result.id).toEqual(createdCoverPeriod.id);
  });

  describe('when a cover period is not found', () => {
    it('should throw an error', async () => {
      try {
        await getCoverPeriodById(context, mockInvalidId);
      } catch (err) {
        const errorMessage = `Getting coverPeriod by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
