import { callNotify } from '.';
import notify from '../../integrations/notify';
import { mockAccount, mockSendEmailResponse } from '../../test-mocks';

describe('emails/call-notify', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email } = mockAccount;

  const mockFile = JSON.stringify({ mock: true });

  const mockFileSystemResponse = Buffer.from(mockFile);

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  test('it should call notify.sendEmail and return the response', async () => {
    const templateId = 'mockTemplateId';
    const mockVariables = { test: true };

    const result = await callNotify(templateId, email, mockVariables, mockFileSystemResponse);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, mockVariables, mockFileSystemResponse);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });
});
