export const REGEX = {
  /**
   * ALPHA_CHARACTERS_AND_SPACE:
   * Regex that allows only:
   * - a-z or A-Z characters.
   * - an empty space.
   */
  ALPHA_CHARACTERS_AND_SPACE: /^[A-Z ]*$/i,

  /**
   * ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE:
   * Regex that allows only:
   * - a-z or A-Z characters.
   * - an empty space.
   * - a hyphen
   * - an apostrophe
   */
  ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE: /^[A-Z \-']*$/i,

  /**
   * INCLUDES_NUMERICAL_CHARACTERS:
   * Regex that checks a string includes 0-9 characters.
   * Note: \d is exactly the same as [0-9]
   */
  INCLUDES_NUMERICAL_CHARACTERS: /\d+/g,

  /**
   * NUMERICAL_CHARACTERS:
   * Regex that checks a string includes 0-9 characters without the global flag.
   * Note: \d is exactly the same as [0-9]
   */
  ONLY_NUMERICAL_CHARACTERS: /^\d+$/,

  /**
   * INCLUDES_UPPERCASE_ALPHA_CHARACTERS:
   * Regex that checks a string includes uppercase A-Z characters.
   */
  INCLUDES_UPPERCASE_ALPHA_CHARACTERS: /[A-Z]+/g,

  /**
   * NUMBER_HYPHEN_SPACE:
   * Regex that allows only:
   * - numbers.
   * - an empty space.
   * - a hyphen.
   * Note: \d is exactly the same as [0-9]
   */
  NUMBER_HYPHEN_SPACE: /^[- \d]+$/,

  /*
   * VALID_REQUEST_ORIGINAL_URL:
   * Regex that allows only:
   * - numbers.
   * - letters.
   * - a hyphen.
   * - a question mark.
   * - a slash.
   * - a dash.
   * - &.
   * Note: \d is exactly the same as [0-9]
   */
  VALID_REQUEST_ORIGINAL_URL: /^[A-Za-z-=&?/\d]+$/,

  /**
   * SPACE_AND_HYPHEN:
   * Regex that allows only:
   * - space.
   * - hyphen.
   */
  SPACE_AND_HYPHEN: /[- ]/g,
  /**
   * INCLUDES_DOUBLE_ZERO_DECIMALS:
   * Regex that checks a string includes ".00".
   */
  INCLUDES_DOUBLE_ZERO_DECIMALS: /\.00$/,
};
