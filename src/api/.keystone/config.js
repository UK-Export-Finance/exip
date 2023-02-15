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
  }
};
var ACCOUNT = {
  EMAIL: {
    VERIFICATION_EXPIRY: () => {
      const now = new Date();
      const day = now.getDate();
      const tomorrow = new Date(now.setDate(day + 1));
      return tomorrow;
    }
  },
  PASSWORD: {
    RANDOM_BYTES_SIZE: 32,
    STRING_TYPE: "hex",
    PBKDF2: {
      ITERATIONS: 1e4,
      KEY_LENGTH: 64,
      DIGEST_ALGORITHM: "sha512"
    }
  }
};
var EMAIL_TEMPLATE_IDS = {
  ACCOUNT: {
    CONFIRM_EMAIL: "24022e94-171c-4044-b0ee-d22418116575"
  }
};

// integrations/notify/index.ts
var import_dotenv = __toESM(require("dotenv"));
var import_notifications_node_client = require("notifications-node-client");
import_dotenv.default.config();
var notifyKey = process.env.GOV_NOTIFY_API_KEY;
var notifyClient = new import_notifications_node_client.NotifyClient(notifyKey);
var notify = {
  sendEmail: async (templateId, sendToEmailAddress, firstName, confirmToken) => {
    try {
      console.info("Calling Notify API. templateId: ", templateId);
      await notifyClient.sendEmail(templateId, sendToEmailAddress, {
        personalisation: {
          firstName,
          confirmToken
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
var confirmEmailAddress = async (email, firstName, verificationHash) => {
  try {
    console.info("Sending email verification for account creation");
    const emailResponse = await notify_default.sendEmail(EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL, email, firstName, verificationHash);
    if (emailResponse.success) {
      return emailResponse;
    }
    throw new Error(`Sending email verification for account creation ${emailResponse}`);
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email verification for account creation ${err}`);
  }
};
var sendEmail = {
  confirmEmailAddress
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
      submissionType: (0, import_fields.select)({
        options: [{ label: APPLICATION.SUBMISSION_TYPE.MIA, value: APPLICATION.SUBMISSION_TYPE.MIA }],
        defaultValue: APPLICATION.SUBMISSION_TYPE.MIA
      }),
      policyAndExport: (0, import_fields.relationship)({ ref: "PolicyAndExport" }),
      exporterBusiness: (0, import_fields.relationship)({ ref: "ExporterBusiness" }),
      exporterCompany: (0, import_fields.relationship)({ ref: "ExporterCompany" })
    },
    hooks: {
      resolveInput: async ({ operation, resolvedData, context }) => {
        if (operation === "create") {
          try {
            console.info("Adding default data to a new application");
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
            const now = new Date();
            modifiedData.createdAt = now;
            modifiedData.updatedAt = now;
            modifiedData.submissionDeadline = (0, import_date_fns.addMonths)(new Date(now), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);
            modifiedData.submissionType = APPLICATION.SUBMISSION_TYPE.MIA;
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
            const { referenceNumber, eligibilityId, policyAndExportId, exporterCompanyId, exporterBusinessId } = item;
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
      isVerified: (0, import_fields.checkbox)({ defaultValue: false }),
      verificationHash: (0, import_fields.text)(),
      verificationExpiry: (0, import_fields.timestamp)()
    },
    hooks: {
      resolveInput: async ({ operation, resolvedData }) => {
        const accountInputData = resolvedData;
        if (operation === "create") {
          const now = new Date();
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
          accountInputData.updatedAt = new Date();
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
var import_dotenv2 = __toESM(require("dotenv"));
var import_crypto = __toESM(require("crypto"));

// custom-resolvers/verify-account-email-address.ts
var import_date_fns2 = require("date-fns");
var verifyAccountEmailAddress = async (root, variables, context) => {
  console.info("Verifying exporter email address");
  try {
    const exportersArray = await context.db.Exporter.findMany({
      where: {
        verificationHash: { equals: variables.token }
      },
      take: 1
    });
    if (!exportersArray || !exportersArray.length || !exportersArray[0]) {
      console.info("Verifying exporter email - no exporter exists with the provided token");
      return {
        expired: true
      };
    }
    const exporter = exportersArray[0];
    const now = new Date();
    const canActivateExporter = (0, import_date_fns2.isBefore)(now, exporter.verificationExpiry);
    if (!canActivateExporter) {
      console.info("Unable to verify exporter email - verification period has expired");
      return {
        expired: true
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
      emailRecipient: exporter.email
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying exporter email address ${err}`);
  }
};
var verify_account_email_address_default = verifyAccountEmailAddress;

// custom-resolvers/send-email-confirm-email-address.ts
var sendEmailConfirmEmailAddress = async (root, variables, context) => {
  try {
    const exporter = await context.db.Exporter.findOne({
      where: {
        id: variables.exporterId
      }
    });
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
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${err}`);
  }
};
var send_email_confirm_email_address_default = sendEmailConfirmEmailAddress;

// helpers/create-full-timestamp-from-day-month.ts
var createFullTimestampFromDayAndMonth = (day, month) => {
  if (day && month) {
    return new Date(`${new Date().getFullYear()}-${month}-${day}`);
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
import_dotenv2.default.config();
var username = process.env.COMPANIES_HOUSE_API_KEY;
var companiesHouseURL = process.env.COMPANIES_HOUSE_API_URL;
var { EMAIL, PASSWORD } = ACCOUNT;
var {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM }
} = PASSWORD;
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

      type Mutation {
        """ create an account """
        createAccount(
          data: AccountInput!
        ): Account
        """ verify an an account's email address """
        verifyAccountEmailAddress(
          token: String!
        ): EmailResponse
        """ verify an an account's email address """
        sendEmailConfirmEmailAddress(
          exporterId: String!
        ): EmailResponse
        """ update exporter company and company address """
        updateExporterCompanyAndCompanyAddress(
          companyId: ID!
          companyAddressId: ID!
          data: ExporterCompanyAndCompanyAddressInput!
        ): ExporterCompanyAndCompanyAddress
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
      createAccount: async (root, variables, context) => {
        console.info("Creating new exporter account for ", variables.data.email);
        try {
          const { firstName, lastName, email, password: password2 } = variables.data;
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
          return response;
        } catch (err) {
          throw new Error(`Creating new exporter account ${err}`);
        }
      },
      verifyAccountEmailAddress: verify_account_email_address_default,
      sendEmailConfirmEmailAddress: send_email_confirm_email_address_default,
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
        } catch (error) {
          console.error("Error calling Companies House API", { error });
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
