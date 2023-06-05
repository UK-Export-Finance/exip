import getPasswordHash from '.';
import { ACCOUNT } from '../../constants';
import { mockAccount } from '../../test-mocks';

const {
  ENCRYPTION: {
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
} = ACCOUNT;

describe('helpers/get-password-hash', () => {
  it('should return a hash', () => {
    const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

    const result = getPasswordHash(mockPassword, mockAccount.salt);

    expect(result.length).toEqual(KEY_LENGTH * 2);
  });
});
