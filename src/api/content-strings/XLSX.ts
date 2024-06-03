import { TOTAL_CONTRACT_VALUE } from '../constants/total-contract-value';
import INSURANCE_FIELD_IDS from '../constants/field-ids/insurance';
import { GBP_CURRENCY_CODE } from '../constants';
import formatCurrency from '../helpers/format-currency';

const { AMOUNT_250K, MORE_THAN_250K } = TOTAL_CONTRACT_VALUE;

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
  DECLARATIONS: { AGREE_HOW_YOUR_DATA_WILL_BE_USED, HAS_ANTI_BRIBERY_CODE_OF_CONDUCT, WILL_EXPORT_WITH_CODE_OF_CONDUCT },
  ELIGIBILITY: { BUYER_COUNTRY, COMPANIES_HOUSE_NUMBER, COVER_PERIOD, HAS_END_BUYER, HAS_MINIMUM_UK_GOODS_OR_SERVICES },
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE: { COMPANY_ADDRESS: EXPORTER_COMPANY_ADDRESS, COMPANY_SIC: EXPORTER_COMPANY_SIC },
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, PHONE_NUMBER, TRADING_ADDRESS, WEBSITE },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS_DOT_NOTATION },
    HAS_CREDIT_CONTROL,
  },
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
    USING_BROKER,
    BROKER_DETAILS: { NAME: BROKER_NAME, EMAIL: BROKER_EMAIL, FULL_ADDRESS: BROKER_ADDRESS },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME, REGISTRATION_NUMBER: BUYER_REGISTRATION_NUMBER, FIRST_NAME: BUYER_CONTACT_DETAILS },
  },
} = INSURANCE_FIELD_IDS;

/**
 * XLSX
 * Content strings specific for the XLSX.
 * Some field titles/labels need to have different wording for internal teams, after an application is submitted.
 * as apposed to other field content strings that are used for a user completing an application.
 * If a field is in the XLSX and not listed here, the field is using the "regular" field content strings.
 */
export const XLSX = {
  AGREED: 'Agreed',
  SECTION_TITLES: {
    KEY_INFORMATION: 'Key information',
    EXPORTER_CONTACT_DETAILS: 'Exporter contact details',
    POLICY: 'Your insurance coverage',
    EXPORTER_BUSINESS: 'About your business',
    BUYER: 'Your buyer',
    ELIGIBILITY: 'Eligibility',
    DECLARATIONS: 'Declarations',
  },
  FIELDS: {
    [FIRST_NAME]: 'Applicant first name',
    [LAST_NAME]: 'Applicant last name',
    [AGREE_HOW_YOUR_DATA_WILL_BE_USED]: 'How the data will be used',
    APPLICANT_EMAIL_ADDRESS: 'Applicant email address',
    APPLICANT_ROLE: 'Applicants role',
    [BUYER_COUNTRY]: 'Where is your buyer based?',
    EXPORTER_CONTACT: {
      [FIRST_NAME]: 'Exporter first name',
      [LAST_NAME]: 'Exporter last name',
      EXPORTER_CONTACT_EMAIL: 'Exporter email address',
    },
    [COMPANIES_HOUSE_NUMBER]: 'Companies house number',
    [COVER_PERIOD]: 'Length of cover',
    [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]: 'Does the exporter have a code of conduct?',
    [HAS_END_BUYER]: 'Is there an end buyer?',
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: 'Is at least 20% of the contract value made up from UK goods or services?',
    [HAS_CREDIT_CONTROL]: 'Do you have a process for dealing with late payments',
    [CONTRACT_COMPLETION_DATE]: 'Date expected for contract to complete',
    [EXPORTER_COMPANY_ADDRESS]: 'Exporter registered office address',
    [EXPORTER_COMPANY_SIC]: 'Exporter standard industry classification (SIC) codes and nature of business',
    [HAS_DIFFERENT_TRADING_NAME]: 'Different trading name?',
    [DIFFERENT_TRADING_NAME]: 'Alternative trading name',
    [TRADING_ADDRESS]: 'Different trading address?',
    [FULL_ADDRESS_DOT_NOTATION]: 'Alternative trading address',
    [MORE_THAN_250K.VALUE]: `Contract value of ${formatCurrency(AMOUNT_250K, GBP_CURRENCY_CODE)} or more?`,
    [WEBSITE]: 'Exporter Company website (optional)',
    [PHONE_NUMBER]: 'Exporter UK telephone number (optional)',
    [GOODS_OR_SERVICES]: 'Goods or services the business supplies',
    [YEARS_EXPORTING]: 'Exporter years exporting',
    [EMPLOYEES_UK]: 'Exporter UK Employees',
    [ESTIMATED_ANNUAL_TURNOVER]: 'Exporter estimated turnover this current financial year',
    [USING_BROKER]: 'Using a broker for this insurance',
    [BROKER_NAME]: 'Name of broker or company',
    [BROKER_ADDRESS]: 'Broker address',
    [BROKER_EMAIL]: 'Broker email address',
    [COUNTRY]: 'Buyer location',
    [BUYER_COMPANY_NAME]: 'Buyer company name',
    [BUYER_REGISTRATION_NUMBER]: 'Buyer registration number (optional)',
    [BUYER_CONTACT_DETAILS]: 'Buyer contact details',
    [WILL_EXPORT_WITH_CODE_OF_CONDUCT]: 'Will the exporter export using their code of conduct?',
    NO_FINANCIAL_YEAR_END_DATE: 'No data from Companies House',
  },
};

export default XLSX;
