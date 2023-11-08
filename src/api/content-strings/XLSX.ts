import ACCOUNT from '../constants/field-ids/insurance/account';
import POLICY from '../constants/field-ids/insurance/policy';
import EXPORTER_BUSINESS from '../constants/field-ids/insurance/business';
import YOUR_BUYER from '../constants/field-ids/insurance/your-buyer';

const { FIRST_NAME, LAST_NAME } = ACCOUNT;

const {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE },
  },
} = POLICY;

const {
  COMPANIES_HOUSE: { COMPANY_NAME: EXPORTER_COMPANY_NAME, COMPANY_ADDRESS: EXPORTER_COMPANY_ADDRESS, COMPANY_SIC: EXPORTER_COMPANY_SIC },
  YOUR_COMPANY: { WEBSITE, PHONE_NUMBER },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER },
  BROKER: { USING_BROKER, NAME: BROKER_NAME, ADDRESS_LINE_1: BROKER_ADDRESS, EMAIL: BROKER_EMAIL },
} = EXPORTER_BUSINESS;

const {
  COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME, REGISTRATION_NUMBER: BUYER_REGISTRATION_NUMBER, FIRST_NAME: BUYER_CONTACT_DETAILS },
} = YOUR_BUYER;

export const XLSX = {
  SECTION_TITLES: {
    KEY_INFORMATION: 'Key information',
    EXPORTER_CONTACT_DETAILS: 'Exporter contact details',
    POLICY: 'Type of policy and exports',
    EXPORTER_BUSINESS: 'About your business',
    BUYER: 'Your buyer',
    ELIGIBILITY: 'Eligibility',
  },
  FIELDS: {
    [FIRST_NAME]: 'Applicant first name',
    [LAST_NAME]: 'Applicant last name',
    APPLICANT_EMAIL_ADDRESS: 'Applicant email address',
    EXPORTER_CONTACT: {
      [FIRST_NAME]: 'Exporter first name',
      [LAST_NAME]: 'Exporter last name',
      EXPORTER_CONTACT_EMAIL: 'Exporter email address',
    },
    [CONTRACT_COMPLETION_DATE]: 'Date expected for contract to complete',
    [EXPORTER_COMPANY_NAME]: 'Exporter company name',
    [EXPORTER_COMPANY_ADDRESS]: 'Exporter registered office address',
    [EXPORTER_COMPANY_SIC]: 'Exporter standard industry classification (SIC) codes and nature of business',
    [WEBSITE]: 'Exporter Company website (optional)',
    [PHONE_NUMBER]: 'Exporter telephone number (optional)',
    [GOODS_OR_SERVICES]: 'Goods or services the business supplies',
    [YEARS_EXPORTING]: 'Exporter years exporting',
    [EMPLOYEES_UK]: 'Exporter UK Employees',
    [EMPLOYEES_INTERNATIONAL]: 'Exporter worldwide employees including UK employees',
    [ESTIMATED_ANNUAL_TURNOVER]: 'Exporter estimated turnover this current financial year',
    [USING_BROKER]: 'Using a broker for this insurance',
    [BROKER_NAME]: 'Name of broker or company',
    [BROKER_ADDRESS]: 'Broker address',
    [BROKER_EMAIL]: 'Broker email address',
    [COUNTRY]: 'Buyer location',
    [BUYER_COMPANY_NAME]: 'Buyer company name',
    [BUYER_REGISTRATION_NUMBER]: 'Buyer registration number (optional)',
    [BUYER_CONTACT_DETAILS]: 'Buyer contact details',
  },
};

export default XLSX;
