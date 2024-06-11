import getNominatedLossPayee from '.';
import { getKeystoneContext } from '../../../test-helpers';
import createNominatedLossPayee from '../../../test-helpers/nominated-loss-payee';
import { ApplicationNominatedLossPayee, Context } from '../../../types';

describe('api/helpers/get-populated-application/nominated-loss-payee', () => {
  let context: Context;
  let lossPayee: ApplicationNominatedLossPayee;

  beforeAll(async () => {
    context = getKeystoneContext();

    lossPayee = (await createNominatedLossPayee({ context })) as ApplicationNominatedLossPayee;
  });

  it('should return a nominated loss payee', async () => {
    const result = await getNominatedLossPayee(context, lossPayee.id);

    expect(result).toEqual(lossPayee);
  });
});
