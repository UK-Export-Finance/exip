import { submissionDeadlineEmail } from '.';
import notify from '../../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import { mockApplication, mockSendEmailResponse } from '../../test-mocks';
import { SubmissionDeadlineEmailVariables } from '../../types';

describe('emails/submission-deadline', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.DEADLINE;

  const variables = {
    email: mockApplication.owner.email,
    name: `${mockApplication.owner.firstName} ${mockApplication.owner.lastName}`,
    referenceNumber: String(mockApplication.referenceNumber),
    applicationUrl: '',
    buyer: String(mockApplication.buyer.companyOrOrganisationName),
    submissionDeadline: new Date(mockApplication.submissionDeadline).toString(),
  } as SubmissionDeadlineEmailVariables;

  const mockErrorMessage = 'Mock error';

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  test('it should call notify.sendEmail and return the response', async () => {
    const result = await submissionDeadlineEmail(variables.email, variables);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);

    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, variables.email, variables);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeAll(async () => {
      notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
    });

    test('should throw an error', async () => {
      await expect(submissionDeadlineEmail(variables.email, variables)).rejects.toThrow(
        `Sending access code email for account sign in Error: Sending email ${mockErrorMessage}`,
      );
    });
  });
});
