import requiredFields from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import flattenApplicationData from '../../flatten-application-data';
import { mockApplication } from '../../../test-mocks';

const {
  MIGRATED_FROM_V1_TO_V2,
  CHECK_YOUR_ANSWERS: { ELIGIBILITY, EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT },
} = FIELD_IDS;

describe('server/helpers/required-fields/section-review', () => {
  describe(`when application.${MIGRATED_FROM_V1_TO_V2} is true`, () => {
    it(`should return array of required fields, without ${ELIGIBILITY}`, () => {
      const application = flattenApplicationData({
        ...mockApplication,
        [MIGRATED_FROM_V1_TO_V2]: true,
      });

      const result = requiredFields(application);

      const expected = [EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT];

      expect(result).toEqual(expected);
    });
  });

  describe(`when application.${MIGRATED_FROM_V1_TO_V2} is false`, () => {
    it(`should return array of required fields, with ${ELIGIBILITY}`, () => {
      const application = flattenApplicationData({
        ...mockApplication,
        [MIGRATED_FROM_V1_TO_V2]: false,
      });

      const result = requiredFields(application);

      const expected = [ELIGIBILITY, EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT];

      expect(result).toEqual(expected);
    });
  });
});
