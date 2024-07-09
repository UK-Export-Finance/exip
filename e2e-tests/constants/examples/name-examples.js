import { MAXIMUM_CHARACTERS } from '../validation';

const { NAME: MAX_CHARACTERS } = MAXIMUM_CHARACTERS.ACCOUNT;

export const INVALID_NAMES = {
  SPECIAL_CHARACTERS: 'Name!?',
  SPECIAL_CHARACTERS_SPACE: 'Mock name!',
  MAX_LENGTH: 'a'.repeat(MAX_CHARACTERS + 1),
  NUMBERS: 'Name1',
};

export const VALID_NAMES = {
  SINGLE: 'Name',
  SPACE: 'Mock Name',
  HYPHEN: 'Mock-Name',
  APOSTROPHE: "Name'",
  HYPHEN_AND_APOSTROPHE: "Mock-Name'",
};
