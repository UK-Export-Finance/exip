export const REGEX = {
  /**
   * ALPHA_CHARACTERS:
   * Regex that allows only:
   * - a-z or A-Z characters.
   * - an empty space.
   */
  ALPHA_CHARACTERS_AND_SPACE: /^[a-zA-Z ]*$/,
  /**
   * NUMBER_HYPHEN_SPACE:
   * Regex that allows only:
   * - numbers.
   * - an empty space.
   * - a hyphen.
   */
  NUMBER_HYPHEN_SPACE: /^[- 0-9]+$/,
  /**
   * SPACE_AND_HYPHEN:
   * Regex that allows only:
   * - space.
   * - hyphen.
   */
  SPACE_AND_HYPHEN: /[- ]/g,
};
