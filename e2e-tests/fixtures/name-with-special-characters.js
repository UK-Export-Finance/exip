const SPECIAL_CHARACTERS = '<>"\'/*&';

const mockNameWithSpecialCharacters = (name) => `${name}${SPECIAL_CHARACTERS}`;

export default mockNameWithSpecialCharacters;
