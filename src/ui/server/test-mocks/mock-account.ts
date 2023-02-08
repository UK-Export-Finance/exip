import dotenv from 'dotenv';
import { Account } from '../../types';

dotenv.config();

const mockAccount = {
  firstName: 'Joe',
  lastName: 'Bloggs',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT,
  password: process.env.MOCK_ACCOUNT_PASSWORD,
} as Account;

export default mockAccount;
