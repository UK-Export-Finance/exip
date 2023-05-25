"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config2 = require("dotenv/config");
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var import_date_fns = require("date-fns");

// constants/index.ts
var import_dotenv = __toESM(require("dotenv"));

// constants/field-ids/shared/index.ts
var SHARED = {
  POLICY_TYPE: "policyType",
  SINGLE_POLICY_TYPE: "singlePolicyType",
  MULTIPLE_POLICY_TYPE: "multiplePolicyType"
};
var shared_default = SHARED;

// constants/field-ids/shared-eligibility/index.ts
var SHARED_ELIGIBILITY = {
  BUYER_COUNTRY: "buyerCountry",
  HAS_MINIMUM_UK_GOODS_OR_SERVICES: "hasMinimumUkGoodsOrServices",
  VALID_EXPORTER_LOCATION: "validExporterLocation"
};
var shared_eligibility_default = SHARED_ELIGIBILITY;

// constants/field-ids/insurance/account/index.ts
var ACCOUNT = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  PASSWORD: "password",
  SECURITY_CODE: "securityCode",
  VERIFICATION_HASH: "verificationHash",
  PASSWORD_RESET_HASH: "passwordResetHash",
  PASSWORD_RESET_EXPIRY: "passwordResetExpiry"
};
var account_default = ACCOUNT;

// constants/field-ids/insurance/policy-and-exports/index.ts
var SHARED_CONTRACT_POLICY = {
  REQUESTED_START_DATE: "requestedStartDate",
  CREDIT_PERIOD_WITH_BUYER: "creditPeriodWithBuyer",
  POLICY_CURRENCY_CODE: "policyCurrencyCode"
};
var POLICY_AND_EXPORTS = {
  ...shared_default,
  TYPE_OF_POLICY: {
    POLICY_TYPE: shared_default.POLICY_TYPE
  },
  CONTRACT_POLICY: {
    ...SHARED_CONTRACT_POLICY,
    SINGLE: {
      CONTRACT_COMPLETION_DATE: "contractCompletionDate",
      TOTAL_CONTRACT_VALUE: "totalValueOfContract"
    },
    MULTIPLE: {
      TOTAL_MONTHS_OF_COVER: "totalMonthsOfCover",
      TOTAL_SALES_TO_BUYER: "totalSalesToBuyer",
      MAXIMUM_BUYER_WILL_OWE: "maximumBuyerWillOwe"
    }
  },
  ABOUT_GOODS_OR_SERVICES: {
    DESCRIPTION: "goodsOrServicesDescription",
    FINAL_DESTINATION: "finalDestinationCountryCode"
  }
};
var policy_and_exports_default = POLICY_AND_EXPORTS;

// constants/field-ids/insurance/business/index.ts
var EXPORTER_BUSINESS = {
  COMPANY_HOUSE: {
    SEARCH: "companiesHouseSearch",
    INPUT: "companiesHouseNumber",
    COMPANY_NAME: "companyName",
    COMPANY_ADDRESS: "registeredOfficeAddress",
    COMPANY_NUMBER: "companyNumber",
    COMPANY_INCORPORATED: "dateOfCreation",
    COMPANY_SIC: "sicCodes",
    FINANCIAL_YEAR_END_DATE: "financialYearEndDate",
    REGISTED_OFFICE_ADDRESS: {
      ADDRESS_LINE_1: "addressLine1",
      ADDRESS_LINE_2: "addressLine2",
      CARE_OF: "careOf",
      LOCALITY: "locality",
      REGION: "region",
      POSTAL_CODE: "postalCode",
      COUNTRY: "country",
      PREMISES: "premises"
    }
  },
  YOUR_COMPANY: {
    YOUR_BUSINESS: "yourBusiness",
    TRADING_ADDRESS: "hasTradingAddress",
    TRADING_NAME: "hasTradingName",
    WEBSITE: "companyWebsite",
    PHONE_NUMBER: "phoneNumber"
  },
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES: "goodsOrServicesSupplied",
    YEARS_EXPORTING: "totalYearsExporting",
    EMPLOYEES_UK: "totalEmployeesUK",
    EMPLOYEES_INTERNATIONAL: "totalEmployeesInternational"
  },
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE: "financialYearEndDate",
    ESTIMATED_ANNUAL_TURNOVER: "estimatedAnnualTurnover",
    PERCENTAGE_TURNOVER: "exportsTurnoverPercentage"
  },
  BROKER: {
    HEADING: "broker",
    USING_BROKER: "isUsingBroker",
    NAME: "name",
    ADDRESS_LINE_1: "addressLine1",
    ADDRESS_LINE_2: "addressLine2",
    TOWN: "town",
    COUNTY: "county",
    POSTCODE: "postcode",
    EMAIL: "email",
    DETAILS: "whyAppointBroker"
  }
};
var business_default = EXPORTER_BUSINESS;

// constants/field-ids/insurance/your-buyer/index.ts
var YOUR_BUYER = {
  COMPANY_OR_ORGANISATION: {
    NAME: "companyOrOrganisationName",
    ADDRESS: "address",
    COUNTRY: "country",
    REGISTRATION_NUMBER: "registrationNumber",
    WEBSITE: "website",
    FIRST_NAME: "contactFirstName",
    LAST_NAME: "contactLastName",
    POSITION: "contactPosition",
    EMAIL: "contactEmail",
    CAN_CONTACT_BUYER: "canContactBuyer"
  },
  WORKING_WITH_BUYER: {
    CONNECTED_WITH_BUYER: "exporterIsConnectedWithBuyer",
    TRADED_WITH_BUYER: "exporterHasTradedWithBuyer"
  }
};
var your_buyer_default = YOUR_BUYER;

// constants/field-ids/insurance/declarations/index.ts
var DECLARATIONS = {
  AGREE_CONFIDENTIALITY: "agreeToConfidentiality",
  AGREE_ANTI_BRIBERY: "agreeToAntiBribery",
  HAS_ANTI_BRIBERY_CODE_OF_CONDUCT: "hasAntiBriberyCodeOfConduct",
  WILL_EXPORT_WITH_CODE_OF_CONDUCT: "willExportWithAntiBriberyCodeOfConduct",
  AGREE_CONFIRMATION_ACKNOWLEDGEMENTS: "agreeToConfirmationAndAcknowledgements",
  AGREE_HOW_YOUR_DATA_WILL_BE_USED: "agreeHowDataWillBeUsed"
};
var declarations_default = DECLARATIONS;

// constants/field-ids/insurance/check-your-answers/index.ts
var CHECK_YOUR_ANSWERS = {
  ELIGIBILITY: "eligibility",
  POLICY_AND_EXPORT: "policyAndExport",
  EXPORTER_BUSINESS: "business",
  BUYER: "buyer"
};
var check_your_answers_default = CHECK_YOUR_ANSWERS;

// constants/field-ids/insurance/index.ts
var INSURANCE_FIELD_IDS = {
  ELIGIBILITY: {
    ...shared_eligibility_default,
    WANT_COVER_OVER_MAX_AMOUNT: "wantCoverOverMaxAmount",
    WANT_COVER_OVER_MAX_PERIOD: "wantCoverOverMaxPeriod",
    OTHER_PARTIES_INVOLVED: "otherPartiesInvolved",
    LETTER_OF_CREDIT: "paidByLetterOfCredit",
    PRE_CREDIT_PERIOD: "needPreCreditPeriodCover",
    COMPANIES_HOUSE_NUMBER: "hasCompaniesHouseNumber",
    ACCOUNT_TO_APPLY_ONLINE: "alreadyHaveAnAccount"
  },
  SUBMISSION_DEADLINE: "submissionDeadline",
  ACCOUNT: account_default,
  POLICY_AND_EXPORTS: policy_and_exports_default,
  EXPORTER_BUSINESS: business_default,
  YOUR_BUYER: your_buyer_default,
  DECLARATIONS: declarations_default,
  CHECK_YOUR_ANSWERS: check_your_answers_default
};
var insurance_default = INSURANCE_FIELD_IDS;

// constants/field-ids/index.ts
var FIELD_IDS = {
  ...shared_default,
  ...shared_eligibility_default,
  INSURANCE: insurance_default
};

// constants/application.ts
var APPLICATION = {
  SUBMISSION_TYPE: {
    MIA: "Manual Inclusion Application"
  },
  SUBMISSION_DEADLINE_IN_MONTHS: 1,
  POLICY_TYPE: {
    SINGLE: "Single contract policy",
    MULTIPLE: "Multiple contract policy"
  },
  POLICY_AND_EXPORT: {
    TOTAL_VALUE_OF_CONTRACT: {
      MINIMUM: 1,
      MAXIMUM: 499999
    },
    TOTAL_MONTHS_OF_COVER: 12,
    MAXIMUM_BUYER_CAN_OWE: 499999
  },
  STATUS: {
    DRAFT: "Draft",
    SUBMITTED: "Submitted to UKEF"
  }
};

// constants/field-values/index.ts
var { POLICY_TYPE, POLICY_AND_EXPORT } = APPLICATION;
var FIELD_VALUES = {
  OPTIONAL_COOKIES: {
    ACCEPT: "accept",
    REJECT: "reject"
  },
  POLICY_TYPE: {
    SINGLE: POLICY_TYPE.SINGLE,
    MULTIPLE: POLICY_TYPE.MULTIPLE
  },
  POLICY_LENGTH: {
    // default multiple policy length in months
    MULTIPLE: 12
  },
  TOTAL_MONTHS_OF_COVER: Array.from(Array(POLICY_AND_EXPORT.TOTAL_MONTHS_OF_COVER).keys()),
  YES: "Yes",
  NO: "No"
};

// constants/index.ts
import_dotenv.default.config();
var ANSWERS = {
  YES: "Yes",
  NO: "No"
};
var GBP_CURRENCY_CODE = "GBP";
var EXTERNAL_API_ENDPOINTS = {
  MULESOFT_MDM_EA: {
    CURRENCY: "/currencies",
    INDUSTRY_SECTORS: "/sector-industries",
    MARKETS: "/markets"
  }
};
var DATE_5_MINUTES_FROM_NOW = () => {
  const now = /* @__PURE__ */ new Date();
  const milliseconds = 3e5;
  const future = new Date(now.setMilliseconds(milliseconds));
  return future;
};
var ACCOUNT2 = {
  EMAIL: {
    VERIFICATION_EXPIRY: () => {
      const now = /* @__PURE__ */ new Date();
      const day = now.getDate();
      const tomorrow = new Date(now.setDate(day + 1));
      return tomorrow;
    }
  },
  ENCRYPTION: {
    RANDOM_BYTES_SIZE: 32,
    STRING_TYPE: "hex",
    PBKDF2: {
      ITERATIONS: 1e4,
      DIGEST_ALGORITHM: "sha512"
    },
    PASSWORD: {
      PBKDF2: {
        KEY_LENGTH: 64
      }
    },
    OTP: {
      PBKDF2: {
        KEY_LENGTH: 128
      }
    }
  },
  PASSWORD_RESET_EXPIRY: DATE_5_MINUTES_FROM_NOW,
  // One time password
  OTP: {
    DIGITS: 6,
    VERIFICATION_EXPIRY: DATE_5_MINUTES_FROM_NOW
  },
  // JSON web token
  JWT: {
    KEY: {
      SIGNATURE: String(process.env.JWT_SIGNING_KEY),
      ENCODING: "base64",
      STRING_ENCODING: "ascii"
    },
    TOKEN: {
      EXPIRY: "8h",
      ALGORITHM: "RS256"
    },
    SESSION_EXPIRY: () => {
      const now = /* @__PURE__ */ new Date();
      const hours = 8;
      const seconds = 60 * 60 * 1e3;
      const future = new Date(now.getTime() + hours * seconds);
      return future;
    }
  },
  MAX_PASSWORD_RESET_TRIES: 6,
  /**
   * MAX_PASSWORD_RESET_TRIES_TIMEFRAME
   * Generate a date that is 24 hours ago from now
   * To be safe, we use time rather than subtracting a day.
   */
  MAX_PASSWORD_RESET_TRIES_TIMEFRAME: (/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 1)
};
var EMAIL_TEMPLATE_IDS = {
  ACCOUNT: {
    CONFIRM_EMAIL: "24022e94-171c-4044-b0ee-d22418116575",
    SECURITY_CODE: "b92650d1-9187-4510-ace2-5eec7ca7e626",
    PASSWORD_RESET: "86d5f582-e1d3-4b55-b103-50141401fd13"
  },
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: {
        CONFIRMATION: "2e9084e2-d871-4be7-85d0-0ccc1961b148",
        SEND_DOCUMENTS: {
          TRADING_HISTORY: "1ae4d77e-58d6-460e-99c0-b62bf08d8c52",
          ANTI_BRIBERY: "002e43e3-ca78-4b9c-932f-6833014bb1e4",
          ANTI_BRIBERY_AND_TRADING_HISTORY: "49753c34-24b5-4cad-a7c5-1ab32d711dfe"
        }
      },
      UNDERWRITING_TEAM: {
        NOTIFICATION_TRADING_HISTORY: "34457439-bf9c-46e3-bd05-b8732ed682fb",
        NOTIFICATION_ANTI_BRIBERY: "8be12c98-b2c7-4992-8920-925aa37b6391",
        NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY: "7f0541dd-1dae-4d51-9ebc-87d2a624f8d2",
        NO_DOCUMENTS: "65b517c6-ae86-470b-9448-194ae5ac44bb"
      }
    }
  },
  FEEDBACK: {
    INSURANCE: "4d3d7944-e894-4527-aee6-692038c84107"
  }
};
var FEEDBACK = {
  VERY_SATISFIED: "verySatisfied",
  SATISFIED: "satisfied",
  NEITHER: "neither",
  DISSATISFIED: "dissatisfied",
  VERY_DISSATISIFED: "veryDissatisfied",
  EMAIL_TEXT: {
    verySatisfied: "Very satisfied",
    satisfied: "Satisfied",
    neither: "Neither satisfied or dissatisfied",
    dissatisfied: "Dissatisfied",
    veryDissatisfied: "Very dissatisfied"
  }
};
var XLSX_CONFIG = {
  KEY: {
    ID: "field",
    COPY: "Field"
  },
  VALUE: {
    ID: "answer",
    COPY: "Answer"
  },
  COLUMN_WIDTH: 70
};
var ACCEPTED_FILE_TYPES = [".xlsx"];

// helpers/update-application/index.ts
var timestamp = async (context, applicationId) => {
  try {
    console.info("Updating application updatedAt timestamp");
    const now = /* @__PURE__ */ new Date();
    const application2 = await context.db.Application.updateOne({
      where: {
        id: applicationId
      },
      data: {
        updatedAt: now
      }
    });
    return application2;
  } catch (err) {
    console.error(err);
    throw new Error(`Updating application updatedAt timestamp ${err}`);
  }
};
var updateApplication = {
  timestamp
};
var update_application_default = updateApplication;

