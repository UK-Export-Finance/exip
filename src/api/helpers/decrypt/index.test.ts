import cypher from '.';
import encrypt from '../encrypt';

describe('api/helpers/decrypt', () => {
  it('should return the same provided value when the value is a string', () => {
    const dataToEncrypt = 'mockString';

    const encryptedValue = encrypt(dataToEncrypt);

    const result = cypher.decrypt(encryptedValue);

    expect(result).toEqual(dataToEncrypt);
  });

  it('should return the same provided value when the value is a number in string format', () => {
    const dataToEncrypt = '12345';

    const encryptedValue = encrypt(dataToEncrypt);

    const result = cypher.decrypt(encryptedValue);

    expect(result).toEqual(dataToEncrypt);
  });

  it('should return the same provided value when the value is special characters', () => {
    const dataToEncrypt = '!!""££';

    const encryptedValue = encrypt(dataToEncrypt);

    const result = cypher.decrypt(encryptedValue);

    expect(result).toEqual(dataToEncrypt);
  });

  it('should return the same provided value when the value has letters, numbers, special characters and empty space', () => {
    const dataToEncrypt = 'test 123!';

    const encryptedValue = encrypt(dataToEncrypt);

    const result = cypher.decrypt(encryptedValue);

    expect(result).toEqual(dataToEncrypt);
  });

  it('should return the same provided value when the value has spaces', () => {
    const dataToEncrypt = 'String with spaces';

    const encryptedValue = encrypt(dataToEncrypt);

    const result = cypher.decrypt(encryptedValue);

    expect(result).toEqual(dataToEncrypt);
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      try {
        cypher.decrypt({ value: '1', iv: '1' });
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error decrypting data')).toEqual(true);
      }
    });
  });
});
