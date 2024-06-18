import generate from '.';
import { generateSubmittedApplication } from '../test-helpers';
import fileSystem from '../file-system';

describe('api/generate-xlsx/index', () => {
  it('should return an XLSX file path', async () => {
    const submittedApplication = await generateSubmittedApplication();

    const result = await generate.XLSX(submittedApplication);

    const expected = `XLSX/${submittedApplication.referenceNumber}.xlsx`;

    expect(result).toEqual(expected);

    /**
     * delete the file,
     * so that we don't create a file during unit tests.
     */

    await fileSystem.unlink(expected);
  });
});
