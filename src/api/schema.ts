import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { checkbox, integer, relationship, select, text, timestamp, password } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { addMonths } from 'date-fns';
import { Lists } from '.keystone/types'; // eslint-disable-line
import { APPLICATION, FEEDBACK } from './constants';
import updateApplication from './helpers/update-application';
import nullableCheckbox from './nullable-checkbox';

const {
  DEAL_TYPE,
  DEFAULT_CURRENCY,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER,
  EXPORT_CONTRACT: { AGENT_SERVICE_CHARGE },
  LATEST_VERSION,
  POLICY,
  POLICY_TYPE,
  SUBMISSION_COUNT_DEFAULT,
  SUBMISSION_DEADLINE_IN_MONTHS,
  SUBMISSION_TYPE,
  STATUS,
} = APPLICATION;

export const lists = {
  ReferenceNumber: {
    db: {
      idField: { kind: 'autoincrement' },
    },
    fields: {
      application: relationship({ ref: 'Application' }),
    },
    access: allowAll,
  },
  Application: {
    fields: {
      createdAt: timestamp(),
      updatedAt: timestamp(),
      eligibility: relationship({ ref: 'Eligibility' }),
      referenceNumber: integer({
        isIndexed: true,
      }),
      submissionCount: integer({
        defaultValue: SUBMISSION_COUNT_DEFAULT,
        validation: { isRequired: true },
      }),
      submissionDate: timestamp(),
      submissionDeadline: timestamp(),
      submissionType: select({
        options: [{ label: SUBMISSION_TYPE.MIA, value: SUBMISSION_TYPE.MIA }],
        defaultValue: SUBMISSION_TYPE.MIA,
      }),
      status: text({
        validation: { isRequired: true },
      }),
      previousStatus: text(),
      policy: relationship({ ref: 'Policy' }),
      exportContract: relationship({ ref: 'ExportContract' }),
      owner: relationship({
        ref: 'Account',
        many: false,
      }),
      business: relationship({ ref: 'Business' }),
      broker: relationship({ ref: 'Broker' }),
      buyer: relationship({ ref: 'Buyer' }),
      company: relationship({ ref: 'Company' }),
      declaration: relationship({ ref: 'Declaration' }),
      nominatedLossPayee: relationship({ ref: 'NominatedLossPayee' }),
      policyContact: relationship({ ref: 'PolicyContact' }),
      sectionReview: relationship({ ref: 'SectionReview' }),
      version: text({
        defaultValue: LATEST_VERSION.VERSION_NUMBER,
        validation: { isRequired: true },
      }),
      dealType: text({
        defaultValue: DEAL_TYPE,
        validation: { isRequired: true },
        db: { nativeType: 'VarChar(4)' },
      }),
    },
    hooks: {
      resolveInput: async ({ operation, resolvedData, context }) => {
        if (operation === 'create') {
          try {
            console.info('Creating new application - adding default data to a new application');

            const modifiedData = resolvedData;

            // generate and attach a new unique reference number
            const { id: newReferenceNumber } = await context.db.ReferenceNumber.createOne({
              data: {},
            });

            modifiedData.referenceNumber = newReferenceNumber;

            // generate and attach a new 'business' relationship
            const { id: businessId } = await context.db.Business.createOne({
              data: {},
            });

            modifiedData.business = {
              connect: {
                id: businessId,
              },
            };

            // generate a new `policy contact` relationship with the policy
            const { id: policyContactId } = await context.db.PolicyContact.createOne({
              data: {},
            });

            modifiedData.policyContact = {
              connect: {
                id: policyContactId,
              },
            };

            // generate and attach a new 'broker' relationship
            const { id: brokerId } = await context.db.Broker.createOne({
              data: {},
            });

            modifiedData.broker = {
              connect: {
                id: brokerId,
              },
            };

            // generate and attach a new 'declaration' relationship
            const { id: declarationId } = await context.db.Declaration.createOne({
              data: {},
            });

            modifiedData.declaration = {
              connect: {
                id: declarationId,
              },
            };

            // add dates
            const now = new Date();
            modifiedData.createdAt = now;
            modifiedData.updatedAt = now;
            modifiedData.submissionDeadline = addMonths(new Date(now), SUBMISSION_DEADLINE_IN_MONTHS);

            // add default submission type
            modifiedData.submissionType = SUBMISSION_TYPE.MIA;

            // add default status
            modifiedData.status = STATUS.IN_PROGRESS;

            return modifiedData;
          } catch (err) {
            console.error('Error adding default data to a new application. %O', err);

            return false;
          }
        }

        return resolvedData;
      },
      afterOperation: async ({ operation, item, context }) => {
        if (operation === 'create') {
          try {
            console.info('Adding application ID to relationships');

            const applicationId = item.id;

            const { referenceNumber } = item;

            const { policyContactId, businessId, brokerId, declarationId } = item;

            // add the application ID to the reference number entry.
            await context.db.ReferenceNumber.updateOne({
              where: { id: String(referenceNumber) },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });

            // add the application ID to the policy contact.
            await context.db.PolicyContact.updateOne({
              where: { id: policyContactId },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });

            // add the application ID to the business entry.
            await context.db.Business.updateOne({
              where: { id: businessId },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });

            // add the application ID to the broker entry.
            await context.db.Broker.updateOne({
              where: { id: brokerId },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });

            // add the application ID to the declaration entry.
            await context.db.Declaration.updateOne({
              where: { id: declarationId },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });
          } catch (err) {
            console.error('Error adding an application ID to relationships %O', err);

            return false;
          }
        }
      },
    },
    access: allowAll,
  },
  TotalContractValue: list({
    fields: {
      valueId: integer(),
      value: text({
        db: { nativeType: 'VarChar(70)' },
      }),
    },
    access: allowAll,
  }),
  CoverPeriod: list({
    fields: {
      valueId: integer(),
      value: text({
        db: { nativeType: 'VarChar(70)' },
      }),
    },
    access: allowAll,
  }),
  LossPayeeFinancialInternational: {
    fields: {
      lossPayee: relationship({ ref: 'NominatedLossPayee.financialInternational' }),
      vector: relationship({ ref: 'LossPayeeFinancialInternationalVector.financialInternational' }),
      bankAddress: text({
        db: { nativeType: 'VarChar(500)' },
      }),
      bicSwiftCode: text(),
      iban: text(),
    },
    access: allowAll,
  },
  LossPayeeFinancialInternationalVector: {
    fields: {
      financialInternational: relationship({ ref: 'LossPayeeFinancialInternational.vector' }),
      bicSwiftCodeVector: text(),
      ibanVector: text(),
    },
    access: allowAll,
  },
  LossPayeeFinancialUk: {
    fields: {
      lossPayee: relationship({ ref: 'NominatedLossPayee.financialUk' }),
      vector: relationship({ ref: 'LossPayeeFinancialUkVector.financialUk' }),
      accountNumber: text(),
      bankAddress: text({
        db: { nativeType: 'VarChar(500)' },
      }),
      sortCode: text(),
    },
    access: allowAll,
  },
  LossPayeeFinancialUkVector: {
    fields: {
      financialUk: relationship({ ref: 'LossPayeeFinancialUk.vector' }),
      accountNumberVector: text(),
      sortCodeVector: text(),
    },
    access: allowAll,
  },
  NominatedLossPayee: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      financialUk: relationship({ ref: 'LossPayeeFinancialUk.lossPayee' }),
      financialInternational: relationship({ ref: 'LossPayeeFinancialInternational.lossPayee' }),
      isAppointed: nullableCheckbox(),
      isLocatedInUk: nullableCheckbox(),
      isLocatedInternationally: nullableCheckbox(),
      name: text({
        db: { nativeType: 'VarChar(200)' },
      }),
    },
    access: allowAll,
  }),
  Policy: {
    fields: {
      application: relationship({ ref: 'Application' }),
      jointlyInsuredParty: relationship({ ref: 'JointlyInsuredParty.policy' }),
      needPreCreditPeriodCover: nullableCheckbox(DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER),
      policyType: select({
        options: [
          { label: POLICY_TYPE.SINGLE, value: POLICY_TYPE.SINGLE },
          { label: POLICY_TYPE.MULTIPLE, value: POLICY_TYPE.MULTIPLE },
        ],
      }),
      requestedStartDate: timestamp(),
      contractCompletionDate: timestamp(),
      totalValueOfContract: integer({
        validation: {
          min: POLICY.TOTAL_VALUE_OF_CONTRACT.MINIMUM,
          max: POLICY.TOTAL_VALUE_OF_CONTRACT.MAXIMUM,
        },
      }),
      creditPeriodWithBuyer: text(),
      policyCurrencyCode: text({
        db: { nativeType: 'VarChar(3)' },
      }),
      totalMonthsOfCover: integer(),
      totalSalesToBuyer: integer(),
      maximumBuyerWillOwe: integer(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  },
  PolicyContact: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      firstName: text({
        db: { nativeType: 'VarChar(400)' },
      }),
      lastName: text({
        db: { nativeType: 'VarChar(400)' },
      }),
      email: text({
        db: { nativeType: 'VarChar(300)' },
      }),
      position: text({
        db: { nativeType: 'VarChar(50)' },
      }),
      isSameAsOwner: nullableCheckbox(),
    },
    access: allowAll,
  }),
  JointlyInsuredParty: list({
    fields: {
      policy: relationship({ ref: 'Policy.jointlyInsuredParty' }),
      requested: nullableCheckbox(),
      companyName: text({
        db: { nativeType: 'VarChar(200)' },
      }),
      companyNumber: text({
        db: { nativeType: 'VarChar(100)' },
      }),
      countryCode: text({
        db: { nativeType: 'VarChar(3)' },
      }),
    },
    access: allowAll,
  }),
  ExportContract: {
    fields: {
      application: relationship({ ref: 'Application' }),
      agent: relationship({ ref: 'ExportContractAgent.exportContract' }),
      privateMarket: relationship({ ref: 'PrivateMarket.exportContract' }),
      finalDestinationKnown: nullableCheckbox(),
      finalDestinationCountryCode: text({
        db: { nativeType: 'VarChar(3)' },
      }),
      goodsOrServicesDescription: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
      paymentTermsDescription: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  },
  ExportContractAgent: list({
    fields: {
      exportContract: relationship({ ref: 'ExportContract.agent' }),
      service: relationship({ ref: 'ExportContractAgentService.agent' }),
      countryCode: text({
        db: { nativeType: 'VarChar(3)' },
      }),
      fullAddress: text({
        db: { nativeType: 'VarChar(500)' },
      }),
      isUsingAgent: nullableCheckbox(),
      name: text({
        db: { nativeType: 'VarChar(800)' },
      }),
    },
    access: allowAll,
  }),
  ExportContractAgentService: {
    fields: {
      agent: relationship({ ref: 'ExportContractAgent.service' }),
      charge: relationship({ ref: 'ExportContractAgentServiceCharge.service' }),
      agentIsCharging: nullableCheckbox(),
      serviceDescription: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
    },
    access: allowAll,
  },
  ExportContractAgentServiceCharge: {
    fields: {
      service: relationship({ ref: 'ExportContractAgentService.charge' }),
      percentageCharge: integer(),
      fixedSumAmount: integer(),
      fixedSumCurrencyCode: text({
        db: { nativeType: 'VarChar(3)' },
        defaultValue: DEFAULT_CURRENCY,
      }),
      method: select({
        options: [
          { label: AGENT_SERVICE_CHARGE.METHOD.FIXED_SUM, value: AGENT_SERVICE_CHARGE.METHOD.FIXED_SUM },
          { label: AGENT_SERVICE_CHARGE.METHOD.PERCENTAGE, value: AGENT_SERVICE_CHARGE.METHOD.PERCENTAGE },
        ],
      }),
      payableCountryCode: text({
        db: { nativeType: 'VarChar(3)' },
      }),
    },
    access: allowAll,
  },
  PrivateMarket: list({
    fields: {
      exportContract: relationship({ ref: 'ExportContract.privateMarket' }),
      attempted: nullableCheckbox(),
      declinedDescription: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  }),
  Account: list({
    fields: {
      createdAt: timestamp(),
      updatedAt: timestamp(),
      firstName: text({
        validation: { isRequired: true },
        db: { nativeType: 'VarChar(400)' },
      }),
      lastName: text({
        validation: { isRequired: true },
        db: { nativeType: 'VarChar(400)' },
      }),
      email: text({
        validation: { isRequired: true },
        db: { nativeType: 'VarChar(300)' },
      }),
      salt: text({ validation: { isRequired: true } }),
      hash: text({ validation: { isRequired: true } }),
      // isVerified flag will only be true if the account has verified their email address.
      verificationHash: text(),
      verificationExpiry: timestamp(),
      otpSalt: text(),
      otpHash: text({
        db: { nativeType: 'VarChar(256)' },
      }),
      otpExpiry: timestamp(),
      sessionExpiry: timestamp(),
      sessionIdentifier: text(),
      passwordResetHash: text({ validation: { isRequired: false } }),
      passwordResetExpiry: timestamp({ validation: { isRequired: false } }),
      authentication: relationship({
        ref: 'Authentication',
      }),
      authenticationRetry: relationship({
        ref: 'AuthenticationRetry',
      }),
      reactivationHash: text({ validation: { isRequired: false } }),
      reactivationExpiry: timestamp({ validation: { isRequired: false } }),
      applications: relationship({
        ref: 'Application',
        many: true,
      }),
      accountStatus: relationship({ ref: 'AccountStatus.account' }),
    },
    access: allowAll,
  }),
  AccountStatus: {
    fields: {
      account: relationship({ ref: 'Account.accountStatus' }),
      isVerified: checkbox({ defaultValue: false }),
      /**
       * isBlocked flag will only be true if the account has:
       * - repeatedly attempted sign in
       * - repeatedly attempted password reset request
       */
      isBlocked: checkbox({ defaultValue: false }),
      isInactivated: checkbox({ defaultValue: false }),
    },
    access: allowAll,
  },
  AuthenticationRetry: list({
    fields: {
      account: relationship({
        ref: 'Account',
        many: true,
      }),
      createdAt: timestamp({ validation: { isRequired: true } }),
    },
    access: allowAll,
  }),
  Authentication: list({
    fields: {
      account: relationship({
        ref: 'Account',
        many: true,
      }),
      createdAt: timestamp(),
      salt: text({ validation: { isRequired: true } }),
      hash: text({ validation: { isRequired: true } }),
    },
    access: allowAll,
  }),
  Business: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      goodsOrServicesSupplied: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
      totalYearsExporting: integer(),
      totalEmployeesUK: integer(),
      estimatedAnnualTurnover: integer(),
      exportsTurnoverPercentage: integer(),
      turnoverCurrencyCode: text({
        db: { nativeType: 'VarChar(3)' },
        defaultValue: DEFAULT_CURRENCY,
      }),
      hasCreditControlProcess: nullableCheckbox(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  }),
  Broker: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      isUsingBroker: nullableCheckbox(),
      name: text({
        db: { nativeType: 'VarChar(800)' },
      }),
      addressLine1: text(),
      addressLine2: text(),
      town: text(),
      county: text(),
      postcode: text(),
      fullAddress: text({
        db: { nativeType: 'VarChar(500)' },
      }),
      email: text({
        db: { nativeType: 'VarChar(300)' },
      }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  }),
  CompanyAddress: list({
    fields: {
      company: relationship({ ref: 'Company.registeredOfficeAddress' }),
      addressLine1: text(),
      addressLine2: text(),
      careOf: text(),
      locality: text(),
      region: text(),
      postalCode: text(),
      country: text(),
      premises: text(),
    },
    access: allowAll,
  }),
  Company: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      registeredOfficeAddress: relationship({ ref: 'CompanyAddress.company' }),
      differentTradingAddress: relationship({ ref: 'CompanyDifferentTradingAddress.company' }),
      sicCodes: relationship({
        ref: 'CompanySicCode.company',
        many: true,
      }),
      companyName: text({
        db: { nativeType: 'VarChar(200)' },
      }),
      companyNumber: text(),
      dateOfCreation: timestamp(),
      hasDifferentTradingAddress: nullableCheckbox(),
      differentTradingName: text({
        db: { nativeType: 'VarChar(200)' },
      }),
      hasDifferentTradingName: nullableCheckbox(),
      companyWebsite: text(),
      phoneNumber: text(),
      financialYearEndDate: timestamp(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  }),
  CompanyDifferentTradingAddress: list({
    fields: {
      company: relationship({ ref: 'Company.differentTradingAddress' }),
      fullAddress: text({
        db: { nativeType: 'VarChar(500)' },
      }),
    },
    access: allowAll,
  }),
  CompanySicCode: list({
    fields: {
      company: relationship({ ref: 'Company.sicCodes' }),
      sicCode: text(),
      industrySectorName: text(),
    },
    access: allowAll,
  }),
  Buyer: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      companyOrOrganisationName: text({
        db: { nativeType: 'VarChar(200)' },
      }),
      address: text({
        db: { nativeType: 'VarChar(500)' },
      }),
      country: relationship({ ref: 'Country' }),
      registrationNumber: text({
        db: { nativeType: 'VarChar(100)' },
      }),
      website: text(),
      buyerTradingHistory: relationship({ ref: 'BuyerTradingHistory.buyer' }),
      contact: relationship({ ref: 'BuyerContact.buyer' }),
      relationship: relationship({ ref: 'BuyerRelationship.buyer' }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  }),
  BuyerContact: {
    fields: {
      application: relationship({ ref: 'Application' }),
      buyer: relationship({ ref: 'Buyer.contact' }),
      contactFirstName: text({
        db: { nativeType: 'VarChar(200)' },
      }),
      contactLastName: text({
        db: { nativeType: 'VarChar(200)' },
      }),
      contactPosition: text(),
      contactEmail: text({
        db: { nativeType: 'VarChar(300)' },
      }),
      canContactBuyer: nullableCheckbox(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  },
  BuyerRelationship: {
    fields: {
      application: relationship({ ref: 'Application' }),
      buyer: relationship({ ref: 'Buyer.relationship' }),
      exporterIsConnectedWithBuyer: nullableCheckbox(),
      connectionWithBuyerDescription: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
      exporterHasPreviousCreditInsuranceWithBuyer: nullableCheckbox(),
      exporterHasBuyerFinancialAccounts: nullableCheckbox(),
      previousCreditInsuranceWithBuyerDescription: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  },
  BuyerTradingHistory: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      buyer: relationship({ ref: 'Buyer.buyerTradingHistory' }),
      currencyCode: text({
        db: { nativeType: 'VarChar(3)' },
      }),
      outstandingPayments: nullableCheckbox(),
      failedPayments: nullableCheckbox(),
      exporterHasTradedWithBuyer: nullableCheckbox(),
      totalOutstandingPayments: integer(),
      totalOverduePayments: integer(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  }),
  Country: list({
    fields: {
      isoCode: text({
        validation: { isRequired: true },
      }),
      name: text({
        validation: { isRequired: true },
      }),
    },
    access: allowAll,
  }),
  Eligibility: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      buyerCountry: relationship({ ref: 'Country' }),
      coverPeriod: relationship({ ref: 'CoverPeriod' }),
      hasEndBuyer: checkbox(),
      hasMinimumUkGoodsOrServices: checkbox(),
      hasCompaniesHouseNumber: checkbox(),
      otherPartiesInvolved: checkbox(),
      paidByLetterOfCredit: checkbox(),
      totalContractValue: relationship({ ref: 'TotalContractValue' }),
      validExporterLocation: checkbox(),
    },
    access: allowAll,
  }),
  SectionReview: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      eligibility: nullableCheckbox(),
      policy: nullableCheckbox(),
      business: nullableCheckbox(),
      buyer: nullableCheckbox(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  }),
  Declaration: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      antiBribery: relationship({ ref: 'DeclarationAntiBribery' }),
      confirmationAndAcknowledgements: relationship({ ref: 'DeclarationConfirmationAndAcknowledgement' }),
      howDataWillBeUsed: relationship({ ref: 'DeclarationHowDataWillBeUsed' }),
      agreeToConfidentiality: nullableCheckbox(),
      agreeToAntiBribery: nullableCheckbox(),
      hasAntiBriberyCodeOfConduct: nullableCheckbox(),
      willExportWithAntiBriberyCodeOfConduct: nullableCheckbox(),
      agreeToConfirmationAndAcknowledgements: nullableCheckbox(),
      agreeHowDataWillBeUsed: nullableCheckbox(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await updateApplication.timestamp(context, item.applicationId);
        }
      },
    },
    access: allowAll,
  }),
  DeclarationAntiBribery: list({
    fields: {
      version: text({
        label: 'Version',
        validation: { isRequired: true },
      }),
      content: document({
        formatting: true,
      }),
    },
    access: allowAll,
  }),
  DeclarationConfirmationAndAcknowledgement: list({
    fields: {
      version: text({
        label: 'Version',
        validation: { isRequired: true },
      }),
      content: document({
        formatting: true,
      }),
    },
    access: allowAll,
  }),
  DeclarationHowDataWillBeUsed: list({
    fields: {
      version: text({
        label: 'Version',
        validation: { isRequired: true },
      }),
      content: document({
        formatting: true,
        links: true,
      }),
    },
    access: allowAll,
  }),
  Page: list({
    fields: {
      heading: text({
        label: 'Page heading',
      }),
      metaTitle: text({
        label: 'Meta title',
      }),
      content: document({
        formatting: true,
        dividers: true,
        links: true,
      }),
    },
    ui: {
      listView: {
        initialColumns: ['heading', 'id'],
      },
    },
    access: allowAll,
  }),
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['name', 'email'],
      },
    },
    access: allowAll,
  }),
  Feedback: list({
    fields: {
      service: text(),
      satisfaction: select({
        options: [
          { label: FEEDBACK.VERY_SATISFIED, value: FEEDBACK.VERY_SATISFIED },
          { label: FEEDBACK.SATISFIED, value: FEEDBACK.SATISFIED },
          { label: FEEDBACK.NEITHER, value: FEEDBACK.NEITHER },
          { label: FEEDBACK.DISSATISFIED, value: FEEDBACK.DISSATISFIED },
          { label: FEEDBACK.VERY_DISSATISIFED, value: FEEDBACK.VERY_DISSATISIFED },
          { label: '', value: '' },
        ],
        db: { isNullable: true },
      }),
      improvement: text({
        db: { nativeType: 'VarChar(1200)' },
      }),
      otherComments: text({
        db: { nativeType: 'VarChar(1200)' },
      }),
      referralUrl: text({
        db: { nativeType: 'VarChar(500)' },
      }),
      product: text(),
      createdAt: timestamp(),
    },
    access: allowAll,
  }),
} as Lists;
