import getKeyText from '../get-key-text';
import { DEFAULT } from '../../../content-strings';
import { SummaryListItemData, SummaryListItemDataInput } from '../../../../types';

/**
 * getSummaryListItemDataValue
 * Get a field's value from a list of data
 * Conditonally returns a custom value if passed (e.g, custom HTML for an address).
 * @param {Object} Submitted data
 * @param {String} Field ID
 * @param {String} Custom field value
 * @returns {String} Field value
 */
export const getSummaryListItemDataValue = (data: object, fieldId: string, customValue?: string): string => {
  if (customValue) {
    return customValue;
  }

  if (data[fieldId]) {
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
  const { field, data } = obj;

  const mapped = {
    id: field.id,
    title: getKeyText(field),
  } as SummaryListItemData;

  if (customValue) {
    mapped.value = getSummaryListItemDataValue(data, field.id, customValue);
  } else {
    mapped.value = getSummaryListItemDataValue(data, field.id);
  }

  if (obj.href && obj.renderChangeLink) {
    mapped.renderChangeLink = obj.renderChangeLink;
    mapped.href = obj.href;
  }

  return mapped;
};

export default generateSummaryListItemData;
