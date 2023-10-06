import dotenv from 'dotenv';
import FIELD_IDS from '../constants/field-ids/insurance/policy-and-exports';
import ACCOUNT_FIELD_IDS from '../constants/field-ids/insurance/account';
import { ApplicationPolicyContact } from '../../types';

dotenv.config();

const { POSITION } = FIELD_IDS.DIFFERENT_NAME_ON_POLICY;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const mockContact = {
  id: '123',
  [FIRST_NAME]: 'Bob',
  [LAST_NAME]: 'Smith',
  [EMAIL]: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  [POSITION]: 'CEO',
} as ApplicationPolicyContact;

export default mockContact;