// schema.ts
var lists = {
  ReferenceNumber: {
    db: {
      idField: { kind: "autoincrement" }
    },
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" })
    },
    access: import_access.allowAll
  },
  Application: {
    fields: {
      createdAt: (0, import_fields.timestamp)(),
      updatedAt: (0, import_fields.timestamp)(),
      eligibility: (0, import_fields.relationship)({ ref: "Eligibility" }),
      referenceNumber: (0, import_fields.integer)({
        isIndexed: true
      }),
      submissionDeadline: (0, import_fields.timestamp)(),
      submissionDate: (0, import_fields.timestamp)(),
      submissionType: (0, import_fields.select)({
        options: [{ label: APPLICATION.SUBMISSION_TYPE.MIA, value: APPLICATION.SUBMISSION_TYPE.MIA }],
        defaultValue: APPLICATION.SUBMISSION_TYPE.MIA
      }),
      status: (0, import_fields.text)({
        validation: { isRequired: true }
      }),
      previousStatus: (0, import_fields.text)(),
      policyAndExport: (0, import_fields.relationship)({ ref: "PolicyAndExport" }),
      owner: (0, import_fields.relationship)({
        ref: "Account",
        many: false
      }),
      business: (0, import_fields.relationship)({ ref: "Business" }),
      company: (0, import_fields.relationship)({ ref: "Company" }),
      broker: (0, import_fields.relationship)({ ref: "Broker" }),
      buyer: (0, import_fields.relationship)({ ref: "Buyer" }),
      sectionReview: (0, import_fields.relationship)({ ref: "SectionReview" }),
      declaration: (0, import_fields.relationship)({ ref: "Declaration" })
    },
    hooks: {
      resolveInput: async ({ operation, resolvedData, context }) => {
        if (operation === "create") {
          try {
            console.info("Creating new application - adding default data to a new application");
            const modifiedData = resolvedData;
            const { id: newReferenceNumber } = await context.db.ReferenceNumber.createOne({
              data: {}
            });
            modifiedData.referenceNumber = newReferenceNumber;
            const { id: eligibilityId } = await context.db.Eligibility.createOne({
              data: {}
            });
            modifiedData.eligibility = {
              connect: {
                id: eligibilityId
              }
            };
            const { id: policyAndExportId } = await context.db.PolicyAndExport.createOne({
              data: {}
            });
            modifiedData.policyAndExport = {
              connect: {
                id: policyAndExportId
              }
            };
            const { id: companyId } = await context.db.Company.createOne({
              data: {}
            });
            modifiedData.company = {
              connect: {
                id: companyId
              }
            };
            await context.db.CompanyAddress.createOne({
              data: {
                company: {
                  connect: {
                    id: companyId
                  }
                }
              }
            });
            const { id: businessId } = await context.db.Business.createOne({
              data: {}
            });
            modifiedData.business = {
              connect: {
                id: businessId
              }
            };
            await context.db.BusinessContactDetail.createOne({
              data: {
                business: {
                  connect: {
                    id: businessId
                  }
                }
              }
            });
            const { id: brokerId } = await context.db.Broker.createOne({
              data: {}
            });
            modifiedData.broker = {
              connect: {
                id: brokerId
              }
            };
            const { id: buyerId } = await context.db.Buyer.createOne({
              data: {}
            });
            modifiedData.buyer = {
              connect: {
                id: buyerId
              }
            };
            const { id: sectionReviewId } = await context.db.SectionReview.createOne({
              data: {}
            });
            modifiedData.sectionReview = {
              connect: {
                id: sectionReviewId
              }
            };
            const { id: declarationId } = await context.db.Declaration.createOne({
              data: {}
            });
            modifiedData.declaration = {
              connect: {
                id: declarationId
              }
            };
            const now = /* @__PURE__ */ new Date();
            modifiedData.createdAt = now;
            modifiedData.updatedAt = now;
            modifiedData.submissionDeadline = (0, import_date_fns.addMonths)(new Date(now), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);
            modifiedData.submissionType = APPLICATION.SUBMISSION_TYPE.MIA;
            modifiedData.status = APPLICATION.STATUS.DRAFT;
            return modifiedData;
          } catch (err) {
            console.error("Error adding default data to a new application. ", { err });
            return err;
          }
        }
        return resolvedData;
      },
      afterOperation: async ({ operation, item, context }) => {
        if (operation === "create") {
          try {
            console.info("Adding application ID to relationships");
            const applicationId = item.id;
            const { referenceNumber, eligibilityId } = item;
            const { policyAndExportId, companyId, businessId, brokerId, buyerId, sectionReviewId, declarationId } = item;
            await context.db.ReferenceNumber.updateOne({
              where: { id: String(referenceNumber) },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.Eligibility.updateOne({
              where: { id: eligibilityId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.PolicyAndExport.updateOne({
              where: { id: policyAndExportId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.Company.updateOne({
              where: { id: companyId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.Business.updateOne({
              where: { id: businessId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.Broker.updateOne({
              where: { id: brokerId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.Buyer.updateOne({
              where: { id: buyerId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.SectionReview.updateOne({
              where: { id: sectionReviewId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.Declaration.updateOne({
              where: { id: declarationId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
          } catch (err) {
            console.error("Error adding an application ID to relationships ", { err });
            return err;
          }
        }
      }
    },
    access: import_access.allowAll
  },
  PolicyAndExport: {
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      policyType: (0, import_fields.select)({
        options: [
          { label: APPLICATION.POLICY_TYPE.SINGLE, value: APPLICATION.POLICY_TYPE.SINGLE },
          { label: APPLICATION.POLICY_TYPE.MULTIPLE, value: APPLICATION.POLICY_TYPE.MULTIPLE }
        ]
      }),
      requestedStartDate: (0, import_fields.timestamp)(),
      contractCompletionDate: (0, import_fields.timestamp)(),
      totalValueOfContract: (0, import_fields.integer)({
        validation: {
          min: APPLICATION.POLICY_AND_EXPORT.TOTAL_VALUE_OF_CONTRACT.MINIMUM,
          max: APPLICATION.POLICY_AND_EXPORT.TOTAL_VALUE_OF_CONTRACT.MAXIMUM
        }
      }),
      creditPeriodWithBuyer: (0, import_fields.text)(),
      policyCurrencyCode: (0, import_fields.text)({
        db: { nativeType: "VarChar(1000)" }
      }),
      totalMonthsOfCover: (0, import_fields.integer)(),
      totalSalesToBuyer: (0, import_fields.integer)(),
      maximumBuyerWillOwe: (0, import_fields.integer)(),
      goodsOrServicesDescription: (0, import_fields.text)({
        db: { nativeType: "VarChar(1000)" }
      }),
      finalDestinationCountryCode: (0, import_fields.text)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  },
  Account: (0, import_core.list)({
    fields: {
      createdAt: (0, import_fields.timestamp)(),
      updatedAt: (0, import_fields.timestamp)(),
      firstName: (0, import_fields.text)({ validation: { isRequired: true } }),
      lastName: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({ validation: { isRequired: true } }),
      salt: (0, import_fields.text)({ validation: { isRequired: true } }),
      hash: (0, import_fields.text)({ validation: { isRequired: true } }),
      // isVerified flag will only be true if the account has verified their email address.
      isVerified: (0, import_fields.checkbox)({ defaultValue: false }),
      /**
       * isBlocked flag will only be true if the account has:
       * - repeatedly attempted sign in
       * - repeatedly attempted password reset request
       */
      isBlocked: (0, import_fields.checkbox)({ defaultValue: false }),
      verificationHash: (0, import_fields.text)(),
      verificationExpiry: (0, import_fields.timestamp)(),
      otpSalt: (0, import_fields.text)(),
      otpHash: (0, import_fields.text)({
        db: { nativeType: "VarChar(256)" }
      }),
      otpExpiry: (0, import_fields.timestamp)(),
      sessionExpiry: (0, import_fields.timestamp)(),
      sessionIdentifier: (0, import_fields.text)(),
      passwordResetHash: (0, import_fields.text)({ validation: { isRequired: false } }),
      passwordResetExpiry: (0, import_fields.timestamp)({ validation: { isRequired: false } }),
      authentication: (0, import_fields.relationship)({
        ref: "Authentication"
      }),
      authenticationRetry: (0, import_fields.relationship)({
        ref: "AuthenticationRetry"
      }),
      applications: (0, import_fields.relationship)({
        ref: "Application",
        many: true
      })
    },
    access: import_access.allowAll
  }),
  AuthenticationRetry: (0, import_core.list)({
    fields: {
      account: (0, import_fields.relationship)({
        ref: "Account",
        many: true
      }),
      createdAt: (0, import_fields.timestamp)({ validation: { isRequired: true } })
    },
    access: import_access.allowAll
  }),
  Authentication: (0, import_core.list)({
    fields: {
      account: (0, import_fields.relationship)({
        ref: "Account",
        many: true
      }),
      createdAt: (0, import_fields.timestamp)(),
      salt: (0, import_fields.text)({ validation: { isRequired: true } }),
      hash: (0, import_fields.text)({ validation: { isRequired: true } })
    },
    access: import_access.allowAll
  }),
  Business: (0, import_core.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      goodsOrServicesSupplied: (0, import_fields.text)({
        db: { nativeType: "VarChar(1000)" }
      }),
      totalYearsExporting: (0, import_fields.integer)(),
      totalEmployeesUK: (0, import_fields.integer)(),
      totalEmployeesInternational: (0, import_fields.integer)(),
      estimatedAnnualTurnover: (0, import_fields.integer)(),
      exportsTurnoverPercentage: (0, import_fields.integer)(),
      businessContactDetail: (0, import_fields.relationship)({
        ref: "BusinessContactDetail.business"
      })
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  BusinessContactDetail: (0, import_core.list)({
    fields: {
      business: (0, import_fields.relationship)({ ref: "Business.businessContactDetail" }),
      firstName: (0, import_fields.text)(),
      lastName: (0, import_fields.text)(),
      email: (0, import_fields.text)(),
      position: (0, import_fields.text)()
    },
    access: import_access.allowAll
  }),
  Broker: (0, import_core.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      isUsingBroker: (0, import_fields.select)({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO }
        ],
        db: { isNullable: true }
      }),
      name: (0, import_fields.text)(),
      addressLine1: (0, import_fields.text)(),
      addressLine2: (0, import_fields.text)(),
      town: (0, import_fields.text)(),
      county: (0, import_fields.text)(),
      postcode: (0, import_fields.text)(),
      email: (0, import_fields.text)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  CompanyAddress: (0, import_core.list)({
    fields: {
      company: (0, import_fields.relationship)({ ref: "Company.registeredOfficeAddress" }),
      addressLine1: (0, import_fields.text)(),
      addressLine2: (0, import_fields.text)(),
      careOf: (0, import_fields.text)(),
      locality: (0, import_fields.text)(),
      region: (0, import_fields.text)(),
      postalCode: (0, import_fields.text)(),
      country: (0, import_fields.text)(),
      premises: (0, import_fields.text)()
    },
    access: import_access.allowAll
  }),
  Company: (0, import_core.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      registeredOfficeAddress: (0, import_fields.relationship)({ ref: "CompanyAddress.company" }),
      sicCodes: (0, import_fields.relationship)({
        ref: "CompanySicCode.company",
        many: true
      }),
      companyName: (0, import_fields.text)(),
      companyNumber: (0, import_fields.text)(),
      dateOfCreation: (0, import_fields.timestamp)(),
      hasTradingAddress: (0, import_fields.select)({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO }
        ],
        db: { isNullable: true }
      }),
      hasTradingName: (0, import_fields.select)({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO }
        ],
        db: { isNullable: true }
      }),
      companyWebsite: (0, import_fields.text)(),
      phoneNumber: (0, import_fields.text)(),
      financialYearEndDate: (0, import_fields.timestamp)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  CompanySicCode: (0, import_core.list)({
    fields: {
      company: (0, import_fields.relationship)({ ref: "Company.sicCodes" }),
      sicCode: (0, import_fields.text)(),
      industrySectorName: (0, import_fields.text)()
    },
    access: import_access.allowAll
  }),
  Buyer: (0, import_core.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      companyOrOrganisationName: (0, import_fields.text)(),
      address: (0, import_fields.text)({
        db: { nativeType: "VarChar(1000)" }
      }),
      country: (0, import_fields.relationship)({ ref: "Country" }),
      registrationNumber: (0, import_fields.text)(),
      website: (0, import_fields.text)(),
      contactFirstName: (0, import_fields.text)(),
      contactLastName: (0, import_fields.text)(),
      contactPosition: (0, import_fields.text)(),
      contactEmail: (0, import_fields.text)(),
      canContactBuyer: (0, import_fields.select)({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO }
        ]
      }),
      exporterIsConnectedWithBuyer: (0, import_fields.select)({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO }
        ]
      }),
      exporterHasTradedWithBuyer: (0, import_fields.select)({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO }
        ]
      })
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  Country: (0, import_core.list)({
    fields: {
      isoCode: (0, import_fields.text)({
        validation: { isRequired: true }
      }),
      name: (0, import_fields.text)({
        validation: { isRequired: true }
      })
    },
    access: import_access.allowAll
  }),
  Eligibility: (0, import_core.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      buyerCountry: (0, import_fields.relationship)({ ref: "Country" }),
      hasMinimumUkGoodsOrServices: (0, import_fields.checkbox)(),
      validExporterLocation: (0, import_fields.checkbox)(),
      hasCompaniesHouseNumber: (0, import_fields.checkbox)(),
      otherPartiesInvolved: (0, import_fields.checkbox)(),
      paidByLetterOfCredit: (0, import_fields.checkbox)(),
      needPreCreditPeriodCover: (0, import_fields.checkbox)(),
      wantCoverOverMaxAmount: (0, import_fields.checkbox)(),
      wantCoverOverMaxPeriod: (0, import_fields.checkbox)()
    },
    access: import_access.allowAll
  }),
  SectionReview: (0, import_core.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      eligibility: (0, import_fields.checkbox)(),
      policyAndExport: (0, import_fields.checkbox)(),
      business: (0, import_fields.checkbox)(),
      buyer: (0, import_fields.checkbox)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  Declaration: (0, import_core.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      antiBribery: (0, import_fields.relationship)({ ref: "DeclarationAntiBribery" }),
      confirmationAndAcknowledgements: (0, import_fields.relationship)({ ref: "DeclarationConfirmationAndAcknowledgement" }),
      howDataWillBeUsed: (0, import_fields.relationship)({ ref: "DeclarationHowDataWillBeUsed" }),
      agreeToConfidentiality: (0, import_fields.checkbox)(),
      agreeToAntiBribery: (0, import_fields.checkbox)(),
      hasAntiBriberyCodeOfConduct: (0, import_fields.select)({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO }
        ],
        db: { isNullable: true }
      }),
      willExportWithAntiBriberyCodeOfConduct: (0, import_fields.select)({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO }
        ],
        db: { isNullable: true }
      }),
      agreeToConfirmationAndAcknowledgements: (0, import_fields.checkbox)(),
      agreeHowDataWillBeUsed: (0, import_fields.checkbox)()
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      }
    },
    access: import_access.allowAll
  }),
  DeclarationAntiBribery: (0, import_core.list)({
    fields: {
      version: (0, import_fields.text)({
        label: "Version",
        validation: { isRequired: true }
      }),
      content: (0, import_fields_document.document)({
        formatting: true
      })
    },
    access: import_access.allowAll
  }),
  DeclarationConfirmationAndAcknowledgement: (0, import_core.list)({
    fields: {
      version: (0, import_fields.text)({
        label: "Version",
        validation: { isRequired: true }
      }),
      content: (0, import_fields_document.document)({
        formatting: true
      })
    },
    access: import_access.allowAll
  }),
  DeclarationHowDataWillBeUsed: (0, import_core.list)({
    fields: {
      version: (0, import_fields.text)({
        label: "Version",
        validation: { isRequired: true }
      }),
      content: (0, import_fields_document.document)({
        formatting: true,
        links: true
      })
    },
    access: import_access.allowAll
  }),
  Page: (0, import_core.list)({
    fields: {
      heading: (0, import_fields.text)({
        label: "Page heading"
      }),
      metaTitle: (0, import_fields.text)({
        label: "Meta title"
      }),
      content: (0, import_fields_document.document)({
        formatting: true,
        dividers: true,
        links: true
      })
    },
    ui: {
      listView: {
        initialColumns: ["heading", "id"]
      }
    },
    access: import_access.allowAll
  }),
  User: (0, import_core.list)({
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } })
    },
    ui: {
      listView: {
        initialColumns: ["name", "email"]
      }
    },
    access: import_access.allowAll
  }),
  Feedback: (0, import_core.list)({
    fields: {
      service: (0, import_fields.text)(),
      satisfaction: (0, import_fields.select)({
        options: [
          { label: FEEDBACK.VERY_SATISFIED, value: FEEDBACK.VERY_SATISFIED },
          { label: FEEDBACK.SATISFIED, value: FEEDBACK.SATISFIED },
          { label: FEEDBACK.NEITHER, value: FEEDBACK.NEITHER },
          { label: FEEDBACK.DISSATISFIED, value: FEEDBACK.DISSATISFIED },
          { label: FEEDBACK.VERY_DISSATISIFED, value: FEEDBACK.VERY_DISSATISIFED },
          { label: "", value: "" }
        ],
        db: { isNullable: true }
      }),
      improvement: (0, import_fields.text)({
        db: { nativeType: "VarChar(1200)" }
      }),
      otherComments: (0, import_fields.text)({
        db: { nativeType: "VarChar(1200)" }
      }),
      referralUrl: (0, import_fields.text)({
        db: { nativeType: "VarChar(500)" }
      }),
      product: (0, import_fields.text)(),
      createdAt: (0, import_fields.timestamp)()
    },
    access: import_access.allowAll
  })
};

// auth.ts
var import_config = require("dotenv/config");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = String(process.env.SESSION_SECRET);
if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET environment variable must be set in production");
  }
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    // If there are no items in the database, keystone will ask you to create
    // a new user, filling in these fields.
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// custom-schema/index.ts
var import_schema = require("@graphql-tools/schema");

// custom-schema/type-defs.ts
var typeDefs = `
  type AccountResponse {
    id: String
    firstName: String
    lastName: String
    email: String
    isVerified: Boolean
  }

  input AccountInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type CreateAnAccountResponse {
    success: Boolean
    id: String
    firstName: String
    lastName: String
    email: String
    verificationHash: String
  }

  # fields from registered_office_address object
  type CompaniesHouseExporterCompanyAddress {
    addressLine1: String
    addressLine2: String
    careOf: String
    locality: String
    region: String
    postalCode: String
    country: String
    premises: String
  }

  type CompaniesHouseResponse {
    companyName: String
    registeredOfficeAddress: CompanyAddress
    companyNumber: String
    dateOfCreation: String
    sicCodes: [String]
    industrySectorNames: [String]
    financialYearEndDate: DateTime
    success: Boolean
    apiError: Boolean
  }

  type CompanyAddress {
    addressLine1: String
    addressLine2: String
    careOf: String
    locality: String
    region: String
    postalCode: String
    country: String
    premises: String
  }

  input OldSicCodes {
    id: String
  }

  input CompanyAddressInput {
    addressLine1: String
    addressLine2: String
    careOf: String
    locality: String
    region: String
    postalCode: String
    country: String
    premises: String
  }

  type CompanyAndCompanyAddress {
    id: ID
    registeredOfficeAddress: CompanyAddress
    companyName: String
    companyNumber: String
    dateOfCreation: DateTime
    hasTradingAddress: String
    hasTradingName: String
    companyWebsite: String
    phoneNumber: String
  }

  input CompanyAndCompanyAddressInput {
    address: CompanyAddressInput
    sicCodes: [String]
    industrySectorNames: [String]
    companyName: String
    companyNumber: String
    dateOfCreation: DateTime
    hasTradingAddress: String
    hasTradingName: String
    companyWebsite: String
    phoneNumber: String
    financialYearEndDate: DateTime
    oldSicCodes: [OldSicCodes]
  }

  type EmailResponse {
    success: Boolean
    emailRecipient: String
  }

  type SuccessResponse {
    success: Boolean!
  }

  type AccountSignInResponse {
    accountId: String
    firstName: String
    lastName: String
    email: String
    token: String
    sessionIdentifier: String
    expires: DateTime
    success: Boolean!
    resentVerificationEmail: Boolean
    isBlocked: Boolean
  }

  type AddAndGetOtpResponse {
    success: Boolean!
    securityCode: String!
  }

  type AccountPasswordResetResponse {
    success: Boolean!
    hasBeenUsedBefore: Boolean
  }

  type AccountSendEmailPasswordResetLinkResponse {
    success: Boolean!
    isBlocked: Boolean
    accountId: String
  }

  type AccountPasswordResetTokenResponse {
    success: Boolean!
    token: String
    expired: Boolean
  }

  type VerifyAccountEmailAddressResponse {
    success: Boolean!
    accountId: String
  }

  type Mutation {
    """ create an account """
    createAnAccount(
      urlOrigin: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): CreateAnAccountResponse

    """ delete an account """
    deleteAnAccount(
      email: String!
    ): SuccessResponse

    """ verify an account's email address """
    verifyAccountEmailAddress(
      token: String!
    ): VerifyAccountEmailAddressResponse

    """ send confirm email address email """
    sendEmailConfirmEmailAddress(
      urlOrigin: String!
      accountId: String!
    ): EmailResponse

    """ validate credentials, generate and email a OTP security code """
    accountSignIn(
      urlOrigin: String!
      email: String!
      password: String!
    ): AccountSignInResponse

    """ generate and email a new OTP security code """
    accountSignInSendNewCode(
      accountId: String!
    ): AccountSignInResponse

    """ verify an account's OTP security code """
    verifyAccountSignInCode(
      accountId: String!
      securityCode: String!
    ): AccountSignInResponse

    """ add an OTP security code to an account and return"""
    addAndGetOTP(
      email: String!
    ): AddAndGetOtpResponse

    """ send email with password reset link """
    sendEmailPasswordResetLink(
      urlOrigin: String!
      email: String!
    ): AccountSendEmailPasswordResetLinkResponse

    """ reset account password """
    accountPasswordReset(
      token: String!
      password: String!
      hasBeenUsedBefore: Boolean
    ): AccountPasswordResetResponse

    """ update company and company address """
    updateCompanyAndCompanyAddress(
      companyId: ID!
      companyAddressId: ID!
      data: CompanyAndCompanyAddressInput!
    ): CompanyAndCompanyAddress

    """ delete an application by reference number """
    deleteApplicationByReferenceNumber(
      referenceNumber: Int!
    ): SuccessResponse

    """ submit an application """
    submitApplication(
      applicationId: String!
    ): SuccessResponse

    """ create and send email for insurance feedback """
    createFeedbackAndSendEmail(
      satisfaction: String
      improvement: String
      otherComments: String
      referralUrl: String
      product: String
      service: String
    ): SuccessResponse
  }

  type Query {
    """ get an account by email """
    getAccountByEmail(
      email: String!
    ): AccountResponse

    """ get an account's password reset token """
    getAccountPasswordResetToken(
      email: String!
    ): AccountPasswordResetTokenResponse

    """ verify an account's password reset token """
    verifyAccountPasswordResetToken(
      token: String!
    ): AccountPasswordResetTokenResponse

    """ get companies house information """
    getCompaniesHouseInformation(
      companiesHouseNumber: String!
    ): CompaniesHouseResponse
  }
`;
var type_defs_default = typeDefs;

// custom-resolvers/mutations/create-an-account.ts
var import_crypto2 = __toESM(require("crypto"));

// helpers/get-account-by-field/index.ts
var getAccountByField = async (context, field, value) => {
  try {
    console.info("Getting account by field/value");
    const accountsArray = await context.db.Account.findMany({
      where: {
        [field]: { equals: value }
      },
      take: 1
    });
    if (!accountsArray || !accountsArray.length || !accountsArray[0]) {
      console.info("Getting account by field - no account exists with the provided field/value");
      return false;
    }
    const account = accountsArray[0];
    return account;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting account by field/value ${err}`);
  }
};
var get_account_by_field_default = getAccountByField;

// helpers/encrypt-password/index.ts
var import_crypto = __toESM(require("crypto"));
var { ENCRYPTION } = ACCOUNT2;
var {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH }
  }
} = ENCRYPTION;
var encryptPassword = (password2) => {
  const salt = import_crypto.default.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);
  const hash = import_crypto.default.pbkdf2Sync(password2, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);
  return {
    salt,
    hash
  };
};
var encrypt_password_default = encryptPassword;

// helpers/get-full-name-string/index.ts
var getFullNameString = (account) => {
  const { firstName, lastName } = account;
  const fullName = `${firstName} ${lastName}`;
  return fullName;
};
var get_full_name_string_default = getFullNameString;

// emails/index.ts
var import_dotenv4 = __toESM(require("dotenv"));

// integrations/notify/index.ts
var import_dotenv2 = __toESM(require("dotenv"));
var import_notifications_node_client = require("notifications-node-client");
import_dotenv2.default.config();
var notifyKey = process.env.GOV_NOTIFY_API_KEY;
var notifyClient = new import_notifications_node_client.NotifyClient(notifyKey);
var notify = {
  /**
   * sendEmail
   * Send an email via Notify API
   * @param {String} Template ID
   * @param {String} Email address
   * @param {Object} Custom variables for the email template
   * @param {Buffer} File buffer
   * @returns {Object} Success flag and email recipient
   */
  sendEmail: async (templateId, sendToEmailAddress, variables, file) => {
    try {
      console.info("Calling Notify API. templateId: ", templateId);
      const personalisation = variables;
      if (file) {
        personalisation.linkToFile = await notifyClient.prepareUpload(file, { confirmEmailBeforeDownload: true });
      }
      await notifyClient.sendEmail(templateId, sendToEmailAddress, {
        personalisation,
        reference: null
      });
      return {
        success: true,
        emailRecipient: sendToEmailAddress
      };
    } catch (err) {
      console.error(err);
      throw new Error(`Calling Notify API. Unable to send email ${err}`);
    }
  }
};
var notify_default = notify;

// emails/call-notify/index.ts
var callNotify = async (templateId, emailAddress, variables, file) => {
  try {
    let emailResponse;
    if (file) {
      emailResponse = await notify_default.sendEmail(templateId, emailAddress, variables, file);
    } else {
      emailResponse = await notify_default.sendEmail(templateId, emailAddress, variables);
    }
    if (emailResponse.success) {
      return emailResponse;
    }
    throw new Error(`Sending email ${emailResponse}`);
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email ${err}`);
  }
};

// emails/confirm-email-address/index.ts
var confirmEmailAddress = async (emailAddress, urlOrigin, name, verificationHash) => {
  try {
    console.info("Sending confirm email address email");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;
    const variables = { urlOrigin, name, confirmToken: verificationHash };
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending confirm email address email ${err}`);
  }
};

// emails/security-code-email/index.ts
var securityCodeEmail = async (emailAddress, name, securityCode) => {
  try {
    console.info("Sending security code email for account sign in");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;
    const variables = { name, securityCode };
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending security code email for account sign in ${err}`);
  }
};

// emails/password-reset-link/index.ts
var passwordResetLink = async (urlOrigin, emailAddress, name, passwordResetHash) => {
  try {
    console.info("Sending email for account password reset");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.PASSWORD_RESET;
    const variables = { urlOrigin, name, passwordResetToken: passwordResetHash };
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email for account password reset ${err}`);
  }
};

// file-system/index.ts
var import_fs = require("fs");
var import_path = __toESM(require("path"));
var fileExists = (filePath) => {
  const fileBuffer = Buffer.from(filePath);
  if (fileBuffer.length) {
    return true;
  }
  return false;
};
var isAcceptedFileType = (filePath) => {
  const fileType = import_path.default.extname(filePath);
  if (ACCEPTED_FILE_TYPES.includes(fileType)) {
    return true;
  }
  return false;
};
var readFile = async (filePath) => {
  try {
    console.info(`Reading file ${filePath}`);
    const file = await import_fs.promises.readFile(filePath);
    if (fileExists(file) && isAcceptedFileType(filePath)) {
      return file;
    }
    throw new Error("Reading file - does not exist or is unaccepted file type");
  } catch (err) {
    console.error(err);
    throw new Error(`Reading file ${err}`);
  }
};
var unlink = async (filePath) => {
  try {
    console.info(`Deleting file ${filePath}`);
    const file = await readFile(filePath);
    if (file) {
      await import_fs.promises.unlink(filePath);
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting file ${err}`);
  }
};
var fileSystem = {
  fileExists,
  isAcceptedFileType,
  readFile,
  unlink
};
var file_system_default = fileSystem;

// emails/application/index.ts
var application = {
  /**
   * application.submittedEmail
   * Send "application submitted" email to an account
   * @param {Object} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  submittedEmail: async (variables) => {
    try {
      console.info("Sending application submitted email to application owner or provided business contact");
      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;
      const { emailAddress } = variables;
      const response = await callNotify(templateId, emailAddress, variables);
      return response;
    } catch (err) {
      console.error(err);
      throw new Error(`Sending application submitted email to to application owner or provided business contact ${err}`);
    }
  },
  /**
   * application.underwritingTeam
   * Read CSV file, generate a file buffer
   * Send "application submitted" email to the underwriting team with a link to CSV
   * We send a file buffer to Notify and Notify generates a unique URL that is then rendered in the email.
   * @param {Object} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  underwritingTeam: async (variables, filePath, templateId) => {
    try {
      console.info("Sending application submitted email to underwriting team");
      const emailAddress = String(process.env.UNDERWRITING_TEAM_EMAIL);
      const file = await file_system_default.readFile(filePath);
      if (file) {
        const fileBuffer = Buffer.from(file);
        const response = await callNotify(templateId, emailAddress, variables, fileBuffer);
        await file_system_default.unlink(filePath);
        return response;
      }
      throw new Error("Sending application submitted email to underwriting team - invalid file / file not found");
    } catch (err) {
      console.error(err);
      throw new Error(`Sending application submitted email to underwriting team ${err}`);
    }
  }
};

// emails/documents/index.ts
var documentsEmail = async (variables, templateId) => {
  try {
    console.info("Sending documents email");
    const { emailAddress } = variables;
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending documents email ${err}`);
  }
};

// emails/insurance-feedback-email/index.ts
var import_dotenv3 = __toESM(require("dotenv"));

// helpers/format-date/index.ts
var import_date_fns2 = require("date-fns");
var formatDate = (timestamp3, dateFormat = "d MMMM yyyy") => (0, import_date_fns2.format)(new Date(timestamp3), dateFormat);
var format_date_default = formatDate;

// helpers/map-feedback-satisfaction/index.ts
var mapFeedbackSatisfaction = (satisfaction) => FEEDBACK.EMAIL_TEXT[satisfaction];
var map_feedback_satisfaction_default = mapFeedbackSatisfaction;

// emails/insurance-feedback-email/index.ts
import_dotenv3.default.config();
var insuranceFeedbackEmail = async (variables) => {
  try {
    console.info("Sending insurance feedback email");
    const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;
    const emailAddress = process.env.FEEDBACK_EMAIL_RECIPIENT;
    const emailVariables = variables;
    emailVariables.time = "";
    emailVariables.date = "";
    if (variables.createdAt) {
      emailVariables.date = format_date_default(variables.createdAt);
      emailVariables.time = format_date_default(variables.createdAt, "HH:mm:ss");
    }
    if (variables.satisfaction) {
      emailVariables.satisfaction = map_feedback_satisfaction_default(variables.satisfaction);
    }
    const response = await callNotify(templateId, emailAddress, emailVariables);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending insurance feedback email ${err}`);
  }
};

// emails/index.ts
import_dotenv4.default.config();
var sendEmail = {
  confirmEmailAddress,
  securityCodeEmail,
  passwordResetLink,
  application,
  documentsEmail,
  insuranceFeedbackEmail
};
var emails_default = sendEmail;

// custom-resolvers/mutations/create-an-account.ts
var { EMAIL, ENCRYPTION: ENCRYPTION2 } = ACCOUNT2;
var {
  STRING_TYPE: STRING_TYPE2,
  PBKDF2: { ITERATIONS: ITERATIONS2, DIGEST_ALGORITHM: DIGEST_ALGORITHM2 },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH2 }
  }
} = ENCRYPTION2;
var createAnAccount = async (root, variables, context) => {
  console.info("Creating new account for ", variables.email);
  try {
    const { urlOrigin, firstName, lastName, email, password: password2 } = variables;
    const account = await get_account_by_field_default(context, "email", email);
    if (account) {
      console.info(`Unable to create a new account for ${variables.email} - account already exists`);
      return { success: false };
    }
    const { salt, hash } = encrypt_password_default(password2);
    const verificationHash = import_crypto2.default.pbkdf2Sync(password2, salt, ITERATIONS2, KEY_LENGTH2, DIGEST_ALGORITHM2).toString(STRING_TYPE2);
    const verificationExpiry = EMAIL.VERIFICATION_EXPIRY();
    const now = /* @__PURE__ */ new Date();
    const accountData = {
      firstName,
      lastName,
      email,
      salt,
      hash,
      verificationHash,
      verificationExpiry,
      createdAt: now,
      updatedAt: now
    };
    const creationResponse = await context.db.Account.createOne({
      data: accountData
    });
    const name = get_full_name_string_default(creationResponse);
    const emailResponse = await emails_default.confirmEmailAddress(email, urlOrigin, name, verificationHash);
    if (emailResponse.success) {
      return {
        ...creationResponse,
        verificationHash,
        success: true
      };
    }
    throw new Error(`Sending email verification for account creation ${emailResponse}`);
  } catch (err) {
    throw new Error(`Creating a new account ${err}`);
  }
};
var create_an_account_default = createAnAccount;

