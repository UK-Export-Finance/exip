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

// constants.ts
var import_dotenv = __toESM(require("dotenv"));
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
var FIELD_IDS = {
  ACCOUNT: {
    EMAIL: "email",
    VERIFICATION_HASH: "verificationHash"
  }
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
  PASSWORD_RESET_EXPIRY: () => {
    const now = /* @__PURE__ */ new Date();
    const milliseconds = 3e5;
    const future = new Date(now.setMilliseconds(milliseconds));
    return future;
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
        NOTIFICATION: "676e4655-1e82-4094-9e3e-387ea91f44df"
      }
    }
  }
};

// integrations/notify/index.ts
var import_dotenv2 = __toESM(require("dotenv"));
var import_notifications_node_client = require("notifications-node-client");
import_dotenv2.default.config();
var notifyKey = process.env.GOV_NOTIFY_API_KEY;
var notifyClient = new import_notifications_node_client.NotifyClient(notifyKey);
var notify = {
  sendEmail: async (templateId, sendToEmailAddress, variables, firstName) => {
    try {
      console.info("Calling Notify API. templateId: ", templateId);
      await notifyClient.sendEmail(templateId, sendToEmailAddress, {
        personalisation: {
          firstName,
          ...variables
        },
        reference: null
      });
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
var callNotify = async (templateId, emailAddress, variables, firstName) => {
  try {
    let emailResponse;
    if (firstName) {
      emailResponse = await notify_default.sendEmail(templateId, emailAddress, variables, firstName);
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
    const variables = { confirmToken: verificationHash };
    const response = await callNotify(templateId, emailAddress, variables, firstName);
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
    const variables = { securityCode };
    const response = await callNotify(templateId, emailAddress, variables, firstName);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending security code email for account sign in ${err}`);
  }
};
var passwordResetLink = async (emailAddress, firstName, passwordResetHash) => {
  try {
    console.info("Sending email for account password reset");
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.PASSWORD_RESET;
    const variables = { passwordResetToken: passwordResetHash };
    const response = await callNotify(templateId, emailAddress, variables, firstName);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email for account password reset ${err}`);
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
      const { emailAddress, firstName } = variables;
      const response = await callNotify(templateId, emailAddress, variables, firstName);
      return response;
    } catch (err) {
      console.error(err);
      throw new Error(`Sending application submitted email to exporter ${err}`);
    }
  },
  /**
   * applicationSubmitted.underwritingTeam
   * Send "application submitted" email to the underwriting team
   * @param {Object} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  underwritingTeam: async (variables) => {
    try {
      console.info("Sending application submitted email to underwriting team");
      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.UNDERWRITING_TEAM.NOTIFICATION;
      const emailAddress = process.env.UNDERWRITING_TEAM_EMAIL;
      const response = await callNotify(templateId, emailAddress, variables);
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
    const { emailAddress, firstName } = variables;
    const response = await callNotify(templateId, emailAddress, variables, firstName);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Sending documents email ${err}`);
  }
};
var sendEmail = {
  confirmEmailAddress,
  securityCodeEmail,
  passwordResetLink,
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
      passwordResetHash: (0, import_fields.text)(),
      passwordResetExpiry: (0, import_fields.timestamp)(),
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

// custom-resolvers/send-email-password-reset-link.ts
var import_crypto6 = __toESM(require("crypto"));
var {
  ENCRYPTION: {
    STRING_TYPE: STRING_TYPE6,
    PBKDF2: { ITERATIONS: ITERATIONS5, DIGEST_ALGORITHM: DIGEST_ALGORITHM5 },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH: KEY_LENGTH5 }
    }
  }
} = ACCOUNT;
var sendEmailPasswordResetLink = async (root, variables, context) => {
  try {
    console.info("Sending password reset email");
    const { email } = variables;
    const exporter = await get_account_by_field_default(context, FIELD_IDS.ACCOUNT.EMAIL, email);
    if (!exporter) {
      console.info("Unable to send password reset email - no account found");
      return { success: false };
    }
    const passwordResetHash = import_crypto6.default.pbkdf2Sync(email, exporter.salt, ITERATIONS5, KEY_LENGTH5, DIGEST_ALGORITHM5).toString(STRING_TYPE6);
    const accountUpdate = {
      passwordResetHash,
      passwordResetExpiry: ACCOUNT.PASSWORD_RESET_EXPIRY()
    };
    await context.db.Exporter.updateOne({
      where: { id: exporter.id },
      data: accountUpdate
    });
    const emailResponse = await emails_default.passwordResetLink(email, exporter.firstName, passwordResetHash);
    if (emailResponse.success) {
      return emailResponse;
    }
    return { success: false };
  } catch (err) {
    console.error(err);
    throw new Error(`Sending password reset email (sendEmailPasswordResetLink mutation) ${err}`);
  }
};
var send_email_password_reset_link_default = sendEmailPasswordResetLink;

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

// custom-resolvers/submit-application.ts
var import_date_fns4 = require("date-fns");

// emails/send-application-submitted-emails/index.ts
var send = async (context, referenceNumber, accountId, buyerId, declarationId, exporterCompanyId) => {
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
      exporterCompanyName: exporterCompany.companyName,
      // TODO: EMS-1273 to remove below
      linkToFile: ""
    };
    const exporterSubmittedResponse = await emails_default.applicationSubmitted.exporter(sendEmailVars);
    if (!exporterSubmittedResponse.success) {
      throw new Error("Sending application submitted email to exporter");
    }
    const underwritingTeamSubmittedResponse = await emails_default.applicationSubmitted.underwritingTeam(sendEmailVars);
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

// custom-resolvers/submit-application.ts
var submitApplication = async (root, variables, context) => {
  try {
    console.info("Submitting application");
    const application = await context.db.Application.findOne({
      where: { id: variables.applicationId }
    });
    if (application) {
      const hasDraftStatus = application.status === APPLICATION.STATUS.DRAFT;
      const now = /* @__PURE__ */ new Date();
      const validSubmissionDate = (0, import_date_fns4.isAfter)(new Date(application.submissionDeadline), now);
      const canSubmit = hasDraftStatus && validSubmissionDate;
      if (canSubmit) {
        const update = {
          status: APPLICATION.STATUS.SUBMITTED,
          previousStatus: APPLICATION.STATUS.DRAFT,
          submissionDate: now
        };
        await context.db.Application.updateOne({
          where: { id: application.id },
          data: update
        });
        const { referenceNumber, exporterId, buyerId, declarationId, exporterCompanyId } = application;
        await send_application_submitted_emails_default.send(context, referenceNumber, exporterId, buyerId, declarationId, exporterCompanyId);
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

        """ send email with password reset link """
        sendEmailPasswordResetLink(
          email: String!
        ): SuccessResponse

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
      sendEmailPasswordResetLink: send_email_password_reset_link_default,
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
