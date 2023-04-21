import ACCOUNT from '../constants/field-ids/insurance/account';
import EXPORTER_BUSINESS from '../constants/field-ids/insurance/exporter-business';
import YOUR_BUYER from '../constants/field-ids/insurance/your-buyer';

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT;

const {
  COMPANY_HOUSE: { COMPANY_NAME: EXPORTER_COMPANY_NAME },
} = EXPORTER_BUSINESS;

const {
  COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME },
} = YOUR_BUYER;

export const CSV = {
  SECTION_TITLES: {
    KEY_INFORMATION: 'Key information',
    POLICY_AND_EXPORT: 'Type of policy and exports',
    EXPORTER_BUSINESS: 'About your business',
    BUYER: 'Your buyer',
    ELIGIBILITY: 'Eligibility',
  },
  FIELDS: {
    [FIRST_NAME]: 'Applicant first name',
    [LAST_NAME]: 'Applicant last name',
    [EMAIL]: 'Applicant email address',
    [EXPORTER_COMPANY_NAME]: 'Exporter company name',
    [COUNTRY]: 'Buyer location',
    [BUYER_COMPANY_NAME]: 'Buyer company name',
  },
};