// helpers/get-authentication-retries-by-account-id/index.ts
var getAuthenticationRetriesByAccountId = async (context, accountId) => {
  console.info("Getting authentication retries by account ID");
  try {
    const retries = await context.db.AuthenticationRetry.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId }
          }
        }
      }
    });
    return retries;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting authentication retries ${err}`);
  }
};
var get_authentication_retries_by_account_id_default = getAuthenticationRetriesByAccountId;

// custom-resolvers/mutations/delete-an-account.ts
var deleteAnAccount = async (root, variables, context) => {
  console.info("Deleting account ", variables.email);
  try {
    const { email } = variables;
    const account = await get_account_by_field_default(context, "email", email);
    if (!account) {
      console.info(`Unable to delete account - account not found`);
      return { success: false };
    }
    const { id: accountId } = account;
    console.info("Checking authentication retry entries");
    const retries = await get_authentication_retries_by_account_id_default(context, accountId);
    if (retries.length) {
      console.info("Deleting authentication retry entries");
      const retriesArray = retries.map((retry) => ({
        id: retry.id
      }));
      await context.db.AuthenticationRetry.deleteMany({
        where: retriesArray
      });
    }
    console.info(`Deleting account ${accountId}`);
    await context.db.Account.deleteOne({
      where: {
        id: accountId
      }
    });
    return {
      success: true
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting account ${err}`);
  }
};
var delete_an_account_default = deleteAnAccount;

