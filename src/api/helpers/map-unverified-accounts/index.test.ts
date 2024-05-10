import mapUnverifiedAccounts from '.';
import { mockAccount } from '../../test-mocks';

describe('helpers/map-unverified-accounts', () => {
  describe('when an empty array is passed', () => {
    it('should return an empty account array', () => {
      const result = mapUnverifiedAccounts([]);

      expect(result.account).toEqual([]);
    });
    it('should return an empty accountStatus array', () => {
      const result = mapUnverifiedAccounts([]);

      expect(result.accountStatus).toEqual([]);
    });
  });

  describe('when an array is passed', () => {
    const accounts = [
      {
        ...mockAccount,
        id: '1',
      },
      {
        ...mockAccount,
        id: '2',
      },
    ];

    it('should return a populated account array', () => {
      const result = mapUnverifiedAccounts(accounts);

      const [accounts0, accounts1] = accounts;

      const expectedAccounts = [
        {
          where: { id: accounts0.id },
          data: {
            updatedAt: new Date(),
          },
        },
        {
          where: { id: accounts1.id },
          data: {
            updatedAt: new Date(),
          },
        },
      ];

      expect(result.account).toEqual(expectedAccounts);
    });

    it('should return a populated accountStatus array', () => {
      const result = mapUnverifiedAccounts(accounts);

      const [accounts0, accounts1] = accounts;

      const expectedAccountStatus = [
        {
          where: { id: accounts0.status.id },
          data: {
            isInactive: true,
            updatedAt: new Date(),
          },
        },
        {
          where: { id: accounts1.status.id },
          data: {
            isInactive: true,
            updatedAt: new Date(),
          },
        },
      ];

      expect(result.accountStatus).toEqual(expectedAccountStatus);
    });
  });
});
