// @ts-ignore
import notificationsClient from 'notifications-node-client';
import notify from '.';

jest.mock('notifications-node-client');

const mockTemplateId = 'mock-template-id';
const mockSendToEmailAddress = 'mock@email.com';
const mockVariables = {};

describe('integrations/notify', () => {
  describe('when the call is successful', () => {
    beforeEach(() => {
      notificationsClient.NotifyClient = () => ({
        prepareUpload: jest.fn(),
        sendEmail: jest.fn(() => Promise.resolve()),
      });
    });

    test('it should return success=true and emailRecipient', async () => {
      const result = await notify.sendEmail(mockTemplateId, mockSendToEmailAddress, mockVariables);

      const expected = {
        success: true,
        emailRecipient: mockSendToEmailAddress,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the call is NOT successful', () => {
    beforeEach(() => {
      notificationsClient.NotifyClient = () => ({
        prepareUpload: jest.fn(),
        sendEmail: jest.fn(() => Promise.reject(new Error('mock'))),
      });
    });

    test('it should throw an error', async () => {
      try {
        await notify.sendEmail(mockTemplateId, mockSendToEmailAddress, mockVariables);
      } catch (err) {
        expect(err).toEqual('Error calling Notify API. Unable to send email');
      }
    });
  });
});
