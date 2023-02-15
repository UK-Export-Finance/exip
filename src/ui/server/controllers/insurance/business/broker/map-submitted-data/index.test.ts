import { RequestBody } from '../../../../../../types';
import { FIELD_IDS } from '../../../../../constants';
import mapSubmittedData from '.';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { USING_BROKER, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL } = EXPORTER_BUSINESS.BROKER;

describe('controllers/insurance/business/broker/map-submitted-data', () => {
  describe('when all fields are provided', () => {
    it('should return the formBody with the populated fields populated without _crsf', () => {
      const mockBody = {
        _csrf: '1234',
        [USING_BROKER]: 'Yes',
        [NAME]: 'Test',
        [ADDRESS_LINE_1]: '1',
        [ADDRESS_LINE_2]: '2',
        [TOWN]: 'London',
        [COUNTY]: 'London',
        [POSTCODE]: 'SW1A 2AA',
        [EMAIL]: 'test@test.com',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [USING_BROKER]: mockBody[USING_BROKER],
        [NAME]: mockBody[NAME],
        [ADDRESS_LINE_1]: mockBody[ADDRESS_LINE_1],
        [ADDRESS_LINE_2]: mockBody[ADDRESS_LINE_2],
        [TOWN]: mockBody[TOWN],
        [COUNTY]: mockBody[COUNTY],
        [POSTCODE]: mockBody[POSTCODE],
        [EMAIL]: mockBody[EMAIL],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when no fields are provided (all are empty strings)', () => {
    it('should return the formBody with fields as empty strings', () => {
      const mockBody = {
        _csrf: '1234',
        [USING_BROKER]: '',
        [NAME]: '',
        [ADDRESS_LINE_1]: '',
        [ADDRESS_LINE_2]: '',
        [TOWN]: '',
        [COUNTY]: '',
        [POSTCODE]: '',
        [EMAIL]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [USING_BROKER]: mockBody[USING_BROKER],
        [NAME]: mockBody[NAME],
        [ADDRESS_LINE_1]: mockBody[ADDRESS_LINE_1],
        [ADDRESS_LINE_2]: mockBody[ADDRESS_LINE_2],
        [TOWN]: mockBody[TOWN],
        [COUNTY]: mockBody[COUNTY],
        [POSTCODE]: mockBody[POSTCODE],
        [EMAIL]: mockBody[EMAIL],
      };

      expect(response).toEqual(expected);
    });
  });
});
