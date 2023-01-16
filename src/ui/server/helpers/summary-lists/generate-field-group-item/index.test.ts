import generateSummaryListItemData, { getSummaryListItemDataValue } from '.';
import getKeyText from '../get-key-text';
import { SummaryListItemDataInput } from '../../../../types';

describe('server/helpers/summary-lists/generate-field-group-item', () => {
  const mockField = {
    id: 'fieldA',
    title: 'Field A',
  };

  const mockSubmittedData = { fieldA: 'Field A answer' };
  const mockCustomValue = '<p>Mock html</p>';

  describe('generateSummaryListItemData', () => {
    const mockInput = {
      field: mockField,
      data: mockSubmittedData,
    } as SummaryListItemDataInput;

    it('should return an object with correct fields', () => {
      const result = generateSummaryListItemData(mockInput);

      const expected = {
        id: mockInput.field.id,
        title: getKeyText(mockInput.field),
        value: getSummaryListItemDataValue(mockInput.data, mockInput.field.id),
      };

      expect(result).toEqual(expected);
    });

    describe('when a customValue is passed', () => {
      it('should return the custom value via getSummaryListItemDataValue', () => {
        const result = generateSummaryListItemData(mockInput, mockCustomValue);

        const expected = getSummaryListItemDataValue(mockInput.data, mockInput.field.id, mockCustomValue);

        expect(result.value).toEqual(expected);
      });
    });

    describe('when a href and renderChangeLink is passed', () => {
      it('should return the field with href and renderChangeLink', () => {
        mockInput.href = '#';
        mockInput.renderChangeLink = true;

        const result = generateSummaryListItemData(mockInput);

        expect(result.href).toEqual(mockInput.href);
        expect(result.renderChangeLink).toEqual(mockInput.renderChangeLink);
      });
    });
  });

  describe('getSummaryListItemDataValue', () => {
    describe('when customValue is passed', () => {
      it('should return the customValue', () => {
        const result = getSummaryListItemDataValue(mockSubmittedData, mockField.id, mockCustomValue);

        expect(result).toEqual(mockCustomValue);
      });
    });

    describe('when no customValue is passed and the submitted data contains the field', () => {
      it('should return the value of the field in submitted data', () => {
        const result = getSummaryListItemDataValue(mockSubmittedData, mockField.id);

        const expected = mockSubmittedData[mockField.id];

        expect(result).toEqual(expected);
      });
    });

    describe('when no customValue is passed and the submitted data does NOT contain the field', () => {
      it('should return an empty dash', () => {
        const result = getSummaryListItemDataValue(mockSubmittedData, 'fieldC');

        expect(result).toEqual('-');
      });
    });
  });
});
