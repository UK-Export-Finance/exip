import DECLARATIONS_INDEXES, { DEFAULT_INDEXES } from '.';
import DECLARATIONS_FIELD_IDS from '../../../field-ids/insurance/declarations';
import { mockApplication } from '../../../../test-mocks';

const {
  MODERN_SLAVERY: {
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

describe('api/constants/XLSX-CONFIG/INDEXES/DECLARATIONS', () => {
  describe('DEFAULT_INDEXES', () => {
    it('should return an object with indexes', () => {
      const expected = {
        CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 0,
        OFFENSES_OR_INVESTIGATIONS: 0,
        AWARE_OF_EXISTING_SLAVERY: 0,
      };

      expect(DEFAULT_INDEXES()).toEqual(expected);
    });
  });

  describe('DECLARATIONS_INDEXES', () => {
    const mockPopulatedModernSlavery = {
      ...mockApplication.declaration.modernSlavery,
      [CANNOT_ADHERE_TO_ALL_REQUIREMENTS]: 'mock',
      [OFFENSES_OR_INVESTIGATIONS]: 'mock',
      [AWARE_OF_EXISTING_SLAVERY]: 'mock',
    };

    describe(`when ${CANNOT_ADHERE_TO_ALL_REQUIREMENTS}, ${OFFENSES_OR_INVESTIGATIONS} and ${AWARE_OF_EXISTING_SLAVERY} are populated`, () => {
      it('should return an object with indexes', () => {
        const mockModernSlavery = mockPopulatedModernSlavery;

        const result = DECLARATIONS_INDEXES(mockModernSlavery);

        const expected = {
          CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 7,
          OFFENSES_OR_INVESTIGATIONS: 10,
          AWARE_OF_EXISTING_SLAVERY: 11,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${CANNOT_ADHERE_TO_ALL_REQUIREMENTS} and ${OFFENSES_OR_INVESTIGATIONS} are populated`, () => {
      it('should return an object with indexes', () => {
        const mockModernSlavery = {
          ...mockPopulatedModernSlavery,
          [AWARE_OF_EXISTING_SLAVERY]: '',
        };

        const result = DECLARATIONS_INDEXES(mockModernSlavery);

        const expected = {
          ...DEFAULT_INDEXES(),
          CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 7,
          OFFENSES_OR_INVESTIGATIONS: 9,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${CANNOT_ADHERE_TO_ALL_REQUIREMENTS} and ${AWARE_OF_EXISTING_SLAVERY} are populated`, () => {
      it('should return an object with indexes', () => {
        const mockModernSlavery = {
          ...mockPopulatedModernSlavery,
          [OFFENSES_OR_INVESTIGATIONS]: '',
        };

        const result = DECLARATIONS_INDEXES(mockModernSlavery);

        const expected = {
          ...DEFAULT_INDEXES(),
          CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 7,
          AWARE_OF_EXISTING_SLAVERY: 10,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${OFFENSES_OR_INVESTIGATIONS} and ${AWARE_OF_EXISTING_SLAVERY} are populated`, () => {
      it('should return an object with indexes', () => {
        const mockModernSlavery = {
          ...mockPopulatedModernSlavery,
          [CANNOT_ADHERE_TO_ALL_REQUIREMENTS]: '',
        };

        const result = DECLARATIONS_INDEXES(mockModernSlavery);

        const expected = {
          ...DEFAULT_INDEXES(),
          OFFENSES_OR_INVESTIGATIONS: 9,
          AWARE_OF_EXISTING_SLAVERY: 10,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${OFFENSES_OR_INVESTIGATIONS} and ${CANNOT_ADHERE_TO_ALL_REQUIREMENTS} are populated`, () => {
      it('should return an object with indexes', () => {
        const mockModernSlavery = {
          ...mockPopulatedModernSlavery,
          [AWARE_OF_EXISTING_SLAVERY]: '',
        };

        const result = DECLARATIONS_INDEXES(mockModernSlavery);

        const expected = {
          ...DEFAULT_INDEXES(),
          CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 7,
          OFFENSES_OR_INVESTIGATIONS: 9,
        };

        expect(result).toEqual(expected);
      });
    });
  });
});
