import isPolicyContactDataSameAsOwner from '.';
import { mockContact, mockApplication } from '../../test-mocks';

const { owner } = mockApplication;

describe('server/helpers/is-policy-contact-data-same-as-owner', () => {
  describe('when policyContact and owner are the different', () => {
    it('should return false', () => {
      const result = isPolicyContactDataSameAsOwner(owner, mockContact);

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
