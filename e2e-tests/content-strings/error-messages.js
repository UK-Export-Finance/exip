import { FIELD_IDS, PRODUCT } from '../constants';
import formatCurrency from '../cypress/e2e/helpers/format-currency';

export const MAX_COVER_AMOUNT = formatCurrency(PRODUCT.MAX_COVER_AMOUNT_IN_GBP);

export const ERROR_MESSAGES = {
  [FIELD_IDS.BUYER_COUNTRY]: 'Select where your buyer is based',
  [FIELD_IDS.VALID_BUYER_BODY]: 'Select if your buyer is a government or public sector body',
  [FIELD_IDS.VALID_EXPORTER_LOCATION]: 'Select if your company is based in the UK, Channel Islands, Isle of Man or not',
  [FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    IS_EMPTY: 'Select if 20% of your export contract value is made up from UK goods/services or not',
  },
  [FIELD_IDS.CURRENCY]: {
    IS_EMPTY: 'Select currency',
  },
  [FIELD_IDS.COUNTRY]: {
    IS_EMPTY: "Select the buyer's country",
  },
  [FIELD_IDS.CONTRACT_VALUE]: {
    IS_EMPTY: 'Enter your contract value as a whole number - do not enter decimals',
    NOT_A_NUMBER: 'Enter your contract value as a whole number - do not enter decimals',
    NOT_A_WHOLE_NUMBER: 'Enter your contract value as a whole number - do not enter decimals',
    BELOW_MINIMUM: 'Contract value must be 1 or more',
  },
  [FIELD_IDS.MAX_AMOUNT_OWED]: {
    IS_EMPTY: 'Enter your maximum amount owed as a whole number - do not enter decimals',
    NOT_A_NUMBER: 'Enter your maximum amount owed as a whole number - do not enter decimals',
    NOT_A_WHOLE_NUMBER: 'Enter your maximum amount owed as a whole number - do not enter decimals',
    BELOW_MINIMUM: 'Maximum amount owed must be 1 or more',
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    IS_EMPTY: 'Select credit period',
    BELOW_MINIMUM: 'Credit period must be 1 month or more',
    ABOVE_MAXIMUM: 'Enter Credit period of no more than 2 months',
  },
  [FIELD_IDS.PERCENTAGE_OF_COVER]: {
    IS_EMPTY: 'Select the percentage of cover you need',
  },
  [FIELD_IDS.POLICY_TYPE]: 'Select whether you need a single or multiple contract policy',
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    NOT_A_NUMBER: 'Policy length must be a number',
    NOT_A_WHOLE_NUMBER: 'Policy length must be a whole number, like 10 - you cannot enter decimal points',
    BELOW_MINIMUM: 'Policy length must be 1 month or more',
    IS_EMPTY: 'Enter how many months you need the policy for',
    ABOVE_MAXIMUM: 'Enter policy length of no more than 22 months',
  },
  [FIELD_IDS.OPTIONAL_COOKIES]: 'Select whether you want to accept analytics cookies',
  INSURANCE: {
    ELIGIBILITY: {
      [FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_AMOUNT]: {
        IS_EMPTY: `Select whether you want to be insured for ${MAX_COVER_AMOUNT} or more`,
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_PERIOD]: {
        IS_EMPTY: `Select whether you want to be insured for longer than ${PRODUCT.MAX_COVER_PERIOD_YEARS} years`,
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED]: {
        IS_EMPTY: 'Select whether there are any other parties involved, apart from you and the buyer',
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT]: {
        IS_EMPTY: "Select whether you'll be paid by a letter of credit or not",
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD]: {
        IS_EMPTY: 'Select whether you need cover for a period before you supply the goods or services to the buyer',
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER]: {
        IS_EMPTY: 'Select whether you have a UK Companies House registration number or not',
      },
      [FIELD_IDS.INSURANCE.ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE]: {
        IS_EMPTY: 'Select whether you have an account for UKEF export insurance',
      },
    },
    EXPORTER_BUSINESS: {
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT]: {
        INCORRECT_FORMAT: 'Enter your Companies House registration number in the correct format - for example, 8989898 or SC907816',
        NOT_FOUND: 'The number you entered does not match any company in Companies House - try again',
        TECHNICAL_ISSUES: 'Due to technical issues, you cannot search for your Companies House registration number right now - try again in few minutes',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_NAME]: {
        IS_EMPTY: 'Select whether you use a different trading name for this company',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_ADDRESS]: {
        IS_EMPTY: 'Select whether you use a different trading address for this company',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.WEBSITE]: {
        INCORRECT_FORMAT: 'Enter your company website in a valid format - like www.example.com',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.PHONE_NUMBER]: {
        INCORRECT_FORMAT: 'Enter a UK telephone number',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.GOODS_OR_SERVICES]: {
        IS_EMPTY: 'Enter the goods or services that your company supplies',
        ABOVE_MAXIMUM: 'Description of goods and services that your company supplies cannot be more than 1000 characters',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.YEARS_EXPORTING]: {
        IS_EMPTY: "Enter how many years you've been exporting for as a whole number - for example, 3 or 7",
        INCORRECT_FORMAT: "Enter how many years you've been exporting for as a whole number. You cannot enter letters or special characters",
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.EMPLOYEES_UK]: {
        IS_EMPTY: 'Enter how many employees you have in the UK as a whole number - for example, 100',
        INCORRECT_FORMAT: 'Enter how many employees you have in the UK as a whole number. You cannot enter letters or special characters',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.EMPLOYEES_INTERNATIONAL]: {
        IS_EMPTY: 'Enter how many employees you have worldwide, including UK, as a whole number - for example, 100',
        INCORRECT_FORMAT: 'Enter how many employees you have worldwide, including UK, as a whole number. You cannot enter  letters or special characters',
        BELOW_UK: 'Number of employees worldwide including UK must be greater or equal to the number of employees in the UK',
        BELOW_MINIMUM: 'Number of employees worldwide must be more than 0',
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
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.USING_BROKER]: {
        IS_EMPTY: 'Select whether you are using a broker to get this insurance',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.NAME]: {
        IS_EMPTY: 'Enter the name of your broker',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.ADDRESS_LINE_1]: {
        IS_EMPTY: 'Enter address line 1 for your broker',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.TOWN]: {
        IS_EMPTY: 'Enter the town or city for your broker',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.EMAIL]: {
        INCORRECT_FORMAT: 'Enter the email address for the broker in the correct format - for example name@example.com',
      },
      [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.POSTCODE]: {
        IS_EMPTY: 'Enter the postcode for your broker',
        INCORRECT_FORMAT: 'Enter the postcode for your broker in the correct format, like KT3 3QQ',
      },
    },
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: {
        [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE]: {
          IS_EMPTY: 'Select the type of policy you need',
        },
      },
      CONTRACT_POLICY: {
        [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.CREDIT_PERIOD_WITH_BUYER]: {
          IS_EMPTY: 'Enter the credit period you have with your buyer',
          ABOVE_MAXIMUM: 'The credit period you have with your buyer cannot be more than 1000 characters.',
        },
        [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.REQUESTED_START_DATE]: {
          INCORRECT_FORMAT: 'Enter a policy start date in the correct format - for example, 06 11 2023',
          NOT_A_NUMBER: 'Enter a policy start date in the correct format - for example, 06 11 2023',
          BEFORE_EARLIEST: 'You cannot enter a policy start date in the past - enter a future date',
        },
        [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.POLICY_CURRENCY_CODE]: {
          IS_EMPTY: 'Select currency you want your policy to be issued in',
        },
        SINGLE: {
          [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.SINGLE.CONTRACT_COMPLETION_DATE]: {
            INCORRECT_FORMAT: 'Enter a contract completion date in the correct format - for example, 06 11 2023',
            NOT_A_NUMBER: 'Enter a contract completion date in the correct format - for example, 06 11 2023',
            BEFORE_EARLIEST: 'You cannot enter a contract completion date in the past - enter a future date',
            AFTER_LATEST:
              "Your contract completion date is more than 2 years after your policy start date. You'll need to speak with an export finance manager, if you still want to apply",
            CANNOT_BE_THE_SAME: 'Your contract completion date cannot be the same as your policy start date',
            CANNOT_BE_BEFORE: 'Your contract completion date must be after your policy start date',
          },
          [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
            INCORRECT_FORMAT: 'Enter your contract value as a whole number - do not enter decimals',
            BELOW_MINIMUM: 'Your contract value must be 1 or more',
            ABOVE_MAXIMUM: 'The maximum the buyer will owe cannot be more than £499.999',
          },
        },
        MULTIPLE: {
          [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.MULTIPLE.TOTAL_MONTHS_OF_COVER]: {
            IS_EMPTY: 'Select how many months you want to be insured for',
          },
          [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.MULTIPLE.TOTAL_SALES_TO_BUYER]: {
            INCORRECT_FORMAT: 'Enter your estimated sales as a whole number - do not enter decimals',
            BELOW_MINIMUM: 'Your estimated sales must be 1 or more',
          },
          [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.MULTIPLE.MAXIMUM_BUYER_WILL_OWE]: {
            INCORRECT_FORMAT: 'Enter the maximum the buyer will owe as a whole number - do not enter decimals',
            BELOW_MINIMUM: 'The maximum the buyer will owe must be 1 or more',
            ABOVE_MAXIMUM: 'The maximum the buyer will owe cannot be more than £499.999',
          },
        },
      },
      ABOUT_GOODS_OR_SERVICES: {
        [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES.DESCRIPTION]: {
          IS_EMPTY: 'Enter the goods or services you will supply to the buyer',
          ABOVE_MAXIMUM: 'The goods or services you will supply to the buyer cannot be more than 1000 characters',
        },
        [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION]: {
          IS_EMPTY: 'Select the final destination of the goods or services',
        },
      },
    },
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: {
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.NAME]: {
          IS_EMPTY: "Enter the buyer's company or organisation name",
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.ADDRESS]: {
          IS_EMPTY: "Enter the buyer's address",
          ABOVE_MAXIMUM: 'Buyer address cannot be more than 300 characters',
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.WEBSITE]: {
          INCORRECT_FORMAT: "Enter the buyer's website in the correct format, like www.example.com",
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.FIRST_NAME]: {
          IS_EMPTY: "Enter the first name of your contact at the buyer's company or organisation",
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.LAST_NAME]: {
          IS_EMPTY: "Enter the last name of your contact at the buyer's company or organisation",
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.POSITION]: {
          IS_EMPTY: "Enter the position of your contact at the buyer's company or organisation",
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.EMAIL]: {
          IS_EMPTY: "Enter an email address for your contact at the buyer's company or organisation in the correct format, like name@example.com",
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION.CAN_CONTACT_BUYER]: {
          IS_EMPTY: 'Select whether we can contact the buyer about your application',
        },
      },
      WORKING_WITH_BUYER: {
        [FIELD_IDS.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER.CONNECTED_WITH_BUYER]: {
          IS_EMPTY: "Select whether you're connected with the buyer in any way",
        },
        [FIELD_IDS.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER.TRADED_WITH_BUYER]: {
          IS_EMPTY: "Select whether you've traded with this buyer before",
        },
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
            INCORRECT_FORMAT: 'Enter your email address in the correct format - for example name@example.com',
            ACCOUNT_ALREADY_EXISTS: 'There is already an account with this email address. Please sign in or reset your password',
          },
          [FIELD_IDS.INSURANCE.ACCOUNT.PASSWORD]: {
            INCORRECT_FORMAT: 'Enter a password in the correct format - for example, 14 characters long with an uppercase letter, lower case letter, number and special character',
          },
        },
      },
      SIGN_IN: {
        [FIELD_IDS.INSURANCE.ACCOUNT.EMAIL]: {
          INCORRECT: "Email address - either the email address or password you've entered is incorrect",
        },
        [FIELD_IDS.INSURANCE.ACCOUNT.PASSWORD]: {
          INCORRECT: "Password - either the email address or password you've entered is incorrect",
        },
      },
      [FIELD_IDS.INSURANCE.ACCOUNT.SECURITY_CODE]: {
        INCORRECT: 'Enter your 6-digit security code - for example, 356515. You cannot enter letters or special characters.',
      },
    },
    DECLARATIONS: {
      [FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY]: {
        IS_EMPTY: 'Confirm that you have read and accept the confidentiality declaration',
      },
      [FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY]: {
        IS_EMPTY: 'Confirm that you have read and accept the anti-bribery and corruption declaration',
      },
    },
  },
};
