import getNameEmailPositionFromOwnerAndPolicy from '.';
import replaceCharacterCodesWithCharacters from '../replace-character-codes-with-characters';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { mockApplication, mockContact } from '../../test-mocks';

const {
  NAME_ON_POLICY: { NAME, SAME_NAME, OTHER_NAME, IS_SAME_AS_OWNER },
  DIFFERENT_NAME_ON_POLICY: { POSITION },
} = POLICY_FIELD_IDS;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const { owner } = mockApplication;

describe('server/helpers/get-name-email-position-from-owner-and-policy', () => {
  const firstName = replaceCharacterCodesWithCharacters(owner[FIRST_NAME]);
  const lastName = replaceCharacterCodesWithCharacters(owner[LAST_NAME]);
  const email = owner[EMAIL];
  const position = replaceCharacterCodesWithCharacters(mockContact[POSITION]);

  describe(`when ${SAME_NAME} is provided`, () => {
    it(`should return object with constructed name and email string, position and ${NAME} set to ${SAME_NAME}`, () => {
      mockContact[IS_SAME_AS_OWNER] = true;

      const result = getNameEmailPositionFromOwnerAndPolicy(owner, mockContact);

      const expected = {
        [SAME_NAME]: `${firstName} ${lastName} (${email})`,
        [POSITION]: position,
        [NAME]: SAME_NAME,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${OTHER_NAME} is provided`, () => {
    it(`should return object with constructed name and email string, position and ${NAME} set to ${OTHER_NAME}`, () => {
      mockContact[IS_SAME_AS_OWNER] = false;

      const result = getNameEmailPositionFromOwnerAndPolicy(owner, mockContact);

      const expected = {
        [SAME_NAME]: `${firstName} ${lastName} (${email})`,
        [POSITION]: position,
        [NAME]: OTHER_NAME,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_SAME_AS_OWNER} is undefined`, () => {
    it(`should return object with constructed name and email string, position and ${NAME} as undefined`, () => {
      mockContact[IS_SAME_AS_OWNER] = undefined;

      const result = getNameEmailPositionFromOwnerAndPolicy(owner, mockContact);

      const expected = {
        [SAME_NAME]: `${firstName} ${lastName} (${email})`,
        [POSITION]: position,
        [NAME]: undefined,
      };

      expect(result).toEqual(expected);
    });
  });
});
