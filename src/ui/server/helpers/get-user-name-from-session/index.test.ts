import getUserNameFromSession from '.';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import { mockAccount } from '../../test-mocks';

const { FIRST_NAME, LAST_NAME } = ACCOUNT_FIELD_IDS;

describe('server/helpers/get-user-name-from-session', () => {
  it("should return a users's full anme", () => {
    const result = getUserNameFromSession(mockAccount);

    const expected = `${mockAccount[FIRST_NAME]} ${mockAccount[LAST_NAME]}`;

    expect(result).toEqual(expected);
  });

  describe('when there is no user session provided', () => {
    it('should return null', () => {
      const result = getUserNameFromSession();

      expect(result).toEqual(null);
    });
  });
});
