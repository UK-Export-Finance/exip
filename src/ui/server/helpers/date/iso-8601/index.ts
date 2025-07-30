/**
 * Returns the current date and time.
 *
 * @returns {Date} The current date and time.
 */
export const now = (): Date => new Date();

/**
 * Returns the current date and time in ISO 8601 format.
 *
 * @param {Date} date JavaScript date object
 * @returns {string} The current date and time as an ISO 8601 string.
 */
export const getISO8601 = (date: Date = now()): string => date.toISOString();

/**
 * Adds a specified number of years to a given date.
 *
 * @param year - The number of years to add.
 * @param date - The date to which the years will be added. Defaults to the current date and time.
 * @returns A new Date object with the specified number of years added.
 */
export const addYear = (year: number, date: Date = now()): Date => new Date(date.setFullYear(date.getFullYear() + year));

/**
 * Returns the epoch time in milliseconds for a given date.
 *
 * @param {Date} [date=now()] - The date for which to get the epoch time. Defaults to the current date and time if not provided.
 * @returns {number} The epoch time in milliseconds.
 */
export const getEpochMs = (date: Date = now()): number => new Date(date).valueOf();
