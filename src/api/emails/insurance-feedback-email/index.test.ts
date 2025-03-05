import { insuranceFeedbackEmail } from '.';
import APIM from '../../integrations/APIM';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import formatDate from '../../helpers/format-date';
import mapFeedbackSatisfaction from '../../helpers/map-feedback-satisfaction';
import { mockAccount, mockInsuranceFeedback, mockSendEmailResponse, mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

describe('emails/insurance-feedback-email', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email } = mockAccount;

  const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;

  beforeAll(async () => {
    APIM.sendEmail = sendEmailSpy;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call APIM.sendEmail and return the response with all variables provided', async () => {
    APIM.sendEmail = sendEmailSpy;

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

  it('should call APIM.sendEmail and return the response with no satisfaction provided', async () => {
    APIM.sendEmail = sendEmailSpy;

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
      APIM.sendEmail = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      const response = insuranceFeedbackEmail(mockInsuranceFeedback);

      await expect(response).rejects.toThrow(`Sending insurance feedback email ${new Error(mockErrorMessage)}`);
    });
  });
});
