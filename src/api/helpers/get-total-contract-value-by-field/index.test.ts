import getTotalContractValueByField from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import totalContractValueTestHelper from '../../test-helpers/total-contract-value';
import { Context, TotalContractValue } from '../../types';

describe('helpers/get-total-contract-value-by-field', () => {
  let context: Context;
  let totalContractValue: TotalContractValue;

  const field = 'valueId';

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const totalContractValues = await context.query.TotalContractValue.findMany();

    if (totalContractValues.length) {
      await context.query.TotalContractValue.deleteMany({
        where: totalContractValues,
      });
    }

    // create a new totalContractValue
    totalContractValue = await totalContractValueTestHelper.create({ context });
  });

  it('should return a totalContractValue by ID', async () => {
    const result = (await getTotalContractValueByField(context, field, totalContractValue.valueId)) as TotalContractValue;

    expect(result.id).toEqual(totalContractValue.id);
    expect(result.value).toEqual(totalContractValue.value);
    expect(result.valueId).toEqual(totalContractValue.valueId);
  });

  describe('when a totalContractValue is not found', () => {
    it('should throw an error', async () => {
      try {
        await getTotalContractValueByField(context, field, 123456);
      } catch (err) {
        const errorMessage = 'Getting totalContractValue by field/value';

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
