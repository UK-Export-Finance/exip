interface DateErrorMessage {
  INCORRECT_FORMAT: string;
  BEFORE_EARLIEST: string;
  MISSING_DAY_AND_MONTH: string;
  MISSING_DAY_AND_YEAR: string;
  MISSING_MONTH_AND_YEAR: string;
  CANNOT_BE_THE_SAME: string;
  CANNOT_BE_BEFORE: string;
  INVALID_DAY: string;
  INVALID_MONTH: string;
  INVALID_YEAR: string;
  INVALID_YEAR_DIGITS: string;
  INVALID_DATE: string;
  AFTER_LATEST: string;
}

interface ErrorMessageObject {
  IS_EMPTY: string;
  INCORRECT?: string;
  INCORRECT_FORMAT: string;
  BELOW_MINIMUM: string;
  ABOVE_MAXIMUM: string;
}

export { DateErrorMessage, ErrorMessageObject };
