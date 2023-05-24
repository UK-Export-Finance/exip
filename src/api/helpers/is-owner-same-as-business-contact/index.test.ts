import dotenv from 'dotenv';
import isOwnerSameAsContact from '.';

dotenv.config();

describe('api/helpers/is-owner-same-as-contact', () => {
  describe('when both emails are the same', () => {
    it('should return true', () => {
      const businessEmail = process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1 as string;
      const contactEmail = process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1 as string;

      const response = isOwnerSameAsContact(businessEmail, contactEmail);

      expect(response).toEqual(true);
    });
  });

  describe('when both emails are the different', () => {
    it('should return false', () => {
      const businessEmail = process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1 as string;
      const contactEmail = 'test@test.com';

      const response = isOwnerSameAsContact(businessEmail, contactEmail);

      expect(response).toEqual(false);
    });
  });
});
