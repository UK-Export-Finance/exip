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
    COMPANIES_HOUSE: { COMPANY_ADDRESS: EXPORTER_COMPANY_ADDRESS, COMPANY_NAME: EXPORTER_COMPANY_NAME, COMPANY_SIC: EXPORTER_COMPANY_SIC },
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, PHONE_NUMBER, TRADING_ADDRESS, WEBSITE },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS_DOT_NOTATION },
    HAS_CREDIT_CONTROL,
  },
  POLICY: {
    BROKER_DETAILS: { NAME: BROKER_NAME, EMAIL: BROKER_EMAIL, FULL_ADDRESS: BROKER_ADDRESS },
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_ID },
    },
    FINANCIAL_ADDRESS,
    LOSS_PAYEE: { IS_APPOINTED },
    LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
    LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
    NEED_PRE_CREDIT_PERIOD,
    REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED },
    TYPE_OF_POLICY: { POLICY_TYPE },
    USING_BROKER,
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME, REGISTRATION_NUMBER: BUYER_REGISTRATION_NUMBER, FIRST_NAME: BUYER_CONTACT_DETAILS },
    CONNECTION_WITH_BUYER,
    CONNECTION_WITH_BUYER_DESCRIPTION,
    FAILED_PAYMENTS,
    HAS_BUYER_FINANCIAL_ACCOUNTS,
    HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    OUTSTANDING_PAYMENTS,
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    TOTAL_OUTSTANDING_PAYMENTS,
    TRADED_WITH_BUYER,
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
    POLICY: 'Insurance policy',
    EXPORTER_BUSINESS: 'The business',
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
    [HAS_CREDIT_CONTROL]: 'Do you have a process for dealing with late payments?',
    [CONTRACT_COMPLETION_DATE]: "When it's expected to be complete",
    [EXPORTER_COMPANY_ADDRESS]: 'Exporter registered office address',
    [EXPORTER_COMPANY_NAME]: 'Exporter company name',
    [EXPORTER_COMPANY_SIC]: 'Exporter standard industry classification (SIC) codes and nature of business',
    [HAS_DIFFERENT_TRADING_NAME]: 'Different trading name?',
    [DIFFERENT_TRADING_NAME]: 'Alternative trading name',
    [TRADING_ADDRESS]: 'Different trading address?',
    [FULL_ADDRESS_DOT_NOTATION]: 'Alternative trading address',
    [MORE_THAN_250K.VALUE]: `Contract value of ${formatCurrency(AMOUNT_250K, GBP_CURRENCY_CODE)} or more?`,
    [WEBSITE]: 'Exporter Company website (optional)',
    [PHONE_NUMBER]: 'Exporter UK telephone number (optional)',
    [GOODS_OR_SERVICES]: 'Goods or services the business supplies',
    [YEARS_EXPORTING]: 'How long the business has been exporting for',
    [EMPLOYEES_UK]: 'Number of UK Employees',
    [ESTIMATED_ANNUAL_TURNOVER]: 'Exporter estimated turnover this current financial year',
    [USING_BROKER]: 'Using a broker for this insurance?',
    [BROKER_NAME]: 'Name of broker or company',
    [BROKER_ADDRESS]: 'Broker address',
    [BROKER_EMAIL]: 'Broker email address',
    [COUNTRY]: 'Buyer location',
    [BUYER_COMPANY_NAME]: 'Buyer company name or organisation',
    [BUYER_REGISTRATION_NUMBER]: 'Buyer registration number (optional)',
    [BUYER_CONTACT_DETAILS]: 'Buyer contact details',
    [CONNECTION_WITH_BUYER]: 'Is the exporter connected with the buyer in any way?',
    [CONNECTION_WITH_BUYER_DESCRIPTION]: 'Describe connection to the buyer',
    [TRADED_WITH_BUYER]: 'Has the exporter traded with this buyer before?',
    [FAILED_PAYMENTS]: 'Has the buyer ever failed to pay the exporter on time',
    [HAS_BUYER_FINANCIAL_ACCOUNTS]: 'Does the exporter hold any financial accounts in relation to the buyer?',
    [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: 'If the exporter has in past held credit insurance cover on the buyer',
    [IS_APPOINTED]: 'Using a loss payee?',
    [ACCOUNT_NUMBER]: 'Loss payee account number',
    [BIC_SWIFT_CODE]: 'Loss payee BIC or SWIFT code',
    [IBAN]: 'Loss payee IBAN number',
    [SORT_CODE]: 'Loss payee sort code',
    [FINANCIAL_ADDRESS]: 'Bank address of the loss payee',
    [OUTSTANDING_PAYMENTS]: 'Does the exporter currently have any outstanding or overdue payments from the buyer',
    [PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: 'Exporter explaining the credit insurance cover they had on the buyer',
    [TOTAL_OUTSTANDING_PAYMENTS]: 'Total outstanding payments',
    [POLICY_TYPE]: 'Type of policy',
    [REQUESTED_START_DATE]: 'When policy starts',
    [CONTRACT_COMPLETION_DATE]: "When it's expected to be complete",
    [NEED_PRE_CREDIT_PERIOD]: 'Is there a pre-credit period?',
    [REQUESTED]: 'Is there another company that needs to be insured on the policy?',
    [TOTAL_CONTRACT_VALUE_ID]: 'Total value of the contract',
    [WILL_EXPORT_WITH_CODE_OF_CONDUCT]: 'Will the exporter export using their code of conduct?',
    NO_FINANCIAL_YEAR_END_DATE: 'No data from Companies House',
  },
};

export default XLSX;
