import dotenv from 'dotenv';
import { ACCOUNT } from '../../constants';
import encryptPassword from '.';

dotenv.config();

const { ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('api/helpers/encrypt-password', () => {
  const mockPassword = process.env.MOCK_ACCOUNT_PASSWORD as string;

  it('should return a salt', () => {
    const result = encryptPassword(mockPassword);

    expect(result.salt.length).toEqual(RANDOM_BYTES_SIZE * 2);
  });

  it('should return a hash', () => {
    const result = encryptPassword(mockPassword);

    expect(result.hash.length).toEqual(KEY_LENGTH * 2);
  });
});
