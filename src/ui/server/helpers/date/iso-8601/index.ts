/**
 * Returns the current date and time.
 *
 * @returns {Date} The current date and time.
 */
export const now = (): Date => new Date();

/**
 * Returns the current date and time in ISO 8601 format.
 *
 * @returns {IsoDateTimeStamp} The current date and time as an ISO 8601 string.
 */
export const getISO8601 = (): string => now().toISOString();
