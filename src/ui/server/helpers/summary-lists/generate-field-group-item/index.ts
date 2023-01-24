import getKeyText from '../get-key-text';
import { DEFAULT } from '../../../content-strings';
import { objectHasProperty } from '../../object';
import { SummaryListItemData, SummaryListItemDataInput } from '../../../../types';

/**
 * getSummaryListItemDataValue
 * Get a field's value from a list of data
 * Conditonally returns a custom value if passed (e.g, custom HTML for an address).
 * @param {String} Field ID
 * @param {Object} Submitted data
 * @param {String} Custom field value
 * @returns {String} Field value or default empty string dash
 */
export const getSummaryListItemDataValue = (fieldId: string, data?: object, customValue?: string): string => {
  if (customValue) {
    return customValue;
  }

  if (data && objectHasProperty(data, fieldId)) {
    return data[fieldId];
  }

  return DEFAULT.EMPTY;
};

/**
 * generateSummaryListItemData
 * Generate all data required for a field to be consumed by summary list mapping functions
 * For GOV summary list
 * @param {Object} Field
 * @param {String} Custom field value
 * @returns {Object} Field mapped with with key/title text, a value, and optional "change" href.
 */
const generateSummaryListItemData = (obj: SummaryListItemDataInput, customValue?: string): SummaryListItemData => {
  const { field } = obj;

  const mapped = {
    id: field.id,
    title: getKeyText(field),
  } as SummaryListItemData;

  mapped.value = getSummaryListItemDataValue(field.id, obj.data, customValue);

  if (obj.href) {
    mapped.href = obj.href;

    // If the value has the default empty dash, a value can be added.
    // Therefore, render the "add" link text instead of "change" link text.
    if (mapped.value === DEFAULT.EMPTY) {
      mapped.renderAddLink = true;
    } else if (obj.href && obj.renderChangeLink) {
      mapped.renderChangeLink = obj.renderChangeLink;
    }
  }

  return mapped;
};

export default generateSummaryListItemData;
