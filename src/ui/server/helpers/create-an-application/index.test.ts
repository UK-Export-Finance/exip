import application from '.';
import { sanitiseData } from '../sanitise-data';
import mapEligibilityAnswers from '../map-eligibility-answers';
import api from '../../api';
import { mockEligibility, mockAccount, mockCreateApplicationResponse } from '../../test-mocks';

describe('helpers/create-an-application', () => {
  let createApplicationSpy = jest.fn(() => Promise.resolve(mockCreateApplicationResponse));

  beforeEach(() => {
    api.keystone.application.create = createApplicationSpy;
  });

  it('should call api.keystone.application.create with mapped and sanitised eligibility data', async () => {
    const sanitisedData = sanitiseData(mockEligibility);

    const eligibilityAnswers = mapEligibilityAnswers(sanitisedData);

    await application.create(mockEligibility, mockAccount.id);

    expect(createApplicationSpy).toHaveBeenCalledTimes(1);

    expect(createApplicationSpy).toHaveBeenCalledWith(eligibilityAnswers, mockAccount.id);
  });

  describe('when the create application API call fails', () => {
    beforeEach(() => {
      createApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));

      api.keystone.application.create = createApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await application.create(mockEligibility, mockAccount.id);
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error creating an application for user')).toBeTruthy();
        expect(errorString.includes(mockAccount.id)).toBeTruthy();
      }
    });
  });
});