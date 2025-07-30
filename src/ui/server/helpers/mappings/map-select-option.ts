import nameAndIsoCodeText from '../name-and-iso-code-text';
import { SelectOption } from '../../../types';

/**
 * mapSelectOption
 * Map a select option into the required structure for GOV select component.
 * Handles "is selected" requirement.
 * @param {string} Option name
 * @param {string} Option value
 * @param {boolean} Render the option value in text
 * @param {string} Selected option value
 * @returns {object} Mapped select option
 */

const mapSelectOption = (name: string, value: string, renderValueInText: boolean, selectedValue?: string): SelectOption => {
  let text = name;

  if (renderValueInText) {
    text = nameAndIsoCodeText(name, value);
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