// custom-resolvers/mutations/verify-account-email-address.ts
var import_date_fns3 = require("date-fns");
var verifyAccountEmailAddress = async (root, variables, context) => {
  try {
    console.info("Verifying account email address");
    const account = await get_account_by_field_default(context, FIELD_IDS.INSURANCE.ACCOUNT.VERIFICATION_HASH, variables.token);
    if (account) {
      const { id } = account;
      const now = /* @__PURE__ */ new Date();
      const canActivateAccount = (0, import_date_fns3.isBefore)(now, account.verificationExpiry);
      if (!canActivateAccount) {
        console.info("Unable to verify account email - verification period has expired");
        return {
          expired: true,
          success: false,
          accountId: id
        };
      }
      await context.db.Account.updateOne({
        where: { id: account.id },
        data: {
          isVerified: true,
          verificationHash: "",
          verificationExpiry: null
        }
      });
      return {
        success: true,
        accountId: id,
        emailRecipient: account.email
      };
    }
    console.info("Unable to verify account email - no account found");
    return {
      success: false
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying account email address ${err}`);
  }
};
var verify_account_email_address_default = verifyAccountEmailAddress;

// helpers/get-account-by-id/index.ts
var getAccountById = async (context, accountId) => {
  try {
    console.info("Getting account by ID");
    const account = await context.db.Account.findOne({
      where: {
        id: accountId
      }
    });
    return account;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting account by ID ${err}`);
  }
};
var get_account_by_id_default = getAccountById;

// helpers/send-email-confirm-email-address/index.ts
var send = async (context, urlOrigin, accountId) => {
  try {
    console.info("Sending email verification");
    const account = await get_account_by_id_default(context, accountId);
    if (!account) {
      console.info("Sending email verification - no account exists with the provided account ID");
      return {
        success: false
      };
    }
    const { email, verificationHash } = account;
    const name = get_full_name_string_default(account);
    const emailResponse = await emails_default.confirmEmailAddress(email, urlOrigin, name, verificationHash);
    if (emailResponse.success) {
      return emailResponse;
    }
    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${emailResponse}`);
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${err}`);
  }
};
var confirmEmailAddressEmail = {
  send
};
var send_email_confirm_email_address_default = confirmEmailAddressEmail;

// custom-resolvers/mutations/send-email-confirm-email-address.ts
var sendEmailConfirmEmailAddressMutation = async (root, variables, context) => {
  try {
    const emailResponse = await send_email_confirm_email_address_default.send(context, variables.urlOrigin, variables.accountId);
    if (emailResponse.success) {
      return emailResponse;
    }
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${emailResponse}`);
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${err}`);
  }
};
var send_email_confirm_email_address_default2 = sendEmailConfirmEmailAddressMutation;

// custom-resolvers/mutations/account-sign-in.ts
var import_date_fns5 = require("date-fns");

// helpers/get-password-hash/index.ts
var import_crypto3 = __toESM(require("crypto"));
var { ENCRYPTION: ENCRYPTION3 } = ACCOUNT2;
var {
  STRING_TYPE: STRING_TYPE3,
  PBKDF2: { ITERATIONS: ITERATIONS3, DIGEST_ALGORITHM: DIGEST_ALGORITHM3 },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH3 }
  }
} = ENCRYPTION3;
var getPasswordHash = (password2, salt) => {
  const hash = import_crypto3.default.pbkdf2Sync(password2, salt, ITERATIONS3, KEY_LENGTH3, DIGEST_ALGORITHM3).toString(STRING_TYPE3);
  return hash;
};
var get_password_hash_default = getPasswordHash;

// helpers/is-valid-account-password/index.ts
var isValidAccountPassword = (password2, salt, hash) => {
  console.info("Validating account password");
  const hashVerify = get_password_hash_default(password2, salt);
  if (hash === hashVerify) {
    console.info("Valid account password");
    return true;
  }
  console.info("Invalid account password");
  return false;
};
var is_valid_account_password_default = isValidAccountPassword;

// helpers/generate-otp/index.ts
var import_crypto4 = __toESM(require("crypto"));
var import_otplib = require("otplib");
var { ENCRYPTION: ENCRYPTION4, OTP } = ACCOUNT2;
var {
  RANDOM_BYTES_SIZE: RANDOM_BYTES_SIZE2,
  STRING_TYPE: STRING_TYPE4,
  PBKDF2: { ITERATIONS: ITERATIONS4, DIGEST_ALGORITHM: DIGEST_ALGORITHM4 },
  OTP: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH4 }
  }
} = ENCRYPTION4;
var generateOtp = () => {
  try {
    console.info("Generating OTP");
    const salt = import_crypto4.default.randomBytes(RANDOM_BYTES_SIZE2).toString(STRING_TYPE4);
    import_otplib.authenticator.options = { digits: OTP.DIGITS };
    const securityCode = import_otplib.authenticator.generate(salt);
    const hash = import_crypto4.default.pbkdf2Sync(securityCode, salt, ITERATIONS4, KEY_LENGTH4, DIGEST_ALGORITHM4).toString(STRING_TYPE4);
    const expiry = OTP.VERIFICATION_EXPIRY();
    return {
      securityCode,
      salt,
      hash,
      expiry
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Error generating OTP ${err}`);
  }
};
var generate = {
  otp: generateOtp
};
var generate_otp_default = generate;

// helpers/generate-otp-and-update-account/index.ts
var generateOTPAndUpdateAccount = async (context, accountId) => {
  try {
    console.info("Adding OTP to an account");
    const otp = generate_otp_default.otp();
    const { securityCode, salt, hash, expiry } = otp;
    const accountUpdate = {
      otpSalt: salt,
      otpHash: hash,
      otpExpiry: expiry
    };
    await context.db.Account.updateOne({
      where: { id: accountId },
      data: accountUpdate
    });
    return {
      success: true,
      securityCode
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Adding OTP to an account ${err}`);
  }
};
var generate_otp_and_update_account_default = generateOTPAndUpdateAccount;

// helpers/create-authentication-retry-entry/index.ts
var createAuthenticationRetryEntry = async (context, accountId) => {
  try {
    console.info("Creating account authentication retry entry");
    const now = /* @__PURE__ */ new Date();
    const response = await context.db.AuthenticationRetry.createOne({
      data: {
        account: {
          connect: {
            id: accountId
          }
        },
        createdAt: now
      }
    });
    if (response.id) {
      return {
        success: true
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error(`Creating account authentication retry entry ${err}`);
    throw new Error(`${err}`);
  }
};
var create_authentication_retry_entry_default = createAuthenticationRetryEntry;

// helpers/should-block-account/index.ts
var import_date_fns4 = require("date-fns");
var { MAX_PASSWORD_RESET_TRIES, MAX_PASSWORD_RESET_TRIES_TIMEFRAME } = ACCOUNT2;
var shouldBlockAccount = async (context, accountId) => {
  console.info(`Checking account ${accountId} authentication retries`);
  try {
    const retries = await get_authentication_retries_by_account_id_default(context, accountId);
    const now = /* @__PURE__ */ new Date();
    const retriesInTimeframe = [];
    retries.forEach((retry) => {
      const retryDate = new Date(retry.createdAt);
      const isWithinLast24Hours = (0, import_date_fns4.isWithinInterval)(retryDate, {
        start: MAX_PASSWORD_RESET_TRIES_TIMEFRAME,
        end: now
      });
      if (isWithinLast24Hours) {
        retriesInTimeframe.push(retry.id);
      }
    });
    if (retriesInTimeframe.length >= MAX_PASSWORD_RESET_TRIES) {
      console.info(`Account ${accountId} authentication retries exceeds the threshold`);
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error(`Checking account authentication retries  ${err}`);
  }
};
var should_block_account_default = shouldBlockAccount;

// helpers/block-account/index.ts
var blockAccount = async (context, accountId) => {
  console.info(`Blocking account ${accountId}`);
  try {
    const result = await context.db.Account.updateOne({
      where: { id: accountId },
      data: { isBlocked: true }
    });
    if (result.id) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error(`Blocking account ${err}`);
  }
};
var block_account_default = blockAccount;

// custom-resolvers/mutations/account-sign-in.ts
var { EMAIL: EMAIL2 } = ACCOUNT2;
var accountSignIn = async (root, variables, context) => {
  try {
    console.info("Signing in account");
    const { urlOrigin, email, password: password2 } = variables;
    const accountData = await get_account_by_field_default(context, FIELD_IDS.INSURANCE.ACCOUNT.EMAIL, email);
    if (!accountData) {
      console.info("Unable to validate account - no account found");
      return { success: false };
    }
    const account = accountData;
    const { id: accountId } = account;
    const newRetriesEntry = await create_authentication_retry_entry_default(context, accountId);
    if (!newRetriesEntry.success) {
      return { success: false };
    }
    const needToBlockAccount = await should_block_account_default(context, accountId);
    if (needToBlockAccount) {
      const blocked = await block_account_default(context, accountId);
      if (blocked) {
        return {
          success: false,
          isBlocked: true,
          accountId
        };
      }
      return { success: false };
    }
    if (is_valid_account_password_default(password2, account.salt, account.hash)) {
      if (!account.isVerified) {
        console.info("Unable to sign in account - account has not been verified yet");
        const now = /* @__PURE__ */ new Date();
        const verificationHasExpired = (0, import_date_fns5.isAfter)(now, account.verificationExpiry);
        if (account.verificationHash && !verificationHasExpired) {
          console.info("Account has an unexpired verification token - resetting verification expiry");
          const accountUpdate = {
            verificationExpiry: EMAIL2.VERIFICATION_EXPIRY()
          };
          await context.db.Account.updateOne({
            where: { id: accountId },
            data: accountUpdate
          });
          console.info("Account has an unexpired verification token - sending verification email");
          const emailResponse2 = await send_email_confirm_email_address_default.send(context, urlOrigin, accountId);
          if (emailResponse2.success) {
            return {
              success: false,
              resentVerificationEmail: true,
              accountId
            };
          }
          return { success: false };
        }
        console.info("Unable to sign in account - account has not been verified");
        return { success: false };
      }
      const { securityCode } = await generate_otp_and_update_account_default(context, accountId);
      const name = get_full_name_string_default(account);
      const emailResponse = await emails_default.securityCodeEmail(email, name, securityCode);
      if (emailResponse.success) {
        return {
          ...emailResponse,
          accountId
        };
      }
      return {
        success: false
      };
    }
    return { success: false };
  } catch (err) {
    console.error(err);
    throw new Error(`Validating password or sending email for account sign in (accountSignIn mutation) ${err}`);
  }
};
var account_sign_in_default = accountSignIn;

// custom-resolvers/mutations/account-sign-in-new-code.ts
var accountSignInSendNewCode = async (root, variables, context) => {
  try {
    console.info("Generating and sending new sign in code for account");
    const { accountId } = variables;
    const account = await get_account_by_id_default(context, accountId);
    if (!account) {
      console.info("Unable to validate account - no account found");
      return { success: false };
    }
    const { securityCode } = await generate_otp_and_update_account_default(context, account.id);
    const { email } = account;
    const name = get_full_name_string_default(account);
    const emailResponse = await emails_default.securityCodeEmail(email, name, securityCode);
    if (emailResponse.success) {
      return {
        ...emailResponse,
        accountId: account.id
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Generating and sending new sign in code for account (accountSignInSendNewCode mutation) ${err}`);
  }
};
var account_sign_in_new_code_default = accountSignInSendNewCode;

// custom-resolvers/mutations/verify-account-sign-in-code.ts
var import_date_fns6 = require("date-fns");

// helpers/is-valid-otp/index.ts
var import_crypto5 = __toESM(require("crypto"));
var { ENCRYPTION: ENCRYPTION5 } = ACCOUNT2;
var {
  STRING_TYPE: STRING_TYPE5,
  PBKDF2: { ITERATIONS: ITERATIONS5, DIGEST_ALGORITHM: DIGEST_ALGORITHM5 },
  OTP: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH5 }
  }
} = ENCRYPTION5;
var isValidOTP = (securityCode, otpSalt, otpHash) => {
  try {
    console.info("Validating OTP");
    const hashVerify = import_crypto5.default.pbkdf2Sync(securityCode, otpSalt, ITERATIONS5, KEY_LENGTH5, DIGEST_ALGORITHM5).toString(STRING_TYPE5);
    if (otpHash === hashVerify) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw new Error(`Error validating OTP ${err}`);
  }
};
var is_valid_otp_default = isValidOTP;

// helpers/delete-authentication-retries/index.ts
var deleteAuthenticationRetries = async (context, accountId) => {
  console.info(`Deleting authentication retries for account ${accountId}`);
  try {
    const retries = await get_authentication_retries_by_account_id_default(context, accountId);
    const retryIds = retries.map((obj) => ({
      id: obj.id
    }));
    const result = await context.db.AuthenticationRetry.deleteMany({
      where: retryIds
    });
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting authentication retries ${err}`);
  }
};
var delete_authentication_retries_default = deleteAuthenticationRetries;

// helpers/create-jwt/index.ts
var import_crypto6 = __toESM(require("crypto"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var {
  ENCRYPTION: { RANDOM_BYTES_SIZE: RANDOM_BYTES_SIZE3, STRING_TYPE: STRING_TYPE6 },
  JWT: {
    KEY: { SIGNATURE, ENCODING, STRING_ENCODING },
    TOKEN: { EXPIRY, ALGORITHM }
  }
} = ACCOUNT2;
var PRIV_KEY = Buffer.from(SIGNATURE, ENCODING).toString(STRING_ENCODING);
var createJWT = (accountId) => {
  const sessionIdentifier = import_crypto6.default.randomBytes(RANDOM_BYTES_SIZE3).toString(STRING_TYPE6);
  const expiresIn = EXPIRY;
  const payload = {
    sub: accountId,
    iat: Date.now(),
    sessionIdentifier
  };
  const signedToken = import_jsonwebtoken.default.sign(payload, PRIV_KEY, { expiresIn, algorithm: ALGORITHM });
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
    sessionIdentifier
  };
};
var create = {
  JWT: createJWT
};
var create_jwt_default = create;

// custom-resolvers/mutations/verify-account-sign-in-code.ts
var {
  JWT: { SESSION_EXPIRY }
} = ACCOUNT2;
var verifyAccountSignInCode = async (root, variables, context) => {
  try {
    console.info("Verifying account sign in code");
    const { accountId, securityCode } = variables;
    const account = await get_account_by_id_default(context, accountId);
    if (!account) {
      console.info("Unable to verify account sign in code - no account exists with the provided ID");
      return {
        success: false
      };
    }
    if (!account.otpSalt || !account.otpHash || !account.otpExpiry) {
      console.info("Unable to verify account sign in code - no OTP available for this account");
      return {
        success: false
      };
    }
    const { otpSalt, otpHash, otpExpiry } = account;
    const now = /* @__PURE__ */ new Date();
    const hasExpired = (0, import_date_fns6.isAfter)(now, otpExpiry);
    if (hasExpired) {
      console.info("Unable to verify account sign in code - verification period has expired");
      return {
        success: false,
        expired: true
      };
    }
    const isValid = otpSalt && otpHash && is_valid_otp_default(securityCode, otpSalt, otpHash);
    if (isValid) {
      await delete_authentication_retries_default(context, accountId);
      const jwt = create_jwt_default.JWT(accountId);
      const { sessionIdentifier } = jwt;
      const accountUpdate = {
        sessionIdentifier,
        sessionExpiry: SESSION_EXPIRY(),
        otpSalt: "",
        otpHash: "",
        otpExpiry: null
      };
      await context.db.Account.updateOne({
        where: { id: accountId },
        data: accountUpdate
      });
      return {
        success: true,
        accountId: account.id,
        lastName: account.lastName,
        firstName: account.firstName,
        email: account.email,
        ...jwt,
        expires: accountUpdate.sessionExpiry
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying account sign in code and generating JWT (verifyAccountSignInCode mutation) ${err}`);
  }
};
var verify_account_sign_in_code_default = verifyAccountSignInCode;

// custom-resolvers/mutations/add-and-get-OTP.ts
var addAndGetOTP = async (root, variables, context) => {
  try {
    console.info("Adding OTP to an account");
    const { email } = variables;
    const account = await get_account_by_field_default(context, FIELD_IDS.INSURANCE.ACCOUNT.EMAIL, email);
    if (!account) {
      console.info("Unable to generate and add OTP to an account - no account found");
      return { success: false };
    }
    const { securityCode } = await generate_otp_and_update_account_default(context, account.id);
    return {
      success: true,
      securityCode
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Adding OTP to an account (addAndGetOTP mutation) ${err}`);
  }
};
var add_and_get_OTP_default = addAndGetOTP;

// custom-resolvers/mutations/send-email-password-reset-link.ts
var import_crypto7 = __toESM(require("crypto"));
var {
  ENCRYPTION: {
    STRING_TYPE: STRING_TYPE7,
    PBKDF2: { ITERATIONS: ITERATIONS6, DIGEST_ALGORITHM: DIGEST_ALGORITHM6 },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH: KEY_LENGTH6 }
    }
  }
} = ACCOUNT2;
var sendEmailPasswordResetLink = async (root, variables, context) => {
  try {
    console.info("Received a password reset request - checking account");
    const { urlOrigin, email } = variables;
    const account = await get_account_by_field_default(context, FIELD_IDS.INSURANCE.ACCOUNT.EMAIL, email);
    if (!account) {
      console.info("Unable to check account and send password reset email - no account found");
      return { success: false };
    }
    const { id: accountId } = account;
    const newRetriesEntry = await create_authentication_retry_entry_default(context, accountId);
    if (!newRetriesEntry.success) {
      return { success: false };
    }
    const needToBlockAccount = await should_block_account_default(context, accountId);
    if (needToBlockAccount) {
      try {
        const blocked = await block_account_default(context, accountId);
        if (blocked) {
          return {
            success: false,
            isBlocked: true,
            accountId
          };
        }
      } catch (err) {
        return { success: false };
      }
    }
    console.info("Generating password reset hash");
    const passwordResetHash = import_crypto7.default.pbkdf2Sync(email, account.salt, ITERATIONS6, KEY_LENGTH6, DIGEST_ALGORITHM6).toString(STRING_TYPE7);
    const accountUpdate = {
      passwordResetHash,
      passwordResetExpiry: ACCOUNT2.PASSWORD_RESET_EXPIRY()
    };
    console.info("Updating account for password reset");
    await context.db.Account.updateOne({
      where: { id: accountId },
      data: accountUpdate
    });
    console.info("Sending password reset email");
    const name = get_full_name_string_default(account);
    const emailResponse = await emails_default.passwordResetLink(urlOrigin, email, name, passwordResetHash);
    if (emailResponse.success) {
      return emailResponse;
    }
    return { success: false };
  } catch (err) {
    console.error(err);
    throw new Error(`Checking account and sending password reset email (sendEmailPasswordResetLink mutation) ${err}`);
  }
};
var send_email_password_reset_link_default = sendEmailPasswordResetLink;

// custom-resolvers/mutations/account-password-reset.ts
var import_date_fns7 = require("date-fns");

// helpers/account-has-used-password-before/index.ts
var hasAccountUsedPasswordBefore = async (context, accountId, newPassword) => {
  console.info("Checking if an account has used a password before");
  try {
    let usedBefore = false;
    const previousHashes = await context.db.Authentication.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId }
          }
        }
      }
    });
    if (previousHashes.length) {
      previousHashes.forEach((previous) => {
        const newHashPreviousSalt = get_password_hash_default(newPassword, previous.salt);
        if (newHashPreviousSalt === previous.hash) {
          usedBefore = true;
        }
      });
    }
    return usedBefore;
  } catch (err) {
    console.error(err);
    throw new Error(`Checking if an account has used a password before ${err}`);
  }
};
var account_has_used_password_before_default = hasAccountUsedPasswordBefore;

