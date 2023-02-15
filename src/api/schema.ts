import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { checkbox, integer, relationship, select, text, timestamp, password } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { addMonths } from 'date-fns';
import { Lists } from '.keystone/types'; // eslint-disable-line
import { ANSWERS, APPLICATION, EMAIL_TEMPLATE_IDS } from './constants';
import notify from './integrations/notify';
import { AccountInput } from './types';

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
      submissionType: select({
        options: [{ label: APPLICATION.SUBMISSION_TYPE.MIA, value: APPLICATION.SUBMISSION_TYPE.MIA }],
        defaultValue: APPLICATION.SUBMISSION_TYPE.MIA,
      }),
      policyAndExport: relationship({ ref: 'PolicyAndExport' }),
      exporterBusiness: relationship({ ref: 'ExporterBusiness' }),
      exporterCompany: relationship({ ref: 'ExporterCompany' }),
      exporterBroker: relationship({ ref: 'ExporterBroker' }),
    },
    // TODO: add logs to the hooks
    hooks: {
      resolveInput: async ({ operation, resolvedData, context }) => {
        if (operation === 'create') {
          try {
            console.info('Adding default data to a new application');
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

            // generate and attach a new `exporter company` relationship
            const { id: exporterCompanyId } = await context.db.ExporterCompany.createOne({
              data: {},
            });

            modifiedData.exporterCompany = {
              connect: {
                id: exporterCompanyId,
              },
            };

            // generate a new `exporter company address` relationship with the exporter company
            await context.db.ExporterCompanyAddress.createOne({
              data: {
                exporterCompany: {
                  connect: {
                    id: exporterCompanyId,
                  },
                },
              },
            });

            // generate and attach a new 'exporter business' relationship
            const { id: exporterBusinessId } = await context.db.ExporterBusiness.createOne({
              data: {},
            });

            modifiedData.exporterBusiness = {
              connect: {
                id: exporterBusinessId,
              },
            };

            // generate and attach a new 'exporter broker' relationship
            const { id: exporterBrokerId } = await context.db.ExporterBroker.createOne({
              data: {},
            });

            modifiedData.exporterBroker = {
              connect: {
                id: exporterBrokerId,
              },
            };

            // add dates
            const now = new Date();
            modifiedData.createdAt = now;
            modifiedData.updatedAt = now;
            modifiedData.submissionDeadline = addMonths(new Date(now), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);

            // add default submission type
            modifiedData.submissionType = APPLICATION.SUBMISSION_TYPE.MIA;

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

            const { referenceNumber, eligibilityId, policyAndExportId, exporterCompanyId, exporterBusinessId, exporterBrokerId } = item;

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

            // add the application ID to the exporter company entry.
            await context.db.ExporterCompany.updateOne({
              where: { id: exporterCompanyId },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });

            // add the application ID to the exporter business entry.
            await context.db.ExporterBusiness.updateOne({
              where: { id: exporterBusinessId },
              data: {
                application: {
                  connect: {
                    id: applicationId,
                  },
                },
              },
            });

            // add the application ID to the exporter broker entry.
            await context.db.ExporterBroker.updateOne({
              where: { id: exporterBrokerId },
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
    access: allowAll,
  },
  Exporter: list({
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
    },
    hooks: {
      resolveInput: async ({ operation, resolvedData }): Promise<AccountInput> => {
        const accountInputData = resolvedData as AccountInput;

        if (operation === 'create') {
          // add dates
          const now = new Date();
          accountInputData.createdAt = now;
          accountInputData.updatedAt = now;

          try {
            // send "confirm email" email with verification token/hash.
            const emailResponse = await notify.sendEmail(
              EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL,
              accountInputData.email,
              accountInputData.firstName,
              accountInputData.verificationHash,
            );

            if (emailResponse.success) {
              return accountInputData;
            }

            throw new Error(`Error sending email verification for account creation ${emailResponse}`);
          } catch (err) {
            console.error('Error sending email verification for account creation', { err });
            throw new Error();
          }
        }

        if (operation === 'update') {
          // add dates
          accountInputData.updatedAt = new Date();
        }

        return accountInputData;
      },
    },
    access: allowAll,
  }),
  ExporterBusiness: list({
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
    },
    access: allowAll,
  }),
  ExporterBroker: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      isUsingBroker: select({
        options: [
          { label: ANSWERS.YES, value: ANSWERS.YES },
          { label: ANSWERS.NO, value: ANSWERS.NO },
        ],
        db: { isNullable: true },
      }),
      brokerName: text(),
      addressLine1: text(),
      addressLine2: text(),
      town: text(),
      country: text(),
      postcode: text(),
      email: text(),
    },
    access: allowAll,
  }),
  ExporterCompanyAddress: list({
    fields: {
      exporterCompany: relationship({ ref: 'ExporterCompany.registeredOfficeAddress' }),
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
  ExporterCompany: list({
    fields: {
      application: relationship({ ref: 'Application' }),
      registeredOfficeAddress: relationship({ ref: 'ExporterCompanyAddress.exporterCompany' }),
      sicCodes: relationship({
        ref: 'ExporterCompanySicCode.exporterCompany',
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
    access: allowAll,
  }),
  ExporterCompanySicCode: list({
    fields: {
      exporterCompany: relationship({ ref: 'ExporterCompany.sicCodes' }),
      sicCode: text(),
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
} as Lists;
