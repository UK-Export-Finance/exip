import { SelectOption } from '../../../types';

/**
 * mapSelectOption
 * Map a select option into the required structure for GOV select component.
 * Handles "is selected" requirement.
 * @param {String} Option name
 * @param {String} Option value
 * @param {Boolean} Render the option value in text
 * @param {String} Selected option value
 * @returns {Object} Mapped select option
 */

const mapSelectOption = (name: string, value: string, renderValueInText: boolean, selectedValue?: string): SelectOption => {
  let text = name;

  if (renderValueInText) {
    text = `${name} (${value})`;
  }

  const mapped = {
    text,
    value,
    selected: false,
  };

  if (selectedValue && selectedValue === value) {
    mapped.selected = true;
  }

  return mapped;
};

export default mapSelectOption;
