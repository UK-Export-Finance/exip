import requiredFields, { getAntiBriberyCodeOfConductTasks } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { mockApplication } from '../../../test-mocks';

const { DECLARATIONS } = FIELD_IDS;

const {
  AGREE_CONFIDENTIALITY,
  AGREE_ANTI_BRIBERY,
  HAS_ANTI_BRIBERY_CODE_OF_CONDUCT,
  WILL_EXPORT_WITH_CODE_OF_CONDUCT,
  AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
  AGREE_HOW_YOUR_DATA_WILL_BE_USED,
} = DECLARATIONS;

describe('server/helpers/required-fields/declarations', () => {
  describe('getAntiBriberyCodeOfConductTasks', () => {
    describe('when hasAntiBriberyCodeOfConduct is true', () => {
      it('should return multiple field ids in an array', () => {
        const result = getAntiBriberyCodeOfConductTasks(true);

        const expected = [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT, WILL_EXPORT_WITH_CODE_OF_CONDUCT];

        expect(result).toEqual(expected);
      });
    });

    describe('when hasAntiBriberyCodeOfConduct is false', () => {
      it('should return an empty array', () => {
        const result = getAntiBriberyCodeOfConductTasks(false);

        expect(result).toEqual([]);
      });
    });

    describe('when hasAntiBriberyCodeOfConduct is null', () => {
      it(`should return an array with ${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT} field ID`, () => {
        const result = getAntiBriberyCodeOfConductTasks(null);

        const expected = [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];

        expect(result).toEqual(expected);
      });
    });

    describe('when hasAntiBriberyCodeOfConduct is not provided/submitted', () => {
      it(`should return an array with ${HAS_ANTI_BRIBERY_CODE_OF_CONDUCT} field ID`, () => {
        const result = getAntiBriberyCodeOfConductTasks();

        const expected = [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const hasAntiBriberyCodeOfConduct = mockApplication.declaration[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];

      const result = requiredFields(hasAntiBriberyCodeOfConduct);

      const expected = [
        AGREE_CONFIDENTIALITY,
        AGREE_ANTI_BRIBERY,
        AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
        AGREE_HOW_YOUR_DATA_WILL_BE_USED,
        ...getAntiBriberyCodeOfConductTasks(hasAntiBriberyCodeOfConduct),
      ];

      expect(result).toEqual(expected);
    });
  });
});