// helpers/create-authentication-entry/index.ts
var createAuthenticationEntry = async (context, entry) => {
  console.info("Creating authentication entry");
  try {
    const result = await context.db.Authentication.createOne({
      data: {
        ...entry,
        createdAt: /* @__PURE__ */ new Date()
      }
    });
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(`Creating authentication entry ${err}`);
  }
};
var create_authentication_entry_default = createAuthenticationEntry;

// custom-resolvers/mutations/account-password-reset.ts
var accountPasswordReset = async (root, variables, context) => {
  console.info("Resetting account password");
  try {
    const { token, password: newPassword } = variables;
    const account = await get_account_by_field_default(context, FIELD_IDS.INSURANCE.ACCOUNT.PASSWORD_RESET_HASH, token);
    if (!account) {
      console.info("Unable to reset account password - account does not exist");
      return { success: false };
    }
    const { isBlocked } = account;
    if (isBlocked) {
      console.info("Unable to reset account password - account is blocked");
      return { success: false };
    }
    const { id: accountId, passwordResetHash, passwordResetExpiry, salt: currentSalt, hash: currentHash } = account;
    if (!passwordResetHash || !passwordResetExpiry) {
      console.info("Unable to reset account password - reset hash or expiry does not exist");
      return { success: false };
    }
    const now = /* @__PURE__ */ new Date();
    const hasExpired = (0, import_date_fns7.isAfter)(now, passwordResetExpiry);
    if (hasExpired) {
      console.info("Unable to reset account password - verification period has expired");
      return {
        success: false,
        expired: true
      };
    }
    const newHashCurrentSalt = get_password_hash_default(newPassword, currentSalt);
    const passwordIsTheSame = newHashCurrentSalt === currentHash;
    if (passwordIsTheSame) {
      console.info("Unable to reset account password - provided password is the same");
      return {
        success: false,
        hasBeenUsedBefore: true
      };
    }
    const usedPasswordBefore = await account_has_used_password_before_default(context, accountId, newPassword);
    if (usedPasswordBefore) {
      console.info("Unable to reset account password - provided password has been used before");
      return {
        success: false,
        hasBeenUsedBefore: true
      };
    }
    const authEntry = {
      account: {
        connect: {
          id: accountId
        }
      },
      salt: currentSalt,
      hash: currentHash
    };
    await create_authentication_entry_default(context, authEntry);
    const { salt: newSalt, hash: newHash } = encrypt_password_default(newPassword);
    const accountUpdate = {
      salt: newSalt,
      hash: newHash,
      passwordResetHash: "",
      passwordResetExpiry: null
    };
    await context.db.Account.updateOne({
      where: {
        id: accountId
      },
      data: accountUpdate
    });
    return {
      success: true
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Resetting account password ${err}`);
  }
};
var account_password_reset_default = accountPasswordReset;

// custom-resolvers/mutations/delete-application-by-refrence-number.ts
var deleteApplicationByReferenceNumber = async (root, variables, context) => {
  try {
    console.info("Deleting application by reference number");
    const { referenceNumber } = variables;
    const application2 = await context.db.Application.findMany({
      where: {
        referenceNumber: { equals: referenceNumber }
      }
    });
    const { id } = application2[0];
    const deleteResponse = await context.db.Application.deleteOne({
      where: {
        id
      }
    });
    if (deleteResponse.id) {
      return {
        success: true
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting application by reference number (DeleteApplicationByReferenceNumber mutation) ${err}`);
  }
};
var delete_application_by_refrence_number_default = deleteApplicationByReferenceNumber;

// helpers/map-sic-codes/index.ts
var mapSicCodes = (company, sicCodes, industrySectorNames) => {
  const mapped = [];
  if (!sicCodes || !sicCodes.length) {
    return mapped;
  }
  sicCodes.forEach((code, index) => {
    let industrySectorName = "";
    if (industrySectorNames && industrySectorNames[index]) {
      industrySectorName = industrySectorNames[index];
    }
    const codeToAdd = {
      sicCode: code,
      industrySectorName,
      company: {
        connect: {
          id: company.id
        }
      }
    };
    mapped.push(codeToAdd);
  });
  return mapped;
};

// custom-resolvers/mutations/update-company-and-company-address.ts
var updateCompanyAndCompanyAddress = async (root, variables, context) => {
  try {
    console.info("Updating application company and company address for ", variables.companyId);
    const { address, sicCodes, industrySectorNames, oldSicCodes, ...company } = variables.data;
    const updatedCompany = await context.db.Company.updateOne({
      where: { id: variables.companyId },
      data: company
    });
    await context.db.CompanyAddress.updateOne({
      where: { id: variables.companyAddressId },
      data: address
    });
    const mappedSicCodes = mapSicCodes(updatedCompany, sicCodes, industrySectorNames);
    if (company && oldSicCodes && oldSicCodes.length) {
      await context.db.CompanySicCode.deleteMany({
        where: oldSicCodes
      });
    }
    if (mappedSicCodes && mappedSicCodes.length) {
      mappedSicCodes.forEach(async (sicCodeObj) => {
        await context.db.CompanySicCode.createOne({
          data: sicCodeObj
        });
      });
    }
    return {
      id: variables.companyId
    };
  } catch (err) {
    console.error("Error updating application - company and company address", { err });
    throw new Error(`Updating application - company and company address ${err}`);
  }
};
var update_company_and_company_address_default = updateCompanyAndCompanyAddress;

// custom-resolvers/mutations/submit-application.ts
var import_date_fns8 = require("date-fns");

// helpers/get-country-by-field/index.ts
var getCountryByField = async (context, field, value) => {
  try {
    console.info("Getting country by field/value");
    const countriesArray = await context.db.Country.findMany({
      where: {
        [field]: { equals: value }
      },
      take: 1
    });
    if (!countriesArray || !countriesArray.length || !countriesArray[0]) {
      console.info("Getting country by field - no country exists with the provided field/value");
      return false;
    }
    const country = countriesArray[0];
    return country;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting country by field/value ${err}`);
  }
};
var get_country_by_field_default = getCountryByField;

// helpers/get-populated-application/index.ts
var generateErrorMessage = (section, applicationId) => `Getting populated application - no ${section} found for application ${applicationId}`;
var getPopulatedApplication = async (context, application2) => {
  console.info("Getting populated application");
  const { eligibilityId, ownerId, policyAndExportId, companyId, businessId, brokerId, buyerId, declarationId } = application2;
  const eligibility = await context.db.Eligibility.findOne({
    where: { id: eligibilityId }
  });
  if (!eligibility) {
    throw new Error(generateErrorMessage("eligibility", application2.id));
  }
  const account = await get_account_by_id_default(context, ownerId);
  if (!account) {
    throw new Error(generateErrorMessage("account", application2.id));
  }
  const policyAndExport = await context.db.PolicyAndExport.findOne({
    where: { id: policyAndExportId }
  });
  if (!policyAndExport) {
    throw new Error(generateErrorMessage("policyAndExport", application2.id));
  }
  const finalDestinationCountry = await get_country_by_field_default(context, "isoCode", policyAndExport.finalDestinationCountryCode);
  const populatedPolicyAndExport = {
    ...policyAndExport,
    finalDestinationCountryCode: finalDestinationCountry
  };
  const company = await context.db.Company.findOne({
    where: { id: companyId }
  });
  if (!company) {
    throw new Error(generateErrorMessage("company", application2.id));
  }
  const companySicCodes = await context.db.CompanySicCode.findMany({
    where: {
      company: {
        id: { equals: company.id }
      }
    }
  });
  if (!company) {
    throw new Error(generateErrorMessage("companySicCode", application2.id));
  }
  const companyAddress = await context.db.CompanyAddress.findOne({
    where: { id: company.registeredOfficeAddressId }
  });
  const populatedCompany = {
    ...company,
    registeredOfficeAddress: companyAddress
  };
  const business = await context.db.Business.findOne({
    where: { id: businessId }
  });
  if (!business) {
    throw new Error(generateErrorMessage("business", application2.id));
  }
  const businessContactDetail = await context.db.BusinessContactDetail.findOne({
    where: { id: business?.businessContactDetailId }
  });
  if (!businessContactDetail) {
    throw new Error(generateErrorMessage("businessContactDetail", application2.id));
  }
  const populatedBusiness = {
    ...business,
    businessContactDetail
  };
  const broker = await context.db.Broker.findOne({
    where: { id: brokerId }
  });
  if (!broker) {
    throw new Error(generateErrorMessage("broker", application2.id));
  }
  const buyer = await context.db.Buyer.findOne({
    where: { id: buyerId }
  });
  if (!buyer) {
    throw new Error(generateErrorMessage("buyer", application2.id));
  }
  const buyerCountry = await context.db.Country.findOne({
    where: { id: buyer.countryId }
  });
  if (!buyerCountry) {
    throw new Error(generateErrorMessage("populated buyer", application2.id));
  }
  const populatedBuyer = {
    ...buyer,
    country: buyerCountry
  };
  const declaration = await context.db.Declaration.findOne({
    where: { id: declarationId }
  });
  if (!declaration) {
    throw new Error(generateErrorMessage("declaration", application2.id));
  }
  const populatedApplication = {
    ...application2,
    eligibility: {
      ...eligibility,
      buyerCountry
    },
    policyAndExport: populatedPolicyAndExport,
    owner: account,
    company: populatedCompany,
    companySicCodes,
    business: populatedBusiness,
    broker,
    buyer: populatedBuyer,
    declaration
  };
  return populatedApplication;
};
var get_populated_application_default = getPopulatedApplication;

// helpers/get-application-submitted-email-template-ids/index.ts
var {
  APPLICATION: {
    SUBMISSION: { EXPORTER, UNDERWRITING_TEAM }
  }
} = EMAIL_TEMPLATE_IDS;
var getApplicationSubmittedEmailTemplateIds = (application2) => {
  const { buyer, declaration } = application2;
  const templateIds = {
    underwritingTeam: "",
    account: ""
  };
  const doesNotHaveAntiBriberyCodeOfConduct = declaration.hasAntiBriberyCodeOfConduct === ANSWERS.NO;
  const hasNotTradedWithBuyer = buyer.exporterHasTradedWithBuyer === ANSWERS.NO;
  if (doesNotHaveAntiBriberyCodeOfConduct && hasNotTradedWithBuyer) {
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NO_DOCUMENTS;
    return templateIds;
  }
  const hasAntiBriberyCodeOfConduct = declaration.hasAntiBriberyCodeOfConduct === ANSWERS.YES;
  if (hasAntiBriberyCodeOfConduct) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY;
  }
  const hasTradedWithBuyer = buyer.exporterHasTradedWithBuyer === ANSWERS.YES;
  if (hasTradedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_TRADING_HISTORY;
  }
  if (hasAntiBriberyCodeOfConduct && hasTradedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY;
  }
  return templateIds;
};
var get_application_submitted_email_template_ids_default = getApplicationSubmittedEmailTemplateIds;

// helpers/is-owner-same-as-business-contact/index.ts
var isOwnerSameAsBusinessContact = (ownerEmail, contactEmail) => ownerEmail === contactEmail;
var is_owner_same_as_business_contact_default = isOwnerSameAsBusinessContact;

// emails/send-application-submitted-emails/index.ts
var send2 = async (application2, xlsxPath) => {
  try {
    const { referenceNumber, owner, company, buyer, policyAndExport, business } = application2;
    const { businessContactDetail } = business;
    const { email } = owner;
    const sharedEmailVars = {
      referenceNumber,
      buyerName: buyer.companyOrOrganisationName,
      buyerLocation: buyer.country?.name,
      companyName: company.companyName,
      requestedStartDate: format_date_default(policyAndExport.requestedStartDate)
    };
    const sendEmailVars = {
      ...sharedEmailVars,
      name: get_full_name_string_default(owner),
      emailAddress: email
    };
    const sendContactEmailVars = {
      ...sharedEmailVars,
      name: get_full_name_string_default(businessContactDetail),
      emailAddress: businessContactDetail.email
    };
    const isOwnerSameAsContact = is_owner_same_as_business_contact_default(email, businessContactDetail.email);
    console.info("Sending application submitted email to application account owner: ", sendEmailVars.emailAddress);
    const accountSubmittedResponse = await emails_default.application.submittedEmail(sendEmailVars);
    if (!accountSubmittedResponse.success) {
      throw new Error("Sending application submitted email to owner/account");
    }
    if (!isOwnerSameAsContact) {
      console.info("Sending application submitted email to business contact email: ", sendContactEmailVars.emailAddress);
      const contactSubmittedResponse = await emails_default.application.submittedEmail(sendContactEmailVars);
      if (!contactSubmittedResponse.success) {
        throw new Error("Sending application submitted email to contact");
      }
    }
    const templateIds = get_application_submitted_email_template_ids_default(application2);
    const underwritingTeamSubmittedResponse = await emails_default.application.underwritingTeam(sendEmailVars, xlsxPath, templateIds.underwritingTeam);
    if (!underwritingTeamSubmittedResponse.success) {
      throw new Error("Sending application submitted email to underwriting team");
    }
    if (templateIds.account) {
      console.info("Sending documents email to application owner: ", sendEmailVars.emailAddress);
      const documentsResponse = await emails_default.documentsEmail(sendEmailVars, templateIds.account);
      if (!documentsResponse.success) {
        throw new Error(`Sending application documents emails ${documentsResponse}`);
      }
      if (!isOwnerSameAsContact) {
        console.info("Sending documents email to business contact: ", sendContactEmailVars.emailAddress);
        const contactDocumentsResponse = await emails_default.documentsEmail(sendContactEmailVars, templateIds.account);
        if (!contactDocumentsResponse.success) {
          throw new Error(`Sending application documents emails to contact ${documentsResponse}`);
        }
      }
    }
    return {
      success: true
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Sending application submitted emails ${err}`);
  }
};
var applicationSubmittedEmails = {
  send: send2
};
var send_application_submitted_emails_default = applicationSubmittedEmails;

