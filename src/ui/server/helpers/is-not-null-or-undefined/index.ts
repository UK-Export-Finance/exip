/**
 * checks that provided value is not null or undefined
 * @param value - provided value
 * @returns true if value is not null or undefined
 */
const isNotNullOrUndefined = (value?: any): boolean => value !== null && value !== undefined;

export default isNotNullOrUndefined;
