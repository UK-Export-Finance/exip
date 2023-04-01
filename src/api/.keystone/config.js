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

// constants/field-ids/shared-eligibility/index.ts
var SHARED_ELIGIBILITY = {
  BUYER_COUNTRY: "buyerCountry",
  HAS_MINIMUM_UK_GOODS_OR_SERVICES: "hasMinimumUkGoodsOrServices",
  VALID_EXPORTER_LOCATION: "validExporterLocation"
};
var shared_eligibility_default = SHARED_ELIGIBILITY;

// constants/field-ids/shared/index.ts
var SHARED = {
  POLICY_TYPE: "policyType",
  SINGLE_POLICY_TYPE: "singlePolicyType",
  MULTIPLE_POLICY_TYPE: "multiplePolicyType"
};
var shared_default = SHARED;

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

// constants/field-ids/insurance/exporter-business/index.ts
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
var exporter_business_default = EXPORTER_BUSINESS;

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
  EXPORTER_BUSINESS: "exporterBusiness",
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
  POLICY_AND_EXPORTS: policy_and_exports_default,
  EXPORTER_BUSINESS: exporter_business_default,
  YOUR_BUYER: your_buyer_default,
  DECLARATIONS: declarations_default,
  CHECK_YOUR_ANSWERS: check_your_answers_default
};
var insurance_default = INSURANCE_FIELD_IDS;

// constants/index.ts
import_dotenv.default.config();
var ANSWERS = {
  YES: "Yes",
  NO: "No"
};
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
    }
  },
  STATUS: {
    DRAFT: "Draft",
    SUBMITTED: "Submitted to UKEF"
  }
};
var GBP_CURRENCY_CODE = "GBP";
var FIELD_IDS = {
  ACCOUNT: {
    EMAIL: "email",
    VERIFICATION_HASH: "verificationHash"
  },
  ...insurance_default
};
var ACCOUNT = {
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
  // One time password
  OTP: {
    DIGITS: 6,
    VERIFICATION_EXPIRY: () => {
      const now = /* @__PURE__ */ new Date();
      const milliseconds = 3e5;
      const future = new Date(now.setMilliseconds(milliseconds));
      return future;
    }
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
  }
};
var EMAIL_TEMPLATE_IDS = {
  ACCOUNT: {
    CONFIRM_EMAIL: "24022e94-171c-4044-b0ee-d22418116575",
    SECURITY_CODE: "b92650d1-9187-4510-ace2-5eec7ca7e626"
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
        NOTIFICATION: "676e4655-1e82-4094-9e3e-387ea91f44df"
      }
    }
  }
};

// file-system/index.ts
var import_fs = require("fs");
var readFile = (filePath) => import_fs.promises.readFile(filePath);
var unlink = (filePath) => import_fs.promises.unlink(filePath);
var fileSystem = {
  readFile,
  unlink
};
var file_system_default = fileSystem;

// integrations/notify/index.ts
var import_dotenv2 = __toESM(require("dotenv"));
var import_notifications_node_client = require("notifications-node-client");
import_dotenv2.default.config();
var notifyKey = process.env.GOV_NOTIFY_API_KEY;
var notifyClient = new import_notifications_node_client.NotifyClient(notifyKey);
var notify = {
  sendEmail: async (templateId, sendToEmailAddress, variables, file, fileIsCsv) => {
    try {
      console.info("Calling Notify API. templateId: ", templateId);
      const personalisation = variables;
      if (file) {
        personalisation.linkToFile = await notifyClient.prepareUpload(file, { confirmEmailBeforeDownload: true, isCsv: fileIsCsv });
        await notifyClient.sendEmail(templateId, sendToEmailAddress, {
          personalisation,
          reference: null
        });
      } else {
        await notifyClient.sendEmail(templateId, sendToEmailAddress, {
          personalisation,
          reference: null
        });
      }
      return {
        success: true,
        emailRecipient: sendToEmailAddress
      };
    } catch (err) {
      throw new Error(`Calling Notify API. Unable to send email ${err}`);
    }
  }
};
var notify_default = notify;

