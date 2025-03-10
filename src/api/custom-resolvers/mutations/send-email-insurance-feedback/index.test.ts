import sendEmailInsuranceFeedback from '.';
import sendEmail from '../../../emails';
import { mockInsuranceFeedbackEmail, mockSendEmailResponse, mockAccount, mockErrorMessage, mockSpyPromiseRejection } from '../../../test-mocks';
import { InsuranceFeedbackVariables } from '../../../types';

describe('custom-resolvers/send-email-insurance-feedback', () => {
  jest.mock('../../../emails');

  let sendInsuranceFeedbackEmailSpy = jest.fn();

  const variables = mockInsuranceFeedbackEmail as InsuranceFeedbackVariables;

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    jest.resetAllMocks();

    sendInsuranceFeedbackEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.insuranceFeedbackEmail = sendInsuranceFeedbackEmailSpy;
  });

  it('should call sendEmail.insuranceFeedbackEmail and return success=true', async () => {
    const result = await sendEmailInsuranceFeedback({}, variables);

    expect(sendInsuranceFeedbackEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendInsuranceFeedbackEmailSpy).toHaveBeenCalledWith(mockInsuranceFeedbackEmail);

    const expected = {
      success: true,
      emailRecipient: mockAccount.email,
    };

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.insuranceFeedbackEmail = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await sendEmailInsuranceFeedback({}, variables);
      } catch (error) {
        const expected = new Error(`Generating and sending email for insurance feedback ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
