import { ACCOUNT } from '../../constants';
import create from '.';
import { mockAccount } from '../../test-mocks';

const {
  ENCRYPTION: { RANDOM_BYTES_SIZE },
  JWT: {
    TOKEN: { EXPIRY },
  },
} = ACCOUNT;

describe('api/helpers/create-jwt', () => {
  const result = create.JWT(mockAccount.id);

  it('should return a token', () => {
    expect(result.token.length).toEqual(891);
  });

  it('should return a sessionIdentifier', () => {
    expect(result.sessionIdentifier.length).toEqual(RANDOM_BYTES_SIZE * 2);
  });

  it('should return an expiry date', () => {
    expect(result.expires).toEqual(EXPIRY);
  });
});
