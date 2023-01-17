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
  SUBMISSION_DEADLINE_IN_MONTHS: 3,
  POLICY_TYPE: {
    SINGLE: "Single contract policy",
    MULTI: "Multiple contract policy"
  },
  POLICY_AND_EXPORT: {
    TOTAL_VALUE_OF_CONTRACT: {
      MINIMUM: 1,
      MAXIMUM: 499999
    }
  }
};

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
            const { referenceNumber, eligibilityId, policyAndExportId, exporterCompanyId } = item;
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
          { label: APPLICATION.POLICY_TYPE.MULTI, value: APPLICATION.POLICY_TYPE.MULTI }
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
      policyCurrencyCode: (0, import_fields.text)(),
      totalMonthsOfCover: (0, import_fields.integer)(),
      totalSalesToBuyer: (0, import_fields.integer)(),
      maximumBuyerWillOwe: (0, import_fields.integer)(),
      goodsOrServicesDescription: (0, import_fields.text)(),
      finalDestinationCountryCode: (0, import_fields.text)()
    },
    access: import_access.allowAll
  },
  ExporterBusiness: (0, import_core.list)({
    fields: {
      company: (0, import_fields.relationship)({ ref: "ExporterCompany" })
    },
    access: import_access.allowAll
  }),
  ExporterCompanyAddress: (0, import_core.list)({
    fields: {
      exporterCompany: (0, import_fields.relationship)({ ref: "ExporterCompany.address" }),
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
      address: (0, import_fields.relationship)({ ref: "ExporterCompanyAddress.exporterCompany" }),
      business: (0, import_fields.relationship)({ ref: "ExporterBusiness" }),
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
        ]
      }),
      hasTradingName: (0, import_fields.select)({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO }
        ]
      }),
      companyWebsite: (0, import_fields.text)(),
      phoneNumber: (0, import_fields.text)()
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
var import_notifications_node_client = require("notifications-node-client");
var import_axios = __toESM(require("axios"));
var import_dotenv = __toESM(require("dotenv"));

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
    sicCodes: companiesHouseResponse.sic_codes
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
import_dotenv.default.config();
var notifyKey = process.env.GOV_NOTIFY_API_KEY;
var notifyClient = new import_notifications_node_client.NotifyClient(notifyKey);
var username = process.env.COMPANIES_HOUSE_API_KEY;
var companiesHouseURL = process.env.COMPANIES_HOUSE_API_URL;
var extendGraphqlSchema = (schema) => (0, import_schema.mergeSchemas)({
  schemas: [schema],
  typeDefs: `
      type EmailResponse {
        success: Boolean
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
        address: ExporterCompanyAddress
        companyName: String
        companyNumber: String
        dateOfCreation: DateTime
        hasTradingAddress: Boolean
        hasTradingName: Boolean
        companyWebsite: String
        phoneNumber: String
      }

      input ExporterCompanyAndCompanyAddressInput {
        address: ExporterCompanyAddressInput
        sicCodes: [String]
        companyName: String
        companyNumber: String
        dateOfCreation: DateTime
        hasTradingAddress: Boolean
        hasTradingName: Boolean
        companyWebsite: String
        phoneNumber: String
      }

      type Mutation {
        """ update exporter company and company address """
        updateExporterCompanyAndCompanyAddress(
          companyId: ID!
          companyAddressId: ID!
          data: ExporterCompanyAndCompanyAddressInput!
        ): ExporterCompanyAndCompanyAddress

        """ send an email """
        sendEmail(
          templateId: String!
          sendToEmailAddress: String!
        ): EmailResponse
      }

      type Query {
        """ get companies house information """
        getCompaniesHouseInformation(
          companiesHouseNumber: String!
        ): CompaniesHouseResponse
      }
    `,
  resolvers: {
    Mutation: {
      updateExporterCompanyAndCompanyAddress: async (root, variables, context) => {
        try {
          console.info("Updating application exporter company and exporter company address for ", variables.companyId);
          const { address, sicCodes, ...exporterCompany } = variables.data;
          const company = await context.db.ExporterCompany.updateOne({
            where: { id: variables.companyId },
            data: exporterCompany
          });
          await context.db.ExporterCompanyAddress.updateOne({
            where: { id: variables.companyAddressId },
            data: address
          });
          const mappedSicCodes = mapSicCodes(company, sicCodes);
          mappedSicCodes.forEach(async (sicCodeObj) => {
            await context.db.ExporterCompanySicCode.createOne({
              data: sicCodeObj
            });
          });
          return {
            id: variables.companyId
          };
        } catch (err) {
          console.error("Error updating application exporter company and exporter company address", { err });
          throw new Error(`Updating application exporter company and exporter company address ${err}`);
        }
      },
      sendEmail: async (root, variables) => {
        try {
          console.info("Calling Notify API. templateId: ", variables.templateId);
          const { templateId, sendToEmailAddress } = variables;
          await notifyClient.sendEmail(templateId, sendToEmailAddress, {
            personalisation: {},
            reference: null
          });
          return { success: true };
        } catch (err) {
          console.error("Unable to send email", { err });
          return { success: false };
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
