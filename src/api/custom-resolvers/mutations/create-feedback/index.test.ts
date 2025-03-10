import { format } from 'date-fns';
import createInsuranceFeedbackAndEmail from '.';
import sendEmail from '../../../emails';
import { mockInsuranceFeedback, mockSendEmailResponse, mockSpyPromise, mockErrorMessage, mockSpyPromiseRejection } from '../../../test-mocks';
import { Context, Feedback } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

describe('custom-resolvers/create-feedback', () => {
  let context: Context;
  let feedbackResponse: Feedback;
  const variables = mockInsuranceFeedback;

  jest.mock('../../../emails');

  let sendInsuranceFeedbackEmailSpy = jest.fn();

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('successfully creating feedback and sending email', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      sendInsuranceFeedbackEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

      sendEmail.insuranceFeedbackEmail = sendInsuranceFeedbackEmailSpy;

      feedbackResponse = (await createInsuranceFeedbackAndEmail({}, variables, context)) as Feedback;
    });

    it('should generate and return the created feedback', () => {
      const { service, satisfaction, improvement, otherComments, referralUrl, product, success } = feedbackResponse;

      expect(service).toEqual(variables.service);
      expect(satisfaction).toEqual(variables.satisfaction);
      expect(improvement).toEqual(variables.improvement);
      expect(otherComments).toEqual(variables.otherComments);
      expect(referralUrl).toEqual(variables.referralUrl);
      expect(product).toEqual(variables.product);
      expect(success).toEqual(true);
    });

    it('should generate createdAt timestamp', () => {
      const feedbackCreatedAtTimestamp = format(new Date(feedbackResponse.createdAt), 'dd/mm/yyyy');
      const nowTimestamp = format(new Date(), 'dd/mm/yyyy');

      expect(feedbackCreatedAtTimestamp).toEqual(nowTimestamp);
    });

    it('should call sendEmail.insuranceFeedbackEmail', async () => {
      expect(sendInsuranceFeedbackEmailSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the feedback email does not return a response', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      sendInsuranceFeedbackEmailSpy = mockSpyPromise();

      sendEmail.insuranceFeedbackEmail = sendInsuranceFeedbackEmailSpy;

      feedbackResponse = (await createInsuranceFeedbackAndEmail({}, variables, context)) as Feedback;
    });

    it('should return success=false', async () => {
      expect(feedbackResponse.success).toEqual(false);
    });
  });

  describe('when the feedback email call fails', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      sendInsuranceFeedbackEmailSpy = mockSpyPromiseRejection;

      sendEmail.insuranceFeedbackEmail = sendInsuranceFeedbackEmailSpy;
    });

    it('should throw an error', async () => {
      try {
        feedbackResponse = (await createInsuranceFeedbackAndEmail({}, variables, context)) as Feedback;
      } catch (error) {
        const expected = new Error(`Creating feedback: ${new Error(mockErrorMessage)}`);
        expect(error).toEqual(expected);
      }
    });
  });
});
