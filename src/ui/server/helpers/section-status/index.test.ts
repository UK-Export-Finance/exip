import sectionStatus from '.';
import { DEFAULT, TASKS } from '../../content-strings';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/section-status', () => {
  describe('when the section is in progress (does not have all required fields provided)', () => {
    it(`should return ${TASKS.STATUS.IN_PROGRESS}`, () => {
      const mockFields = ['a', 'b', INSURANCE_FIELD_IDS.POLICY_AND_EXPORTS.POLICY_TYPE];

      const result = sectionStatus(mockFields, mockApplication);

      expect(result).toEqual(TASKS.STATUS.IN_PROGRESS);
    });
  });

  describe('when the section is completed (has all required fields provided)', () => {
    it(`should return ${TASKS.STATUS.COMPLETED}`, () => {
      const mockFields = [INSURANCE_FIELD_IDS.POLICY_AND_EXPORTS.POLICY_TYPE];

      const result = sectionStatus(mockFields, mockApplication);

      expect(result).toEqual(TASKS.STATUS.COMPLETED);
    });
  });

  describe('when the section is not in progress or completed (required fields and provided fields are not compatible)', () => {
    it(`should return ${DEFAULT.EMPTY}`, () => {
      const mockFields = ['a'];

      const result = sectionStatus(mockFields, mockApplication);

      expect(result).toEqual(DEFAULT.EMPTY);
    });
  });
});

// DEFAULT
