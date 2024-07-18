import getExportContractById from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import exportContract from '../../test-helpers/export-contract';
import { Context, ApplicationExportContract } from '../../types';

describe('helpers/get-export-contract-by-id', () => {
  let context: Context;
  let createdExportContract: ApplicationExportContract;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdExportContract = await exportContract.create(context) as ApplicationExportContract;
  });

  it('should return an export contract by ID', async () => {
    const result = (await getExportContractById(context, createdExportContract.id));

    expect(result.id).toEqual(createdExportContract.id);
  });

  describe('when an export contract is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getExportContractById(context, invalidId);
      } catch (err) {
        const errorMessage = `Getting exportContract by ID ${invalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
