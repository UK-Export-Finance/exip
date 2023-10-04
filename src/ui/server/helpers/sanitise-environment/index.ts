/**
 * Sanitises an environment variable string by replacing occurrences of all the sequence
 * '\\n' with a newline character ('\n'). Note this function has also replace escaped backslash (\).
 * @param string - The input string that needs to be sanitised.
 * @returns The sanitised version of the input string.
 * @example `ABC\\nCBA` will be sanitised to
 * `ABC
 * CBA`
 */
export const sanitise = (string: string | undefined): string | undefined => (string ? string.replace(/\\\\n/g, '\n') : string);
