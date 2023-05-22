import crypto from 'crypto';
import { ACCOUNT } from '../../constants';

const { ENCRYPTION } = ACCOUNT;

const {
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

const getPasswordHash = (password: string, salt: string) => {
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

  return hash;
};

export default getPasswordHash;
