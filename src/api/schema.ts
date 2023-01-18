import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { checkbox, integer, relationship, select, text, timestamp, password } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { addMonths } from 'date-fns';
import { Lists } from '.keystone/types';  // eslint-disable-line
import { ANSWERS, APPLICATION } from './constants';

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
      exporterCompany: relationship({ ref: 'ExporterCompany' }),
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

            const { referenceNumber, eligibilityId, policyAndExportId, exporterCompanyId } = item;

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
          { label: APPLICATION.POLICY_TYPE.MULTI, value: APPLICATION.POLICY_TYPE.MULTI },
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
      policyCurrencyCode: text(),
      totalMonthsOfCover: integer(),
      totalSalesToBuyer: integer(),
      maximumBuyerWillOwe: integer(),
      goodsOrServicesDescription: text(),
      finalDestinationCountryCode: text(),
    },
    access: allowAll,
  },
  ExporterBusiness: list({
    fields: {
      company: relationship({ ref: 'ExporterCompany' }),
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
      business: relationship({ ref: 'ExporterBusiness' }),
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
