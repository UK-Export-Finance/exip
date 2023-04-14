import dotenv from 'dotenv';
import sendEmailInsuranceFeedback from './send-email-insurance-feedback';
import sendEmail from '../emails';
import { mockInsuranceFeedback, mockSendEmailResponse, mockAccount } from '../test-mocks';
import { InsuranceFeedbackVariables } from '../types';

dotenv.config();

describe('custom-resolvers/send-email-insurance-feedback', () => {
  let variables: InsuranceFeedbackVariables;

  jest.mock('../emails');

  let sendInsuranceFeedbackEmailSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    variables = {
      ...mockInsuranceFeedback,
    };

    jest.resetAllMocks();

    sendInsuranceFeedbackEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.insuranceFeedbackEmail = sendInsuranceFeedbackEmailSpy;
  });

  test('it should call sendEmail.insuranceFeedbackEmail and return success=true', async () => {
    const result = await sendEmailInsuranceFeedback({}, variables);

    expect(sendInsuranceFeedbackEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendInsuranceFeedbackEmailSpy).toHaveBeenCalledWith(mockInsuranceFeedback);

    const expected = {
      success: true,
      emailRecipient: mockAccount.email,
    };

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.insuranceFeedbackEmail = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendEmailInsuranceFeedback({}, variables);
      } catch (err) {
        const expected = new Error(`Generating and sending email for insurance feedback ${mockSendEmailResponse}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
