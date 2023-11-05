import canSubmitApplication from '.';
import { APPLICATION } from '../../constants';
import { DATE_ONE_MINUTE_IN_THE_PAST } from '../../constants/dates';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/can-submit-application', () => {
  it('should return true', () => {
    const result = canSubmitApplication(mockApplication);

    expect(result).toEqual(true);
  });

  describe('when an application is incomplete', () => {
    const mockApplicationIncomplete = {
      ...mockApplication,
      declaration: { id: mockApplication.declaration.id },
    };

    it('should return false', () => {
      const result = canSubmitApplication(mockApplicationIncomplete);

      expect(result).toEqual(false);
    });
  });

  describe(`when an application does not have a ${APPLICATION.STATUS.IN_PROGRESS} status`, () => {
    const mockApplicationSubmitted = {
      ...mockApplication,
      status: APPLICATION.STATUS.SUBMITTED,
    };

    it('should return false', () => {
      const result = canSubmitApplication(mockApplicationSubmitted);

      expect(result).toEqual(false);
    });
  });

  describe("when the date is NOT before the application's submission deadline", () => {
    const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

    const mockApplicationDeadlinePassed = {
      ...mockApplication,
      submissionDeadline: String(oneMinuteInThePast),
    };

    it('should return false', () => {
      const result = canSubmitApplication(mockApplicationDeadlinePassed);

      expect(result).toEqual(false);
    });
  });

  describe('when an application has a submissionCount that is greater than 0', () => {
    const mockApplicationSubmitted = {
      ...mockApplication,
      submissionCount: 1,
    };

    it('should return false', () => {
      const result = canSubmitApplication(mockApplicationSubmitted);

      expect(result).toEqual(false);
    });
  });
});