// generate-xlsx/index.ts
var import_exceljs = __toESM(require("exceljs"));

// generate-xlsx/map-application-to-XLSX/helpers/xlsx-row/index.ts
var { KEY, VALUE } = XLSX_CONFIG;
var xlsxRow = (fieldName, answer) => {
  const value = answer || answer === 0 ? answer : "";
  const row = {
    [KEY.ID]: fieldName,
    [VALUE.ID]: String(value)
  };
  return row;
};
var xlsx_row_default = xlsxRow;

// content-strings/default.ts
var DEFAULT = {
  EMPTY: "-"
};

// content-strings/XLSX.ts
var { FIRST_NAME, LAST_NAME, EMAIL: EMAIL3 } = account_default;
var {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE }
  }
} = policy_and_exports_default;
var {
  COMPANY_HOUSE: { COMPANY_NAME: EXPORTER_COMPANY_NAME, COMPANY_ADDRESS: EXPORTER_COMPANY_ADDRESS, COMPANY_SIC: EXPORTER_COMPANY_SIC },
  YOUR_COMPANY: { WEBSITE, PHONE_NUMBER },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER },
  BROKER: { USING_BROKER, NAME: BROKER_NAME, ADDRESS_LINE_1: BROKER_ADDRESS, EMAIL: BROKER_EMAIL }
} = business_default;
var {
  COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME, REGISTRATION_NUMBER: BUYER_REGISTRATION_NUMBER, FIRST_NAME: BUYER_CONTACT_DETAILS }
} = your_buyer_default;
var XLSX = {
  SECTION_TITLES: {
    KEY_INFORMATION: "Key information",
    POLICY_AND_EXPORT: "Type of policy and exports",
    EXPORTER_BUSINESS: "About your business",
    BUYER: "Your buyer",
    ELIGIBILITY: "Eligibility"
  },
  FIELDS: {
    [FIRST_NAME]: "Applicant first name",
    [LAST_NAME]: "Applicant last name",
    [EMAIL3]: "Applicant email address",
    [CONTRACT_COMPLETION_DATE]: "Date expected for contract to complete",
    [EXPORTER_COMPANY_NAME]: "Exporter company name",
    [EXPORTER_COMPANY_ADDRESS]: "Exporter registered office address",
    [EXPORTER_COMPANY_SIC]: "Exporter standard industry classification (SIC) codes and nature of business",
    [WEBSITE]: "Exporter Company website (optional)",
    [PHONE_NUMBER]: "Exporter telephone number (optional)",
    [GOODS_OR_SERVICES]: "Goods or services the business supplies",
    [YEARS_EXPORTING]: "Exporter years exporting",
    [EMPLOYEES_UK]: "Exporter UK Employees",
    [EMPLOYEES_INTERNATIONAL]: "Exporter worldwide employees including UK employees",
    [ESTIMATED_ANNUAL_TURNOVER]: "Exporter estimated turnover this current financial year",
    [USING_BROKER]: "Using a broker for this insurance",
    [BROKER_NAME]: "Name of broker or company",
    [BROKER_ADDRESS]: "Broker address",
    [BROKER_EMAIL]: "Broker email address",
    [COUNTRY]: "Buyer location",
    [BUYER_COMPANY_NAME]: "Buyer company name",
    [BUYER_REGISTRATION_NUMBER]: "Buyer registration number (optional)",
    [BUYER_CONTACT_DETAILS]: "Buyer contact details"
  }
};

// generate-xlsx/map-application-to-XLSX/helpers/xlsx-row-seperator/index.ts
var ROW_SEPERATOR = xlsx_row_default(DEFAULT.EMPTY, DEFAULT.EMPTY);
var xlsx_row_seperator_default = ROW_SEPERATOR;

// content-strings/fields/insurance/eligibility/index.ts
var {
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER
} = insurance_default.ELIGIBILITY;
var FIELDS_ELIGIBILITY = {
  [BUYER_COUNTRY]: {
    SUMMARY: {
      TITLE: "Buyer location"
    }
  },
  [VALID_EXPORTER_LOCATION]: {
    SUMMARY: {
      TITLE: "In UK, Channel Islands or Isle of Man"
    }
  },
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    SUMMARY: {
      TITLE: "UK goods or services"
    },
    ANSWER: "At least 20%"
  },
  [WANT_COVER_OVER_MAX_AMOUNT]: {
    SUMMARY: {
      TITLE: "Insured for more than \xA3500,000"
    }
  },
  [WANT_COVER_OVER_MAX_PERIOD]: {
    SUMMARY: {
      TITLE: "Insured for more than 2 years"
    }
  },
  [OTHER_PARTIES_INVOLVED]: {
    SUMMARY: {
      TITLE: "Other parties involved"
    }
  },
  [LETTER_OF_CREDIT]: {
    SUMMARY: {
      TITLE: "Paid by letter of credit"
    }
  },
  [PRE_CREDIT_PERIOD]: {
    SUMMARY: {
      TITLE: "Pre-credit period"
    }
  },
  [COMPANIES_HOUSE_NUMBER]: {
    SUMMARY: {
      TITLE: "UK Companies House registration number and actively trading"
    }
  }
};

// content-strings/fields/insurance/policy-and-exports/index.ts
var { POLICY_AND_EXPORTS: POLICY_AND_EXPORTS2 } = FIELD_IDS.INSURANCE;
var { CONTRACT_POLICY, ABOUT_GOODS_OR_SERVICES } = POLICY_AND_EXPORTS2;
var POLICY_AND_EXPORTS_FIELDS = {
  [POLICY_AND_EXPORTS2.POLICY_TYPE]: {
    ID: FIELD_IDS.POLICY_TYPE,
    SUMMARY: {
      TITLE: "Policy type"
    }
  },
  CONTRACT_POLICY: {
    [CONTRACT_POLICY.REQUESTED_START_DATE]: {
      SUMMARY: {
        TITLE: "Policy start date"
      }
    },
    [CONTRACT_POLICY.CREDIT_PERIOD_WITH_BUYER]: {
      SUMMARY: {
        TITLE: "Credit period"
      }
    },
    [CONTRACT_POLICY.POLICY_CURRENCY_CODE]: {
      SUMMARY: {
        TITLE: "Policy currency"
      }
    },
    SINGLE: {
      [CONTRACT_POLICY.SINGLE.CONTRACT_COMPLETION_DATE]: {
        SUMMARY: {
          TITLE: "Date you expect contract to complete"
        }
      },
      [CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
        SUMMARY: {
          TITLE: "Contract value"
        }
      }
    },
    MULTIPLE: {
      [CONTRACT_POLICY.MULTIPLE.TOTAL_MONTHS_OF_COVER]: {
        SUMMARY: {
          TITLE: "How many months you want to be insured for"
        }
      },
      [CONTRACT_POLICY.MULTIPLE.TOTAL_SALES_TO_BUYER]: {
        SUMMARY: {
          TITLE: "Estimated sales during policy"
        }
      },
      [CONTRACT_POLICY.MULTIPLE.MAXIMUM_BUYER_WILL_OWE]: {
        SUMMARY: {
          TITLE: "Maximum owed at any single point during policy"
        }
      }
    }
  },
  ABOUT_GOODS_OR_SERVICES: {
    [ABOUT_GOODS_OR_SERVICES.DESCRIPTION]: {
      SUMMARY: {
        TITLE: "Goods or services you're exporting"
      }
    },
    [ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION]: {
      SUMMARY: {
        TITLE: "Final destination of export"
      }
    }
  }
};

// content-strings/fields/insurance/your-business/index.ts
var { EXPORTER_BUSINESS: EXPORTER_BUSINESS2 } = insurance_default;
var {
  COMPANY_HOUSE: { COMPANY_NAME, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, COMPANY_ADDRESS },
  YOUR_COMPANY: { TRADING_ADDRESS, TRADING_NAME, PHONE_NUMBER: PHONE_NUMBER2, WEBSITE: WEBSITE2 },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: GOODS_OR_SERVICES2, YEARS_EXPORTING: YEARS_EXPORTING2, EMPLOYEES_UK: EMPLOYEES_UK2, EMPLOYEES_INTERNATIONAL: EMPLOYEES_INTERNATIONAL2 },
  TURNOVER: { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER: ESTIMATED_ANNUAL_TURNOVER2, PERCENTAGE_TURNOVER },
  BROKER: { USING_BROKER: USING_BROKER2, NAME, ADDRESS_LINE_1, EMAIL: EMAIL4 }
} = EXPORTER_BUSINESS2;
var FIELDS = {
  COMPANY_DETAILS: {
    [COMPANY_NUMBER]: {
      SUMMARY: {
        TITLE: "Companies House registration number"
      }
    },
    [COMPANY_NAME]: {
      SUMMARY: {
        TITLE: "Company name"
      }
    },
    [COMPANY_ADDRESS]: {
      SUMMARY: {
        TITLE: "Registered office address"
      }
    },
    [COMPANY_INCORPORATED]: {
      SUMMARY: {
        TITLE: "Date incorporated"
      }
    },
    [COMPANY_SIC]: {
      SUMMARY: {
        TITLE: "Standard industry classification (SIC) codes and nature of business"
      }
    },
    [FINANCIAL_YEAR_END_DATE]: {
      SUMMARY: {
        TITLE: "Financial year end date"
      }
    },
    [TRADING_NAME]: {
      SUMMARY: {
        TITLE: "Different trading name?"
      }
    },
    [TRADING_ADDRESS]: {
      SUMMARY: {
        TITLE: "Different trading address?"
      }
    },
    [WEBSITE2]: {
      SUMMARY: {
        TITLE: "Company website (optional)"
      }
    },
    [PHONE_NUMBER2]: {
      SUMMARY: {
        TITLE: "UK telephone number (optional)"
      }
    }
  },
  NATURE_OF_YOUR_BUSINESS: {
    [GOODS_OR_SERVICES2]: {
      SUMMARY: {
        TITLE: "Goods or services your business supplies"
      }
    },
    [YEARS_EXPORTING2]: {
      SUMMARY: {
        TITLE: "Years exporting"
      }
    },
    [EMPLOYEES_UK2]: {
      SUMMARY: {
        TITLE: "UK employees"
      }
    },
    [EMPLOYEES_INTERNATIONAL2]: {
      SUMMARY: {
        TITLE: "Worldwide employees including UK employees"
      }
    }
  },
  TURNOVER: {
    [ESTIMATED_ANNUAL_TURNOVER2]: {
      SUMMARY: {
        TITLE: "Estimated turnover this current financial year"
      }
    },
    [PERCENTAGE_TURNOVER]: {
      SUMMARY: {
        TITLE: "Percentage of turnover from exports"
      }
    }
  },
  BROKER: {
    [USING_BROKER2]: {
      SUMMARY: {
        TITLE: "Using a broker for this insurance?"
      }
    },
    [NAME]: {
      SUMMARY: {
        TITLE: "Broker's name or company"
      }
    },
    [ADDRESS_LINE_1]: {
      SUMMARY: {
        TITLE: "Broker's address"
      }
    },
    [EMAIL4]: {
      SUMMARY: {
        TITLE: "Broker's email"
      }
    }
  }
};

// content-strings/fields/insurance/your-buyer/index.ts
var {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION, WORKING_WITH_BUYER }
} = insurance_default;
var YOUR_BUYER_FIELDS = {
  COMPANY_OR_ORGANISATION: {
    [COMPANY_OR_ORGANISATION.NAME]: {
      SUMMARY: {
        TITLE: "Company or organisation name"
      }
    },
    [COMPANY_OR_ORGANISATION.ADDRESS]: {
      SUMMARY: {
        TITLE: "Buyer address"
      }
    },
    [COMPANY_OR_ORGANISATION.COUNTRY]: {
      LABEL: "Country"
    },
    [COMPANY_OR_ORGANISATION.REGISTRATION_NUMBER]: {
      SUMMARY: {
        TITLE: "Registration number (optional)"
      }
    },
    [COMPANY_OR_ORGANISATION.WEBSITE]: {
      SUMMARY: {
        TITLE: "Buyer website (optional)"
      }
    },
    [COMPANY_OR_ORGANISATION.FIRST_NAME]: {
      SUMMARY: {
        TITLE: "Contact details"
      }
    },
    [COMPANY_OR_ORGANISATION.LAST_NAME]: {
      LABEL: "Last name"
    },
    [COMPANY_OR_ORGANISATION.POSITION]: {
      LABEL: "Position"
    },
    [COMPANY_OR_ORGANISATION.EMAIL]: {
      LABEL: "Email address"
    },
    [COMPANY_OR_ORGANISATION.CAN_CONTACT_BUYER]: {
      SUMMARY: {
        TITLE: "Can we contact the buyer?"
      }
    }
  },
  WORKING_WITH_BUYER: {
    [WORKING_WITH_BUYER.CONNECTED_WITH_BUYER]: {
      SUMMARY: {
        TITLE: "Connected with the buyer in any way?"
      }
    },
    [WORKING_WITH_BUYER.TRADED_WITH_BUYER]: {
      SUMMARY: {
        TITLE: "Have you traded with this buyer before?"
      }
    }
  }
};