// emails/index.ts
var import_dotenv3 = __toESM(require("dotenv"));
import_dotenv3.default.config();
var callNotify = async (templateId, emailAddress, variables, file, fileIsCsv) => {
  try {
    let emailResponse;
    if (file && fileIsCsv) {
      emailResponse = await notify_default.sendEmail(templateId, emailAddress, variables, file, fileIsCsv);
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
var confirmEmailAddress = async (emailAddress, firstName, verificationHash) => {
  try {
    console.info("Sending email verification for account creation");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;
    const variables = { firstName, confirmToken: verificationHash };
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email verification for account creation ${err}`);
  }
};
var securityCodeEmail = async (emailAddress, firstName, securityCode) => {
  try {
    console.info("Sending security code email for account sign in");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;
    const variables = { firstName, securityCode };
    const response = await callNotify(templateId, emailAddress, variables);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending security code email for account sign in ${err}`);
  }
};
var applicationSubmitted = {
  /**
   * applicationSubmitted.exporter
   * Send "application submitted" email to an exporter
   * @param {Object} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  exporter: async (variables) => {
    try {
      console.info("Sending application submitted email to exporter");
      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;
      const { emailAddress } = variables;
      const response = await callNotify(templateId, emailAddress, variables);
      return response;
    } catch (err) {
      console.error(err);
      throw new Error(`Sending application submitted email to exporter ${err}`);
    }
  },
  /**
   * applicationSubmitted.underwritingTeam
   * Read CSV file, generate a file buffer
   * Send "application submitted" email to the underwriting team with a link to CSV
   * We send a file buffer to Notify and Notify generates a unique URL that is then rendered in the email.
   * @param {Object} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  underwritingTeam: async (variables, csvPath) => {
    try {
      console.info("Sending application submitted email to underwriting team");
      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.UNDERWRITING_TEAM.NOTIFICATION;
      const emailAddress = process.env.UNDERWRITING_TEAM_EMAIL;
      const file = await file_system_default.readFile(csvPath);
      const fileIsCsv = true;
      const fileBuffer = Buffer.from(file);
      const response = await callNotify(templateId, emailAddress, variables, fileBuffer, fileIsCsv);
      await file_system_default.unlink(csvPath);
      return response;
    } catch (err) {
      console.error(err);
      throw new Error(`Sending application submitted email to underwriting team ${err}`);
    }
  }
};
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
var sendEmail = {
  confirmEmailAddress,
  securityCodeEmail,
  applicationSubmitted,
  documentsEmail
};
var emails_default = sendEmail;

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
      exporter: (0, import_fields.relationship)({
        ref: "Exporter",
        many: false
      }),
      exporterBusiness: (0, import_fields.relationship)({ ref: "ExporterBusiness" }),
      exporterCompany: (0, import_fields.relationship)({ ref: "ExporterCompany" }),
      exporterBroker: (0, import_fields.relationship)({ ref: "ExporterBroker" }),
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
            const { id: exporterCompanyId } = await context.db.ExporterCompany.createOne({
              data: {}
            });
            modifiedData.exporterCompany = {
              connect: {
                id: exporterCompanyId
              }
            };
            await context.db.ExporterCompanyAddress.createOne({
              data: {
                exporterCompany: {
                  connect: {
                    id: exporterCompanyId
                  }
                }
              }
            });
            const { id: exporterBusinessId } = await context.db.ExporterBusiness.createOne({
              data: {}
            });
            modifiedData.exporterBusiness = {
              connect: {
                id: exporterBusinessId
              }
            };
            const { id: exporterBrokerId } = await context.db.ExporterBroker.createOne({
              data: {}
            });
            modifiedData.exporterBroker = {
              connect: {
                id: exporterBrokerId
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
            const {
              referenceNumber,
              eligibilityId,
              policyAndExportId,
              exporterCompanyId,
              exporterBusinessId,
              exporterBrokerId,
              buyerId,
              sectionReviewId,
              declarationId
            } = item;
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
            await context.db.ExporterCompany.updateOne({
              where: { id: exporterCompanyId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.ExporterBusiness.updateOne({
              where: { id: exporterBusinessId },
              data: {
                application: {
                  connect: {
                    id: applicationId
                  }
                }
              }
            });
            await context.db.ExporterBroker.updateOne({
              where: { id: exporterBrokerId },
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
    access: import_access.allowAll
  },
  Exporter: (0, import_core.list)({
    fields: {
      createdAt: (0, import_fields.timestamp)(),
      updatedAt: (0, import_fields.timestamp)(),
      firstName: (0, import_fields.text)({ validation: { isRequired: true } }),
      lastName: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({ validation: { isRequired: true } }),
      salt: (0, import_fields.text)({ validation: { isRequired: true } }),
      hash: (0, import_fields.text)({ validation: { isRequired: true } }),
      // isVerified flag will only be true if the exporter has verified their email address.
      isVerified: (0, import_fields.checkbox)({ defaultValue: false }),
      verificationHash: (0, import_fields.text)(),
      verificationExpiry: (0, import_fields.timestamp)(),
      otpSalt: (0, import_fields.text)(),
      otpHash: (0, import_fields.text)({
        db: { nativeType: "VarChar(256)" }
      }),
      otpExpiry: (0, import_fields.timestamp)(),
      sessionExpiry: (0, import_fields.timestamp)(),
      sessionIdentifier: (0, import_fields.text)(),
      applications: (0, import_fields.relationship)({
        ref: "Application",
        many: true
      })
    },
    hooks: {
      resolveInput: async ({ operation, resolvedData }) => {
        const accountInputData = resolvedData;
        if (operation === "create") {
          console.info("Creating new exporter account");
          const now = /* @__PURE__ */ new Date();
          accountInputData.createdAt = now;
          accountInputData.updatedAt = now;
          try {
            const { firstName, email, verificationHash } = accountInputData;
            const emailResponse = await emails_default.confirmEmailAddress(email, firstName, verificationHash);
            if (emailResponse.success) {
              return accountInputData;
            }
            throw new Error(`Sending email verification for account creation (resolveInput hook) ${emailResponse}`);
          } catch (err) {
            throw new Error(`Sending email verification for account creation (resolveInput hook) { err }`);
          }
        }
        if (operation === "update") {
          console.info("Updating exporter account");
          accountInputData.updatedAt = /* @__PURE__ */ new Date();
        }
        return accountInputData;
      }
    },
    access: import_access.allowAll
  }),
  ExporterBusiness: (0, import_core.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      goodsOrServicesSupplied: (0, import_fields.text)({
        db: { nativeType: "VarChar(1000)" }
      }),
      totalYearsExporting: (0, import_fields.integer)(),
      totalEmployeesUK: (0, import_fields.integer)(),
      totalEmployeesInternational: (0, import_fields.integer)(),
      estimatedAnnualTurnover: (0, import_fields.integer)(),
      exportsTurnoverPercentage: (0, import_fields.integer)()
    },
    access: import_access.allowAll
  }),
  ExporterBroker: (0, import_core.list)({
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
    access: import_access.allowAll
  }),
  ExporterCompanyAddress: (0, import_core.list)({
    fields: {
      exporterCompany: (0, import_fields.relationship)({ ref: "ExporterCompany.registeredOfficeAddress" }),
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
  ExporterCompany: (0, import_core.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: "Application" }),
      registeredOfficeAddress: (0, import_fields.relationship)({ ref: "ExporterCompanyAddress.exporterCompany" }),
      sicCodes: (0, import_fields.relationship)({
        ref: "ExporterCompanySicCode.exporterCompany",
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
    access: import_access.allowAll
  }),
  ExporterCompanySicCode: (0, import_core.list)({
    fields: {
      exporterCompany: (0, import_fields.relationship)({ ref: "ExporterCompany.sicCodes" }),
      sicCode: (0, import_fields.text)()
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
      exporterBusiness: (0, import_fields.checkbox)(),
      buyer: (0, import_fields.checkbox)()
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

// custom-schema.ts
var import_schema = require("@graphql-tools/schema");
var import_axios = __toESM(require("axios"));
var import_dotenv4 = __toESM(require("dotenv"));

// custom-resolvers/create-account.ts
var import_crypto = __toESM(require("crypto"));

// helpers/get-account-by-field.ts
var getAccountByField = async (context, field, value) => {
  try {
    console.info("Getting exporter account by field/value");
    const exportersArray = await context.db.Exporter.findMany({
      where: {
        [field]: { equals: value }
      },
      take: 1
    });
    if (!exportersArray || !exportersArray.length || !exportersArray[0]) {
      console.info("Getting exporter by field - no exporter exists with the provided field/value");
      return false;
    }
    const exporter = exportersArray[0];
    return exporter;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting exporter account by field/value ${err}`);
  }
};
var get_account_by_field_default = getAccountByField;

// custom-resolvers/create-account.ts
var { EMAIL, ENCRYPTION } = ACCOUNT;
var {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH }
  }
} = ENCRYPTION;
var createAccount = async (root, variables, context) => {
  console.info("Creating new exporter account for ", variables.email);
  try {
    const { firstName, lastName, email, password: password2 } = variables;
    const exporter = await get_account_by_field_default(context, "email", email);
    if (exporter) {
      console.info(`Unable to create new exporter account for ${variables.email} - account already exists`);
      return { success: false };
    }
    const salt = import_crypto.default.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);
    const passwordHash = import_crypto.default.pbkdf2Sync(password2, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);
    const verificationHash = import_crypto.default.pbkdf2Sync(password2, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);
    const verificationExpiry = EMAIL.VERIFICATION_EXPIRY();
    const account = {
      firstName,
      lastName,
      email,
      salt,
      hash: passwordHash,
      verificationHash,
      verificationExpiry
    };
    const response = await context.db.Exporter.createOne({
      data: account
    });
    return {
      ...response,
      success: true
    };
  } catch (err) {
    throw new Error(`Creating new exporter account ${err}`);
  }
};
var create_account_default = createAccount;

// custom-resolvers/verify-account-email-address.ts
var import_date_fns2 = require("date-fns");
var verifyAccountEmailAddress = async (root, variables, context) => {
  try {
    console.info("Verifying exporter email address");
    const exporter = await get_account_by_field_default(context, FIELD_IDS.ACCOUNT.VERIFICATION_HASH, variables.token);
    if (exporter) {
      const { id } = exporter;
      const now = /* @__PURE__ */ new Date();
      const canActivateExporter = (0, import_date_fns2.isBefore)(now, exporter.verificationExpiry);
      if (!canActivateExporter) {
        console.info("Unable to verify exporter email - verification period has expired");
        return {
          expired: true,
          success: false,
          accountId: id
        };
      }
      await context.db.Exporter.updateOne({
        where: { id: exporter.id },
        data: {
          isVerified: true,
          verificationHash: "",
          verificationExpiry: null
        }
      });
      return {
        success: true,
        accountId: id,
        emailRecipient: exporter.email
      };
    }
    console.info("Unable to verify exporter email - no account found");
    return {
      success: false
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying exporter email address ${err}`);
  }
};
var verify_account_email_address_default = verifyAccountEmailAddress;

// helpers/get-exporter-by-id.ts
var getExporterById = async (context, exporterId) => {
  try {
    console.info("Getting exporter by ID");
    const exporter = await context.db.Exporter.findOne({
      where: {
        id: exporterId
      }
    });
    return exporter;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting exporter by ID ${err}`);
  }
};
var get_exporter_by_id_default = getExporterById;

// custom-resolvers/send-email-confirm-email-address.ts
var sendEmailConfirmEmailAddress = async (root, variables, context) => {
  try {
    const exporter = await get_exporter_by_id_default(context, variables.exporterId);
    if (!exporter) {
      console.info("Sending email verification for account creation - no exporter exists with the provided ID");
      return {
        success: false
      };
    }
    const { email, firstName, verificationHash } = exporter;
    const emailResponse = await emails_default.confirmEmailAddress(email, firstName, verificationHash);
    if (emailResponse.success) {
      return emailResponse;
    }
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${emailResponse}`);
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${err}`);
  }
};
var send_email_confirm_email_address_default = sendEmailConfirmEmailAddress;

// helpers/is-valid-account-password.ts
var import_crypto2 = __toESM(require("crypto"));
var { ENCRYPTION: ENCRYPTION2 } = ACCOUNT;
var {
  STRING_TYPE: STRING_TYPE2,
  PBKDF2: { ITERATIONS: ITERATIONS2, DIGEST_ALGORITHM: DIGEST_ALGORITHM2 },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH2 }
  }
} = ENCRYPTION2;
var isValidAccountPassword = (password2, salt, hash) => {
  console.info("Validating exporter account password");
  const hashVerify = import_crypto2.default.pbkdf2Sync(password2, salt, ITERATIONS2, KEY_LENGTH2, DIGEST_ALGORITHM2).toString(STRING_TYPE2);
  if (hash === hashVerify) {
    console.info("Valid exporter account password");
    return true;
  }
  console.info("Invalid exporter account password");
  return false;
};
var is_valid_account_password_default = isValidAccountPassword;

// helpers/generate-otp.ts
var import_crypto3 = __toESM(require("crypto"));
var import_otplib = require("otplib");
var { ENCRYPTION: ENCRYPTION3, OTP } = ACCOUNT;
var {
  RANDOM_BYTES_SIZE: RANDOM_BYTES_SIZE2,
  STRING_TYPE: STRING_TYPE3,
  PBKDF2: { ITERATIONS: ITERATIONS3, DIGEST_ALGORITHM: DIGEST_ALGORITHM3 },
  OTP: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH3 }
  }
} = ENCRYPTION3;
var generateOtp = () => {
  try {
    console.info("Generating OTP");
    const salt = import_crypto3.default.randomBytes(RANDOM_BYTES_SIZE2).toString(STRING_TYPE3);
    import_otplib.authenticator.options = { digits: OTP.DIGITS };
    const securityCode = import_otplib.authenticator.generate(salt);
    const hash = import_crypto3.default.pbkdf2Sync(securityCode, salt, ITERATIONS3, KEY_LENGTH3, DIGEST_ALGORITHM3).toString(STRING_TYPE3);
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

// helpers/generate-otp-and-update-account.ts
var generateOTPAndUpdateAccount = async (context, accountId) => {
  try {
    console.info("Adding OTP to exporter account");
    const otp = generate_otp_default.otp();
    const { securityCode, salt, hash, expiry } = otp;
    const accountUpdate = {
      otpSalt: salt,
      otpHash: hash,
      otpExpiry: expiry
    };
    await context.db.Exporter.updateOne({
      where: { id: accountId },
      data: accountUpdate
    });
    return {
      success: true,
      securityCode
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Adding OTP to exporter account ${err}`);
  }
};
var generate_otp_and_update_account_default = generateOTPAndUpdateAccount;

// custom-resolvers/account-sign-in.ts
var accountSignIn = async (root, variables, context) => {
  try {
    console.info("Signing in exporter account");
    const { email, password: password2 } = variables;
    const exporter = await get_account_by_field_default(context, FIELD_IDS.ACCOUNT.EMAIL, email);
    if (!exporter) {
      console.info("Unable to validate exporter account - no account found");
      return { success: false };
    }
    if (!exporter.isVerified) {
      console.info("Unable to validate exporter account - account is not verified");
      return { success: false };
    }
    if (is_valid_account_password_default(password2, exporter.salt, exporter.hash)) {
      const { securityCode } = await generate_otp_and_update_account_default(context, exporter.id);
      const emailResponse = await emails_default.securityCodeEmail(email, exporter.firstName, securityCode);
      if (emailResponse.success) {
        return {
          ...emailResponse,
          accountId: exporter.id
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

// custom-resolvers/account-sign-in-new-code.ts
var accountSignInSendNewCode = async (root, variables, context) => {
  try {
    console.info("Generating and sending new sign in code for exporter account");
    const { accountId } = variables;
    const exporter = await get_exporter_by_id_default(context, accountId);
    if (!exporter) {
      console.info("Unable to validate exporter account - no account found");
      return { success: false };
    }
    const { securityCode } = await generate_otp_and_update_account_default(context, exporter.id);
    const { email, firstName } = exporter;
    const emailResponse = await emails_default.securityCodeEmail(email, firstName, securityCode);
    if (emailResponse.success) {
      return {
        ...emailResponse,
        accountId: exporter.id
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Generating and sending new sign in code for exporter account (accountSignInSendNewCode mutation) ${err}`);
  }
};
var account_sign_in_new_code_default = accountSignInSendNewCode;

// custom-resolvers/verify-account-sign-in-code.ts
var import_date_fns3 = require("date-fns");

// helpers/is-valid-otp.ts
var import_crypto4 = __toESM(require("crypto"));
var { ENCRYPTION: ENCRYPTION4 } = ACCOUNT;
var {
  STRING_TYPE: STRING_TYPE4,
  PBKDF2: { ITERATIONS: ITERATIONS4, DIGEST_ALGORITHM: DIGEST_ALGORITHM4 },
  OTP: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH4 }
  }
} = ENCRYPTION4;
var isValidOTP = (securityCode, otpSalt, otpHash) => {
  try {
    console.info("Validating OTP");
    const hashVerify = import_crypto4.default.pbkdf2Sync(securityCode, otpSalt, ITERATIONS4, KEY_LENGTH4, DIGEST_ALGORITHM4).toString(STRING_TYPE4);
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

// helpers/create-jwt.ts
var import_crypto5 = __toESM(require("crypto"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var {
  ENCRYPTION: { RANDOM_BYTES_SIZE: RANDOM_BYTES_SIZE3, STRING_TYPE: STRING_TYPE5 },
  JWT: {
    KEY: { SIGNATURE, ENCODING, STRING_ENCODING },
    TOKEN: { EXPIRY, ALGORITHM }
  }
} = ACCOUNT;
var PRIV_KEY = Buffer.from(SIGNATURE, ENCODING).toString(STRING_ENCODING);
var createJWT = (accountId) => {
  const sessionIdentifier = import_crypto5.default.randomBytes(RANDOM_BYTES_SIZE3).toString(STRING_TYPE5);
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

// custom-resolvers/verify-account-sign-in-code.ts
var {
  JWT: { SESSION_EXPIRY }
} = ACCOUNT;
var verifyAccountSignInCode = async (root, variables, context) => {
  try {
    console.info("Verifying exporter account sign in code");
    const { accountId, securityCode } = variables;
    const exporter = await get_exporter_by_id_default(context, accountId);
    if (!exporter) {
      console.info("Unable to verify exporter account sign in code - no exporter exists with the provided ID");
      return {
        success: false
      };
    }
    if (!exporter.otpSalt || !exporter.otpHash || !exporter.otpExpiry) {
      console.info("Unable to verify exporter account sign in code - no OTP available for this account");
      return {
        success: false
      };
    }
    const { otpSalt, otpHash, otpExpiry } = exporter;
    const now = /* @__PURE__ */ new Date();
    const hasExpired = (0, import_date_fns3.isAfter)(now, otpExpiry);
    if (hasExpired) {
      console.info("Unable to verify exporter account sign in code - verification period has expired");
      return {
        success: false,
        expired: true
      };
    }
    const isValid = otpSalt && otpHash && is_valid_otp_default(securityCode, otpSalt, otpHash);
    if (isValid) {
      const jwt = create_jwt_default.JWT(accountId);
      const { sessionIdentifier } = jwt;
      const accountUpdate = {
        sessionIdentifier,
        sessionExpiry: SESSION_EXPIRY(),
        otpSalt: "",
        otpHash: "",
        otpExpiry: null
      };
      await context.db.Exporter.updateOne({
        where: { id: accountId },
        data: accountUpdate
      });
      return {
        success: true,
        accountId: exporter.id,
        lastName: exporter.lastName,
        firstName: exporter.firstName,
        ...jwt,
        expires: accountUpdate.sessionExpiry
      };
    }
    return {
      success: false
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying exporter account sign in code and generating JWT (verifyAccountSignInCode mutation) ${err}`);
  }
};
var verify_account_sign_in_code_default = verifyAccountSignInCode;

// custom-resolvers/add-and-get-OTP.ts
var addAndGetOTP = async (root, variables, context) => {
  try {
    console.info("Adding OTP to exporter account");
    const { email } = variables;
    const exporter = await get_account_by_field_default(context, FIELD_IDS.ACCOUNT.EMAIL, email);
    if (!exporter) {
      console.info("Unable to generate and add OTP to exporter account - no account found");
      return { success: false };
    }
    const { securityCode } = await generate_otp_and_update_account_default(context, exporter.id);
    return {
      success: true,
      securityCode
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Adding OTP to exporter account (addAndGetOTP mutation) ${err}`);
  }
};
var add_and_get_OTP_default = addAndGetOTP;

// custom-resolvers/delete-application-by-refrence-number.ts
var deleteApplicationByReferenceNumber = async (root, variables, context) => {
  try {
    console.info("Deleting application by reference number");
    const { referenceNumber } = variables;
    const application = await context.db.Application.findMany({
      where: {
        referenceNumber: { equals: referenceNumber }
      }
    });
    const { id } = application[0];
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

// emails/send-application-submitted-emails/index.ts
var send = async (context, referenceNumber, accountId, buyerId, declarationId, exporterCompanyId, csvPath) => {
  try {
    const exporter = await get_exporter_by_id_default(context, accountId);
    if (!exporter) {
      console.error("Sending application submitted emails - no exporter exists with the provided ID");
      return {
        success: false
      };
    }
    const buyer = await context.db.Buyer.findOne({
      where: { id: buyerId }
    });
    if (!buyer) {
      console.error("Sending application submitted emails - no buyer exists with the provided ID");
      return {
        success: false
      };
    }
    const declaration = await context.db.Declaration.findOne({
      where: { id: declarationId }
    });
    if (!declaration) {
      console.error("Sending application submitted emails - no declarations exist with the provided ID");
      return {
        success: false
      };
    }
    const exporterCompany = await context.db.ExporterCompany.findOne({
      where: { id: exporterCompanyId }
    });
    if (!exporterCompany) {
      console.error("Sending application submitted emails - no exporter company exists with the provided ID");
      return {
        success: false
      };
    }
    const { email, firstName } = exporter;
    const sendEmailVars = {
      emailAddress: email,
      firstName,
      referenceNumber,
      buyerName: buyer.companyOrOrganisationName,
      exporterCompanyName: exporterCompany.companyName
    };
    const exporterSubmittedResponse = await emails_default.applicationSubmitted.exporter(sendEmailVars);
    if (!exporterSubmittedResponse.success) {
      throw new Error("Sending application submitted email to exporter");
    }
    const underwritingTeamSubmittedResponse = await emails_default.applicationSubmitted.underwritingTeam(sendEmailVars, csvPath);
    if (!underwritingTeamSubmittedResponse.success) {
      throw new Error("Sending application submitted email to underwriting team");
    }
    let documentsResponse;
    let templateId = "";
    const hasAntiBriberyCodeOfConduct = declaration.hasAntiBriberyCodeOfConduct === ANSWERS.YES;
    if (hasAntiBriberyCodeOfConduct) {
      templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;
    }
    const isConectedWithBuyer = buyer.exporterIsConnectedWithBuyer && buyer.exporterIsConnectedWithBuyer === ANSWERS.YES;
    if (isConectedWithBuyer) {
      templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;
    }
    if (hasAntiBriberyCodeOfConduct && isConectedWithBuyer) {
      templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;
    }
    if (templateId) {
      documentsResponse = await emails_default.documentsEmail(sendEmailVars, templateId);
      if (documentsResponse.success) {
        return documentsResponse;
      }
      throw new Error(`Sending application submitted emails ${documentsResponse}`);
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
  send
};
var send_application_submitted_emails_default = applicationSubmittedEmails;

// generate-csv/index.ts
var import_fs2 = __toESM(require("fs"));
var import_csv_stringify = require("csv-stringify");

// generate-csv/map-application-to-csv/helpers/csv-row-seperator/index.ts
var ROW_SEPERATOR = {
  Field: "-",
  Answer: "-"
};
var csv_row_seperator_default = ROW_SEPERATOR;

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

// constants/field-ids/index.ts
var FIELD_IDS2 = {
  ...shared_default,
  ...shared_eligibility_default,
  INSURANCE: insurance_default
};

// content-strings/fields/insurance/policy-and-exports/index.ts
var { POLICY_AND_EXPORTS: POLICY_AND_EXPORTS2 } = FIELD_IDS2.INSURANCE;
var { CONTRACT_POLICY, ABOUT_GOODS_OR_SERVICES } = POLICY_AND_EXPORTS2;
var POLICY_AND_EXPORTS_FIELDS = {
  [POLICY_AND_EXPORTS2.POLICY_TYPE]: {
    ID: FIELD_IDS2.POLICY_TYPE,
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
  YOUR_COMPANY: { TRADING_ADDRESS, TRADING_NAME, PHONE_NUMBER, WEBSITE },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  TURNOVER: { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  BROKER: { USING_BROKER, NAME, ADDRESS_LINE_1, EMAIL: EMAIL2 }
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
    [WEBSITE]: {
      SUMMARY: {
        TITLE: "Company website (optional)"
      }
    },
    [PHONE_NUMBER]: {
      SUMMARY: {
        TITLE: "UK telephone number (optional)"
      }
    }
  },
  NATURE_OF_YOUR_BUSINESS: {
    [GOODS_OR_SERVICES]: {
      SUMMARY: {
        TITLE: "Goods or services your business supplies"
      }
    },
    [YEARS_EXPORTING]: {
      SUMMARY: {
        TITLE: "Years exporting"
      }
    },
    [EMPLOYEES_UK]: {
      SUMMARY: {
        TITLE: "UK employees"
      }
    },
    [EMPLOYEES_INTERNATIONAL]: {
      SUMMARY: {
        TITLE: "Worldwide employees including UK employees"
      }
    }
  },
  TURNOVER: {
    [ESTIMATED_ANNUAL_TURNOVER]: {
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
    [USING_BROKER]: {
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
    [EMAIL2]: {
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
    TITLE: "Application reference"
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

// generate-csv/map-application-to-csv/helpers/csv-row/index.ts
var csvRow = (fieldName, answer) => ({
  Field: fieldName,
  Answer: answer
});
var csv_row_default = csvRow;

// generate-csv/map-application-to-csv/helpers/format-date/index.ts
var import_date_fns4 = require("date-fns");
var formatDate = (timestamp2, dateFormat = "d MMMM yyyy") => (0, import_date_fns4.format)(new Date(timestamp2), dateFormat);
var format_date_default = formatDate;

// generate-csv/map-application-to-csv/helpers/format-time-of-day/index.ts
var formatTimeOfDay = (date) => {
  const fullDate = new Date(date);
  return `${fullDate.getHours()}:${fullDate.getMinutes()}`;
};
var format_time_of_day_default = formatTimeOfDay;

// generate-csv/map-application-to-csv/map-reference-number-and-dates/index.ts
var mapReferenceNumberAndDates = (application) => {
  const mapped = [
    csv_row_default(REFERENCE_NUMBER.SUMMARY.TITLE, application.referenceNumber),
    csv_row_default(DATE_SUBMITTED.SUMMARY.TITLE, format_date_default(application.submissionDate)),
    csv_row_default(TIME_SUBMITTED.SUMMARY.TITLE, format_time_of_day_default(application.submissionDate))
  ];
  return mapped;
};
var map_reference_number_and_dates_default = mapReferenceNumberAndDates;

// content-strings/default.ts
var DEFAULT = {
  EMPTY: "-"
};

// generate-csv/map-application-to-csv/helpers/map-yes-no-field/index.ts
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

// generate-csv/map-application-to-csv/map-eligibility/index.ts
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
var mapEligibility = (application) => {
  const { eligibility } = application;
  const mapped = [
    csv_row_default(FIELDS_ELIGIBILITY[BUYER_COUNTRY2].SUMMARY?.TITLE, eligibility[BUYER_COUNTRY2].name),
    csv_row_default(FIELDS_ELIGIBILITY[VALID_EXPORTER_LOCATION2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[VALID_EXPORTER_LOCATION2])),
    csv_row_default(FIELDS_ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES2])),
    csv_row_default(FIELDS_ELIGIBILITY[WANT_COVER_OVER_MAX_AMOUNT2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[WANT_COVER_OVER_MAX_AMOUNT2])),
    csv_row_default(FIELDS_ELIGIBILITY[WANT_COVER_OVER_MAX_PERIOD2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[WANT_COVER_OVER_MAX_PERIOD2])),
    csv_row_default(FIELDS_ELIGIBILITY[OTHER_PARTIES_INVOLVED2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[OTHER_PARTIES_INVOLVED2])),
    csv_row_default(FIELDS_ELIGIBILITY[LETTER_OF_CREDIT2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[LETTER_OF_CREDIT2])),
    csv_row_default(FIELDS_ELIGIBILITY[PRE_CREDIT_PERIOD2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[PRE_CREDIT_PERIOD2])),
    csv_row_default(FIELDS_ELIGIBILITY[COMPANIES_HOUSE_NUMBER2].SUMMARY?.TITLE, map_yes_no_field_default(eligibility[COMPANIES_HOUSE_NUMBER2]))
  ];
  return mapped;
};
var map_eligibility_default = mapEligibility;

// generate-csv/map-application-to-csv/helpers/format-currency/index.ts
var formatCurrency = (number, currencyCode, decimalPoints) => number.toLocaleString("en", {
  style: "currency",
  currency: currencyCode,
  minimumFractionDigits: decimalPoints || 0,
  maximumFractionDigits: decimalPoints || 0
});
var format_currency_default = formatCurrency;

// generate-csv/map-application-to-csv/map-policy-and-export/index.ts
var CONTENT_STRINGS = {
  ...POLICY_AND_EXPORTS_FIELDS,
  ...POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY,
  SINGLE: POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY.SINGLE,
  MULTIPLE: POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY.MULTIPLE
};
var {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE }
  }
} = insurance_default.POLICY_AND_EXPORTS;
var mapPolicyAndExport = (application) => {
  let mapped = [];
  const { policyAndExport } = application;
  mapped = [
    csv_row_default(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE]),
    csv_row_default(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), format_date_default(policyAndExport[REQUESTED_START_DATE])),
    csv_row_default(String(CONTENT_STRINGS.SINGLE[CONTRACT_COMPLETION_DATE].SUMMARY?.TITLE), format_date_default(policyAndExport[CONTRACT_COMPLETION_DATE])),
    csv_row_default(String(CONTENT_STRINGS.SINGLE[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), format_currency_default(policyAndExport[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE))
  ];
  return mapped;
};
var map_policy_and_export_default = mapPolicyAndExport;

// generate-csv/map-application-to-csv/helpers/csv-new-line/index.ts
var NEW_LINE = "\r\n";
var csv_new_line_default = NEW_LINE;

// generate-csv/map-application-to-csv/map-exporter/index.ts
var CONTENT_STRINGS2 = {
  ...FIELDS.COMPANY_DETAILS,
  ...FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...FIELDS.TURNOVER,
  ...FIELDS.BROKER
};
var {
  COMPANY_HOUSE: { COMPANY_NUMBER: COMPANY_NUMBER2, COMPANY_NAME: COMPANY_NAME2, COMPANY_ADDRESS: COMPANY_ADDRESS2, COMPANY_INCORPORATED: COMPANY_INCORPORATED2, COMPANY_SIC: COMPANY_SIC2, FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE2 },
  YOUR_COMPANY: { TRADING_NAME: TRADING_NAME2, TRADING_ADDRESS: TRADING_ADDRESS2, WEBSITE: WEBSITE2, PHONE_NUMBER: PHONE_NUMBER2 },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: GOODS_OR_SERVICES2, YEARS_EXPORTING: YEARS_EXPORTING2, EMPLOYEES_UK: EMPLOYEES_UK2, EMPLOYEES_INTERNATIONAL: EMPLOYEES_INTERNATIONAL2 },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER: ESTIMATED_ANNUAL_TURNOVER2, PERCENTAGE_TURNOVER: PERCENTAGE_TURNOVER2 },
  BROKER: { USING_BROKER: USING_BROKER2, NAME: BROKER_NAME, ADDRESS_LINE_1: ADDRESS_LINE_12, TOWN, COUNTY, POSTCODE, EMAIL: EMAIL3 }
} = exporter_business_default;
var mapExporter = (application) => {
  const { exporterCompany, exporterBusiness, exporterBroker } = application;
  const mapped = [
    // exporter company fields
    csv_row_default(CONTENT_STRINGS2[COMPANY_NUMBER2].SUMMARY?.TITLE, exporterCompany[COMPANY_NUMBER2]),
    csv_row_default(CONTENT_STRINGS2[COMPANY_NAME2].SUMMARY?.TITLE, exporterCompany[COMPANY_NAME2]),
    csv_row_default(CONTENT_STRINGS2[COMPANY_ADDRESS2].SUMMARY?.TITLE, exporterCompany[COMPANY_ADDRESS2]),
    csv_row_default(CONTENT_STRINGS2[COMPANY_INCORPORATED2].SUMMARY?.TITLE, format_date_default(exporterCompany[COMPANY_INCORPORATED2])),
    csv_row_default(CONTENT_STRINGS2[COMPANY_SIC2].SUMMARY?.TITLE, exporterCompany[COMPANY_SIC2]),
    csv_row_default(CONTENT_STRINGS2[FINANCIAL_YEAR_END_DATE2].SUMMARY?.TITLE, format_date_default(exporterCompany[FINANCIAL_YEAR_END_DATE2])),
    csv_row_default(CONTENT_STRINGS2[TRADING_NAME2].SUMMARY?.TITLE, exporterCompany[TRADING_NAME2]),
    csv_row_default(CONTENT_STRINGS2[TRADING_ADDRESS2].SUMMARY?.TITLE, exporterCompany[TRADING_ADDRESS2]),
    csv_row_default(CONTENT_STRINGS2[WEBSITE2].SUMMARY?.TITLE, exporterCompany[WEBSITE2]),
    csv_row_default(CONTENT_STRINGS2[PHONE_NUMBER2].SUMMARY?.TITLE, exporterCompany[PHONE_NUMBER2]),
    // exporter business fields
    csv_row_default(CONTENT_STRINGS2[GOODS_OR_SERVICES2].SUMMARY?.TITLE, exporterBusiness[GOODS_OR_SERVICES2]),
    csv_row_default(CONTENT_STRINGS2[YEARS_EXPORTING2].SUMMARY?.TITLE, exporterBusiness[YEARS_EXPORTING2]),
    csv_row_default(CONTENT_STRINGS2[EMPLOYEES_UK2].SUMMARY?.TITLE, exporterBusiness[EMPLOYEES_UK2]),
    csv_row_default(CONTENT_STRINGS2[EMPLOYEES_INTERNATIONAL2].SUMMARY?.TITLE, exporterBusiness[EMPLOYEES_INTERNATIONAL2]),
    csv_row_default(CONTENT_STRINGS2[ESTIMATED_ANNUAL_TURNOVER2].SUMMARY?.TITLE, exporterBusiness[ESTIMATED_ANNUAL_TURNOVER2]),
    csv_row_default(CONTENT_STRINGS2[PERCENTAGE_TURNOVER2].SUMMARY?.TITLE, exporterBusiness[PERCENTAGE_TURNOVER2]),
    // broker fields
    csv_row_default(CONTENT_STRINGS2[USING_BROKER2].SUMMARY?.TITLE, exporterBroker[USING_BROKER2]),
    csv_row_default(CONTENT_STRINGS2[BROKER_NAME].SUMMARY?.TITLE, exporterBroker[BROKER_NAME]),
    csv_row_default(
      CONTENT_STRINGS2[ADDRESS_LINE_12].SUMMARY?.TITLE,
      `${exporterBroker[ADDRESS_LINE_12]} ${csv_new_line_default} ${exporterBroker[TOWN]} ${csv_new_line_default} ${exporterBroker[COUNTY]} ${csv_new_line_default} ${exporterBroker[POSTCODE]}`
    ),
    csv_row_default(CONTENT_STRINGS2[EMAIL3].SUMMARY?.TITLE, exporterBroker[EMAIL3])
  ];
  return mapped;
};
var map_exporter_default = mapExporter;

// generate-csv/map-application-to-csv/map-buyer/index.ts
var CONTENT_STRINGS3 = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS.WORKING_WITH_BUYER
};
var {
  COMPANY_OR_ORGANISATION: { NAME: NAME2, ADDRESS, REGISTRATION_NUMBER, WEBSITE: WEBSITE3, FIRST_NAME, LAST_NAME, POSITION, EMAIL: EMAIL4, CAN_CONTACT_BUYER },
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, TRADED_WITH_BUYER }
} = your_buyer_default;
var mapBuyer = (application) => {
  const { buyer } = application;
  const mapped = [
    csv_row_default(String(CONTENT_STRINGS3[NAME2].SUMMARY?.TITLE), buyer[NAME2]),
    csv_row_default(String(CONTENT_STRINGS3[ADDRESS].SUMMARY?.TITLE), buyer[ADDRESS]),
    csv_row_default(String(CONTENT_STRINGS3[REGISTRATION_NUMBER].SUMMARY?.TITLE), buyer[REGISTRATION_NUMBER]),
    csv_row_default(String(CONTENT_STRINGS3[WEBSITE3].SUMMARY?.TITLE), buyer[WEBSITE3]),
    csv_row_default(
      String(CONTENT_STRINGS3[FIRST_NAME].SUMMARY?.TITLE),
      `${buyer[FIRST_NAME]} ${buyer[LAST_NAME]} ${csv_new_line_default} ${buyer[POSITION]} ${csv_new_line_default} ${buyer[EMAIL4]}`
    ),
    csv_row_default(String(CONTENT_STRINGS3[CAN_CONTACT_BUYER].SUMMARY?.TITLE), buyer[CAN_CONTACT_BUYER]),
    csv_row_default(String(CONTENT_STRINGS3[CONNECTED_WITH_BUYER].SUMMARY?.TITLE), buyer[CONNECTED_WITH_BUYER]),
    csv_row_default(String(CONTENT_STRINGS3[TRADED_WITH_BUYER].SUMMARY?.TITLE), buyer[TRADED_WITH_BUYER])
  ];
  return mapped;
};
var map_buyer_default = mapBuyer;

// generate-csv/map-application-to-csv/index.ts
var mapApplicationToCsv = (application) => {
  const mapped = [
    csv_row_seperator_default,
    ...map_reference_number_and_dates_default(application),
    csv_row_seperator_default,
    ...map_eligibility_default(application),
    csv_row_seperator_default,
    ...map_policy_and_export_default(application),
    csv_row_seperator_default,
    ...map_exporter_default(application),
    csv_row_seperator_default,
    ...map_buyer_default(application)
  ];
  return mapped;
};
var map_application_to_csv_default = mapApplicationToCsv;

// generate-csv/index.ts
var csv = (application) => {
  const { referenceNumber } = application;
  const filePath = `./csv/${referenceNumber}.csv`;
  const csvData = map_application_to_csv_default(application);
  (0, import_csv_stringify.stringify)(csvData, { header: true }, (err, output) => {
    import_fs2.default.writeFile(filePath, output, (result) => {
      return result;
    });
  });
  return filePath;
};
var generate2 = {
  csv
};
var generate_csv_default = generate2;

// custom-resolvers/submit-application.ts
var submitApplication = async (root, variables, context) => {
  try {
    console.info("Submitting application");
    const application = await context.db.Application.findOne({
      where: { id: variables.applicationId }
    });
    if (application) {
      const canSubmit = application.status === APPLICATION.STATUS.DRAFT;
      if (canSubmit) {
        const now = /* @__PURE__ */ new Date();
        const update = {
          status: APPLICATION.STATUS.SUBMITTED,
          previousStatus: APPLICATION.STATUS.DRAFT,
          submissionDate: now
        };
        await context.db.Application.updateOne({
          where: { id: application.id },
          data: update
        });
        const {
          eligibilityId,
          referenceNumber,
          exporterId,
          policyAndExportId,
          buyerId,
          exporterCompanyId,
          exporterBusinessId,
          exporterBrokerId,
          declarationId
        } = application;
        const eligibility = await context.db.Eligibility.findOne({
          where: { id: eligibilityId }
        });
        const buyerCountry = await context.db.Country.findOne({
          where: { id: eligibility?.buyerCountryId }
        });
        const policyAndExport = await context.db.PolicyAndExport.findOne({
          where: { id: policyAndExportId }
        });
        const exporterCompany = await context.db.ExporterCompany.findOne({
          where: { id: exporterCompanyId }
        });
        const exporterBusiness = await context.db.ExporterBusiness.findOne({
          where: { id: exporterBusinessId }
        });
        const exporterBroker = await context.db.ExporterBroker.findOne({
          where: { id: exporterBrokerId }
        });
        const buyer = await context.db.Buyer.findOne({
          where: { id: application.buyerId }
        });
        const getPopulatedApplication = async () => ({
          ...application,
          eligibility: {
            ...eligibility,
            buyerCountry
          },
          policyAndExport,
          exporterCompany,
          exporterBusiness,
          exporterBroker,
          buyer
        });
        const populatedApplication = await getPopulatedApplication();
        const csvPath = generate_csv_default.csv(populatedApplication);
        await send_application_submitted_emails_default.send(context, referenceNumber, exporterId, buyerId, declarationId, exporterCompanyId, csvPath);
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

// helpers/create-full-timestamp-from-day-month.ts
var createFullTimestampFromDayAndMonth = (day, month) => {
  if (day && month) {
    return /* @__PURE__ */ new Date(`${(/* @__PURE__ */ new Date()).getFullYear()}-${month}-${day}`);
  }
  return null;
};
var create_full_timestamp_from_day_month_default = createFullTimestampFromDayAndMonth;

// helpers/mapCompaniesHouseFields.ts
var mapCompaniesHouseFields = (companiesHouseResponse) => {
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
    // creates timestamp for financialYearEndDate from day and month if exist
    financialYearEndDate: create_full_timestamp_from_day_month_default(
      companiesHouseResponse.accounts?.accounting_reference_date?.day,
      companiesHouseResponse.accounts?.accounting_reference_date?.month
    )
  };
};

// helpers/mapSicCodes.ts
var mapSicCodes = (company, sicCodes) => {
  const mapped = [];
  if (!sicCodes || !sicCodes.length) {
    return mapped;
  }
  sicCodes.forEach((code) => {
    const codeToAdd = {
      sicCode: code,
      exporterCompany: {
        connect: {
          id: company.id
        }
      }
    };
    mapped.push(codeToAdd);
  });
  return mapped;
};

// custom-schema.ts
import_dotenv4.default.config();
var username = process.env.COMPANIES_HOUSE_API_KEY;
var companiesHouseURL = process.env.COMPANIES_HOUSE_API_URL;
var extendGraphqlSchema = (schema) => (0, import_schema.mergeSchemas)({
  schemas: [schema],
  typeDefs: `
      type Account {
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

      type CreateAccountResponse {
        success: Boolean
        id: String
        firstName: String
        lastName: String
        email: String
        verificationHash: String
      }

      # fields from registered_office_address object
      type CompaniesHouseCompanyAddress {
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
        registeredOfficeAddress: ExporterCompanyAddress
        companyNumber: String
        dateOfCreation: String
        sicCodes: [String]
        financialYearEndDate: DateTime
        success: Boolean
        apiError: Boolean
      }

      type ExporterCompanyAddress {
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

      input ExporterCompanyAddressInput {
        addressLine1: String
        addressLine2: String
        careOf: String
        locality: String
        region: String
        postalCode: String
        country: String
        premises: String
      }

      type ExporterCompanyAndCompanyAddress {
        id: ID
        registeredOfficeAddress: ExporterCompanyAddress
        companyName: String
        companyNumber: String
        dateOfCreation: DateTime
        hasTradingAddress: String
        hasTradingName: String
        companyWebsite: String
        phoneNumber: String
      }

      input ExporterCompanyAndCompanyAddressInput {
        address: ExporterCompanyAddressInput
        sicCodes: [String]
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
        token: String
        sessionIdentifier: String
        expires: DateTime
        success: Boolean!
      }

      type AddAndGetOtpResponse {
        success: Boolean!
        securityCode: String!
      }

      type VerifyAccountEmailAddressResponse {
        success: Boolean!
        accountId: String
      }

      type Mutation {
        """ create an account """
        createAccount(
          firstName: String!
          lastName: String!
          email: String!
          password: String!
        ): CreateAccountResponse

        """ verify an account's email address """
        verifyAccountEmailAddress(
          token: String!
        ): VerifyAccountEmailAddressResponse

        """ send confirm email address email """
        sendEmailConfirmEmailAddress(
          exporterId: String!
        ): EmailResponse

        """ validate credentials, generate and email a OTP security code """
        accountSignIn(
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

        """ add an OTP security code to an account """
        addAndGetOTP(
          email: String!
        ): AddAndGetOtpResponse

        """ update exporter company and company address """
        updateExporterCompanyAndCompanyAddress(
          companyId: ID!
          companyAddressId: ID!
          data: ExporterCompanyAndCompanyAddressInput!
        ): ExporterCompanyAndCompanyAddress

        """ delete an application by reference number """
        deleteApplicationByReferenceNumber(
          referenceNumber: Int!
        ): SuccessResponse

        """ submit an application """
        submitApplication(
          applicationId: String!
        ): SuccessResponse
      }

      type Query {
        """ get an account by email """
        getAccountByEmail(
          email: String!
        ): Account

        """ get companies house information """
        getCompaniesHouseInformation(
          companiesHouseNumber: String!
        ): CompaniesHouseResponse
      }
    `,
  resolvers: {
    Mutation: {
      createAccount: create_account_default,
      accountSignIn: account_sign_in_default,
      accountSignInSendNewCode: account_sign_in_new_code_default,
      verifyAccountEmailAddress: verify_account_email_address_default,
      sendEmailConfirmEmailAddress: send_email_confirm_email_address_default,
      verifyAccountSignInCode: verify_account_sign_in_code_default,
      addAndGetOTP: add_and_get_OTP_default,
      deleteApplicationByReferenceNumber: delete_application_by_refrence_number_default,
      submitApplication: submit_application_default,
      updateExporterCompanyAndCompanyAddress: async (root, variables, context) => {
        try {
          console.info("Updating application exporter company and exporter company address for ", variables.companyId);
          const { address, sicCodes, oldSicCodes, ...exporterCompany } = variables.data;
          const company = await context.db.ExporterCompany.updateOne({
            where: { id: variables.companyId },
            data: exporterCompany
          });
          await context.db.ExporterCompanyAddress.updateOne({
            where: { id: variables.companyAddressId },
            data: address
          });
          const mappedSicCodes = mapSicCodes(company, sicCodes);
          if (exporterCompany && oldSicCodes && oldSicCodes.length) {
            await context.db.ExporterCompanySicCode.deleteMany({
              where: oldSicCodes
            });
          }
          if (mappedSicCodes && mappedSicCodes.length) {
            mappedSicCodes.forEach(async (sicCodeObj) => {
              await context.db.ExporterCompanySicCode.createOne({
                data: sicCodeObj
              });
            });
          }
          return {
            id: variables.companyId
          };
        } catch (err) {
          console.error("Error updating application - exporter company and exporter company address", { err });
          throw new Error(`Updating application - exporter company and exporter company address ${err}`);
        }
      }
    },
    Query: {
      /**
       * Call for companies house API
       * @param variables - companies house number is received as a string within variables
       * @returns either mapped response or success false flag with or without apiError
       */
      getCompaniesHouseInformation: async (root, variables) => {
        try {
          const { companiesHouseNumber } = variables;
          console.info("Calling Companies House API for ", companiesHouseNumber);
          const sanitisedRegNo = companiesHouseNumber.toString().padStart(8, "0");
          const response = await (0, import_axios.default)({
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
          const mappedResponse = mapCompaniesHouseFields(response.data);
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
      }
    }
  }
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    server: {
      port: 5001
    },
    db: {
      provider: "mysql",
      url: String(process.env.DATABASE_URL),
      enableLogging: true
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data
    },
    lists,
    session,
    extendGraphqlSchema
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
