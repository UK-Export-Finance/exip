import { fieldType } from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';

/**
 * nullableCheckboxConfig
 * KeystoneJS custom field config
 * This field creates a KeystoneJS field that is:
 * - Boolean type
 * - TINYINT SQL data type.
 * - Can be null.
 * Currently, it is not possible to create such a field with KeystoneJS.
 * The closest possible field is a checkbox (boolean) field, but this cannot have a null value.
 * Without using a custom field, any checkbox/boolean fields have a default value of false.
 * We need these fields to be null to indicate that an answer has not been submitted yet.
 * Documentation: https://keystonejs.com/docs/guides/custom-fields
 * Official examples: https://github.com/keystonejs/keystone/tree/main/examples/custom-field
 * @param {Boolean} Default value to set the checkbox to. Defaults to null.
 * @returns {Function} Function with Keystone config for the custom field.
 */
const nullableCheckboxConfig = (defaultValue?: boolean) =>
  /**
   * Database/GraphQL config.
   * This defines the field as an optional boolean with a default value of null.
   */
  fieldType({
    kind: 'scalar',
    mode: 'optional',
    scalar: 'Boolean',
  })({
    /**
     * Input/output config.
     * This determines what is set during a create, update and get operations.
     */
    input: {
      create: {
        arg: graphql.arg({ type: graphql.Boolean }),
        resolve(value) {
          if (defaultValue || defaultValue === false) {
            return defaultValue;
          }

          /**
           * need this because defaultValue will not work when this is called directly with the context API
           * needed for when creating an application which requires some nullableCheckboxes to be created
           * for eg. sectionReview
           */
          if (value || value === false) {
            return value;
          }

          return null;
        },
      },
      update: {
        arg: graphql.arg({ type: graphql.Boolean }),
        resolve(value) {
          return value;
        },
      },
    },
    output: graphql.field({
      type: graphql.Boolean,
      resolve({ value }) {
        return value;
      },
    }),
    /**
     * Keystone admin UI/CMS config for this field.
     * Since we do not use the UI/CMS, this can be empty.
     */
    views: './nullable-checkbox/views',
    getAdminMeta() {
      return {};
    },
  });

/**
 * nullableCheckbox
 * KeystoneJS custom field.
 * NOTE: "any" type is required here because:
 * - No keystone field type is available to easily use.
 * - Without an appropriate type, or any, the keystone schema displays type errors, purely because of this custom component.
 * @param {Boolean} Default value to set the checkbox to.
 * @returns {Function} Keystone custom field
 */
export const nullableCheckbox = (defaultValue?: boolean) => () => nullableCheckboxConfig(defaultValue) as any;

export default nullableCheckbox;
