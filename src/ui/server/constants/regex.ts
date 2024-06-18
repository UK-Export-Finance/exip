export const REGEX = {
  /**
   * ALPHA_CHARACTERS_AND_SPACE:
   * Regex that allows only:
   * - a-z or A-Z characters.
   * - an empty space.
   */
  ALPHA_CHARACTERS_AND_SPACE: /^[A-Z ]*$/i,

  /**
   * INCLUDES_NUMERICAL_CHARACTERS:
   * Regex that checks a string includes 0-9 characters.
   * Note: \d is exactly the same as [0-9]
   */
  INCLUDES_NUMERICAL_CHARACTERS: /\d+/g,

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

  /**
   * SPACE_AND_HYPHEN:
   * Regex that allows only:
   * - space.
   * - hyphen.
   */
  SPACE_AND_HYPHEN: /[- ]/g,
};
