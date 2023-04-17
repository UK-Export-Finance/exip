import canSubmitApplication from '.';
import { APPLICATION } from '../../constants';
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

  describe(`when an application does not have a ${APPLICATION.STATUS.DRAFT} status`, () => {
    const mockApplicationNotDraft = {
      ...mockApplication,
      status: APPLICATION.STATUS.SUBMITTED,
    };

    it('should return false', () => {
      const result = canSubmitApplication(mockApplicationNotDraft);

      expect(result).toEqual(false);
    });
  });

  describe("when the date is NOT before the application's submission deadline", () => {
    const now = new Date();

    // 1 minute ago
    const milliseconds = 300000;
    const oneMinuteAgo = new Date(now.setMilliseconds(-milliseconds)).toISOString();

    const mockApplicationDeadlinePassed = {
      ...mockApplication,
      submissionDeadline: oneMinuteAgo,
    };

    it('should return false', () => {
      const result = canSubmitApplication(mockApplicationDeadlinePassed);

      expect(result).toEqual(false);
    });
  });
});
