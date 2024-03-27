import { REGEX } from '../../constants';

const stripHyphensAndSpacesFromString = (string: string) => string.replaceAll(REGEX.SPACE_AND_HYPHEN, '');

export default stripHyphensAndSpacesFromString;
