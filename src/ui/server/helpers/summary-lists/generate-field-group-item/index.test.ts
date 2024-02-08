import generateSummaryListItemData, { getSummaryListItemDataValue } from '.';
import getKeyText from '../get-key-text';
import { DEFAULT } from '../../../content-strings';
import { SummaryListItemDataInput } from '../../../../types';

describe('server/helpers/summary-lists/generate-field-group-item', () => {
  const mockField = {
    id: 'fieldA',
    title: 'Field A',
  };

  type submittedData = {
    fieldA: string | number;
  };

  let mockSubmittedData = { fieldA: 'Field A answer' } as submittedData;
  const mockCustomValue = '<p>Mock html</p>';

  describe('generateSummaryListItemData', () => {
    let mockInput = {
      field: mockField,
      data: mockSubmittedData,
    } as SummaryListItemDataInput;

    it('should return an object with correct fields', () => {
      const result = generateSummaryListItemData(mockInput);

      const expected = {
        id: mockInput.field.id,
        title: getKeyText(mockInput.field),
        value: getSummaryListItemDataValue(mockInput.field.id, mockInput.data),
      };

      expect(result).toEqual(expected);
    });

    describe('when the number 0 is passed', () => {
      it('should return an object with correct fields', () => {
        mockSubmittedData = { fieldA: 0 };

        const result = generateSummaryListItemData(mockInput);

        const expected = getSummaryListItemDataValue(mockInput.field.id, mockInput.data);

        expect(result.value).toEqual(expected);
      });
    });

    describe('when a customValue is passed', () => {
      it('should return the custom value via getSummaryListItemDataValue', () => {
        const result = generateSummaryListItemData(mockInput, mockCustomValue);

        const expected = getSummaryListItemDataValue(mockInput.field.id, mockInput.data, mockCustomValue);

        expect(result.value).toEqual(expected);
      });
    });

    describe('when a href is passed', () => {
      beforeEach(() => {
        mockInput.href = '#';
        mockInput.data = {};
      });

      describe(`when the passed value is ${DEFAULT.EMPTY}`, () => {
        it('should return the field with href and renderAddLink', () => {
          mockInput.value = DEFAULT.EMPTY;

          const result = generateSummaryListItemData(mockInput);

          expect(result.href).toEqual(mockInput.href);
          expect(result.renderAddLink).toEqual(true);
          expect(result.renderChangeLink).toBeUndefined();
        });
      });

      describe('when renderChangeLink is passed', () => {
        it('should return the field with href and renderChangeLink', () => {
          mockInput = {
            field: mockField,
            data: mockSubmittedData,
            href: '#',
            renderChangeLink: true,
          };

          const result = generateSummaryListItemData(mockInput);

          expect(result.href).toEqual(mockInput.href);
          expect(result.renderChangeLink).toEqual(mockInput.renderChangeLink);
        });
      });
    });
  });

  describe('getSummaryListItemDataValue', () => {
    describe('when customValue is passed', () => {
      it('should return the customValue', () => {
        const result = getSummaryListItemDataValue(mockField.id, mockSubmittedData, mockCustomValue);

        expect(result).toEqual(mockCustomValue);
      });
    });

    describe('when no customValue is passed and the submitted data contains the field', () => {
      it('should return the value of the field in submitted data', () => {
        mockSubmittedData = { fieldA: 'Field A answer' };

        const result = getSummaryListItemDataValue(mockField.id, mockSubmittedData);

        const expected = mockSubmittedData[mockField.id];

        expect(result).toEqual(expected);
      });
    });

    describe('when no customValue is passed and the submitted data does NOT contain the field', () => {
      it('should return an empty dash', () => {
        const result = getSummaryListItemDataValue('fieldC', mockSubmittedData);

        expect(result).toEqual(DEFAULT.EMPTY);
      });
    });
  });
});
