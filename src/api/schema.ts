import { list } from '@keystone-6/core';
import { integer, relationship, select, text, timestamp, password } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { addMonths } from 'date-fns';
import { Lists } from '.keystone/types'; // eslint-disable-line import/no-extraneous-dependencies
import { APPLICATION } from './constants';

export const lists = {
  ReferenceNumber: {
    db: {
      idField: { kind: 'autoincrement' },
    },
    fields: {
      application: relationship({ ref: 'Application' }),
    },
  },
  Application: {
    fields: {
      createdAt: timestamp(),
      updatedAt: timestamp(),
      referenceNumber: integer({
        isIndexed: true,
      }),
      submissionDeadline: timestamp(),
      submissionType: select({
        options: [{ label: APPLICATION.SUBMISSION_TYPE.MIA, value: APPLICATION.SUBMISSION_TYPE.MIA }],
        defaultValue: APPLICATION.SUBMISSION_TYPE.MIA,
      }),
    },
    hooks: {
      resolveInput: async ({ resolvedData, context }) => {
        const modifiedData = resolvedData;

        // generate and add a new unique reference number
        const { id: newReferenceNumber } = await context.db.ReferenceNumber.createOne({
          data: {},
        });
        modifiedData.referenceNumber = newReferenceNumber;

        // add dates
        const now = new Date();
        modifiedData.createdAt = now;
        modifiedData.updatedAt = now;
        modifiedData.submissionDeadline = addMonths(new Date(now), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);

        // add default submission type
        modifiedData.submissionType = APPLICATION.SUBMISSION_TYPE.MIA;

        return modifiedData;
      },
    },
  },
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
  }),
} as Lists;
