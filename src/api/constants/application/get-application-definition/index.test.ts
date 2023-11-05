import getApplicationDefinition from '.';
import VERSIONS from '../versions';

describe('api/constants/application/get-application-definition', () => {
  it('should return the application definition from the provided version number', () => {
    const result = getApplicationDefinition('1');

    const [expected] = VERSIONS;

    expect(result).toEqual(expected);

    expect(result.VERSION_NUMBER).toEqual('1');
  });

  describe('when no application definition is found', () => {
    it('should throw an error', () => {
      try {
        getApplicationDefinition('123456');
      } catch (err) {
        const expected = new Error('Unable to find latest application version');

        expect(err).toEqual(expected);
      }
    });
  });
});
