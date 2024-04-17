import getApplicationById from '.';
import { mockLossPayeeFinancialDetailsUk } from '../../../test-mocks/mock-application';
import { Context } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import { createFullApplication } from '../../../test-helpers/create-full-application';
import decrypt from '../../../helpers/decrypt';

describe('custom-resolvers/get-application', () => {
  let context: Context;

  jest.mock('../../../helpers/decrypt');
  const mockDecryptedValue = '123456';
  let decryptSpy = jest.fn();

  beforeAll(() => {
    context = getKeystoneContext();
  });

  let refNumber: string;

  beforeAll(async () => {
    jest.resetAllMocks();

    const application = await createFullApplication(context);

    const { id } = application;

    refNumber = id;
  });

  beforeEach(async () => {
    jest.resetAllMocks();

    decryptSpy = jest.fn(() => mockDecryptedValue);

    decrypt.decrypt = decryptSpy;
  });

  describe('when "decryptFinancialUk" is not set', () => {
    it('should return success=true and application without decryption', async () => {
      const result = await getApplicationById({}, { id: refNumber }, context);

      const { financialUk } = result.application.nominatedLossPayee;

      expect(result.success).toEqual(true);
      expect(financialUk.sortCode).toEqual(mockLossPayeeFinancialDetailsUk.sortCode);
      expect(financialUk.accountNumber).toEqual(mockLossPayeeFinancialDetailsUk.accountNumber);
    });

    it('should not call decrypt', async () => {
      await getApplicationById({}, { id: refNumber }, context);

      expect(decryptSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('when "decryptFinancialUk" is set to "true"', () => {
    it('should return success=true and application without decryption', async () => {
      const result = await getApplicationById({}, { id: refNumber, decryptFinancialUk: true }, context);

      const { financialUk } = result.application.nominatedLossPayee;

      expect(result.success).toEqual(true);
      expect(financialUk.sortCode).toEqual(mockDecryptedValue);
      expect(financialUk.accountNumber).toEqual(mockDecryptedValue);
    });

    it('should not call decrypt', async () => {
      await getApplicationById({}, { id: refNumber, decryptFinancialUk: true }, context);

      expect(decryptSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('when the application cannot be found', () => {
    it('should return success=false', async () => {
      const result = await getApplicationById({}, { id: '123' }, context);

      expect(result.success).toEqual(false);
    });
  });
});
