import getTotalContractValuedById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import totalContractValue from '../../test-helpers/total-contract-value';
import { Context, TotalContractValue } from '../../types';

describe('helpers/get-total-contract-value-by-id', () => {
  let context: Context;
  let createdTotalContractValue: TotalContractValue;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdTotalContractValue = (await totalContractValue.create(context)) as TotalContractValue;
  });

  it('should return a total contract value by ID', async () => {
    const result = await getTotalContractValuedById(context, createdTotalContractValue.id);

    expect(result.id).toEqual(createdTotalContractValue.id);
  });

  describe('when a total contract value is not found', () => {
    it('should throw an error', async () => {
      try {
        await getTotalContractValuedById(context, mockInvalidId);
      } catch (err) {
        const errorMessage = `Getting totalContractValue by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
