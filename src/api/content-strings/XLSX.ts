import { GBP_CURRENCY_CODE } from '../constants';
import { TOTAL_CONTRACT_VALUE } from '../constants/total-contract-value';
import INSURANCE_FIELD_IDS from '../constants/field-ids/insurance';
import formatCurrency from '../helpers/format-currency';

const { AMOUNT_250K, MORE_THAN_250K } = TOTAL_CONTRACT_VALUE;

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
  DECLARATIONS: { AGREE_HOW_YOUR_DATA_WILL_BE_USED, HAS_ANTI_BRIBERY_CODE_OF_CONDUCT, WILL_EXPORT_WITH_CODE_OF_CONDUCT },
  ELIGIBILITY: { BUYER_COUNTRY, COMPANIES_HOUSE_NUMBER, COVER_PERIOD, HAS_END_BUYER, HAS_MINIMUM_UK_GOODS_OR_SERVICES },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN },
    AGENT_CHARGES: { PAYABLE_COUNTRY_CODE, FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE },
    AGENT_DETAILS: { NAME: AGENT_NAME, FULL_ADDRESS: AGENT_ADDRESS, COUNTRY_CODE: AGENT_COUNTRY_CODE },
    AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
    HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
    PRIVATE_MARKET: { ATTEMPTED: ATTEMPTED_PRIVATE_MARKET, DECLINED_DESCRIPTION },
    USING_AGENT,
  },
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS_DOT_NOTATION },
    COMPANIES_HOUSE: { COMPANY_ADDRESS: EXPORTER_COMPANY_ADDRESS, COMPANY_NAME: EXPORTER_COMPANY_NAME, COMPANY_SIC: EXPORTER_COMPANY_SIC },
    HAS_CREDIT_CONTROL,
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER },
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, PHONE_NUMBER, TRADING_ADDRESS, WEBSITE },
  },
  POLICY: {
    BROKER_DETAILS: { NAME: BROKER_NAME, EMAIL: BROKER_EMAIL, FULL_ADDRESS: BROKER_ADDRESS },
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_ID },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
    },
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
    FINANCIAL_ADDRESS,
    LOSS_PAYEE: { IS_APPOINTED },
    LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
    LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
    NAME_ON_POLICY,
    NEED_PRE_CREDIT_PERIOD,
    REQUESTED_JOINTLY_INSURED_PARTY,
    TYPE_OF_POLICY: { POLICY_TYPE },
    USING_BROKER,
  },
  YOUR_BUYER: {
    // COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME, REGISTRATION_NUMBER: BUYER_REGISTRATION_NUMBER, FIRST_NAME: BUYER_CONTACT_DETAILS },
    COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME, REGISTRATION_NUMBER: BUYER_REGISTRATION_NUMBER },
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
    BUYER: 'Your buyer',
    DECLARATIONS: 'Declarations',
    ELIGIBILITY: 'Eligibility',
    EXPORT_CONTRACT: 'Export Contract',
    EXPORTER_BUSINESS: 'The business',
    EXPORTER_CONTACT_DETAILS: 'Exporter contact details',
    KEY_INFORMATION: 'Key information',
    POLICY: 'Insurance policy',
  },
  FIELDS: {
    [ACCOUNT_NUMBER]: 'Loss payee account number',
    AGENT: {
      [AGENT_NAME]: 'Name of the agent',
      [AGENT_ADDRESS]: 'Address of the agent',
      [AGENT_COUNTRY_CODE]: 'Country the agent is based in',
    },
    AGENT_CHARGES: {
      [FIXED_SUM_AMOUNT]: 'How much is the agent charging?',
      [PAYABLE_COUNTRY_CODE]: 'Country where the charges are payable',
      [PERCENTAGE_CHARGE]: 'How much is the agent charging?',
    },
    AGENT_SERVICE: {
      [IS_CHARGING]: 'Is the agent charging for their support in the export contract?',
      [SERVICE_DESCRIPTION]: 'Service the agent is providing',
    },
    [AGREE_HOW_YOUR_DATA_WILL_BE_USED]: 'How the data will be used',
    APPLICANT_EMAIL_ADDRESS: 'Applicant email address',
    [BIC_SWIFT_CODE]: 'Loss payee BIC or SWIFT code',
    [BROKER_NAME]: 'Name of broker or company',
    [BROKER_ADDRESS]: 'Broker address',
    [BROKER_EMAIL]: "Broker's email address",
    [BUYER_COMPANY_NAME]: 'Buyer company name or organisation',
    // TODO: fix
    // [BUYER_CONTACT_DETAILS]: 'Buyer contact details',
    [BUYER_COUNTRY]: 'Where is your buyer based?',
    [BUYER_REGISTRATION_NUMBER]: 'Buyer registration number (optional)',
    [COMPANIES_HOUSE_NUMBER]: 'Companies house number',
    [CONNECTION_WITH_BUYER]: 'Is the exporter connected with the buyer in any way?',
    [CONNECTION_WITH_BUYER_DESCRIPTION]: 'Describe connection to the buyer',
    [CONTRACT_COMPLETION_DATE]: 'Expected contract completion date',
    [COUNTRY]: 'Buyer location',
    [COVER_PERIOD]: 'Length of cover',
    [DIFFERENT_TRADING_NAME]: 'Alternative trading name',
    [EMPLOYEES_UK]: 'Number of UK Employees',
    [ESTIMATED_ANNUAL_TURNOVER]: 'Exporter estimated turnover this current financial year',
    [EXPORTER_COMPANY_ADDRESS]: 'Exporter registered office address',
    [EXPORTER_COMPANY_NAME]: 'Exporter company name',
    [EXPORTER_COMPANY_SIC]: 'Exporter standard industry classification (SIC) codes and nature of business',
    EXPORTER_CONTACT: {
      [FIRST_NAME]: 'Exporter first name',
      [LAST_NAME]: 'Exporter last name',
      EXPORTER_CONTACT_EMAIL: 'Exporter email address',
      EXPORTER_CONTACT_POSITION: "Exporter's role",
    },
    EXPORT_CONTRACT: {
      [DESCRIPTION]: "About the exporter's goods or services",
      [FINAL_DESTINATION_KNOWN]: 'Does the exporter know the final destination of the goods?',
      [PAYMENT_TERMS_DESCRIPTION]: 'How the exporter will be paid for their export',
      [ATTEMPTED_PRIVATE_MARKET]: 'Did the exporter try to insure through the private market?',
      [DECLINED_DESCRIPTION]: 'Why could they not get insurance through the private market? ',
      [USING_AGENT]: 'Did the exporter use an agent?',
    },
    [FAILED_PAYMENTS]: 'Has the buyer ever failed to pay the exporter on time?',
    [FINANCIAL_ADDRESS]: 'Bank address of the loss payee',
    [FIRST_NAME]: 'Applicant first name',
    [FULL_ADDRESS_DOT_NOTATION]: 'Alternative trading address',
    [GOODS_OR_SERVICES]: 'Goods or services the business supplies',
    [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]: 'Does the exporter have a code of conduct?',
    [HAS_BUYER_FINANCIAL_ACCOUNTS]: 'Does the exporter hold any financial accounts in relation to the buyer?',
    [HAS_CREDIT_CONTROL]: 'Do you have a process for dealing with late payments?',
    [HAS_DIFFERENT_TRADING_NAME]: 'Different trading name?',
    [HAS_END_BUYER]: 'Is there an end buyer?',
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: 'Is at least 20% of the contract value made up from UK goods or services?',
    [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: 'Has the exporter previously held credit insurance cover on the buyer?',
    [IBAN]: 'Loss payee IBAN number',
    [IS_APPOINTED]: 'Using a loss payee?',
    JOINTLY_INSURED_PARTY: {
      [REQUESTED_JOINTLY_INSURED_PARTY.REQUESTED]: 'Is there another company that needs to be insured on the policy?',
      [REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NAME]: 'Name of the company',
      [REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NUMBER]: 'Registration number of the other company (optional)',
      [REQUESTED_JOINTLY_INSURED_PARTY.COUNTRY_CODE]: 'The country the other company is based in',
    },
    [LAST_NAME]: 'Applicant last name',
    [MAXIMUM_BUYER_WILL_OWE]: 'Maximum buyer will owe exporter',
    [MORE_THAN_250K.VALUE]: `Contract value of ${formatCurrency(AMOUNT_250K, GBP_CURRENCY_CODE)} or more?`,
    NAME_ON_POLICY: {
      [NAME_ON_POLICY.NAME]: 'Name on the policy',
      [NAME_ON_POLICY.POSITION]: 'Position at the company',
    },
    [NEED_PRE_CREDIT_PERIOD]: 'Is there a pre-credit period?',
    NO_FINANCIAL_YEAR_END_DATE: 'No data from Companies House',
    [OUTSTANDING_PAYMENTS]: 'Does the exporter currently have any outstanding or overdue payments from the buyer?',
    [PHONE_NUMBER]: 'Exporter UK telephone number (optional)',
    [POLICY_TYPE]: 'Type of policy',
    [PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: 'Details of credit insurance cover held on the buyer',
    [REQUESTED_START_DATE]: 'Requested policy start date',
    SOMEONE_ELSE: 'Someone else',
    [SORT_CODE]: 'Loss payee sort code',
    [TOTAL_CONTRACT_VALUE_ID]: 'Total value of the contract',
    [TOTAL_MONTHS_OF_COVER]: 'Requested length of insurance',
    [TOTAL_OUTSTANDING_PAYMENTS]: 'Total outstanding payments',
    [TOTAL_SALES_TO_BUYER]: 'Total sales estimate',
    [TRADING_ADDRESS]: 'Different trading address?',
    [TRADED_WITH_BUYER]: 'Has the exporter traded with this buyer before?',
    [USING_BROKER]: 'Using a broker for this insurance?',
    [WEBSITE]: 'Exporter Company website (optional)',
    [WILL_EXPORT_WITH_CODE_OF_CONDUCT]: 'Will the exporter export using their code of conduct?',
    [YEARS_EXPORTING]: 'How long the business has been exporting for',
  },
};

export default XLSX;
