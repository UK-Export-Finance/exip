import dotenv from 'dotenv';
import { Account } from '../../types';

dotenv.config();

const mockAccount = {
  id: 'cldync34w0180ivoqvke7clz8',
  firstName: 'Joe',
  lastName: 'Bloggs',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  password: process.env.MOCK_ACCOUNT_PASSWORD,
  expires: new Date().toISOString(),
} as Account;

export default mockAccount;
