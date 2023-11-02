import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import { ACCOUNT } from '../../constants';

const {
  ENCRYPTION: { RANDOM_BYTES_SIZE, STRING_TYPE },
  JWT: {
    KEY: { SIGNATURE, ENCODING, STRING_ENCODING },
    TOKEN: { EXPIRY, ALGORITHM },
  },
} = ACCOUNT;

const PRIV_KEY = Buffer.from(SIGNATURE, ENCODING).toString(STRING_ENCODING);

/**
 * createJWT
 * Generate a JWT
 * @returns {Object} JWT token
 */
const createJWT = (accountId: string) => {
  const sessionIdentifier = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

  const expiresIn = EXPIRY;

  const payload = {
    sub: accountId,
    sessionIdentifier,
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: ALGORITHM });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
    sessionIdentifier,
  };
};

const create = {
  JWT: createJWT,
};

export default create;
