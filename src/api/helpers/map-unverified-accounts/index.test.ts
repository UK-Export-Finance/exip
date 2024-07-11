import mapUnverifiedAccounts from '.';
import { mockAccount } from '../../test-mocks';

describe('helpers/map-unverified-accounts', () => {
  describe('when an empty array is passed', () => {
    it('should return empty arrays', () => {
      const result = mapUnverifiedAccounts([]);

      expect(result.account).toEqual([]);
      expect(result.accountStatus).toEqual([]);
    });
  });

  describe('when a populated array is passed', () => {
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

    const [accounts0, accounts1] = accounts;

    it('should return a mapped account array', () => {
      const result = mapUnverifiedAccounts(accounts);

      expect(result.account[0].where).toEqual({ id: accounts0.id });
      expect(result.account[0].data.updatedAt).toBeDefined();
      expect(result.account[0].data.verificationHash).toEqual('');
      expect(result.account[0].data.verificationExpiry).toBeNull();

      expect(result.account[1].where).toEqual({ id: accounts1.id });
      expect(result.account[1].data.updatedAt).toBeDefined();
      expect(result.account[1].data.verificationHash).toEqual('');
      expect(result.account[1].data.verificationExpiry).toBeNull();
    });

    it('should return a mapped accountStatus array', () => {
      const result = mapUnverifiedAccounts(accounts);

      expect(result.accountStatus[0].where).toEqual({ id: accounts0.status.id });
      expect(result.accountStatus[0].data.isInactive).toEqual(true);
      expect(result.accountStatus[0].data.updatedAt).toBeDefined();

      expect(result.accountStatus[1].where).toEqual({ id: accounts1.status.id });
      expect(result.accountStatus[1].data.isInactive).toEqual(true);
      expect(result.accountStatus[1].data.updatedAt).toBeDefined();
    });
  });
});
