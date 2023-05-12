import { format } from 'date-fns';
import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import createInsuranceFeedbackAndEmail from './create-feedback';
import sendEmail from '../../emails';
import { mockInsuranceFeedback, mockSendEmailResponse } from '../../test-mocks';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../../keystone';
import { Context } from '.keystone/types'; // eslint-disable-line
import { Feedback } from '../../types';

dotenv.config();

const dbUrl = String(process.env.DATABASE_URL);

const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/create-feedback', () => {
  const variables = mockInsuranceFeedback;

  let feedbackResponse: Feedback;

  jest.mock('../../emails');

  let sendInsuranceFeedbackEmailSpy = jest.fn();

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

    test('it should generate createdAt timestamp', () => {
      const feedbackCreatedAtTimestamp = format(new Date(feedbackResponse.createdAt), 'dd/mm/yyyy');
      const nowTimestamp = format(new Date(), 'dd/mm/yyyy');

      expect(feedbackCreatedAtTimestamp).toEqual(nowTimestamp);
    });

    test('it should call sendEmail.insuranceFeedbackEmail', async () => {
      expect(sendInsuranceFeedbackEmailSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the feedback email does not return a response', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      sendInsuranceFeedbackEmailSpy = jest.fn(() => Promise.resolve({}));

      sendEmail.insuranceFeedbackEmail = sendInsuranceFeedbackEmailSpy;

      feedbackResponse = (await createInsuranceFeedbackAndEmail({}, variables, context)) as Feedback;
    });

    test('it should return success=false', async () => {
      expect(feedbackResponse.success).toEqual(false);
    });
  });

  describe('when the feedback email call fails', () => {
    const mockErrorMessage = 'Mock error';

    beforeEach(async () => {
      jest.resetAllMocks();
      sendInsuranceFeedbackEmailSpy = jest.fn(() => Promise.reject(mockErrorMessage));

      sendEmail.insuranceFeedbackEmail = sendInsuranceFeedbackEmailSpy;
    });

    test('should throw an error', async () => {
      try {
        feedbackResponse = (await createInsuranceFeedbackAndEmail({}, variables, context)) as Feedback;
      } catch (err) {
        const expected = new Error(`Creating feedback: ${mockErrorMessage}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
