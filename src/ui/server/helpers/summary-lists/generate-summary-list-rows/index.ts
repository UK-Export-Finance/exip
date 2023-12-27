import { LINKS } from '../../../content-strings';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import { SummaryListItemData, SummaryListItem } from '../../../../types';

/**
 * generateItemText
 * Return "add" or "change" text depending on the passed boolean, for govukSummaryList row
 * @param {Boolean} Should render change link flag
 * @returns {String} "Add" or "change" text
 */
export const generateItemText = (renderChangeLink?: boolean) => {
  if (renderChangeLink) {
    return LINKS.CHANGE;
  }

  return LINKS.ADD;
};

/**
 * generateSummaryListRows
 * Map an array of fields with values for govukSummaryList component
 * @param {Array} Array of fields and answers
 * @param {Boolean} Add white text classes
 * @returns {Array} Array of fields/answers in data structure for govukSummaryList
 */
const generateSummaryListRows = (fields: Array<SummaryListItemData>, whiteText?: boolean): Array<SummaryListItem> => {
  let rowClasses = '';
  let changeLinkClasses = '';

  if (whiteText) {
    rowClasses = 'ukef-white-text';
    changeLinkClasses = 'ukef-white-text no-visited-state';
  }

  return fields.map((field: SummaryListItemData): SummaryListItem => {
    const mapped = {
      classes: rowClasses,
      key: {
        text: field.title,
        classes: `${field.id}-key govuk-!-width-one-half`,
      },
      value: {
        text: replaceCharacterCodesWithCharacters(field.value),
        html: field.value,
        classes: `${field.id}-value`,
      },
      actions: {
        items: [],
      },
    } as SummaryListItem;

    if (field.renderChangeLink || field.renderAddLink) {
      mapped.actions.items.push({
        href: field.href,
        text: generateItemText(field.renderChangeLink),
        visuallyHiddenText: field.title,
        attributes: {
          'data-cy': `${field.id}-change-link`,
        },
        classes: changeLinkClasses,
      });
    }

    return mapped;
  });
};

export default generateSummaryListRows;
