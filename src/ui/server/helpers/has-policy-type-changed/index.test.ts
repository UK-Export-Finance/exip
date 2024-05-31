import hasPolicyTypeChanged from '.';

describe('server/helpers/has policy-type-changed', () => {
  describe('when formPolicyType and applicationPolicyType are provided', () => {
    describe('when both values match', () => {
      it('should return false', () => {
        const result = hasPolicyTypeChanged('a', 'a');

        expect(result).toEqual(false);
      });
    });

    describe('when the values do NOT match', () => {
      it('should return true', () => {
        const result = hasPolicyTypeChanged('a', 'b');

        expect(result).toEqual(true);
      });
    });
  });

  describe('when formPolicyType and applicationPolicyType are undefined', () => {
    it('should return false', () => {
      const result = hasPolicyTypeChanged();

      expect(result).toEqual(false);
    });
  });
});
