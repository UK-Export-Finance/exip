import { list } from '@keystone-6/core';
import { text, password } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { Lists } from '.keystone/types'; // eslint-disable-line

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['name', 'email'],
      },
    },
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
  }),
};
