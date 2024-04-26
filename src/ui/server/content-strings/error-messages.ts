import { APPLICATION, ELIGIBILITY, FIELD_IDS, GBP_CURRENCY_CODE, MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS, TOTAL_CONTRACT_VALUE } from '../constants';
import formatCurrency from '../helpers/format-currency';

const {
  POLICY: { TOTAL_MONTHS_OF_COVER },
} = APPLICATION;

type ErrorMessage = {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const THRESHOLD = formatCurrency(TOTAL_CONTRACT_VALUE.AMOUNT_250K, GBP_CURRENCY_CODE, 0);

export const ERROR_MESSAGES = {
  THERE_IS_A_PROBLEM: 'There is a problem',
  ELIGIBILITY: {
    [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY]: 'Select where your buyer is based',
    [FIELD_IDS.ELIGIBILITY.VALID_BUYER_BODY]: 'Select if your buyer is a government or public sector body',
    [FIELD_IDS.ELIGIBILITY.VALID_EXPORTER_LOCATION]: "Select whether you're exporting from a business base in the UK, Channel Islands, Isle of Man or not",
    [FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
      IS_EMPTY: 'Select whether at least 20% of your export contract value is made up from UK goods or services or not',
    },
    [FIELD_IDS.ELIGIBILITY.CURRENCY]: {
      IS_EMPTY: 'Select currency',
    },
    [FIELD_IDS.ELIGIBILITY.COUNTRY]: {
      IS_EMPTY: "Select the buyer's country",
    },
    [FIELD_IDS.ELIGIBILITY.CONTRACT_VALUE]: {
      IS_EMPTY: 'Enter your contract value as a whole number - do not enter decimals',
      NOT_A_NUMBER: 'Enter your contract value as a whole number - do not enter decimals',
      NOT_A_WHOLE_NUMBER: 'Enter your contract value as a whole number - do not enter decimals',
      BELOW_MINIMUM: 'Contract value must be 1 or more',
    },
    [FIELD_IDS.ELIGIBILITY.MAX_AMOUNT_OWED]: {
      IS_EMPTY: 'Enter your maximum amount owed as a whole number - do not enter decimals',
      NOT_A_NUMBER: 'Enter your maximum amount owed as a whole number - do not enter decimals',
      NOT_A_WHOLE_NUMBER: 'Enter your maximum amount owed as a whole number - do not enter decimals',
      BELOW_MINIMUM: 'Maximum amount owed must be 1 or more',
    },
    [FIELD_IDS.ELIGIBILITY.CREDIT_PERIOD]: {
      IS_EMPTY: 'Select credit period',
      BELOW_MINIMUM: 'Credit period must be 1 month or more',
      ABOVE_MAXIMUM: 'Enter Credit period of no more than 2 months',
    },
    [FIELD_IDS.ELIGIBILITY.PERCENTAGE_OF_COVER]: {
      IS_EMPTY: 'Select the percentage of cover you need',
    },
    [FIELD_IDS.POLICY_TYPE]: 'Select what kind of policy you need',
    [FIELD_IDS.POLICY_LENGTH]: {
      NOT_A_NUMBER: 'Policy length must be a number',
      NOT_A_WHOLE_NUMBER: 'Policy length must be a whole number, like 10 - you cannot enter decimal points',
      BELOW_MINIMUM: 'Policy length must be 1 month or more',
      IS_EMPTY: 'Enter how many months you need the policy for',
      ABOVE_MAXIMUM: 'Enter policy length of no more than 22 months',
    },
  },
  [FIELD_IDS.OPTIONAL_COOKIES]: 'Select whether you want to accept analytics cookies',
  [FIELD_IDS.FEEDBACK.IMPROVEMENT]: 'How we could improve the service cannot be more than 1200 characters',
  [FIELD_IDS.FEEDBACK.OTHER_COMMENTS]: 'Anything else you would like to tell us cannot be more than 1200 characters',
  INSURANCE: {
    ELIGIBILITY: {
      [FIELD_IDS.INSURANCE.ELIGIBILITY.TOTAL_CONTRACT_VALUE]: {
        IS_EMPTY: `Select if the the total value of your contract exceeds ${THRESHOLD} or not`,
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.COVER_PERIOD]: {
        IS_EMPTY: `Select whether you want to be insured for longer than ${ELIGIBILITY.MAX_COVER_PERIOD_YEARS} years`,
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.HAS_COMPANIES_HOUSE_NUMBER]: {
        IS_EMPTY: 'Select whether you have a UK Companies House number and whether your company is actively trading',
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER]: {
        IS_EMPTY: 'Enter your UK Companies House number registration number',
        INCORRECT_FORMAT: 'Enter your Companies House registration number in the correct format - for example, 8989898 or SC907816',
        NOT_FOUND: 'Enter a recognised Companies House number',
        TECHNICAL_ISSUES: 'Due to technical issues, you cannot search for your Companies House registration number right now - try again in few minutes',
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.HAS_END_BUYER]: {
        IS_EMPTY: 'Select if there will be an end buyer for this export contract',
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT]: {
        IS_EMPTY: 'Select if you have a UK Export Finance account',
      },
    },
    EXPORTER_BUSINESS: {
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.HAS_DIFFERENT_TRADING_NAME]: {
        IS_EMPTY: 'Select whether you use a different trading name for this company',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.DIFFERENT_TRADING_NAME]: {
        IS_EMPTY: 'Select whether you use a different trading name for this company',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_ADDRESS]: {
        IS_EMPTY: 'Select whether you use a different trading address for this company',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.WEBSITE]: {
        INCORRECT_FORMAT: 'Enter your company website in a valid format - like www.example.com',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.PHONE_NUMBER]: {
        INCORRECT_FORMAT: 'Enter a valid UK telephone number',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS.FULL_ADDRESS]: {
        IS_EMPTY: 'Enter your alternative trading address',
        ABOVE_MAXIMUM: `The alternative address cannot be more than ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`,
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.GOODS_OR_SERVICES]: {
        IS_EMPTY: 'Enter the information about your business and the products or services you distribute',
        ABOVE_MAXIMUM: 'The description of your business cannot be more than a 1000 characters',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.YEARS_EXPORTING]: {
        IS_EMPTY: 'Enter how many years you have been exporting for as a whole number',
        INCORRECT_FORMAT: 'Enter how many years you have been exporting for as a whole number - do not enter decimals',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.EMPLOYEES_UK]: {
        IS_EMPTY: 'Enter how many employees you have in the UK as a whole number - for example, 100',
        INCORRECT_FORMAT: 'Enter how many employees you have in the UK as a whole number. You cannot enter letters or special characters',
        BELOW_MINIMUM: 'Number of employees in the UK must be more than 0',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.ESTIMATED_ANNUAL_TURNOVER]: {
        IS_EMPTY: 'Enter your estimated annual turnover for this current financial year',
        INCORRECT_FORMAT: 'Enter your estimated annual turnover for the current financial year in the correct format - for example, whole numbers only',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.PERCENTAGE_TURNOVER]: {
        IS_EMPTY: 'Enter your estimated percentage of turnover from exports',
        INCORRECT_FORMAT:
          'Enter your estimated percentage of turnover from exports in the correct format, without special characters - for example, a whole number like 50',
        BELOW_MINIMUM: 'Your percentage of turnover from exports must be a number between 0 to 100',
        ABOVE_MAXIMUM: 'Your percentage of turnover from exports must be a number between 0 to 100',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.HAS_CREDIT_CONTROL]: {
        IS_EMPTY: 'Select if you have a process for dealing with late payments',
      },
      [FIELD_IDS.INSURANCE.CURRENCY.CURRENCY_CODE]: {
        IS_EMPTY: 'You must select the currency you use to calculate your annual turnover',
      },
      [FIELD_IDS.INSURANCE.CURRENCY.ALTERNATIVE_CURRENCY_CODE]: {
        IS_EMPTY: 'Enter the currency you use to calculate your annual turnover',
      },
    },
    EXPORT_CONTRACT: {
      ABOUT_GOODS_OR_SERVICES: {
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES.DESCRIPTION]: {
          IS_EMPTY: 'Enter the goods or services you will supply to the buyer',
          ABOVE_MAXIMUM: 'The description of the goods or services you want to insure cannot be more than 1000 characters',
        },
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION_KNOWN]: {
          IS_EMPTY: 'Select if you know the final destination of the goods or services',
        },
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION]: {
          IS_EMPTY: 'Enter the final destination of the goods or services',
        },
      },
      HOW_WILL_YOU_GET_PAID: {
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.HOW_WILL_YOU_GET_PAID.PAYMENT_TERMS_DESCRIPTION]: {
          IS_EMPTY: 'Enter how you will get paid for your export',
          ABOVE_MAXIMUM: `The description of how you will get paid for your export cannot be more than a ${MAXIMUM_CHARACTERS.PAYMENT_TERMS_DESCRIPTION} characters`,
        },
      },
      PRIVATE_MARKET: {
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET.ATTEMPTED]: {
          IS_EMPTY: 'Select if you have tried to insure this export through the private market',
        },
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET.DECLINED_DESCRIPTION]: {
          IS_EMPTY: "Enter why you couldn't get cover through the private market",
          ABOVE_MAXIMUM: `The description of why you couldn't get cover through the private market cannot be more than ${MAXIMUM_CHARACTERS.DECLINED_BY_PRIVATE_MARKET_DESCRIPTION} characters`,
        },
      },
      [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.USING_AGENT]: {
        IS_EMPTY: 'Select if anyone, like an agent, helped you win your export contract',
      },
      AGENT_DETAILS: {
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.AGENT_DETAILS.NAME]: {
          IS_EMPTY: 'Enter the name of the agent',
          ABOVE_MAXIMUM: `The name of the agent cannot be more than ${MAXIMUM_CHARACTERS.AGENT_NAME} characters`,
          INCORRECT_FORMAT: "The agent's name must not include any numbers or symbols",
        },
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.AGENT_DETAILS.FULL_ADDRESS]: {
          IS_EMPTY: "Enter the agent's address",
          ABOVE_MAXIMUM: `The agent's address cannot be more than ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`,
        },
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.AGENT_DETAILS.COUNTRY_CODE]: {
          IS_EMPTY: 'Enter the country the agent is based in',
        },
      },
      AGENT_SERVICE: {
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.AGENT_SERVICE.SERVICE_DESCRIPTION]: {
          IS_EMPTY: 'Enter the details of the service the agent is providing',
          ABOVE_MAXIMUM: `The details of the service the agent is providing cannot be more than ${MAXIMUM_CHARACTERS.AGENT_SERVICE_DESCRIPTION} characters`,
        },
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.AGENT_SERVICE.IS_CHARGING]: {
          IS_EMPTY: 'Select if the agent is charging for their support',
        },
      },
      AGENT_CHARGES: {
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES.METHOD]: {
          IS_EMPTY: 'Select if the agent is charging for their support',
        },
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES.FIXED_SUM_AMOUNT]: {
          IS_EMPTY: 'Enter how much the agent is charging you',
          INCORRECT_FORMAT: 'The value the agent is charging must not include any letters or special characters',
          BELOW_MINIMUM: `The value the agent is charging must be ${MINIMUM_CHARACTERS.ONE} or more`,
        },
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES.PERCENTAGE_CHARGE]: {
          IS_EMPTY: 'Enter the percentage the agent is charging',
          INCORRECT_FORMAT: 'Enter the percentage the agent is charging you in the correct format, without special characters',
          BELOW_MINIMUM: `The percentage the agent is charging you must be a number between ${MINIMUM_CHARACTERS.ONE} and ${MAXIMUM_CHARACTERS.PERCENTAGE}`,
          ABOVE_MAXIMUM: `The percentage the agent is charging you must be a number between ${MINIMUM_CHARACTERS.ONE} and ${MAXIMUM_CHARACTERS.PERCENTAGE}`,
        },
        [FIELD_IDS.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES.PAYABLE_COUNTRY_CODE]: {
          IS_EMPTY: 'Select the country where charges are payable',
        },
      },
      AGENT_CHARGES_ALTERNATIVE_CURRENCY: {
        [FIELD_IDS.INSURANCE.CURRENCY.CURRENCY_CODE]: {
          IS_EMPTY: 'You must select the currency the agent is charging you in',
        },
        [FIELD_IDS.INSURANCE.CURRENCY.ALTERNATIVE_CURRENCY_CODE]: {
          IS_EMPTY: 'Enter the currency the agent is charging you in',
        },
      },
    },
    POLICY: {
      TYPE_OF_POLICY: {
        [FIELD_IDS.INSURANCE.POLICY.POLICY_TYPE]: {
          IS_EMPTY: 'Select the type of policy you need',
        },
      },
      CONTRACT_POLICY: {
        [FIELD_IDS.INSURANCE.POLICY.CONTRACT_POLICY.REQUESTED_START_DATE]: {
          INCORRECT_FORMAT: 'Enter when you want your policy to start in the correct format - for example 06 11 2023',
          BEFORE_EARLIEST: 'You cannot enter a policy start date in the past - enter a future date',
          MISSING_DAY_AND_MONTH: 'Policy start date must include a day and month',
          MISSING_DAY_AND_YEAR: 'Policy start date must include a day and year',
          MISSING_MONTH_AND_YEAR: 'Policy start date must include a month and year',
          INVALID_DAY: 'Enter a valid day',
          INVALID_MONTH: 'Enter a valid month',
          INVALID_YEAR: 'Enter a valid year',
          INVALID_YEAR_DIGITS: 'Year must include 4 numbers',
          INVALID_DATE: 'Policy start date must be a real date',
        },
        [FIELD_IDS.INSURANCE.CURRENCY.CURRENCY_CODE]: {
          IS_EMPTY: 'Select the currency you would like your policy to be issued in',
        },
        [FIELD_IDS.INSURANCE.CURRENCY.ALTERNATIVE_CURRENCY_CODE]: {
          IS_EMPTY: 'Enter the currency you would like your policy to be issued in',
        },
        SINGLE: {
          [FIELD_IDS.INSURANCE.POLICY.CONTRACT_POLICY.SINGLE.CONTRACT_COMPLETION_DATE]: {
            INCORRECT_FORMAT: 'Enter a contract completion date in the correct format - for example 06 11 2023',
            BEFORE_EARLIEST: 'You cannot enter a contract completion date in the past - enter a future date',
            MISSING_DAY_AND_MONTH: 'Policy completion date must include a day and month',
            MISSING_DAY_AND_YEAR: 'Policy completion date must include a day and year',
            MISSING_MONTH_AND_YEAR: 'Policy completion date must include a month and year',
            AFTER_LATEST:
              "Your contract completion date is more than 2 years after your policy start date. You'll need to speak with an export finance manager, if you still want to apply",
            CANNOT_BE_THE_SAME: 'Your contract completion date cannot be the same as your policy start date',
            CANNOT_BE_BEFORE: 'The date you expect to complete your export contract must be after the policy start date',
            INVALID_DAY: 'Enter a valid day',
            INVALID_MONTH: 'Enter a valid month',
            INVALID_YEAR: 'Enter a valid year',
            INVALID_YEAR_DIGITS: 'Year must include 4 numbers',
            INVALID_DATE: 'Policy completion date must be a real date',
          },
          [FIELD_IDS.INSURANCE.POLICY.CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
            IS_EMPTY: 'Enter the total value of the contract you want to insure as a whole number - do not enter decimals',
            INCORRECT_FORMAT: 'Enter the total value of the contract you want to insure as a whole number - do not enter decimals',
            BELOW_MINIMUM: 'The total value of the contract you want to insure must be 1 or more',
          },
        },
        MULTIPLE: {
          [FIELD_IDS.INSURANCE.POLICY.CONTRACT_POLICY.MULTIPLE.TOTAL_MONTHS_OF_COVER]: {
            INCORRECT_FORMAT: 'You must enter how many months you want to be insured for as a whole number. Do not use symbols or letters',
            IS_EMPTY: 'Enter how many months you want to be insured for',
            BELOW_MINIMUM: 'Your length of insurance must be 1 month or more',
            ABOVE_MAXIMUM: `The maximum length of your insurance cannot be more than ${TOTAL_MONTHS_OF_COVER} months.`,
          },
        },
      },
      EXPORT_VALUE: {
        MULTIPLE: {
          [FIELD_IDS.INSURANCE.POLICY.EXPORT_VALUE.MULTIPLE.TOTAL_SALES_TO_BUYER]: {
            IS_EMPTY: 'Enter your estimated total sales to your buyer during this time as a whole number - do not enter decimals',
            INCORRECT_FORMAT: 'Enter your estimated total sales to your buyer during this time as a whole number - do not enter decimals',
            BELOW_MINIMUM: 'Your total sales must be 1 or more',
          },
          [FIELD_IDS.INSURANCE.POLICY.EXPORT_VALUE.MULTIPLE.MAXIMUM_BUYER_WILL_OWE]: {
            IS_EMPTY:
              'Enter your estimate for the maximum amount your buyer will owe you at any single point during this time as a whole number - do not enter decimals',
            INCORRECT_FORMAT:
              'Enter your estimate for the maximum amount your buyer will owe you at any single point during this time as a whole number - do not enter decimals',
            BELOW_MINIMUM: 'Your estimated maximum amount your buyer will owe you at any single point during this time must be 1 or more',
          },
        },
      },
      NAME_ON_POLICY: {
        [FIELD_IDS.INSURANCE.POLICY.NAME_ON_POLICY.NAME]: {
          IS_EMPTY: 'Select whose name should appear on the insurance policy',
        },
        [FIELD_IDS.INSURANCE.POLICY.NAME_ON_POLICY.POSITION]: {
          IS_EMPTY: 'Enter the position you hold at the company',
          ABOVE_MAXIMUM: 'The description of your role at the company cannot be more than 50 characters',
          INCORRECT_FORMAT: 'The position you hold at the company must not include any numbers or symbols',
        },
      },
      DIFFERENT_NAME_ON_POLICY: {
        [FIELD_IDS.INSURANCE.ACCOUNT.FIRST_NAME]: {
          IS_EMPTY: "Enter the policy holder's first name",
          ABOVE_MAXIMUM: "The policy holder's first name cannot be more than 300 characters",
          INCORRECT_FORMAT: "The policy holder's first name must not include any numbers or symbols",
        },
        [FIELD_IDS.INSURANCE.ACCOUNT.LAST_NAME]: {
          IS_EMPTY: "Enter the policy holder's last name",
          ABOVE_MAXIMUM: "The policy holder's last name cannot be more than 300 characters",
          INCORRECT_FORMAT: "The policy holder's last name must not include any numbers or symbols",
        },
        [FIELD_IDS.INSURANCE.ACCOUNT.EMAIL]: {
          IS_EMPTY: 'Enter the email address of the person you want named on the policy',
          INCORRECT_FORMAT: "Enter the policy holder's email address in the correct format, like name@example.com",
          ABOVE_MAXIMUM: `The policy holder's email cannot be more than ${MAXIMUM_CHARACTERS.EMAIL} characters`,
        },
        [FIELD_IDS.INSURANCE.POLICY.DIFFERENT_NAME_ON_POLICY.POSITION]: {
          IS_EMPTY: "Enter the policy holder's position at the company",
          ABOVE_MAXIMUM: "The description of the policy holder's role at the company cannot be more than 50 characters",
          INCORRECT_FORMAT: "The policy holder's position at the company must not include any numbers or symbols",
        },
      },
      [FIELD_IDS.INSURANCE.POLICY.NEED_PRE_CREDIT_PERIOD]: {
        IS_EMPTY: 'Select whether you need cover for a period before you supply the goods or services to the buyer',
      },
      [FIELD_IDS.INSURANCE.POLICY.CREDIT_PERIOD_WITH_BUYER]: {
        IS_EMPTY: 'Enter the period of pre-credit cover your require',
        ABOVE_MAXIMUM: 'The description of the period of pre-credit cover your require cannot be more than a 1000 characters',
      },
      REQUESTED_JOINTLY_INSURED_PARTY: {
        [FIELD_IDS.INSURANCE.POLICY.REQUESTED_JOINTLY_INSURED_PARTY.REQUESTED]: {
          IS_EMPTY: 'Select if there is another company that needs to be insured in your policy',
        },
        [FIELD_IDS.INSURANCE.POLICY.REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NAME]: {
          IS_EMPTY: 'Enter the name of the other company',
          ABOVE_MAXIMUM: 'The name of the other company cannot be more than 200 characters',
        },
        [FIELD_IDS.INSURANCE.POLICY.REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NUMBER]: {
          ABOVE_MAXIMUM: 'The registration number of the other company cannot be more than 100 characters',
        },
        [FIELD_IDS.INSURANCE.POLICY.REQUESTED_JOINTLY_INSURED_PARTY.COUNTRY_CODE]: {
          IS_EMPTY: 'Enter the country the other company is based in',
        },
      },
      [FIELD_IDS.INSURANCE.POLICY.USING_BROKER]: {
        IS_EMPTY: 'Select whether you are using a broker to get this insurance',
      },
      BROKER_DETAILS: {
        [FIELD_IDS.INSURANCE.POLICY.BROKER_DETAILS.NAME]: {
          IS_EMPTY: 'Enter the name of the broker or company',
          ABOVE_MAXIMUM: 'The name of the broker or company cannot be more than 300 characters',
        },
        [FIELD_IDS.INSURANCE.POLICY.BROKER_DETAILS.EMAIL]: {
          IS_EMPTY: 'Enter the email address of the broker or company',
          ABOVE_MAXIMUM: `The broker or company email cannot be more than ${MAXIMUM_CHARACTERS.EMAIL} characters`,
          INCORRECT_FORMAT: 'Enter the broker or company email address in the correct format, like name@example.com',
        },
        [FIELD_IDS.INSURANCE.POLICY.BROKER_DETAILS.FULL_ADDRESS]: {
          IS_EMPTY: "Enter the broker's address",
          ABOVE_MAXIMUM: `The broker's address cannot be more than ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`,
        },
      },
      [FIELD_IDS.INSURANCE.POLICY.LOSS_PAYEE.IS_APPOINTED]: {
        IS_EMPTY: 'Select if you are appointing a loss payee',
      },
      [FIELD_IDS.INSURANCE.POLICY.LOSS_PAYEE_DETAILS.NAME]: {
        IS_EMPTY: 'Enter the name of the loss payee',
        ABOVE_MAXIMUM: `The name of the loss payee cannot be more than ${MAXIMUM_CHARACTERS.LOSS_PAYEE_NAME} characters`,
      },
      [FIELD_IDS.INSURANCE.POLICY.LOSS_PAYEE_DETAILS.LOCATION]: {
        IS_EMPTY: 'Select where your loss payee is located',
      },
      [FIELD_IDS.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_UK.ACCOUNT_NUMBER]: {
        IS_EMPTY: 'Enter an account number',
        INCORRECT_FORMAT: 'Enter a valid account number like 00733445',
        BELOW_MINIMUM: `Account number must be between ${MINIMUM_CHARACTERS.ACCOUNT_NUMBER} and ${MAXIMUM_CHARACTERS.ACCOUNT_NUMBER} digits`,
        ABOVE_MAXIMUM: `Account number must be between ${MINIMUM_CHARACTERS.ACCOUNT_NUMBER} and ${MAXIMUM_CHARACTERS.ACCOUNT_NUMBER} digits`,
      },
      [FIELD_IDS.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_UK.SORT_CODE]: {
        IS_EMPTY: 'Enter a sort code',
        INCORRECT_FORMAT: 'Enter a valid sort code like 309430',
        BELOW_MINIMUM: `Sort code must be ${MINIMUM_CHARACTERS.SORT_CODE} digits`,
        ABOVE_MAXIMUM: `Sort code must be ${MAXIMUM_CHARACTERS.SORT_CODE} digits`,
      },
      [FIELD_IDS.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL.BIC_SWIFT_CODE]: {
        IS_EMPTY: 'Enter a BIC or SWIFT code',
        INCORRECT_FORMAT: 'Enter a valid BIC or SWIFT code like BKENGB2L123',
        BELOW_MINIMUM: `BIC or SWIFT code must be between ${MINIMUM_CHARACTERS.BIC_SWIFT_CODE} and ${MAXIMUM_CHARACTERS.BIC_SWIFT_CODE} digits`,
        ABOVE_MAXIMUM: `BIC or SWIFT code must be between ${MINIMUM_CHARACTERS.BIC_SWIFT_CODE} and ${MAXIMUM_CHARACTERS.BIC_SWIFT_CODE} digits`,
      },
      [FIELD_IDS.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL.IBAN]: {
        IS_EMPTY: 'Enter an IBAN number',
        BELOW_MINIMUM: `IBAN must be between ${MINIMUM_CHARACTERS.IBAN} and ${MAXIMUM_CHARACTERS.IBAN} characters`,
        ABOVE_MAXIMUM: `IBAN must be between ${MINIMUM_CHARACTERS.IBAN} and ${MAXIMUM_CHARACTERS.IBAN} characters`,
      },
      [FIELD_IDS.INSURANCE.POLICY.FINANCIAL_ADDRESS]: {
        IS_EMPTY: "Enter the bank's address",
        ABOVE_MAXIMUM: `The bank's address cannot be more than ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`,
      },
    },
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: {
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.NAME]: {
          IS_EMPTY: "Enter the buyer's company or organisation name",
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.ADDRESS]: {
          IS_EMPTY: "Enter the buyer's address",
          ABOVE_MAXIMUM: `Buyer address cannot be more than ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`,
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.WEBSITE]: {
          INCORRECT_FORMAT: "Enter the buyer's website in the correct format, like www.example.com",
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.REGISTRATION_NUMBER]: {
          ABOVE_MAXIMUM: "Your buyer's company registration number cannot be more than a 100 characters",
        },
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.CONNECTION_WITH_BUYER]: {
        IS_EMPTY: "Select whether you're connected with the buyer in any way",
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.CONNECTION_WITH_BUYER_DESCRIPTION]: {
        IS_EMPTY: 'Enter the connection you have with the buyer',
        ABOVE_MAXIMUM: 'The description of your connection to the buyer cannot be more than a 1000 characters',
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.TRADED_WITH_BUYER]: {
        IS_EMPTY: 'Select if you have traded with this buyer before',
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.OUTSTANDING_PAYMENTS]: {
        IS_EMPTY: 'Select if you have any outstanding or overdue payments from the buyer',
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.FAILED_PAYMENTS]: {
        IS_EMPTY: 'Select if the end buyer has ever failed to pay you on time',
      },
      [FIELD_IDS.INSURANCE.CURRENCY.CURRENCY_CODE]: {
        IS_EMPTY: 'You must select the currency the outstanding or overdue payments are in',
      },
      [FIELD_IDS.INSURANCE.CURRENCY.ALTERNATIVE_CURRENCY_CODE]: {
        IS_EMPTY: 'Enter the currency the outstanding or overdue payments are in',
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
        IS_EMPTY: 'Select if you have previously held credit insurance cover on the buyer',
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
        IS_EMPTY: 'Enter a description about the credit insurance cover you had on the buyer',
        ABOVE_MAXIMUM: 'The description of your previous credit insurance cover on the buyer cannot be more than a 1000 characters',
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.TOTAL_OUTSTANDING_PAYMENTS]: {
        IS_EMPTY: 'Enter the total outstanding payments from the buyer',
        BELOW_MINIMUM: 'The total outstanding payments from the buyer must be 1 or more',
        INCORRECT_FORMAT: 'Enter the total outstanding payments as a whole number. Do not include any letters or special characters',
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.TOTAL_AMOUNT_OVERDUE]: {
        IS_EMPTY: 'Enter the total amount overdue from the buyer',
        BELOW_MINIMUM: 'The amount overdue from the buyer must be 1 or more',
        INCORRECT_FORMAT: 'Enter the amount overdue as whole number. Do not include any letters or special characters',
      },
      [FIELD_IDS.INSURANCE.YOUR_BUYER.HAS_BUYER_FINANCIAL_ACCOUNTS]: {
        IS_EMPTY: 'Select whether you hold any financial accounts in relation to the buyer',
      },
    },
    ACCOUNT: {
      CREATE: {
        YOUR_DETAILS: {
          [FIELD_IDS.INSURANCE.ACCOUNT.FIRST_NAME]: {
            IS_EMPTY: 'Enter your first name',
          },
          [FIELD_IDS.INSURANCE.ACCOUNT.LAST_NAME]: {
            IS_EMPTY: 'Enter your last name',
          },
          [FIELD_IDS.INSURANCE.ACCOUNT.EMAIL]: {
            IS_EMPTY: 'Enter an email address in the correct format, like name@example.com',
            INCORRECT_FORMAT: 'Enter an email address in the correct format, like name@example.com',
            ABOVE_MAXIMUM: `Your email address cannot be more than ${MAXIMUM_CHARACTERS.EMAIL} characters`,
            ACCOUNT_ALREADY_EXISTS: 'There is already an account with this email address. Please sign in or reset your password',
          },
          [FIELD_IDS.INSURANCE.ACCOUNT.PASSWORD]: {
            INCORRECT_FORMAT:
              'Enter a password in the correct format - for example, 14 characters long with an uppercase letter, lower case letter, number and special character',
          },
        },
      },
      SIGN_IN: {
        [FIELD_IDS.INSURANCE.ACCOUNT.EMAIL]: {
          INCORRECT: "Email address - either the email address or password you've entered is incorrect",
          ABOVE_MAXIMUM: `Your email address cannot be more than ${MAXIMUM_CHARACTERS.EMAIL} characters`,
        },
        [FIELD_IDS.INSURANCE.ACCOUNT.PASSWORD]: {
          INCORRECT: "Password - either the email address or password you've entered is incorrect",
        },
      },
      [FIELD_IDS.INSURANCE.ACCOUNT.ACCESS_CODE]: {
        INCORRECT: 'Enter your 6-digit access code - for example, 356515. You cannot enter letters or special characters.',
      },
      PASSWORD_RESET: {
        [FIELD_IDS.INSURANCE.ACCOUNT.EMAIL]: {
          IS_EMPTY: 'Enter an email address in the correct format, like name@example.com',
          INCORRECT_FORMAT: 'Enter an email address in the correct format, like name@example.com',
          ABOVE_MAXIMUM: `Your email address cannot be more than ${MAXIMUM_CHARACTERS.EMAIL} characters`,
          ACCOUNT_DOES_NOT_EXIST: 'Enter the email address used when creating your account',
        },
        [FIELD_IDS.INSURANCE.ACCOUNT.PASSWORD]: {
          CANNOT_USE_PREVIOUS_PASSWORD: 'You cannot enter any of your previous passwords - enter a new password',
        },
      },
    },
    DECLARATIONS: {
      [FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY]: {
        IS_EMPTY: 'Confirm that you have read and accept the confidentiality declaration',
      },
      [FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY]: {
        IS_EMPTY: 'Confirm that you have read and accept the anti-bribery and corruption declaration',
      },
      [FIELD_IDS.INSURANCE.DECLARATIONS.HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]: {
        IS_EMPTY: 'Select whether you have a code of conduct and written procedure in place',
      },
      [FIELD_IDS.INSURANCE.DECLARATIONS.WILL_EXPORT_WITH_CODE_OF_CONDUCT]: {
        IS_EMPTY: 'Select whether you will use your anti-bribery code of conduct to win or carry out the exports',
      },
      [FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS]: {
        IS_EMPTY: 'Confirm that you have read and accept the confirmation and acknowledgements',
      },
      [FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_HOW_YOUR_DATA_WILL_BE_USED]: {
        IS_EMPTY: 'Confirm that you have read and accept how your data will be used',
      },
    },
  },
} as ErrorMessage;
