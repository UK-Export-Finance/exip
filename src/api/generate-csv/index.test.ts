import generate from '.';
import { mockApplication } from '../test-mocks';
import fileSystem from '../file-system';

describe('api/generate-csv/index', () => {
  it('should return a CSV file path', async () => {
    const result = await generate.csv(mockApplication);

    const expected = `${__dirname}${mockApplication.referenceNumber}.csv`;

    expect(result).toEqual(expected);

    // delete the file so we don't create a file during unit tests.

    fileSystem.unlink(expected);
  });
});
