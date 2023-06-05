import dotenv from 'dotenv';
import FIELD_IDS from '../constants/field-ids/insurance/business';
import ACCOUNT_FIELD_IDS from '../constants/field-ids/insurance/account';

dotenv.config();

const { POSITION } = FIELD_IDS.CONTACT;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const mockBusinessContact = {
  id: '123',
  [FIRST_NAME]: 'Bob',
  [LAST_NAME]: 'Smith',
  [EMAIL]: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  [POSITION]: 'CEO',
};

export default mockBusinessContact;
