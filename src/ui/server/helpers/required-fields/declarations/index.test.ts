import requiredFields, { getAntiBriberyCodeOfConductTasks, getModernSlaveryTasks } from '.';
import DECLARATIONS_FIELD_IDS from '../../../constants/field-ids/insurance/declarations';
import { mockApplication } from '../../../test-mocks';

const {
  AGREE_CONFIDENTIALITY,
  AGREE_ANTI_BRIBERY,
  HAS_ANTI_BRIBERY_CODE_OF_CONDUCT,
  WILL_EXPORT_WITH_CODE_OF_CONDUCT,
  AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS,
    HAS_NO_OFFENSES_OR_INVESTIGATIONS,
    IS_NOT_AWARE_OF_EXISTING_SLAVERY,
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const { declaration } = mockApplication;

describe('server/helpers/required-fields/declarations', () => {
  describe('getAntiBriberyCodeOfConductTasks', () => {
    describe(`when ${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT} is true`, () => {
      it('should return an array of field IDs', () => {
        const result = getAntiBriberyCodeOfConductTasks(true);

        const expected = [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT, WILL_EXPORT_WITH_CODE_OF_CONDUCT];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT} is false`, () => {
      it('should return an empty array', () => {
        const result = getAntiBriberyCodeOfConductTasks(false);

        expect(result).toEqual([]);
      });
    });

    describe(`when ${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT} is null`, () => {
      it(`should return an array with ${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT}`, () => {
        const result = getAntiBriberyCodeOfConductTasks(null);

        const expected = [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT} is not provided/submitted`, () => {
      it(`should return an array with ${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT}`, () => {
        const result = getAntiBriberyCodeOfConductTasks();

        const expected = [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('getModernSlaveryTasks', () => {
    const mockBaseAnswers = {
      ...declaration,
      [WILL_ADHERE_TO_ALL_REQUIREMENTS]: true,
      [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: true,
      [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: true,
    };

    const expectedGenericIds = [WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY];

    describe('when all answers are true', () => {
      it('should return an array of field IDs', () => {
        const result = getModernSlaveryTasks(mockBaseAnswers);

        expect(result).toEqual(expectedGenericIds);
      });
    });

    describe(`when ${WILL_ADHERE_TO_ALL_REQUIREMENTS} is false`, () => {
      it(`should return an array with ${CANNOT_ADHERE_TO_ALL_REQUIREMENTS}`, () => {
        const mockAnswers = {
          ...mockBaseAnswers,
          [WILL_ADHERE_TO_ALL_REQUIREMENTS]: false,
        };

        const result = getModernSlaveryTasks(mockAnswers);

        const expected = [...expectedGenericIds, CANNOT_ADHERE_TO_ALL_REQUIREMENTS];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${HAS_NO_OFFENSES_OR_INVESTIGATIONS} is false`, () => {
      it(`should return an array with ${OFFENSES_OR_INVESTIGATIONS}`, () => {
        const mockAnswers = {
          ...mockBaseAnswers,
          [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: false,
        };

        const result = getModernSlaveryTasks(mockAnswers);

        const expected = [...expectedGenericIds, OFFENSES_OR_INVESTIGATIONS];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${IS_NOT_AWARE_OF_EXISTING_SLAVERY} is false`, () => {
      it(`should return an array with ${AWARE_OF_EXISTING_SLAVERY}`, () => {
        const mockAnswers = {
          ...mockBaseAnswers,
          [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: false,
        };

        const result = getModernSlaveryTasks(mockAnswers);

        const expected = [...expectedGenericIds, AWARE_OF_EXISTING_SLAVERY];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const hasAntiBriberyCodeOfConduct = declaration[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];

      const result = requiredFields(declaration);

      const expected = [
        AGREE_CONFIDENTIALITY,
        AGREE_ANTI_BRIBERY,
        AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
        ...getAntiBriberyCodeOfConductTasks(hasAntiBriberyCodeOfConduct),
        ...getModernSlaveryTasks(declaration.modernSlavery),
      ];

      expect(result).toEqual(expected);
    });
  });
});
