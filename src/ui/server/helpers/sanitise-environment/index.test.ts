import { sanitise } from '.';

describe('helper/sanitise-environment/sanitise', () => {
  // Returns the input string if it is undefined
  it('should return the input string if it is undefined', () => {
    const input = undefined;
    const result = sanitise(input);
    expect(result).toBe(input);
  });

  // Replaces all occurrences of `\\\\n` with `\n` in the input string
  it('should replace all occurrences of `\\\\n` with `\n` in the input string', () => {
    const input = 'Hello\\\\nWorld\\\\n';
    const result = sanitise(input);
    expect(result).toBe('Hello\nWorld\n');
  });

  // Returns an empty string if the input string is an empty string
  it('should return an empty string if the input string is an empty string', () => {
    const input = '';
    const result = sanitise(input);
    expect(result).toBe('');
  });

  // Returns the input string if it does not contain `\\\\n`
  it('should return the input string if it does not contain `\\\\n`', () => {
    const input = 'Hello World';
    const result = sanitise(input);
    expect(result).toBe(input);
  });

  // Returns the input string with `\\\\n` replaced by `\n` even if there are multiple occurrences in the string
  it('should return the input string with `\\\\n` replaced by `\n` even if there are multiple occurrences in the string', () => {
    const input = 'Hello\\\\nWorld\\\\n!';
    const result = sanitise(input);
    expect(result).toBe('Hello\nWorld\n!');
  });

  // Handles input strings with leading and trailing spaces correctly
  it('should handle input strings with leading and trailing spaces correctly', () => {
    const input = '   Hello\\\\nWorld   ';
    const result = sanitise(input);
    expect(result).toBe('   Hello\nWorld   ');
  });
});
