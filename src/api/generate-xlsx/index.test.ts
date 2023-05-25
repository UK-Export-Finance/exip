import generate from '.';
import { mockApplication } from '../test-mocks';
import fileSystem from '../file-system';

describe('api/generate-xlsx/index', () => {
  it('should return an XLSX file path', async () => {
    const result = await generate.XLSX(mockApplication);

    const expected = `XLSX/${mockApplication.referenceNumber}.xlsx`;

    expect(result).toEqual(expected);

    // delete the file so we don't create a file during unit tests.

    fileSystem.unlink(expected);
  });
});
