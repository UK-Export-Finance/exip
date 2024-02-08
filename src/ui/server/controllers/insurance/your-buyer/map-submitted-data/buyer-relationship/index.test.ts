import mapSubmittedData from '.';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';
import { RequestBody } from '../../../../../../types';
import { mockBuyerRelationship } from '../../../../../test-mocks/mock-buyer';

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = YOUR_BUYER_FIELD_IDS;

describe('controllers/insurance/your-buyer/map-submitted-data/buyer-relationship', () => {
  let mockFormBody: RequestBody;

  beforeEach(() => {
    mockFormBody = {
      _csrf: 'abc',
      ...mockBuyerRelationship,
      other: 'test',
    };
  });

  describe(`when ${CONNECTION_WITH_BUYER} is true and ${CONNECTION_WITH_BUYER_DESCRIPTION} is populated`, () => {
    it('should return mockFormBody without _csrf', () => {
      const response = mapSubmittedData(mockFormBody);

      const { _csrf, ...expectedBody } = mockFormBody;

      expect(response).toEqual(expectedBody);
    });
  });

  describe(`when ${CONNECTION_WITH_BUYER} is false and ${CONNECTION_WITH_BUYER_DESCRIPTION} is populated`, () => {
    it(`should change ${CONNECTION_WITH_BUYER_DESCRIPTION} to be an empty string`, () => {
      mockFormBody[CONNECTION_WITH_BUYER] = 'false';

      const response = mapSubmittedData(mockFormBody);

      const { _csrf, ...expectedBody } = mockFormBody;

      const expected = {
        ...expectedBody,
        [CONNECTION_WITH_BUYER_DESCRIPTION]: '',
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${CONNECTION_WITH_BUYER} is false and ${CONNECTION_WITH_BUYER_DESCRIPTION} is null`, () => {
    it(`should change ${CONNECTION_WITH_BUYER_DESCRIPTION} to be an empty string`, () => {
      mockFormBody[CONNECTION_WITH_BUYER] = 'false';
      mockFormBody[CONNECTION_WITH_BUYER_DESCRIPTION] = null;

      const response = mapSubmittedData(mockFormBody);

      const { _csrf, ...expectedBody } = mockFormBody;

      const expected = {
        ...expectedBody,
        [CONNECTION_WITH_BUYER_DESCRIPTION]: '',
      };

      expect(response).toEqual(expected);
    });
  });
});
