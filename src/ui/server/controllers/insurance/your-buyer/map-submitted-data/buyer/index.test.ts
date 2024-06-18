import mapSubmittedData from '.';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';
import { RequestBody } from '../../../../../../types';

const { TRADED_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

describe('controllers/insurance/your-buyer/map-submitted-data/buyer', () => {
  let mockFormBody: RequestBody;

  beforeEach(() => {
    mockFormBody = {
      _csrf: 'abc',
      [TRADED_WITH_BUYER]: true,
    };
  });

  describe(`when ${TRADED_WITH_BUYER} is empty`, () => {
    it(`should remove ${TRADED_WITH_BUYER} from formBody`, () => {
      mockFormBody[TRADED_WITH_BUYER] = '';

      const response = mapSubmittedData(mockFormBody);

      expect(response).toEqual({});
    });
  });
});
