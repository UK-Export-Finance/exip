import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { checkbox, integer, relationship, select, text, timestamp, password } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { addMonths } from 'date-fns';
import { Lists } from '.keystone/types'; // eslint-disable-line
import { ANSWERS, APPLICATION, FEEDBACK } from './constants';
import updateApplication from './helpers/update-application';

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
      submissionDeadline: timestamp(),
      submissionDate: timestamp(),
      submissionType: select({
        options: [{ label: APPLICATION.SUBMISSION_TYPE.MIA, value: APPLICATION.SUBMISSION_TYPE.MIA }],
        defaultValue: APPLICATION.SUBMISSION_TYPE.MIA,
      }),
      status: text({
        validation: { isRequired: true },
      }),
      previousStatus: text(),
      policyAndExport: relationship({ ref: 'PolicyAndExport' }),
      owner: relationship({
        ref: 'Account',
        many: false,
      }),
      business: relationship({ ref: 'Business' }),
      company: relationship({ ref: 'Company' }),
      broker: relationship({ ref: 'Broker' }),
      buyer: relationship({ ref: 'Buyer' }),
      sectionReview: relationship({ ref: 'SectionReview' }),
      declaration: relationship({ ref: 'Declaration' }),
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

            // generate and attach eligibility relationship with empty answers
            const { id: eligibilityId } = await context.db.Eligibility.createOne({
              data: {},
            });

            modifiedData.eligibility = {
              connect: {
                id: eligibilityId,
              },
            };

            // generate and attach a new 'policy and export' relationship
            const { id: policyAndExportId } = await context.db.PolicyAndExport.createOne({
              data: {},
            });

            modifiedData.policyAndExport = {
              connect: {
                id: policyAndExportId,
              },
            };

            // generate and attach a new `company` relationship
            const { id: companyId } = await context.db.Company.createOne({
              data: {},
            });

            modifiedData.company = {
              connect: {
                id: companyId,
              },
            };

            // generate a new `company address` relationship with the company
            await context.db.CompanyAddress.createOne({
              data: {
                company: {
                  connect: {
                    id: companyId,
                  },
                },
              },
            });

            // generate and attach a new 'business' relationship
            const { id: businessId } = await context.db.Business.createOne({
              data: {},
            });

            modifiedData.business = {
              connect: {
                id: businessId,
              },
            };

            // generate a new `business contact detail` relationship with the business
            await context.db.BusinessContactDetail.createOne({
              data: {
                business: {
                  connect: {
                    id: businessId,
                  },
                },
              },
            });

            // generate and attach a new 'broker' relationship
            const { id: brokerId } = await context.db.Broker.createOne({
              data: {},
            });

            modifiedData.broker = {
              connect: {
                id: brokerId,
              },
            };

            // generate and attach a new 'buyer' relationship
            const { id: buyerId } = await context.db.Buyer.createOne({
              data: {},
            });

            modifiedData.buyer = {
              connect: {
                id: buyerId,
              },
            };

            // generate and attach a new 'sectionReview' relationship
            const { id: sectionReviewId } = await context.db.SectionReview.createOne({
              data: {},
            });

            modifiedData.sectionReview = {
              connect: {
                id: sectionReviewId,
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
            modifiedData.submissionDeadline = addMonths(new Date(now), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);

            // add default submission type
            modifiedData.submissionType = APPLICATION.SUBMISSION_TYPE.MIA;

            // add default status
            modifiedData.status = APPLICATION.STATUS.DRAFT;

            return modifiedData;
          } catch (err) {
            console.error('Error adding default data to a new application. ', { err });

            return err;
          }
        }

        return resolvedData;
      },
      afterOperation: async ({ operation, item, context }) => {
        if (operation === 'create') {
          try {
            console.info('Adding application ID to relationships');

            const applicationId = item.id;

            const { referenceNumber, eligibilityId } = item;

            const { policyAndExportId, companyId, businessId, brokerId, buyerId, sectionReviewId, declarationId } = item;

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

            // add the application ID to the eligibility entry.
            await context.db.Eligibility.updateOne({
              where: { id: eligibilityId },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });

            // add the application ID to the policyAndExport entry.
            await context.db.PolicyAndExport.updateOne({
              where: { id: policyAndExportId },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });

            // add the application ID to the company entry.
            await context.db.Company.updateOne({
              where: { id: companyId },
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

            // add the application ID to the buyer entry.
            await context.db.Buyer.updateOne({
              where: { id: buyerId },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });

            // add the application ID to the section review entry.
            await context.db.SectionReview.updateOne({
              where: { id: sectionReviewId },
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
            console.error('Error adding an application ID to relationships ', { err });

            return err;
          }
        }
      },
    },
    access: allowAll,
  },
  PolicyAndExport: {
    fields: {
      application: relationship({ ref: 'Application' }),
      policyType: select({
        options: [
          { label: APPLICATION.POLICY_TYPE.SINGLE, value: APPLICATION.POLICY_TYPE.SINGLE },
          { label: APPLICATION.POLICY_TYPE.MULTIPLE, value: APPLICATION.POLICY_TYPE.MULTIPLE },
        ],
      }),
      requestedStartDate: timestamp(),
      contractCompletionDate: timestamp(),
      totalValueOfContract: integer({
        validation: {
          min: APPLICATION.POLICY_AND_EXPORT.TOTAL_VALUE_OF_CONTRACT.MINIMUM,
          max: APPLICATION.POLICY_AND_EXPORT.TOTAL_VALUE_OF_CONTRACT.MAXIMUM,
        },
      }),
      creditPeriodWithBuyer: text(),
      policyCurrencyCode: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
      totalMonthsOfCover: integer(),
      totalSalesToBuyer: integer(),
      maximumBuyerWillOwe: integer(),
      goodsOrServicesDescription: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
      finalDestinationCountryCode: text(),
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
  Account: list({
    fields: {
      createdAt: timestamp(),
      updatedAt: timestamp(),
      firstName: text({ validation: { isRequired: true } }),
      lastName: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true } }),
      salt: text({ validation: { isRequired: true } }),
      hash: text({ validation: { isRequired: true } }),
      // isVerified flag will only be true if the exporter has verified their email address.
      isVerified: checkbox({ defaultValue: false }),
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
      applications: relationship({
        ref: 'Application',
        many: true,
      }),
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
      totalEmployeesInternational: integer(),
      estimatedAnnualTurnover: integer(),
      exportsTurnoverPercentage: integer(),
      businessContactDetail: relationship({
        ref: 'BusinessContactDetail.business',
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
  Broker: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      isUsingBroker: select({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO },
        ],
        db: { isNullable: true },
      }),
      name: text(),
      addressLine1: text(),
      addressLine2: text(),
      town: text(),
      county: text(),
      postcode: text(),
      email: text(),
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
      sicCodes: relationship({
        ref: 'CompanySicCode.company',
        many: true,
      }),
      companyName: text(),
      companyNumber: text(),
      dateOfCreation: timestamp(),
      hasTradingAddress: select({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO },
        ],
        db: { isNullable: true },
      }),
      hasTradingName: select({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO },
        ],
        db: { isNullable: true },
      }),
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
      companyOrOrganisationName: text(),
      address: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
      country: relationship({ ref: 'Country' }),
      registrationNumber: text(),
      website: text(),
      contactFirstName: text(),
      contactLastName: text(),
      contactPosition: text(),
      contactEmail: text(),
      canContactBuyer: select({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO },
        ],
      }),
      exporterIsConnectedWithBuyer: select({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO },
        ],
      }),
      exporterHasTradedWithBuyer: select({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO },
        ],
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
  BusinessContactDetail: list({
    fields: {
      business: relationship({ ref: 'Business.businessContactDetail' }),
      firstName: text(),
      lastName: text(),
      email: text(),
      position: text(),
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
      hasMinimumUkGoodsOrServices: checkbox(),
      validExporterLocation: checkbox(),
      hasCompaniesHouseNumber: checkbox(),
      otherPartiesInvolved: checkbox(),
      paidByLetterOfCredit: checkbox(),
      needPreCreditPeriodCover: checkbox(),
      wantCoverOverMaxAmount: checkbox(),
      wantCoverOverMaxPeriod: checkbox(),
    },
    access: allowAll,
  }),
  SectionReview: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      eligibility: checkbox(),
      policyAndExport: checkbox(),
      business: checkbox(),
      buyer: checkbox(),
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
      agreeToConfidentiality: checkbox(),
      agreeToAntiBribery: checkbox(),
      hasAntiBriberyCodeOfConduct: select({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO },
        ],
        db: { isNullable: true },
      }),
      willExportWithAntiBriberyCodeOfConduct: select({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO },
        ],
        db: { isNullable: true },
      }),
      agreeToConfirmationAndAcknowledgements: checkbox(),
      agreeHowDataWillBeUsed: checkbox(),
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
        ],
        db: { isNullable: true },
      }),
      improvement: text({
        db: { nativeType: 'VarChar(1000)' },
      }),
      otherComments: text({
        db: { nativeType: 'VarChar(1000)' },
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