// content-strings/fields/insurance/index.ts
var REFERENCE_NUMBER = {
  SUMMARY: {
    TITLE: "Application reference number"
  }
};
var DATE_SUBMITTED = {
  SUMMARY: {
    TITLE: "Date submitted"
  }
};
var TIME_SUBMITTED = {
  SUMMARY: {
    TITLE: "Time submitted"
  }
};

// generate-xlsx/map-application-to-XLSX/helpers/format-time-of-day/index.ts
var formatTimeOfDay = (date) => {
  const fullDate = new Date(date);
  const hour = fullDate.getHours();
  return `${hour}:${fullDate.getMinutes()}`;
};
var format_time_of_day_default = formatTimeOfDay;

// generate-xlsx/map-application-to-XLSX/map-key-information/index.ts
var { FIELDS: FIELDS2 } = XLSX;
var { FIRST_NAME: FIRST_NAME2, LAST_NAME: LAST_NAME2, EMAIL: EMAIL5 } = account_default;
var mapKeyInformation = (application2) => {
  const mapped = [
    xlsx_row_default(REFERENCE_NUMBER.SUMMARY.TITLE, application2.referenceNumber),
    xlsx_row_default(DATE_SUBMITTED.SUMMARY.TITLE, format_date_default(application2.submissionDate, "dd-MM-yyyy")),
    xlsx_row_default(TIME_SUBMITTED.SUMMARY.TITLE, format_time_of_day_default(application2.submissionDate)),
    xlsx_row_default(FIELDS2[FIRST_NAME2], application2.owner[FIRST_NAME2]),
    xlsx_row_default(FIELDS2[LAST_NAME2], application2.owner[LAST_NAME2]),
    xlsx_row_default(FIELDS2[EMAIL5], application2.owner[EMAIL5])
  ];
  return mapped;
};
var map_key_information_default = mapKeyInformation;

// generate-xlsx/map-application-to-XLSX/map-secondary-key-information/index.ts
var {
  SECTION_TITLES: { KEY_INFORMATION },
  FIELDS: FIELDS3
} = XLSX;
var CONTENT_STRINGS = {
  ...POLICY_AND_EXPORTS_FIELDS
};
var {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NAME: EXPORTER_COMPANY_NAME2 }
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { COUNTRY: COUNTRY2, NAME: BUYER_COMPANY_NAME2 }
  },
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY: { POLICY_TYPE: POLICY_TYPE2 }
  }
} = insurance_default;
var mapSecondaryKeyInformation = (application2) => {
  const { policyAndExport } = application2;
  const mapped = [
    xlsx_row_default(KEY_INFORMATION),
    xlsx_row_default(FIELDS3[EXPORTER_COMPANY_NAME2], application2.company[EXPORTER_COMPANY_NAME2]),
    xlsx_row_default(FIELDS3[COUNTRY2], application2.buyer[COUNTRY2].name),
    xlsx_row_default(FIELDS3[BUYER_COMPANY_NAME2], application2.buyer[BUYER_COMPANY_NAME2]),
    xlsx_row_default(String(CONTENT_STRINGS[POLICY_TYPE2].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE2])
  ];
  return mapped;
};
var map_secondary_key_information_default = mapSecondaryKeyInformation;

// generate-xlsx/map-application-to-XLSX/helpers/policy-type/index.ts
var isSinglePolicyType = (policyType) => policyType === FIELD_VALUES.POLICY_TYPE.SINGLE;
var isMultiPolicyType = (policyType) => policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE;

// generate-xlsx/map-application-to-XLSX/helpers/format-currency/index.ts
var formatCurrency = (number, currencyCode, decimalPoints) => number.toLocaleString("en", {
  style: "currency",
  currency: currencyCode,
  minimumFractionDigits: decimalPoints ?? 0,
  maximumFractionDigits: decimalPoints ?? 0
});
var format_currency_default = formatCurrency;

// generate-xlsx/map-application-to-XLSX/helpers/map-month-string/index.ts
var mapMonthString = (answer) => answer === 1 ? `${answer} month` : `${answer} months`;
var map_month_string_default = mapMonthString;

