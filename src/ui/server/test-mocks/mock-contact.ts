import dotenv from 'dotenv';
import FIELD_IDS from '../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../constants/field-ids/insurance/account';
import { ApplicationPolicyContact } from '../../types';

dotenv.config();

const { IS_SAME_AS_OWNER } = FIELD_IDS.NAME_ON_POLICY;
const { POSITION } = FIELD_IDS.DIFFERENT_NAME_ON_POLICY;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const mockContact = {
  id: '123',
  [IS_SAME_AS_OWNER]: true,
  [FIRST_NAME]: 'Bob',
  [LAST_NAME]: 'Smith',
  [EMAIL]: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  [POSITION]: 'CEO',
} as ApplicationPolicyContact;

export default mockContact;
