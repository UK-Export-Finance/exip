import constructPayload from '.';

describe('helpers/construct-payload', () => {
  const FIELDS_IDS = ['a', 'b', 'c'];

  describe('when fieldIds are empty', () => {
    it('should return an empty payload', () => {
      const result = constructPayload({ a: 'a' }, []);

      expect(result).toEqual({});
    });
  });

  const requestBody = {
    a: 'A test',
    b: 'B test',
    c: 'C test',
  };

  describe('when request body contains additional fields as compared to fieldIds', () => {
    it('should return a populated object not including additional field', () => {
      const body = {
        ...requestBody,
        injection: 1,
      };

      const result = constructPayload(body, FIELDS_IDS);

      expect(result).toEqual(requestBody);
    });
  });

  describe('when request body contains the same fieldIds as provided fieldIds', () => {
    it('should return a populated object', () => {
      const result = constructPayload(requestBody, FIELDS_IDS);

      expect(result).toEqual(requestBody);
    });
  });

  describe('when request body does not contain all fieldIds in provided fieldIds', () => {
    it('should return a populated object with missing fieldIds as empty string', () => {
      const body = {
        ...requestBody,
        c: null,
      };

      const result = constructPayload(body, FIELDS_IDS);

      const expected = {
        ...requestBody,
        c: '',
      };

      expect(result).toEqual(expected);
    });
  });
});
