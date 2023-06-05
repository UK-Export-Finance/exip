import generateMultipleFieldHtml from '.';

describe('server/helpers/generate-multiple-field-html', () => {
  describe('generateMultipleFieldHtml()', () => {
    it('should generate html where all fields are present and remove id and __typename', () => {
      const fieldValues = {
        id: '1',
        fieldOne: 'one',
        fieldTwo: 'two',
        fieldThree: 'three',
        __typename: 'typename',
      };

      const result = generateMultipleFieldHtml(fieldValues);

      const expected = `${fieldValues.fieldOne}<br>${fieldValues.fieldTwo}<br>${fieldValues.fieldThree}<br>`;
      expect(result).toEqual(expected);
    });

    it('should generate html of the fields which are not null', () => {
      const fieldValues = {
        id: '1',
        fieldOne: 'one',
        fieldTwo: null,
        fieldThree: 'three',
        __typename: 'typename',
      };

      const result = generateMultipleFieldHtml(fieldValues);

      const expected = `${fieldValues.fieldOne}<br>${fieldValues.fieldThree}<br>`;
      expect(result).toEqual(expected);
    });
  });
});