// generate-xlsx/map-application-to-XLSX/map-policy-and-export/index.ts
var CONTENT_STRINGS2 = {
  ...POLICY_AND_EXPORTS_FIELDS,
  ...POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY,
  ...POLICY_AND_EXPORTS_FIELDS.ABOUT_GOODS_OR_SERVICES,
  SINGLE: POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY.SINGLE,
  MULTIPLE: POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY.MULTIPLE
};
var {
  TYPE_OF_POLICY: { POLICY_TYPE: POLICY_TYPE3 },
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    SINGLE: { CONTRACT_COMPLETION_DATE: CONTRACT_COMPLETION_DATE2, TOTAL_CONTRACT_VALUE },
    MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    CREDIT_PERIOD_WITH_BUYER,
    POLICY_CURRENCY_CODE
  },
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION }
} = insurance_default.POLICY_AND_EXPORTS;
var mapPolicyAndExportIntro = (application2) => {
  const { policyAndExport } = application2;
  const mapped = [
    xlsx_row_default(XLSX.SECTION_TITLES.POLICY_AND_EXPORT, ""),
    xlsx_row_default(String(CONTENT_STRINGS2[POLICY_TYPE3].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE3]),
    xlsx_row_default(String(CONTENT_STRINGS2[REQUESTED_START_DATE].SUMMARY?.TITLE), format_date_default(policyAndExport[REQUESTED_START_DATE], "dd-MMM-yy"))
  ];
  return mapped;
};
var mapSinglePolicyFields = (application2) => {
  const { policyAndExport } = application2;
  return [
    xlsx_row_default(String(CONTENT_STRINGS2.SINGLE[CONTRACT_COMPLETION_DATE2].SUMMARY?.TITLE), format_date_default(policyAndExport[CONTRACT_COMPLETION_DATE2], "dd-MMM-yy")),
    xlsx_row_default(String(CONTENT_STRINGS2.SINGLE[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), format_currency_default(policyAndExport[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE))
  ];
};
var mapMultiplePolicyFields = (application2) => {
  const { policyAndExport } = application2;
  return [
    xlsx_row_default(String(CONTENT_STRINGS2.MULTIPLE[TOTAL_MONTHS_OF_COVER].SUMMARY?.TITLE), map_month_string_default(policyAndExport[TOTAL_MONTHS_OF_COVER])),
    xlsx_row_default(String(CONTENT_STRINGS2.MULTIPLE[TOTAL_SALES_TO_BUYER].SUMMARY?.TITLE), format_currency_default(policyAndExport[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
    xlsx_row_default(
      String(CONTENT_STRINGS2.MULTIPLE[MAXIMUM_BUYER_WILL_OWE].SUMMARY?.TITLE),
      format_currency_default(policyAndExport[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE)
    )
  ];
};
var mapPolicyAndExportOutro = (application2) => {
  const { policyAndExport } = application2;
  const mapped = [
    xlsx_row_default(String(CONTENT_STRINGS2[CREDIT_PERIOD_WITH_BUYER].SUMMARY?.TITLE), policyAndExport[CREDIT_PERIOD_WITH_BUYER]),
    xlsx_row_default(String(CONTENT_STRINGS2[POLICY_CURRENCY_CODE].SUMMARY?.TITLE), policyAndExport[POLICY_CURRENCY_CODE]),
    xlsx_row_default(String(CONTENT_STRINGS2[DESCRIPTION].SUMMARY?.TITLE), policyAndExport[DESCRIPTION]),
    xlsx_row_default(String(CONTENT_STRINGS2[FINAL_DESTINATION].SUMMARY?.TITLE), policyAndExport[FINAL_DESTINATION].name)
  ];
  return mapped;
};
var mapPolicyAndExport = (application2) => {
  let mapped = mapPolicyAndExportIntro(application2);
  const policyType = application2.policyAndExport[POLICY_TYPE3];
  if (isSinglePolicyType(policyType)) {
    mapped = [...mapped, ...mapSinglePolicyFields(application2)];
  }
  if (isMultiPolicyType(policyType)) {
    mapped = [...mapped, ...mapMultiplePolicyFields(application2)];
  }
  mapped = [...mapped, ...mapPolicyAndExportOutro(application2)];
  return mapped;
};
var map_policy_and_export_default = mapPolicyAndExport;

// generate-xlsx/map-application-to-XLSX/helpers/xlsx-new-line/index.ts
var NEW_LINE = "\r\n";
var xlsx_new_line_default = NEW_LINE;

// generate-xlsx/map-application-to-XLSX/map-exporter/map-address/index.ts
var mapExporterAddress = (address) => {
  let addressString = "";
  Object.keys(address).forEach((field) => {
    if (address[field] && field !== "id" && field !== "__typename") {
      addressString += `${address[field]}${xlsx_new_line_default}`;
    }
  });
  return addressString;
};
var map_address_default = mapExporterAddress;

// generate-xlsx/map-application-to-XLSX/map-exporter/index.ts
var CONTENT_STRINGS3 = {
  ...FIELDS.COMPANY_DETAILS,
  ...FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...FIELDS.TURNOVER,
  ...FIELDS.BROKER
};
var {
  COMPANY_HOUSE: { COMPANY_NUMBER: COMPANY_NUMBER2, COMPANY_NAME: COMPANY_NAME2, COMPANY_ADDRESS: COMPANY_ADDRESS2, COMPANY_INCORPORATED: COMPANY_INCORPORATED2, COMPANY_SIC: COMPANY_SIC2, FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE2 },
  YOUR_COMPANY: { TRADING_NAME: TRADING_NAME2, TRADING_ADDRESS: TRADING_ADDRESS2, WEBSITE: WEBSITE3, PHONE_NUMBER: PHONE_NUMBER3 },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: GOODS_OR_SERVICES3, YEARS_EXPORTING: YEARS_EXPORTING3, EMPLOYEES_UK: EMPLOYEES_UK3, EMPLOYEES_INTERNATIONAL: EMPLOYEES_INTERNATIONAL3 },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER: ESTIMATED_ANNUAL_TURNOVER3, PERCENTAGE_TURNOVER: PERCENTAGE_TURNOVER2 },
  BROKER: { USING_BROKER: USING_BROKER3, NAME: BROKER_NAME2, ADDRESS_LINE_1: ADDRESS_LINE_12, TOWN, COUNTY, POSTCODE, EMAIL: EMAIL6 }
} = business_default;
var mapSicCodes2 = (sicCodes) => {
  let mapped = "";
  sicCodes.forEach((sicCodeObj) => {
    const { sicCode, industrySectorName } = sicCodeObj;
    mapped += `${sicCode} - ${industrySectorName}${xlsx_new_line_default}`;
  });
  return mapped;
};
var mapBroker = (application2) => {
  const { broker } = application2;
  let mapped = [xlsx_row_default(XLSX.FIELDS[USING_BROKER3], broker[USING_BROKER3])];
  if (broker[USING_BROKER3] === ANSWERS.YES) {
    mapped = [
      ...mapped,
      xlsx_row_default(XLSX.FIELDS[BROKER_NAME2], broker[BROKER_NAME2]),
      xlsx_row_default(
        XLSX.FIELDS[ADDRESS_LINE_12],
        `${broker[ADDRESS_LINE_12]} ${xlsx_new_line_default} ${broker[TOWN]} ${xlsx_new_line_default} ${broker[COUNTY]} ${xlsx_new_line_default} ${broker[POSTCODE]}`
      ),
      xlsx_row_default(XLSX.FIELDS[EMAIL6], broker[EMAIL6])
    ];
  }
  return mapped;
};
var mapExporter = (application2) => {
  const { company, companySicCodes, business } = application2;
  const mapped = [
    xlsx_row_default(XLSX.SECTION_TITLES.EXPORTER_BUSINESS, ""),
    // company fields
    xlsx_row_default(CONTENT_STRINGS3[COMPANY_NUMBER2].SUMMARY?.TITLE, company[COMPANY_NUMBER2]),
    xlsx_row_default(XLSX.FIELDS[COMPANY_NAME2], company[COMPANY_NAME2]),
    xlsx_row_default(CONTENT_STRINGS3[COMPANY_INCORPORATED2].SUMMARY?.TITLE, format_date_default(company[COMPANY_INCORPORATED2], "dd-MMM-yy")),
    xlsx_row_default(XLSX.FIELDS[COMPANY_ADDRESS2], map_address_default(company[COMPANY_ADDRESS2])),
    xlsx_row_default(CONTENT_STRINGS3[TRADING_NAME2].SUMMARY?.TITLE, company[TRADING_NAME2]),
    xlsx_row_default(CONTENT_STRINGS3[TRADING_ADDRESS2].SUMMARY?.TITLE, company[TRADING_ADDRESS2]),
    xlsx_row_default(XLSX.FIELDS[COMPANY_SIC2], mapSicCodes2(companySicCodes)),
    xlsx_row_default(CONTENT_STRINGS3[FINANCIAL_YEAR_END_DATE2].SUMMARY?.TITLE, format_date_default(company[FINANCIAL_YEAR_END_DATE2], "d MMMM")),
    xlsx_row_default(XLSX.FIELDS[WEBSITE3], company[WEBSITE3]),
    xlsx_row_default(XLSX.FIELDS[PHONE_NUMBER3], company[PHONE_NUMBER3]),
    // business fields
    xlsx_row_default(XLSX.FIELDS[GOODS_OR_SERVICES3], business[GOODS_OR_SERVICES3]),
    xlsx_row_default(XLSX.FIELDS[YEARS_EXPORTING3], business[YEARS_EXPORTING3]),
    xlsx_row_default(XLSX.FIELDS[EMPLOYEES_UK3], business[EMPLOYEES_UK3]),
    xlsx_row_default(XLSX.FIELDS[EMPLOYEES_INTERNATIONAL3], business[EMPLOYEES_INTERNATIONAL3]),
    xlsx_row_default(XLSX.FIELDS[ESTIMATED_ANNUAL_TURNOVER3], format_currency_default(business[ESTIMATED_ANNUAL_TURNOVER3], GBP_CURRENCY_CODE)),
    xlsx_row_default(CONTENT_STRINGS3[PERCENTAGE_TURNOVER2].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER2]}%`),
    // broker fields
    ...mapBroker(application2)
  ];
  return mapped;
};
var map_exporter_default = mapExporter;

// generate-xlsx/map-application-to-XLSX/map-buyer/index.ts
var CONTENT_STRINGS4 = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS.WORKING_WITH_BUYER
};
var {
  COMPANY_OR_ORGANISATION: { NAME: NAME2, ADDRESS, REGISTRATION_NUMBER, WEBSITE: WEBSITE4, FIRST_NAME: FIRST_NAME3, LAST_NAME: LAST_NAME3, POSITION, EMAIL: EMAIL7, CAN_CONTACT_BUYER },
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, TRADED_WITH_BUYER }
} = your_buyer_default;
var mapBuyer = (application2) => {
  const { buyer } = application2;
  const mapped = [
    xlsx_row_default(XLSX.SECTION_TITLES.BUYER, ""),
    xlsx_row_default(XLSX.FIELDS[NAME2], buyer[NAME2]),
    xlsx_row_default(String(CONTENT_STRINGS4[ADDRESS].SUMMARY?.TITLE), buyer[ADDRESS]),
    xlsx_row_default(XLSX.FIELDS[REGISTRATION_NUMBER], buyer[REGISTRATION_NUMBER]),
    xlsx_row_default(String(CONTENT_STRINGS4[WEBSITE4].SUMMARY?.TITLE), buyer[WEBSITE4]),
    xlsx_row_default(XLSX.FIELDS[FIRST_NAME3], `${buyer[FIRST_NAME3]} ${buyer[LAST_NAME3]} ${xlsx_new_line_default} ${buyer[POSITION]} ${xlsx_new_line_default} ${buyer[EMAIL7]}`),
    xlsx_row_default(String(CONTENT_STRINGS4[CAN_CONTACT_BUYER].SUMMARY?.TITLE), buyer[CAN_CONTACT_BUYER]),
    xlsx_row_default(String(CONTENT_STRINGS4[CONNECTED_WITH_BUYER].SUMMARY?.TITLE), buyer[CONNECTED_WITH_BUYER]),
    xlsx_row_default(String(CONTENT_STRINGS4[TRADED_WITH_BUYER].SUMMARY?.TITLE), buyer[TRADED_WITH_BUYER])
  ];
  return mapped;
};
var map_buyer_default = mapBuyer;

// generate-xlsx/map-application-to-XLSX/helpers/map-yes-no-field/index.ts
var mapYesNoField = (answer) => {
  if (answer === false) {
    return "No";
  }
  if (answer === true) {
    return "Yes";
  }
  return DEFAULT.EMPTY;
};
var map_yes_no_field_default = mapYesNoField;

// generate-xlsx/map-application-to-XLSX/map-eligibility/index.ts
var {
  BUYER_COUNTRY: BUYER_COUNTRY2,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES: HAS_MINIMUM_UK_GOODS_OR_SERVICES2,
  VALID_EXPORTER_LOCATION: VALID_EXPORTER_LOCATION2,
  WANT_COVER_OVER_MAX_AMOUNT: WANT_COVER_OVER_MAX_AMOUNT2,
  WANT_COVER_OVER_MAX_PERIOD: WANT_COVER_OVER_MAX_PERIOD2,
  OTHER_PARTIES_INVOLVED: OTHER_PARTIES_INVOLVED2,
  LETTER_OF_CREDIT: LETTER_OF_CREDIT2,
  PRE_CREDIT_PERIOD: PRE_CREDIT_PERIOD2,
  COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER2
} = insurance_default.ELIGIBILITY;
var mapEligibility = (application2) => {
  const { eligibility } = application2;
  const mapped = [
    xlsx_row_default(XLSX.SECTION_TITLES.ELIGIBILITY, ""),
    xlsx_row_default(FIELDS_ELIGIBILITY[BUYER_COUNTRY2].SUMMARY?.TITLE, eligibility[BUYER_COUNTRY2].name),
    xlsx_row_default(FIELDS_ELIGIBILITY[VALID_EXPORTER_LOCATION2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[VALID_EXPORTER_LOCATION2])),
    xlsx_row_default(FIELDS_ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES2])),
    xlsx_row_default(FIELDS_ELIGIBILITY[WANT_COVER_OVER_MAX_AMOUNT2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[WANT_COVER_OVER_MAX_AMOUNT2])),
    xlsx_row_default(FIELDS_ELIGIBILITY[WANT_COVER_OVER_MAX_PERIOD2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[WANT_COVER_OVER_MAX_PERIOD2])),
    xlsx_row_default(FIELDS_ELIGIBILITY[OTHER_PARTIES_INVOLVED2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[OTHER_PARTIES_INVOLVED2])),
    xlsx_row_default(FIELDS_ELIGIBILITY[LETTER_OF_CREDIT2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[LETTER_OF_CREDIT2])),
    xlsx_row_default(FIELDS_ELIGIBILITY[PRE_CREDIT_PERIOD2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[PRE_CREDIT_PERIOD2])),
    xlsx_row_default(FIELDS_ELIGIBILITY[COMPANIES_HOUSE_NUMBER2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[COMPANIES_HOUSE_NUMBER2]))
  ];
  return mapped;
};
var map_eligibility_default = mapEligibility;

// generate-xlsx/map-application-to-XLSX/index.ts
var mapApplicationToXLSX = (application2) => {
  try {
    const mapped = [
      xlsx_row_seperator_default,
      ...map_key_information_default(application2),
      xlsx_row_seperator_default,
      ...map_secondary_key_information_default(application2),
      xlsx_row_seperator_default,
      ...map_policy_and_export_default(application2),
      xlsx_row_seperator_default,
      ...map_exporter_default(application2),
      xlsx_row_seperator_default,
      ...map_buyer_default(application2),
      xlsx_row_seperator_default,
      ...map_eligibility_default(application2)
    ];
    return mapped;
  } catch (err) {
    console.error(err);
    throw new Error(`Mapping application to XLSX ${err}`);
  }
};
var map_application_to_XLSX_default = mapApplicationToXLSX;

// generate-xlsx/header-columns/index.ts
var { KEY: KEY2, VALUE: VALUE2, COLUMN_WIDTH } = XLSX_CONFIG;
var XLSX_HEADER_COLUMNS = [
  { key: KEY2.ID, header: KEY2.COPY, width: COLUMN_WIDTH },
  { key: VALUE2.ID, header: VALUE2.COPY, width: COLUMN_WIDTH }
];
var header_columns_default = XLSX_HEADER_COLUMNS;

// generate-xlsx/index.ts
var XLSX2 = (application2) => {
  try {
    console.info(`Generating XLSX file for application ${application2.id}`);
    const { referenceNumber } = application2;
    const refNumber = String(referenceNumber);
    return new Promise((resolve) => {
      const filePath = `XLSX/${refNumber}.xlsx`;
      const xlsxData = map_application_to_XLSX_default(application2);
      console.info("Generating XLSX file - creating a new workbook");
      const workbook = new import_exceljs.default.Workbook();
      console.info("Generating XLSX file - adding worksheet to workbook");
      const worksheet = workbook.addWorksheet(refNumber);
      worksheet.columns = header_columns_default;
      console.info("Generating XLSX file - adding rows to worksheet");
      xlsxData.forEach((row) => {
        worksheet.addRow(row);
      });
      workbook.xlsx.writeFile(filePath).then(() => resolve(filePath));
    });
  } catch (err) {
    console.error(err);
    throw new Error(`Generating XLSX file ${err}`);
  }
};
var generate2 = {
  XLSX: XLSX2
};
var generate_xlsx_default = generate2;

// custom-resolvers/mutations/submit-application.ts
var submitApplication = async (root, variables, context) => {
  try {
    console.info(`Submitting application ${variables.applicationId}`);
    const application2 = await context.db.Application.findOne({
      where: { id: variables.applicationId }
    });
    if (application2) {
      const hasDraftStatus = application2.status === APPLICATION.STATUS.DRAFT;
      const now = /* @__PURE__ */ new Date();
      const validSubmissionDate = (0, import_date_fns8.isAfter)(new Date(application2.submissionDeadline), now);
      const canSubmit = hasDraftStatus && validSubmissionDate;
      if (canSubmit) {
        const update = {
          status: APPLICATION.STATUS.SUBMITTED,
          previousStatus: APPLICATION.STATUS.DRAFT,
          submissionDate: now
        };
        const updatedApplication = await context.db.Application.updateOne({
          where: { id: application2.id },
          data: update
        });
        const populatedApplication = await get_populated_application_default(context, updatedApplication);
        const xlsxPath = await generate_xlsx_default.XLSX(populatedApplication);
        await send_application_submitted_emails_default.send(populatedApplication, xlsxPath);
        return {
          success: true
        };
      }
      console.error("Unable to submit application - application already submitted");
    }
    console.error("Unable to submit application - no application found");
    return {
      success: false
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Submitting application ${err}`);
  }
};
var submit_application_default = submitApplication;

// custom-resolvers/mutations/create-feedback.ts
var createFeedback = async (root, variables, context) => {
  console.info("Creating feedback");
  try {
    const feedback = {
      ...variables,
      createdAt: /* @__PURE__ */ new Date()
    };
    const response = await context.db.Feedback.createOne({
      data: feedback
    });
    const emailResponse = await emails_default.insuranceFeedbackEmail(feedback);
    if (response && emailResponse?.success) {
      return {
        ...response,
        success: true
      };
    }
    return { success: false };
  } catch (err) {
    throw new Error(`Creating feedback: ${err}`);
  }
};
var create_feedback_default = createFeedback;

// custom-resolvers/queries/get-companies-house-information.ts
var import_axios2 = __toESM(require("axios"));
var import_dotenv6 = __toESM(require("dotenv"));

// helpers/create-full-timestamp-from-day-month/index.ts
var createFullTimestampFromDayAndMonth = (day, month) => {
  if (day && month) {
    return /* @__PURE__ */ new Date(`${(/* @__PURE__ */ new Date()).getFullYear()}-${month}-${day}`);
  }
  return null;
};
var create_full_timestamp_from_day_month_default = createFullTimestampFromDayAndMonth;

// helpers/map-sic-code-descriptions/index.ts
var mapSicCodeDescriptions = (sicCodes, sectors) => {
  const industrySectorNames = [];
  if (!sicCodes || !sicCodes.length || !sectors || !sectors.length) {
    return industrySectorNames;
  }
  sicCodes.forEach((sicCode) => {
    const sicCodeSector = sectors.find((sector) => sector.ukefIndustryId === sicCode);
    industrySectorNames.push(sicCodeSector?.ukefIndustryName);
  });
  return industrySectorNames;
};
var map_sic_code_descriptions_default = mapSicCodeDescriptions;

// helpers/map-companies-house-fields/index.ts
var mapCompaniesHouseFields = (companiesHouseResponse, sectors) => {
  return {
    companyName: companiesHouseResponse.company_name,
    registeredOfficeAddress: {
      careOf: companiesHouseResponse.registered_office_address.care_of,
      premises: companiesHouseResponse.registered_office_address.premises,
      addressLine1: companiesHouseResponse.registered_office_address.address_line_1,
      addressLine2: companiesHouseResponse.registered_office_address.address_line_2,
      locality: companiesHouseResponse.registered_office_address.locality,
      region: companiesHouseResponse.registered_office_address.region,
      postalCode: companiesHouseResponse.registered_office_address.postal_code,
      country: companiesHouseResponse.registered_office_address.country
    },
    companyNumber: companiesHouseResponse.company_number,
    dateOfCreation: companiesHouseResponse.date_of_creation,
    sicCodes: companiesHouseResponse.sic_codes,
    industrySectorNames: map_sic_code_descriptions_default(companiesHouseResponse.sic_codes, sectors),
    // creates timestamp for financialYearEndDate from day and month if exist
    financialYearEndDate: create_full_timestamp_from_day_month_default(
      companiesHouseResponse.accounts?.accounting_reference_date?.day,
      companiesHouseResponse.accounts?.accounting_reference_date?.month
    )
  };
};

// integrations/industry-sector/index.ts
var import_axios = __toESM(require("axios"));
var import_dotenv5 = __toESM(require("dotenv"));
import_dotenv5.default.config();
var { MULESOFT_MDM_EA } = EXTERNAL_API_ENDPOINTS;
var headers = {
  "Content-Type": "application/json",
  [String(process.env.APIM_MDM_KEY)]: process.env.APIM_MDM_VALUE
};
var getIndustrySectorNames = async () => {
  try {
    console.info("Calling industry sector API");
    const response = await (0, import_axios.default)({
      method: "get",
      url: `${process.env.APIM_MDM_URL}${MULESOFT_MDM_EA.INDUSTRY_SECTORS}`,
      headers,
      validateStatus(status) {
        const acceptableStatus = [200, 404];
        return acceptableStatus.includes(status);
      }
    });
    if (!response.data || response.status !== 200) {
      return {
        success: false
      };
    }
    return {
      data: response.data,
      success: true
    };
  } catch (err) {
    console.error("Error calling industry sector API ", { err });
    return {
      apiError: true,
      success: false
    };
  }
};
var industry_sector_default = getIndustrySectorNames;

// custom-resolvers/queries/get-companies-house-information.ts
import_dotenv6.default.config();
var username = process.env.COMPANIES_HOUSE_API_KEY;
var companiesHouseURL = process.env.COMPANIES_HOUSE_API_URL;
var getCompaniesHouseInformation = async (root, variables) => {
  try {
    const { companiesHouseNumber } = variables;
    console.info("Calling Companies House API for ", companiesHouseNumber);
    const sanitisedRegNo = companiesHouseNumber.toString().padStart(8, "0");
    const response = await (0, import_axios2.default)({
      method: "get",
      url: `${companiesHouseURL}/company/${sanitisedRegNo}`,
      auth: { username, password: "" },
      validateStatus(status) {
        const acceptableStatus = [200, 404];
        return acceptableStatus.includes(status);
      }
    });
    if (!response.data || response.status === 404) {
      return {
        success: false
      };
    }
    const industrySectorNames = await industry_sector_default();
    if (!industrySectorNames.success || industrySectorNames.apiError) {
      return {
        success: false
      };
    }
    const mappedResponse = mapCompaniesHouseFields(response.data, industrySectorNames.data);
    return {
      ...mappedResponse,
      success: true
    };
  } catch (err) {
    console.error("Error calling Companies House API", { err });
    return {
      apiError: true,
      success: false
    };
  }
};
var get_companies_house_information_default = getCompaniesHouseInformation;

// custom-resolvers/queries/get-account-password-reset-token.ts
var getAccountPasswordResetToken = async (root, variables, context) => {
  console.info("Getting account password reset token");
  try {
    const { email } = variables;
    const account = await get_account_by_field_default(context, FIELD_IDS.INSURANCE.ACCOUNT.EMAIL, email);
    if (!account) {
      console.info("Unable to get account password reset token - account does not exist");
      return { success: false };
    }
    if (account.passwordResetHash) {
      return {
        success: true,
        token: account.passwordResetHash
      };
    }
    console.info("Unable to get account password reset token - reset hash does not exist");
    return { success: false };
  } catch (err) {
    throw new Error(`Getting account password reset token ${err}`);
  }
};
var get_account_password_reset_token_default = getAccountPasswordResetToken;

// custom-resolvers/queries/verify-account-password-reset-token.ts
var import_date_fns9 = require("date-fns");
var {
  ACCOUNT: { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY }
} = FIELD_IDS.INSURANCE;
var verifyAccountPasswordResetToken = async (root, variables, context) => {
  console.info("Verifying account password reset token");
  try {
    const { token } = variables;
    const account = await get_account_by_field_default(context, PASSWORD_RESET_HASH, token);
    if (!account) {
      console.info("Unable to verify account password reset token - account does not exist");
      return { success: false };
    }
    const now = /* @__PURE__ */ new Date();
    const hasExpired = (0, import_date_fns9.isAfter)(now, account[PASSWORD_RESET_EXPIRY]);
    if (hasExpired) {
      console.info("Account password reset token has expired");
      return {
        success: false,
        expired: true
      };
    }
    return { success: true };
  } catch (err) {
    throw new Error(`Verifying account password reset token ${err}`);
  }
};
var verify_account_password_reset_token_default = verifyAccountPasswordResetToken;

// custom-resolvers/index.ts
var customResolvers = {
  Mutation: {
    createAnAccount: create_an_account_default,
    deleteAnAccount: delete_an_account_default,
    accountSignIn: account_sign_in_default,
    accountSignInSendNewCode: account_sign_in_new_code_default,
    verifyAccountEmailAddress: verify_account_email_address_default,
    sendEmailConfirmEmailAddress: send_email_confirm_email_address_default2,
    verifyAccountSignInCode: verify_account_sign_in_code_default,
    addAndGetOTP: add_and_get_OTP_default,
    accountPasswordReset: account_password_reset_default,
    sendEmailPasswordResetLink: send_email_password_reset_link_default,
    deleteApplicationByReferenceNumber: delete_application_by_refrence_number_default,
    updateCompanyAndCompanyAddress: update_company_and_company_address_default,
    submitApplication: submit_application_default,
    createFeedbackAndSendEmail: create_feedback_default
  },
  Query: {
    getCompaniesHouseInformation: get_companies_house_information_default,
    getAccountPasswordResetToken: get_account_password_reset_token_default,
    verifyAccountPasswordResetToken: verify_account_password_reset_token_default
  }
};
var custom_resolvers_default = customResolvers;

// custom-schema/index.ts
var extendGraphqlSchema = (schema) => (0, import_schema.mergeSchemas)({
  schemas: [schema],
  typeDefs: type_defs_default,
  resolvers: custom_resolvers_default
});

// keystone.ts
var enableLogging = process.env.NODE_ENV === "development";
var keystone_default = withAuth(
  (0, import_core2.config)({
    server: {
      port: 5001
    },
    db: {
      provider: "mysql",
      url: String(process.env.DATABASE_URL),
      enableLogging
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    },
    lists,
    session,
    extendGraphqlSchema
  })
);
