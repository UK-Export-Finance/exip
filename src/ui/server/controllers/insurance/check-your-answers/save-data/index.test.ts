import save from '.';
import api from '../../../../api';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { FIELD_IDS } from '../../../../constants';
import { mockApplication } from '../../../../test-mocks';

const {
  CHECK_YOUR_ANSWERS: { POLICY },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/check-your-answers/save-data', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    [POLICY]: 'true',
  };

  beforeEach(() => {
    api.keystone.application.update.sectionReview = updateApplicationSpy;
  });

  it('should return the API response', async () => {
    const result = await save.sectionReview(mockApplication, mockFormBody);

    expect(result).toEqual(mockUpdateApplicationResponse);
  });

  it('should call api.keystone.application.update.sectionReview with sectionReview ID and sanitised data', async () => {
    await save.sectionReview(mockApplication, mockFormBody);

    expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

    const expectedSanitisedData = sanitiseData(mockFormBody);
    expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.sectionReview.id, expectedSanitisedData);
  });

  it('should return the API response', async () => {
    const result = await save.sectionReview(mockApplication, mockFormBody);

    expect(result).toEqual(mockUpdateApplicationResponse);
  });

  describe('when there is an error calling the API', () => {
    beforeAll(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.declarations = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.sectionReview(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error("Updating application's section review");
        expect(err).toEqual(expected);
      }
    });
  });
});
