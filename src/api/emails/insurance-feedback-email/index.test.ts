import { insuranceFeedbackEmail } from '.';
import notify from '../../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import formatDate from '../../helpers/format-date';
import mapFeedbackSatisfaction from '../../helpers/map-feedback-satisfaction';
import { mockAccount, mockInsuranceFeedback, mockSendEmailResponse } from '../../test-mocks';

describe('emails/insurance-feedback-email', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email } = mockAccount;

  const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;

  const mockErrorMessage = 'Mock error';

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should call notify.sendEmail and return the response with all variables provided', async () => {
    notify.sendEmail = sendEmailSpy;

    const emailVariables = {
      ...mockInsuranceFeedback,
      createdAt: new Date(),
    };

    const result = await insuranceFeedbackEmail(emailVariables);

    const resultVariables = {
      ...emailVariables,
      date: formatDate(new Date()),
      time: formatDate(new Date(), 'HH:mm:ss'),
      satisfaction: mapFeedbackSatisfaction(mockInsuranceFeedback.satisfaction),
    };

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, resultVariables);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });

  test('it should call notify.sendEmail and return the response with no satisfaction provided', async () => {
    notify.sendEmail = sendEmailSpy;

    const { satisfaction, ...mockInsuranceFeedbackNoSatisfaction } = mockInsuranceFeedback;

    const emailVariables = {
      ...mockInsuranceFeedbackNoSatisfaction,
      createdAt: new Date(),
    };

    const result = await insuranceFeedbackEmail(emailVariables);

    const resultVariables = {
      ...emailVariables,
      date: formatDate(new Date()),
      time: formatDate(new Date(), 'HH:mm:ss'),
    };

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, resultVariables);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeAll(async () => {
      notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
    });

    test('should throw an error', async () => {
      try {
        await insuranceFeedbackEmail(mockInsuranceFeedback);
      } catch (err) {
        const expected = new Error(`Sending insurance feedback email Error: Sending email ${mockErrorMessage}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
