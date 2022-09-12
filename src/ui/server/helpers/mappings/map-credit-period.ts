import { SelectOption } from '../../../types';

const mapCreditPeriod = (options: Array<SelectOption>, selectedValue?: string) => {
  const mapped = options.map((opt: SelectOption) => {
    const mappedOption = {
      text: opt.text,
      value: opt.value,
    } as SelectOption;

    if (selectedValue && selectedValue === opt.value) {
      mappedOption.selected = true;
    }

    return mappedOption;
  });

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    } as SelectOption;

    const result = [defaultOption, ...mapped];

    return result;
  }

  return mapped;
};

export default mapCreditPeriod;
