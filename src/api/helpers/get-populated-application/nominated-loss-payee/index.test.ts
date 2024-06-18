import getNominatedLossPayee from '.';
import decryptNominatedLossPayee from '../../decrypt-nominated-loss-payee';
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

  describe('when decryptFinancialUk is provided', () => {
    it('should return a nominated loss payee with decrypted data', async () => {
      const decryptFinancialUk = true;
      const decryptFinancialInternational = false;

      const result = await getNominatedLossPayee(context, lossPayee.id, decryptFinancialUk, decryptFinancialInternational);

      const decrypted = decryptNominatedLossPayee(lossPayee, decryptFinancialUk, decryptFinancialInternational);

      const expected = {
        ...lossPayee,
        ...decrypted,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when decryptFinancialInternational is provided', () => {
    it('should return a nominated loss payee with decrypted data', async () => {
      const decryptFinancialUk = false;
      const decryptFinancialInternational = true;

      const result = await getNominatedLossPayee(context, lossPayee.id, decryptFinancialUk, decryptFinancialInternational);

      const decrypted = decryptNominatedLossPayee(lossPayee, decryptFinancialUk, decryptFinancialInternational);

      const expected = {
        ...lossPayee,
        ...decrypted,
      };

      expect(result).toEqual(expected);
    });
  });
});
