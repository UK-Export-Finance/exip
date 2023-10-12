import isPolicyContactDataSameAsOwner from '.';
import { mockContact, mockApplication } from '../../test-mocks';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const { owner } = mockApplication;

describe('server/helpers/is-policy-contact-data-same-as-owner', () => {
  describe('when policyContact and owner are different', () => {
    it('should return false', () => {
      const result = isPolicyContactDataSameAsOwner(owner, mockContact);

      expect(result).toEqual(false);
    });
  });

  describe(`when policyContact and owner's ${FIRST_NAME} are different`, () => {
    const differentFirstName = {
      ...owner,
      ...mockContact,
    };

    differentFirstName[FIRST_NAME] = 'different';

    it('should return false', () => {
      const result = isPolicyContactDataSameAsOwner(differentFirstName, mockContact);

      expect(result).toEqual(false);
    });
  });

  describe(`when policyContact and owner's ${LAST_NAME} are different`, () => {
    const differentLastName = {
      ...owner,
      ...mockContact,
    };

    differentLastName[LAST_NAME] = 'different';

    it('should return false', () => {
      const result = isPolicyContactDataSameAsOwner(differentLastName, mockContact);

      expect(result).toEqual(false);
    });
  });

  describe(`when policyContact and owner's ${EMAIL} are different`, () => {
    const differentEmail = {
      ...owner,
      ...mockContact,
    };

    differentEmail[EMAIL] = 'different';

    it('should return false', () => {
      const result = isPolicyContactDataSameAsOwner(differentEmail, mockContact);

      expect(result).toEqual(false);
    });
  });

  describe('when policyContact and owner are the same', () => {
    const sameOwner = {
      ...owner,
      ...mockContact,
    };

    it('should return true', () => {
      const result = isPolicyContactDataSameAsOwner(sameOwner, mockContact);

      expect(result).toEqual(true);
    });
  });

  describe('when strings for both are undefined', () => {
    const emptyContact = { id: '123' };

    const noOwner = mockApplication;

    beforeEach(() => {
      noOwner.owner = { id: '123' };
    });

    it('should return false', () => {
      const result = isPolicyContactDataSameAsOwner(noOwner.owner, emptyContact);

      expect(result).toEqual(false);
    });
  });
});
