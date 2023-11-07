import getCoverPeriodValueByField from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import coverPeriodTestHelper from '../../test-helpers/cover-period';
import { Context, CoverPeriod } from '../../types';

describe('helpers/get-cover-period-value-by-field', () => {
  let context: Context;
  let coverPeriod: CoverPeriod;

  const field = 'valueId';

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const coverPeriods = await context.query.CoverPeriod.findMany();

    if (coverPeriods.length) {
      await context.query.CoverPeriod.deleteMany({
        where: coverPeriods,
      });
    }

    // create a new coverPeriod
    coverPeriod = await coverPeriodTestHelper.create({ context });
  });

  it('should return a coverPeriod by ID', async () => {
    const result = (await getCoverPeriodValueByField(context, field, coverPeriod.valueId)) as CoverPeriod;

    expect(result.id).toEqual(coverPeriod.id);
    expect(result.value).toEqual(coverPeriod.value);
    expect(result.valueId).toEqual(coverPeriod.valueId);
  });

  describe('when a coverPeriod is not found', () => {
    it('should throw an error', async () => {
      try {
        await getCoverPeriodValueByField(context, field, 123456);
      } catch (err) {
        const errorMessage = 'Getting coverPeriod by field/value';

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
