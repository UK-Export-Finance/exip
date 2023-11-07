import mapMonthString from '../../data-content-mappings/map-month-string';

/**
 * mapTotalMonthsOfCover
 * Map all months of covers options and mark if it's selected
 * @param {Array} Array of numbers
 * @param {String} Selected months of cover
 * @returns {Array} Array of mapped months with month(s) string
 */
const mapTotalMonthsOfCover = (months: Array<number>, selectedValue?: number) => {
  const mapped = months.map((month) => {
    if (selectedValue && selectedValue === month + 1) {
      return {
        text: mapMonthString(month + 1),
        value: String(month + 1),
        selected: true,
      };
    }

    return {
      text: mapMonthString(month + 1),
      value: String(month + 1),
    };
  });

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [defaultOption, ...mapped];

    return result;
  }

  const result = mapped;

  return result;
};

export default mapTotalMonthsOfCover;
